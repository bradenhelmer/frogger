// frogger.js
// ~~~~~~~~~~
// Braden Helmer
// CSC 561 - Prog 5
// December 11th, 2023
// Implmentation of classic Frogger game with WebGL and GLSL.
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
import {
    Board,
    Lane,
    HomeLane,
    SafeLane,
    LogLane,
    TurtleLane,
    TruckLane,
    CarsLane,
} from "./objects.js";

// Constant globals
const WEBGLID = "webgl";
const WEBGLCANVAS = "myWebGLCanvas";
const WIN_Z = 0.0;
const WIN_LEFT = 0.0;
const WIN_RIGHT = 1.0;
const WIN_BOTTOM = 0.0;
const WIN_TOP = 1.0;
const NEAR = 0.5;
const FAR = 300;

// WebGL Object
var gl = null;

// Init viewing Vectors
var eye = new vec3.fromValues(0.5, 0.5, -0.5);
var lookUp = new vec3.fromValues(0.0, 1.0, 0.0);
var lookAt = new vec3.fromValues(0.5, 0.5, 1.0);

// Init global matrices
var modelViewMatrix = mat4.create();
var modelProjectionMatrix = mat4.create();
var normalMatrix = mat4.create();

// Board Object
var gameBoard = null;

// Shader Locations
var shaderLocs = {
    vertexPositionAttrib: null,
    vertexColorAttrib: null,
};

function initWebGL() {
    // Retrieve canvas and webgl context
    let canvas = document.getElementById(WEBGLCANVAS);
    gl = canvas.getContext(WEBGLID);

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
    // define fragment shader in essl using es6 template strings
    var fShaderCode = `
        varying lowp vec3 vColor;

        void main(void) {
            gl_FragColor = vec4(vColor, 1.0);
        }
    `;

    // define vertex shader in essl using es6 template strings
    var vShaderCode = `
        attribute vec3 vertexPosition;
        uniform vec3 vertexColor;

        varying lowp vec3 vColor;

        void main(void) {
            gl_Position = vec4(vertexPosition, 1.0);
            vColor = vertexColor;
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

                shaderLocs.vertexPositionAttrib = gl.getAttribLocation(
                    shaderProgram,
                    "vertexPosition",
                );
                gl.enableVertexAttribArray(shaderLocs.vertexPositionAttrib);

                shaderLocs.vertexColorAttrib = gl.getUniformLocation(
                    shaderProgram,
                    "vertexColor",
                );
            }
        }
    } catch (e) {
        console.log(e);
    }
}

// Core rendering function
function render() {
    requestAnimationFrame(render);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gameBoard.renderLaneBackgrounds(gl, shaderLocs);
}

main();
// Main execution
function main() {
    initWebGL();
    initGameBoard();
    setupShaders();
    render();
}
