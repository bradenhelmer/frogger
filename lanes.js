// LANES
import { Log, Car, Truck, Turtle } from "./objects.js";
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
                [-10.0, this.start, 0.5],
                [-10.0, this.start + 0.1, 0.5],
                [10.0, this.start + 0.1, 0.5],
                [10.0, this.start, 0.5],
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
        this.initObjects();
    }

    initObjects() {
        this.objects.push(Log.newLog(0.7, this.start));
        this.objects.push(Log.newLog(0.2, this.start));
        this.objects.push(Log.newLog(-0.3, this.start));
    }

    checkLaneBounds() {
        return;
        // let lastObj =
        //     this.objects[
        //         this.direction === Lane.RIGHT ? this.objects.length - 1 : 0
        //     ];
        // let lastXLoc = lastObj.centroid[0];

        // if (lastXLoc > 1.1) {
        //     Lane.rotateToBack(lastObj, -1.7);
        //     this.objects.unshift(this.objects.pop());
        // }
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

export {
    Lane,
    RoadLane,
    WaterLane,
    LogLane,
    TurtleLane,
    CarsLane,
    TruckLane,
    SafeLane,
    HomeLane,
};
