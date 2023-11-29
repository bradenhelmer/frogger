// Frogger objects

// Constants used by all
const starts = [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9];
// Entire game board
class Board {
    constructor(lanes, gl) {
        this.lanes = lanes;
        this.frogs = [];
        this.newFrog();
        this.loadLaneBuffers(gl);
        this.loadFrogBuffers(gl);
        this.loadObjectBuffers(gl);
    }

    // Init a new frog.
    newFrog() {
        let start = Math.floor(Math.random() * starts.length) / 10;
        this.frogs.push(Frog.newFrog(start));
    }

    // Loads the lane data into GL buffers.
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
            gl.bindBuffer(gl.ARRAY_BUFFER, this.lanes[lane].vtxBuffer);

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

            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.lanes[lane].triBuffer);
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

// LANES
class Lane {
    // Lane Directions
    static RIGHT = 0;
    static LEFT = 1;
    static NO_DIRECTION = 2;
    static material;

    // Handles right moving lane objects
    static translateObjectRight(object) {
        mat4.multiply(
            object.modelMatrix,
            mat4.fromTranslation(mat4.create(), vec3.fromValues(-0.001, 0, 0)),
            object.modelMatrix,
        );

        object.centroid[0] -= 0.001;
    }

    // Handles left moving lane objects
    static translateObjectLeft(object) {
        mat4.multiply(
            object.modelMatrix,
            mat4.fromTranslation(mat4.create(), vec3.fromValues(0.001, 0, 0)),
            object.modelMatrix,
        );

        object.centroid[0] += 0.001;
    }

    // Rotates the object to the back of the lane with translation.
    static rotateToBack(object, distance) {
        mat4.multiply(
            object.modelMatrix,
            mat4.fromTranslation(
                mat4.create(),
                vec3.fromValues(distance, 0, 0),
            ),
            object.modelMatrix,
        );

        object.centroid[0] += distance;
    }

    constructor(direction, start) {
        this.direction = direction;
        this.start = start;
        this.material = Lane.material;
    }

    // Initializes the background triangles for the lane
    initBackgroundTriangles() {
        this.backgroundTriangles = {
            vertices: [
                [0.0, this.start, 0.5],
                [0.0, this.start + 0.1, 0.5],
                [1.0, this.start + 0.1, 0.5],
                [1.0, this.start, 0.5],
            ],
            normals: [
                [0.0, 0.0, -1.0],
                [0.0, 0.0, -1.0],
            ],
            material: this.material,
            triangles: [
                [0, 1, 2],
                [0, 2, 3],
            ],
        };
    }

    // Loads the background buffers for the current lane
    loadLaneBuffers(gl) {
        // Vertices
        this.vtxCoordArr = [];
        for (
            let vertex = 0;
            vertex < this.backgroundTriangles.vertices.length;
            vertex++
        ) {
            let vtxToAdd = this.backgroundTriangles.vertices[vertex];
            this.vtxCoordArr.push(vtxToAdd[0], vtxToAdd[1], vtxToAdd[2]);
        }

        this.vtxBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vtxBuffer);
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array(this.vtxCoordArr),
            gl.STATIC_DRAW,
        );

        // Normals
        this.nrmArr = [];
        for (
            let normal = 0;
            normal < this.backgroundTriangles.normals.length;
            normal++
        ) {
            let nrmToAdd = this.backgroundTriangles.normals[normal];
            this.nrmArr.push(nrmToAdd[0], nrmToAdd[1], nrmToAdd[2]);
        }

        this.nrmBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.nrmBuffer);
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array(this.nrmArr),
            gl.STATIC_DRAW,
        );

        // Triangles
        this.triArr = [];
        for (
            let triangle = 0;
            triangle < this.backgroundTriangles.triangles.length;
            triangle++
        ) {
            let triToAdd = this.backgroundTriangles.triangles[triangle];
            this.triArr.push(triToAdd[0], triToAdd[1], triToAdd[2]);
        }

        this.triBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.triBuffer);
        gl.bufferData(
            gl.ELEMENT_ARRAY_BUFFER,
            new Uint16Array(this.triArr),
            gl.STATIC_DRAW,
        );
    }
}

