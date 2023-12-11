// Core board object.
import {
    Lane,
    CarsLane,
    HomeLane,
    TruckLane,
    LogLane,
    TurtleLane,
    SafeLane,
} from "./lanes.js";
import { Frog, Turtle, Log, LilyPad } from "./objects.js";
import { keyDowns } from "./frogger.js";

class Board {
    static yStartPositions = [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9];
    constructor(lanes, gl) {
        this.lanes = lanes;
        this.frogs = [];
        this.lives = 5;
        this.newFrog(gl);
        this.loadLaneBuffers(gl);
        this.loadObjectBuffers(gl);
        this.updateLivesCounter();
    }

    // Init a new frog.
    newFrog(gl) {
        let start =
            Math.floor(Math.random() * Board.yStartPositions.length) / 10;
        let newFrog = Frog.newFrog(start);
        newFrog.loadFrogBuffers(gl);
        this.currentFrog = newFrog;
        this.frogs.push(newFrog);
        this.currentFrog.currentLane = this.lanes.length - 1;
    }

    // Loads the lane background data into GL buffers.
    loadLaneBuffers(gl) {
        for (let lane = 0; lane < this.lanes.length; lane++) {
            this.lanes[lane].loadLaneBuffers(gl);
        }
    }

    // Loads object data into GL buffers
    loadObjectBuffers(gl) {
        for (let lane = 0; lane < this.lanes.length; lane++) {
            switch (this.lanes[lane].constructor) {
                case CarsLane:
                case TruckLane:
                case LogLane:
                case HomeLane:
                case TurtleLane:
                    {
                        for (
                            let obj = 0;
                            obj < this.lanes[lane].objects.length;
                            obj++
                        ) {
                            this.lanes[lane].objects[obj].loadBuffers(gl);
                        }
                    }
                    break;
                default:
                    break;
            }
        }
    }

    // Renders frogs to the screen
    renderFrogs(gl, shaderLocs) {
        for (let frog = 0; frog < this.frogs.length; frog++) {
            if (this.frogs[frog].onFloatingObject) {
                switch (this.lanes[this.currentFrog.currentLane].direction) {
                    case Lane.LEFT:
                        Lane.translateObjectLeft(this.frogs[frog]);
                        break;
                    case Lane.RIGHT:
                        Lane.translateObjectRight(this.frogs[frog]);
                        break;
                }
            }
            for (const part in this.frogs[frog].parts) {
                gl.uniformMatrix4fv(
                    shaderLocs.modelTransformMatrixUniform,
                    false,
                    this.frogs[frog].modelMatrix,
                );

                gl.bindBuffer(
                    gl.ARRAY_BUFFER,
                    this.frogs[frog].parts[part].vtxBuffer,
                );
                gl.vertexAttribPointer(
                    shaderLocs.vertexPositionAttrib,
                    3,
                    gl.FLOAT,
                    false,
                    0,
                    0,
                );

                gl.bindBuffer(
                    gl.ARRAY_BUFFER,
                    this.frogs[frog].parts[part].nrmBuffer,
                );
                gl.vertexAttribPointer(
                    shaderLocs.vertexNormalAttrib,
                    3,
                    gl.FLOAT,
                    false,
                    0,
                    0,
                );

                gl.uniform3fv(
                    shaderLocs.vertexDiffuseUniform,
                    new Float32Array(
                        this.frogs[frog].parts[part].material.diffuse,
                    ),
                );
                gl.uniform3fv(
                    shaderLocs.vertexAmbientUniform,
                    new Float32Array(
                        this.frogs[frog].parts[part].material.ambient,
                    ),
                );
                gl.uniform3fv(
                    shaderLocs.vertexSpecularUniform,
                    new Float32Array(
                        this.frogs[frog].parts[part].material.specular,
                    ),
                );
                gl.uniform1f(
                    shaderLocs.vertexReflectivityUniform,
                    this.frogs[frog].parts[part].material.n,
                );

                gl.bindBuffer(
                    gl.ELEMENT_ARRAY_BUFFER,
                    this.frogs[frog].parts[part].triBuffer,
                );
                gl.drawElements(
                    gl.TRIANGLES,
                    3 * this.frogs[frog].parts[part].triangles.length,
                    gl.UNSIGNED_SHORT,
                    0,
                );
            }
        }
    }

