/*0.0.2+1671802887497*/
create table `CAT` (
 `file_id` varchar(
 255),
 `id` integer not null,
 `created_at` datetime not null default CURRENT_TIMESTAMP,
 `updated_at` datetime not null default CURRENT_TIMESTAMP,
 `OBJECT_NAME` text,
 `OBJECT_ID` text,
 `NORAD_CAT_ID` integer,
 `OBJECT_TYPE` float,
 `OPS_STATUS_CODE` float,
 `OWNER` text,
 `LAUNCH_DATE` text,
 `LAUNCH_SITE` text,
 `DECAY_DATE` text,
 `PERIOD` float,
 `INCLINATION` float,
 `APOGEE` float,
 `PERIGEE` float,
 `RCS` float,
 `DATA_STATUS_CODE` float,
 `ORBIT_CENTER` text,
 `ORBIT_TYPE` float,
 `DEPLOYMENT_DATE` text,
 `MANEUVERABLE` boolean,
 `SIZE` float,
 `MASS` float,
 `MASS_TYPE` float,
 primary key (
 `id`));


create index `cat_file_id_index` on `CAT` (
 `file_id`);


create index `cat_id_index` on `CAT` (
 `id`);


create table `OMM` (
 `file_id` varchar(
 255),
 `id` integer not null,
 `created_at` datetime not null default CURRENT_TIMESTAMP,
 `updated_at` datetime not null default CURRENT_TIMESTAMP,
 `CCSDS_OMM_VERS` float,
 `CREATION_DATE` text,
 `ORIGINATOR` text,
 `OBJECT_NAME` text,
 `OBJECT_ID` text,
 `CENTER_NAME` text,
 `REF_FRAME` float,
 `REF_FRAME_EPOCH` text,
 `TIME_SYSTEM` float,
 `MEAN_ELEMENT_THEORY` float,
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
 `EPHEMERIS_TYPE` float,
 `CLASSIFICATION_TYPE` text,
 `NORAD_CAT_ID` integer,
 `ELEMENT_SET_NO` integer,
 `REV_AT_EPOCH` float,
 `BSTAR` float,
 `MEAN_MOTION_DOT` float,
 `MEAN_MOTION_DDOT` float,
 `COV_REF_FRAME` float,
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


create index `omm_file_id_index` on `OMM` (
 `file_id`);


create index `omm_id_index` on `OMM` (
 `id`);


create table `CDM` (
 `file_id` varchar(
 255),
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
 `SCREEN_VOLUME_FRAME` float,
 `SCREEN_VOLUME_SHAPE` float,
 `SCREEN_VOLUME_X` float,
 `SCREEN_VOLUME_Y` float,
 `SCREEN_VOLUME_Z` float,
 `SCREEN_ENTRY_TIME` text,
 `SCREEN_EXIT_TIME` text,
 `COLLISION_PROBABILITY` float,
 `COLLISION_PROBABILITY_METHOD` text,
 `OBJECT1` integer,
 `OBJECT2` integer,
 primary key (
 `id`));


create index `cdm_file_id_index` on `CDM` (
 `file_id`);


create index `cdm_id_index` on `CDM` (
 `id`);


create index `cdm_object1_index` on `CDM` (
 `OBJECT1`);


create index `cdm_object2_index` on `CDM` (
 `OBJECT2`);


create table `CDMObject` (
 `id` integer not null,
 `created_at` datetime not null default CURRENT_TIMESTAMP,
 `updated_at` datetime not null default CURRENT_TIMESTAMP,
 `CDM_id` integer,
 `COMMENT` text,
 `OBJECT` float,
 `OBJECT_DESIGNATOR` text,
 `CATALOG_NAME` text,
 `OBJECT_NAME` text,
 `INTERNATIONAL_DESIGNATOR` text,
 `OBJECT_TYPE` float,
 `OPERATOR_CONTACT_POSITION` text,
 `OPERATOR_ORGANIZATION` text,
 `EPHEMERIS_NAME` text,
 `COVARIANCE_METHOD` float,
 `MANEUVERABLE` float,
 `ORBIT_CENTER` text,
 `REF_FRAME` float,
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
 foreign key(
 `CDM_id`) references `CDM`(
 `id`) on delete CASCADE,
 primary key (
 `id`));


create index `cdmobject_id_index` on `CDMObject` (
 `id`);


create index `cdmobject_cdm_id_index` on `CDMObject` (
 `CDM_id`);


create table `OPM` (
 `file_id` varchar(
 255),
 `id` integer not null,
 `created_at` datetime not null default CURRENT_TIMESTAMP,
 `updated_at` datetime not null default CURRENT_TIMESTAMP,
 `CCSDS_OPM_VERS` float,
 `CREATION_DATE` text,
 `ORIGINATOR` text,
 `OBJECT_NAME` text,
 `OBJECT_ID` text,
 `CENTER_NAME` text,
 `REF_FRAME` float,
 `REF_FRAME_EPOCH` text,
 `TIME_SYSTEM` float,
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
 `COV_REF_FRAME` float,
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
 primary key (
 `id`));


create index `opm_file_id_index` on `OPM` (
 `file_id`);


create index `opm_id_index` on `OPM` (
 `id`);


create table `maneuverParameters` (
 `id` integer not null,
 `created_at` datetime not null default CURRENT_TIMESTAMP,
 `updated_at` datetime not null default CURRENT_TIMESTAMP,
 `OPM_id` integer,
 `MAN_EPOCH_IGNITION` text,
 `MAN_DURATION` float,
 `MAN_DELTA_MASS` float,
 `MAN_REF_FRAME` float,
 `MAN_DV_1` float,
 `MAN_DV_2` float,
 `MAN_DV_3` float,
 foreign key(
 `OPM_id`) references `OPM`(
 `id`) on delete CASCADE,
 primary key (
 `id`));


create index `maneuverparameters_id_index` on `maneuverParameters` (
 `id`);


create index `maneuverparameters_opm_id_index` on `maneuverParameters` (
 `OPM_id`);


create table `OEM` (
 `file_id` varchar(
 255),
 `id` integer not null,
 `created_at` datetime not null default CURRENT_TIMESTAMP,
 `updated_at` datetime not null default CURRENT_TIMESTAMP,
 `CCSDS_OEM_VERS` float,
 `CREATION_DATE` text,
 `ORIGINATOR` text,
 primary key (
 `id`));


create index `oem_file_id_index` on `OEM` (
 `file_id`);


create index `oem_id_index` on `OEM` (
 `id`);


create table `ephemerisDataBlock` (
 `id` integer not null,
 `created_at` datetime not null default CURRENT_TIMESTAMP,
 `updated_at` datetime not null default CURRENT_TIMESTAMP,
 `OEM_id` integer,
 `COMMENT` text,
 `OBJECT_NAME` text,
 `OBJECT_ID` text,
 `CENTER_NAME` text,
 `REF_FRAME` float,
 `REF_FRAME_EPOCH` text,
 `TIME_SYSTEM` float,
 `START_TIME` text,
 `USEABLE_START_TIME` text,
 `USEABLE_STOP_TIME` text,
 `STOP_TIME` text,
 `INTERPOLATION` text,
 `INTERPOLATION_DEGREE` integer,
 foreign key(
 `OEM_id`) references `OEM`(
 `id`) on delete CASCADE,
 primary key (
 `id`));


create index `ephemerisdatablock_id_index` on `ephemerisDataBlock` (
 `id`);


create index `ephemerisdatablock_oem_id_index` on `ephemerisDataBlock` (
 `OEM_id`);


create table `ephemerisDataLine` (
 `id` integer not null,
 `created_at` datetime not null default CURRENT_TIMESTAMP,
 `updated_at` datetime not null default CURRENT_TIMESTAMP,
 `ephemerisDataBlock_id` integer,
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
 foreign key(
 `ephemerisDataBlock_id`) references `ephemerisDataBlock`(
 `id`) on delete CASCADE,
 primary key (
 `id`));


create index `ephemerisdataline_id_index` on `ephemerisDataLine` (
 `id`);


create index `ephemerisdataline_ephemerisdatablock_id_index` on `ephemerisDataLine` (
 `ephemerisDataBlock_id`);


create table `covarianceMatrixLine` (
 `id` integer not null,
 `created_at` datetime not null default CURRENT_TIMESTAMP,
 `updated_at` datetime not null default CURRENT_TIMESTAMP,
 `ephemerisDataBlock_id` integer,
 `EPOCH` text,
 `COV_REF_FRAME` float,
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
 foreign key(
 `ephemerisDataBlock_id`) references `ephemerisDataBlock`(
 `id`) on delete CASCADE,
 primary key (
 `id`));


create index `covariancematrixline_id_index` on `covarianceMatrixLine` (
 `id`);


create index `covariancematrixline_ephemerisdatablock_id_index` on `covarianceMatrixLine` (
 `ephemerisDataBlock_id`);


create table `FILE_IMPORT_TABLE` (
 `CID` varchar(
 255) not null,
 `DIGITAL_SIGNATURE` varchar(
 255),
 `PROVIDER` varchar(
 255),
 `STANDARD` varchar(
 255),
 `RECORD_COUNT` integer not null,
 `created_at` datetime,
 `updated_at` datetime,
 primary key (
 `CID`))