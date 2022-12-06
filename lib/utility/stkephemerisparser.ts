// Define a interface for the ephemeris data
interface EphemerisData {
    numberOfEphemerisPoints: number;
    scenarioEpoch: Date;
    interpolationMethod: string;
    interpolationOrder: number;
    distanceUnit: string;
    centralBody: string;
    coordinateSystem: string;
    ephemerisTimePos: number[][];
}

class EphemerisPoint {
    constructor(
        public time: number,
        public x: number,
        public y: number,
        public z: number
    ) { }
}

class EphemerisData {
    constructor(
        public version: string,
        public numPoints: number,
        public scenarioEpoch: Date,
        public interpolationMethod: string,
        public interpolationOrder: number,
        public distanceUnit: string,
        public centralBody: string,
        public coordinateSystem: string,
        public points: EphemerisPoint[]
    ) { }
}


function parseEphemerisFile(file: string): EphemerisData {
    const lines = file.split('\n');
    const version = lines[0];

    // parse metadata
    const numPointsMatch = lines[2].match(/NumberOfEphemerisPoints (\d+)/);
    const numPoints = numPointsMatch ? Number.parseInt(numPointsMatch[1], 10) : 0;

    const scenarioEpochMatch = lines[3].match(/ScenarioEpoch\s+(.+)/);
    const scenarioEpoch = scenarioEpochMatch ? new Date(scenarioEpochMatch[1]) : new Date();

    const interpolationMethodMatch = lines[4].match(/InterpolationMethod\s+(.+)/);
    const interpolationMethod = interpolationMethodMatch ? interpolationMethodMatch[1] : '';

    const interpolationOrderMatch = lines[5].match(/InterpolationOrder\s+(\d+)/);
    const interpolationOrder = interpolationOrderMatch ? Number.parseInt(interpolationOrderMatch[1], 10) : 0;

    const distanceUnitMatch = lines[6].match(/DistanceUnit\s+(.+)/);
    const distanceUnit = distanceUnitMatch ? distanceUnitMatch[1] : '';

    const centralBodyMatch = lines[7].match(/CentralBody\s+(.+)/);
    const centralBody = centralBodyMatch ? centralBodyMatch[1] : '';

    const coordinateSystemMatch = lines[8].match(/CoordinateSystem\s+(.+)/);
    const coordinateSystem = coordinateSystemMatch ? coordinateSystemMatch[1] : '';

    // parse ephemeris data
    const points: EphemerisPoint[] = [];
    for (let i = 9; i < lines.length; i++) {
        const line = lines[i];
        const values = line.split(/\s+/).filter(Boolean); // split line on whitespace
        console.log(values);
        if (values.length !== 4) continue; // skip line if it doesn't have the right number of values

        const time = Number.parseFloat(values[0]);
        const x = Number.parseFloat(values[1]);
        const y = Number.parseFloat(values[2]);
        const z = Number.parseFloat(values[3]);
        console.log(x, y, z);
        points.push(new EphemerisPoint(time, x, y, z));
    }

    const data = new EphemerisData(
        version,
        numPoints,
        scenarioEpoch,
        interpolationMethod,
        interpolationOrder,
        distanceUnit,
        centralBody,
        coordinateSystem,
        points
    );

    return data;
}

let data = `stk.v.5.0
BEGIN Ephemeris
NumberOfEphemerisPoints 601
ScenarioEpoch           1 Jun 2002 12:00:00.000000000
InterpolationMethod     Lagrange
InterpolationOrder      5
DistanceUnit			Kilometers
CentralBody             Earth
CoordinateSystem        Custom TopoCentric Facility/MyLaunchSite
EphemerisTimePos
      0.0000    -0.000000       0.000000      -0.000000               
      1.0000     0.000035       0.000002       0.012273               
      2.0000     0.000138       0.000039       0.049065              
      3.0000     0.000312       0.000199       0.110338               
      4.0000     0.000556       0.000629       0.196052               
      5.0000     0.000872       0.001535       0.306166               
      6.0000     0.001263       0.003180       0.440638               
      7.0000     0.001729       0.005884       0.599422               
      8.0000     0.002275       0.010027       0.782467               
      9.0000     0.002902       0.016043       0.989719               
     10.0000     0.003615       0.024422       1.221115              
     11.0000     0.004417       0.035711       1.476581              
     12.0000     0.005313       0.050510       1.756036               
     13.0000     0.006307       0.069471       2.059380               
     14.0000     0.007404       0.093300       2.386502               
     15.0000     0.008610       0.122749       2.737270              
     16.0000     0.009929       0.158621       3.111530               
     17.0000     0.011368       0.201760       3.509106              
     18.0000     0.012933       0.253055       3.929796               
     19.0000     0.014630       0.313431       4.373369               
     20.0000     0.016465       0.383849       4.839562               
     21.0000     0.018445       0.465296       5.328081               
     22.0000     0.020577       0.558788       5.838593               
     23.0000     0.022866       0.665357       6.370733               
     24.0000     0.025321       0.786049       6.924094               
     25.0000     0.027947       0.921919       7.498234               
     26.0000     0.030751       1.074019       8.092671               
     27.0000     0.033739       1.243399       8.706884               
     28.0000     0.036918       1.431094       9.340317               
     29.0000     0.040293       1.638119       9.992376               `;


console.log(parseEphemerisFile(data));