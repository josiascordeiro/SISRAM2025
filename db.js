
const mysql = require('mysql2/promise');

async function connect() {
    if (global.connection && global.connection.state !== 'disconnected') {
        return global.connection;
    }

    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            port: 3306, // Porta do MySQL
            user: 'root',
            password: 'root',
            database: 'sisram2',
            connectTimeout: 10000 // Timeout em milissegundos
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


connect();

//funcao para listar todos atestatados da tabela atestados  
async function listarAtestado() { 
    const conn = await connect();
    const [rows] = await conn.query('SELECT id_atestado, id_aluno, data_entrega, data_afastamento, periodo, foto_afastamento, motivo, turma FROM atestados;');
    return rows;
}


// Função para listar somente alunos do 2º A DS

async function doisAds() {
    const conn = await connect();
    console.log('Conexão estabelecida')
    const [rows] = await conn.query('SELECT id_atestado, id_aluno, data_entrega, data_afastamento, periodo, foto_afastamento, motivo, turma FROM atestados WHERE turma = "2ADS";');
    console.log("Consulta executada", rows)
    return rows;
}

// Função para listar somente alunos do 2º B DS

async function doisBds() {
    const conn = await connect();
    console.log('Conexão estabelecida')
    const [rows] = await conn.query('SELECT id_atestado, id_aluno, data_entrega, data_afastamento, periodo, foto_afastamento, motivo, turma FROM atestados WHERE turma = "2BDS";');
    console.log("Consulta executada", rows)
    return rows;
}

// Função para listar somente alunos do 2º A MM

async function doisAmm() {
    const conn = await connect();
    console.log("Conexão estabelecida")
    const [rows] = await conn.query('SELECT id_atestado, id_aluno, data_entrega, data_afastamento, periodo, foto_afastamento, motivo, turma FROM atestados WHERE turma = "2AMM";')
    console.log("Consulta executada", rows)
    return rows;
}

// Função para listar somente alunos do 2º B MM

async function doisBmm() {
    const conn = await connect();
    console.log("Conexão estabelecida")
    const [rows] = await conn.query('SELECT id_atestado, id_aluno, data_entrega, data_afastamento, periodo, foto_afastamento, motivo, turma FROM atestados WHERE turma = "2BMM";')
    console.log("Consulta executada", rows)
    return rows;
}

// Função para listar somente alunos do 1º A DS

async function umAds() {
    const conn = await connect();
    console.log("Conexão estabelecida")
    const [rows] = await conn.query('SELECT id_atestado, id_aluno, data_entrega, data_afastamento, periodo, foto_afastamento, motivo, turma FROM atestados WHERE turma = "1ADS";')
    console.log("Consulta executada", rows)
    return rows;
}

module.exports = {  listarAtestado, doisAds, doisBds, doisAmm, doisBmm, umAds }