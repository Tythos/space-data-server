export interface VCMData {
    type: string;
    messageTime: string;
    center: string;
    satelliteNumber: number;
    internationalDesignator: string;
    commonName: string;
    epochTime: string;
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
    bdot: number | string;
    solarRadPressureCoeff: number | string;
    edr: number | string;
    thrustAccel: number | string;
    cmOffset: number | string;
    solarFlux: SolarFlux;
    taiUtc: number | string;
    ut1Utc: number | string;
    ut1Rate: number | string;
    polarMotX: number | string;
    polarMotY: number | string;
    nutationTerms: string;
    constLeapSecTime: string;
    integratorMode: string;
    coordSys: string;
    partials: string;
    stepMode: string;
    fixedStep: string;
    stepSizeSelection: string;
    initialStepSize: string;
    errorControl: string;
    vectorSigmas: PosVel;
    covarianceMatrix: CovarianceMatrix;
}

interface PosVel {
    pos: [number, number, number];
    vel: [number, number, number];
}

interface CovarianceMatrix {
    size: string;
    weightedRMS: number;
    values: number[][];
}

interface SolarFlux {
    F10: number | string;
    avgF10: number | string;
    avgAP: number | string;
}

function mlineParser(line: string) {
    return line.substring(line.indexOf(":") + 1)
        .trim()
        .split(/\s+/)
        .map(parseFloat)
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

    const covMatrixSize = lines[26].match(/\((\d+x\s+\d+)\)/)?.toString() as string;
    const covMatrixWeightedRMS = parseFloat(lines[26].split(":").pop() as string);

    const covMatrixValues: number[][] = [];
    for (let i = 27; i < lines.length; i++) {
        const values = lines[i]
            .trim().split(/\s+/)
            .map((value) => parseFloat(value));
        covMatrixValues.push(values);
    }

    const covarianceMatrix: CovarianceMatrix = {
        size: covMatrixSize,
        weightedRMS: covMatrixWeightedRMS,
        values: covMatrixValues,
    };

    const vcmData: VCMData = {
        type: lines[0].trim(),
        messageTime: lines[2].substring(20, 50),
        center: lines[2].substring(60),
        satelliteNumber: parseInt(lines[3].substring(18, 43)),
        internationalDesignator: getLast(lines[3]),
        commonName: getLast(lines[4]),
        epochTime: lines[5].substring(18, 48),
        epochRev: getLast(lines[5]),
        j2kPosVel,
        eciPosVel,
        efgPosVel,
        geopotentialModel: lines[12].substring(14, 30).trim(),
        dragModel: lines[12].substring(36, 50).trim(),
        lunarSolar: getLast(lines[12]),
        solarRadPressure: lines[13].substring(17, 21).trim(),
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
        taiUtc: lines[18].substring(12, 14),
        ut1Utc: lines[18].substring(27, 33),
        ut1Rate: lines[18].substring(53, 59),
        polarMotX: lines[19].substring(19, 25),
        polarMotY: lines[19].substring(29, 35),
        nutationTerms: lines[19].substring(56, 59),
        constLeapSecTime: "",
        integratorMode: lines[20].substring(0, 11).trim(),
        coordSys: lines[20].substring(30, 35),
        partials: lines[20].substring(45, 55).trim(),
        stepMode: lines[21].substring(10, 14),
        fixedStep: lines[21].substring(28, 31),
        stepSizeSelection: lines[21].substring(47, 53),
        initialStepSize: lines[21].substring(60, 69),
        errorControl: lines[22].substring(47, 57),
        vectorSigmas,
        covarianceMatrix,
    };

    return vcmData;

}