// Reproducir audio al hacer clic en la corona
document.addEventListener("DOMContentLoaded", function () {
  var crownBtn = document.getElementById("audio-crown-btn");
  var audio = document.getElementById("audio-belle");
  if (crownBtn && audio) {
    crownBtn.addEventListener("click", function () {
      if (audio.paused) {
        audio.currentTime = 0;
        audio.play();
      } else {
        audio.pause();
        audio.currentTime = 0;
      }
    });
  }
});
// Configuración de WhatsApp y Google Maps
const CONFIG = {
  whatsapp: {
    phoneNumber: "525551234567", // Cambiar por el número real
    messages: {
      accept:
        "¡Hola! 🌹 Confirmo mi asistencia a los XV años de Karoline Zamara Vélez Sierra el 4 de octubre de 2025. ¡Será un honor acompañarla en esta noche mágica inspirada en La Bella y la Bestia! ✨👑",
      decline:
        "Hola, lamentablemente no podré asistir a los XV años de Karoline Zamara el 4 de octubre de 2025. Espero que tengan una hermosa celebración. Mis mejores deseos para la quinceañera. 💕🌹",
    },
  },
  googleMaps: {
    // Coordenadas del lugar (cambiar por las reales)
    latitude: 19.4326,
    longitude: -99.1332,
    placeName: "Salón de Eventos El Castillo",
    address: "Av. Principal #123, Centro",
  },
};

// Referencias a elementos del DOM
const acceptBtn = document.getElementById("accept-btn");
const declineBtn = document.getElementById("decline-btn");
const locationBtn = document.getElementById("location-btn");
const animationContainer = document.getElementById("animation-container");
const characterImage = document.getElementById("character-image");
const responseMessage = document.getElementById("response-message");

// Referencias del carrusel
const carouselTrack = document.getElementById("carousel-track");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const indicators = document.getElementById("carousel-indicators");

// Estado del carrusel
let currentSlide = 0;
const totalSlides = 4;
let carouselInterval;
let restartTimeout;

// Configuración de respuestas de personajes
const characterResponses = {
  accept: {
    image: "assets/svg/chip-happy.svg",
    message:
      "¡Qué maravilloso! 🎉✨ Chip está emocionado de verte en el baile real de Karoline. ¡Será una noche mágica!",
    alt: "Chip feliz celebrando",
  },
  decline: {
    image: "assets/svg/chip-sad.svg",
    message:
      "¡Oh no! 😢💔 Chip esperaba verte en la celebración de Karoline, pero entiende que a veces no se puede asistir.",
    alt: "Chip triste y comprensivo",
  },
};

// ========== FUNCIONES DEL CARRUSEL ==========

function updateCarousel() {
  const translateX = -currentSlide * 25; // 25% por cada slide
  carouselTrack.style.transform = `translateX(${translateX}%)`;

  // Actualizar indicadores
  const allIndicators = indicators.querySelectorAll(".indicator");
  allIndicators.forEach((indicator, index) => {
    indicator.classList.toggle("active", index === currentSlide);
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  updateCarousel();
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  updateCarousel();
}

function goToSlide(slideIndex) {
  currentSlide = slideIndex;
  updateCarousel();
}

function startCarouselAutoplay() {
  carouselInterval = setInterval(nextSlide, 4000); // Cambiar cada 4 segundos
}

function stopCarouselAutoplay() {
  if (carouselInterval) {
    clearInterval(carouselInterval);
  }
}

function initializeCarousel() {
  // Event listeners para botones de navegación

  function restartAutoplayWithDelay() {
    stopCarouselAutoplay();
    if (restartTimeout) clearTimeout(restartTimeout);
    restartTimeout = setTimeout(startCarouselAutoplay, 8000);
  }

  nextBtn.addEventListener("click", () => {
    nextSlide();
    restartAutoplayWithDelay();
  });

  prevBtn.addEventListener("click", () => {
    prevSlide();
    restartAutoplayWithDelay();
  });

  // Event listeners para indicadores
  const allIndicators = indicators.querySelectorAll(".indicator");
  allIndicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      goToSlide(index);
      restartAutoplayWithDelay();
    });
  });

  // Pausar autoplay al hacer hover sobre el carrusel
  const carousel = document.querySelector(".photo-carousel");
  carousel.addEventListener("mouseenter", stopCarouselAutoplay);
  carousel.addEventListener("mouseleave", startCarouselAutoplay);

  // Iniciar autoplay
  startCarouselAutoplay();

  // Soporte para gestos táctiles en móviles
  let startX = 0;
  let endX = 0;

  carousel.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    stopCarouselAutoplay();
  });

  carousel.addEventListener("touchend", (e) => {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
    restartAutoplayWithDelay();
  });

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = startX - endX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        nextSlide(); // Swipe left - next slide
      } else {
        prevSlide(); // Swipe right - previous slide
      }
    }
  }
}

