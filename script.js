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

    numbers[0].textContent =
      String(days)
        .padStart(2, "0");


    numbers[1].textContent =
      String(hours)
        .padStart(2, "0");


    numbers[2].textContent =
      String(minutes)
        .padStart(2, "0");


    numbers[3].textContent =
      String(seconds)
        .padStart(2, "0");

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


    const result =
      $("#wishResult");


    if (result) {

      result.textContent =
        "May all your wishes come true! ✨";

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

  }
);
