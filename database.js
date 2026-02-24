const mysql = require('mysql2/promise');

async function connect() {
    if (global.connection && global.connection.state !== 'disconnected') {
        return global.connection;
    }

    try {
        // Add debug logging
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
        global.connection = connection;

        // Adiciona um listener para reconectar em caso de erro
        connection.on('error', async (err) => {
            if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                console.error('Conexão perdida. Tentando reconectar...');
                global.connection = await connect();
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

// Não forçar conexão na importação; conectar sob demanda nas funções.
// connect();

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