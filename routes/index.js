// Importando os módulos necessários
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { enviarAtestado, listarAtestado, obterAtestadoPorId, doisAds, doisBds, doisAmm, doisBmm, umAds, umBds, umAmm, umBmm, tresAds, tresBds, tresAmm, tresBmm } = require('../database');
const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: process.env.MYSQL_HOST || 'gondola.proxy.rlwy.net',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE || 'railway',
    port: process.env.MYSQL_PORT || 31428
});

connection.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao MySQL:', err);
        process.exit(1);
    }
    console.log('Conectou no MySQL!');
});
// Adicione esta linha no topo do arquivo, após as outras importações
const { moderateImageBuffer } = require('../services/imageModeration');

// Verificação do caminho atual do diretório
console.log('Current directory:', __dirname);
console.log('Expected path for database.js:', path.resolve(__dirname, '../database.js'));

// Configuração do multer para upload de arquivos
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Rota GET para a página inicial
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Página Inicial' });
});

// Definindo uma rota GET para fazer login de aluno
router.get('/login', (req, res) => {
  res.render('login', { title: '/login-aluno' });
});

// Definindo uma rota GET para fazer um login de professor
router.get('/loginprof', function (req, res) {
  res.render('loginprof', { title: 'login-prof' });
});

// Definindo uma rota GET para criar conta de professor
router.get('/criarcont_prof', (req, res) => {
  res.render('criarcont_prof', { title: 'criar-conta-de-professor' });
});

// Definindo uma rota GET para criar conta de aluno
router.get('/criarcontaluno', (req, res) => {
  res.render('criarcontaluno', { title: 'criarcontaaluno' });
});

// Definindo uma rota GET para escolher a serie
router.get('/serie_prof', (req, res) => {
  res.render('serie_prof', { title: 'serie-prof' });
});

// Definindo uma rota GET para recuperar senha de aluno
router.get('/esquecisenha_a', (req, res) => {
  res.render('esquecisenha_a', { title: 'esqueci-senha-aluno' });
});

// Definindo uma rota GET para recuperar senha de professor
router.get('/esquecisenha_p', function (req, res) {
  res.render('esquecisenha_p', { title: 'esquecisenha_p' });
});

// Definindo uma rota GET para dizer que esta concluido 
router.get('/conclusao', (req, res) => {
  res.render('conclusao', { title: 'conclusao' });
  res.send('Atestado recebido');
});

// Definindo uma rota GET para listar alunos do 1 ano
router.get('/list1ano', (req, res) => {
  res.render('list1ano', { title: 'lista-1-ano' });
});

// Definindo uma rota GET para listar os alunos do 2 ano 
router.get('/list2ano', (req, res) => {
  res.render('list2ano', { title: 'lista-2-ano' });
});

// Definindo uma rota GET para listar os alunos do 3 ano
router.get('/list3ano', (req, res) => {
  res.render('list3ano', { title: 'lista-3-ano' });
});

// Definindo uma rota GET para listar alunos do 1 ano A DS
router.get('/1-a-ds', (req, res) => {
  res.render('1-a-ds', { title: '/1-a-ds' });
});

// Definindo uma rota GET para listar alunos do 1 ano B DS
router.get('/1-b-ds', (req, res) => {
  res.render('1-b-ds', { title: '/1-b-ds' });
});

// Definindo uma rota GET para listar alunos do 1 ano A MM
router.get('/1-a-mm', (req, res) => {
  res.render('1-a-mm', { title: '/1-a-mm' });
});

// Definindo uma rota GET para listar alunos do 1 ano B MM
router.get('/1-b-mm', (req, res) => {
  res.render('1-b-mm', { title: '/1-b-mm' });
});

// Definindo uma rota GET para listar alunos do 2 ano A DS
router.get('/2-a-ds', (req, res) => {
  res.render('2-a-ds', { title: '/2-a-ds' });
});

