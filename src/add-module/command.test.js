const { handler } = require('./command');
const { validateProjectIntegrity } = require("./project-integrity");
jest.mock("./project-integrity");
const { saveInDb } = require("../db/db-management");
jest.mock("../db/db-management");
const { logComplete, logError } = require("../services/formatting");
jest.mock("../services/formatting");

describe('testing handler', () => {
  const errorMessage = "errorMessage";
  const obj = {
      directoryName: "randomText"
  };

  beforeEach(() => {
      logComplete.mockReset();
      logError.mockReset();
  });

  test('should call logError if validateProjectIntegrity throw Error', async () => {
    validateProjectIntegrity.mockImplementation(() => { throw new Error(errorMessage) })
    await handler(obj);
    expect(logError).toBeCalledTimes(1);
    expect(logError).toBeCalledWith(errorMessage);
  });

  test('should call logError if saveInDb throw Error', async () => {
    saveInDb.mockImplementation(() => { throw new Error(errorMessage) })
    await handler(obj);
    expect(logError).toBeCalledTimes(1);
    expect(logError).toBeCalledWith(errorMessage);
  });

  test('should call logComplete if nothing happens', async () => {
    validateProjectIntegrity.mockImplementation(() => Promise.resolve({ projectName: "projectName"}));
    saveInDb.mockImplementation(() => Promise.resolve());
    await handler(obj);
    expect(logComplete).toBeCalledTimes(1);
  });
});