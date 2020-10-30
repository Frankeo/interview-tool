const { validateProjectIntegrity, runTestsOverProject } = require("./project-integrity");
const {
  FOLDER_NOT_FOUND,
  PACKAGE_JSON_NOT_FOUND,
  CATEGORIZATION_ERROR,
  WRONG_DIFFICULTY_LEVEL,
  WRONG_TOPIC,
  PACKAGE_JSON_FILE,
} = require("../constants");
const fs = require("fs-extra");
jest.mock("fs-extra");

const { spawnSync } = require("child_process");
jest.mock("child_process");

describe("checkFolderExists function", () => {
  beforeEach(() => {
    fs.pathExists.mockReturnValue(true);
    fs.readJSON.mockReturnValue({ keywords: ["easy", "numbers"] });
  });

  test("should throw PACKAGE_JSON_NOT_FOUND when package.json doesn't exist", () => {
    fs.pathExists.mockImplementation(
      (path) => !path.includes(PACKAGE_JSON_FILE)
    );
    const folderName = "SomeFolder";
    expect(
      async () => await validateProjectIntegrity(folderName)
    ).rejects.toThrowError(PACKAGE_JSON_NOT_FOUND);
  });

  test("should throw CATEGORIZATION_ERROR when package.json doesn't have keywords", () => {
    fs.readJSON.mockReturnValue({});
    const folderName = "SomeFolder";
    expect(
      async () => await validateProjectIntegrity(folderName)
    ).rejects.toThrowError(CATEGORIZATION_ERROR);
  });

  test("should throw CATEGORIZATION_ERROR when package.json has empty keywords", () => {
    fs.readJSON.mockReturnValue({ keywords: [] });
    const folderName = "SomeFolder";
    expect(
      async () => await validateProjectIntegrity(folderName)
    ).rejects.toThrowError(CATEGORIZATION_ERROR);
  });

  test("should throw CATEGORIZATION_ERROR when package.json has more than 2 keywords", () => {
    fs.readJSON.mockReturnValue({ keywords: ["1", "2", "3"] });
    const folderName = "SomeFolder";
    expect(
      async () => await validateProjectIntegrity(folderName)
    ).rejects.toThrowError(CATEGORIZATION_ERROR);
  });

  test("should throw WRONG_DIFFICULTY_LEVEL when first keyword is not valid difficulty", () => {
    fs.readJSON.mockReturnValue({ keywords: ["invalid", "2"] });
    const folderName = "SomeFolder";
    expect(
      async () => await validateProjectIntegrity(folderName)
    ).rejects.toThrowError(WRONG_DIFFICULTY_LEVEL);
  });

  test("should throw WRONG_TOPIC when second keyword is not valid topic", () => {
    fs.readJSON.mockReturnValue({ keywords: ["easy", "invalid"] });
    const folderName = "SomeFolder";
    expect(
      async () => await validateProjectIntegrity(folderName)
    ).rejects.toThrowError(WRONG_TOPIC);
  });

  test("should throw WRONG_TOPIC when second keyword is not valid topic", () => {
    fs.readJSON.mockReturnValue({ keywords: ["easy", "invalid"] });
    const folderName = "SomeFolder";
    expect(
      async () => await validateProjectIntegrity(folderName)
    ).rejects.toThrowError(WRONG_TOPIC);
  });
});

describe('runTestsOverProject function', () => {
  beforeEach(() => {
    spawnSync.mockClear();
  });

  test('should return an exception when installStatus is different form 0', () => {
    spawnSync.mockImplementation((_, keyword) => {
      if (keyword == "install") return { status: 1};
    });
    expect(async () => runTestsOverProject()).rejects.toThrowError();
  });

  test('should return an exception when testStatus is different form 0', () => {
    spawnSync.mockImplementation((_, keyword) => {
      if (keyword == "install") return { status: 0};
      if (keyword == "test") return { status: 1};
    });
    expect(async () => runTestsOverProject()).rejects.toThrowError();
  });

  test('should NO return anything when installStatus and testStatus is equal to 0', () => {
    spawnSync.mockImplementation((_, keyword) => {
      if (keyword == "install") return { status: 0};
      if (keyword == "test") return { status: 0};
    });

    runTestsOverProject();

    expect(spawnSync).toBeCalledTimes(2);
  });
})
