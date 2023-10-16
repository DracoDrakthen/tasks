import { Question, QuestionType } from "./interfaces/question";

/**
 * Create a new blank question with the given `id`, `name`, and `type. The `body` and
 * `expected` should be empty strings, the `options` should be an empty list, the `points`
 * should default to 1, and `published` should default to false.
 */
export function makeBlankQuestion(
    id: number,
    name: string,
    type: QuestionType
): Question {
    const newQuestion: Question = {
        id: id,
        name: name,
        type: type,
        body: "", // Initialize body with an empty string
        expected: "", // Initialize expected with an empty string
        options: [], // Initialize options as an empty list
        points: 1, // Set points to 1 by default
        published: false, // Set published to false by default
        expectedAnswer: "", // Add the expectedAnswer property with an empty string
        status: "", // Add the status property with an empty string
        questionText: "", // Add the questionText property with an empty string
        text: "", // Add the text property with an empty string
        title: "", // Add the title property with an empty string
        setPublished(isPublished: boolean): void {
            this.published = isPublished;
        },
        getStatus(): string {
            return this.status;
        },
        isPublished(): boolean {
            return this.published;
        },
        getText(): string {
            return this.text;
        },
        toLowerCase(): string {
            return this.text.toLowerCase();
        },
        substring(start: number, end: number): string {
            return this.text.substring(start, end);
        },
        setBody(body: string): void {
            this.body = body;
        },
        setExpected(expected: string): void {
            this.expected = expected;
        },
        addOption(option: string): void {
            this.options.push(option);
        }
    };

    return newQuestion;
}

/**
 * Consumes a question and a potential `answer`, and returns whether or not
 * the `answer` is correct. You should check that the `answer` is equal to
 * the `expected`, ignoring capitalization and trimming any whitespace.
 *
 * HINT: Look up the `trim` and `toLowerCase` functions.
 */
export function isCorrect(question: Question, answer: string): boolean {
    const formattedAnswer = answer.trim().toLowerCase();
    const formattedExpectedAnswer = question.expected.trim().toLowerCase();

    // Compare the formatted answer to the formatted expected answer
    return formattedAnswer === formattedExpectedAnswer;
}

/**
 * Consumes a question and a potential `answer`, and returns whether or not
 * the `answer` is valid (but not necessarily correct). For a `short_answer_question`,
 * any answer is valid. But for a `multiple_choice_question`, the `answer` must
 * be exactly one of the options.
 */
export function isValid(question: Question, answer: string): boolean {
    if (question.type === "short_answer_question") {
        // For short answer questions, any answer is considered valid
        return true;
    } else if (
        question.type === "multiple_choice_question" &&
        question.options
    ) {
        // For multiple choice questions, the answer must be one of the options
        return question.options.includes(answer);
    }

    // If the question type is not recognized or it's a multiple choice question without options, consider it invalid
    return false;
}

/**
 * Consumes a question and produces a string representation combining the
 * `id` and first 10 characters of the `name`. The two strings should be
 * separated by ": ". So for example, the question with id 9 and the
 * name "My First Question" would become "9: My First Q".
 */
export function toShortForm(question: Question): string {
    const idString = question.id.toString();
    const nameSubstring = question.name.substring(0, 10);

    return `${idString}: ${nameSubstring}`;
}

/**
 * Consumes a question and returns a formatted string representation as follows:
 *  - The first line should be a hash sign, a space, and then the `name`
 *  - The second line should be the `body`
 *  - If the question is a `multiple_choice_question`, then the following lines
 *      need to show each option on its line, preceded by a dash and space.
 *
 * The example below might help, but don't include the border!
 * ----------Example-------------
 * |# Name                      |
 * |The body goes here!         |
 * |- Option 1                  |
 * |- Option 2                  |
 * |- Option 3                  |
 * ------------------------------
 * Check the unit tests for more examples of what this looks like!
 */
export function toMarkdown(question: Question): string {
    let formattedQuestion = `# ${question.name}\n${question.body}`;

    if (question.type === "multiple_choice_question" && question.options) {
        const optionLines = question.options.map((option) => `- ${option}`);
        formattedQuestion += "\n" + optionLines.join("\n");
    }

    return formattedQuestion;
}

/**
 * Return a new version of the given question, except the name should now be
 * `newName`.
 */
export function renameQuestion(question: Question, newName: string): Question {
    const updatedQuestion = { ...question };
    updatedQuestion.name = newName;
    return updatedQuestion;
}

/**
 * Return a new version of the given question, except the `published` field
 * should be inverted. If the question was not published, now it should be
 * published; if it was published, now it should be not published.
 */
export function publishQuestion(question: Question): Question {
    const updatedQuestion: Question = { ...question };

    // Invert the `published` field
    updatedQuestion.published = !question.published;

    return updatedQuestion;
}

/**
 * Create a new question based on the old question, copying over its `body`, `type`,
 * `options`, `expected`, and `points` without changes. The `name` should be copied
 * over as "Copy of ORIGINAL NAME" (e.g., so "Question 1" would become "Copy of Question 1").
 * The `published` field should be reset to false.
 */
export function duplicateQuestion(id: number, oldQuestion: Question): Question {
    const newQuestion: Question = {
        id,
        name: `Copy of ${oldQuestion.name}`,
        body: oldQuestion.body,
        type: oldQuestion.type,
        options: [...oldQuestion.options],
        expected: oldQuestion.expected,
        points: oldQuestion.points,
        published: false,
        expectedAnswer: oldQuestion.expectedAnswer,
        status: oldQuestion.status,
        questionText: oldQuestion.questionText,
        title: oldQuestion.title,
        text: oldQuestion.text,
        setPublished: oldQuestion.setPublished,
        getStatus: oldQuestion.getStatus,
        isPublished: oldQuestion.isPublished,
        getText: oldQuestion.getText,
        toLowerCase: oldQuestion.toLowerCase,
        substring: oldQuestion.substring,
        setBody: oldQuestion.setBody,
        setExpected: oldQuestion.setExpected,
        addOption: oldQuestion.addOption
    };

    // Add missing properties
    newQuestion.addOption = oldQuestion.addOption;
    newQuestion.setBody = oldQuestion.setBody;
    newQuestion.setExpected = oldQuestion.setExpected;
    return newQuestion;
}

/**
 * Return a new version of the given question, with the `newOption` added to
 * the list of existing `options`. Remember that the new Question MUST have
 * its own separate copy of the `options` list, rather than the same reference
 * to the original question's list!
 * Check out the subsection about "Nested Fields" for more information.
 */
export function addOption(question: Question, newOption: string): Question {
    const updatedQuestion: Question = { ...question };

    updatedQuestion.options.push(newOption);

    return updatedQuestion;
}

/**
 * Consumes an id, name, and two questions, and produces a new question.
 * The new question will use the `body`, `type`, `options`, and `expected` of the
 * `contentQuestion`. The second question will provide the `points`.
 * The `published` status should be set to false.
 * Notice that the second Question is provided as just an object with a `points`
 * field; but the function call would be the same as if it were a `Question` type!
 */
export function mergeQuestion(
    id: number,
    name: string,
    contentQuestion: Question,
    { points }: { points: number }
): Question {
    return {
        ...contentQuestion,
        id: id,
        name: name,
        published: false,
        points: points
    };
}
