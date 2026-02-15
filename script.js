const claimBtn = document.getElementById("claimBtn");
const userIdInput = document.getElementById("userId");
const historyBox = document.getElementById("history");

const popup = document.getElementById("popup");
const popupUser = document.getElementById("popupUser");
const popupAmount = document.getElementById("popupAmount");
const popupTime = document.getElementById("popupTime");
const popupBadge = document.getElementById("popupBadge");
const popupText = document.getElementById("popupText");

const STORAGE_KEY = "rinjani4d_claimed_ids";

/* ===== Local Storage Helpers ===== */
function getClaimedIds() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}

function saveClaimedId(id) {
  const claimed = getClaimedIds();
  claimed.push(id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(claimed));
}

/* ===== Mask & Bonus ===== */
function maskUser(id) {
  return id.slice(0, 2) + "***" + id.slice(-2);
}

function randomBonus() {
  const list = [50000, 100000, 150000, 200000, 300000];
  return "Rp " + list[Math.floor(Math.random() * list.length)].toLocaleString("id-ID");
}

/* ===== Dummy History ===== */
for (let i = 0; i < 12; i++) {
  const div = document.createElement("div");
  div.className = "history-item";
  div.textContent = `MBR***${10 + i} berhasil klaim bonus`;
  historyBox.appendChild(div);
}

/* ===== CLAIM BUTTON ===== */
claimBtn.onclick = () => {
  const id = userIdInput.value.trim();

  if (!id) {
    alert("User ID wajib diisi");
    return;
  }

  const claimedIds = getClaimedIds();

  /* ===== SUDAH PERNAH CLAIM ===== */
  if (claimedIds.includes(id)) {
    popupBadge.textContent = "SUDAH PERNAH KLAIM";
    popupBadge.style.background = "#444";

    popupUser.textContent = maskUser(id);
    popupText.textContent = "User ID ini sudah pernah mengklaim bonus.";
    popupAmount.textContent = "-";
    popupTime.textContent = "Setiap ID hanya bisa 1x klaim.";

    popup.style.display = "flex";
    return;
  }

  /* ===== PROSES CLAIM ===== */
  claimBtn.disabled = true;
  claimBtn.textContent = "Memverifikasi...";

  setTimeout(() => {
    const bonus = randomBonus();

    popupBadge.textContent = "BERHASIL";
    popupBadge.style.background = "#c00000";

    popupUser.textContent = maskUser(id);
    popupText.textContent = "Bonus Anda:";
    popupAmount.textContent = bonus;
    popupTime.textContent = "Waktu klaim: " + new Date().toLocaleString("id-ID");

    popup.style.display = "flex";

    saveClaimedId(id);

    claimBtn.disabled = false;
    claimBtn.textContent = "Verifikasi & Cek Bonus";

  }, 1300);
};

function closePopup() {
  popup.style.display = "none";
}
