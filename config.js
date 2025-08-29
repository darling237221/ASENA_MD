// config.js
"use strict";

const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");

// load env if config.env present
if (fs.existsSync(path.resolve("config.env"))) {
  require("dotenv").config({ path: "./config.env" });
}

// helper
function convertToBool(text, fault = "true") {
  if (text === undefined || text === null) return false;
  return String(text).trim() === String(fault).trim();
}

// helper trim
function trimEnv(v) {
  if (v === undefined || v === null) return v;
  return String(v).trim();
}

// Env values (trimmed)
const DATABASE_URL_RAW = trimEnv(process.env.DATABASE_URL) || "./whatsasena.db";
const DEBUG = process.env.DEBUG === undefined ? false : convertToBool(process.env.DEBUG);
const CLR_SESSION = process.env.CLR_SESSION === undefined ? false : convertToBool(process.env.CLR_SESSION);
const SESSION = process.env.ASENA_SESSION === undefined ? null : trimEnv(process.env.ASENA_SESSION);
const PAIR_NUMBER = process.env.PAIR_NUMBER === undefined ? null : trimEnv(process.env.PAIR_NUMBER);
const LANG = (process.env.LANGUAGE === undefined ? "EN" : trimEnv(process.env.LANGUAGE)).toUpperCase();
const HANDLERS = process.env.HANDLERS === undefined ? "^[.]" : trimEnv(process.env.HANDLERS);

// Determine DB type: local sqlite if path looks like a local file, else use the URL directly
let sequelize;
if (
  DATABASE_URL_RAW === "./whatsasena.db" ||
  DATABASE_URL_RAW.endsWith(".db") ||
  DATABASE_URL_RAW.endsWith(".sqlite")
) {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: DATABASE_URL_RAW,
    logging: DEBUG ? console.log : false,
  });
} else {
  // assume DATABASE_URL is a full connection string (postgres, mysql, etc.)
  // For postgres with SSL (Heroku), keep the dialectOptions.
  sequelize = new Sequelize(DATABASE_URL_RAW, {
    logging: DEBUG ? console.log : false,
    dialectOptions: DATABASE_URL_RAW.startsWith("postgres")
      ? { ssl: { require: true, rejectUnauthorized: false } }
      : undefined,
  });
}

module.exports = {
  // Sequelize instance used by the project
  DATABASE: sequelize,
  DATABASE_URL: DATABASE_URL_RAW,

  // runtime flags
  DEBUG,
  CLR_SESSION,
  SESSION, // base64/string session (ou null)
  PAIR_NUMBER, // ex: '237699012345' (countrycode + number, no +)

  // metadata / defaults
  VERSION: process.env.VERSION || "v1.2.8",
  EXT: process.env.EXT === undefined ? undefined : trimEnv(process.env.EXT),
  LANG,
  HANDLERS,
  SEND_READ: process.env.SEND_READ === undefined ? false : convertToBool(process.env.SEND_READ),
  BRANCH: process.env.BRANCH || "master",

  // heroku config placeholders
  HEROKU: {
    HEROKU: process.env.HEROKU === undefined ? false : convertToBool(process.env.HEROKU),
    API_KEY: process.env.HEROKU_API_KEY === undefined ? "" : trimEnv(process.env.HEROKU_API_KEY),
    APP_NAME: process.env.HEROKU_APP_NAME === undefined ? "" : trimEnv(process.env.HEROKU_APP_NAME),
  },

  // misc defaults kept (tu peux ajuster)
  NO_ONLINE: process.env.NO_ONLINE === undefined ? true : convertToBool(process.env.NO_ONLINE),
  SUDO: process.env.SUDO === undefined ? false : trimEnv(process.env.SUDO),
  REMOVEBG: process.env.REMOVEBG_KEY === undefined ? "false" : trimEnv(process.env.REMOVEBG_KEY),
  WARN_COUNT: process.env.WARN_COUNT === undefined ? 3 : Number(trimEnv(process.env.WARN_COUNT) || 3),
  WARN_MSG: process.env.WARN_MSG === undefined ? "Ok bie" : trimEnv(process.env.WARN_MSG),
  ANTIJID: process.env.ANTIJID === undefined ? "" : trimEnv(process.env.ANTIJID),
  STICKER_PACKNAME: process.env.STICKER_PACKNAME === undefined ? "🥰,lyfe00011" : trimEnv(process.env.STICKER_PACKNAME),
  BRAINSHOP: process.env.BRAINSHOP === undefined ? "159501,6pq8dPiYt7PdqHz3" : trimEnv(process.env.BRAINSHOP),
  DIS_BOT: process.env.DISABLE_BOT === undefined ? "null" : trimEnv(process.env.DISABLE_BOT),
  FIND_API_KEY: process.env.FIND_API_KEY === undefined ? "null" : trimEnv(process.env.FIND_API_KEY),
};
