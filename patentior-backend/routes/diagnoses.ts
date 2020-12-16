import express from 'express';
const router = express.Router();
import diagnoseService from '../services/diagnose';

router.get('/', (_req, res) => {
    res.send(diagnoseService.getDiagnoses());
});

export default router;