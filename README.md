# Invitación XV Años - Karoline Zamara Vélez Sierra

> Invitación digital interactiva inspirada en "La Bella y la Bestia" para la celebración de los XV años de Karoline Zamara Vélez Sierra.

## Descripción

Este proyecto es una invitación web elegante y mágica, diseñada para ofrecer una experiencia visual y emocional única a los invitados. Incluye animaciones, efectos especiales, carrusel de fotos, confirmación de asistencia vía WhatsApp y detalles del evento.

## Características principales

- Diseño responsivo y visualmente atractivo
- Animación de rosas cayendo al hacer scroll
- Carrusel de fotos de la quinceañera
- Confirmación de asistencia y declinación vía WhatsApp
- Ubicación del evento con acceso directo a Google Maps
- Efectos mágicos y detalles temáticos inspirados en "La Bella y la Bestia"
- Código optimizado para dispositivos móviles y escritorio

## Estructura del proyecto

```
📦invitation
 ┣ 📂.git
 ┃ ┣ 📂hooks
 ┃ ┃ ┣ 📜applypatch-msg.sample
 ┃ ┃ ┣ 📜commit-msg.sample
 ┃ ┃ ┣ 📜fsmonitor-watchman.sample
 ┃ ┃ ┣ 📜post-update.sample
 ┃ ┃ ┣ 📜pre-applypatch.sample
 ┃ ┃ ┣ 📜pre-commit.sample
 ┃ ┃ ┣ 📜pre-merge-commit.sample
 ┃ ┃ ┣ 📜pre-push.sample
 ┃ ┃ ┣ 📜pre-rebase.sample
 ┃ ┃ ┣ 📜pre-receive.sample
 ┃ ┃ ┣ 📜prepare-commit-msg.sample
 ┃ ┃ ┣ 📜push-to-checkout.sample
 ┃ ┃ ┣ 📜sendemail-validate.sample
 ┃ ┃ ┗ 📜update.sample
 ┃ ┣ 📂info
 ┃ ┃ ┗ 📜exclude
 ┃ ┣ 📂logs
 ┃ ┃ ┣ 📂refs
 ┃ ┃ ┃ ┣ 📂heads
 ┃ ┃ ┃ ┃ ┗ 📜main
 ┃ ┃ ┃ ┗ 📂remotes
 ┃ ┃ ┃ ┃ ┗ 📂origin
 ┃ ┃ ┃ ┃ ┃ ┗ 📜main
 ┃ ┃ ┗ 📜HEAD
 ┃ ┣ 📂objects
 ┃ ┃ ┣ 📂52
 ┃ ┃ ┃ ┗ 📜2e6e7d2fc24fb2f93748c2c7df55df16fe35e1
 ┃ ┃ ┣ 📂58
 ┃ ┃ ┃ ┗ 📜a1e5a70f5cb0e91d3d6903b952d81175ed1cd7
 ┃ ┃ ┣ 📂e7
 ┃ ┃ ┃ ┗ 📜953f5af89fb94cf981c8da6dab7eef30e007a0
 ┃ ┃ ┣ 📂info
 ┃ ┃ ┗ 📂pack
 ┃ ┣ 📂refs
 ┃ ┃ ┣ 📂heads
 ┃ ┃ ┃ ┗ 📜main
 ┃ ┃ ┣ 📂remotes
 ┃ ┃ ┃ ┗ 📂origin
 ┃ ┃ ┃ ┃ ┗ 📜main
 ┃ ┃ ┗ 📂tags
 ┃ ┣ 📜COMMIT_EDITMSG
 ┃ ┣ 📜config
 ┃ ┣ 📜description
 ┃ ┣ 📜HEAD
 ┃ ┗ 📜index
 ┣ 📂assets
 ┃ ┣ 📂css
 ┃ ┃ ┣ 📜animations.css
 ┃ ┃ ┣ 📜base.css
 ┃ ┃ ┣ 📜components.css
 ┃ ┃ ┣ 📜layout.css
 ┃ ┃ ┣ 📜responsive.css
 ┃ ┃ ┗ 📜variables.css
 ┃ ┣ 📂images
 ┃ ┃ ┣ 📜footer.png
 ┃ ┃ ┣ 📜header.png
 ┃ ┃ ┣ 📜img.png
 ┃ ┃ ┣ 📜img1.jpg
 ┃ ┃ ┣ 📜img10.jpg
 ┃ ┃ ┣ 📜img11.jpg
 ┃ ┃ ┣ 📜img12.jpg
 ┃ ┃ ┣ 📜img13.jpg
 ┃ ┃ ┣ 📜img14.jpg
 ┃ ┃ ┣ 📜img15.jpg
 ┃ ┃ ┣ 📜img16.jpg
 ┃ ┃ ┣ 📜img17.jpg
 ┃ ┃ ┣ 📜img18.jpg
 ┃ ┃ ┣ 📜img19.jpg
 ┃ ┃ ┣ 📜img2.jpg
 ┃ ┃ ┣ 📜img3.jpg
 ┃ ┃ ┣ 📜img4.jpg
 ┃ ┃ ┣ 📜img5.jpg
 ┃ ┃ ┣ 📜img6.jpg
 ┃ ┃ ┣ 📜img7.jpg
 ┃ ┃ ┣ 📜img8.jpg
 ┃ ┃ ┣ 📜img9.jpg
 ┃ ┃ ┣ 📜melody.jpg
 ┃ ┃ ┣ 📜portada.webp
 ┃ ┃ ┣ 📜portada1.webp
 ┃ ┃ ┣ 📜portada2.webp
 ┃ ┃ ┣ 📜rose.jpg
 ┃ ┃ ┗ 📜rose.png
 ┃ ┣ 📂js
 ┃ ┃ ┣ 📜roses.js
 ┃ ┃ ┗ 📜script.js
 ┃ ┣ 📂sounds
 ┃ ┃ ┗ 📜beauty-and-the-beast.mp3
 ┃ ┗ 📂svg
 ┃ ┃ ┣ 📜chip-happy.svg
 ┃ ┃ ┣ 📜chip-sad.svg
 ┃ ┃ ┣ 📜marco-bottom.svg
 ┃ ┃ ┗ 📜marco-top.svg
 ┣ 📜index.html
 ┗ 📜README.md
```

## Instalación y uso

1. Descarga o clona este repositorio.
2. Abre el archivo `index.html` en tu navegador web.
3. Personaliza imágenes, textos y detalles del evento según tus necesidades.

## Créditos

- Inspiración visual: "La Bella y la Bestia"
- Desarrollo: Coderlaraman

---

¡Gracias por ser parte de esta celebración mágica!

# invitation-15
