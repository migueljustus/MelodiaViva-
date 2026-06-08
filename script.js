// =========================================
//   MelodiaViva — script.js
//   Tema: Música | Estilo: Colorido & Alegre
// =========================================

// --- MODO ESCURO ---
const body = document.body;
const darkBtn = document.getElementById('dark-toggle');

// Recupera preferência salva
if (localStorage.getItem('tema') === 'dark') {
  body.classList.replace('light-mode', 'dark-mode');
  darkBtn.textContent = '☀️';
}

darkBtn.addEventListener('click', () => {
  const isDark = body.classList.contains('dark-mode');
  if (isDark) {
    body.classList.replace('dark-mode', 'light-mode');
    darkBtn.textContent = '🌙';
    localStorage.setItem('tema', 'light');
  } else {
    body.classList.replace('light-mode', 'dark-mode');
    darkBtn.textContent = '☀️';
    localStorage.setItem('tema', 'dark');
  }
});

// --- MENU HAMBURGUER (mobile) ---
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Fecha menu ao clicar em link
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// --- PLAYER MUSICAL (simulado) ---
const playlists = [
  { nome: "Aquarela", artista: "Toquinho", emoji: "🎸" },
  { nome: "Garota de Ipanema", artista: "Tom Jobim", emoji: "🎷" },
  { nome: "Bohemian Rhapsody", artista: "Queen", emoji: "🎹" },
  { nome: "Shape of You", artista: "Ed Sheeran", emoji: "🎤" },
  { nome: "Baião", artista: "Luiz Gonzaga", emoji: "🪗" },
  { nome: "Für Elise", artista: "Beethoven", emoji: "🎼" },
];

let trackIndex = 0;
let isPlaying = false;
let progressInterval = null;
let progressValue = 0;

function updatePlayer() {
  const track = playlists[trackIndex];
  document.getElementById('track-name').textContent = track.nome;
  document.getElementById('track-artist').textContent = track.artista;
  document.getElementById('album-art').textContent = track.emoji;
  progressValue = 0;
  document.getElementById('progress-fill').style.width = '0%';
}

function togglePlay() {
  isPlaying = !isPlaying;
  const playBtn = document.getElementById('play-btn');
  const albumArt = document.getElementById('album-art');

  if (isPlaying) {
    playBtn.textContent = '⏸';
    albumArt.classList.add('playing');
    clearInterval(progressInterval);
    progressInterval = setInterval(() => {
      progressValue += 0.5;
      if (progressValue >= 100) {
        progressValue = 0;
        nextTrack();
      }
      document.getElementById('progress-fill').style.width = progressValue + '%';
    }, 150);
  } else {
    playBtn.textContent = '▶';
    albumArt.classList.remove('playing');
    clearInterval(progressInterval);
  }
}

function nextTrack() {
  trackIndex = (trackIndex + 1) % playlists.length;
  updatePlayer();
  if (isPlaying) {
    document.getElementById('album-art').classList.add('playing');
  }
}

function prevTrack() {
  trackIndex = (trackIndex - 1 + playlists.length) % playlists.length;
  updatePlayer();
}

// Inicia player na primeira faixa
updatePlayer();

