router.get('/index', auth(), (req, res) => {
  res.render('index', { user: req.session.user });
});

router.get('/gerencia', auth('gerencia'), (req, res) => {
  res.render('gerencia', { user: req.session.user });
});

router.get('/cpd', auth('cpd'), (req, res) => {
  res.render('cpd', { user: req.session.user });
});
