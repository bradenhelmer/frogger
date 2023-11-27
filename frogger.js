// frogger.js
// ~~~~~~~~~~
// Braden Helmer
// CSC 561 - Prog 5
// December 11th, 2023
// Implmentation of classic Frogger game with WebGL and GLSL.
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Constant globals
const WEBGLID = "webgl";
const WEBGLCANVAS = "myWebGLCanvas";
const IMAGECANVAS = "myImageCanvas";
const WIN_Z = 0.0;
const WIN_LEFT = 0.0;
const WIN_RIGHT = 1.0;
const WIN_BOTTOM = 0.0;
const WIN_TOP = 1.0;
const NEAR = 0.5;
const FAR = 300;

// WebGL Object
var gl = null;
var imageContext = null;

// Init viewing Vectors
var eye = new vec3.fromValues(0.5, 0.5, -0.5);
var lookUp = new vec3.fromValues(0.0, 1.0, 0.0);
var lookAt = new vec3.fromValues(0.5, 0.5, 1.0);

// Init global matrices
var modelViewMatrix = mat4.create();
var modelProjectionMatrix = mat4.create();
var normalMatrix = mat4.create();

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

function render() {
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    requestAnimationFrame(render);
}

// Main execution
function main() {
    initWebGL();
    render();
}
