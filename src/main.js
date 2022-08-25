const { IMPORT_FILE, DOWNLOAD_FORMAT, STORAGE_DIR } = require('./config');
const { readFileSync, createWriteStream } = require('fs');
const {
  searchVideo,
  getVideo,
  generateVideo,
  downloadVideo,
} = require('./ytdl');
const consola = require('consola');
const { resolve } = require('path');

(async () => {
  consola.info('Reading songs list from local');
  const songsList = readFileSync(IMPORT_FILE, 'utf-8')
    .split('\n')
    .map((n) => n.trim())
    .filter((n) => !!n);

  for (const song of songsList) {
    try {
      consola.info('Searching from Youtube: %s', song);
      const { data } = await searchVideo(song);
      if (data.length) {
        const { title, videoId, thumbnail, seconds, timestamp } = data[0];
        try {
          consola.info('Fetching video detail: %s (%s)', title, timestamp);
          const { data } = await getVideo(videoId);
          const formats = Object.values(data.links[DOWNLOAD_FORMAT] ?? []);
          if (formats.length) {
            const { size, q_text, k } = formats[0];
            consola.info('Preparing to download: %s (%s)', q_text, size);
            try {
              const {
                data: { dlink },
              } = await generateVideo(videoId, k);
              try {
                const target = resolve(
                  STORAGE_DIR,
                  song.replace(/('|"|&)/gim, '') + '.' + DOWNLOAD_FORMAT
                );
                consola.info('Downloading video to: %s', target);
                const { data } = await downloadVideo(dlink);
                createWriteStream(target).write(data);
                consola.info('Completed!');
              } catch (err) {
                consola.warn(
                  'Failed to download: %s',
                  err.response?.statusText || err
                );
              }

              //
            } catch (err) {
              consola.warn(
                'Unable to generate download link: %s',
                err.response?.statusText || err
              );
            }
          } else {
            consola.warn(
              'Unavailable format: %s',
              err.response?.statusText || err
            );
          }
        } catch (err) {
          consola.error(
            'Failed to fetch detail: %s',
            err.response?.statusText || err
          );
        }
      } else {
        consola.warn('Not found song: %s', song);
      }
      console.log();
    } catch (err) {
      consola.error('Failed to search: %s', err.response?.statusText || err);
    }
  }
})().catch((err) => {
  consola.error('An Unexcepted Error');
  console.error(err);
});