// Definindo uma rota GET para listar alunos do 2 ano B DS
router.get('/2-b-ds', (req, res) => {
  res.render('2-b-ds', { title: '/2-b-ds' });
});

// Definindo uma rota GET para listar alunos do 2 ano A MM
router.get('/2-a-mm', (req, res) => {
  res.render('2-a-mm', { title: '/2-a-mm' });
});

// Definindo uma rota GET para listar alunos do 2 ano B MM
router.get('/2-b-mm', (req, res) => {
  res.render('2-b-mm', { title: '/2-b-mm' });
});

// Definindo uma rota GET para listar alunos do 3 ano A DS
router.get('/3-a-ds', (req, res) => {
  res.render('3-a-ds', { title: '/3-a-ds' });
});

// Definindo uma rota GET para listar alunos do 3 ano B DS

router.get('/3-b-ds', (req, res) => {
  res.render('3-b-ds', { title: '/3-b-ds' });

});

// Definindo uma rota GET para listar alunos do 3 ano A MM
router.get('/3-a-mm', (req, res) => {
  res.render('3-a-mm', { title: '/3-a-mm' });
});

// Definindo uma rota GET para listar alunos do 3 ano B MM
router.get('/3-b-mm', (req, res) => {
  res.render('3-b-mm', { title: '/3-b-mm' });
});

// Definindo uma rota GET para enviar a justificativa de faltas
router.get('/enviardocs_aluno', (req, res) => {
  res.render('enviardocs_aluno', { title: '/enviardocs_aluno' });
});

// Definindo uma rota GET para enviar a justificação de faltas
router.get('/erroaoterminar', (req, res) => {
  res.render('erroaoterminar', { title: '/erroaoterminar' });
});

// Definindo uma rota GET justificar
router.get('/justificar', (req, res) => { 
  res.render('justificar', { title: 'justificar' });
});

// Definindo uma rota GET justificar
router.get('/error', (req, res) => { 
  res.render('error', { title: 'error' });
});

// Rota antiga, feita antes de criar a rota POST
router.get('/listarAtestado', async function (req, res) {
  try {
    const atestados = await listarAtestado();
    console.log(atestados);
    res.render('listarAtestado', { title: 'listarAtestados', atestados });
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e.message });
  }
});

// Rota POST para login de aluno
router.post('/login', async function (req, res) {
  const matricula = req.body.matricula;
  const senha = !req.body.senha ? null : parseInt(req.body.senha);
  try {
    await global.db.loginAluno({ matricula, senha });
    res.redirect('/?new=true');
  } catch (error) {
    res.redirect('/?erro=' + error);
  }
});

// Rota para listar somente a turma doisAds
router.get('/doisAds', async function (req, res) {
  try {
    const atestados2ads = await doisAds();
    console.log(atestados2ads);
    res.render('doisAds', { title: 'Atestados2aDS', atestados2ads });
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e.message });
  }
});

// Rota para listar somente a turma doisBds
router.get('/doisBds', async function (req, res) {
  try {
    const atestados2bds = await doisBds();
    console.log(atestados2bds);
    res.render('doisBds', { title: 'Atestados2bDS', atestados2bds });
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e.message });
  }
});

// Rota para listar somente a turma doisAmm
router.get('/doisAmm', async function (req, res) {
  try {
    const atestados2amm = await doisAmm();
    console.log(atestados2amm);
    res.render('doisAmm', { title: 'Atestados2aMM', atestados2amm });
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e.message });
  }
});

// Rota para listar somente a turma doisBmm
router.get('/doisBmm', async function (req, res) {
  try {
    const atestados2bmm = await doisBmm();
    console.log(atestados2bmm);
    res.render('doisBmm', { title: 'Atestados2bMM', atestados2bmm });
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e.message });
  }
});

// Rota para listar somente a turma umAds
router.get('/umAds', async function (req, res) {
  try {
    const atestados1ads = await umAds();
    console.log(atestados1ads);
    res.render('umAds', { title: 'Atestados1aDS', atestados1ads });
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e.message });
  }
});

