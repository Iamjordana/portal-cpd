<div class="card">
  <img src="/static/imagens/painelaviso.png" alt="Painel Avisos" class="card-img11">

  <% if (user && user.role === 'cpd') { %>
    <!-- Botão visível apenas para CPD -->
    <a href="/cpd/painel">
      <button class="btn_atalho">Painel Avisos</button>
    </a>