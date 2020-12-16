import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import AddEntryForm from './AddEntryForm';

interface AddEntryModalProps {
    modalOpen: boolean;
    onClose: () => void;
    onSubmit: (values: any) => void;
    error?: string;
  }

const AddEntryModal: React.FC<AddEntryModalProps> = ({ modalOpen, onClose, onSubmit, error }) => {
    return(
        <Modal
            open={modalOpen}
        >
            <Modal.Header>
                Add a new entry
            </Modal.Header>
            <Modal.Content>
                {error && <Segment inverted color='red' > {`Error: ${error}`} </Segment>}
                <AddEntryForm 
                    onCancel={onClose}
                    onSubmit={onSubmit}
                />
            </Modal.Content>
        </Modal>
    );
};

export default AddEntryModal;