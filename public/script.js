document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const searchForm = document.getElementById('searchForm');
  const mensagem = document.getElementById('mensagem');
  const resultado = document.getElementById('resultado');

  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = new FormData(loginForm);
      const res = await fetch('/auth/login', {
        method: 'POST',
        body: new URLSearchParams(data)
      });
      const text = await res.text();
      if (res.redirected) window.location.href = res.url;
      else mensagem.textContent = text;
    });
  }

  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = new FormData(registerForm);
      const res = await fetch('/auth/register', {
        method: 'POST',
        body: new URLSearchParams(data)
      });
      const text = await res.text();
      if (res.redirected) window.location.href = res.url;
      else mensagem.textContent = text;
    });
  }

  if (searchForm) {
    searchForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = new FormData(searchForm);
      const res = await fetch('/club', {
        method: 'POST',
        body: new URLSearchParams(data)
      });
      const info = await res.json();
      if (info.error) {
  resultado.innerHTML = `<p>Erro: ${info.error}</p>`;
} else {
  const extras = info.extraData || {};
resultado.innerHTML = `
  <h3>${info.title}</h3>
  <p>${info.description || ''}</p>
  <p>${info.extract || ''}</p>
  ${info.thumbnail ? `<img src="${info.thumbnail.source}" width="200" />` : ''}
  <h4>Informações adicionais:</h4>
  <ul>
    <li><b>Data de Fundação:</b> ${extras.fundacao}</li>
    <li><b>Estádio:</b> ${extras.estadio}</li>
    <li><b>Cidade:</b> ${extras.cidade}</li>
  </ul>
  <p><a href="${info.content_urls.desktop.page}" target="_blank">Ver no Wikipedia</a></p>
`;

}


    });
  }
});