class WaterLane extends Lane {
    static material = {
        ambient: [0.1, 0.1, 0.1],
        diffuse: [0.1, 0.2, 0.8],
        specular: [0.3, 0.3, 0.3],
        n: 10,
    };

    constructor(direction, start) {
        super(direction, start);
        this.material = WaterLane.material;
        this.initBackgroundTriangles();
    }
}

class RoadLane extends Lane {
    static material = {
        ambient: [0.1, 0.1, 0.1],
        diffuse: [0.4, 0.4, 0.4],
        specular: [0.3, 0.3, 0.3],
        n: 10,
    };

    constructor(direction, start) {
        super(direction, start);
        this.material = RoadLane.material;
        this.initBackgroundTriangles();
    }
}

class HomeLane extends WaterLane {
    constructor(direction, start) {
        super(direction, start);
        this.material = HomeLane.material;
        this.initBackgroundTriangles();
    }
}

class SafeLane extends Lane {
    static material = {
        ambient: [0.1, 0.1, 0.1],
        diffuse: [0.6, 0.3, 0.9],
        specular: [0.3, 0.3, 0.3],
        n: 10,
    };

    constructor(direction, start) {
        super(direction, start);
        this.material = SafeLane.material;
        this.initBackgroundTriangles();
    }
}

class LogLane extends WaterLane {
    constructor(direction, start) {
        super(direction, start);
        this.objects = [];
    }

    checkLaneBounds() {
        return;
    }
}

class TurtleLane extends WaterLane {
    constructor(direction, start) {
        super(direction, start);
        this.objects = [];
    }

    checkLaneBounds() {
        return;
    }
}

class TruckLane extends RoadLane {
    constructor(direction, start) {
        super(direction, start);
        this.objects = [];
        this.initObjects();
    }

    initObjects() {
        this.objects.push(Truck.newTruck(0.6, this.start));
        this.objects.push(Truck.newTruck(0.1, this.start));
        this.objects.push(Truck.newTruck(-0.5, this.start));
    }

    checkLaneBounds() {
        let lastObj =
            this.objects[
                this.direction === Lane.RIGHT ? this.objects.length - 1 : 0
            ];
        let lastXLoc = lastObj.centroid[0];

        if (lastXLoc > 1.1) {
            Lane.rotateToBack(lastObj, -1.7);
            this.objects.unshift(this.objects.pop());
        }
    }
}

class CarsLane extends RoadLane {
    constructor(direction, start) {
        super(direction, start);
        this.objects = [];
        this.initObjects();
    }

    initObjects() {
        this.objects.push(Car.newCar(1.3, this.start));
        this.objects.push(Car.newCar(1, this.start));
        this.objects.push(Car.newCar(0.7, this.start));
        this.objects.push(Car.newCar(0.4, this.start));
        this.objects.push(Car.newCar(0.1, this.start));
    }

    checkLaneBounds() {
        let lastObj =
            this.objects[
                this.direction === Lane.RIGHT ? this.objects.length - 1 : 0
            ];
        let lastXLoc = lastObj.centroid[0];

        if (lastXLoc < -0.3) {
            Lane.rotateToBack(lastObj, 1.5);
            this.objects.unshift(this.objects.pop());
        }
    }
}

