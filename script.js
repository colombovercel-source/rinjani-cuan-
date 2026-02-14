const BONUS_AMOUNT = 20000;
const CLAIM_INTERVAL = 24 * 60 * 60 * 1000;

const loginCard = document.getElementById("loginCard");
const dashboardCard = document.getElementById("dashboardCard");
const usernameInput = document.getElementById("usernameInput");
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const displayUsername = document.getElementById("displayUsername");
const balanceAmount = document.getElementById("balanceAmount");
const claimButton = document.getElementById("claimButton");
const statusMessage = document.getElementById("statusMessage");

let countdownInterval = null;

function getUserKey(username) {
    return `rinjani4d_${username}`;
}

function login() {
    const username = usernameInput.value.trim();
    if (!username) {
        alert("Username tidak boleh kosong!");
        return;
    }

    localStorage.setItem("activeUser", username);

    const userKey = getUserKey(username);
    if (!localStorage.getItem(userKey)) {
        localStorage.setItem(userKey, JSON.stringify({
            balance: 0,
            lastClaim: null
        }));
    }

    showDashboard();
}

function showDashboard() {
    const username = localStorage.getItem("activeUser");
    if (!username) return;

    loginCard.classList.add("hidden");
    dashboardCard.classList.remove("hidden");

    displayUsername.textContent = username;
    updateBalance();
    checkClaimStatus();
}

function updateBalance() {
    const username = localStorage.getItem("activeUser");
    const userData = JSON.parse(localStorage.getItem(getUserKey(username)));
    balanceAmount.textContent = "Rp " + userData.balance.toLocaleString();
}

function claimBonus() {
    const username = localStorage.getItem("activeUser");
    const userKey = getUserKey(username);
    const userData = JSON.parse(localStorage.getItem(userKey));
    const now = Date.now();

    if (userData.lastClaim && now - userData.lastClaim < CLAIM_INTERVAL) return;

    userData.balance += BONUS_AMOUNT;
    userData.lastClaim = now;

    localStorage.setItem(userKey, JSON.stringify(userData));

    updateBalance();
    checkClaimStatus();
    alert("Bonus Rp 20.000 berhasil diklaim!");
}

function checkClaimStatus() {
    const username = localStorage.getItem("activeUser");
    const userData = JSON.parse(localStorage.getItem(getUserKey(username)));
    const now = Date.now();

    if (!userData.lastClaim || now - userData.lastClaim >= CLAIM_INTERVAL) {
        statusMessage.textContent = "Bonus siap diklaim!";
        claimButton.disabled = false;
        return;
    }

    claimButton.disabled = true;
    const remaining = CLAIM_INTERVAL - (now - userData.lastClaim);
    startCountdown(remaining);
}

function startCountdown(time) {
    if (countdownInterval) clearInterval(countdownInterval);

    countdownInterval = setInterval(() => {
        if (time <= 0) {
            clearInterval(countdownInterval);
            checkClaimStatus();
            return;
        }

        const hours = Math.floor(time / 3600000);
        const minutes = Math.floor((time % 3600000) / 60000);
        const seconds = Math.floor((time % 60000) / 1000);

        statusMessage.textContent =
            `Tunggu ${hours}j ${minutes}m ${seconds}d untuk claim berikutnya`;

        time -= 1000;
    }, 1000);
}

function logout() {
    localStorage.removeItem("activeUser");
    location.reload();
}

loginBtn.addEventListener("click", login);
claimButton.addEventListener("click", claimBonus);
logoutBtn.addEventListener("click", logout);
window.addEventListener("load", showDashboard);

/* ===============================
   3D Animated Particle Background
=================================*/

const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.z = Math.random() * canvas.width;
    }

    move() {
        this.z -= 2;
        if (this.z <= 0) {
            this.z = canvas.width;
        }
    }

    draw() {
        const x = (this.x - canvas.width / 2) * (canvas.width / this.z) + canvas.width / 2;
        const y = (this.y - canvas.height / 2) * (canvas.width / this.z) + canvas.height / 2;
        const size = (1 - this.z / canvas.width) * 3;

        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = "cyan";
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    for (let i = 0; i < 200; i++) {
        particles.push(new Particle());
    }
}

function animate() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
        p.move();
        p.draw();
    });

    requestAnimationFrame(animate);
}

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
});

initParticles();
animate();
