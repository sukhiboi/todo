const DATA_STORE_PATH =
  process.env.DATA_STORE_PATH || `${__dirname}/data/datastore.json`;
const USERS_PATH = process.env.USERS_PATH || `${__dirname}/data/users.json`;
DATA_STORAGE_PATH = process.env.DATA_STORE_PATH || `${__dirname}/data`;
module.exports = { DATA_STORE_PATH, USERS_PATH, DATA_STORAGE_PATH };
