import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { Type, HealthCheckEntry, OccupationalHealthCareEntry, HospitalEntry } from '../types';
import { DiagnosisSelection, NumberField, TextField } from '../AddPatientModal/FormField';
import { useStateValue } from '../state';
import { Button, Dropdown, Grid } from 'semantic-ui-react';

export type AddEntryFormValues = HealthCeckValues | OccupationalHealthCareEntryValues | HospitalEntryValues;

type HealthCeckValues = Omit<HealthCheckEntry, 'id'>;
type OccupationalHealthCareEntryValues = Omit<OccupationalHealthCareEntry, 'id'>;
type HospitalEntryValues = Omit<HospitalEntry, 'id'>;

interface AddEntryFormProps {
    onSubmit: (values: AddEntryFormValues) => void;
    onCancel: () => void;
}

const AddEntryForm: React.FC<AddEntryFormProps> = ({ onSubmit, onCancel }) => {
    const [{ diagnosis }] = useStateValue();
    const [typeOptions, setTypeOptions] = useState<{}[]>([]);
    const [chosenType, setChosenType] = useState<string | number | boolean | (string | number | boolean)[] | undefined>('HealthCheck');

    const initialValues: AddEntryFormValues = {
        type: Type.HealthCheck,
        date: '',
        description: '',
        healthCheckRating: 0,
        specialist: '',
    };

    const options = () => {
        return Object.keys(Type).map(type => ({ key: type, text: type, value: type  }));
    };

    useEffect(() => {
        setTypeOptions(options());
    }, []);

    const showAdditionalFields = () => {
        switch (chosenType) {
            case 'HealthCheck':
                return(
                    <Field 
                        label="healthCheckRating"
                        name="healthCheckRating"
                        component={NumberField}
                        min={0}
                        max={3}
                    />
                );
            case 'OccupationalHealthCare':
                return(
                    <>
                        <Field 
                            label="Employer Name"
                            name="employerName"
                            placeholder="Employer Name"
                            component={TextField}
                        />
                        <label>Sick leave</label>
                        <Field 
                            label="Date"
                            placeholder="YYYY-MM-DD"
                            name="startDate"
                            component={TextField}
                        />
                        <Field 
                            label="Date"
                            placeholder="YYYY-MM-DD"
                            name="endDate"
                            component={TextField}
                        />
                    </>
                );
            case 'Hospital':
                return(
                    <>
                        <label>Discharge</label>
                        <Field 
                            label="Date"
                            placeholder="YYYY-MM-DD"
                            name="dischargeDate"
                            component={TextField}
                        />
                        <Field 
                            label="Criteria"
                            placeholder="Criteria"
                            name="criteria"
                            component={TextField}
                        />
                    </>
                )
        }
    }

    return (
        <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validate={values => {
                const requiredError = "Field is required";
                const formatError = 'Please enter a valid value.'
                const errors: { [field: string]: string } = {};
                if (!values.date) {
                  errors.date = requiredError;
                } 

                if (!values.type) {
                    errors.type = requiredError;
                }

                if (!values.description) {
                    errors.description = requiredError;
                }

                if (!values.specialist) {
                    errors.specialist = requiredError;
                }

                return errors;
              }}
        >
            {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
                return (
                    <Form className="form ui">
                        <label>Type</label>
                        <Dropdown
                            search
                            selection
                            fluid 
                            defaultValue={chosenType}
                            options={typeOptions}
                            onChange={(event, data) => setChosenType(data.value)}
                        />
                        <DiagnosisSelection 
                            setFieldTouched={setFieldTouched}
                            setFieldValue={setFieldValue}
                            diagnoses={diagnosis}
                        />
                        <Field 
                            label="Date"
                            placeholder="YYYY-MM-DD"
                            name="date"
                            component={TextField}
                        />
                        <Field 
                            label="Description"
                            placeholder="Description"
                            name="description"
                            component={TextField}
                        />
                        <Field
                            label="Specialsit"
                            placeholder="specialist"
                            name="specialist"
                            component={TextField}
                        />
                        {showAdditionalFields()}
                        <Grid>
                            <Grid.Column floated="left" width={5}>
                                <Button type="button" color="red" onClick={onCancel}>
                                    Cancel
                                </Button>
                            </Grid.Column>
                            <Grid.Column floated="right" width={5}>
                                <Button floated="right" type="submit" color="green" disabled={!dirty || !isValid}>
                                    Add
                                </Button>
                            </Grid.Column>
                        </Grid>
                    </Form>
                );
            }}
        </Formik>
    );
};

export default AddEntryForm;