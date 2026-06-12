// ─── HORÁRIOS ─────────────────────────────────────────────
const horarios = [
  { dia: 'Domingo',  abre: null,    fecha: null,    fechado: true },
  { dia: 'Segunda',  abre: '10:00', fecha: '19:00' },
  { dia: 'Terça',    abre: '10:00', fecha: '19:00' },
  { dia: 'Quarta',   abre: '10:00', fecha: '19:00' },
  { dia: 'Quinta',   abre: '10:00', fecha: '19:00' },
  { dia: 'Sexta',    abre: '10:00', fecha: '19:00' },
  { dia: 'Sábado',   abre: '10:00', fecha: '17:00' },
];

function getProximoDiaUtil(diaAtualIdx) {
  for (let i = 1; i <= 7; i++) {
    const nextIdx = (diaAtualIdx + i) % 7;
    const h = horarios[nextIdx];
    if (!h.fechado) {
      if (i === 1) return 'amanhã';
      return `${h.dia === 'Sábado' ? 'no Sábado' : `na ${h.dia}`}`;
    }
  }
  return 'em breve';
}

function renderHorarios() {
  const now       = new Date();
  const diaSemana = now.getDay();
  const horaAtual = now.getHours() * 60 + now.getMinutes();
  const diasOrdem = [1, 2, 3, 4, 5, 6, 0];
  const grid      = document.getElementById('horariosGrid');
  if (!grid) return;
  grid.innerHTML = '';

  diasOrdem.forEach(idx => {
    const h      = horarios[idx];
    const isHoje = idx === diaSemana;

    const card = document.createElement('div');
    card.className = 'horario-card' + (isHoje ? ' hoje' : '');

    if (h.fechado) {
      card.innerHTML = `
        <div>
          <span class="dia-nome">
            ${h.dia}${isHoje ? '<span class="hoje-badge">Hoje</span>' : ''}
          </span>
        </div>
        <span class="horario-hora" style="color:#e74c3c;">Fechado</span>
      `;
      grid.appendChild(card);

      if (isHoje) {
        const statusBar = document.querySelector('.status-bar');
        const txt = document.getElementById('statusText');
        if (statusBar && txt) {
          statusBar.className = 'status-bar status-closed';
          txt.textContent = `Fechado hoje · Voltamos ${getProximoDiaUtil(idx)}`;
        }
      }
      return;
    }

    const [aH, aM] = h.abre.split(':').map(Number);
    const [fH, fM] = h.fecha.split(':').map(Number);
    const abreMin  = aH * 60 + aM;
    const fechaMin = fH * 60 + fM;
    const aberto   = isHoje && horaAtual >= abreMin && horaAtual < fechaMin;

    card.innerHTML = `
      <div>
        <span class="dia-nome">
          ${h.dia}${isHoje ? '<span class="hoje-badge">Hoje</span>' : ''}
        </span>
      </div>
      <span class="horario-hora">${h.abre} – ${h.fecha}</span>
    `;
    grid.appendChild(card);

    if (isHoje) {
      const statusBar = document.querySelector('.status-bar');
      const txt = document.getElementById('statusText');
      if (statusBar && txt) {
        if (aberto) {
          statusBar.className = 'status-bar status-open';
          txt.textContent = `Aberto agora · Fechamos às ${h.fecha}`;
        } else if (horaAtual < abreMin) {
          statusBar.className = 'status-bar status-closed';
          txt.textContent = `Fechado · Abrimos hoje às ${h.abre}`;
        } else {
          statusBar.className = 'status-bar status-closed';
          txt.textContent = `Fechado · Voltamos ${getProximoDiaUtil(idx)}`;
        }
      }
    }
  });
}

// ─── ESTILOS / PORTFÓLIO ─────────────────────────────────
// Ícones SVG simples como placeholders visuais para cada estilo
const iconBlackwork = `
<svg class="style-icon" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="40" cy="40" r="28" stroke="currentColor" stroke-width="1.5"/>
  <path d="M40 12 L40 68 M12 40 L68 40 M19 19 L61 61 M61 19 L19 61" stroke="currentColor" stroke-width="1" opacity="0.4"/>
  <circle cx="40" cy="40" r="8" stroke="currentColor" stroke-width="1.5"/>
</svg>`;

const iconFineline = `
<svg class="style-icon" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M20 60 C 30 20, 50 20, 60 60" stroke="currentColor" stroke-width="0.8"/>
  <path d="M25 50 C 35 25, 45 25, 55 50" stroke="currentColor" stroke-width="0.5" opacity="0.5"/>
  <path d="M40 18 L 40 62" stroke="currentColor" stroke-width="0.8"/>
  <circle cx="40" cy="16" r="2" fill="currentColor" opacity="0.5"/>
</svg>`;

const iconRealismo = `
<svg class="style-icon" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect x="18" y="18" width="44" height="44" rx="2" stroke="currentColor" stroke-width="1"/>
  <path d="M18 50 L35 35 L48 46 L58 36 L62 40" stroke="currentColor" stroke-width="1" opacity="0.6"/>
  <circle cx="30" cy="30" r="5" stroke="currentColor" stroke-width="0.8"/>
</svg>`;

