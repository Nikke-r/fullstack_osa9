const calculateBmi = (height: number, weight: number): string => {
    const bmi: number = weight / Math.pow((height / 100), 2);

    if (bmi < 15) {
        return 'Very Severe Underweight';
    } else if (bmi < 17) {
        return 'Underweight';
    } else if (bmi < 18.5) {
        return 'Lower than normal weight';
    } else if (bmi < 25) {
        return 'Normal weight';
    } else if (bmi < 30) {
        return 'Minor overweight';
    } else if (bmi < 35) {
        return 'Overqeight';
    } else if (bmi < 40) {
        return 'Severe overweight';
    } else {
        return 'Very severe overweight';
    }
};

/* interface InputValues {
    height: number
    weight: number
}

const parseArgs = (args: string[]): InputValues => {
    if (args.length < 4) throw new Error('Not enough arguments')
    if (args.length > 4) throw new Error('Too many arguments')

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            height: Number(args[2]),
            weight: Number(args[3])
        }
    } else {
        throw new Error('Please provide number values')
    }
} */

export default calculateBmi;
