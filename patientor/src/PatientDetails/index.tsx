import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { addNewEntry, setCurrentPatient, useStateValue } from '../state';
import { Gender } from '../types';
import { Button, Icon } from 'semantic-ui-react';
import SingleEntry from '../SingleEntry/SingleEntry';
import AddEntryModal from '../AddEntryForm';
import { AddEntryFormValues } from '../AddEntryForm/AddEntryForm';

const PatientDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>()
    const [{ currentPatient }, dispatch] = useStateValue()
    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const [error, setError] = useState<string | undefined>(undefined)

    const openModal = (): void => setModalOpen(true)
    const closeModal = (): void => {
        setModalOpen(false)
        setError(undefined)
    }

    useEffect(() => {
        if (id && (!currentPatient.id || currentPatient.id !== id)) {
            const getCustomer = async () => {
                try {
                    const result = await axios.get(`http://localhost:3001/api/patients/${id}`);
                    dispatch(setCurrentPatient(result.data));
                } catch (error) {
                    console.log(`Error fetching customer details: ${error.message}`);
                }
            }

            getCustomer();
        }
    }, [id]);

    const showGenderIcon = () => {
        switch (currentPatient.gender) {
            case Gender.Female:
                return <Icon name="venus" />
            case Gender.Male:
                return <Icon name="mars" />
            case Gender.Other:
                return <Icon name="neuter" />
            default:
                assertNever(currentPatient.gender);
        };
    };

    const assertNever = (type: never): never => {
        throw new Error(`Invalid type error: ${type}`);
    };

    const addEntry = async (values: AddEntryFormValues) => {
        try {
            const result = await axios.post(`http://localhost:3001/api/patients/${currentPatient.id}/entries`, values);
            dispatch(addNewEntry(result.data));
            closeModal();
        } catch (error) {
            console.log(`AddEntryError: ${error.message}`);
            setError(error.message);
        }
    }

    return(
        <div>
            {currentPatient.id !== '' ?
            <>
                <h3>Name: {currentPatient.name} {showGenderIcon()} </h3>
                <p>SSN: {currentPatient.ssn} </p>
                <p>Occupation: {currentPatient.occupation} </p>
                <h4>Entries</h4>
                {currentPatient.entries.map(entry => {
                    return(
                        <SingleEntry key={entry.id} entry={entry} />
                    )  
                })}
                <AddEntryModal
                    modalOpen={modalOpen}
                    onClose={closeModal}
                    error={error}
                    onSubmit={addEntry}
                />
                <Button onClick={openModal}>Add Entry</Button>
            </>
            :
            <h3>Patient not found.</h3>}
        </div>
    );
};

export default PatientDetails;