/* =========================================================

   BIRTHDAY WEBSITE - FINAL VERSION

   =========================================================

   Birthday:

   05 September 2026

   12:00 PM IST


   This version:

   - Uses fixed HTML message

   - Uses fixed birthday date/time

   - Live countdown every second

   - Uses website.mp3

   - No Creator Mode

   - No database

   - No Firebase

   ========================================================= */



/* =========================================================

   SHORTCUTS

   ========================================================= */


const $ = (selector) =>

  document.querySelector(selector);


const $$ = (selector) =>

  [...document.querySelectorAll(selector)];



/* =========================================================

   FIXED BIRTHDAY DATE & TIME

   ========================================================= */


/*

   05 September 2026

   12:00 PM

   India Standard Time (IST)

*/


const birthdayDate =

  new Date("2026-09-05T12:00:00+05:30");



/* =========================================================

   PRELOADER

   ========================================================= */


window.addEventListener("load", () => {


  setTimeout(() => {


    const preloader =

      $("#preloader");


    if (preloader) {

      preloader.style.display = "none";

    }


  }, 500);


});



/* =========================================================

   HERO PARTICLES

   ========================================================= */


const heroParticles =

  $("#heroParticles");


if (heroParticles) {


  for (let i = 0; i < 35; i++) {


    const particle =

      document.createElement("i");


    particle.className =

      "particle";


    particle.style.left =

      Math.random() * 100 + "%";


    particle.style.top =

      Math.random() * 100 + "%";


    particle.style.animationDelay =

      Math.random() * 6 + "s";


    heroParticles.appendChild(

      particle

    );

  }

}



/* =========================================================

   NAVIGATION

   ========================================================= */


const menuToggle =

  $(".menu-toggle");


const navLinks =

  $(".nav-links");



if (menuToggle && navLinks) {


  menuToggle.addEventListener(

    "click",

    () => {


      navLinks.classList.toggle(

        "open"

      );


    }

  );


}



$$(".nav-links a").forEach(

  (link) => {


    link.addEventListener(

      "click",

      () => {


        navLinks?.classList.remove(

          "open"

        );


      }

    );


  }

);



/* =========================================================

   PAGE TRANSITION

   ========================================================= */


function transitionTo(target) {


  const overlay =

    $("#pageTransition");



  if (overlay) {


    overlay.classList.add(

      "active"

    );


  }



  setTimeout(() => {


    const section =

      document.querySelector(target);


    if (section) {


      section.scrollIntoView({

        behavior: "auto",

        block: "start"

      });


    }


  }, 350);



  setTimeout(() => {


    overlay?.classList.remove(

      "active"

    );


  }, 800);


}



/* Navigation links */


$$(".nav-links a").forEach(

  (link) => {


    link.addEventListener(

      "click",

      (event) => {


        const target =

          link.getAttribute(

            "href"

          );



        if (

          target &&

          target.startsWith("#")

        ) {


          event.preventDefault();


          navLinks?.classList.remove(

            "open"

          );


          transitionTo(

            target

          );


        }


      }

    );


  }

);



/* Surprise button */


$("#openSurprise")?.addEventListener(

  "click",

  () => {


    transitionTo(

      "#birthday"

    );


  }

);



/* Replay button */


$("#replay")?.addEventListener(

  "click",

  () => {


    transitionTo(

      "#home"

    );


  }

);



/* =========================================================

   MODALS

   ========================================================= */


function openModal(id) {


  const modal =

    $("#" + id);


  if (modal) {


    modal.classList.add(

      "open"

    );


  }


}



function closeModal(id) {


  const modal =

    $("#" + id);


  if (modal) {


    modal.classList.remove(

      "open"

    );


  }


}



/* Close buttons */


$$("[data-close]").forEach(

  (button) => {


    button.addEventListener(

      "click",

      () => {


        closeModal(

          button.dataset.close

        );


      }

    );


  }

);



/* Close when clicking outside */


$$(".modal-backdrop").forEach(

  (backdrop) => {


    backdrop.addEventListener(

      "click",

      (event) => {


        if (

          event.target === backdrop

        ) {


          backdrop.classList.remove(

            "open"

          );


        }


      }

    );


  }

);



/* =========================================================

   LIVE BIRTHDAY COUNTDOWN

   ========================================================= */


