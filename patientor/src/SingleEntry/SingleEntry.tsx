import React from 'react';
import { Entry, Type } from '../types';
import { Icon, Table } from 'semantic-ui-react';
import { useStateValue } from '../state';

interface EntryProps {
    entry: Entry
}

const SingleEntry: React.FC<EntryProps> = (props: EntryProps) => {
    const [ {diagnosis}, dispatch ] = useStateValue()

    const getTypeIcon = () => {
        switch (props.entry.type) {
            case Type.Hospital:
                return <Icon name="hospital" />
            case Type.OccupationalHealthCare:
                return <Icon name="user md" />
            case Type.HealthCheck:
                return <Icon name="stethoscope" />
            default:
                return;
        };
    };

    const getHealthIcon = () => {
    }

    const assertNever = (type: never): never => {
        throw new Error(`Invalid type error: ${type}`);
    };

    const styles = {
        border: '1px solid silver',
        borderRadius: '5px',
        padding: '10px',
        margin: '5px',
    };

    return(
        <div style={styles}>
            <h3> {props.entry.date} {getTypeIcon()} </h3>
            <p style={{ color: 'grey' }}> {props.entry.description} </p>
            {props.entry.diagnosisCodes?.length !== undefined && props.entry.diagnosisCodes?.length > 0 &&
            <Table celled>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>
                            Code
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                            Description
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {props.entry.diagnosisCodes?.map(code => 
                        <Table.Row key={code}>
                            <Table.Cell>
                                {code}
                            </Table.Cell>
                            <Table.Cell>
                                {diagnosis.find(diagnose => diagnose.code === code)?.name}
                            </Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>}
        </div>
    );
};

export default SingleEntry;
