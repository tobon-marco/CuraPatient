CREATE SCHEMA IF NOT EXISTS CURAPATIENT;

CREATE TABLE  IF NOT EXISTS CURAPATIENT.EMPLOYEES  (
    EMPLOYEE_ID BIGSERIAL PRIMARY KEY,
    NAME VARCHAR(45),
    PHONE_NUMBER VARCHAR(45),
    SUPERVISORS VARCHAR(45),
	ACTIVE bool default 'T'
);

CREATE TABLE  IF NOT EXISTS CURAPATIENT.EMPLOYEE_LOGIN  (
    EMPLOYEE_ID  BIGINT,
    USERNAME VARCHAR(45) PRIMARY KEY,
    PASSWORD_HASH VARCHAR(45),
	FOREIGN KEY (EMPLOYEE_ID) REFERENCES CURAPATIENT.EMPLOYEES(EMPLOYEE_ID)
);

CREATE TABLE  IF NOT EXISTS CURAPATIENT.EVALUTATION_PURPOSES  (
    PURPOSE_ID INT PRIMARY KEY,
    NAME VARCHAR(45),
    CREATED_BY VARCHAR(45),
    DATE_CREATED VARCHAR(45),
    MODIFIED_BY VARCHAR(45),
    DATE_MODIFIED VARCHAR(45),
    DESCRIPTION VARCHAR(45)
);

CREATE TABLE  IF NOT EXISTS CURAPATIENT.STATUSES  (
    STATUS_ID INT PRIMARY KEY,
    NAME VARCHAR(45),
    CREATED_BY VARCHAR(45),
    DATE_CREATED TIMESTAMPTZ,
    MODIFIED_BY VARCHAR(45),
    DATE_MODIFIED VARCHAR(45),
    PRIMARY_OWNER VARCHAR(45),
    SEQUENCE INT
);

CREATE TABLE  IF NOT EXISTS CURAPATIENT.REQUESTS  (
    REQUEST_ID INT PRIMARY KEY,
    EMPLOYEE_ID INT,
    STATUS_ID INT,
    ASSESSMENT_DATE TIMESTAMPTZ,
    REQUESTOR_COMMENT VARCHAR(45),
    REQUESTOR_REASON VARCHAR(45),
    BUILDING VARCHAR(45),
    ROOM_NUMBER VARCHAR(45),
    EVALUATOR_ID INT,
    EMPLOYEE_NAME VARCHAR(45),
    PHONE_NUMBER VARCHAR(45),
    SUPERVISOR_NAME VARCHAR(45),
    SUPERVISOR_NUMBER VARCHAR(45),
    EVALUTATION_PURPOSE_DESC VARCHAR(45),
    PURPOSE_ID INT,
    COMPUTER_USAGE VARCHAR(45),
    KEYBOARD_USAGE VARCHAR(45),
    MOUSE_USAGE VARCHAR(45),
    TELEPHONE_USAGE VARCHAR(45),
    EYEWEAR VARCHAR(45),
    COMPUTER_TYPES VARCHAR(45),

    FOREIGN KEY(EMPLOYEE_ID) REFERENCES CURAPATIENT.EMPLOYEES(EMPLOYEE_ID),
    FOREIGN KEY(STATUS_ID) REFERENCES CURAPATIENT.STATUSES(STATUS_ID),
    FOREIGN KEY(PURPOSE_ID) REFERENCES CURAPATIENT.EVALUTATION_PURPOSES(PURPOSE_ID)
);


CREATE TABLE  IF NOT EXISTS CURAPATIENT.REQUEST_EVENTS  (
    REQUEST_EVENT_ID INT PRIMARY KEY,
    EVENT_DATE TIMESTAMPTZ,
    REQUEST_ID INT,
    STATUS_ID INT,
    CREATED_BY VARCHAR(45),
    DATE_CREATED TIMESTAMPTZ,
    MODIFIED_BY VARCHAR(45),
    DATE_MODIFIED VARCHAR(45),
    PRIMARY_OWNER VARCHAR(45),
    SEQUENCE INT,
    FOREIGN KEY(REQUEST_ID) REFERENCES CURAPATIENT.REQUESTS(REQUEST_ID),
    FOREIGN KEY(STATUS_ID) REFERENCES CURAPATIENT.STATUSES(STATUS_ID)
);

