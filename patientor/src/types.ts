export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
}

export interface PrivatePatient extends Patient {
  entries: Entry[]
}

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

export enum Type {
  HealthCheck = 'HealthCheck',
  OccupationalHealthCare = 'OccupationalHealthcare',
  Hospital = 'Hospital',
}

export interface HealthCheckEntry extends BaseEntry {
  type: Type.HealthCheck;
  healthCheckRating: HealthCheckRating;
}

export interface OccupationalHealthCareEntry extends BaseEntry {
  type: Type.OccupationalHealthCare;
  employerName: string;
  sickLeave?: {
      startDate: string,
      endDate: string,
  }
}

export interface HospitalEntry extends BaseEntry {
  type: Type.Hospital;
  discharge?: {
      dischargeDate: string;
      criteria: string;
  },
}

export type Entry = HospitalEntry | OccupationalHealthCareEntry | HealthCheckEntry;

export const SET_PATIENT_LIST = 'SET_PATIENT LIST';
export const ADD_PATIENT = 'ADD_PATIENT';
export const SET_CURRENT_PATIENT = 'SET_CURRENT_PATIENT';
export const SET_DIAGNOSIS_LIST = 'SET_DIAGNOSIS_LIST';
export const ADD_NEW_ENTRY = 'ADD_NEW_ENTRY';