// OBJECTS
class Frog {
    // Creates a new frog in one of the bins on the first safe lane.
    static newFrog(start_x) {
        let body = {
            vertices: [
                [start_x + 0.04, 0.02, 0.5],
                [start_x + 0.04, 0.08, 0.5],
                [start_x + 0.06, 0.08, 0.5],
                [start_x + 0.06, 0.02, 0.5],
                [start_x + 0.04, 0.08, 0.48],
                [start_x + 0.06, 0.08, 0.48],
                [start_x + 0.04, 0.02, 0.48],
                [start_x + 0.06, 0.02, 0.48],
            ],
            normals: [
                [0.0, 0.0, -1.0],
                [0.0, 0.0, -1.0],
                [0.0, 0.0, -1.0],
                [0.0, 0.0, -1.0],
                [0.0, 0.0, -1.0],
                [0.0, 0.0, -1.0],
                [0.0, 0.0, -1.0],
                [0.0, 0.0, -1.0],
            ],
            material: {
                ambient: [0.1, 0.1, 0.1],
                diffuse: [0.2, 0.8, 0.2],
                specular: [0.3, 0.3, 0.3],
                n: 10,
            },
            triangles: [
                [0, 1, 3],
                [2, 3, 1],
                [1, 2, 4],
                [4, 5, 6],
                [0, 6, 3],
                [6, 7, 3],
                [0, 6, 4],
                [1, 0, 4],
                [7, 5, 2],
                [7, 3, 2],
                [7, 5, 4],
                [7, 4, 6],
            ],
        };
        let topLeftLeg = {
            vertices: [
                [start_x + 0.02, 0.07, 0.5],
                [start_x + 0.04, 0.07, 0.5],
                [start_x + 0.02, 0.06, 0.5],
                [start_x + 0.04, 0.06, 0.5],
                [start_x + 0.02, 0.07, 0.48],
                [start_x + 0.04, 0.07, 0.48],
                [start_x + 0.02, 0.06, 0.48],
                [start_x + 0.04, 0.06, 0.48],
            ],
            normals: [
                [0.0, 0.0, -1.0],
                [0.0, 0.0, -1.0],
                [0.0, 0.0, -1.0],
                [0.0, 0.0, -1.0],
                [0.0, 0.0, -1.0],
                [0.0, 0.0, -1.0],
                [0.0, 0.0, -1.0],
                [0.0, 0.0, -1.0],
            ],
            material: {
                ambient: [0.1, 0.1, 0.1],
                diffuse: [0.2, 0.8, 0.2],
                specular: [0.3, 0.3, 0.3],
                n: 10,
            },
            triangles: [
                [0, 1, 3],
                [2, 3, 0],
                [7, 5, 4],
                [7, 6, 4],
                [5, 4, 0],
                [5, 1, 0],
                [6, 7, 3],
                [6, 2, 3],
                [0, 4, 2],
                [4, 2, 6],
                [7, 3, 1],
                [7, 1, 5],
            ],
        };
        let topRightLeg = {
            vertices: [
                [start_x + 0.06, 0.07, 0.5],
                [start_x + 0.08, 0.07, 0.5],
                [start_x + 0.06, 0.06, 0.5],
                [start_x + 0.08, 0.06, 0.5],
                [start_x + 0.06, 0.07, 0.48],
                [start_x + 0.08, 0.07, 0.48],
                [start_x + 0.06, 0.06, 0.48],
                [start_x + 0.08, 0.06, 0.48],
            ],
            normals: [
                [0.0, 0.0, -1.0],
                [0.0, 0.0, -1.0],
                [0.0, 0.0, -1.0],
                [0.0, 0.0, -1.0],
                [0.0, 0.0, -1.0],
                [0.0, 0.0, -1.0],
                [0.0, 0.0, -1.0],
                [0.0, 0.0, -1.0],
            ],
            material: {
                ambient: [0.1, 0.1, 0.1],
                diffuse: [0.2, 0.8, 0.2],
                specular: [0.3, 0.3, 0.3],
                n: 10,
            },
            triangles: [
                [0, 1, 3],
                [2, 3, 0],
                [7, 5, 4],
                [7, 6, 4],
                [5, 4, 0],
                [5, 1, 0],
                [6, 7, 3],
                [6, 2, 3],
                [0, 4, 2],
                [4, 2, 6],
                [7, 3, 1],
                [7, 1, 5],
            ],
        };
        let lowerRightLeg = {
            vertices: [
                [start_x + 0.06, 0.05, 0.5],
                [start_x + 0.08, 0.05, 0.5],
                [start_x + 0.06, 0.04, 0.5],
                [start_x + 0.08, 0.04, 0.5],
                [start_x + 0.06, 0.05, 0.48],
                [start_x + 0.08, 0.05, 0.48],
                [start_x + 0.06, 0.04, 0.48],
                [start_x + 0.08, 0.04, 0.48],
            ],
            normals: [
                [0.0, 0.0, -1.0],
                [0.0, 0.0, -1.0],
                [0.0, 0.0, -1.0],
                [0.0, 0.0, -1.0],
                [0.0, 0.0, -1.0],
                [0.0, 0.0, -1.0],
                [0.0, 0.0, -1.0],
                [0.0, 0.0, -1.0],
            ],
            material: {
                ambient: [0.1, 0.1, 0.1],
                diffuse: [0.2, 0.8, 0.2],
                specular: [0.3, 0.3, 0.3],
                n: 10,
            },
            triangles: [
                [0, 1, 3],
                [2, 3, 0],
                [7, 5, 4],
                [7, 6, 4],
                [5, 4, 0],
                [5, 1, 0],
                [6, 7, 3],
                [6, 2, 3],
                [0, 4, 2],
                [4, 2, 6],
                [7, 3, 1],
                [7, 1, 5],
            ],
        };
        let lowerLeftLeg = {
            vertices: [
                [start_x + 0.02, 0.05, 0.5],
                [start_x + 0.04, 0.05, 0.5],
                [start_x + 0.02, 0.04, 0.5],
                [start_x + 0.04, 0.04, 0.5],
                [start_x + 0.02, 0.05, 0.48],
                [start_x + 0.04, 0.05, 0.48],
                [start_x + 0.02, 0.04, 0.48],
                [start_x + 0.04, 0.04, 0.48],
            ],
            normals: [
                [0.0, 0.0, -1.0],
                [0.0, 0.0, -1.0],
                [0.0, 0.0, -1.0],
                [0.0, 0.0, -1.0],
                [0.0, 0.0, -1.0],
                [0.0, 0.0, -1.0],
                [0.0, 0.0, -1.0],
                [0.0, 0.0, -1.0],
            ],
            material: {
                ambient: [0.1, 0.1, 0.1],
                diffuse: [0.2, 0.8, 0.2],
                specular: [0.3, 0.3, 0.3],
                n: 10,
            },
            triangles: [
                [0, 1, 3],
                [2, 3, 0],
                [7, 5, 4],
                [7, 6, 4],
                [5, 4, 0],
                [5, 1, 0],
                [6, 7, 3],
                [6, 2, 3],
                [0, 4, 2],
                [4, 2, 6],
                [7, 3, 1],
                [7, 1, 5],
            ],
        };

        return new Frog(
            body,
            topLeftLeg,
            topRightLeg,
            lowerRightLeg,
            lowerLeftLeg,
        );
    }

