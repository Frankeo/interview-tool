const {
  validateProjectDifficultyAndTopic,
  runTestsOverProject,
  getFile,
} = require("./project-integrity");
const {
  PACKAGE_JSON_NOT_FOUND,
  CATEGORIZATION_ERROR,
  WRONG_DIFFICULTY_LEVEL,
  WRONG_TOPIC,
  PACKAGE_JSON_FILE,
} = require("../constants");
const fs = require("fs-extra");
jest.mock("fs-extra");

const path = require("path");
jest.mock("path");

const execa = require("execa");
jest.mock("execa");

describe("validateProjectDifficultyAndTopic function", () => {
  const projectPath = "SomeFolder";

  beforeEach(() => {
    fs.pathExists.mockReturnValue(true);
    path.resolve = jest.fn((_, second) => second);
    fs.readJSON.mockReturnValue({keywords : [ "easy", "numbers" ]});
  });

  test("should throw PACKAGE_JSON_NOT_FOUND when package.json doesn't exist",
       async () => {
         fs.pathExists.mockImplementation(
             (path) => !path.includes(PACKAGE_JSON_FILE));
         await expect(async () =>
                          await validateProjectDifficultyAndTopic(projectPath))
             .rejects.toThrow(PACKAGE_JSON_NOT_FOUND);
       });

  test(
      "should throw CATEGORIZATION_ERROR when package.json doesn't have keywords",
      async () => {
        fs.readJSON.mockReturnValue({});
        await expect(async () =>
                         await validateProjectDifficultyAndTopic(projectPath))
            .rejects.toThrow(CATEGORIZATION_ERROR);
      });

  test("should throw CATEGORIZATION_ERROR when package.json has empty keywords",
       async () => {
         fs.readJSON.mockReturnValue({keywords : []});
         await expect(async () =>
                          await validateProjectDifficultyAndTopic(projectPath))
             .rejects.toThrow(CATEGORIZATION_ERROR);
       });

  test(
      "should throw CATEGORIZATION_ERROR when package.json has more than 2 keywords",
      async () => {
        fs.readJSON.mockReturnValue({keywords : [ "1", "2", "3" ]});
        await expect(async () =>
                         await validateProjectDifficultyAndTopic(projectPath))
            .rejects.toThrow(CATEGORIZATION_ERROR);
      });

  test(
      "should throw WRONG_DIFFICULTY_LEVEL when first keyword is not valid difficulty",
      async () => {
        fs.readJSON.mockReturnValue({keywords : [ "invalid", "2" ]});
        await expect(async () =>
                         await validateProjectDifficultyAndTopic(projectPath))
            .rejects.toThrow(WRONG_DIFFICULTY_LEVEL);
      });

  test("should throw WRONG_TOPIC when second keyword is not valid topic",
       async () => {
         fs.readJSON.mockReturnValue({keywords : [ "easy", "invalid" ]});
         await expect(async () =>
                          await validateProjectDifficultyAndTopic(projectPath))
             .rejects.toThrow(WRONG_TOPIC);
       });
});

describe("runTestsOverProject function", () => {
  beforeEach(() => { jest.clearAllMocks(); });

  test("should return an Error when install throw an Error", async () => {
    const error = "error";
    execa.mockImplementation((_, keyword) => {
      if (keyword == "install")
        throw new Error(error);
    });
    await expect(async () => await runTestsOverProject().run())
        .rejects.toThrow(error);
  });

  test("should return an Error when tests throw an Error", async () => {
    const error = "error";
    execa.mockImplementation((_, keyword) => {
      if (keyword == "test")
        throw new Error(error);
    });
    await expect(async () => await runTestsOverProject().run())
        .rejects.toThrow(error);
  });

  test("should NO return anything when install and test are OK", async () => {
    execa.mockReset();
    execa.mockImplementation((_, keyword) => {
      if (keyword == "install")
        return Promise.resolve();
      if (keyword == "test")
        return Promise.resolve();
    });
    await runTestsOverProject().run();

    expect(execa).toHaveBeenCalledTimes(2);
  });
});

describe("getFile function", () => {
  beforeEach(() => { path.resolve.mockReturnValue("someString"); });

  test("should throw an error when the path does not exist", async () => {
    const error = "error";
    fs.pathExists.mockReturnValue(Promise.resolve(false));
    await expect(async () => await getFile("projectPath", "fileName", error))
        .rejects.toThrow(error);
  });

  test("should return the file content when the path exists", async () => {
    const fileContent = "";
    fs.readFile.mockReturnValue(fileContent);
    fs.pathExists.mockReturnValue(Promise.resolve(true));
    const result = await getFile("projectPath", "fileName", "error");
    expect(result).toBe(fileContent);
  });
});
