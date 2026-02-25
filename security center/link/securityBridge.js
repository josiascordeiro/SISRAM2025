function parseAllowedOrigins() {
  const raw = process.env.ALLOWED_ORIGINS || '';
  return new Set(raw.split(',').map((item) => item.trim()).filter(Boolean));
}

function enforceAllowedOrigins() {
  const allowed = parseAllowedOrigins();

  return (req, res, next) => {
    if (allowed.size === 0) {
      return next();
    }

    const origin = req.headers.origin || req.headers.referer || '';
    if (!origin) {
      return next();
    }

    const isAllowed = Array.from(allowed).some((value) => origin.includes(value));
    if (!isAllowed) {
      return res.status(403).send('Origin not permitted');
    }

    return next();
  };
}

module.exports = {
  enforceAllowedOrigins
};