// ========== FUNCIONES DE WHATSAPP Y MAPS ==========

function generateWhatsAppURL(message) {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${CONFIG.whatsapp.phoneNumber}?text=${encodedMessage}`;
}

function generateGoogleMapsURL() {
  const { latitude, longitude, placeName, address } = CONFIG.googleMaps;
  return `https://maps.google.com/?q=${latitude},${longitude}`;
}

// ========== FUNCIONES DE ANIMACIÓN DE PERSONAJES ==========

function showCharacterAnimation(type) {
  const response = characterResponses[type];

  // Configurar la imagen y mensaje
  characterImage.src = response.image;
  characterImage.alt = response.alt;
  responseMessage.textContent = response.message;

  // Mostrar el contenedor con animación
  animationContainer.classList.remove("hidden");

  // Pequeño delay para que se procese el display, luego mostrar
  setTimeout(() => {
    animationContainer.classList.add("show");
  }, 100);

  // Scroll suave hacia la animación
  setTimeout(() => {
    animationContainer.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, 400);
}

function clearPreviousAnimation() {
  animationContainer.classList.remove("show");
  setTimeout(() => {
    animationContainer.classList.add("hidden");
  }, 300);
}

function addButtonFeedback(button) {
  button.style.transform = "scale(0.95)";
  setTimeout(() => {
    button.style.transform = "";
  }, 150);
}

// ========== MANEJADORES DE EVENTOS PRINCIPALES ==========

function handleAcceptance() {
  console.log("✨ Usuario acepta la invitación");

  clearPreviousAnimation();
  addButtonFeedback(acceptBtn);

  setTimeout(() => {
    showCharacterAnimation("accept");
  }, 400);

  setTimeout(() => {
    const whatsappURL = generateWhatsAppURL(CONFIG.whatsapp.messages.accept);
    window.open(whatsappURL, "_blank");
  }, 2000);
}

function handleDecline() {
  console.log("💔 Usuario declina la invitación");

  clearPreviousAnimation();
  addButtonFeedback(declineBtn);

  setTimeout(() => {
    showCharacterAnimation("decline");
  }, 400);

  setTimeout(() => {
    const whatsappURL = generateWhatsAppURL(CONFIG.whatsapp.messages.decline);
    window.open(whatsappURL, "_blank");
  }, 2000);
}

function handleLocationClick() {
  console.log("🗺️ Usuario solicita ver ubicación");

  addButtonFeedback(locationBtn);

  setTimeout(() => {
    const mapsURL = generateGoogleMapsURL();
    window.open(mapsURL, "_blank");
  }, 200);
}

// ========== EFECTOS MÁGICOS Y INTERACCIONES ==========

function initializeMagicalEffects() {
  // Efecto de partículas al hacer hover en el título principal
  const title = document.querySelector(".fairy-tale-title");
  if (title) {
    title.addEventListener("mouseover", function () {
      this.style.animation = "sparkle 0.8s ease-in-out";
      setTimeout(() => {
        this.style.animation = "sparkle 4s ease-in-out infinite alternate";
      }, 800);
    });
  }

  // Efecto interactivo en la corona divisoria
  const crownDivider = document.querySelector(".crown-divider");
  if (crownDivider) {
    crownDivider.addEventListener("click", function () {
      this.style.transform = "scale(1.4) rotate(360deg)";
      this.style.transition = "all 0.6s ease";
      setTimeout(() => {
        this.style.transform = "";
      }, 600);
    });

    crownDivider.title = "Haz clic en la corona real ✨";
  }

  // Efecto en los ornamentos de las esquinas
  const ornaments = document.querySelectorAll(".corner-frame");
  ornaments.forEach((ornament, index) => {
    ornament.addEventListener("mouseenter", function () {
      const corner = this.querySelector(".ornamental-corner");
      corner.style.transform = "scale(1.1) rotate(10deg)";
      corner.style.transition = "all 0.3s ease";
    });

    ornament.addEventListener("mouseleave", function () {
      const corner = this.querySelector(".ornamental-corner");
      corner.style.transform = "";
    });

    // Animación de entrada escalonada
    setTimeout(() => {
      ornament.style.opacity = "0";
      ornament.style.transform = "scale(0.5)";
      ornament.style.transition = "all 0.6s ease";

      setTimeout(() => {
        ornament.style.opacity = "1";
        ornament.style.transform = "scale(1)";
      }, 100);
    }, index * 200);
  });
}

// ========== OPTIMIZACIONES MÓVILES ==========

function initializeMobileOptimizations() {
  // Prevenir el zoom en dispositivos móviles al hacer doble tap
  let lastTouchEnd = 0;
  document.addEventListener(
    "touchend",
    function (event) {
      const now = new Date().getTime();
      if (now - lastTouchEnd <= 300) {
        event.preventDefault();
      }
      lastTouchEnd = now;
    },
    false
  );

  // Manejar cambios de orientación
  window.addEventListener("orientationchange", function () {
    setTimeout(() => {
      window.scrollTo(0, 0);
      const container = document.querySelector(".invitation-container");
      if (container) {
        container.style.minHeight = window.innerHeight + "px";
      }
    }, 500);
  });

  // Optimizar scroll en iOS
  document.body.style.webkitOverflowScrolling = "touch";
}

// ========== MANEJO DE ERRORES ==========

function handleImageError(imgElement, fallbackEmoji) {
  imgElement.style.display = "none";
  const parent = imgElement.parentElement;
  const fallbackDiv = document.createElement("div");
  fallbackDiv.className = "image-fallback";
  fallbackDiv.innerHTML = `
        <div style="
            width: ${imgElement.offsetWidth || 120}px; 
            height: ${imgElement.offsetHeight || 120}px; 
            background: linear-gradient(45deg, var(--primary-gold), var(--light-gold));
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 3rem;
            margin: 0 auto var(--spacing-md);
            box-shadow: 0 4px 15px var(--shadow-color);
        ">
            ${fallbackEmoji}
        </div>
    `;
  parent.insertBefore(fallbackDiv, imgElement);
}

// ========== INICIALIZACIÓN PRINCIPAL ==========

function initializeApp() {
  console.log(
    "🌹 Invitación digital de Karoline Zamara Vélez Sierra inicializada"
  );
  console.log("📅 Fecha del evento: 4 de octubre de 2025");

  // Inicializar carrusel
  initializeCarousel();

  // Inicializar efectos mágicos
  initializeMagicalEffects();

  // Inicializar optimizaciones móviles
  initializeMobileOptimizations();

  // Event listeners principales
  acceptBtn.addEventListener("click", handleAcceptance);
  declineBtn.addEventListener("click", handleDecline);
  locationBtn.addEventListener("click", handleLocationClick);

  // Manejo de errores para imágenes de personajes
  characterImage.addEventListener("error", function () {
    const isHappy = this.src.includes("happy");
    const fallbackEmoji = isHappy ? "😊" : "😢";
    handleImageError(this, fallbackEmoji);
  });

  // Configurar meta tags dinámicos
  document.title = "XV Años - Karoline Zamara Vélez Sierra | 4 de Octubre 2025";

  const metaDescription = document.createElement("meta");
  metaDescription.name = "description";
  metaDescription.content =
    "Te invitamos a los XV años de Karoline Zamara Vélez Sierra. Una noche mágica inspirada en La Bella y la Bestia. 4 de octubre de 2025.";
  document.head.appendChild(metaDescription);
}

// ========== DEBUG Y TESTING ==========

function debugInfo() {
  if (window.location.search.includes("debug=true")) {
    console.log("🔧 Modo debug activado");
    console.log("📱 WhatsApp Config:", CONFIG.whatsapp);
    console.log("🗺️ Maps Config:", CONFIG.googleMaps);
    console.log("🎭 Character Responses:", characterResponses);

    const debugBtn = document.createElement("button");
    debugBtn.textContent = "🧪 Test Animation";
    debugBtn.style.position = "fixed";
    debugBtn.style.top = "10px";
    debugBtn.style.right = "10px";
    debugBtn.style.zIndex = "1000";
    debugBtn.style.padding = "10px";
    debugBtn.style.background = "red";
    debugBtn.style.color = "white";
    debugBtn.style.border = "none";
    debugBtn.style.borderRadius = "5px";
    debugBtn.onclick = () => showCharacterAnimation("accept");
    document.body.appendChild(debugBtn);
  }
}

// ========== INICIALIZACIÓN ==========

document.addEventListener("DOMContentLoaded", function () {
  initializeApp();
  debugInfo();
});

// Manejar errores globales
window.addEventListener("error", function (e) {
  console.error("❌ Error en la aplicación:", e.error);
});

// Exportar funciones para testing
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    generateWhatsAppURL,
    generateGoogleMapsURL,
    CONFIG,
  };
}
