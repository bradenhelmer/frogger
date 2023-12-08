// frogger.js
// ~~~~~~~~~~
// Braden Helmer
// NCSU CSC 561 - Prog 5
// December 11th, 2023
// Implementation of classic Frogger game with WebGL and GLSL.
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
import {
    Lane,
    LogLane,
    TurtleLane,
    CarsLane,
    TruckLane,
    SafeLane,
    HomeLane,
} from "./lanes.js";
import { Board } from "./board.js";

// Constant globals
const WEBGLID = "webgl";
const WEBGLCANVAS = "myWebGLCanvas";
const WIN_Z = 0.0;
const WIN_LEFT = 0.0;
const WIN_RIGHT = 1.0;
const WIN_BOTTOM = 0.0;
const WIN_TOP = 1.0;
const NEAR = 1.0;
const FAR = 300;

// WebGL Object
var gl;

// Animation request
var requestId;

// Init viewing Vectors
var lookUp = new vec3.fromValues(0.0, 1.0, 0.0);
var eye = new vec3.fromValues(0.5, 0.2, -1.0);
// var eye = new vec3.fromValues(0.5, -0.05, -0.05);
var lookAt = new vec3.fromValues(0.5, 0.5, 0.0);

const light = {
    position: new vec3.fromValues(-0.5, 1.5, -0.5),
    value: new vec3.fromValues(1.0, 1.0, 1.0),
};

// Init global matrices
var modelViewMatrix = mat4.create();
var modelProjectionMatrix = mat4.create();
var normalMatrix = mat4.create();

// Board Object
var gameBoard = null;

// Shader Locations
var shaderLocs = {
    eyePositionUniform: null,
    vertexPositionAttrib: null,
    vertexNormalAttrib: null,
    vertexDiffuseUniform: null,
    vertexAmbientUniform: null,
    vertexSpecularUniform: null,
    vertexReflectivityUniform: null,
    lightPositionUniform: null,
    lightValueUniform: null,
    modelViewMatrixUniform: null,
    modelProjectionMatrixUniform: null,
    modelTransformMatrixUniform: null,
    normalMatrixUniform: null,
};

function initWebGL() {
    // Retrieve canvas and webgl context
    let canvas = document.getElementById(WEBGLCANVAS);
    gl = canvas.getContext(WEBGLID);

    canvas.addEventListener(
        "webglcontextlost",
        function (event) {
            event.preventDefault();
            cancelAnimationFrame(requestId);
        },
        false,
    );

    canvas.addEventListener("webglcontextrestored", main, false);

    try {
        // Check for webgl errors
        if (gl.getError() !== gl.NO_ERROR) {
            throw "Error creating WebGL context";
        }

        // Clear frame buffer to transparent and clear depth buffer
        gl.clearColor(0.0, 0.0, 0.0, 1.0);
        gl.clearDepth(1.0);

        // Init Viewport
        gl.viewport(0.0, 0.0, canvas.width, canvas.height);

        // Setup viewing and projection matrices
        mat4.lookAt(modelViewMatrix, eye, lookAt, lookUp);
        let SIZE_H = WIN_RIGHT / 2;
        let SIZE_V = WIN_TOP / 2;
        mat4.frustum(
            modelProjectionMatrix,
            -SIZE_H,
            SIZE_H,
            -SIZE_V,
            SIZE_V,
            NEAR,
            FAR,
        );
    } catch (e) {
        console.log(e);
    }
}

// Creates game board with initial state
function initGameBoard() {
    let lanes = [
        // The numbers here correspond to the Y value at which this lane is starting.
        new HomeLane(Lane.NO_DIRECTION, 0.9),
        new LogLane(Lane.LEFT, 0.8),
        new TurtleLane(Lane.RIGHT, 0.7),
        new LogLane(Lane.LEFT, 0.6),
        new SafeLane(Lane.NO_DIRECTION, 0.5),
        new TruckLane(Lane.LEFT, 0.4),
        new CarsLane(Lane.RIGHT, 0.3),
        new TruckLane(Lane.LEFT, 0.2),
        new CarsLane(Lane.RIGHT, 0.1),
        new SafeLane(Lane.NO_DIRECTION, 0.0),
    ];
    gameBoard = new Board(lanes, gl);
}

