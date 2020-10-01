#!/usr/bin/env node

const { checkInputSanitization } = require("./src/sanitize-input");
const { argv } = require("process");
const {
  ProgramMode
} = require("./src/constants");
const { connectToDb } = require('./db/db-management');
const { addMode, selectMode } = require('./src/program-modes');

const main = async () => {
  connectToDb();
  const { type, params } = checkInputSanitization(argv);
  const { SELECT, ADD } = ProgramMode;
  switch (type) {
    case SELECT:
      await selectMode(params);
      break;
    case ADD:
      await addMode(params);
      break;
    default:
      break;
  }
};

main();
