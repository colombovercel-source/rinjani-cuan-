const BONUS_AMOUNT = 5000;
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

    if (username === "") {
        alert("Username tidak boleh kosong!");
        return;
    }

    localStorage.setItem("activeUser", username);

    const userKey = getUserKey(username);
    if (!localStorage.getItem(userKey)) {
        const userData = {
            balance: 0,
            lastClaim: null
        };
        localStorage.setItem(userKey, JSON.stringify(userData));
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
    const userKey = getUserKey(username);
    const userData = JSON.parse(localStorage.getItem(userKey));

    balanceAmount.textContent = "Rp " + userData.balance.toLocaleString();
}

function claimBonus() {
    const username = localStorage.getItem("activeUser");
    const userKey = getUserKey(username);
    const userData = JSON.parse(localStorage.getItem(userKey));
    const now = Date.now();

    if (userData.lastClaim && now - userData.lastClaim < CLAIM_INTERVAL) {
        return;
    }

    userData.balance += BONUS_AMOUNT;
    userData.lastClaim = now;

    localStorage.setItem(userKey, JSON.stringify(userData));

    updateBalance();
    checkClaimStatus();

    alert("Bonus berhasil diklaim!");
}

function checkClaimStatus() {
    const username = localStorage.getItem("activeUser");
    const userKey = getUserKey(username);
    const userData = JSON.parse(localStorage.getItem(userKey));
    const now = Date.now();

    if (!userData.lastClaim || now - userData.lastClaim >= CLAIM_INTERVAL) {
        statusMessage.textContent = "Bonus siap diklaim!";
        claimButton.disabled = false;
        claimButton.style.opacity = "1";
        if (countdownInterval) clearInterval(countdownInterval);
        return;
    }

    claimButton.disabled = true;
    claimButton.style.opacity = "0.6";

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

        const hours = Math.floor(time / (1000 * 60 * 60));
        const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((time % (1000 * 60)) / 1000);

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
