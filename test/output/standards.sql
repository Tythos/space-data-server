create table `CAT` (
 `id` integer not null,
 `created_at` datetime not null default CURRENT_TIMESTAMP,
 `updated_at` datetime not null default CURRENT_TIMESTAMP,
 `OBJECT_NAME` text,
 `OBJECT_ID` text,
 `NORAD_CAT_ID` integer,
 `OBJECT_TYPE` text,
 `OPS_STATUS_CODE` text,
 `OWNER` text,
 `LAUNCH_DATE` text,
 `LAUNCH_SITE` text,
 `DECAY_DATE` text,
 `PERIOD` float,
 `INCLINATION` float,
 `APOGEE` float,
 `PERIGEE` float,
 `RCS` float,
 `DATA_STATUS_CODE` text,
 `ORBIT_CENTER` text,
 `ORBIT_TYPE` text,
 `DEPLOYMENT_DATE` text,
 `MANEUVERABLE` boolean,
 `SIZE` float,
 `MASS` float,
 `MASS_TYPE` text,
 primary key (
 `id`));


create table `OMM` (
 `id` integer not null,
 `created_at` datetime not null default CURRENT_TIMESTAMP,
 `updated_at` datetime not null default CURRENT_TIMESTAMP,
 `CCSDS_OMM_VERS` float,
 `CREATION_DATE` text,
 `ORIGINATOR` text,
 `OBJECT_NAME` text,
 `OBJECT_ID` text,
 `CENTER_NAME` text,
 `REF_FRAME` text,
 `REF_FRAME_EPOCH` text,
 `TIME_SYSTEM` text,
 `MEAN_ELEMENT_THEORY` text,
 `COMMENT` text,
 `EPOCH` text,
 `SEMI_MAJOR_AXIS` float,
 `MEAN_MOTION` float,
 `ECCENTRICITY` float,
 `INCLINATION` float,
 `RA_OF_ASC_NODE` float,
 `ARG_OF_PERICENTER` float,
 `MEAN_ANOMALY` float,
 `GM` float,
 `MASS` float,
 `SOLAR_RAD_AREA` float,
 `SOLAR_RAD_COEFF` float,
 `DRAG_AREA` float,
 `DRAG_COEFF` float,
 `EPHEMERIS_TYPE` text,
 `CLASSIFICATION_TYPE` text,
 `NORAD_CAT_ID` integer,
 `ELEMENT_SET_NO` integer,
 `REV_AT_EPOCH` float,
 `BSTAR` float,
 `MEAN_MOTION_DOT` float,
 `MEAN_MOTION_DDOT` float,
 `COV_REF_FRAME` text,
 `CX_X` float,
 `CY_X` float,
 `CY_Y` float,
 `CZ_X` float,
 `CZ_Y` float,
 `CZ_Z` float,
 `CX_DOT_X` float,
 `CX_DOT_Y` float,
 `CX_DOT_Z` float,
 `CX_DOT_X_DOT` float,
 `CY_DOT_X` float,
 `CY_DOT_Y` float,
 `CY_DOT_Z` float,
 `CY_DOT_X_DOT` float,
 `CY_DOT_Y_DOT` float,
 `CZ_DOT_X` float,
 `CZ_DOT_Y` float,
 `CZ_DOT_Z` float,
 `CZ_DOT_X_DOT` float,
 `CZ_DOT_Y_DOT` float,
 `CZ_DOT_Z_DOT` float,
 `USER_DEFINED_BIP_0044_TYPE` integer,
 `USER_DEFINED_OBJECT_DESIGNATOR` text,
 `USER_DEFINED_EARTH_MODEL` text,
 `USER_DEFINED_EPOCH_TIMESTAMP` float,
 `USER_DEFINED_MICROSECONDS` float,
 primary key (
 `id`));


create table `CDM` (
 `id` integer not null,
 `created_at` datetime not null default CURRENT_TIMESTAMP,
 `updated_at` datetime not null default CURRENT_TIMESTAMP,
 `CCSDS_CDM_VERS` float,
 `CREATION_DATE` text,
 `ORIGINATOR` text,
 `MESSAGE_FOR` text,
 `MESSAGE_ID` text,
 `TCA` text,
 `MISS_DISTANCE` float,
 `RELATIVE_SPEED` float,
 `RELATIVE_POSITION_R` float,
 `RELATIVE_POSITION_T` float,
 `RELATIVE_POSITION_N` float,
 `RELATIVE_VELOCITY_R` float,
 `RELATIVE_VELOCITY_T` float,
 `RELATIVE_VELOCITY_N` float,
 `START_SCREEN_PERIOD` text,
 `STOP_SCREEN_PERIOD` text,
 `SCREEN_VOLUME_FRAME` text,
 `SCREEN_VOLUME_SHAPE` text,
 `SCREEN_VOLUME_X` float,
 `SCREEN_VOLUME_Y` float,
 `SCREEN_VOLUME_Z` float,
 `SCREEN_ENTRY_TIME` text,
 `SCREEN_EXIT_TIME` text,
 `COLLISION_PROBABILITY` float,
 `COLLISION_PROBABILITY_METHOD` text,
 primary key (
 `id`));