function updateCountdown() {


  const countdown =

    $("#countdown");


  const title =

    $("#countTitle");



  if (!countdown) {

    return;

  }



  const now =

    new Date();



  const difference =

    birthdayDate.getTime()

    - now.getTime();



  const numbers =

    countdown.querySelectorAll(

      "strong"

    );



  /* -------------------------------------------------------

     BIRTHDAY HAS ARRIVED

     ------------------------------------------------------- */


  if (difference <= 0) {


    numbers.forEach(

      (element) => {


        element.textContent =

          "00";


      }

    );



    if (title) {


      title.textContent =

        "It's your special day! 🎂🎉";


    }



    return;

  }



  /* -------------------------------------------------------

     CALCULATE DAYS

     ------------------------------------------------------- */


  const days =

    Math.floor(

      difference /

      (1000 * 60 * 60 * 24)

    );



  /* -------------------------------------------------------

     CALCULATE HOURS

     ------------------------------------------------------- */


  const hours =

    Math.floor(

      (

        difference /

        (1000 * 60 * 60)

      ) % 24

    );



  /* -------------------------------------------------------

     CALCULATE MINUTES

     ------------------------------------------------------- */


  const minutes =

    Math.floor(

      (

        difference /

        (1000 * 60)

      ) % 60

    );



  /* -------------------------------------------------------

     CALCULATE SECONDS

     ------------------------------------------------------- */


  const seconds =

    Math.floor(

      (

        difference /

        1000

      ) % 60

    );



  /* -------------------------------------------------------

     DISPLAY

     ------------------------------------------------------- */


  if (numbers.length >= 4) {


    const newVals = [

      String(days).padStart(2, "0"),

      String(hours).padStart(2, "0"),

      String(minutes).padStart(2, "0"),

      String(seconds).padStart(2, "0")

    ];


    numbers.forEach((elem, idx) => {

      if (elem.textContent !== newVals[idx]) {

        elem.textContent = newVals[idx];

        elem.classList.remove("digit-pop");

        void elem.offsetWidth;

        elem.classList.add("digit-pop");

      }

    });


  }



  if (title) {


    title.textContent =

      "Your next birthday";


  }


}



/* Start immediately */


updateCountdown();



/* Update every second */


setInterval(

  updateCountdown,

  1000

);



/* =========================================================

   BIRTHDAY WISH / CAKE

   ========================================================= */


$("#wishBtn")?.addEventListener(

  "click",

  () => {


    const candleLine =

      $(".candle-line");



    if (candleLine) {


      candleLine.style.opacity =

        "0";


    }



    $$(".flame").forEach(

      (flame) => {


        flame.style.display =

          "none";


      }

    );



    $$(".candle-smoke").forEach((smoke) => {

      smoke.classList.remove("active");

      void smoke.offsetWidth;

      smoke.classList.add("active");

    });


    const result =

      $("#wishResult");



    if (result) {


      result.textContent =

        "May all your wishes come true! ✨";


      result.classList.remove("glowing");

      void result.offsetWidth;

      result.classList.add("glowing");


    }


    launchCelebration(window.innerWidth / 2, window.innerHeight / 2, 75);

    if (window.triggerFirework) {

      window.triggerFirework(window.innerWidth * 0.25, window.innerHeight * 0.35, 65);

      window.triggerFirework(window.innerWidth * 0.5, window.innerHeight * 0.22, 80);

      window.triggerFirework(window.innerWidth * 0.75, window.innerHeight * 0.35, 65);

      setTimeout(() => {

        window.triggerFirework(window.innerWidth * 0.35, window.innerHeight * 0.45, 55);

        window.triggerFirework(window.innerWidth * 0.65, window.innerHeight * 0.45, 55);

      }, 380);

    }



    /* Confetti */


    for (

      let i = 0;

      i < 35;

      i++

    ) {


      const confetti =

        document.createElement(

          "span"

        );



      const colors = [

        "#ff4f91",

        "#ffd6e7",

        "#ffffff",

        "#c9185b"

      ];



      confetti.style.cssText = `

        position: fixed;

        z-index: 180;

        left: ${Math.random() * 100}%;

        top: -10px;

        width: 7px;

        height: 12px;

        background: ${

          colors[

            i % colors.length

          ]

        };

        border-radius: 3px;

        animation:

          birthdayConfetti

          ${2 + Math.random() * 2}s

          linear forwards;

      `;



      document.body.appendChild(

        confetti

      );



      setTimeout(

        () => {

          confetti.remove();

        },

        4500

      );


    }



    showToast(

      "Wish made ✨"

    );


  }

);



/* Confetti animation */


const confettiStyle =

  document.createElement(

    "style"

  );



confettiStyle.textContent = `

@keyframes birthdayConfetti {


  to {


    transform:

      translateY(110vh)

      rotate(720deg);


    opacity: 0;


  }


}

`;



document.head.appendChild(

  confettiStyle

);



/* =========================================================

   MUSIC

   ========================================================= */


const audio =

  $("#audio");


const playButton =

  $("#playBtn");


const record =

  $(".record");


const musicPrompt =

  $("#musicStartPrompt");



/*

   Your MP3 file is in the

   same folder as index.html.

*/


const MUSIC_FILE =

  "website.mp3";



/* Load music */


if (audio) {


  audio.src =

    MUSIC_FILE;


  audio.load();


  audio.volume =

    0.58;


}



/* =========================================================

   MUSIC UI

   ========================================================= */


