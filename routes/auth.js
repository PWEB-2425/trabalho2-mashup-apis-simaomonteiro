const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');  // Ajuste para o seu modelo de usuário

const router = express.Router();

// Rota de Registro
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Cria um novo usuário
    const user = new User({ username, password });
    
    // Salva o usuário no banco de dados
    await user.save();
    
    // Após o registro, redireciona para a página de login
    res.redirect('/auth/login');  // Pode ser adaptado para enviar uma resposta JSON
  } catch (err) {
    res.send('Erro no registro: ' + err.message);
  }
});

// Rota de Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Verifica se o usuário existe
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.send('Credenciais inválidas');
    }
    
    // Armazena o ID do usuário na sessão
    req.session.userId = user._id;

    // Após o login, redireciona para a página de pesquisa
    res.redirect('/club');  // Redireciona para a página de clubes
  } catch (err) {
    res.send('Erro no login: ' + err.message);
  }
});

// Rota de Logout (opcional)
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/auth/login');
  });
});

module.exports = router;
