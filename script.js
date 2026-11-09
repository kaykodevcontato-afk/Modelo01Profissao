/* =============================================================
   CONFIGURAÇÃO DO SITE — EDITE AQUI
   1) Preencha WHATSAPP com DDI + DDD + número (somente dígitos).
      Exemplo fictício de formato: "5587999999999".
   2) Atualize o link do Instagram do desenvolvedor no index.html.
   3) Fotos e vídeo ficam na pasta assets/.
   ============================================================= */
const CONFIG = {
  MODO_DEMONSTRACAO: true, // Mantém contatos desativados neste portfólio.
  WHATSAPP: "", // Configure apenas após autorização e publicação do site real.
  MENSAGEM: "Olá! Gostaria de saber sobre disponibilidade para agendar uma consulta."
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
const btn = document.getElementById('whatsapp-contact');
const note = document.getElementById('contact-info');
const digits = CONFIG.WHATSAPP.replace(/\D/g, '');
if (CONFIG.MODO_DEMONSTRACAO) {
  btn.removeAttribute('target');
  btn.removeAttribute('rel');
  btn.addEventListener('click', e => {
    e.preventDefault();
    note.textContent = 'Esta é uma demonstração do botão de contato. Em um site contratado, ele poderá abrir o WhatsApp profissional com uma mensagem pronta.';
    note.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
} else if (digits.length >= 12 && digits.length <= 13) {
  btn.href = `https://wa.me/${digits}?text=${encodeURIComponent(CONFIG.MENSAGEM)}`;
} else {
  btn.removeAttribute('target');
  btn.removeAttribute('rel');
  btn.addEventListener('click', e => {
    e.preventDefault();
    note.textContent = 'Contato indisponível. Configure o WhatsApp profissional antes de publicar o site definitivo.';
  });
}

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

// Não tente reproduzir vídeo ausente em demonstrações sem o arquivo original.
presentationVideo.addEventListener('error', () => {
  restorePhoto();
  presentationStatus.textContent = 'Vídeo de exemplo não incluído. Adicione o arquivo em assets/barbara-video.mp4 para ativar.';
});
