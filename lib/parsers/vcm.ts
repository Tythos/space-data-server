export interface VCMData {
    type: string;
    messageTime: Date;
    center: string;
    satelliteNumber: number;
    internationalDesignator: string;
    commonName: string;
    epochTime: Date;
    epochRev: string;
    j2kPosVel: PosVel;
    eciPosVel: PosVel;
    efgPosVel: PosVel;
    geopotentialModel: string;
    dragModel: string;
    lunarSolar: string;
    solarRadPressure: string;
    solidEarthTides: string;
    inTrackThrust: string;
    ballisticCoeff: number;
    bdot: number;
    solarRadPressureCoeff: number;
    edr: number;
    thrustAccel: number;
    cmOffset: number;
    solarFlux: SolarFlux;
    taiUtc: number;
    ut1Utc: number;
    ut1Rate: number;
    polarMotion: XY;
    nutationTerms: string;
    constLeapSecTime: Date;
    integratorMode: string;
    coordSys: string;
    partials: string;
    stepMode: string;
    fixedStep: string;
    stepSizeSelection: string;
    initialStepSize: number;
    errorControl: number;
    vectorSigmas: PosVel;
    covarianceMatrix: CovarianceMatrix;
}

interface PosVel {
    pos: [number, number, number];
    vel: [number, number, number];
}

interface CovarianceMatrix {
    size: XY;
    weightedRMS: number;
    values: number[][];
}

interface SolarFlux {
    F10: number;
    avgF10: number;
    avgAP: number;
}

interface XY {
    x: number;
    y: number;
}

function mlineParser(line: string) {
    return line.substring(line.indexOf(":") + 1)
        .trim()
        .split(/\s+/)
        .map(parseFloat)
}
function parseDateString(dateString) {
    // Trim the input string
    dateString = dateString.trim();

    // Extract year, day of year, hour, minute, second, and millisecond from the string
    const [start, year, dayOfYear, dd, mmm, hour, minute, second, millisecond] = dateString.match(/(\d{4})\s(\d{3})\s\((\d{2})\s(\w{3})\)\s(\d{2}):(\d{2}):(\d{2})\.(\d{3})/);

    // Convert the extracted components into a JavaScript Date object
    const date = new Date(Date.UTC(parseInt(year), 0)); // Start with the first day of the year in UTC
    date.setUTCDate(date.getUTCDate() + parseInt(dayOfYear) - 1); // Add (dayOfYear - 1) days to the date in UTC
    date.setUTCHours(parseInt(hour), parseInt(minute), parseInt(second), parseInt(millisecond));

    return date;
}

const getLast = (line: string) => line.split(":").pop()?.trim() as string;

export function parseVCM(vcm: string): VCMData {
    const parts = vcm.split(/<> */);
    const lines = parts.filter((part) => part !== '').map((part) => part.trim());

    // Helper function to parse position and velocity lines
    const parsePosVel = (posLine: string, velLine: string): PosVel => {
        const pos: Array<any>[3] = mlineParser(posLine);
        const vel: Array<any>[3] = mlineParser(velLine);
        return { pos, vel };
    };

    const j2kPosVel = parsePosVel(lines[6], lines[7]);
    const eciPosVel = parsePosVel(lines[8], lines[9]);
    const efgPosVel = parsePosVel(lines[10], lines[11]);


    const vectorSigmas = parsePosVel(lines[24], lines[25]);

    const _covMatrixSize: Array<any>[2] = lines[26].substring(36, 45).match(/[0-9]{1,}/g)?.map(n => parseInt(n));
    const covMatrixSize = { x: _covMatrixSize[0], y: _covMatrixSize[1] };
    const covMatrixWeightedRMS = parseFloat(lines[26].split(":").pop() as string);

    const covMatrixValues: number[][] = [];
    let _intermediateCov: number[] = [];
    for (let i = 27; i < lines.length; i++) {
        const values = lines[i]
            .trim().split(/\s+/)
            .map((value) => parseFloat(value));
        _intermediateCov = _intermediateCov.concat(values);
    }
    for (let i = covMatrixSize.x; i > 0; i--) {
        covMatrixValues.unshift(_intermediateCov.splice(-i))
    }


    const covarianceMatrix: CovarianceMatrix = {
        size: covMatrixSize,
        weightedRMS: covMatrixWeightedRMS,
        values: covMatrixValues,
    };

    const pMotion = lines[19].substring(23, 40).trim()
        .split(/\s+/).map(parseFloat);

    const vcmData: VCMData = {
        type: lines[0].trim(),
        messageTime: parseDateString(lines[2].substring(20, 50)),
        center: lines[2].substring(60),
        satelliteNumber: parseInt(lines[3].substring(18, 43)),
        internationalDesignator: getLast(lines[3]),
        commonName: getLast(lines[4]),
        epochTime: parseDateString(lines[5].substring(18, 48)),
        epochRev: getLast(lines[5]),
        j2kPosVel,
        eciPosVel,
        efgPosVel,
        geopotentialModel: lines[12].substring(14, 30).trim(),
        dragModel: lines[12].substring(36, 50).trim(),
        lunarSolar: getLast(lines[12]),
        solarRadPressure: lines[13].substring(17, 20).trim(),
        solidEarthTides: lines[13].substring(41, 46).trim(),
        inTrackThrust: getLast(lines[13]),
        ballisticCoeff: parseFloat(lines[14].substring(25, 38)),
        bdot: parseFloat(getLast(lines[14])),
        solarRadPressureCoeff: parseFloat(lines[15].substring(32, 46)),
        edr: parseFloat(getLast(lines[15])),
        thrustAccel: parseFloat(lines[16].substring(22, 36)),
        cmOffset: parseFloat(getLast(lines[16])),
        solarFlux: {
            F10: parseFloat(lines[17].substring(17, 22)),
            avgF10: parseFloat(lines[17].substring(35, 40)),
            avgAP: parseFloat(getLast(lines[17]))
        },
        taiUtc: parseFloat(lines[18].substring(14, 17)),
        ut1Utc: parseFloat(lines[18].substring(29, 40)),
        ut1Rate: parseFloat(getLast(lines[18])),
        polarMotion: {
            x: pMotion[0],
            y: pMotion[1]
        },
        nutationTerms: getLast(lines[19]),
        constLeapSecTime: parseDateString(lines[20].slice(lines[20].indexOf(":") + 1)),
        integratorMode: lines[21].substring(16, 30).trim(),
        coordSys: lines[21].substring(40, 48).trim(),
        partials: getLast(lines[22]),
        stepMode: lines[22].substring(10, 17).trim(),
        fixedStep: lines[22].substring(28, 33).trim(),
        stepSizeSelection: getLast(lines[22]).trim(),
        initialStepSize: parseFloat(lines[23].substring(22, 33)),
        errorControl: parseFloat(getLast(lines[23].substring(47, 57))),
        vectorSigmas,
        covarianceMatrix,
    };

    return vcmData;

}