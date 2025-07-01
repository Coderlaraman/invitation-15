// Animación de rosas cayendo al hacer scroll
const rosesContainer = document.getElementById("falling-roses-container");
const roseImgSrc = "assets/images/rose.png";

function createFallingRose() {
  const rose = document.createElement("img");
  rose.src = roseImgSrc;
  rose.alt = "Rosa decorativa";
  rose.className = "falling-rose";
  // Posición horizontal aleatoria
  const startLeft = Math.random() * 90; // 0vw a 90vw
  rose.style.left = startLeft + "vw";
  rose.style.width = 32 + Math.random() * 32 + "px";
  rose.style.opacity = 0.85 + Math.random() * 0.15;
  // Animación con duración aleatoria
  const duration = 2.5 + Math.random() * 2.5; // entre 2 y 5 segundos
  rose.style.animationDuration = duration + "s";
  // Trayectoria lateral aleatoria
  const horizontalDrift = (Math.random() - 0.5) * 40; // -20vw a +20vw
  const rotateStart = -30 + Math.random() * 60; // -30deg a +30deg
  const rotateEnd = rotateStart + (-20 + Math.random() * 40); // más variación
  rose.style.setProperty("--rose-drift", horizontalDrift + "vw");
  rose.style.setProperty("--rose-rotate-start", rotateStart + "deg");
  rose.style.setProperty("--rose-rotate-end", rotateEnd + "deg");
  rosesContainer.appendChild(rose);
  rose.addEventListener("animationend", () => rose.remove());
}

// Intermitencia e irregularidad: al hacer scroll, inicia un temporizador aleatorio para crear rosas
let lastScrollY = 0;
let roseTimeout = null;

function scheduleRandomRose() {
  if (roseTimeout) clearTimeout(roseTimeout);
  // Tiempo aleatorio entre 80ms y 350ms para mayor cantidad de rosas
  const delay = 80 + Math.random() * 270;
  // En cada ciclo, pueden caer 2 o 4 rosas (el doble de antes)
  const rosesThisCycle = 2 + (Math.random() < 0.5 ? 2 : 0);
  roseTimeout = setTimeout(() => {
    for (let i = 0; i < rosesThisCycle; i++) {
      createFallingRose();
    }
    // Si el usuario sigue haciendo scroll, programa otra rosa
    if (Math.abs(window.scrollY - lastScrollY) > 10) {
      scheduleRandomRose();
    }
  }, delay);
}

window.addEventListener("scroll", () => {
  if (Math.abs(window.scrollY - lastScrollY) > 10) {
    lastScrollY = window.scrollY;
    scheduleRandomRose();
  }
});
