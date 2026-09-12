const mailWrap     = document.querySelector('.mail-wrap');
const openButton   = document.getElementById('openButton');
const page1        = document.getElementById('page1');
const page2        = document.getElementById('page2');
const burstLayer   = document.getElementById('burstLayer');
let hasOpened = false;

openButton.addEventListener('click', () => {
  if (hasOpened) return;
  hasOpened = true;

  openButton.disabled = true;
  mailWrap.classList.add('is-opening');

  spawnBurst();
  window.setTimeout(() => {
    page1.classList.add('is-hidden');
    document.body.style.overflow = 'auto';
    page2.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 900);
});
function spawnBurst() {
  const totalPieces = 42;

  for (let i = 0; i < totalPieces; i++) {
    const piece = document.createElement('span');
    const isHeart = Math.random() < 0.22;

    piece.classList.add('burst-piece', isHeart ? 'heart' : 'petal');
    if (!isHeart && Math.random() < 0.45) piece.classList.add('alt');

    if (isHeart) {
      const img = document.createElement('img');
      img.src = 'pink-heart.png';
      img.alt = '';
      piece.appendChild(img);
    }

    const angle    = Math.random() * Math.PI * 2;
    const distance = 140 + Math.random() * 260;
    const tx       = Math.cos(angle) * distance;
    const ty       = Math.sin(angle) * distance - 60;
    const rot      = (Math.random() * 720 - 360).toFixed(0);
    const scale    = (0.6 + Math.random() * 1.1).toFixed(2);
    const duration = (0.9 + Math.random() * 0.9).toFixed(2);
    const delay    = (Math.random() * 0.35).toFixed(2);

    piece.style.setProperty('--tx', `${tx}px`);
    piece.style.setProperty('--ty', `${ty}px`);
    piece.style.setProperty('--rot', `${rot}deg`);
    piece.style.setProperty('--scale', scale);
    piece.style.animation = `burst-fly ${duration}s ease-out ${delay}s forwards`;

    burstLayer.appendChild(piece);
    window.setTimeout(() => piece.remove(), (parseFloat(duration) + parseFloat(delay)) * 1000 + 200);
  }
}
const styleSheet = document.createElement('style');
styleSheet.textContent = `
@keyframes burst-fly {
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.3) rotate(0deg);
  }
  15% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(var(--scale)) rotate(var(--rot));
  }
}
`;
document.head.appendChild(styleSheet);
