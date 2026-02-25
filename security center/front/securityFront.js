function frontHeaders() {
  const csp = [
    "default-src 'self'",
    "img-src 'self' data: https://www.gstatic.com https://www.google.com",
    "style-src 'self' 'unsafe-inline'",
    "script-src 'self' 'unsafe-inline' https://www.gstatic.com https://www.googleapis.com https://apis.google.com https://accounts.google.com",
    "connect-src 'self' https://www.googleapis.com https://securetoken.googleapis.com https://identitytoolkit.googleapis.com https://firebasestorage.googleapis.com https://www.gstatic.com",
    "frame-src https://accounts.google.com https://apis.google.com",
    "frame-ancestors 'none'"
  ].join('; ');
  return (req, res, next) => {
    res.set('Content-Security-Policy', csp);
    res.set('Cross-Origin-Resource-Policy', 'same-origin');
    res.set('Cross-Origin-Opener-Policy', 'same-origin');
    res.set('X-Permitted-Cross-Domain-Policies', 'none');
    next();
  };
}

module.exports = {
  frontHeaders
};