// --- DADOS DOS GÊNEROS ---
const generosData = [
  {
    nome: "Rock", emoji: "🎸",
    desc: "Nascido nos anos 50, o rock revolucionou a música com guitarras elétricas e energia pura.",
    cat: "popular",
    cor: "linear-gradient(135deg, #e74c3c, #c0392b)"
  },
  {
    nome: "Samba", emoji: "🥁",
    desc: "Símbolo do Brasil! Ritmo vibrante nascido no Rio de Janeiro, mistura de culturas africanas e brasileiras.",
    cat: "brasileiro",
    cor: "linear-gradient(135deg, #f39c12, #e67e22)"
  },
  {
    nome: "Clássica", emoji: "🎼",
    desc: "De Bach a Beethoven: a música erudita que moldou a teoria musical moderna com séculos de sofisticação.",
    cat: "classico",
    cor: "linear-gradient(135deg, #8e44ad, #6c3483)"
  },
  {
    nome: "Forró", emoji: "🪗",
    desc: "Ritmo nordestino que conquistou o Brasil inteiro. Luiz Gonzaga eternizou o baião, xote e xaxado.",
    cat: "brasileiro",
    cor: "linear-gradient(135deg, #e67e22, #d35400)"
  },
  {
    nome: "Pop", emoji: "🎤",
    desc: "Músicas que grudam na cabeça! O pop domina as paradas de sucesso no mundo inteiro desde os anos 60.",
    cat: "popular",
    cor: "linear-gradient(135deg, #e91e63, #9c27b0)"
  },
  {
    nome: "Eletrônica", emoji: "🎧",
    desc: "DJs, sintetizadores e beats que fazem o mundo dançar. Do techno ao EDM, a eletrônica não para de evoluir.",
    cat: "eletronica",
    cor: "linear-gradient(135deg, #00bcd4, #0097a7)"
  },
  {
    nome: "Hip-hop", emoji: "🎙️",
    desc: "Cultura, protesto e poesia urbana. Nasceu no Bronx nos anos 70 e se tornou o gênero mais ouvido do mundo.",
    cat: "popular",
    cor: "linear-gradient(135deg, #37474f, #263238)"
  },
  {
    nome: "MPB", emoji: "🌿",
    desc: "Música Popular Brasileira: de Caetano Veloso a Djavan, a MPB une poesia, bossa e identidade nacional.",
    cat: "brasileiro",
    cor: "linear-gradient(135deg, #27ae60, #1e8449)"
  },
  {
    nome: "Jazz", emoji: "🎺",
    desc: "Improvisação, sofisticação e swing! O jazz nasceu em New Orleans no início do século XX.",
    cat: "classico",
    cor: "linear-gradient(135deg, #2c3e50, #3498db)"
  },
];

// Renderiza cartões de gêneros
function renderizarGeneros(filtro = 'all') {
  const grid = document.getElementById('generos-grid');
  grid.innerHTML = '';
  const filtrados = filtro === 'all'
    ? generosData
    : generosData.filter(g => g.cat === filtro);

  filtrados.forEach((genero, i) => {
    const card = document.createElement('div');
    card.className = 'genero-card';
    card.style.background = genero.cor;
    card.style.animationDelay = (i * 0.08) + 's';
    card.innerHTML = `
      <span class="genero-emoji">${genero.emoji}</span>
      <h3>${genero.nome}</h3>
      <p>${genero.desc}</p>
      <span class="genero-tag">${genero.cat.charAt(0).toUpperCase() + genero.cat.slice(1)}</span>
    `;
    grid.appendChild(card);
  });
}

// Filtros
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderizarGeneros(btn.dataset.filter);
  });
});

renderizarGeneros();

// --- GALERIA DE INSTRUMENTOS ---
const instrumentos = [
  { emoji: "🎸", nome: "Violão", desc: "Cordas & harmonia" },
  { emoji: "🎹", nome: "Piano", desc: "Teclas & melodia" },
  { emoji: "🥁", nome: "Bateria", desc: "Ritmo & energia" },
  { emoji: "🎺", nome: "Trompete", desc: "Sopros & jazz" },
  { emoji: "🎻", nome: "Violino", desc: "Arco & emoção" },
  { emoji: "🪗", nome: "Acordeão", desc: "Fole & cultura" },
  { emoji: "🎷", nome: "Saxofone", desc: "Sopro & blues" },
  { emoji: "🎙️", nome: "Microfone", desc: "Voz & performance" },
];

function renderizarGaleria() {
  const grid = document.getElementById('galeria-grid');
  instrumentos.forEach(item => {
    const el = document.createElement('div');
    el.className = 'galeria-item';
    el.innerHTML = `
      <div class="instrumento-emoji">${item.emoji}</div>
      <h4>${item.nome}</h4>
      <p>${item.desc}</p>
    `;
    el.addEventListener('click', () => {
      el.style.transform = 'scale(1.15) rotate(3deg)';
      setTimeout(() => { el.style.transform = ''; }, 400);
    });
    grid.appendChild(el);
  });
}

renderizarGaleria();

// --- ANIMAÇÕES DE SCROLL (Intersection Observer) ---
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));

