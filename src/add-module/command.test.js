const { handler } = require('./command');
const { validateProjectIntegrity } = require("./project-integrity");
jest.mock("./project-integrity");
const { saveInDb } = require("../db/db-management");
jest.mock("../db/db-management");
const { logComplete, logError } = require("../services/formatting");
jest.mock("../services/formatting");

describe('testing handler', () => {

    beforeEach(() => {
        logComplete.mockReset();
        logError.mockReset();
    });

    test('should call logError if validateProjectIntegrity throw Error', async () => {
        const errorMessage = "errorMessage";
        const obj = {
            directoryName: "randomText"
        };
        validateProjectIntegrity.mockImplementation(() => { throw new Error(errorMessage) })
        await handler(obj);
        expect(logError).toBeCalledTimes(1);
        expect(logError).toBeCalledWith(Error(errorMessage));
    });

    test('should call logError if validateProjectIntegrity throw Error', async () => {
        const errorMessage = "errorMessage";
        const obj = {
            directoryName: "randomText"
        };
        saveInDb.mockImplementation(() => { throw new Error(errorMessage) })
        await handler(obj);
        expect(logError).toBeCalledTimes(1);
        expect(logError).toBeCalledWith(Error(errorMessage));
    });

    test('should call logComplete if nothing happens', async () => {
        const obj = {
            directoryName: "randomText"
        };
        validateProjectIntegrity.mockImplementation(() => Promise.resolve({ projectName: "projectName"}));
        saveInDb.mockImplementation(() => Promise.resolve());
        await handler(obj);
        expect(logComplete).toBeCalledTimes(1);
    });
});