interface Result {
    periodLength: number
    trainingDays: number
    success: boolean
    rating: number
    ratingDescription: string,
    target: number
    average: number
}

const calculateExercises = (dailyExerciseHours: number[], dailyTarget: number): Result => {
    const periodLength: number = dailyExerciseHours.length;
    const trainingDays: number = dailyExerciseHours.filter(dailyExercise => dailyExercise !== 0).length;
    const target = dailyTarget;
    const average: number = dailyExerciseHours.reduce((a, b) => a + b) / dailyExerciseHours.length;
    const success: boolean = average > dailyTarget;

    let rating: number;
    let ratingDescription: string;

    const percent: number = (average / target) * 100;

    if (percent > 100) {
        rating = 3;
        ratingDescription = 'Excellent!';
    } else if (percent > 50) {
        rating = 2;
        ratingDescription = 'Good';
    } else {
        rating = 1;
        ratingDescription = 'Could do better.';
    }
    
    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    };
};

export default calculateExercises;