// Rota para listar somente a turma umBds
router.get('/umBds', async function (req, res) {
  try {
    const atestados1bds = await umBds();
    console.log(atestados1bds);
    res.render('umBds', { title: 'Atestados1bDS', atestados1bds });
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e.message });
  }
});

// Rota para listar somente a turma umAmm
router.get('/umAmm', async function (req, res) {
  try {
    const atestados1amm = await umAmm();
    console.log(atestados1amm);
    res.render('umAmm', { title: 'Atestados1aMM', atestados1amm });
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e.message });
  }
});

// Rota para listar somente a turma umBmm
router.get('/umBmm', async function (req, res) {
  try {
    const atestados1bmm = await umBmm();
    console.log(atestados1bmm);
    res.render('umBmm', { title: 'Atestados1bMM', atestados1bmm });
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e.message });
  }
});

// Rota para listar somente a turma tresAds
router.get('/tresAds', async function (req, res) {
  try {
    const atestados3ads = await tresAds();
    console.log(atestados3ads);
    res.render('tresAds', { title: 'Atestados3aDS', atestados3ads });
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e.message });
  }
});

// Rota para listar somente a turma tresBds
router.get('/tresBds', async function (req, res) {
  try {
    const atestados3bds = await tresBds();
    console.log(atestados3bds);
    res.render('tresBds', { title: 'Atestados3bDS', atestados3bds });
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e.message });
  }
});

// Rota para listar somente a turma tresAmm
router.get('/tresAmm', async function (req, res) {
  try {
    const atestados3amm = await tresAmm();
    console.log(atestados3amm);
    res.render('tresAmm', { title: 'Atestados3aMM', atestados3amm });
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e.message });
  }
});

// Rota para listar somente a turma tresBmm
router.get('/tresBmm', async function (req, res) {
  try {
    const atestados3bmm = await tresBmm();
    console.log(atestados3bmm);
    res.render('tresBmm', { title: 'Atestados3bMM', atestados3bmm });
  } catch (e) {
    console.log(e);
    res.status(500).send({ message: e.message });
  }
});

// Rota GET para exibir o formulário
router.get('/enviardocs_aluno', (req, res) => {
  try {
    res.render('enviardocs_aluno', { title: 'Enviar Documentos' });
  } catch (error) {
    console.error('Erro ao renderizar enviardocs_aluno:', error);
    res.status(500).send('Erro ao carregar a página');
  }
});