create table `CDMObject` (
 `id` integer not null,
 `created_at` datetime not null default CURRENT_TIMESTAMP,
 `updated_at` datetime not null default CURRENT_TIMESTAMP,
 `COMMENT` text,
 `OBJECT` text,
 `OBJECT_DESIGNATOR` text,
 `CATALOG_NAME` text,
 `OBJECT_NAME` text,
 `INTERNATIONAL_DESIGNATOR` text,
 `OBJECT_TYPE` text,
 `OPERATOR_CONTACT_POSITION` text,
 `OPERATOR_ORGANIZATION` text,
 `EPHEMERIS_NAME` text,
 `COVARIANCE_METHOD` text,
 `MANEUVERABLE` text,
 `ORBIT_CENTER` text,
 `REF_FRAME` text,
 `GRAVITY_MODEL` text,
 `ATMOSPHERIC_MODEL` text,
 `N_BODY_PERTURBATIONS` text,
 `SOLAR_RAD_PRESSURE` boolean,
 `EARTH_TIDES` boolean,
 `INTRACK_THRUST` boolean,
 `TIME_LASTOB_START` text,
 `TIME_LASTOB_END` text,
 `RECOMMENDED_OD_SPAN` float,
 `ACTUAL_OD_SPAN` float,
 `OBS_AVAILABLE` integer,
 `OBS_USED` integer,
 `TRACKS_AVAILABLE` integer,
 `TRACKS_USED` integer,
 `RESIDUALS_ACCEPTED` float,
 `WEIGHTED_RMS` float,
 `AREA_PC` float,
 `AREA_DRG` float,
 `AREA_SRP` float,
 `MASS` float,
 `CR_AREA_OVER_MASS` float,
 `THRUST_ACCELERATION` float,
 `SEDR` float,
 `X` float,
 `Y` float,
 `Z` float,
 `X_DOT` float,
 `Y_DOT` float,
 `Z_DOT` float,
 `CR_R` float,
 `CT_R` float,
 `CT_T` float,
 `CN_R` float,
 `CN_T` float,
 `CN_N` float,
 `CRDOT_R` float,
 `CRDOT_T` float,
 `CRDOT_N` float,
 `CRDOT_RDOT` float,
 `CTDOT_R` float,
 `CTDOT_T` float,
 `CTDOT_N` float,
 `CTDOT_RDOT` float,
 `CTDOT_TDOT` float,
 `CNDOT_R` float,
 `CNDOT_T` float,
 `CNDOT_N` float,
 `CNDOT_RDOT` float,
 `CNDOT_TDOT` float,
 `CNDOT_NDOT` float,
 `CDRG_R` float,
 `CDRG_T` float,
 `CDRG_N` float,
 `CDRG_RDOT` float,
 `CDRG_TDOT` float,
 `CDRG_NDOT` float,
 `CDRG_DRG` float,
 `CSRP_R` float,
 `CSRP_T` float,
 `CSRP_N` float,
 `CSRP_RDOT` float,
 `CSRP_TDOT` float,
 `CSRP_NDOT` float,
 `CSRP_DRG` float,
 `CSRP_SRP` float,
 `CTHR_R` float,
 `CTHR_T` float,
 `CTHR_N` float,
 `CTHR_RDOT` float,
 `CTHR_TDOT` float,
 `CTHR_NDOT` float,
 `CTHR_DRG` float,
 `CTHR_SRP` float,
 `CTHR_THR` float,
 primary key (
 `id`));


create table `OPM` (
 `id` integer not null,
 `created_at` datetime not null default CURRENT_TIMESTAMP,
 `updated_at` datetime not null default CURRENT_TIMESTAMP,
 `CCSDS_OPM_VERS` float,
 `CREATION_DATE` text,
 `ORIGINATOR` text,
 `OBJECT_NAME` text,
 `OBJECT_ID` text,
 `CENTER_NAME` text,
 `REF_FRAME` text,
 `REF_FRAME_EPOCH` text,
 `TIME_SYSTEM` text,
 `COMMENT` text,
 `EPOCH` text,
 `X` float,
 `Y` float,
 `Z` float,
 `X_DOT` float,
 `Y_DOT` float,
 `Z_DOT` float,
 `SEMI_MAJOR_AXIS` float,
 `ECCENTRICITY` float,
 `INCLINATION` float,
 `RA_OF_ASC_NODE` float,
 `ARG_OF_PERICENTER` float,
 `TRUE_ANOMALY` float,
 `MEAN_ANOMALY` float,
 `GM` float,
 `MASS` float,
 `SOLAR_RAD_AREA` float,
 `SOLAR_RAD_COEFF` float,
 `DRAG_AREA` float,
 `DRAG_COEFF` float,
 `COV_REF_FRAME` text,
 `CX_X` float,
 `CY_X` float,
 `CY_Y` float,
 `CZ_X` float,
 `CZ_Y` float,
 `CZ_Z` float,
 `CX_DOT_X` float,
 `CX_DOT_Y` float,
 `CX_DOT_Z` float,
 `CX_DOT_X_DOT` float,
 `CY_DOT_X` float,
 `CY_DOT_Y` float,
 `CY_DOT_Z` float,
 `CY_DOT_X_DOT` float,
 `CY_DOT_Y_DOT` float,
 `CZ_DOT_X` float,
 `CZ_DOT_Y` float,
 `CZ_DOT_Z` float,
 `CZ_DOT_X_DOT` float,
 `CZ_DOT_Y_DOT` float,
 `CZ_DOT_Z_DOT` float,
 `USER_DEFINED_BIP_0044_TYPE` integer,
 `USER_DEFINED_OBJECT_DESIGNATOR` text,
 `USER_DEFINED_EARTH_MODEL` text,
 `USER_DEFINED_EPOCH_TIMESTAMP` float,
 `USER_DEFINED_EPOCH_MICROSECONDS` float,
 `MANEUVERS_id` integer not null,
 foreign key(
 `MANEUVERS_id`) references `MANEUVERS`(
 `id`) on delete CASCADE,
 primary key (
 `id`));


