#include <iostream>
#include <cmath>
#include "sgp4sdp4.h"

using namespace std;

// Function to calculate delta-V required to change satellite orbit
double calcDeltaV(string initialTLE, string finalTLE)
{
    // Initialize SGP4/SDP4 models
    elsetrec initial, final;
    double jd;

    // Set epoch time for TLEs
    jd = julian_date_of_tle(initialTLE);
    initial.epoch = jd;
    sgp4init(72, initialTLE, jd, initial);

    jd = julian_date_of_tle(finalTLE);
    final.epoch = jd;
    sgp4init(72, finalTLE, jd, final);

    // Calculate difference in velocity vectors
    double deltaV[3];
    deltaV[0] = final.xmdot - initial.xmdot;
    deltaV[1] = final.omgdot - initial.omgdot;
    deltaV[2] = final.xnodeo - initial.xnodeo;

    // Calculate total delta-V
    double deltaVTotal = sqrt(pow(deltaV[0], 2) + pow(deltaV[1], 2) + pow(deltaV[2], 2));

    return deltaVTotal;
}

int main()
{
    string initialTLE, finalTLE;

    cout << "Enter initial TLE: ";
    getline(cin, initialTLE);

    cout << "Enter final TLE: ";
    getline(cin, finalTLE);

    double deltaV = calcDeltaV(initialTLE, finalTLE);

    cout << "Delta-V required: " << deltaV << " m/s" << endl;

    return 0;
}