// --- CURIOSIDADE COM API ANTHROPIC ---
async function buscarCuriosidade() {
  const btn = document.getElementById('curiosidade-btn');
  const texto = document.getElementById('curiosidade-texto');
  const card = document.getElementById('curiosidade-card');

  btn.classList.add('loading');
  btn.textContent = '⏳ Gerando...';
  btn.disabled = true;
  texto.textContent = 'Consultando a IA...';

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1000,
        messages: [{
          role: "user",
          content: "Gere UMA curiosidade fascinante e surpreendente sobre música (história, ciência, cultura, artistas, instrumentos ou teoria musical). Seja criativo, divertido e educativo. Responda em português brasileiro em apenas 2-3 frases curtas. Não use marcadores ou listas, apenas texto corrido. Inclua um emoji relevante no início."
        }]
      })
    });

    const data = await response.json();
    const resposta = data.content[0].text;
    texto.textContent = resposta;

    // Animação de destaque
    card.style.borderLeftColor = 'var(--accent3)';
    card.style.transform = 'scale(1.02)';
    setTimeout(() => {
      card.style.transform = '';
      card.style.borderLeftColor = 'var(--primary)';
    }, 500);

  } catch (err) {
    // Fallback com curiosidades locais
    const curiosidades = [
      "🎵 A música ativa mais áreas do cérebro simultaneamente do que qualquer outra atividade humana, unindo emoção, memória, movimento e raciocínio em uma única experiência!",
      "🎸 Jimi Hendrix nunca aprendeu a ler música formalmente — toda sua genialidade vinha do ouvido absoluto e de anos de prática intuitiva.",
      "🥁 O ritmo cardíaco humano de repouso é naturalmente de 60-80 BPM, exatamente a faixa de tempo preferida na maioria das músicas populares do mundo!",
      "🎻 O Stradivarius mais valioso já vendido foi a peça 'Lady Blunt' (1721), leiloada por 15,9 milhões de dólares em 2011. O segredo do som perfeito ainda intriga os cientistas.",
      "🎺 O menor intervalo musical que o ouvido humano consegue distinguir é chamado de 'cent', equivalente a 1/100 de um semitom — nossos cérebros são instrumentos musicais extraordinários!",
    ];
    texto.textContent = curiosidades[Math.floor(Math.random() * curiosidades.length)];
  } finally {
    btn.classList.remove('loading');
    btn.textContent = '🎲 Gerar Curiosidade';
    btn.disabled = false;
  }
}

// --- FORMULÁRIO DE CONTATO ---
const form = document.getElementById('contato-form');

function validarEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let valido = true;

  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const mensagem = document.getElementById('mensagem').value.trim();

  // Limpa erros
  document.getElementById('erro-nome').textContent = '';
  document.getElementById('erro-email').textContent = '';
  document.getElementById('erro-mensagem').textContent = '';

  if (nome.length < 3) {
    document.getElementById('erro-nome').textContent = '⚠️ Digite seu nome completo.';
    valido = false;
  }
  if (!validarEmail(email)) {
    document.getElementById('erro-email').textContent = '⚠️ E-mail inválido.';
    valido = false;
  }
  if (mensagem.length < 10) {
    document.getElementById('erro-mensagem').textContent = '⚠️ Mensagem muito curta (mínimo 10 caracteres).';
    valido = false;
  }

  if (valido) {
    form.style.display = 'none';
    const successMsg = document.getElementById('success-msg');
    successMsg.style.display = 'block';

    // Reseta o formulário após 5 segundos
    setTimeout(() => {
      form.reset();
      form.style.display = 'block';
      successMsg.style.display = 'none';
    }, 5000);
  }
});

// --- SMOOTH SCROLL para links de âncora ---
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const alvo = document.querySelector(link.getAttribute('href'));
    if (alvo) {
      alvo.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// --- EFEITO DE DESTAQUE NO NAV ao scrollar ---
window.addEventListener('scroll', () => {
  const secoes = document.querySelectorAll('section[id]');
  const scrollY = window.scrollY + 100;
  secoes.forEach(secao => {
    const top = secao.offsetTop;
    const height = secao.offsetHeight;
    const id = secao.getAttribute('id');
    const navLink = document.querySelector(`nav a[href="#${id}"]`);
    if (navLink) {
      if (scrollY >= top && scrollY < top + height) {
        navLink.style.background = 'var(--primary)';
        navLink.style.color = '#fff';
      } else {
        navLink.style.background = '';
        navLink.style.color = '';
      }
    }
  });
});

console.log('%c🎵 MelodiaViva — Projeto Escolar de Música!', 
  'color: #ff6b6b; font-size: 16px; font-weight: bold; padding: 8px;');
console.log('%cFeito com HTML, CSS e JavaScript 🚀',
  'color: #6bcb77; font-size: 13px;');