create table `maneuverParameters` (
 `id` integer not null,
 `created_at` datetime not null default CURRENT_TIMESTAMP,
 `updated_at` datetime not null default CURRENT_TIMESTAMP,
 `MAN_EPOCH_IGNITION` text,
 `MAN_DURATION` float,
 `MAN_DELTA_MASS` float,
 `MAN_REF_FRAME` text,
 `MAN_DV_1` float,
 `MAN_DV_2` float,
 `MAN_DV_3` float,
 primary key (
 `id`));


create table `OEM` (
 `id` integer not null,
 `created_at` datetime not null default CURRENT_TIMESTAMP,
 `updated_at` datetime not null default CURRENT_TIMESTAMP,
 `CCSDS_OEM_VERS` float,
 `CREATION_DATE` text,
 `ORIGINATOR` text,
 `EPHEMERIS_DATA_BLOCK_id` integer not null,
 foreign key(
 `EPHEMERIS_DATA_BLOCK_id`) references `EPHEMERIS_DATA_BLOCK`(
 `id`) on delete CASCADE,
 primary key (
 `id`));


create table `ephemerisDataBlock` (
 `id` integer not null,
 `created_at` datetime not null default CURRENT_TIMESTAMP,
 `updated_at` datetime not null default CURRENT_TIMESTAMP,
 `COMMENT` text,
 `OBJECT_NAME` text,
 `OBJECT_ID` text,
 `CENTER_NAME` text,
 `REF_FRAME` text,
 `REF_FRAME_EPOCH` text,
 `TIME_SYSTEM` text,
 `START_TIME` text,
 `USEABLE_START_TIME` text,
 `USEABLE_STOP_TIME` text,
 `STOP_TIME` text,
 `INTERPOLATION` text,
 `INTERPOLATION_DEGREE` integer,
 `EPHEMERIS_DATA_LINES_id` integer not null,
 `COVARIANCE_MATRIX_LINES_id` integer not null,
 foreign key(
 `EPHEMERIS_DATA_LINES_id`) references `EPHEMERIS_DATA_LINES`(
 `id`) on delete CASCADE,
 foreign key(
 `COVARIANCE_MATRIX_LINES_id`) references `COVARIANCE_MATRIX_LINES`(
 `id`) on delete CASCADE,
 primary key (
 `id`));


create table `ephemerisDataLine` (
 `id` integer not null,
 `created_at` datetime not null default CURRENT_TIMESTAMP,
 `updated_at` datetime not null default CURRENT_TIMESTAMP,
 `EPOCH` text,
 `X` float,
 `Y` float,
 `Z` float,
 `X_DOT` float,
 `Y_DOT` float,
 `Z_DOT` float,
 `X_DDOT` float,
 `Y_DDOT` float,
 `Z_DDOT` float,
 primary key (
 `id`));


create table `covarianceMatrixLine` (
 `id` integer not null,
 `created_at` datetime not null default CURRENT_TIMESTAMP,
 `updated_at` datetime not null default CURRENT_TIMESTAMP,
 `EPOCH` text,
 `COV_REF_FRAME` text,
 `CX_X` float,
 `CY_X` float,
 `CY_Y` float,
 `CZ_X` float,
 `CZ_Y` float,
 `CZ_Z` float,
 `CX_DOT_X` float,
 `CX_DOT_Y` float,
 `CX_DOT_Z` float,
 `CX_DOT_X_DOT` float,
 `CY_DOT_X` float,
 `CY_DOT_Y` float,
 `CY_DOT_Z` float,
 `CY_DOT_X_DOT` float,
 `CY_DOT_Y_DOT` float,
 `CZ_DOT_X` float,
 `CZ_DOT_Y` float,
 `CZ_DOT_Z` float,
 `CZ_DOT_X_DOT` float,
 `CZ_DOT_Y_DOT` float,
 `CZ_DOT_Z_DOT` float,
 primary key (
 `id`))