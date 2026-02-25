const path = require('path');
const fs = require('fs');
const sqlite3 = require('sqlite3');

const dbPath = path.join(__dirname, '..', 'local.db');

if (fs.existsSync(dbPath)) {
  fs.rmSync(dbPath);
  console.log('[db:init] local.db removido para recriar do zero');
}

const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS enviar_atestado (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    matricula INTEGER,
    nome TEXT,
    data_entrega TEXT,
    data_afastamento TEXT,
    periodo INTEGER,
    foto_afastamento BLOB,
    motivo TEXT,
    turma TEXT
  );`);

  const stmt = db.prepare(`INSERT INTO enviar_atestado
    (matricula, nome, data_entrega, data_afastamento, periodo, foto_afastamento, motivo, turma)
    VALUES (?,?,?,?,?,?,?,?)`);

  const seed = [
    [12345, 'Aluno Exemplo', '2025-02-20', '2025-02-22', 1, null, 'Atestado médico de exemplo', '2ADS'],
    [23456, 'Aluno B', '2025-02-18', '2025-02-21', 2, null, 'Revisão médica', '1BDS']
  ];

  seed.forEach((row) => stmt.run(row));
  stmt.finalize();
});

db.close(() => {
  console.log('[db:init] local.db criado com tabela enviar_atestado e dados de exemplo');
});
