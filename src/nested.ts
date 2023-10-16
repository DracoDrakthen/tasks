import { Answer } from "./interfaces/answer";
import { Question, QuestionType } from "./interfaces/question";
import { duplicateQuestion, makeBlankQuestion } from "./objects";

/**
 * Consumes an array of questions and returns a new array with only the questions
 * that are `published`.
 */
export function getPublishedQuestions(questions: Question[]): Question[] {
    return questions.filter((question) => question.published);
}

/**
 * Consumes an array of questions and returns a new array of only the questions that are
 * considered "non-empty". An empty question has an empty string for its `body` and
 * `expected`, and an empty array for its `options`.
 */
export function getNonEmptyQuestions(questions: Question[]): Question[] {
    return questions.filter((questions) => {
        return (
            questions.body !== "" ||
            questions.expected !== "" ||
            questions.options.length > 0
        );
    });
}

/***
 * Consumes an array of questions and returns the question with the given `id`. If the
 * question is not found, return `null` instead.
 */
export function findQuestion(
    questions: Question[],
    id: number
): Question | null {
    for (let i = 0; i < questions.length; i++) {
        const question = questions[i];
        const questionId = question.id;

        if (questionId === id) {
            return question;
        }
    }

    return null;
}

/**
 * Consumes an array of questions and returns a new array that does not contain the question
 * with the given `id`.
 */
export function removeQuestion(questions: Question[], id: number): Question[] {
    return questions.filter((question) => question.id !== id);
}

/***
 * Consumes an array of questions and returns a new array containing just the names of the
 * questions, as an array.
 */
export function getNames(questions: Question[]): string[] {
    return questions.map((question) => question.name);
}

/***
 * Consumes an array of questions and returns the sum total of all their points added together.
 */
export function sumPoints(questions: Question[]): number {
    let totalPoints = 0;

    for (let i = 0; i < questions.length; i++) {
        totalPoints += questions[i].points;
    }

    return totalPoints;
}

/***
 * Consumes an array of questions and returns the sum total of the PUBLISHED questions.
 */
export function sumPublishedPoints(questions: Question[]): number {
    return questions
        .filter((question) => question.published) // Filter only published questions
        .reduce((total, question) => total + question.points, 0);
}

/***
 * Consumes an array of questions, and produces a Comma-Separated Value (CSV) string representation.
 * A CSV is a type of file frequently used to share tabular data; we will use a single string
 * to represent the entire file. The first line of the file is the headers "id", "name", "options",
 * "points", and "published". The following line contains the value for each question, separated by
 * commas. For the `options` field, use the NUMBER of options.
 *
 * Here is an example of what this will look like (do not include the border).
 *`
id,name,options,points,published
1,Addition,0,1,true
2,Letters,0,1,false
5,Colors,3,1,true
9,Shapes,3,2,false
` *
 * Check the unit tests for more examples!
 */
export function toCSV(questions: Question[]): string {
    const headers = "id,name,options,points,published";

    // Create an array to store the CSV lines
    const csvLines: string[] = [];

    // Iterate over each question and convert it to a CSV line
    for (const question of questions) {
        // Create an array to store the values of the question
        const questionValues: string[] = [];

        // Add the values to the questionValues array
        questionValues.push(question.id.toString());
        questionValues.push(question.name);
        questionValues.push(question.options.length.toString());
        questionValues.push(question.points.toString());
        questionValues.push(question.published.toString());

        // Convert the questionValues array to a CSV line
        const csvLine = questionValues.join(",");

        // Add the CSV line to the csvLines array
        csvLines.push(csvLine);
    }

    // Join the csvLines array with newlines to create the final CSV string
    const csvString = [headers, ...csvLines].join("\n");

    return csvString;
}

/**
 * Consumes an array of Questions and produces a corresponding array of
 * Answers. Each Question gets its own Answer, copying over the `id` as the `questionId`,
 * making the `text` an empty string, and using false for both `submitted` and `correct`.
 */
export function makeAnswers(questions: Question[]): Answer[] {
    const answers: Answer[] = questions.map((question) => ({
        questionId: question.id,
        text: "",
        submitted: false,
        correct: false
    }));

    return answers;
}

/***
 * Consumes an array of Questions and produces a new array of questions, where
 * each question is now published, regardless of its previous published status.
 */
export function publishAll(questions: Question[]): Question[] {
    const publishedQuestions: Question[] = [];

    for (const question of questions) {
        question.published = true;
        publishedQuestions.push(question);
    }

    return publishedQuestions;
}

/***
 * Consumes an array of Questions and produces whether or not all the questions
 * are the same type. They can be any type, as long as they are all the SAME type.
 */
export function sameType(questions: Question[]): boolean {
    if (questions.length === 0) {
        return true;
    }

    const firstQuestionType = questions[0].type;

    for (let i = 1; i < questions.length; i++) {
        if (questions[i].type !== firstQuestionType) {
            return false;
        }
    }

    return true;
}

/***
 * Consumes an array of Questions and produces a new array of the same Questions,
 * except that a blank question has been added onto the end. Reuse the `makeBlankQuestion`
 * you defined in the `objects.ts` file.
 */