    constructor(body, topLeftLeg, topRightLeg, lowerRightLeg, lowerLeftLeg) {
        this.bodyParts = {
            body: body,
            topLeftLeg: topLeftLeg,
            topRightLeg: topRightLeg,
            lowerRightLeg: lowerRightLeg,
            lowerLeftLeg: lowerLeftLeg,
        };
    }

    loadFrogBuffers(gl) {
        for (const part in this.bodyParts) {
            let vtxCoordArr = [];
            for (
                let vertex = 0;
                vertex < this.bodyParts[part].vertices.length;
                vertex++
            ) {
                let vtxToAdd = this.bodyParts[part].vertices[vertex];
                vtxCoordArr.push(vtxToAdd[0], vtxToAdd[1], vtxToAdd[2]);
            }

            let vtxBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, vtxBuffer);
            gl.bufferData(
                gl.ARRAY_BUFFER,
                new Float32Array(vtxCoordArr),
                gl.STATIC_DRAW,
            );
            this.bodyParts[part].vtxBuffer = vtxBuffer;

            let nrmCoordArr = [];
            for (
                let normal = 0;
                normal < this.bodyParts[part].normals.length;
                normal++
            ) {
                let nrmToAdd = this.bodyParts[part].normals[normal];
                nrmCoordArr.push(nrmToAdd[0], nrmToAdd[1], nrmToAdd[2]);
            }

            let nrmBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, nrmBuffer);
            gl.bufferData(
                gl.ARRAY_BUFFER,
                new Float32Array(nrmCoordArr),
                gl.STATIC_DRAW,
            );
            this.bodyParts[part].nrmBuffer = nrmBuffer;