function updateMusicUI() {


  if (!audio) {

    return;

  }



  const isPlaying =

    !audio.paused;



  if (playButton) {


    playButton.textContent =

      isPlaying

        ? "Ⅱ"

        : "▶";


  }



  if (record) {

    record.style.animationPlayState =

      isPlaying

        ? "running"

        : "paused";

  }


  const equalizer = $("#equalizer");

  if (equalizer) {

    equalizer.classList.toggle("playing", isPlaying);

  }


  const musicFloat = $("#musicFloat");

  if (musicFloat) {

    musicFloat.classList.toggle("playing", isPlaying);

  }


  if (isPlaying) {

    startFloatingMusicNotes();

  }

}



/* =========================================================

   START MUSIC

   ========================================================= */


async function startMusic() {


  if (!audio) {

    return;

  }



  try {


    await audio.play();


    updateMusicUI();


  } catch (error) {


    /*

      Mobile browsers may block

      automatic playback.


      Music will start after

      the user touches the page.

    */


    console.log(

      "Waiting for user interaction for music."

    );


  }


}



/* =========================================================

   USER INTERACTION FOR MUSIC

   ========================================================= */


let musicAttempted =

  false;



function tryStartMusic() {


  if (musicAttempted) {

    return;

  }



  musicAttempted =

    true;



  startMusic();


}



[

  "pointerdown",

  "touchstart",

  "click",

  "keydown"

].forEach(

  (eventName) => {


    document.addEventListener(

      eventName,

      (event) => {


        if (

          eventName === "keydown" &&

          event.key !== "Enter" &&

          event.key !== " "

        ) {


          return;


        }



        tryStartMusic();


      },

      {

        passive:

          eventName !== "keydown"

      }

    );


  }

);



/* Music prompt */


musicPrompt?.addEventListener(

  "click",

  () => {


    tryStartMusic();


  }

);



/* =========================================================

   PLAY / PAUSE BUTTON

   ========================================================= */


playButton?.addEventListener(

  "click",

  (event) => {


    event.stopPropagation();



    if (!audio) {

      return;

    }



    if (audio.paused) {


      audio

        .play()

        .then(() => {


          updateMusicUI();


        })

        .catch(() => {


          showToast(

            "Tap the page to start music 🎵"

          );


        });


    } else {


      audio.pause();


      updateMusicUI();


    }


  }

);



/* =========================================================

   MUSIC PROGRESS

   ========================================================= */


audio?.addEventListener(

  "timeupdate",

  () => {


    if (

      audio.duration &&

      $("#progressBar")

    ) {


      const progress =

        (

          audio.currentTime /

          audio.duration

        ) * 100;



      $("#progressBar").style.width =

        progress + "%";


    }


  }

);



/* =========================================================

   MUTE

   ========================================================= */


$("#muteBtn")?.addEventListener(

  "click",

  (event) => {


    event.stopPropagation();



    if (!audio) {

      return;

    }



    audio.muted =

      !audio.muted;



    if (

      !audio.muted &&

      audio.paused

    ) {


      audio

        .play()

        .catch(() => {});


    }



    updateMusicUI();


  }

);



/* =========================================================

   PHOTO DISPLAY

   ========================================================= */


$("#photoInput")?.addEventListener(

  "change",

  (event) => {


    const files =

      [...event.target.files];



    if (!files.length) {

      return;

    }



    const universe =

      $("#universe");


    const gallery =

      $("#gallery");



    universe?.classList.add(

      "hidden"

    );



    gallery?.classList.remove(

      "hidden"

    );



    if (gallery) {


      gallery.innerHTML =

        "";


    }



    files.forEach(

      (file) => {


        const image =

          document.createElement(

            "img"

          );



        image.alt =

          "Birthday memory";



        image.src =

          URL.createObjectURL(

            file

          );



        gallery?.appendChild(

          image

        );


      }

    );



    showToast(

      files.length +

      " photo" +

      (

        files.length > 1

          ? "s"

          : ""

      ) +

      " added 📸"

    );



    event.target.value =

      "";


  }

);



/* =========================================================

   WISH WALL

   ========================================================= */