    // Renders the lane backgrounds
    renderLaneBackgrounds(gl, shaderLocs) {
        for (let lane = 0; lane < this.lanes.length; lane++) {
            gl.uniformMatrix4fv(
                shaderLocs.modelTransformMatrixUniform,
                false,
                mat4.create(),
            );

            gl.bindBuffer(
                gl.ARRAY_BUFFER,
                this.lanes[lane].backgroundTriangles.vtxBuffer,
            );
            gl.vertexAttribPointer(
                shaderLocs.vertexPositionAttrib,
                3,
                gl.FLOAT,
                false,
                0,
                0,
            );

            gl.bindBuffer(
                gl.ARRAY_BUFFER,
                this.lanes[lane].backgroundTriangles.nrmBuffer,
            );
            gl.vertexAttribPointer(
                shaderLocs.vertexNormalAttrib,
                3,
                gl.FLOAT,
                false,
                0,
                0,
            );

            gl.uniform3fv(
                shaderLocs.vertexDiffuseUniform,
                new Float32Array(
                    this.lanes[lane].backgroundTriangles.material.diffuse,
                ),
            );
            gl.uniform3fv(
                shaderLocs.vertexAmbientUniform,
                new Float32Array(
                    this.lanes[lane].backgroundTriangles.material.ambient,
                ),
            );
            gl.uniform3fv(
                shaderLocs.vertexSpecularUniform,
                new Float32Array(
                    this.lanes[lane].backgroundTriangles.material.specular,
                ),
            );
            gl.uniform1f(
                shaderLocs.vertexReflectivityUniform,
                this.lanes[lane].backgroundTriangles.material.n,
            );

            gl.bindBuffer(
                gl.ELEMENT_ARRAY_BUFFER,
                this.lanes[lane].backgroundTriangles.triBuffer,
            );
            gl.drawElements(
                gl.TRIANGLES,
                3 * this.lanes[lane].backgroundTriangles.triangles.length,
                gl.UNSIGNED_SHORT,
                0,
            );
        }
    }

    // Renders Lane objects
    renderLaneObjects(gl, shaderLocs) {
        for (let lane = 0; lane < this.lanes.length; lane++) {
            switch (this.lanes[lane].constructor) {
                case CarsLane:
                case TruckLane:
                case LogLane:
                case HomeLane:
                case TurtleLane: {
                    for (
                        let obj = 0;
                        obj < this.lanes[lane].objects.length;
                        obj++
                    ) {
                        switch (this.lanes[lane].direction) {
                            case Lane.RIGHT:
                                Lane.translateObjectRight(
                                    this.lanes[lane].objects[obj],
                                );
                                break;
                            case Lane.LEFT:
                                Lane.translateObjectLeft(
                                    this.lanes[lane].objects[obj],
                                );
                                break;
                            default:
                                break;
                        }
                        gl.uniformMatrix4fv(
                            shaderLocs.modelTransformMatrixUniform,
                            false,
                            this.lanes[lane].objects[obj].modelMatrix,
                        );

                        for (const part in this.lanes[lane].objects[obj]
                            .parts) {
                            let _part =
                                this.lanes[lane].objects[obj].parts[part];
                            gl.bindBuffer(gl.ARRAY_BUFFER, _part.vtxBuffer);
                            gl.vertexAttribPointer(
                                shaderLocs.vertexPositionAttrib,
                                3,
                                gl.FLOAT,
                                false,
                                0,
                                0,
                            );

                            gl.bindBuffer(
                                gl.ARRAY_BUFFER,
                                this.lanes[lane].objects[obj].parts[part]
                                    .nrmBuffer,
                            );
                            gl.vertexAttribPointer(
                                shaderLocs.vertexNormalAttrib,
                                3,
                                gl.FLOAT,
                                false,
                                0,
                                0,
                            );

                            gl.uniform3fv(
                                shaderLocs.vertexDiffuseUniform,
                                new Float32Array(
                                    this.lanes[lane].objects[obj].parts[
                                        part
                                    ].material.diffuse,
                                ),
                            );
                            gl.uniform3fv(
                                shaderLocs.vertexAmbientUniform,
                                new Float32Array(
                                    this.lanes[lane].objects[obj].parts[
                                        part
                                    ].material.ambient,
                                ),
                            );
                            gl.uniform3fv(
                                shaderLocs.vertexSpecularUniform,
                                new Float32Array(
                                    this.lanes[lane].objects[obj].parts[
                                        part
                                    ].material.specular,
                                ),
                            );
                            gl.uniform1f(
                                shaderLocs.vertexReflectivityUniform,
                                this.lanes[lane].objects[obj].parts[part]
                                    .material.n,
                            );

                            gl.bindBuffer(
                                gl.ELEMENT_ARRAY_BUFFER,
                                _part.triBuffer,
                            );
                            gl.drawElements(
                                gl.TRIANGLES,
                                3 * _part.triangles.length,
                                gl.UNSIGNED_SHORT,
                                0,
                            );
                        }
                    }
                    if (this.lanes[lane].direction != Lane.NO_DIRECTION) {
                        this.lanes[lane].checkLaneBounds(gl);
                    }
                    break;
                }

                default:
                    break;
            }
        }
    }
    handleFrogMoveUp() {
        mat4.multiply(
            this.currentFrog.modelMatrix,
            mat4.fromTranslation(mat4.create(), vec3.fromValues(0, 0.1, 0)),
            this.currentFrog.modelMatrix,
        );

        this.currentFrog.centroid[1] += 0.1;
        this.currentFrog.currentLane -= 1;
    }

