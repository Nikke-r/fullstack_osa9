import { v1 } from "uuid";
import { NewPatient, Gender, Entry } from "../types/patient_types";

const toNewPatientEntry = (object: any): NewPatient => {
    const newPatientEntry: NewPatient = {
        name: parseName(object.name),
        occupation: parseOccupation(object.occupation),
        ssn: parseSSN(object.ssn),
        gender: parseGender(object.gender),
        dateOfBirth: parseDate(object.dateOfBirth),
        entries: object.entries,
    }

    return newPatientEntry;
};

const toNewEntry = (object: any): Entry => {
    const newEntry: Entry = {
        type: object.type,
        description: object.description,
        diagnosisCodes: object.diagnosisCodes,
        employerName: object.employerName,
        healthCheckRating: object.healthCheckRating,
        id: v1(),
        specialist: object.specialist,
        date: object.date,
    }

    return newEntry;
}

const parseName = (name: any) => {
    if (!name || !isString(name)) {
        throw new Error(`Missing or invalid field: ${name}`)
    }

    return name;
};

const parseDate = (date: any) => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error(`Invalind or missing date: ${date}`);
    }

    return date;
};

const parseOccupation = (occupation: any) => {
    if (!occupation || !isString(occupation)) {
        throw new Error(`Invalind or missing occupation: ${occupation}`);
    }

    return occupation;
};

const parseSSN = (ssn: any) => {
    if (!ssn || !isString(ssn)) {
        throw new Error(`Invalind or missing SSN: ${ssn}`);
    }

    return ssn;
};

const parseGender = (gender: any) => {
    if (!gender || !isGender(gender)) {
        throw new Error(`Missing or invalid gender: ${gender}`);
    }

    return gender;
};

const isGender = (gender: any): gender is Gender => {
    return Object.values(Gender).includes(gender);
};

const isString = (text: any): text is string => {
    return typeof text ==='string' || text instanceof String;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

export default {
    toNewPatientEntry,
    toNewEntry,
}