const { handler } = require('./command');
const { deployProjectToCodeSandbox } = require("../services/deploy");
jest.mock("../services/deploy");
const { logError } = require("../services/formatting");
jest.mock("../services/formatting");
const Listr = require("listr");
jest.mock("listr");

describe('testing handler', () => {

    beforeEach(() => {
        logError.mockReset();
        Listr.mockReset();
    });

    test('should call logError if deployProjectToCodeSandbox throw Error', async () => {
        const errorMessage = "errorMessage";
        const obj = {
            topic: "randomText1", 
            difficulty: "randomText2", 
            project: "randomText3",
            noTests: false
        };
        deployProjectToCodeSandbox.mockImplementation(() => { throw new Error(errorMessage) })
        await handler(obj);
        expect(logError).toBeCalledTimes(1);
        expect(logError).toBeCalledWith(errorMessage);
    });
});