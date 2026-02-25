const defaults = {
  host: 'gondola.proxy.rlwy.net',
  user: 'root',
  database: 'railway'
};

function runStartupChecks() {
  const warnings = [];
  const host = process.env.MYSQL_HOST || defaults.host;
  const user = process.env.MYSQL_USER || defaults.user;
  const database = process.env.MYSQL_DATABASE || defaults.database;
  const password = process.env.MYSQL_PASSWORD;

  if (!password) {
    warnings.push('MYSQL_PASSWORD ausente. Defina uma senha forte.');
  }
  if (host === defaults.host) {
    warnings.push('MYSQL_HOST usando valor padrão. Ajuste para o host privado.');
  }
  if (user === defaults.user) {
    warnings.push('MYSQL_USER usando valor padrão. Use usuário dedicado.');
  }
  if (database === defaults.database) {
    warnings.push('MYSQL_DATABASE usando valor padrão.');
  }

  if (warnings.length > 0) {
    console.warn('[security-db] Configuração potencialmente insegura:', warnings.join(' | '));
  }
}

module.exports = {
  runStartupChecks
};