// Rota POST para enviar os dados do aluno
router.post('/enviardocs_aluno', upload.single('foto_afastamento'), async function(req, res, next) {
    try {
        console.log('Recebendo upload de documento...');
        
        if (!req.file) {
            console.log('Nenhum arquivo recebido');
            return res.status(400).render('error', {
                title: 'Erro no Upload',
                message: 'Nenhum arquivo recebido. Por favor, selecione um arquivo para enviar.'
            });
        }
        
        // Verificar tamanho do arquivo
        if (req.file.size > 5 * 1024 * 1024) { // 5MB limit
            console.log('Arquivo muito grande:', req.file.size);
            return res.status(400).render('error', {
                title: 'Erro no Upload',
                message: 'O arquivo é muito grande. O tamanho máximo permitido é 5MB.'
            });
        }
        
        console.log('Arquivo recebido:', req.file.originalname);
        
        // Moderar a imagem com melhor tratamento de erros
        let moderationResult;
        try {
            console.log('Iniciando moderação...');
            moderationResult = await moderateImageBuffer(req.file.buffer);
            console.log('Resultado da moderação:', moderationResult);
            
            // Verificar se a resposta de moderação é válida
            if (!moderationResult || typeof moderationResult.isAppropriate === 'undefined') {
                throw new Error('Resposta de moderação inválida');
            }
        } catch (moderationError) {
            console.error('Erro durante a moderação:', moderationError);
            return res.status(500).render('error', {
                title: 'Erro na Moderação',
                message: 'Ocorreu um erro ao processar a imagem'
            });
        }
        
        // Verificar se a imagem foi aprovada
        if (!moderationResult.isAppropriate) {
            console.log('Imagem contém conteúdo impróprio');
            return res.status(400).render('error', {
                title: 'Conteúdo Impróprio',
                message: moderationResult.message || 'A imagem contém conteúdo impróprio'
            });
        }
        
        // Obter dados do formulário
        const { matricula, nome, data_entrega, data_afastamento, periodo, motivo, turma } = req.body;
        
        console.log('Dados do formulário:', {
            matricula,
            nome,
            data_entrega,
            data_afastamento,
            periodo,
            motivo,
            turma,
            status: moderationResult.status
        });
        
        console.log('Inserindo no banco de dados...');
        const query = `
            INSERT INTO enviar_atestado 
            (matricula, nome, data_entrega, data_afastamento, periodo, motivo, turma, foto_afastamento, status_moderacao) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        
        // Executar a query
        connection.query(
            query,
            [matricula, nome, data_entrega, data_afastamento, periodo, motivo, turma, req.file.buffer, moderationResult.status],
            function(error, results, fields) {
                if (error) {
                    console.error('Erro ao inserir no banco de dados:', error);
                    return res.status(500).send('Erro ao salvar o atestado');
                }
                
                console.log('Documento inserido com sucesso. ID:', results.insertId);
                
                try {
                    console.log('Renderizando página de sucesso...');
                    return res.redirect(`/success?status=${moderationResult.status}&message=${encodeURIComponent(moderationResult.message)}`);
                } catch (renderError) {
                    console.error('Erro ao renderizar a página de sucesso:', renderError);
                    res.status(500).send('Erro ao exibir a página de sucesso');
                }
            }
        );
    } catch (error) {
        console.error('Erro no upload:', error);
        res.status(500).render('error', { 
            title: 'Erro no Upload',
            message: 'Ocorreu um erro ao processar o upload: ' + error.message
        });
    }
});

// Adicionar rota de sucesso que está faltando
router.get('/success', (req, res) => {
    try {
        const status = req.query.status || 'approved';
        const message = req.query.message || 'Documento enviado com sucesso!';
        
        res.render('success', { 
            title: 'Envio Bem-Sucedido', 
            status: status,
            message: message
        });
    } catch (error) {
        console.error('Erro ao renderizar página de sucesso:', error);
        res.status(500).render('error', {
            title: 'Erro',
            message: 'Ocorreu um erro ao exibir a página de sucesso.'
        });
    }
});

// Rota GET para listar a função listarAtestado
router.get('/listarAtestado', async (req, res) => { // Modificado: Adicionada a rota para listar atestados
  try {
    console.log('Requisição para listar atestados recebida'); // Log de depuração
    const atestados = await listarAtestado();
    console.log('Atestados encontrados:', atestados); // Log de depuração
    res.render('listarAtestado', { title: 'Listagem de Atestados', atestados: atestados });
  } catch (error) {
    console.error('Erro ao listar atestados:', error);
    res.status(500).send('Erro ao listar atestados: ' + error.message);
  }
});

// Rota GET para obter a imagem do atestado
router.get('/imagem/:id', async (req, res) => { // Modificado: Adicionada a rota para obter a imagem do atestado
  try {
    console.log('Requisição para obter imagem recebida. ID:', req.params.id); // Log de depuração
    const atestado = await obterAtestadoPorId(req.params.id);
    if (!atestado) {
      console.log('Atestado não encontrado para o ID:', req.params.id); // Log de depuração
      return res.status(404).send('Atestado não encontrado');
    }
    console.log('Atestado encontrado:', atestado); // Log de depuração
    res.set('Content-Type', 'image/jpeg'); // Ajuste o tipo de conteúdo conforme necessário
    res.send(atestado.foto_afastamento);
  } catch (error) {
    console.error('Erro ao obter atestado:', error);
    res.status(500).send('Erro ao obter atestado: ' + error.message);
  }
});

module.exports = router;