function escapeHtml(value) {


  return String(value).replace(

    /[&<>"']/g,

    (character) => {


      return {

        "&": "&amp;",

        "<": "&lt;",

        ">": "&gt;",

        '"': "&quot;",

        "'": "&#039;"

      }[character];


    }

  );


}



function renderWishes() {


  const wall =

    $("#wishWall");



  if (!wall) {

    return;

  }



  let wishes = [];



  try {


    wishes =

      JSON.parse(

        localStorage.getItem(

          "wishWall"

        ) || "[]"

      );


  } catch {


    wishes =

      [];


  }



  wall.innerHTML =

    wishes

      .map(

        (wish) => {


          return `

            <span class="wish-note">

              ${escapeHtml(wish)}

            </span>

          `;


        }

      )

      .join("");


}



$("#addWish")?.addEventListener(

  "click",

  () => {


    const input =

      $("#wishInput");



    const value =

      input?.value.trim();



    if (!value) {

      return;

    }



    let wishes = [];



    try {


      wishes =

        JSON.parse(

          localStorage.getItem(

            "wishWall"

          ) || "[]"

        );


    } catch {


      wishes =

        [];


    }



    wishes.push(

      value

    );



    localStorage.setItem(

      "wishWall",

      JSON.stringify(

        wishes

      )

    );



    if (input) {


      input.value =

        "";


    }



    renderWishes();


  }

);



renderWishes();



/* =========================================================

   DARK / LIGHT THEME

   ========================================================= */


function applyTheme() {


  const dark =

    localStorage.getItem(

      "deepikaTheme"

    ) === "dark";



  document.body.classList.toggle(

    "dark",

    dark

  );



  const themeButton =

    $("#themeToggle");



  if (themeButton) {


    themeButton.textContent =

      dark

        ? "☀"

        : "☾";


  }


}



$("#themeToggle")?.addEventListener(

  "click",

  () => {


    const dark =

      !document.body.classList.contains(

        "dark"

      );



    localStorage.setItem(

      "deepikaTheme",

      dark

        ? "dark"

        : "light"

    );



    applyTheme();


  }

);



applyTheme();



/* =========================================================

   TOAST

   ========================================================= */


function showToast(text) {


  const toast =

    $("#toast");



  if (!toast) {

    return;

  }



  toast.textContent =

    text;



  toast.classList.add(

    "show"

  );



  clearTimeout(

    window.toastTimer

  );



  window.toastTimer =

    setTimeout(

      () => {


        toast.classList.remove(

          "show"

        );


      },

      2200

    );


}



/* =========================================================

   FINAL INITIALIZATION

   ========================================================= */


document.addEventListener(

  "DOMContentLoaded",

  () => {


    updateCountdown();


    updateMusicUI();


    renderWishes();


    applyTheme();


    initVisualEFX();


  }

);



/* =========================================================

   CELEBRATION CONFETTI CANNON (Hearts, Stars & Ribbons)

   ========================================================= */


function launchCelebration(originX, originY, count = 60) {

  const shapes = ["square", "circle", "heart", "star", "ribbon"];

  const colors = ["#ff4f91", "#ffd6e7", "#ffffff", "#c9185b", "#ffd34e", "#ff85b3", "#ffe699", "#a855f7"];

  const startX = originX !== undefined ? originX : window.innerWidth / 2;

  const startY = originY !== undefined ? originY : window.innerHeight / 2;


  for (let i = 0; i < count; i++) {

    const el = document.createElement("span");

    const shape = shapes[Math.floor(Math.random() * shapes.length)];

    const color = colors[Math.floor(Math.random() * colors.length)];

    const angle = (Math.random() - 0.5) * Math.PI * 1.8 - Math.PI / 2;

    const velocity = Math.random() * 520 + 220;

    const endX = (Math.cos(angle) * velocity) + (Math.random() - 0.5) * 140;

    const endY = (Math.sin(angle) * velocity) + Math.random() * 380 + 260;

    const rotation = Math.random() * 900 - 450;

    const duration = 2.4 + Math.random() * 1.8;


    el.className = "celebration-confetti-particle";

    el.style.cssText = `

      position: fixed;

      z-index: 185;

      left: ${startX}px;

      top: ${startY}px;

      pointer-events: none;

      font-size: ${shape === "heart" || shape === "star" ? "16px" : "11px"};

      color: ${color};

      transition: transform ${duration}s cubic-bezier(0.18, 0.89, 0.32, 1.28), opacity ${duration}s ease-out;

      transform: translate(0, 0) rotate(0deg) scale(0);

      opacity: 1;

      filter: drop-shadow(0 2px 6px rgba(255, 79, 145, 0.4));

    `;


    if (shape === "heart") {

      el.textContent = "♥";

    } else if (shape === "star") {

      el.textContent = "★";

    } else if (shape === "ribbon") {

      el.style.width = "4.5px";

      el.style.height = "18px";

      el.style.backgroundColor = color;

      el.style.borderRadius = "3px";

    } else {

      el.style.width = "9px";

      el.style.height = "9px";

      el.style.backgroundColor = color;

      el.style.borderRadius = shape === "circle" ? "50%" : "2px";

    }


    document.body.appendChild(el);


    requestAnimationFrame(() => {

      el.style.transform = `translate(${endX}px, ${endY}px) rotate(${rotation}deg) scale(${Math.random() * 0.7 + 0.8})`;

      setTimeout(() => {

        el.style.opacity = "0";

      }, duration * 680);

    });


    setTimeout(() => {

      el.remove();

    }, duration * 1000 + 100);

  }

}



/* =========================================================

   FLOATING MUSICAL NOTES GENERATOR

   ========================================================= */


let musicNotesInterval = null;

function startFloatingMusicNotes() {

  if (musicNotesInterval) return;

  const container = document.getElementById("recordContainer");

  if (!container) return;


  const notes = ["♪", "♫", "♬", "♩", "✦", "🎵", "🎼"];

  musicNotesInterval = setInterval(() => {

    if (!audio || audio.paused) {

      clearInterval(musicNotesInterval);

      musicNotesInterval = null;

      return;

    }


    const note = document.createElement("span");

    note.className = "music-note";

    note.textContent = notes[Math.floor(Math.random() * notes.length)];

    const dx = (Math.random() - 0.5) * 100;

    note.style.setProperty("--dx", dx + "px");

    note.style.left = (container.offsetWidth / 2 - 12 + (Math.random() - 0.5) * 35) + "px";

    note.style.top = (container.offsetHeight / 2 - 12) + "px";


    container.appendChild(note);

    setTimeout(() => note.remove(), 2800);

  }, 600);

}



/* =========================================================

   GRAND CELEBRATION ENGINE: PETALS, FIREWORKS & SPARKLES

   ========================================================= */


(function initGrandCelebrationEngine() {

  const canvas = document.getElementById("sparkleCanvas");

  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  let width = (canvas.width = window.innerWidth);

  let height = (canvas.height = window.innerHeight);


  window.addEventListener("resize", () => {

    width = canvas.width = window.innerWidth;

    height = canvas.height = window.innerHeight;

  });


  const sparkles = [];

  const fireworks = [];

  const petals = [];

  const ripples = [];


  const sparkColors = [

    { r: 255, g: 79, b: 145 },   // Hot Pink

    { r: 255, g: 126, b: 179 },  // Rose

    { r: 255, g: 211, b: 78 },   // Gold

    { r: 255, g: 235, b: 140 },  // Champagne

    { r: 255, g: 255, b: 255 },  // Pure White

    { r: 201, g: 24, b: 91 },    // Deep Magenta

    { r: 243, g: 156, b: 255 }   // Lavender

  ];


  // 1. Falling Sakura & Rose Petals

  for (let i = 0; i < 28; i++) {

    petals.push({

      x: Math.random() * width,

      y: Math.random() * height,

      size: Math.random() * 8 + 6,

      speedY: Math.random() * 0.9 + 0.5,

      speedX: Math.random() * 0.6 - 0.3,

      sway: Math.random() * Math.PI * 2,

      swaySpeed: Math.random() * 0.02 + 0.01,

      rotation: Math.random() * Math.PI * 2,

      rotSpeed: Math.random() * 0.02 - 0.01,

      color: Math.random() > 0.4 ? "rgba(255, 182, 213, " : "rgba(255, 140, 185, ",

      opacity: Math.random() * 0.45 + 0.35

    });

  }


  // 2. Floating 3D Helium Balloons in Background

  const bgBalloons = [];

  const balloonHues = [

    { fill: "rgba(255, 126, 179, 0.38)", rim: "rgba(255, 79, 145, 0.65)" },

    { fill: "rgba(255, 211, 78, 0.35)", rim: "rgba(255, 195, 30, 0.6)" },

    { fill: "rgba(216, 155, 255, 0.36)", rim: "rgba(180, 100, 255, 0.65)" },

    { fill: "rgba(255, 182, 213, 0.4)", rim: "rgba(255, 120, 170, 0.7)" },

    { fill: "rgba(165, 243, 252, 0.35)", rim: "rgba(56, 189, 248, 0.6)" }

  ];


  for (let i = 0; i < 8; i++) {

    bgBalloons.push({

      x: Math.random() * width,

      y: height + Math.random() * height,

      rx: Math.random() * 12 + 16,

      ry: Math.random() * 16 + 22,

      speedY: Math.random() * 0.5 + 0.28,

      sway: Math.random() * Math.PI * 2,

      swaySpeed: Math.random() * 0.012 + 0.006,

      hue: balloonHues[i % balloonHues.length]

    });

  }


  function drawBalloon(b) {

    ctx.save();

    ctx.translate(b.x, b.y);


    ctx.beginPath();

    ctx.moveTo(0, b.ry);

    ctx.quadraticCurveTo(Math.sin(b.sway * 2) * 6, b.ry + 18, Math.cos(b.sway) * 4, b.ry + 38);

    ctx.strokeStyle = "rgba(255, 255, 255, 0.3)";

    ctx.lineWidth = 1;

    ctx.stroke();


    ctx.beginPath();

    ctx.ellipse(0, 0, b.rx, b.ry, 0, 0, Math.PI * 2);

    ctx.fillStyle = b.hue.fill;

    ctx.strokeStyle = b.hue.rim;

    ctx.lineWidth = 1.2;

    ctx.fill();

    ctx.stroke();


    ctx.beginPath();

    ctx.ellipse(-b.rx * 0.35, -b.ry * 0.35, b.rx * 0.2, b.ry * 0.32, -Math.PI / 4, 0, Math.PI * 2);

    ctx.fillStyle = "rgba(255, 255, 255, 0.5)";

    ctx.fill();


    ctx.restore();

  }


  // 3. Ambient Floating Bokeh & Stardust

  const ambientStars = [];

  for (let i = 0; i < 45; i++) {

    ambientStars.push({

      x: Math.random() * width,

      y: Math.random() * height,

      size: Math.random() * 2.5 + 1,

      speedY: -(Math.random() * 0.45 + 0.2),

      speedX: (Math.random() - 0.5) * 0.3,

      alpha: Math.random() * 0.7 + 0.2,

      pulseSpeed: Math.random() * 0.04 + 0.015,

      c: sparkColors[Math.floor(Math.random() * sparkColors.length)]

    });

  }


  // Helper: 4-Point Twinkle Star

  function drawStar(cx, cy, spikes, outerRadius, innerRadius, colorStr) {

    let rot = (Math.PI / 2) * 3;

    let x = cx;

    let y = cy;

    const step = Math.PI / spikes;


    ctx.save();

    ctx.beginPath();

    ctx.moveTo(cx, cy - outerRadius);

    for (let i = 0; i < spikes; i++) {

      x = cx + Math.cos(rot) * outerRadius;

      y = cy + Math.sin(rot) * outerRadius;

      ctx.lineTo(x, y);

      rot += step;


      x = cx + Math.cos(rot) * innerRadius;

      y = cy + Math.sin(rot) * innerRadius;

      ctx.lineTo(x, y);

      rot += step;

    }

    ctx.lineTo(cx, cy - outerRadius);

    ctx.closePath();

    ctx.fillStyle = colorStr;

    ctx.shadowColor = colorStr;

    ctx.shadowBlur = 8;

    ctx.fill();

    ctx.restore();

  }


  // Helper: Draw Petal

  function drawPetal(p) {

    ctx.save();

    ctx.translate(p.x, p.y);

    ctx.rotate(p.rotation);

    ctx.scale(Math.cos(p.sway), 1);

    ctx.beginPath();

    ctx.moveTo(0, 0);

    ctx.bezierCurveTo(p.size / 2, -p.size, p.size, -p.size / 2, 0, p.size);

    ctx.bezierCurveTo(-p.size, -p.size / 2, -p.size / 2, -p.size, 0, 0);

    ctx.fillStyle = p.color + p.opacity + ")";

    ctx.shadowColor = p.color + "0.3)";

    ctx.shadowBlur = 4;

    ctx.fill();

    ctx.restore();

  }


  // Helper: Cursor Sparkles

  function addSparkle(x, y, count = 3) {

    for (let i = 0; i < count; i++) {

      const angle = Math.random() * Math.PI * 2;

      const speed = Math.random() * 3 + 1;

      const c = sparkColors[Math.floor(Math.random() * sparkColors.length)];

      sparkles.push({

        x: x + (Math.random() - 0.5) * 12,

        y: y + (Math.random() - 0.5) * 12,

        vx: Math.cos(angle) * speed,

        vy: Math.sin(angle) * speed - 0.7,

        size: Math.random() * 4.5 + 2,

        life: 1,

        decay: Math.random() * 0.025 + 0.015,

        c: c,

        isStar: Math.random() > 0.35

      });

    }

  }


  // Helper: Fireworks Explosion

  window.triggerFirework = function(targetX, targetY, count = 55) {

    const burstColors = [

      sparkColors[Math.floor(Math.random() * sparkColors.length)],

      sparkColors[Math.floor(Math.random() * sparkColors.length)]

    ];

    for (let i = 0; i < count; i++) {

      const angle = Math.random() * Math.PI * 2;

      const speed = Math.random() * 6.5 + 2;

      const c = burstColors[Math.floor(Math.random() * burstColors.length)];

      fireworks.push({

        x: targetX,

        y: targetY,

        vx: Math.cos(angle) * speed,

        vy: Math.sin(angle) * speed - 1,

        size: Math.random() * 4 + 2,

        life: 1,

        decay: Math.random() * 0.018 + 0.012,

        c: c

      });

    }

  };


  // Helper: Click Ripple

  function addRipple(x, y) {

    ripples.push({

      x: x,

      y: y,

      radius: 5,

      maxRadius: 70,

      alpha: 0.7

    });

  }


  // Pointer Movement

  let lastX = 0, lastY = 0, moved = false;

  window.addEventListener("pointermove", (e) => {

    const dist = Math.hypot(e.clientX - lastX, e.clientY - lastY);

    if (dist > 7 || !moved) {

      addSparkle(e.clientX, e.clientY, 2);

      lastX = e.clientX;

      lastY = e.clientY;

      moved = true;

    }

  }, { passive: true });


  window.addEventListener("touchmove", (e) => {

    if (e.touches && e.touches.length > 0) {

      addSparkle(e.touches[0].clientX, e.touches[0].clientY, 2);

    }

  }, { passive: true });


  // Click / Tap burst anywhere on page!

  window.addEventListener("click", (e) => {

    addSparkle(e.clientX, e.clientY, 16);

    addRipple(e.clientX, e.clientY);

    triggerMiniEmojiBurst(e.clientX, e.clientY);

  });


  function triggerMiniEmojiBurst(x, y) {

    const emojis = ["💖", "✨", "🌸", "💕", "★", "🎀"];

    for (let i = 0; i < 4; i++) {

      const em = document.createElement("span");

      em.textContent = emojis[Math.floor(Math.random() * emojis.length)];

      const angle = (Math.random() - 0.5) * Math.PI * 1.5 - Math.PI / 2;

      const dist = Math.random() * 90 + 40;

      const endX = Math.cos(angle) * dist;

      const endY = Math.sin(angle) * dist - 25;

      em.style.cssText = `

        position: fixed;

        left: ${x}px;

        top: ${y}px;

        z-index: 188;

        pointer-events: none;

        font-size: ${Math.random() * 8 + 14}px;

        transition: transform 1.2s cubic-bezier(0.18, 0.89, 0.32, 1.28), opacity 1.2s ease-out;

        transform: translate(0, 0) scale(0.5);

        opacity: 1;

      `;

      document.body.appendChild(em);

      requestAnimationFrame(() => {

        em.style.transform = `translate(${endX}px, ${endY}px) scale(${Math.random() * 0.4 + 0.9})`;

        setTimeout(() => em.style.opacity = "0", 600);

      });

      setTimeout(() => em.remove(), 1300);

    }

  }


  // Main Canvas Animation Loop

  function render() {

    ctx.clearRect(0, 0, width, height);


    // 0. Render & Update Background Floating Balloons

    for (let i = 0; i < bgBalloons.length; i++) {

      const b = bgBalloons[i];

      b.y -= b.speedY;

      b.sway += b.swaySpeed;

      b.x += Math.sin(b.sway) * 0.7;


      if (b.y < -70) {

        b.y = height + 70;

        b.x = Math.random() * width;

      }


      drawBalloon(b);

    }


    // 1. Render & Update Petals

    for (let i = 0; i < petals.length; i++) {

      const p = petals[i];

      p.y += p.speedY;

      p.sway += p.swaySpeed;

      p.x += p.speedX + Math.sin(p.sway) * 0.8;

      p.rotation += p.rotSpeed;


      if (p.y > height + 20) {

        p.y = -20;

        p.x = Math.random() * width;

      }

      if (p.x < -20) p.x = width + 20;

      if (p.x > width + 20) p.x = -20;


      drawPetal(p);

    }


    // 2. Render & Update Ambient Stars

    for (let i = 0; i < ambientStars.length; i++) {

      const s = ambientStars[i];

      s.y += s.speedY;

      s.x += s.speedX;

      s.alpha += Math.sin(Date.now() * 0.002 + i) * s.pulseSpeed;

      if (s.alpha > 0.85) s.alpha = 0.85;

      if (s.alpha < 0.15) s.alpha = 0.15;


      if (s.y < -15) {

        s.y = height + 15;

        s.x = Math.random() * width;

      }

      if (s.x < -15) s.x = width + 15;

      if (s.x > width + 15) s.x = -15;


      ctx.save();

      ctx.beginPath();

      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);

      ctx.fillStyle = `rgba(${s.c.r}, ${s.c.g}, ${s.c.b}, ${s.alpha})`;

      ctx.shadowColor = `rgba(${s.c.r}, ${s.c.g}, ${s.c.b}, 0.7)`;

      ctx.shadowBlur = 6;

      ctx.fill();

      ctx.restore();

    }


    // 3. Render & Update Ripples

    for (let i = ripples.length - 1; i >= 0; i--) {

      const r = ripples[i];

      r.radius += 2.5;

      r.alpha -= 0.025;

      if (r.alpha <= 0 || r.radius >= r.maxRadius) {

        ripples.splice(i, 1);

        continue;

      }

      ctx.save();

      ctx.beginPath();

      ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);

      ctx.strokeStyle = `rgba(255, 79, 145, ${r.alpha})`;

      ctx.lineWidth = 2;

      ctx.stroke();

      ctx.restore();

    }


    // 4. Render & Update Interactive Sparkles

    for (let i = sparkles.length - 1; i >= 0; i--) {

      const sp = sparkles[i];

      sp.x += sp.vx;

      sp.y += sp.vy;

      sp.vy += 0.05;

      sp.life -= sp.decay;


      if (sp.life <= 0) {

        sparkles.splice(i, 1);

        continue;

      }


      const colorStr = `rgba(${sp.c.r}, ${sp.c.g}, ${sp.c.b}, ${sp.life})`;

      if (sp.isStar) {

        drawStar(sp.x, sp.y, 4, sp.size * 1.6, sp.size * 0.5, colorStr);

      } else {

        ctx.save();

        ctx.beginPath();

        ctx.arc(sp.x, sp.y, sp.size * sp.life, 0, Math.PI * 2);

        ctx.fillStyle = colorStr;

        ctx.shadowColor = `rgba(${sp.c.r}, ${sp.c.g}, ${sp.c.b}, 0.8)`;

        ctx.shadowBlur = 8;

        ctx.fill();

        ctx.restore();

      }

    }


    // 5. Render & Update Fireworks

    for (let i = fireworks.length - 1; i >= 0; i--) {

      const fw = fireworks[i];

      fw.x += fw.vx;

      fw.y += fw.vy;

      fw.vy += 0.08;

      fw.vx *= 0.98;

      fw.vy *= 0.98;

      fw.life -= fw.decay;


      if (fw.life <= 0) {

        fireworks.splice(i, 1);

        continue;

      }


      const col = `rgba(${fw.c.r}, ${fw.c.g}, ${fw.c.b}, ${fw.life})`;

      drawStar(fw.x, fw.y, 4, fw.size * fw.life, fw.size * 0.3 * fw.life, col);

    }


    requestAnimationFrame(render);

  }

  requestAnimationFrame(render);


  window.burstSparklesAt = function(x, y, count = 25) {

    addSparkle(x, y, count);

  };

})();



