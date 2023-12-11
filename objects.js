import { loadPartBuffers, getPartsCentroid } from "./helpers.js";

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
        this.parts = {
            body: body,
            topLeftLeg: topLeftLeg,
            topRightLeg: topRightLeg,
            lowerRightLeg: lowerRightLeg,
            lowerLeftLeg: lowerLeftLeg,
        };
        this.onFloatingObject = false;
    }

    loadFrogBuffers(gl) {
        for (const part in this.parts) {
            loadPartBuffers(this.parts[part], gl);
        }

        // Set centroid and model matrix
        this.modelMatrix = mat4.create();
        this.centroid = getPartsCentroid(this.parts);
    }

    // Calculates the distance from the frogs centroid to an
    // objects centroid for collision purposes.
    calculateDistance(object) {
        const x = object.centroid[0] - this.centroid[0];
        const y = object.centroid[1] - this.centroid[1];
        const distance = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
        return Math.abs(distance);
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
            loadPartBuffers(this.parts[part], gl);
        }
        this.modelMatrix = mat4.create();
        this.centroid = getPartsCentroid(this.parts);
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
                [start_x + 0.14, start_y + 0.07, 0.45],
                [start_x + 0.1, start_y + 0.07, 0.45],
                [start_x + 0.14, start_y + 0.03, 0.45],
                [start_x + 0.1, start_y + 0.03, 0.45],
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
                diffuse: [1.0, 0.0, 0.0],
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
                [start_x + 0.1, start_y + 0.08, 0.45],
                [start_x, start_y + 0.08, 0.45],
                [start_x + 0.1, start_y + 0.02, 0.45],
                [start_x, start_y + 0.02, 0.45],
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
            loadPartBuffers(this.parts[part], gl);
        }
        this.modelMatrix = mat4.create();
        this.centroid = getPartsCentroid(this.parts);
    }
}

