function autenticar(req, res, next) {
    if (!req.session.usuario) {
        return res.redirect('/login');
    }
    next();
}

function apenasGerencia(req, res, next) {
    if (req.session.perfil !== 'gerencia') {
        return res.redirect('/login');
    }
    next();
}

function cpdOuGerencia(req, res, next) {
    if (!['cpd', 'gerencia'].includes(req.session.perfil)) {
        return res.redirect('/login');
    }
    next();
}

module.exports = { autenticar, apenasGerencia, cpdOuGerencia };
