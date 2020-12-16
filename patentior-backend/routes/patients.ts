import express from 'express';
const router = express.Router();
import patientsService from '../services/patientsService';
import utils from '../utils';

router.get('/', (_req, res) => {
    res.send(patientsService.getAllPatients());
});

router.post('/', (req, res) => {
    const toNewPatient = utils.toNewPatientEntry(req.body);
    const newPatient = patientsService.addPatient(toNewPatient);

    res.json(newPatient);
});

router.get('/:id', (req, res) => {
    const patient = patientsService.getPatientById(req.params.id);

    res.json(patient);
});

router.post('/:id/entries', (req, res) => {
    const toNewEntry = utils.toNewEntry(req.body);
    const newEntry = patientsService.addPatientEntry(req.params.id, toNewEntry);

    res.json(newEntry);
});

export default router;