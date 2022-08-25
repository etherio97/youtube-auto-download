const {
  DOWNLOAD_FORMAT,
  BASE_URL,
  STORAGE_DIR,
  IMPORT_FILE,
} = require('./config');
const { default: axios } = require('axios');

/**
 *
 * @param {string} q
 * @returns {Promise<any[]>}
 */
const searchVideo = (q) =>
  axios.get(`${BASE_URL}/api/search/videos`, { params: { q } });

/**
 *
 * @param {string} q
 * @returns {Promise<any[]>}
 */
const getVideo = (q) => axios.get(`${BASE_URL}/api/index`, { params: { q } });

/**
 *
 * @param {string} vid
 * @param {string} k
 * @returns {Promise<any[]>}
 */
const generateVideo = (vid, k) =>
  axios.get(`${BASE_URL}/api/convert`, { params: { vid, k } });

/**
 *
 * @param {string} url
 * @returns {Promise<Buffer>}
 */
const downloadVideo = (url) =>
  axios.get(`${BASE_URL}/download`, {
    params: { url },
    responseType: 'arraybuffer',
  });

module.exports = {
  searchVideo,
  getVideo,
  generateVideo,
  downloadVideo,
};