            let triCoordArr = [];
            for (
                let triangle = 0;
                triangle < this.bodyParts[part].triangles.length;
                triangle++
            ) {
                let triToAdd = this.bodyParts[part].triangles[triangle];
                triCoordArr.push(triToAdd[0], triToAdd[1], triToAdd[2]);
            }
            let triBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, triBuffer);
            gl.bufferData(
                gl.ELEMENT_ARRAY_BUFFER,
                new Uint16Array(triCoordArr),
                gl.STATIC_DRAW,
            );
            this.bodyParts[part].triBuffer = triBuffer;
        }

        // Set centroid and model matrix
        this.modelMatrix = mat4.create();
        this.getFrogCentroid();
    }

    getFrogCentroid() {
        let verticescount = 0;
        let centroid = [0, 0, 0];
        for (const part in this.bodyParts) {
            verticescount += this.bodyParts[part].vertices.length;
            for (
                let vert = 0;
                vert < this.bodyParts[part].vertices.length;
                vert++
            ) {
                centroid[0] += this.bodyParts[part].vertices[vert][0];
                centroid[1] += this.bodyParts[part].vertices[vert][1];
                centroid[2] += this.bodyParts[part].vertices[vert][2];
            }
        }
        this.centroid = new vec3.fromValues(
            (centroid[0] /= verticescount),
            (centroid[1] /= verticescount),
            (centroid[2] /= verticescount),
        );
    }
}

class Car {
    // Create a new car
    static newCar(start_x, start_y) {
        let chasis = {
            vertices: [
                [start_x + 0.03, start_y + 0.07, 0.5],
                [start_x + 0.09, start_y + 0.07, 0.5],
                [start_x + 0.03, start_y + 0.03, 0.5],
                [start_x + 0.09, start_y + 0.03, 0.5],
                [start_x + 0.03, start_y + 0.07, 0.45],
                [start_x + 0.09, start_y + 0.07, 0.45],
                [start_x + 0.03, start_y + 0.03, 0.45],
                [start_x + 0.09, start_y + 0.03, 0.45],
            ],
            normals: [
                [0.0, 0.0, -1.0],
                [0.0, 0.0, -1.0],
                [0.0, 0.0, -1.0],
                [0.0, 0.0, -1.0],
                [0.0, 0.0, -1.0],
                [0.0, 0.0, -1.0],
                [0.0, 0.0, -1.0],
                [0.0, 0.0, -1.0],
            ],
            material: {
                ambient: [0.1, 0.1, 0.1],
                diffuse: [0.2, 0.2, 0.2],
                specular: [0.3, 0.3, 0.3],
                n: 10,
            },
            triangles: [
                [0, 1, 3],
                [2, 3, 0],
                [7, 5, 4],
                [7, 6, 4],
                [5, 4, 0],
                [5, 1, 0],
                [6, 7, 3],
                [6, 2, 3],
                [0, 4, 2],
                [4, 2, 6],
                [7, 3, 1],
                [7, 1, 5],
            ],
        };

        let hood = {
            vertices: [
                [start_x + 0.01, start_y + 0.06, 0.5],
                [start_x + 0.03, start_y + 0.06, 0.5],
                [start_x + 0.01, start_y + 0.04, 0.5],
                [start_x + 0.03, start_y + 0.04, 0.5],
                [start_x + 0.01, start_y + 0.06, 0.48],
                [start_x + 0.03, start_y + 0.06, 0.48],
                [start_x + 0.01, start_y + 0.04, 0.48],
                [start_x + 0.03, start_y + 0.04, 0.48],
            ],
            normals: [
                [0.0, 0.0, -1.0],
                [0.0, 0.0, -1.0],
                [0.0, 0.0, -1.0],
                [0.0, 0.0, -1.0],
                [0.0, 0.0, -1.0],
                [0.0, 0.0, -1.0],
                [0.0, 0.0, -1.0],
                [0.0, 0.0, -1.0],
            ],
            material: {
                ambient: [0.1, 0.1, 0.1],
                diffuse: [0.0, 0.0, 0.0],
                specular: [0.3, 0.3, 0.3],
                n: 10,
            },
            triangles: [
                [0, 1, 3],
                [2, 3, 0],
                [7, 5, 4],
                [7, 6, 4],
                [5, 4, 0],
                [5, 1, 0],
                [6, 7, 3],
                [6, 2, 3],
                [0, 4, 2],
                [4, 2, 6],
                [7, 3, 1],
                [7, 1, 5],
            ],
        };

        return new Car(chasis, hood, start_x, start_y);
    }

