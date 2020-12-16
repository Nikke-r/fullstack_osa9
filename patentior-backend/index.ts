import express from 'express';
import diagnoseRouter from './routes/diagnoses';
import patientsRouter from './routes/patients';
const cors = require('cors');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use('/api/ping', (_, res) => {
    res.send('pong');
});
app.use('/api/diagnoses', diagnoseRouter);
app.use('/api/patients', patientsRouter);

app.listen(PORT, () => {
    console.log(`App running on a port ${PORT}`);
});