function setupShaders() {
    var fShaderCode = `
        varying highp vec3 diffuseProduct, ambientProduct, specularProduct;
        varying highp float reflectivity;
        varying highp vec3 L, N, V;

        mediump vec4 blinn_phong() {
            mediump vec4 ambient = vec4(ambientProduct, 1.0);
            mediump vec4 diffuse = vec4(diffuseProduct * max(dot(N, L), 0.0), 1.0);
            mediump vec3 H = normalize(L + V);
            mediump vec4 specular = vec4(specularProduct * max(pow(dot(N, H), reflectivity), 0.0), 1.0);
            mediump vec4 color = vec4((ambient + diffuse + specular).xyz, 1.0);
            return vec4(diffuseProduct, 1.0);
        }

        void main(void) {
            gl_FragColor = blinn_phong();
        }
    `;

    var vShaderCode = `
        attribute vec3 vertexPosition;
        attribute vec3 vertexNormal;
        uniform vec3 vertexDiffuse, vertexAmbient, vertexSpecular;
        uniform float vertexReflectivity;

        varying highp vec3 diffuseProduct, ambientProduct, specularProduct;
        varying highp float reflectivity;
        varying highp vec3 L, N, V;

        uniform mat4 modelViewMatrix;
        uniform mat4 modelProjectionMatrix;
        uniform mat4 modelTransformMatrix;
        uniform mat4 normalMatrix;

        uniform vec3 lightValue;
        uniform vec3 lightPosition;
        uniform vec3 eyePosition;

        void setUpVectors() { 
            vec3 newPosition = (modelViewMatrix * modelTransformMatrix * vec4(vertexPosition, 1.0)).xyz;
            vec3 newLightPosition = (modelViewMatrix * vec4(lightPosition, 1.0)).xyz;
            L = normalize(newLightPosition - newPosition);
            N = (normalMatrix * modelTransformMatrix * vec4(vertexNormal, 0.0)).xyz;
            N = normalize(N);
            V = normalize(eyePosition - vertexPosition);
        }

        void setUpLightingProducts() {
            diffuseProduct = vertexDiffuse * lightValue;
            ambientProduct = vertexAmbient * lightValue;
            specularProduct = vertexSpecular * lightValue;
            reflectivity = vertexReflectivity;
        }

        void main(void) {
            setUpLightingProducts();
            setUpVectors();
            gl_Position = 
                modelProjectionMatrix *
                modelViewMatrix *
                modelTransformMatrix *
                vec4(vertexPosition, 1.0);
        }
    `;

    try {
        var fShader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(fShader, fShaderCode);
        gl.compileShader(fShader);

        var vShader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(vShader, vShaderCode);
        gl.compileShader(vShader);

        if (!gl.getShaderParameter(fShader, gl.COMPILE_STATUS)) {
            throw (
                "error during fragment shader compile: " +
                gl.getShaderInfoLog(fShader)
            );
        } else if (!gl.getShaderParameter(vShader, gl.COMPILE_STATUS)) {
            throw (
                "error during vertex shader compile: " +
                gl.getShaderInfoLog(vShader)
            );
        } else {
            var shaderProgram = gl.createProgram();
            gl.attachShader(shaderProgram, fShader);
            gl.attachShader(shaderProgram, vShader);
            gl.linkProgram(shaderProgram);

            if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
                throw (
                    "error during shader program linking: " +
                    gl.getProgramInfoLog(shaderProgram)
                );
            } else {
                gl.useProgram(shaderProgram);

                // Viewing Matrices
                shaderLocs.modelViewMatrixUniform = gl.getUniformLocation(
                    shaderProgram,
                    "modelViewMatrix",
                );

                shaderLocs.modelProjectionMatrixUniform = gl.getUniformLocation(
                    shaderProgram,
                    "modelProjectionMatrix",
                );

                shaderLocs.modelTransformMatrixUniform = gl.getUniformLocation(
                    shaderProgram,
                    "modelTransformMatrix",
                );

                shaderLocs.normalMatrixUniform = gl.getUniformLocation(
                    shaderProgram,
                    "normalMatrix",
                );

                shaderLocs.lightValueUniform = gl.getUniformLocation(
                    shaderProgram,
                    "lightValue",
                );

                shaderLocs.lightPositionUniform = gl.getUniformLocation(
                    shaderProgram,
                    "lightPosition",
                );

                shaderLocs.eyePositionUniform = gl.getUniformLocation(
                    shaderProgram,
                    "eyePosition",
                );

                shaderLocs.vertexPositionAttrib = gl.getAttribLocation(
                    shaderProgram,
                    "vertexPosition",
                );
                gl.enableVertexAttribArray(shaderLocs.vertexPositionAttrib);

                shaderLocs.vertexNormalAttrib = gl.getAttribLocation(
                    shaderProgram,
                    "vertexNormal",
                );
                gl.enableVertexAttribArray(shaderLocs.vertexPositionAttrib);

                shaderLocs.vertexDiffuseUniform = gl.getUniformLocation(
                    shaderProgram,
                    "vertexDiffuse",
                );
                shaderLocs.vertexAmbientUniform = gl.getUniformLocation(
                    shaderProgram,
                    "vertexAmbient",
                );
                shaderLocs.vertexSpecularUniform = gl.getUniformLocation(
                    shaderProgram,
                    "vertexSpecular",
                );
                shaderLocs.vertexReflectivityUniform = gl.getUniformLocation(
                    shaderProgram,
                    "vertexReflectivity",
                );
            }
        }
    } catch (e) {
        console.log(e);
    }
}

