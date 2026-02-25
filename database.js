const path = require('path');
const mysql = require('mysql2/promise');
const sqlite3 = require('sqlite3');
const { promisify } = require('util');

const DB_DRIVER = (process.env.DB_DRIVER || 'sqlite').toLowerCase();
const SQLITE_FILE = path.join(__dirname, 'local.db');

async function connectSqlite() {
    if (global.connection && global.connection.driver === 'sqlite') {
        return global.connection;
    }

    const db = new sqlite3.Database(SQLITE_FILE);
    const all = promisify(db.all).bind(db);
    const run = promisify(db.run).bind(db);

    await run(`CREATE TABLE IF NOT EXISTS enviar_atestado (
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

    const wrapper = {
        driver: 'sqlite',
        async query(sql, params = []) {
            if (/^\s*select/i.test(sql)) {
                const rows = await all(sql, params);
                return [rows, []];
            }
            await run(sql, params);
            return [[], []];
        }
    };

    console.log('[db] Usando SQLite local em', SQLITE_FILE);
    global.connection = wrapper;
    return wrapper;
}

async function connectMysql() {
    if (global.connection && global.connection.state !== 'disconnected' && global.connection.driver !== 'sqlite') {
        return global.connection;
    }

    try {
        console.log('MySQL Connection Config:', {
            host: process.env.MYSQL_HOST,
            user: process.env.MYSQL_USER,
            database: process.env.MYSQL_DATABASE
        });

        const connection = await mysql.createConnection({
            host: process.env.MYSQL_HOST || 'gondola.proxy.rlwy.net',
            user: process.env.MYSQL_USER || 'root',
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABASE || 'railway',
            port: process.env.MYSQL_PORT || 31428
        });

        console.log('Conectou no MySQL!');
        connection.driver = 'mysql';
        global.connection = connection;

        connection.on('error', async (err) => {
            if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                console.error('Conexão perdida. Tentando reconectar...');
                global.connection = await connectMysql();
            } else {
                throw err;
            }
        });

        return connection;
    } catch (err) {
        console.error('Erro ao conectar no MySQL:', err);
        throw err;
    }
}

async function connect() {
    return DB_DRIVER === 'mysql' ? connectMysql() : connectSqlite();
}

// Função para obter atestado por ID
async function obterAtestadoPorId(id) {
    const conn = await connect();
    console.log('Consultando atestado pelo ID:', id); // Log de depuração
    const [rows] = await conn.query("SELECT * FROM enviar_atestado WHERE id = ?", [id]);
    console.log('Resultado da consulta:', rows); // Log de depuração
    return rows[0];
}

// Função para listar todos os atestados da tabela enviar_atestado
async function listarAtestado() { 
    const conn = await connect();
    const [rows] = await conn.query('SELECT id, matricula, nome, data_entrega, data_afastamento, periodo, foto_afastamento, motivo, turma FROM enviar_atestado;');
    console.log('Resultado da consulta listarAtestado:', rows); // Log de depuração
    return rows;
}

// Função para listar somente alunos do 2º A DS
async function doisAds() {
    const conn = await connect();
    console.log('Conexão estabelecida');
    const [rows] = await conn.query('SELECT id, matricula, nome, data_entrega, data_afastamento, periodo, foto_afastamento, motivo, turma FROM enviar_atestado WHERE turma = "2ADS";');
    console.log("Consulta executada", rows);
    return rows;
}

// Função para listar somente alunos do 2º B DS
async function doisBds() {
    const conn = await connect();
    console.log('Conexão estabelecida');
    const [rows] = await conn.query('SELECT id, matricula,nome, data_entrega, data_afastamento, periodo, foto_afastamento, motivo, turma FROM enviar_atestado WHERE turma = "2BDS";');
    console.log("Consulta executada", rows);
    return rows;
}

// Função para listar somente alunos do 2º A MM
async function doisAmm() {
    const conn = await connect();
    console.log("Conexão estabelecida");
    const [rows] = await conn.query('SELECT id,matricula,nome, data_entrega, data_afastamento, periodo, foto_afastamento, motivo, turma FROM enviar_atestado WHERE turma = "2AMM";');
    console.log("Consulta executada", rows);
    return rows;
}

// Função para listar somente alunos do 2º B MM
async function doisBmm() {
    const conn = await connect();
    console.log("Conexão estabelecida");
    const [rows] = await conn.query('SELECT id,matricula,nome, data_entrega, data_afastamento, periodo, foto_afastamento, motivo, turma FROM enviar_atestado WHERE turma = "2BMM";');
    console.log("Consulta executada", rows);
    return rows;
}

// Função para listar somente alunos do 1º A DS
async function umAds() {
    const conn = await connect();
    console.log("Conexão estabelecida");
    const [rows] = await conn.query('SELECT id,matricula, nome, data_entrega, data_afastamento, periodo, foto_afastamento, motivo, turma FROM enviar_atestado WHERE turma = "1ADS";');
    console.log("Consulta executada", rows);
    return rows;
}

// Função para listar somente alunos do 1º B DS
async function umBds() {
    const conn = await connect();
    console.log("Conexão estabelecida");
    const [rows] = await conn.query('SELECT id,matricula, nome, data_entrega, data_afastamento, periodo, foto_afastamento, motivo, turma FROM enviar_atestado WHERE turma = "1BDS";');
    console.log("Consulta executada", rows);
    return rows;
}

// Função para listar somente alunos do 1º A MM
async function umAmm() {
    const conn = await connect();
    console.log("Conexão estabelecida");
    const [rows] = await conn.query('SELECT id,matricula, nome, data_entrega, data_afastamento, periodo, foto_afastamento, motivo, turma FROM enviar_atestado WHERE turma = "1AMM";');
    console.log("Consulta executada", rows);
    return rows;
}

// Função para listar somente alunos do 1º B MM
async function umBmm() {
    const conn = await connect();
    console.log("Conexão estabelecida");
    const [rows] = await conn.query('SELECT id,matricula, nome, data_entrega, data_afastamento, periodo, foto_afastamento, motivo, turma FROM enviar_atestado WHERE turma = "1BMM";');
    console.log("Consulta executada", rows);
    return rows;
}

// Função para listar somente alunos do 3º A DS
async function tresAds() {
    const conn = await connect();
    console.log("Conexão estabelecida");
    const [rows] = await conn.query('SELECT id,matricula, nome, data_entrega, data_afastamento, periodo, foto_afastamento, motivo, turma FROM enviar_atestado WHERE turma = "3ADS";');
    console.log("Consulta executada", rows);
    return rows;
}

// Função para listar somente alunos do 3º B DS
async function tresBds() {
    const conn = await connect();
    console.log("Conexão estabelecida");
    const [rows] = await conn.query('SELECT id,matricula, nome, data_entrega, data_afastamento, periodo, foto_afastamento, motivo, turma FROM enviar_atestado WHERE turma = "3BDS";');
    console.log("Consulta executada", rows);
    return rows;
}

// Função para listar somente alunos do 3º A MM
async function tresAmm() {
    const conn = await connect();
    console.log("Conexão estabelecida");
    const [rows] = await conn.query('SELECT id,matricula, nome, data_entrega, data_afastamento, periodo, foto_afastamento, motivo, turma FROM enviar_atestado WHERE turma = "3AMM";');
    console.log("Consulta executada", rows);
    return rows;
}

// Função para listar somente alunos do 3º B MM
async function tresBmm() {
    const conn = await connect();
    console.log("Conexão estabelecida");
    const [rows] = await conn.query('SELECT id,matricula, nome, data_entrega, data_afastamento, periodo, foto_afastamento, motivo, turma FROM enviar_atestado WHERE turma = "3BMM";');
    console.log("Consulta executada", rows);
    return rows;
}

// Função para cadastrar/enviar atestado
async function enviarAtestado(atestado) {
    const conn = await connect();
    const sql = "INSERT INTO enviar_atestado(matricula, nome, data_entrega, data_afastamento, periodo, foto_afastamento, motivo, turma) VALUES (?,?,?,?,?,?,?,?);";
    
    // Verifique se o arquivo foi enviado corretamente
    if (!atestado.foto_afastamento || !atestado.foto_afastamento.buffer) {
        throw new Error('Arquivo de foto do afastamento não encontrado.');
    }

    console.log('Buffer do arquivo:', atestado.foto_afastamento.buffer); // Adicione este log para verificar o buffer do arquivo

    // Use o buffer do arquivo enviado pelo multer
    const fotoAfastamentoBlob = atestado.foto_afastamento.buffer;

    const values = [
        parseInt(atestado.matricula),
        atestado.nome,
        new Date(atestado.data_entrega),
        new Date(atestado.data_afastamento),
        parseInt(atestado.periodo),
        fotoAfastamentoBlob,
        atestado.motivo,
        atestado.turma
    ];

    console.log('Valores a serem inseridos:', values); // Adicione este log para verificar os valores a serem inseridos

    await conn.query(sql, values);
    console.log('Atestado inserido com sucesso'); // Adicione este log para confirmar a inserção
}

module.exports = { listarAtestado, doisAds, doisBds, doisAmm, doisBmm, umAds, umBds, umAmm, umBmm, tresAds, tresBds, tresAmm, tresBmm, enviarAtestado, obterAtestadoPorId };