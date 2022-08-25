const { resolve } = require('path');

const DOWNLOAD_FORMAT = 'mp3';

const BASE_URL = 'https://ytdl.etherio.fun';

const ROOT_DIR = resolve(__dirname, '..');

const STORAGE_DIR = resolve(ROOT_DIR, 'storage');

const IMPORT_FILE = resolve(ROOT_DIR, 'songs.txt');

module.exports = {
  DOWNLOAD_FORMAT,
  BASE_URL,
  ROOT_DIR,
  STORAGE_DIR,
  IMPORT_FILE,
};
