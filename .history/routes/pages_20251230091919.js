// HOME – LIVRE (simplificado)
router.get('/', (req, res) => {
  res.render('home'); // user já está em res.locals
});

// LOGIN (simplificado)
router.get('/login', (req, res) => {
  res.render('login');
});

// CPD – PROTEGIDO (simplificado)
router.get('/index', isCPD, (req, res) => {
  res.render('index');
});

// GERÊNCIA – PROTEGIDO (simplificado)
router.get('/gerencia', isGerencia, (req, res) => {
  res.render('gerencia');
});

// OUTRAS PÁGINAS (simplificado)
router.get('/cadastro', (req, res) => {
  res.render('cadastro');
});

router.get('/prevencao', (req, res) => {
  res.render('prevencao');
});

router.get('/ecommerce', (req, res) => {
  res.render('ecommerce');
});

// Exportando todas as rotas
module.exports = router;