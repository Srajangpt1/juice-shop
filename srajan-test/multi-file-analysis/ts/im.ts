import { getUserInput } from './source';

export function processInput(): string {
    // The tainted input flows through this function
    const userInput = getUserInput();
    return userInput;
}
