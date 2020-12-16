import patientData from '../data/patients';
import { Entry, NewPatient, Patient, PublicPatient } from '../types/patient_types';
import { v1 } from 'uuid';
import utils from '../utils';

const patients: Array<Patient> = patientData.map(patient => {
    const object = utils.toNewPatientEntry(patient) as Patient;
    object.id = patient.id;
    return object;
});

const getAllPatients = (): Patient[] => {
    return patients.map(({ id, name, occupation, dateOfBirth, gender, entries, ssn }) => ({
        id,
        name,
        occupation,
        dateOfBirth,
        gender,
        entries,
        ssn
    }));
};

const getPublicPatients = (): PublicPatient[] => {
    return patients.map(({ id, name, occupation, dateOfBirth, gender }) => ({
        id,
        name,
        occupation,
        dateOfBirth,
        gender,
    }));
};

const addPatient = (newPatient: NewPatient): Patient => {
    const newPatientEntry = {
        id: v1(),
        ...newPatient
    };

    patients.push(newPatientEntry)
    return newPatientEntry;
};

const getPatientById = (id: string): Patient | undefined => {
    return patients.find(patient => patient.id === id);
};

const addPatientEntry = (id: string, entry: Entry): Entry => {
    const patient = patients.find(patient => patient.id === id);
    patient?.entries.push(entry);

    return entry;
}

export default {
    getAllPatients,
    getPublicPatients,
    addPatient,
    getPatientById,
    addPatientEntry,
};