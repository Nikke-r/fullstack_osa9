import diagnosesData from '../data/diagnoses.json';
import { Diagnose } from '../types/diagnoses_types';

const diagnoses: Array<Diagnose> = diagnosesData

const getDiagnoses = (): Array<Diagnose> => {
    return diagnoses;
};

export default {
    getDiagnoses,
};