// Helper functions and other constants

// Loader function for part.
// Takes part data object and loads necessary buffers.
function loadPartBuffers(meshObject, gl) {
    let vtxCoordArr = [];
    for (let vertex = 0; vertex < meshObject.vertices.length; vertex++) {
        let vtxToAdd = meshObject.vertices[vertex];
        vtxCoordArr.push(vtxToAdd[0], vtxToAdd[1], vtxToAdd[2]);
    }

    let vtxBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vtxBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(vtxCoordArr),
        gl.STATIC_DRAW,
    );
    meshObject.vtxBuffer = vtxBuffer;

    let nrmCoordArr = [];
    for (let normal = 0; normal < meshObject.normals.length; normal++) {
        let nrmToAdd = meshObject.normals[normal];
        nrmCoordArr.push(nrmToAdd[0], nrmToAdd[1], nrmToAdd[2]);
    }

    let nrmBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, nrmBuffer);
    gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(nrmCoordArr),
        gl.STATIC_DRAW,
    );
    meshObject.nrmBuffer = nrmBuffer;

    let triCoordArr = [];
    for (let triangle = 0; triangle < meshObject.triangles.length; triangle++) {
        let triToAdd = meshObject.triangles[triangle];
        triCoordArr.push(triToAdd[0], triToAdd[1], triToAdd[2]);
    }
    let triBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, triBuffer);
    gl.bufferData(
        gl.ELEMENT_ARRAY_BUFFER,
        new Uint16Array(triCoordArr),
        gl.STATIC_DRAW,
    );
    meshObject.triBuffer = triBuffer;
}

// Gets the centroid for group of parts.
function getPartsCentroid(parts) {
    let verticescount = 0;
    let centroid = [0, 0, 0];
    for (const part in parts) {
        verticescount += parts[part].vertices.length;
        for (let vert = 0; vert < parts[part].vertices.length; vert++) {
            centroid[0] += parts[part].vertices[vert][0];
            centroid[1] += parts[part].vertices[vert][1];
            centroid[2] += parts[part].vertices[vert][2];
        }
    }
    return new vec3.fromValues(
        (centroid[0] /= verticescount),
        (centroid[1] /= verticescount),
        (centroid[2] /= verticescount),
    );
}

export { loadPartBuffers, getPartsCentroid };