class Log {
    static newLog(start_x, start_y) {
        let section = {
            vertices: [
                [start_x + 0.1, start_y + 0.08, 0.5],
                [start_x, start_y + 0.08, 0.5],
                [start_x + 0.1, start_y + 0.01, 0.5],
                [start_x, start_y + 0.01, 0.5],
                [start_x + 0.1, start_y + 0.08, 0.48],
                [start_x, start_y + 0.08, 0.48],
                [start_x + 0.1, start_y + 0.01, 0.48],
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
            loadPartBuffers(this.parts[part], gl);
        }

        this.modelMatrix = mat4.create();
        this.centroid = getPartsCentroid(this.parts);
        this.centroid[2] = 0.475;
    }
}

class Turtle {
    static newTurtle(start_x, start_y) {
        let head = {
            vertices: [
                [start_x + 0.02, start_y + 0.06, 0.5],
                [start_x, start_y + 0.06, 0.5],
                [start_x + 0.02, start_y + 0.04, 0.5],
                [start_x, start_y + 0.04, 0.5],
                [start_x + 0.02, start_y + 0.06, 0.48],
                [start_x, start_y + 0.06, 0.48],
                [start_x + 0.02, start_y + 0.04, 0.48],
                [start_x, start_y + 0.04, 0.48],
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
        let body = {
            vertices: [
                [start_x + 0.02, start_y + 0.08, 0.5],
                [start_x + 0.08, start_y + 0.08, 0.5],
                [start_x + 0.02, start_y + 0.02, 0.5],
                [start_x + 0.08, start_y + 0.02, 0.5],
                [start_x + 0.02, start_y + 0.08, 0.47],
                [start_x + 0.08, start_y + 0.08, 0.47],
                [start_x + 0.02, start_y + 0.02, 0.47],
                [start_x + 0.08, start_y + 0.02, 0.47],
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
                diffuse: [0.54, 0.6, 0.36],
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
        return new Turtle(head, body, start_x, start_y);
    }
    constructor(head, body, start_x, start_y) {
        this.parts = {
            head: head,
            body: body,
        };
        this.start_x = start_x;
        this.start_y = start_y;
    }

    loadBuffers(gl) {
        for (const part in this.parts) {
            loadPartBuffers(this.parts[part], gl);
        }
        this.modelMatrix = mat4.create();
        this.centroid = getPartsCentroid(this.parts);
        this.centroid[2] = 0.47;
    }
}

class LilyPad {
    static newLilyPad(start_x, start_y) {
        let pad = {
            vertices: [
                [start_x + 0.05, start_y + 0.09, 0.49],
                [start_x + 0.09, start_y + 0.05, 0.49],
                [start_x + 0.05, start_y + 0.01, 0.49],
                [start_x + 0.01, start_y + 0.05, 0.49],
            ],
            normals: [
                [0.0, 0.0, -1.0],
                [0.0, 0.0, -1.0],
                [0.0, 0.0, -1.0],
                [0.0, 0.0, -1.0],
            ],
            material: {
                ambient: [0.1, 0.1, 0.1],
                diffuse: [0.173, 0.522, 0.0],
                specular: [0.3, 0.3, 0.3],
                n: 10,
            },
            triangles: [
                [0, 1, 3],
                [1, 2, 3],
            ],
        };
        return new LilyPad(pad, start_x, start_y);
    }

    constructor(pad, start_x, start_y) {
        this.parts = {
            pad: pad,
        };
        this.start_x = start_x;
        this.start_y = start_y;
    }

    loadBuffers(gl) {
        for (const part in this.parts) {
            loadPartBuffers(this.parts[part], gl);
        }
        this.modelMatrix = mat4.create();
        this.centroid = getPartsCentroid(this.parts);
        this.centroid[2] = 0.48;
    }
}
class ForbiddenGrass {
    static newGrass(start_x, start_y) {
        let dirt = {
            vertices: [
                [start_x + 0.1, start_y + 0.1, 0.5],
                [start_x, start_y + 0.1, 0.5],
                [start_x + 0.1, start_y, 0.5],
                [start_x, start_y, 0.5],
                [start_x + 0.1, start_y + 0.1, 0.4875],
                [start_x, start_y + 0.1, 0.4875],
                [start_x + 0.1, start_y, 0.4875],
                [start_x, start_y, 0.4875],
            ],
            normals: [
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
        let grass = {
            vertices: [
                [start_x + 0.1, start_y + 0.1, 0.4873],
                [start_x, start_y + 0.1, 0.4873],
                [start_x + 0.1, start_y, 0.4873],
                [start_x, start_y, 0.4873],
                [start_x + 0.1, start_y + 0.1, 0.46],
                [start_x, start_y + 0.1, 0.46],
                [start_x + 0.1, start_y, 0.46],
                [start_x, start_y, 0.46],
            ],
            normals: [
                [0.0, 0.0, -1.0],
                [0.0, 0.0, -1.0],
                [0.0, 0.0, -1.0],
                [0.0, 0.0, -1.0],
            ],
            material: {
                ambient: [0.1, 0.1, 0.1],
                diffuse: [0.173, 0.522, 0.0],
                specular: [0.3, 0.3, 0.3],
                n: 10,
            },
            triangles: [
                [0, 1, 3],
                [0, 2, 3],
            ],
        };

        return new ForbiddenGrass(dirt, grass, start_x, start_y);
    }
    constructor(dirt, grass, start_x, start_y) {
        this.parts = {
            dirt: dirt,
            grass: grass,
        };
        this.start_x = start_x;
        this.start_y = start_y;
    }

    loadBuffers(gl) {
        for (const part in this.parts) {
            loadPartBuffers(this.parts[part], gl);
        }
        this.modelMatrix = mat4.create();
        this.centroid = getPartsCentroid(this.parts);
    }
}

export { Frog, Car, Truck, Log, Turtle, LilyPad, ForbiddenGrass };
