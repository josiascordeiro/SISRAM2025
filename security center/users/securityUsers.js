const { recordIp } = require('../shared/ipStore');

const authWindowMs = 10 * 60 * 1000;
const authMaxHits = 10;
const authBuckets = new Map();

function guardSensitive(paths = ['/login', '/users']) {
  return (req, res, next) => {
    const isSensitive = paths.some((p) => req.path.startsWith(p));
    if (isSensitive) {
      res.set('Cache-Control', 'no-store');
      if (process.env.FORCE_HTTPS === 'true' && req.protocol !== 'https') {
        return res.status(400).send('HTTPS required for sensitive routes');
      }
    }
    next();
  };
}

function rateLimitAuth() {
  return (req, res, next) => {
    const isLoginAttempt = req.method === 'POST' && req.path.startsWith('/login');
    if (!isLoginAttempt) {
      return next();
    }

    const now = Date.now();
    const raw = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
    const ip = raw.split(',')[0].trim() || 'unknown';
    const bucket = authBuckets.get(ip) || { count: 0, start: now };
    const elapsed = now - bucket.start;

    if (elapsed > authWindowMs) {
      authBuckets.set(ip, { count: 1, start: now });
      return next();
    }

    bucket.count += 1;
    authBuckets.set(ip, bucket);

    if (bucket.count > authMaxHits) {
      recordIp(req, 'auth-rate-limit');
      return res.status(429).send('Muitas tentativas de login. Aguarde e tente novamente.');
    }

    return next();
  };
}

module.exports = {
  guardSensitive,
  rateLimitAuth
};