const iconAquarela = `
<svg class="style-icon" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M20 55 Q 30 20, 40 25 Q 50 30, 45 55 Q 40 70, 35 60 Q 30 50, 20 55Z" stroke="currentColor" stroke-width="0.8" opacity="0.7"/>
  <path d="M40 25 Q 55 15, 62 35 Q 68 50, 55 55" stroke="currentColor" stroke-width="0.8" opacity="0.5"/>
  <path d="M25 45 Q 40 30, 58 42" stroke="currentColor" stroke-width="0.5" opacity="0.35"/>
</svg>`;

const estilos = [
  {
    nome: 'Blackwork',
    cat: 'blackwork',
    icon: iconBlackwork,
    img: null,
    desc: 'Preto sólido, padrões geométricos e contraste intenso. Duradouro e marcante.',
    preco: 'A partir de R$ 200'
  },
  {
    nome: 'Tribal',
    cat: 'blackwork',
    icon: iconBlackwork,
    img: null,
    desc: 'Linhas grossas inspiradas em culturas ancestrais. Força e identidade.',
    preco: 'A partir de R$ 180'
  },
  {
    nome: 'Fine Line',
    cat: 'fineline',
    icon: iconFineline,
    img: null,
    desc: 'Traços finos e precisos, perfeito para detalhes delicados e minimalismo.',
    preco: 'A partir de R$ 150'
  },
  {
    nome: 'Floral Fine Line',
    cat: 'fineline',
    icon: iconFineline,
    img: null,
    desc: 'Flores, folhas e ramos em traço fino. Elegância no detalhe.',
    preco: 'A partir de R$ 170'
  },
  {
    nome: 'Realismo P&B',
    cat: 'realismo',
    icon: iconRealismo,
    img: null,
    desc: 'Retratos e elementos em escala de cinza com altíssimo grau de detalhe.',
    preco: 'A partir de R$ 350'
  },
  {
    nome: 'Realismo Colorido',
    cat: 'realismo',
    icon: iconRealismo,
    img: null,
    desc: 'Hiperrealismo com cor — técnica avançada para peças que impressionam.',
    preco: 'A partir de R$ 450'
  },
  {
    nome: 'Aquarela',
    cat: 'aquarela',
    icon: iconAquarela,
    img: null,
    desc: 'Manchas de cor soltas e pinceladas livres que imitam aquarela em papel.',
    preco: 'A partir de R$ 280'
  },
  {
    nome: 'Aquarela + Linha',
    cat: 'aquarela',
    icon: iconAquarela,
    img: null,
    desc: 'Combinação de fine line com fundo em aquarela — moderno e artístico.',
    preco: 'A partir de R$ 320'
  },
];

function renderProdutos() {
  const grid = document.getElementById('produtosGrid');
  if (!grid) return;
  grid.innerHTML = '';

  estilos.forEach(p => {
    const card = document.createElement('div');
    card.className   = 'produto-card visible';
    card.dataset.cat = p.cat;

    const imgHTML = p.img
      ? `<img src="${p.img}" alt="${p.nome}" class="produto-img-foto">`
      : `<div class="produto-img-placeholder">${p.icon}<span class="style-label-bg">${p.nome}</span></div>`;

    card.innerHTML = `
      <div class="produto-img">${imgHTML}</div>
      <div class="produto-info">
        <div class="produto-nome">${p.nome}</div>
        <div class="produto-desc">${p.desc}</div>
        <div class="produto-preco">${p.preco}</div>
      </div>
    `;
    grid.appendChild(card);
  });
}

function filtrar(cat, btn) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  if (btn) btn.classList.add('active');
  document.querySelectorAll('.produto-card').forEach(card => {
    const show = cat === 'todos' || card.dataset.cat === cat;
    card.classList.toggle('visible', show);
  });
}

// ─── NAVEGAÇÃO ──────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderHorarios();
  renderProdutos();

  const nav        = document.getElementById('mainNav');
  const menuToggle = document.getElementById('menuToggle');
  const navLinks   = document.getElementById('navLinks');
  const menuClose  = document.getElementById('menuClose');

  let lastScrollTop = 0;
  const shrinkOffset = 50;

  window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const isMobile = window.innerWidth <= 700;
    if (!nav) return;

    if (scrollTop > shrinkOffset) nav.classList.add('shrink');
    else nav.classList.remove('shrink');

    if (!isMobile) {
      if (scrollTop > lastScrollTop && scrollTop > 100) {
        nav.classList.add('scroll-down');
        nav.classList.remove('scroll-up');
      } else {
        nav.classList.remove('scroll-down');
        nav.classList.add('scroll-up');
      }
    }
    lastScrollTop = Math.max(0, scrollTop);
  });

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
  }

  if (menuClose && menuToggle && navLinks) {
    menuClose.addEventListener('click', () => {
      menuToggle.classList.remove('active');
      navLinks.classList.remove('active');
    });
  }

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      if (menuToggle && navLinks) {
        menuToggle.classList.remove('active');
        navLinks.classList.remove('active');
      }
    });
  });
});
