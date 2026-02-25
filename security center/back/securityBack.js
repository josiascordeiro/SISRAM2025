const { recordIp } = require('../shared/ipStore');

const windowMs = 60 * 1000;
const maxHits = 120;
const buckets = new Map();

function basicHardening() {
  return (req, res, next) => {
    res.set('X-Frame-Options', 'DENY');
    res.set('X-Content-Type-Options', 'nosniff');
    res.set('Referrer-Policy', 'no-referrer');
    res.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
    next();
  };
}

function rateLimitBack() {
  return (req, res, next) => {
    const now = Date.now();
    const raw = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
    const ip = raw.split(',')[0].trim() || 'unknown';
    const bucket = buckets.get(ip) || { count: 0, start: now };
    const elapsed = now - bucket.start;

    if (elapsed > windowMs) {
      buckets.set(ip, { count: 1, start: now });
      return next();
    }

    bucket.count += 1;
    buckets.set(ip, bucket);

    if (bucket.count > maxHits) {
      recordIp(req, 'back-rate-limit');
      return res.status(429).send('Rate limit exceeded');
    }

    return next();
  };
}

module.exports = {
  basicHardening,
  rateLimitBack
};
