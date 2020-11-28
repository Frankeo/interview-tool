describe("testing LogError", () => {
  const { logError } = require("./formatting");
  const signale = require("signale");
  jest.mock("signale");

  beforeEach(() => {
    signale.fatal = jest.fn();
  });

  it("should log a text in red bold", () => {
    const text = "pepe";
    logError(text);
    expect(signale.fatal).toBeCalledTimes(1);
    expect(signale.fatal).toBeCalledWith(text);
  });
});

describe("testing logInfo", () => {
  const { logInfo } = require("./formatting");
  const chalk = require("chalk");
  const signale = require("signale");
  jest.mock("signale");

  beforeEach(() => {
    signale.info = jest.fn();
  });

  it("should log a text in green bold", () => {
    const text = "pepe";
    logInfo(text);
    expect(signale.info).toBeCalledTimes(1);
    expect(signale.info).toBeCalledWith(chalk.bold(text));
  });
});

describe("testing logComplete", () => {
  const { logComplete } = require("./formatting");
  const chalk = require("chalk");
  const signale = require("signale");
  jest.mock("signale");

  beforeEach(() => {
    signale.complete = jest.fn();
  });

  it("should log a text in green bold", () => {
    const text = "pepe";
    const declaration = "declaration";
    logComplete(text, declaration);
    expect(signale.complete).toBeCalledTimes(1);
    expect(signale.complete).toBeCalledWith({
      message: chalk.bold(text),
      prefix: " ",
      suffix: chalk.grey(`(${declaration})`),
    });
  });
});
