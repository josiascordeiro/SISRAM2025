// Importando os módulos necessários
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { enviarAtestado, listarAtestado, obterAtestadoPorId, doisAds, doisBds, doisAmm, doisBmm, umAds, umBds, umAmm, umBmm, tresAds, tresBds, tresAmm, tresBmm } = require('../database');

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
<<<<<<< HEAD
router.get('/tresBds', (req, res) => {
  res.render('tresBds', { title: '/tresBds' });
=======
router.get('/3-b-ds', (req, res) => {
  res.render('3-b-ds', { title: '/3-b-ds' });
>>>>>>> e6b270bee5db1df9e606c88c60353804f6b5b7bf
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
  res.render('enviardocs_aluno');
});

// Rota POST para enviar os dados do aluno
router.post('/enviardocs_aluno', upload.single('foto_afastamento'), async (req, res) => {
  console.log('Arquivo recebido:', req.file);
  const atestado = {
    matricula: req.body.matricula,
    nome: req.body.nome,
    data_entrega: req.body.data_entrega,
    data_afastamento: req.body.data_afastamento,
    periodo: req.body.periodo,
    foto_afastamento: req.file,
    motivo: req.body.motivo,
    turma: req.body.turma
  };

  try {
    await enviarAtestado(atestado);
    res.send('Atestado inserido com sucesso!');
  } catch (error) {
    res.status(500).send('Erro ao inserir atestado: ' + error.message);
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