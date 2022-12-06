let stateVectors = [[1, 2, 3],  // Position vector (x, y, z)
[4, 5, 6],  // Velocity vector (vx, vy, vz)
[7, 8, 9],  // Acceleration vector (ax, ay, az)
[10]];      // Mass (m)

function propagateOrbit(stateVectors: number[][], dt: number): number[][] {
    // HASDM algorithm
    // Initialize variables
    let r = stateVectors[0];
    let v = stateVectors[1];
    let a = stateVectors[2];
    let mass = stateVectors[3][0];

    // Calculate acceleration vector
    let rMag = Math.sqrt(r[0] * r[0] + r[1] * r[1] + r[2] * r[2]);
    let rHat = [r[0] / rMag, r[1] / rMag, r[2] / rMag];
    let aMag = Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2]);
    let aHat = [a[0] / aMag, a[1] / aMag, a[2] / aMag];
    let gHat = [aHat[0] - rHat[0], aHat[1] - rHat[1], aHat[2] - rHat[2]];
    let gMag = Math.sqrt(gHat[0] * gHat[0] + gHat[1] * gHat[1] + gHat[2] * gHat[2]);
    let g = [gHat[0] * aMag / gMag, gHat[1] * aMag / gMag, gHat[2] * aMag / gMag];

    // Propagate position and velocity vectors
    let rNew = [r[0] + v[0] * dt + 0.5 * g[0] * dt * dt,
    r[1] + v[1] * dt + 0.5 * g[1] * dt * dt,
    r[2] + v[2] * dt + 0.5 * g[2] * dt * dt];
    let vNew = [v[0] + g[0] * dt, v[1] + g[1] * dt, v[2] + g[2] * dt];

    // Return new state vectors
    return [rNew, vNew, a, [mass]];
}

function calculateOverflight(satellitePosition: number[], groundStationPosition: number[], satelliteVelocity: number[], groundStationVelocity: number[], earthRadius: number): number {
    // Calculate distance between satellite and ground station
    let rx = satellitePosition[0] - groundStationPosition[0];
    let ry = satellitePosition[1] - groundStationPosition[1];
    let rz = satellitePosition[2] - groundStationPosition[2];
    let r = Math.sqrt(rx * rx + ry * ry + rz * rz);

    // Calculate relative velocity between satellite and ground station
    let vx = satelliteVelocity[0] - groundStationVelocity[0];
    let vy = satelliteVelocity[1] - groundStationVelocity[1];
    let vz = satelliteVelocity[2] - groundStationVelocity[2];
    let v = Math.sqrt(vx * vx + vy * vy + vz * vz);

    // Calculate overflight time
    let t = r / v;

    // Check if satellite is below horizon
    let horizonAngle = Math.acos(earthRadius / (earthRadius + satellitePosition[2]));
    let satelliteGroundStationAngle = Math.acos((rx * vx + ry * vy + rz * vz) / (r * v));
    if (satelliteGroundStationAngle > horizonAngle) {
        // Satellite is below horizon, set overflight time to 0
        t = 0;
    }

    return t;
}

interface EphemerisData {
    satelliteId,
    epoch,
    x,
    y,
    z,
    xDot,
    yDot,
    zDot
}

function parseEphemerisFile(data: Uint8Array): EphemerisData {
    // Initialize variables to store ephemeris data
    let ephemerisData: EphemerisData = {
        satelliteId: 0,
        epoch: 0,
        x: 0,
        y: 0,
        z: 0,
        xDot: 0,
        yDot: 0,
        zDot: 0
    };

    // Parse satellite ID (4 bytes)
    ephemerisData.satelliteId = data[0] << 24 | data[1] << 16 | data[2] << 8 | data[3];

    // Parse epoch (4 bytes)
    ephemerisData.epoch = data[4] << 24 | data[5] << 16 | data[6] << 8 | data[7];

    // Parse x, y, z coordinates (4 bytes each)
    ephemerisData.x = data[8] << 24 | data[9] << 16 | data[10] << 8 | data[11];
    ephemerisData.y = data[12] << 24 | data[13] << 16 | data[14] << 8 | data[15];
    ephemerisData.z = data[16] << 24 | data[17] << 16 | data[18] << 8 | data[19];

    // Parse xDot, yDot, zDot coordinates (4 bytes each)
    ephemerisData.xDot = data[20] << 24 | data[21] << 16 | data[22] << 8 | data[23];
    ephemerisData.yDot = data[24] << 24 | data[25] << 16 | data[26] << 8 | data[27];
    ephemerisData.zDot = data[28] << 24 | data[29] << 16 | data[30] << 8 | data[31];

    return ephemerisData;
}