    handleFrogMoveDown() {
        if (this.currentFrog.currentLane == this.lanes.length - 1) {
            return;
        }
        mat4.multiply(
            this.currentFrog.modelMatrix,
            mat4.fromTranslation(mat4.create(), vec3.fromValues(0, -0.1, 0)),
            this.currentFrog.modelMatrix,
        );

        this.currentFrog.centroid[1] -= 0.1;
        this.currentFrog.currentLane += 1;
    }

    handleFrogMoveRight() {
        if (this.currentFrog.centroid[0] < 0.06) {
            return;
        }
        mat4.multiply(
            this.currentFrog.modelMatrix,
            mat4.fromTranslation(mat4.create(), vec3.fromValues(-0.05, 0, 0)),
            this.currentFrog.modelMatrix,
        );

        this.currentFrog.centroid[0] -= 0.05;
    }

    handleFrogMoveLeft() {
        if (this.currentFrog.centroid[0] > 0.94) {
            return;
        }
        mat4.multiply(
            this.currentFrog.modelMatrix,
            mat4.fromTranslation(mat4.create(), vec3.fromValues(0.05, 0, 0)),
            this.currentFrog.modelMatrix,
        );

        this.currentFrog.centroid[0] += 0.05;
    }

    frogDeath(gl) {
        this.lives -= 1;
        this.updateLivesCounter();
        if (this.lives == 0) {
            this.handleGameOver();
        }
        this.frogs.pop();
        this.newFrog(gl);
    }

    moveFrogToObject(object) {
        const translationVector = vec3.create();
        vec3.subtract(
            translationVector,
            object.centroid,
            this.currentFrog.centroid,
        );
        mat4.translate(
            this.currentFrog.modelMatrix,
            this.currentFrog.modelMatrix,
            translationVector,
        );
        vec3.add(
            this.currentFrog.centroid,
            this.currentFrog.centroid,
            translationVector,
        );
    }

    checkLaneCollisions(gl, jumping = false) {
        const currentLane = this.lanes[this.currentFrog.currentLane];
        switch (currentLane.constructor) {
            case HomeLane:
                const possiblePad = currentLane.checkCollision(
                    this.currentFrog,
                );
                if (possiblePad instanceof LilyPad) {
                    this.currentFrog.onFloatingObject = false;
                    this.moveFrogToObject(possiblePad);
                    if (this.frogs.length == 5) {
                        this.handleGameWin();
                    }
                    this.newFrog(gl);
                } else {
                    this.frogDeath(gl);
                }
                break;
            case SafeLane:
                if (this.currentFrog.onFloatingObject) {
                    this.currentFrog.onFloatingObject = false;
                }
                break;
            case CarsLane:
            case TruckLane:
                if (this.currentFrog.onFloatingObject) {
                    this.currentFrog.onFloatingObject = false;
                }
                if (currentLane.checkCollision(this.currentFrog)) {
                    this.frogDeath(gl);
                }
                break;
            case LogLane:
            case TurtleLane:
                const collision = currentLane.checkCollision(this.currentFrog);
                if (collision instanceof Log || collision instanceof Turtle) {
                    if (jumping) {
                        this.moveFrogToObject(collision);
                    }
                    if (!this.currentFrog.onFloatingObject) {
                        this.currentFrog.onFloatingObject = true;
                    } else {
                        break;
                    }
                } else {
                    this.frogDeath(gl);
                }
                break;
            default:
                break;
        }
    }

    updateLivesCounter() {
        document.getElementById("lives-counter").textContent =
            "Lives: " + this.lives;
    }
    handleGameOver() {
        document.removeEventListener("keydown", keyDowns);
        document.getElementById("game-status").style.visibility = "visible";
        document.getElementById("game-status").textContent = "Game Over!";
        document.getElementById("play-again-btn").style.visibility = "visible";
    }
    handleGameWin() {
        document.removeEventListener("keydown", keyDowns);
        document.getElementById("game-status").style.visibility = "visible";
        document.getElementById("game-status").textContent = "You Win!";
        document.getElementById("play-again-btn").style.visibility = "visible";
    }

    gameReset(gl) {
        this.frogs = [];
        this.lives = 5;
        this.newFrog(gl);
        this.updateLivesCounter();
        document.addEventListener("keydown", keyDowns);
    }
}
export { Board };