// Core rendering function
function render() {
    requestId = requestAnimationFrame(render);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);
    gl.uniformMatrix4fv(
        shaderLocs.modelProjectionMatrixUniform,
        false,
        modelProjectionMatrix,
    );
    gl.uniformMatrix4fv(
        shaderLocs.modelViewMatrixUniform,
        false,
        modelViewMatrix,
    );

    mat4.invert(normalMatrix, modelViewMatrix);
    mat4.transpose(normalMatrix, normalMatrix);
    gl.uniformMatrix4fv(shaderLocs.normalMatrixUniform, false, normalMatrix);

    gl.uniform3fv(shaderLocs.lightValueUniform, light.value);
    gl.uniform3fv(shaderLocs.lightPositionUniform, light.position);
    gl.uniform3fv(shaderLocs.eyePositionUniform, eye);
    gameBoard.renderLaneBackgrounds(gl, shaderLocs);
    gameBoard.renderFrogs(gl, shaderLocs);
    gameBoard.renderLaneObjects(gl, shaderLocs);
    gameBoard.checkLaneCollisons(gl);
}

function playAgain() {
    document.getElementById("play-again-btn").style.visibility = "hidden";
    document.getElementById("game-status").style.visibility = "hidden";
    main();
}

function keyDowns(event) {
    switch (event.key) {
        case "ArrowUp":
            gameBoard.handleFrogMoveUp();
            gameBoard.checkLaneCollisons(gl);
            break;
        case "ArrowDown":
            gameBoard.handleFrogMoveDown();
            gameBoard.checkLaneCollisons(gl);
            break;
        case "ArrowRight":
            gameBoard.handleFrogMoveRight(render);
            gameBoard.checkLaneCollisons(gl);
            break;
        case "ArrowLeft":
            gameBoard.handleFrogMoveLeft();
            gameBoard.checkLaneCollisons(gl);
            break;
        default:
            break;
    }
}

// Sets up key event listeners for frog movements.
function setupGameControls() {
    document
        .getElementById("play-again-btn")
        .addEventListener("click", playAgain);
    document.addEventListener("keydown", keyDowns);
}

main();

function main() {
    initWebGL();
    initGameBoard();
    setupShaders();
    setupGameControls();
    render();
}

export { keyDowns };