    constructor(chasis, hood, start_x, start_y) {
        this.parts = {
            chasis: chasis,
            hood: hood,
        };
        this.start_x = start_x;
        this.start_y = start_y;
    }

    loadBuffers(gl) {
        for (const part in this.parts) {
            let vtxCoordArr = [];
            for (
                let vertex = 0;
                vertex < this.parts[part].vertices.length;
                vertex++
            ) {
                let vtxToAdd = this.parts[part].vertices[vertex];
                vtxCoordArr.push(vtxToAdd[0], vtxToAdd[1], vtxToAdd[2]);
            }

            let vtxBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, vtxBuffer);
            gl.bufferData(
                gl.ARRAY_BUFFER,
                new Float32Array(vtxCoordArr),
                gl.STATIC_DRAW,
            );
            this.parts[part].vtxBuffer = vtxBuffer;

            let nrmCoordArr = [];
            for (
                let normal = 0;
                normal < this.parts[part].normals.length;
                normal++
            ) {
                let nrmToAdd = this.parts[part].normals[normal];
                nrmCoordArr.push(nrmToAdd[0], nrmToAdd[1], nrmToAdd[2]);
            }

            let nrmBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, nrmBuffer);
            gl.bufferData(
                gl.ARRAY_BUFFER,
                new Float32Array(nrmCoordArr),
                gl.STATIC_DRAW,
            );
            this.parts[part].nrmBuffer = nrmBuffer;

            let triCoordArr = [];
            for (
                let triangle = 0;
                triangle < this.parts[part].triangles.length;
                triangle++
            ) {
                let triToAdd = this.parts[part].triangles[triangle];
                triCoordArr.push(triToAdd[0], triToAdd[1], triToAdd[2]);
            }
            let triBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, triBuffer);
            gl.bufferData(
                gl.ELEMENT_ARRAY_BUFFER,
                new Uint16Array(triCoordArr),
                gl.STATIC_DRAW,
            );
            this.parts[part].triBuffer = triBuffer;
        }
        this.modelMatrix = mat4.create();
        this.getCarCentroid();
    }

    getCarCentroid() {
        let verticescount = 0;
        let centroid = [0, 0, 0];
        for (const part in this.parts) {
            verticescount += this.parts[part].vertices.length;
            for (
                let vert = 0;
                vert < this.parts[part].vertices.length;
                vert++
            ) {
                centroid[0] += this.parts[part].vertices[vert][0];
                centroid[1] += this.parts[part].vertices[vert][1];
                centroid[2] += this.parts[part].vertices[vert][2];
            }
        }
        this.centroid = new vec3.fromValues(
            (centroid[0] /= verticescount),
            (centroid[1] /= verticescount),
            (centroid[2] /= verticescount),
        );
    }
}

