// Reproducir audio al hacer clic en la corona



document.addEventListener("DOMContentLoaded", function () {
  // Función para solicitar y mostrar el nombre del invitado
  function personalizeInvitation() {
    const urlParams = new URLSearchParams(window.location.search);
    const guestName = urlParams.get('name');
    const token = urlParams.get('token');
    const secretKey = 'K4r0l1n3-Z4m4r4-2025'; // La misma clave secreta que en admin.html

    let displayName = "Invitado de Honor"; // Nombre por defecto

    if (guestName && token) {
        try {
            // Re-crear el token para verificarlo
            const expectedToken = btoa(guestName + secretKey);
            if (token === expectedToken) {
                displayName = guestName;
            }
        } catch (e) {
            console.error("Error al verificar el token:", e);
        }
    }

    const guestNameElement = document.getElementById('guest-name');
    if (guestNameElement) {
        guestNameElement.textContent = displayName;
    }
  }

  // Función para animar el título y el nombre de la quinceañera
  function animateTitles() {
    const titles = document.querySelectorAll('.celebrant-name');
    
    titles.forEach(title => {
      // Saltamos el elemento guest-name que ya tiene su propia animación
      if (title.id === 'guest-name') return;
      
      // Creamos un efecto de brillo dorado que se mueve
      const originalText = title.textContent;
      const letters = originalText.split('');
      
      // Limpiamos el contenido original
      title.textContent = '';
      
      // Creamos un span para cada letra
      letters.forEach((letter, index) => {
        const span = document.createElement('span');
        span.textContent = letter;
        span.style.display = 'inline-block';
        span.style.position = 'relative';
        
        // Añadimos un retraso basado en el índice para crear un efecto en cascada
        span.style.animation = `fireworks 3s ${index * 0.1}s infinite alternate`;
        
        title.appendChild(span);
      });
    });
  }

  personalizeInvitation();
  animateTitles();

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

  initializeApp();
  debugInfo();
});
// Configuración de WhatsApp y Google Maps
const CONFIG = {
  whatsapp: {
    phoneNumber: '573247747464',
    messages: {
      accept: '¡Hola! Confirmo mi asistencia a la fiesta de 15 años de Karoline Sierra. ¡Estoy emocionado/a de ser parte de esta celebración mágica! 🏰✨',
      decline: 'Hola, lamento informar que no podré asistir a la fiesta de 15 años de Karoline Sierra. Les deseo una celebración maravillosa. 💐'
    }
  },
  googleMaps: {
    url: 'https://maps.app.goo.gl/p6muqr1gMfoxRGWz9',
    placeName: 'Celebraciónes casa quinta',
    address: 'Cra. 34 #71-08, El Raizal, Manrique Oriental'
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
  // Obtener el nombre del invitado para personalizar el mensaje
  const urlParams = new URLSearchParams(window.location.search);
  let guestName = urlParams.get('name');
  
  if (guestName) {
    // Si hay un nombre de invitado, personalizar el mensaje de manera más integrada
    if (message.includes('Confirmo mi asistencia')) {
      message = `¡Hola! Mi nombre es *${guestName}* y confirmo mi asistencia a la fiesta de 15 años de Karoline Sierra. ¡Estoy emocionado/a de ser parte de esta celebración mágica! 🏰✨`;
    } else if (message.includes('no podré asistir')) {
      message = `Hola, mi nombre es *${guestName}* y lamento informar que no podré asistir a la fiesta de 15 años de Karoline Sierra. Les deseo una celebración maravillosa. 💐`;
    }
  }
  
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

  // Mostrar animación de personaje
  setTimeout(() => {
    showCharacterAnimation("accept");
  }, 400);

  // Abrir WhatsApp después de un breve retraso para que el usuario vea la animación
  setTimeout(() => {
    const whatsappURL = generateWhatsAppURL(CONFIG.whatsapp.messages.accept);
    window.open(whatsappURL, "_blank");
    
    // Obtener el nombre del invitado para personalizar el mensaje de confirmación
    const urlParams = new URLSearchParams(window.location.search);
    let guestName = urlParams.get('name');
    let personalizacion = guestName ? `${guestName}` : "";
    
    // Mostrar un mensaje de confirmación personalizado
    const confirmationMsg = document.createElement('div');
    confirmationMsg.className = 'whatsapp-confirmation';
    confirmationMsg.innerHTML = `
      <div class="confirmation-content">
        <p>¡Gracias${personalizacion ? " " + personalizacion : ""} por confirmar tu asistencia! 🎉</p>
        <p>Se ha abierto WhatsApp para enviar tu confirmación.</p>
        <div class="confirmation-decoration">✨ 🏰 ✨</div>
      </div>
    `;
    document.body.appendChild(confirmationMsg);
    
    // Eliminar el mensaje después de 5 segundos
    setTimeout(() => {
      confirmationMsg.classList.add('fade-out');
      setTimeout(() => {
        document.body.removeChild(confirmationMsg);
      }, 500);
    }, 5000);
  }, 2500);
}

function handleDecline() {
  console.log("💔 Usuario declina la invitación");

  clearPreviousAnimation();
  addButtonFeedback(declineBtn);

  // Mostrar animación de personaje
  setTimeout(() => {
    showCharacterAnimation("decline");
  }, 400);

  // Abrir WhatsApp después de un breve retraso para que el usuario vea la animación
  setTimeout(() => {
    const whatsappURL = generateWhatsAppURL(CONFIG.whatsapp.messages.decline);
    window.open(whatsappURL, "_blank");
    
    // Obtener el nombre del invitado para personalizar el mensaje de confirmación
    const urlParams = new URLSearchParams(window.location.search);
    let guestName = urlParams.get('name');
    let personalizacion = guestName ? `${guestName}` : "";
    
    // Mostrar un mensaje de confirmación personalizado
    const confirmationMsg = document.createElement('div');
    confirmationMsg.className = 'whatsapp-confirmation';
    confirmationMsg.innerHTML = `
      <div class="confirmation-content">
        <p>Lamentamos${personalizacion ? " " + personalizacion : ""} que no puedas asistir 💔</p>
        <p>Se ha abierto WhatsApp para enviar tu mensaje.</p>
        <div class="confirmation-decoration">💌 🌹 💌</div>
      </div>
    `;
    document.body.appendChild(confirmationMsg);
    
    // Eliminar el mensaje después de 5 segundos
    setTimeout(() => {
      confirmationMsg.classList.add('fade-out');
      setTimeout(() => {
        document.body.removeChild(confirmationMsg);
      }, 500);
    }, 5000);
  }, 2500);
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
  // Detectar si es un dispositivo móvil
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
  
  // Aplicar optimizaciones específicas para móviles
  if (isMobile) {
    // Reducir animaciones en dispositivos de gama baja
    if (getConnectionType() === 'slow') {
      document.body.classList.add('reduce-animations');
      console.log('Optimizando para conexión lenta: reduciendo animaciones');
    }
    
    // Precargar solo las imágenes esenciales
    const nonEssentialImages = document.querySelectorAll('.side-character img, .falling-rose');
    nonEssentialImages.forEach(img => {
      img.loading = 'lazy';
    });
    
    // Optimizar el desplazamiento suave
    document.documentElement.style.scrollBehavior = 'smooth';
  }
  
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

// Función para manejar errores de carga de imágenes y optimizar para móviles
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

// Función para detectar el tipo de conexión
function getConnectionType() {
  if ('connection' in navigator) {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (connection) {
      if (connection.saveData) {
        return 'slow'; // Modo de ahorro de datos activado
      }
      
      if (connection.effectiveType) {
        // Tipos de conexión: 'slow-2g', '2g', '3g', '4g'
        return ['slow-2g', '2g'].includes(connection.effectiveType) ? 'slow' : 'fast';
      }
      
      if (connection.type) {
        return ['cellular', 'wimax'].includes(connection.type) ? 'slow' : 'fast';
      }
    }
  }
  
  // Si no se puede determinar, asumir conexión rápida
  return 'fast';
}

// Función para optimizar imágenes en dispositivos móviles
function optimizeImagesForMobile() {
  // Detectar si es un dispositivo móvil basado en el ancho de la pantalla
  const isMobile = window.innerWidth <= 768;
  const isSmallMobile = window.innerWidth <= 480;
  const isLandscape = window.innerWidth > window.innerHeight;
  const connectionType = getConnectionType();
  
  // Obtener todas las imágenes del carrusel
  const carouselImages = document.querySelectorAll('.quinceañera-photo');
  
  // Optimizar imagen de portada
  const coverImage = document.querySelector('.cover-header img');
  if (coverImage) {
    if (isSmallMobile) {
      coverImage.style.objectFit = 'cover';
      coverImage.style.objectPosition = 'center 40%';
    }
  }
  
  // Optimizar imágenes del carrusel
  carouselImages.forEach((img, index) => {
    // Establecer atributos de carga diferida para mejorar el rendimiento
    // Solo la primera imagen se carga inmediatamente, el resto con lazy loading
    img.loading = index === 0 ? 'eager' : 'lazy';
    
    // Ajustar calidad de imagen según el dispositivo
    if (isSmallMobile) {
      // Para dispositivos muy pequeños, priorizar velocidad sobre calidad
      img.style.objectFit = 'cover';
      img.style.objectPosition = isLandscape ? 'center center' : 'center 20%';
    } else if (isMobile) {
      // Para tablets y móviles medianos
      img.style.objectFit = 'cover';
      img.style.objectPosition = 'center 30%';
    }
    
    // En conexiones lentas, intentar cargar versiones optimizadas de las imágenes
    if (connectionType === 'slow' && !img.dataset.optimized) {
      const originalSrc = img.src;
      const fileExtension = originalSrc.split('.').pop();
      const optimizedSrc = originalSrc.replace(`.${fileExtension}`, `-optimized.${fileExtension}`);
      
      // Marcar como ya optimizada para evitar intentos repetidos
      img.dataset.optimized = 'true';
      
      // Intentar cargar versión optimizada
      const tempImg = new Image();
      tempImg.onload = function() {
        img.src = optimizedSrc;
        console.log('Cargada versión optimizada:', optimizedSrc);
      };
      tempImg.onerror = function() {
        // Si no existe versión optimizada, mantener original
        console.log('No se encontró versión optimizada para:', originalSrc);
      };
      tempImg.src = optimizedSrc;
    }
    
    // Añadir manejador de errores a cada imagen
    img.onerror = function() {
      handleImageError(this, '📸');
    };
  });
  
  // Optimizar imágenes de personajes laterales
  const sideCharacters = document.querySelectorAll('.character-side-img');
  sideCharacters.forEach(img => {
    img.loading = 'lazy';
    if (isSmallMobile || (isMobile && isLandscape)) {
      // En móviles pequeños o en modo paisaje, ocultar para mejorar rendimiento
      img.style.opacity = '0.4';
    } else {
      img.style.opacity = '1';
    }
  });
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
  optimizeImagesForMobile();

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
  
  // Manejar cambios de orientación
  window.addEventListener('orientationchange', handleOrientationChange);
  window.addEventListener('resize', debounce(handleResize, 250));
}

// Función para manejar cambios de orientación
function handleOrientationChange() {
  // Pequeño retraso para permitir que el navegador complete el cambio de orientación
  setTimeout(() => {
    optimizeImagesForMobile();
    adjustCarouselHeight();
    adjustInvitationLayout();
  }, 300);
}

// Función para ajustar el layout general de la invitación según la orientación
function adjustInvitationLayout() {
  const isLandscape = window.innerWidth > window.innerHeight;
  const isMobile = window.innerWidth <= 768;
  const container = document.querySelector('.invitation-container');
  const mainContent = document.querySelector('.main-content');
  const responseButtons = document.querySelector('.response-buttons');
  
  if (isMobile && isLandscape) {
    // En modo paisaje en móviles, ajustar el contenedor principal
    if (container) {
      container.style.minHeight = 'auto';
      container.style.height = 'auto';
      container.style.maxHeight = '100vh';
      container.style.overflowY = 'auto';
    }
    
    // Ajustar los botones de respuesta en modo paisaje
    if (responseButtons) {
      responseButtons.style.flexDirection = 'row';
      responseButtons.style.justifyContent = 'center';
      responseButtons.style.gap = 'var(--spacing-sm)';
    }
  } else {
    // Restaurar estilos en modo retrato
    if (container) {
      container.style.minHeight = '';
      container.style.height = '';
      container.style.maxHeight = '';
      container.style.overflowY = '';
    }
    
    // Restaurar botones de respuesta en modo retrato
    if (responseButtons && window.innerWidth <= 480) {
      responseButtons.style.flexDirection = 'column';
      responseButtons.style.justifyContent = '';
      responseButtons.style.gap = '';
    }
  }
}

// Función para ajustar la altura del carrusel según el ancho disponible
function adjustCarouselHeight() {
  const carousel = document.querySelector('.photo-carousel');
  if (!carousel) return;
  
  const isLandscape = window.innerWidth > window.innerHeight;
  const isMobile = window.innerWidth <= 768;
  const isSmallMobile = window.innerWidth <= 480;
  
  // En dispositivos muy pequeños o en modo paisaje en móviles
  if (isSmallMobile || (isMobile && isLandscape)) {
    // Ajustar altura para mantener proporción y evitar que ocupe demasiado espacio
    let newHeight;
    
    if (isLandscape) {
      // En modo paisaje, limitar la altura para que no ocupe toda la pantalla
      newHeight = Math.min(220, window.innerHeight * 0.5);
    } else {
      // En modo retrato en móviles pequeños
      newHeight = Math.min(280, window.innerHeight * 0.35);
    }
    
    carousel.style.height = `${newHeight}px`;
    
    // Ajustar también el ancho en modo paisaje para mejor visualización
    if (isLandscape) {
      carousel.style.maxWidth = `${newHeight * 1.2}px`;
      carousel.style.margin = '0 auto';
    } else {
      carousel.style.maxWidth = '';
      carousel.style.margin = '';
    }
  } else {
    // Restablecer a valores predeterminados para otros tamaños
    carousel.style.height = '';
  }
}

// Función debounce para evitar múltiples llamadas durante el redimensionamiento
function debounce(func, wait) {
  let timeout;
  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}

// Función para manejar el redimensionamiento de la ventana
function handleResize() {
  optimizeImagesForMobile();
  adjustCarouselHeight();
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

  initializeApp();
  debugInfo();

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
