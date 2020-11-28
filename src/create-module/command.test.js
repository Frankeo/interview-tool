const { handler } = require("./command");
const {
  createOutputFolder,
  addProjectConfig,
} = require("../services/output-project");
jest.mock("../services/output-project");
const { logComplete, logError } = require("../services/formatting");
jest.mock("../services/formatting");

describe("testing handler", () => {
  const errorMessage = "errorMessage";
  const obj = {
    topic: "randomText1",
    difficulty: "randomText2",
    projectName: "randomText3",
  };

  beforeEach(() => {
    logComplete.mockReset();
    logError.mockReset();
  });

  test("should call logError if createOutputFolder throw Error", async () => {
    createOutputFolder.mockImplementation(() => {
      throw new Error(errorMessage);
    });
    await handler(obj);
    expect(logError).toHaveBeenCalledTimes(1);
    expect(logError).toHaveBeenCalledWith(Error(errorMessage));
  });

  test("should call logError if addProjectConfig throw Error", async () => {
    addProjectConfig.mockImplementation(() => {
      throw new Error(errorMessage);
    });
    await handler(obj);
    expect(logError).toHaveBeenCalledTimes(1);
    expect(logError).toHaveBeenCalledWith(Error(errorMessage));
  });

  test("should call logComplete if nothing happens", async () => {
    createOutputFolder.mockImplementation(() => Promise.resolve());
    addProjectConfig.mockImplementation(() => Promise.resolve());
    await handler(obj);
    expect(logComplete).toHaveBeenCalledTimes(1);
  });
});
