/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * ErrorProcessor runs selenium code and creates detailed stack trace which is swallowed otherwise.
 */
export default class ErrorProcessor {

    private constructor() { }

    /**
     * Runs specified asynchonous selenium function and produces error with detailed stack trace.
     * @param fn Asychonous function to be run.
     * @param errorMessage Error message to be displayed together with detailed stack trace if function fails.
     * @param args Parameters of the function.
     */
    public static async run<T>(fn: (...args: any[]) => Promise<T>, errorMessage: string, ...args: any[]): Promise<T> {

        // error must be created before selenium fails, otherwise the stack trace is swallowed
        const customError: Error = new Error(errorMessage);

        try {
            // call the function with arguments
            return await fn.call(args);
        } catch (err) {
            // print detailed stack trace
            console.error(customError.stack);
            throw err;
        }
    }
}
