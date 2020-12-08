const { handler } = require("./command");
const { validateProjectIntegrity, hasFiles, getDirectories } = require("./project-integrity");
jest.mock("./project-integrity");
const { saveInDb } = require("../db/db-management");
jest.mock("../db/db-management");
const { logComplete, logError } = require("../services/formatting");
jest.mock("../services/formatting");

const obj = {
  directoryName: "randomText",
};

describe("testing handler for single Folder", () => {
  const errorMessage = "errorMessage";

  beforeEach(() => {
    logComplete.mockReset();
    logError.mockReset();
    hasFiles.mockImplementation(() => true);
  });

  test("should call logError if validateProjectIntegrity throw Error", async () => {
    validateProjectIntegrity.mockImplementation(() => {
      throw new Error(errorMessage);
    });
    await handler(obj);
    expect(logError).toHaveBeenCalledTimes(1);
    expect(logError).toHaveBeenCalledWith(errorMessage);
  });

  test("should call logError if saveInDb throw Error", async () => {
    saveInDb.mockImplementation(() => {
      throw new Error(errorMessage);
    });
    await handler(obj);
    expect(logError).toHaveBeenCalledTimes(1);
    expect(logError).toHaveBeenCalledWith(errorMessage);
  });

  test("should call logComplete if nothing happens", async () => {
    validateProjectIntegrity.mockImplementation(() =>
      Promise.resolve({ projectName: "projectName" })
    );
    saveInDb.mockImplementation(() => Promise.resolve());
    await handler(obj);
    expect(logComplete).toHaveBeenCalledTimes(1);
  });
});

describe("Testing handling alternatives", () => {
  beforeEach(() => {
    getDirectories.mockReset();
  })
  test("should call 'getDirectories' when Has no files", async () => {
    hasFiles.mockImplementation(() => false);
    await handler(obj);
    expect(getDirectories).toHaveBeenCalledTimes(1);
  });
  test("should NOT call 'getDirectories' when Has files", async () => {
    hasFiles.mockImplementation(() => true);
    await handler(obj);
    expect(getDirectories).not.toHaveBeenCalled();
  });
});