class Truck {
    // Create a new truck
    static newTruck(start_x, start_y) {
        let body = {
            vertices: [
                [start_x + 0.17, start_y + 0.07, 0.5],
                [start_x + 0.14, start_y + 0.07, 0.5],
                [start_x + 0.17, start_y + 0.03, 0.5],
                [start_x + 0.14, start_y + 0.03, 0.5],
                [start_x + 0.17, start_y + 0.07, 0.47],
                [start_x + 0.14, start_y + 0.07, 0.47],
                [start_x + 0.17, start_y + 0.03, 0.47],
                [start_x + 0.14, start_y + 0.03, 0.47],
            ],
            normals: [
                [0.0, 0.0, -1.0],
                [0.0, 0.0, -1.0],
                [0.0, 0.0, -1.0],
                [0.0, 0.0, -1.0],
                [0.0, 0.0, -1.0],
                [0.0, 0.0, -1.0],
                [0.0, 0.0, -1.0],
                [0.0, 0.0, -1.0],
            ],
            material: {
                ambient: [0.1, 0.1, 0.1],
                diffuse: [0.0, 0.0, 0.0],
                specular: [0.3, 0.3, 0.3],
                n: 10,
            },
            triangles: [
                [0, 1, 3],
                [2, 3, 0],
                [7, 5, 4],
                [7, 6, 4],
                [5, 4, 0],
                [5, 1, 0],
                [6, 7, 3],
                [6, 2, 3],
                [0, 4, 2],
                [4, 2, 6],
                [7, 3, 1],
                [7, 1, 5],
            ],
        };
        let cab = {
            vertices: [
                [start_x + 0.14, start_y + 0.07, 0.5],
                [start_x + 0.1, start_y + 0.07, 0.5],
                [start_x + 0.14, start_y + 0.03, 0.5],
                [start_x + 0.1, start_y + 0.03, 0.5],
                [start_x + 0.14, start_y + 0.07, 0.42],
                [start_x + 0.1, start_y + 0.07, 0.42],
                [start_x + 0.14, start_y + 0.03, 0.42],
                [start_x + 0.1, start_y + 0.03, 0.42],
            ],
            normals: [
                [0.0, 0.0, -1.0],
                [0.0, 0.0, -1.0],
                [0.0, 0.0, -1.0],
                [0.0, 0.0, -1.0],
                [0.0, 0.0, -1.0],
                [0.0, 0.0, -1.0],
                [0.0, 0.0, -1.0],
                [0.0, 0.0, -1.0],
            ],
            material: {
                ambient: [0.1, 0.1, 0.1],
                diffuse: [0.0, 1.0, 0.0],
                specular: [0.3, 0.3, 0.3],
                n: 10,
            },
            triangles: [
                [0, 1, 3],
                [2, 3, 0],
                [7, 5, 4],
                [7, 6, 4],
                [5, 4, 0],
                [5, 1, 0],
                [6, 7, 3],
                [6, 2, 3],
                [0, 4, 2],
                [4, 2, 6],
                [7, 3, 1],
                [7, 1, 5],
            ],
        };
        let trailer = {
            vertices: [
                [start_x + 0.1, start_y + 0.08, 0.5],
                [start_x, start_y + 0.08, 0.5],
                [start_x + 0.1, start_y + 0.02, 0.5],
                [start_x, start_y + 0.02, 0.5],
                [start_x + 0.1, start_y + 0.08, 0.42],
                [start_x, start_y + 0.08, 0.42],
                [start_x + 0.1, start_y + 0.02, 0.42],
                [start_x, start_y + 0.02, 0.42],
            ],
            normals: [
                [0.0, 0.0, -1.0],
                [0.0, 0.0, -1.0],
                [0.0, 0.0, -1.0],
                [0.0, 0.0, -1.0],
                [0.0, 0.0, -1.0],
                [0.0, 0.0, -1.0],
                [0.0, 0.0, -1.0],
                [0.0, 0.0, -1.0],
            ],
            material: {
                ambient: [0.1, 0.1, 0.1],
                diffuse: [1.0, 1.0, 1.0],
                specular: [0.3, 0.3, 0.3],
                n: 10,
            },
            triangles: [
                [0, 1, 3],
                [2, 3, 0],
                [7, 5, 4],
                [7, 6, 4],
                [5, 4, 0],
                [5, 1, 0],
                [6, 7, 3],
                [6, 2, 3],
                [0, 4, 2],
                [4, 2, 6],
                [7, 3, 1],
                [7, 1, 5],
            ],
        };
        return new Truck(body, cab, trailer, start_x, start_y);
    }

