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
    }

    loadFrogBuffers(gl) {
        for (const part in this.parts) {
            loadPartBuffers(this.parts[part], gl);
        }

        // Set centroid and model matrix
        this.modelMatrix = mat4.create();
        this.centroid = getPartsCentroid(this.parts);
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
    }
}

export { Frog, Car, Truck, Log, Turtle };
