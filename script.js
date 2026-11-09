/* =============================================================
   CONFIGURAÇÃO DO SITE — EDITE AQUI
   1) Preencha WHATSAPP com DDI + DDD + número (somente dígitos).
      Exemplo fictício de formato: "5587999999999".
   2) Atualize o link do Instagram do desenvolvedor no index.html.
   3) Fotos e vídeo ficam na pasta assets/.
   ============================================================= */
const CONFIG = {
  WHATSAPP: "", // Número real da profissional; NÃO foi fornecido.
  MENSAGEM: "Olá, Dra. Bárbara! Conheci seu site e gostaria de saber sobre disponibilidade para agendar uma consulta."
};

const nav = document.getElementById('nav');
const toggle = document.getElementById('menu-toggle');
toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Abrir menu');
}));

document.getElementById('year').textContent = new Date().getFullYear();
// Demonstração de portfólio: não criar links para contatos não configurados.
const btn = document.getElementById('whatsapp-contact');
const modal = document.getElementById('demo-modal');
const dialog = modal.querySelector('.demo-dialog');
let priorFocus = null;
function closeDemo() {
  modal.hidden = true;
  document.body.classList.remove('demo-modal-open');
  if (priorFocus) priorFocus.focus();
}
btn.addEventListener('click', event => {
  event.preventDefault();
  priorFocus = document.activeElement;
  modal.hidden = false;
  document.body.classList.add('demo-modal-open');
  dialog.focus();
});
modal.querySelectorAll('[data-close-demo]').forEach(el => el.addEventListener('click', closeDemo));
document.addEventListener('keydown', e => {
  if (modal.hidden) return;
  if (e.key === 'Escape') closeDemo();
  if (e.key === 'Tab') {
    const focusable = [...dialog.querySelectorAll('button')];
    const i = focusable.indexOf(document.activeElement);
    if (e.shiftKey && (i <= 0)) { e.preventDefault(); focusable[focusable.length-1].focus(); }
    else if (!e.shiftKey && i === focusable.length-1) { e.preventDefault(); focusable[0].focus(); }
  }
});

/* Capa da foto -> vídeo -> volta à foto ao terminar. */
const presentationVideo = document.getElementById('barbara-video');
const presentationCover = document.getElementById('play-presentation');
const resetPresentation = document.getElementById('reset-presentation');
const presentationStatus = document.getElementById('presentation-status');
const presentationPlayer = document.querySelector('.showcase-player');
const presentationStart = document.getElementById('presentation-start');
function restorePhoto() {
  presentationVideo.pause();
  presentationVideo.currentTime = 0;
  presentationVideo.hidden = true;
  presentationPlayer.classList.remove('is-playing');
  presentationCover.hidden = false;
  resetPresentation.hidden = true;
  presentationStatus.textContent = 'Bárbara Rodrigues · Psicóloga';
  presentationStart.hidden = false;
}
function startPresentation() {
  presentationCover.hidden = true;
  presentationPlayer.classList.add('is-playing');
  presentationVideo.hidden = false;
  resetPresentation.hidden = false;
  presentationStatus.textContent = 'Vídeo em reprodução';
  presentationStart.hidden = true;
  presentationVideo.currentTime = 0;
  // Ao expandir o player, posiciona a reprodução dentro da área visível.
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  requestAnimationFrame(() => {
    presentationPlayer.scrollIntoView({behavior: reduceMotion ? 'instant' : 'smooth', block: 'center'});
  });
  const playing = presentationVideo.play();
  if (playing && typeof playing.catch === 'function') {
    playing.catch(() => { presentationStatus.textContent = 'Pressione reproduzir no vídeo para assistir.'; });
  }
}
presentationCover.addEventListener('click', startPresentation);
presentationStart.addEventListener('click', startPresentation);
presentationVideo.addEventListener('ended', restorePhoto);
resetPresentation.addEventListener('click', restorePhoto);