    constructor(body, cab, trailer, start_x, start_y) {
        this.parts = {
            body: body,
            cab: cab,
            trailer: trailer,
        };
        this.start_x = start_x;
        this.start_y = start_y;
    }

    loadBuffers(gl) {
        for (const part in this.parts) {
            let vtxCoordArr = [];
            for (
                let vertex = 0;
                vertex < this.parts[part].vertices.length;
                vertex++
            ) {
                let vtxToAdd = this.parts[part].vertices[vertex];
                vtxCoordArr.push(vtxToAdd[0], vtxToAdd[1], vtxToAdd[2]);
            }

            let vtxBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, vtxBuffer);
            gl.bufferData(
                gl.ARRAY_BUFFER,
                new Float32Array(vtxCoordArr),
                gl.STATIC_DRAW,
            );
            this.parts[part].vtxBuffer = vtxBuffer;

            let nrmCoordArr = [];
            for (
                let normal = 0;
                normal < this.parts[part].normals.length;
                normal++
            ) {
                let nrmToAdd = this.parts[part].normals[normal];
                nrmCoordArr.push(nrmToAdd[0], nrmToAdd[1], nrmToAdd[2]);
            }

            let nrmBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, nrmBuffer);
            gl.bufferData(
                gl.ARRAY_BUFFER,
                new Float32Array(nrmCoordArr),
                gl.STATIC_DRAW,
            );
            this.parts[part].nrmBuffer = nrmBuffer;

            let triCoordArr = [];
            for (
                let triangle = 0;
                triangle < this.parts[part].triangles.length;
                triangle++
            ) {
                let triToAdd = this.parts[part].triangles[triangle];
                triCoordArr.push(triToAdd[0], triToAdd[1], triToAdd[2]);
            }
            let triBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, triBuffer);
            gl.bufferData(
                gl.ELEMENT_ARRAY_BUFFER,
                new Uint16Array(triCoordArr),
                gl.STATIC_DRAW,
            );
            this.parts[part].triBuffer = triBuffer;
        }
        this.modelMatrix = mat4.create();
        this.getTruckCentroid();
    }

    getTruckCentroid() {
        let verticescount = 0;
        let centroid = [0, 0, 0];
        for (const part in this.parts) {
            verticescount += this.parts[part].vertices.length;
            for (
                let vert = 0;
                vert < this.parts[part].vertices.length;
                vert++
            ) {
                centroid[0] += this.parts[part].vertices[vert][0];
                centroid[1] += this.parts[part].vertices[vert][1];
                centroid[2] += this.parts[part].vertices[vert][2];
            }
        }
        this.centroid = new vec3.fromValues(
            (centroid[0] /= verticescount),
            (centroid[1] /= verticescount),
            (centroid[2] /= verticescount),
        );
    }
}

class Log {}

class Turtle {}

export {
    Board,
    Lane,
    WaterLane,
    RoadLane,
    HomeLane,
    SafeLane,
    LogLane,
    TurtleLane,
    TruckLane,
    CarsLane,
};
