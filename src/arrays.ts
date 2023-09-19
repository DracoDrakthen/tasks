/**
 * Consume an array of numbers, and return a new array containing
 * JUST the first and last number. If there are no elements, return
 * an empty array. If there is one element, the resulting list should
 * the number twice.
 */
export function bookEndList(numbers: number[]): number[] {
    const result: number[] = [];

    if (numbers.length === 0) {
        return result;
    } else if (numbers.length === 1) {
        result.push(numbers[0]);
        result.push(numbers[0]);
    } else {
        result.push(numbers[0]);
        result.push(numbers[numbers.length - 1]);
    }
    return result;
}

/**
 * Consume an array of numbers, and return a new array where each
 * number has been tripled (multiplied by 3).
 */
export function tripleNumbers(numbers: number[]): number[] {
    return numbers.map((num) => num * 3);
}

/**
 * Consume an array of strings and convert them to integers. If
 * the number cannot be parsed as an integer, convert it to 0 instead.
 */
export function stringsToIntegers(numbers: string[]): number[] {
    const integers: number[] = [];
    for (const str of numbers) {
        const parsedInt = parseInt(str, 10);
        const intValue = isNaN(parsedInt) ? 0 : parsedInt;
        integers.push(intValue);
    }

    return integers;
}

/**
 * Consume an array of strings and return them as numbers. Note that
 * the strings MAY have "$" symbols at the beginning, in which case
 * those should be removed. If the result cannot be parsed as an integer,
 * convert it to 0 instead.
 */
// Remember, you can write functions as lambdas too! They work exactly the same.
export const removeDollars = (amounts: string[]): number[] => {
    const numbers: number[] = [];
    for (const str of amounts) {
        const num = parseInt(str.replace("$", ""), 10);
        numbers.push(isNaN(num) ? 0 : num);
    }
    return numbers;
};

/**
 * Consume an array of messages and return a new list of the messages. However, any
 * string that ends in "!" should be made uppercase. Also, remove any strings that end
 * in question marks ("?").
 */
export const shoutIfExclaiming = (messages: string[]): string[] => {
    const shoutedMessages: string[] = [];
    for (const message of messages) {
        if (message.endsWith("!")) {
            shoutedMessages.push(message.toUpperCase());
        } else if (!message.endsWith("?")) {
            shoutedMessages.push(message);
        }
    }
    return shoutedMessages;
};

/**
 * Consumes an array of words and returns the number of words that are LESS THAN
 * 4 letters long.
 */
export function countShortWords(words: string[]): number {
    let shortWordCount = 0;
    for (const word of words) {
        if (word.length < 4) {
            shortWordCount++;
        }
    }
    return shortWordCount;
}

/**
 * Consumes an array of colors (e.g., 'red', 'purple') and returns true if ALL
 * the colors are either 'red', 'blue', or 'green'. If an empty list is given,
 * then return true.
 */
export function allRGB(colors: string[]): boolean {
    if (colors.length === 0) {
        return true;
    }

    for (const color of colors) {
        if (color !== "red" && color !== "blue" && color !== "green") {
            return false;
        }
    }
    return true;
}

/**
 * Consumes an array of numbers, and produces a string representation of the
 * numbers being added together along with their actual sum.
 *
 * For instance, the array [1, 2, 3] would become "6=1+2+3".
 * And the array [] would become "0=0".
 */
export function makeMath(addends: number[]): string {
    const sum = addends.reduce((acc, curr) => acc + curr, 0);

    const sumString = `${sum}=${addends.join("+") || "0"}`;

    return sumString;
}

/**
 * Consumes an array of numbers and produces a new array of the same numbers,
 * with one difference. After the FIRST negative number, insert the sum of all
 * previous numbers in the list. If there are no negative numbers, then append
 * the sum to the list.
 *
 * For instance, the array [1, 9, -5, 7] would become [1, 9, -5, 10, 7]
 * And the array [1, 9, 7] would become [1, 9, 7, 17]
 */
export function injectPositive(values: number[]): number[] {
    const newValue: number[] = [];

    let sum = 0;

    let negativeFound = false;
    for (let i = 0; i < values.length; i++) {
        newValue.push(values[i]);

        if (values[i] < 0 && !negativeFound) {
            newValue.push(sum);
            negativeFound = true;
        }
        sum += values[i];
    }
    if (!negativeFound) {
        newValue.push(sum);
    }
    return newValue;
}
