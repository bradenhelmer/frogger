// LANES
import { loadPartBuffers } from "./helpers.js";
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
        loadPartBuffers(this.backgroundTriangles, gl);
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
        this.objects.push(Log.newLog(0.8, this.start));
        this.objects.push(Log.newLog(0.7, this.start));
        this.objects.push(Log.newLog(0.3, this.start));
        this.objects.push(Log.newLog(0.2, this.start));
        this.objects.push(Log.newLog(-0.2, this.start));
        this.objects.push(Log.newLog(-0.3, this.start));
    }

    checkLaneBounds() {
        let lastLog =
            this.objects[
                this.direction === Lane.RIGHT ? this.objects.length - 1 : 0
            ];
        // Get second last log as, they are in groups of 2
        let secondLastLog =
            this.objects[
                this.direction === Lane.RIGHT ? this.objects.length - 2 : 1
            ];
        let lastXLocSecondLog = secondLastLog.centroid[0];

        if (lastXLocSecondLog > 1.1) {
            Lane.rotateToBack(lastLog, -1.5);
            Lane.rotateToBack(secondLastLog, -1.5);
            this.objects.push(this.objects.shift());
            this.objects.push(this.objects.shift());
        }
    }
}

class TurtleLane extends WaterLane {
    constructor(direction, start) {
        super(direction, start);
        this.objects = [];
        this.initObjects();
    }

    initObjects() {
        this.objects.push(Turtle.newTurtle(1.3, this.start));
        this.objects.push(Turtle.newTurtle(1, this.start));
        this.objects.push(Turtle.newTurtle(0.7, this.start));
        this.objects.push(Turtle.newTurtle(0.4, this.start));
        this.objects.push(Turtle.newTurtle(0.1, this.start));
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
            this.objects.push(this.objects.shift());
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
