/* script.js
   Pequeñas interacciones:
   - Permite cargar un archivo de audio desde input y cargarlo en el <audio>.
   - Añade efecto glitch intermitente en la página "negro" para elementos con class="glitchable".
*/

/* Helper para conectar file input con audio element */
function wireAudioInput(fileInputId, audioElId){
  const fileInput = document.getElementById(fileInputId);
  const audioEl = document.getElementById(audioElId);
  if(!fileInput || !audioEl) return;

  fileInput.addEventListener('change', (e) => {
    const f = e.target.files && e.target.files[0];
    if(!f) return;
    // Crear URL local para reproducir sin subir al servidor
    const url = URL.createObjectURL(f);
    // reemplaza la source existente
    audioEl.src = url;
    audioEl.load();
    // opcional: reproducir automaticamente (comenta si no quieres autoplay)
    // audioEl.play();
  });
}

/* Efecto glitch intermitente: agrega clase 'is-glitch' por unos instantes */
function setupGlitchPulse(){
  // Si estamos en la página "negro"
  if(!document.body.classList.contains('negro')) return;
  const glitchables = document.querySelectorAll('.glitchable');
  if(!glitchables.length) return;

  // para cada elemento, añadimos atributo data-text (necesario para pseudo elementos)
  glitchables.forEach(el => {
    el.setAttribute('data-text', el.textContent || '');
  });

  // pulsemos glitch de forma aleatoria cada X segundos
  setInterval(() => {
    const el = glitchables[Math.floor(Math.random() * glitchables.length)];
    if(!el) return;
    el.classList.add('glitch', 'is-glitch');
    // quitar despues de un momento
    setTimeout(() => {
      el.classList.remove('is-glitch');
    }, 900 + Math.random() * 700); // duracion variable
  }, 2200 + Math.random() * 2400);
}

/* Inicia animaciones y enlaces de audio al cargar DOM */
document.addEventListener('DOMContentLoaded', function(){
  // Conectar inputs de audio si existen:
  wireAudioInput('audio-file-blanco','audio-blanco');
  wireAudioInput('audio-file-negro','audio-negro');

  // Glitch pulse sólo en la página negra
  setupGlitchPulse();

  // Pequeño detalle: si hay elementos .line en la página, reforce repaint para iniciar animaciones
  // (no es siempre necesario, pero ayuda en móviles)
  const lines = document.querySelectorAll('.line');
  if(lines.length){
    // forzar repaint
    lines.forEach((l) => l.style.willChange = 'opacity,transform');
    setTimeout(() => lines.forEach(l => l.style.willChange = ''), 1500);
  }
});
