let answers = {};
let sections = document.querySelectorAll("section");
let index = 0;

function next() {
  sections[index].classList.add("hidden");
  index++;
  sections[index].classList.remove("hidden");
}

function saveAnswer(id) {
  answers[id] = document.getElementById(id).value;
  next();
}

function celebrate() {
    if (navigator.vibrate) {
  navigator.vibrate([120, 60, 120]);
}

  // Fill final question summary (still needed earlier)
  document.getElementById("a1").innerText = answers.q1;
  document.getElementById("a2").innerText = answers.q2;
  document.getElementById("a3").innerText = answers.q3;
  document.getElementById("a4").innerText = answers.q4;
  document.getElementById("a5").innerText = answers.q5;

  // Copy answers into celebration card
  document.getElementById("c1").innerText = answers.q1;
  document.getElementById("c2").innerText = answers.q2;
  document.getElementById("c3").innerText = answers.q3;
  document.getElementById("c4").innerText = answers.q4;
  document.getElementById("c5").innerText = answers.q5;

  // Move to celebration section
  next();

  // Show screenshot button after 5 seconds
  setTimeout(() => {
    document.getElementById("shotBtn").classList.remove("hidden");
  }, 5000);
}

function takeScreenshot() {
  heartsRunning = false; // pause hearts

  html2canvas(document.getElementById("finalCard")).then(canvas => {
    const imageData = canvas.toDataURL("image/png");

    // Download image
    const link = document.createElement("a");
    link.download = "our-valentine-moment.png";
    link.href = imageData;
    link.click();

    // WhatsApp message
    const message = encodeURIComponent(
      "I said yes 💖\nHere’s our little moment."
    );

    setTimeout(() => {
      window.open(`https://wa.me/?text=${message}`, "_blank");
    }, 800);
  });
}

/* Slower fading carousel */
let slides = document.querySelectorAll(".carousel img");
let current = 0;

setInterval(() => {
  slides[current].classList.remove("active");
  current = (current + 1) % slides.length;
  slides[current].classList.add("active");
}, 6000);

let heartsRunning = true;

function spawnHeart() {
  if (!heartsRunning) return;

  const heart = document.createElement("div");
  heart.className = "heart";
  heart.innerText = "💖";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = 20 + Math.random() * 20 + "px";

  document.getElementById("hearts").appendChild(heart);

  setTimeout(() => heart.remove(), 8000);
}

setInterval(spawnHeart, 700);

const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

musicBtn.addEventListener("click", () => {
  if (music.paused) {
    music.play();
    musicBtn.textContent = "⏸ Pause music";
  } else {
    music.pause();
    musicBtn.textContent = "▶ Play music";
  }
});

function fadeInMusic() {
  let vol = 0;
  music.volume = 0;
  music.play();
  const fade = setInterval(() => {
    if (vol < 0.5) { // max volume 50%
      vol += 0.01;
      music.volume = vol;
    } else {
      clearInterval(fade);
    }
  }, 100);
}
