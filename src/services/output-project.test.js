const { createOutputProject } = require("./output-project");
const { OUTPUT_FOLDER, TEST_FILE, EXERCISE_FILE } = require("../constants");

const fs = require("fs-extra");
jest.mock("fs-extra");
const path = require("path");
jest.mock("path");
require('find-up');
jest.mock("find-up");

describe("createOutputProject function", () => {
  const testKey = `${OUTPUT_FOLDER}/${TEST_FILE}`;
  const exerciseKey = `${OUTPUT_FOLDER}/${EXERCISE_FILE}`;
  const projectInfo = {
    testContent: "testContent",
    instructionsContent: "instructionsContent",
  };
  let dictionary;

  beforeEach(() => {
    dictionary = {
      [testKey]: null,
      [exerciseKey]: null,
    };
    fs.writeFile.mockImplementation((file, content) => {
      dictionary[file] = content;
    });
    path.resolve.mockImplementation((_path, folder) => folder);
  });

  test("should create files: src, test and exercise if 'mustHaveTest' is 'TRUE'", async () => {
    await createOutputProject(projectInfo, true);
    expect(dictionary[testKey]).toBe(projectInfo.testContent);
    expect(dictionary[exerciseKey]).toBe(projectInfo.instructionsContent);
  });

  test("should create files: src and exercise if 'mustHaveTest' is 'FALSE'", async () => {
    await createOutputProject(projectInfo, false);
    expect(dictionary[testKey]).toBeNull();
    expect(dictionary[exerciseKey]).toBe(projectInfo.instructionsContent);
  });
});