/* =========================================================

   INITIALIZE EXTRA VISUAL EFX & EVENT LISTENERS

   ========================================================= */


function initVisualEFX() {

  // 3D Tilt on Wish Cards

  $$(".wish-grid article").forEach((card) => {

    card.addEventListener("mousemove", (e) => {

      const rect = card.getBoundingClientRect();

      const x = e.clientX - rect.left;

      const y = e.clientY - rect.top;

      card.style.setProperty("--mouse-x", `${x}px`);

      card.style.setProperty("--mouse-y", `${y}px`);


      const centerX = rect.width / 2;

      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -8;

      const rotateY = ((x - centerX) / centerX) * 8;

      card.style.transform = `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;

    });


    card.addEventListener("mouseleave", () => {

      card.style.transform = "";

    });

  });


  // Gift Clicks

  $$(".gift").forEach((gift) => {

    gift.addEventListener("click", (e) => {

      e.stopPropagation();

      const rect = gift.getBoundingClientRect();

      launchCelebration(rect.left + rect.width / 2, rect.top + rect.height / 2, 40);

      if (window.triggerFirework) {

        window.triggerFirework(rect.left + rect.width / 2, rect.top + rect.height / 2, 45);

      }

    });

  });


  // Cake Emoji in Hero click

  $(".hero h1 b")?.addEventListener("click", (e) => {

    e.stopPropagation();

    const rect = e.target.getBoundingClientRect();

    launchCelebration(rect.left + rect.width / 2, rect.top + rect.height / 2, 50);

    if (window.triggerFirework) {

      window.triggerFirework(rect.left + rect.width / 2, rect.top + rect.height / 2, 55);

    }

  });


  // Open Surprise & Replay buttons extra sparkle

  $("#openSurprise")?.addEventListener("click", (e) => {

    const rect = e.target.getBoundingClientRect();

    launchCelebration(rect.left + rect.width / 2, rect.top + rect.height / 2, 50);

    if (window.triggerFirework) {

      window.triggerFirework(rect.left + rect.width / 2, rect.top + rect.height / 2, 60);

    }

  });


  $("#replay")?.addEventListener("click", (e) => {

    const rect = e.target.getBoundingClientRect();

    launchCelebration(rect.left + rect.width / 2, rect.top + rect.height / 2, 50);

    if (window.triggerFirework) {

      window.triggerFirework(rect.left + rect.width / 2, rect.top + rect.height / 2, 60);

    }

  });


  // Wax Seal click celebration

  $(".seal")?.addEventListener("click", (e) => {

    e.stopPropagation();

    const rect = e.target.getBoundingClientRect();

    launchCelebration(rect.left + rect.width / 2, rect.top + rect.height / 2, 35);

  });


  // Scroll reveals (with 100% universal mobile fallback)

  const targets = $$(".section, .countdown-card, .letter-card, .wish-cake-card, .wish-grid article, .wish-wall-card, .music-card");

  if (!("IntersectionObserver" in window)) {

    targets.forEach((el) => el.classList.add("revealed"));

  } else {

    const revealObserver = new IntersectionObserver(

      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target.classList.add("revealed");

          }

        });

      },

      { threshold: 0.1 }

    );

    targets.forEach((el) => {

      el.classList.add("reveal-fade-up");

      revealObserver.observe(el);

    });

  }


  // Scroll Progress Bar Update

  window.addEventListener(

    "scroll",

    () => {

      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;

      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;

      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;

      const bar = document.getElementById("scrollProgressBar");

      if (bar) bar.style.width = scrolled + "%";

    },

    { passive: true }

  );

}


