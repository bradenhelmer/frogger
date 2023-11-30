// Frogger objects

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
        this.getCentroid();
    }

    getCentroid() {
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
                diffuse: [0.3, 0.3, 0.3],
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
        this.getCentroid();
    }

    getCentroid() {
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

class Log {
    static newLog(start_x, start_y) {
        let section = {
            vertices: [
                [start_x + 0.2, start_y + 0.08, 0.5],
                [start_x, start_y + 0.08, 0.5],
                [start_x + 0.2, start_y + 0.02, 0.5],
                [start_x, start_y + 0.02, 0.5],
                [start_x + 0.2, start_y + 0.08, 0.48],
                [start_x, start_y + 0.08, 0.48],
                [start_x + 0.2, start_y + 0.02, 0.48],
                [start_x, start_y + 0.02, 0.48],
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
                diffuse: [0.45, 0.25, 0.0],
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
        return new Log(section, start_x, start_y);
    }

    constructor(section, start_x, start_y) {
        this.parts = {
            section: section,
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
        this.getCentroid();
    }

    getCentroid() {
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

class Turtle {}

export {
    Frog,
    Car,
    Truck,
    Log,
    Turtle
};
