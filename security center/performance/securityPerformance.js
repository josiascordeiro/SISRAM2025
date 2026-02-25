const path = require('path');
const fsp = require('fs/promises');
const { ensureLogDir } = require('../shared/ipStore');

const perfLogFile = path.join(__dirname, '..', 'logs', 'performance.log');

function measureResponse(thresholdMs = 500) {
  return (req, res, next) => {
    const start = process.hrtime.bigint();

    res.on('finish', () => {
      const elapsedNs = process.hrtime.bigint() - start;
      const elapsedMs = Number(elapsedNs) / 1e6;

      if (elapsedMs > thresholdMs) {
        const entry = {
          path: req.originalUrl || req.url,
          method: req.method,
          status: res.statusCode,
          ms: Number(elapsedMs.toFixed(2)),
          ts: new Date().toISOString()
        };

        ensureLogDir()
          .then(() => fsp.appendFile(perfLogFile, JSON.stringify(entry) + '\n', 'utf8'))
          .catch((err) => console.error('[perf-log] failed to write', err));
      }
    });

    next();
  };
}

module.exports = {
  measureResponse
};
