// Core board object.
import { Lane, CarsLane, TruckLane, LogLane, TurtleLane } from "./lanes.js";

import { Frog } from "./objects.js";

class Board {
    static starts = [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9];
    constructor(lanes, gl) {
        this.lanes = lanes;
        this.frogs = [];
        this.newFrog();
        this.loadEdgeBufffers(gl);
        this.loadLaneBuffers(gl);
        this.loadFrogBuffers(gl);
        this.loadObjectBuffers(gl);
    }

    // Init a new frog.
    newFrog() {
        let start = Math.floor(Math.random() * Board.starts.length) / 10;
        let newFrog = Frog.newFrog(start);
        this.currentFrog = newFrog;
        this.frogs.push(newFrog);
    }

    // Loads edge buffers on y plane
    loadEdgeBufffers(gl) {
        const vertices = [
            0.0, 11.0, 0.5, 1.0, 11.0, 0.5, 0.0, 1.0, 0.5, 1.0, 1.0, 0.5, 0.0,
            0.0, 0.5, 1.0, 0.0, 0.5, 0.0, -10.0, 0.5, 1.0, -10.0, 0.5,
        ];
        this.edgeVtxBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.edgeVtxBuffer);
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array(vertices),
            gl.STATIC_DRAW,
        );

        const normals = [
            0.0,
            0.0 - 1.0,
            0.0,
            0.0 - 1.0,
            0.0,
            0.0 - 1.0,
            0.0,
            0.0 - 1.0,
            0.0,
            0.0 - 1.0,
            0.0,
            0.0 - 1.0,
            0.0,
            0.0 - 1.0,
            0.0,
            0.0 - 1.0,
        ];
        this.edgeNrmBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.edgeNrmBuffer);
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array(normals),
            gl.STATIC_DRAW,
        );

        const triangles = [0, 1, 3, 0, 3, 2, 4, 5, 7, 4, 6, 7];
        this.edgeTriBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.edgeTriBuffer);
        gl.bufferData(
            gl.ELEMENT_ARRAY_BUFFER,
            new Uint16Array(triangles),
            gl.STATIC_DRAW,
        );
    }

    renderEdges(gl, shaderLocs) {
        gl.uniformMatrix4fv(
            shaderLocs.modelTransformMatrixUniform,
            false,
            mat4.create(),
        );

        gl.bindBuffer(gl.ARRAY_BUFFER, this.edgeVtxBuffer);
        gl.vertexAttribPointer(
            shaderLocs.vertexPositionAttrib,
            3,
            gl.FLOAT,
            false,
            0,
            0,
        );

        gl.uniform3fv(
            shaderLocs.vertexColorAttrib,
            new Float32Array([0.15, 0.77, 0.0]),
        );

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.edgeTriBuffer);
        gl.drawElements(gl.TRIANGLES, 12, gl.UNSIGNED_SHORT, 0);
    }

    // Loads the lane background data into GL buffers.
    loadLaneBuffers(gl) {
        for (let lane = 0; lane < this.lanes.length; lane++) {
            this.lanes[lane].loadLaneBuffers(gl);
        }
    }

    // Loads frog data into GL buffers
    loadFrogBuffers(gl) {
        for (let frog = 0; frog < this.frogs.length; frog++) {
            this.frogs[frog].loadFrogBuffers(gl);
        }
    }

    // Loads object data into GL buffers
    loadObjectBuffers(gl) {
        for (let lane = 0; lane < this.lanes.length; lane++) {
            switch (this.lanes[lane].constructor) {
                case CarsLane:
                case TruckLane:
                case LogLane:
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
            for (const part in this.frogs[frog].bodyParts) {
                gl.uniformMatrix4fv(
                    shaderLocs.modelTransformMatrixUniform,
                    false,
                    mat4.create(),
                );

                gl.bindBuffer(
                    gl.ARRAY_BUFFER,
                    this.frogs[frog].bodyParts[part].vtxBuffer,
                );
                gl.vertexAttribPointer(
                    shaderLocs.vertexPositionAttrib,
                    3,
                    gl.FLOAT,
                    false,
                    0,
                    0,
                );

                gl.uniform3fv(
                    shaderLocs.vertexColorAttrib,
                    new Float32Array(
                        this.frogs[frog].bodyParts[part].material.diffuse,
                    ),
                );

                gl.bindBuffer(
                    gl.ELEMENT_ARRAY_BUFFER,
                    this.frogs[frog].bodyParts[part].triBuffer,
                );
                gl.drawElements(
                    gl.TRIANGLES,
                    3 * this.frogs[frog].bodyParts[part].triangles.length,
                    gl.UNSIGNED_SHORT,
                    0,
                );
            }
        }
    }

    // Renders the lane backgrounds
    renderLaneBackgrounds(gl, shaderLocs) {
        for (let lane = 0; lane < this.lanes.length; lane++) {
            gl.bindBuffer(
                gl.ARRAY_BUFFER,
                this.lanes[lane].backgroundTriangles.vtxBuffer,
            );

            // TODO might change in the future for moving lanes
            gl.uniformMatrix4fv(
                shaderLocs.modelTransformMatrixUniform,
                false,
                mat4.create(),
            );

            gl.vertexAttribPointer(
                shaderLocs.vertexPositionAttrib,
                3,
                gl.FLOAT,
                false,
                0,
                0,
            );

            gl.uniform3fv(
                shaderLocs.vertexColorAttrib,
                new Float32Array(
                    this.lanes[lane].backgroundTriangles.material.diffuse,
                ),
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

                            gl.uniform3fv(
                                shaderLocs.vertexColorAttrib,
                                new Float32Array(_part.material.diffuse),
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
                    this.lanes[lane].checkLaneBounds(gl);
                    break;
                }

                default:
                    break;
            }
        }
    }
}
export { Board };
