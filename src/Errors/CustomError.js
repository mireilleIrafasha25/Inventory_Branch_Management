/**
 * CustomError is a custom error class that extend built in Error class.
 *It allows for creating custom error message and can be used to the throw customs errors.
 * @constructor 
 * @param {string}message The error message to be displayed when the error is thrown.
 */

export default class CustomError extends Error {
    /**
     * constructor For CustomError.
     * @param {string} message - The error message to be displayed when the error is thrown.
     */
    constructor(message) {
        // call the superclass constructor with the provided error message.
        super(message)
        
    }
}