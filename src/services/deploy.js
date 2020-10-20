const { spawn } = require("child_process");

const deployProjectToCodeSandbox = () => {
  spawn("npm", ["run", "ship"], {
    cwd: __dirname,
    stdio: "inherit",
  });
};

module.exports = {
  deployProjectToCodeSandbox,
};