export function addNewQuestion(
    questions: Question[],
    id: number,
    name: string,
    type: QuestionType
): Question[] {
    // Function to duplicate a question
    function duplicateQuestion(question: Question): Question {
        return {
            id, // Use the new ID
            name: question.name,
            type: question.type,
            body: question.body,
            options: [...question.options],
            expected: question.expected,
            points: question.points,
            published: question.published,
            expectedAnswer: question.expectedAnswer,
            status: question.status,
            questionText: question.questionText,
            text: question.text,
            title: question.title,
            setPublished: question.setPublished.bind(question),
            getStatus: question.getStatus.bind(question),
            isPublished: question.isPublished.bind(question),
            getText: question.getText.bind(question),
            toLowerCase: question.toLowerCase.bind(question),
            substring: question.substring.bind(question),
            setBody: question.setBody.bind(question),
            setExpected: question.setExpected.bind(question),
            addOption: question.addOption.bind(question)
        };
    }

    return questions.map((question) => {
        if (question.id === id) {
            return duplicateQuestion(question);
        } else {
            return question;
        }
    });
}

/***
 * Consumes an array of Questions and produces a new array of Questions, where all
 * the Questions are the same EXCEPT for the one with the given `targetId`. That
 * Question should be the same EXCEPT that its name should now be `newName`.
 */
export function renameQuestionById(
    questions: Question[],
    targetId: number,
    newName: string
): Question[] {
    return questions.map((question) => {
        if (question.id === targetId) {
            // Clone the question and update its name, keeping other properties intact
            return { ...question, name: newName };
        } else {
            // Return other questions as they are
            return question;
        }
    });
}

/***
 * Consumes an array of Questions and produces a new array of Questions, where all
 * the Questions are the same EXCEPT for the one with the given `targetId`. That
 * Question should be the same EXCEPT that its `type` should now be the `newQuestionType`
 * AND if the `newQuestionType` is no longer "multiple_choice_question" than the `options`
 * must be set to an empty list.
 */
export function changeQuestionTypeById(
    questions: Question[],
    targetId: number,
    newQuestionType: QuestionType
): Question[] {
    const updatedQuestions: Question[] = [];

    // Iterate through each question in the original array
    for (const question of questions) {
        // Check if the current question has the target ID
        if (question.id === targetId) {
            // Create a new question object with the updated question type
            const updatedQuestion: Question = {
                ...question,
                type: newQuestionType
            };

            // Add the updated question to the new array
            updatedQuestions.push(updatedQuestion);
        } else {
            // If the current question does not have the target ID, add it to the new array as is
            updatedQuestions.push(question);
        }
    }

    // Return the updated array of questions
    return updatedQuestions;
}

/**
 * Consumes an array of Questions and produces a new array of Questions, where all
 * the Questions are the same EXCEPT for the one with the given `targetId`. That
 * Question should be the same EXCEPT that its `option` array should have a new element.
 * If the `targetOptionIndex` is -1, the `newOption` should be added to the end of the list.
 * Otherwise, it should *replace* the existing element at the `targetOptionIndex`.
 *
 * Remember, if a function starts getting too complicated, think about how a helper function
 * can make it simpler! Break down complicated tasks into little pieces.
 */
export function editOption(
    questions: Question[],
    targetId: number,
    targetOptionIndex: number,
    newOption: string
): Question[] {
    return questions.map((question) => {
        // If the current question's ID matches the target ID, clone it and update the options
        if (question.id === targetId) {
            const updatedQuestion: Question = { ...question };
            if (targetOptionIndex === -1) {
                // Add the new option to the end of the options array
                updatedQuestion.options.push(newOption);
            } else if (
                targetOptionIndex >= 0 &&
                targetOptionIndex < updatedQuestion.options.length
            ) {
                // Replace the option at targetOptionIndex with the newOption
                updatedQuestion.options[targetOptionIndex] = newOption;
            }
            return updatedQuestion;
        } else {
            // For other questions, return them as is
            return question;
        }
    });
}

/***
 * Consumes an array of questions, and produces a new array based on the original array.
 * The only difference is that the question with id `targetId` should now be duplicated, with
 * the duplicate inserted directly after the original question. Use the `duplicateQuestion`
 * function you defined previously; the `newId` is the parameter to use for the duplicate's ID.
 */
export function duplicateQuestionInArray(
    questions: Question[],
    targetId: number,
    newId: number
): Question[] {
    const targetIndex = questions.findIndex(
        (question) => question.id === targetId
    );

    if (targetIndex === -1) {
        // If the target question with the specified ID is not found, return the original array as-is
        return questions;
    }

    // Duplicate the target question and provide the newId as the first argument
    const duplicatedQuestion = duplicateQuestion(newId, questions[targetIndex]);

    // Create a new array by inserting the duplicated question after the original one
    const newQuestions = [...questions];
    newQuestions.splice(targetIndex + 1, 0, duplicatedQuestion);

    return newQuestions;
}
