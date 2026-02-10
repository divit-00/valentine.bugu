const startBtn = document.getElementById("startBtn");
const startScreen = document.getElementById("startScreen");
const scene = document.querySelector(".scene");

const storyEl = document.getElementById("story");
const memories = document.getElementById("memories");
const memoryImg = document.getElementById("memoryImg");
const caption = document.querySelector(".caption");

const proposal = document.getElementById("proposal");
const finalScene = document.getElementById("final");

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

const heartsBox = document.querySelector(".hearts");

const rain = document.getElementById("rain");
const thunder = document.getElementById("thunder");
const music = document.getElementById("music");

/* RAIN CANVAS */
const canvas = document.getElementById("rainCanvas");
const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;

let drops = Array.from({ length: 500 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    l: Math.random() * 20 + 10,
    s: Math.random() * 4 + 4
}));

function drawRain() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "rgba(255,255,255,0.35)";
    drops.forEach(d => {
        ctx.beginPath();
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x, d.y + d.l);
        ctx.stroke();
        d.y += d.s;
        if (d.y > canvas.height) {
            d.y = -20;
            d.x = Math.random() * canvas.width;
        }
    });
    requestAnimationFrame(drawRain);
}

/* STORY */
const story = [
    "It rained on nights I learned to be strong…",
    "Thunder taught my heart how to survive.",
    "I smiled, even when it hurt.",
    "Then you arrived…",
    "And storms felt quieter.",
    "Hope learned my name."
];

let line = 0, char = 0;
function typeStory() {
    if (char < story[line].length) {
        storyEl.textContent += story[line][char++];
        setTimeout(typeStory, 80);
    } else {
        setTimeout(() => {
            char = 0;
            line++;
            if (line < story.length) {
                storyEl.textContent = "";
                typeStory();
            } else {
                setTimeout(showMemories, 1400);
            }
        }, 1300);
    }
}

/* MEMORIES */
const images = ["memory1.jpg", "memory2.jpg", "memory3.jpg"];
const captions = [
    "That smile I never forgot.",
    "Some moments become forever.",
    "I found home in you."
];

let mi = 0;
function showMemories() {
    storyEl.classList.add("hidden");
    memories.classList.remove("hidden");

    setInterval(() => {
        mi = (mi + 1) % images.length;
        memoryImg.src = images[mi];
        caption.textContent = captions[mi];
    }, 2200);

    setTimeout(showProposal, 7000);
}

function showProposal() {
    memories.classList.add("hidden");
    proposal.classList.remove("hidden");
}

/* START */
startBtn.addEventListener("click", () => {
    startScreen.classList.add("hidden");
    scene.classList.remove("hidden");

    rain.volume = 0.4;
    rain.play();
    setTimeout(() => thunder.play(), 1200);

    drawRain();
    typeStory();
});

/* PROPOSAL */
let yesScale = 1;

yesBtn.addEventListener("click", () => {
    proposal.classList.add("hidden");
    finalScene.classList.remove("hidden");

    music.currentTime = 37;
    music.play();

    startHearts();
});

noBtn.addEventListener("click", () => {
    yesScale += 0.4;
    yesBtn.style.transform = `scale(${yesScale})`;
    moveNo();
});

noBtn.addEventListener("mouseover", moveNo);

function moveNo() {
    const x = Math.random() * 380 - 190;
    const y = Math.random() * 260 - 130;
    noBtn.style.transform = `translate(${x}px,${y}px)`;
}

/* HEARTS */
function startHearts() {
    setInterval(() => {
        const h = document.createElement("span");
        h.innerHTML = "❤️";
        h.style.left = Math.random() * 100 + "vw";
        heartsBox.appendChild(h);
        setTimeout(() => h.remove(), 7000);
    }, 200);
}
