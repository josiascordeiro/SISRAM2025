const fs = require('fs');
const fsp = require('fs/promises');
const path = require('path');

const logDir = path.join(__dirname, '..', 'logs');
const ipLogFile = path.join(logDir, 'ip-events.log');

async function ensureLogDir() {
  if (!fs.existsSync(logDir)) {
    await fsp.mkdir(logDir, { recursive: true });
  }
}

async function recordIp(req, source = 'generic') {
  try {
    await ensureLogDir();
    if (!fs.existsSync(ipLogFile)) {
      await fsp.writeFile(ipLogFile, '', 'utf8');
    }
    const raw = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
    const ip = raw.split(',')[0].trim() || 'unknown';
    const entry = {
      ip,
      source,
      method: req.method,
      path: req.originalUrl || req.url,
      ua: req.headers['user-agent'] || 'unknown',
      ts: new Date().toISOString()
    };
    await fsp.appendFile(ipLogFile, JSON.stringify(entry) + '\n', 'utf8');
  } catch (err) {
    console.error('[ip-store] failed to record IP', err);
  }
}

function ipCapture(source = 'generic') {
  return (req, res, next) => {
    recordIp(req, source);
    next();
  };
}

module.exports = {
  ensureLogDir,
  recordIp,
  ipCapture,
  ipLogFile
};
