module.exports = {
  apps: [{
    name: 'sisram',
    script: './bin/www',
    cwd: __dirname,
    instances: 1,
    autorestart: true,
    watch: false,
    env: {
      NODE_ENV: 'production',
      PORT: process.env.PORT || 3000
    }
  }]
};
