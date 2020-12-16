import express from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';
const app = express();

app.use(express.json());

app.use('/hello', (_, res) => {
    res.send('Hello Full Stack!');
});

app.use('/bmi', (req, res) => {

    const { height, weight } = req.query;

    if (isNaN(Number(height)) || isNaN(Number(weight))) {
        res.json({ error: 'Malformatted params' });
    }

    const bmi: string = calculateBmi(Number(height), Number(weight));

    res.json({
        weight: Number(req.query.weight),
        height: Number(req.query.height),
        bmi
    });
});

interface IncomingValues {
    daily_exercises: number[]
    target: number
}

app.use('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target }: IncomingValues = req.body;

    if (!daily_exercises || !target) {
        res.json({ error: 'Missing parameters' });
    }

    daily_exercises.forEach((exercise: number) => {
        if (isNaN(exercise)) {
            res.json({ error: 'Malformatted params!' });
        }
    });

    if (isNaN(target)) {
        res.json({ error: 'Malformatted params!' });
    }

    const result = calculateExercises(daily_exercises, target);

    res.json(result);
});

app.listen(3001, () => {
    console.log(`App running on a port: 3001`);
});