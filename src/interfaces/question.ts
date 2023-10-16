/** QuestionType influences how a question is asked and what kinds of answers are possible */
export type QuestionType =
    | "multiple_choice_question"
    | "short_answer_question"
    | "true_or_false";

/** A representation of a Question in a quizzing application */
export interface Question {
    id: number;
    name: string;
    type: QuestionType;
    body: string;
    expected: string;
    options: string[];
    points: number;
    published: boolean;
    expectedAnswer: string;
    status: string;
    questionText: string;
    text: string;
    title: string;

    //methods
    setPublished(isPublished: boolean): void;
    getStatus(): string;
    getOptions?: () => string[];
    getId?: () => number;
    setName?: (newName: string) => void;
    isPublished(): boolean;
    getText(): string;
    toLowerCase(): string;
    substring(start: number, end: number): string;
    setBody(body: string): void;
    setExpected(expected: string): void;
    addOption(option: string): void;
}
