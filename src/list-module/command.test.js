const { handler } = require('./command');
const { getAllChallenges } = require("../db/db-management");
jest.mock("../db/db-management");
const { logInfo, logResultTable, logError } = require("../services/formatting");
jest.mock("../services/formatting");

describe('testing handler', () => {

    beforeEach(() => {
        logInfo.mockReset();
        logResultTable.mockReset();
        logError.mockReset();
    });

    test('should call logInfo if getAllChallenges not return any project', async () => {
        getAllChallenges.mockImplementation(() => undefined)
        await handler();
        expect(logInfo).toBeCalledTimes(1);
        expect(logInfo).toBeCalledWith('Not project to show, please add one');
    });

    test('should call logInfo if getAllChallenges return any project', async () => {
        const projects = ["project"];
        getAllChallenges.mockImplementation(() => projects);
        await handler();
        expect(logInfo).toBeCalledTimes(1);
        expect(logInfo).toBeCalledWith('Interview challenges');
        expect(logResultTable).toBeCalledTimes(1);
        expect(logResultTable).toBeCalledWith(projects);
    });

    test('should call logError if getAllChallenges throw an Error', async () => {
        const error = "error";
        getAllChallenges.mockImplementation(() => { throw new Error(error);} );
        await handler();
        expect(logError).toBeCalledTimes(1);
        expect(logError).toBeCalledWith(Error(error));
    });
});