// Frogger objects

// Entire game board
class Board {
    constructor(lanes, gl) {
        this.lanes = lanes;
        this.gl = gl;
        this.loadLaneBuffers(gl);
    }

    // Loads the lane data into GL buffers.
    loadLaneBuffers(gl) {
        for (let lane = 0; lane < this.lanes.length; lane++) {
            this.lanes[lane].loadLaneBuffers(gl);
        }
    }

    // Renders the lane backgrounds
    renderLaneBackgrounds(gl, shaderLocs) {
        for (let lane = 0; lane < this.lanes.length; lane++) {
            gl.bindBuffer(gl.ARRAY_BUFFER, this.lanes[lane].vtxBuffer);
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
}

// LANES
class Lane {
    // Lane Directions
    static RIGHT = 0;
    static LEFT = 1;
    static NO_DIRECTION = 2;
    static material;

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
        diffuse: [0.7, 0.3, 0.7],
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
    }
}

class TurtleLane extends WaterLane {
    constructor(direction, start) {
        super(direction, start);
    }
}

class TruckLane extends RoadLane {
    constructor(direction, start) {
        super(direction, start);
    }
}

class CarsLane extends RoadLane {
    constructor(direction, start) {
        super(direction, start);
    }
}

// OBJECTS
class Frog {}

class Log {}

class Turtle {}

class Truck {}

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
