import { State } from "./state";
import { ADD_NEW_ENTRY, ADD_PATIENT, Diagnosis, Entry, Patient, PrivatePatient, SET_CURRENT_PATIENT, SET_DIAGNOSIS_LIST, SET_PATIENT_LIST } from "../types";

export type Action = SetPatientListSuccessAction | AddPatientSuccessAction | SetCurrenPatientSuccessAction | SetDiagnosisListSuccessAction | AddNewEntrySuccessAction;

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case SET_PATIENT_LIST:
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case ADD_PATIENT:
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case SET_CURRENT_PATIENT:
      return {
        ...state,
        currentPatient: action.payload
      };
    case SET_DIAGNOSIS_LIST:
      return {
        ...state,
        diagnosis: action.payload
      };
    case ADD_NEW_ENTRY:
      return {
        ...state,
        currentPatient: {
          ...state.currentPatient,
          entries: state.currentPatient.entries.concat(action.payload)
        }
      }
    default:
      return state;
  }
};

interface SetPatientListSuccessAction {
  type: typeof SET_PATIENT_LIST;
  payload: Patient[];
}

interface AddPatientSuccessAction {
  type: typeof ADD_PATIENT;
  payload: Patient;
}

interface SetCurrenPatientSuccessAction {
  type: typeof SET_CURRENT_PATIENT;
  payload: PrivatePatient;
}

interface SetDiagnosisListSuccessAction {
  type: typeof SET_DIAGNOSIS_LIST;
  payload: Diagnosis[];
}

interface AddNewEntrySuccessAction {
  type: typeof ADD_NEW_ENTRY;
  payload: Entry
}

export const setPatientList = (patientListFromApi: Patient[]): SetPatientListSuccessAction => {
  return { type: SET_PATIENT_LIST, payload: patientListFromApi }
};

export const addPatient = (patient: Patient): AddPatientSuccessAction => {
  return { type: ADD_PATIENT, payload: patient };
};

export const setCurrentPatient = (patient: PrivatePatient): SetCurrenPatientSuccessAction => {
  return { type: SET_CURRENT_PATIENT, payload: patient };
};

export const fetchDiagnosisList = (diagnosisListFromApi: Diagnosis[]): SetDiagnosisListSuccessAction => {
  return { type: SET_DIAGNOSIS_LIST, payload: diagnosisListFromApi };
};

export const addNewEntry = (entry: Entry): AddNewEntrySuccessAction => {
  return { type: ADD_NEW_ENTRY, payload: entry };
};