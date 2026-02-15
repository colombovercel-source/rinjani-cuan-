const claimBtn = document.getElementById("claimBtn");
const userIdInput = document.getElementById("userId");
const historyBox = document.getElementById("history");

const popup = document.getElementById("popup");
const popupUser = document.getElementById("popupUser");
const popupAmount = document.getElementById("popupAmount");
const popupTime = document.getElementById("popupTime");

function maskUser(id) {
  return id.slice(0, 2) + "***" + id.slice(-2);
}

function randomBonus() {
  const list = [50000, 100000, 150000, 200000, 300000];
  return "Rp " + list[Math.floor(Math.random() * list.length)].toLocaleString("id-ID");
}

/* History dummy */
for (let i = 0; i < 12; i++) {
  const div = document.createElement("div");
  div.className = "history-item";
  div.textContent = `MBR***${10 + i} berhasil klaim bonus`;
  historyBox.appendChild(div);
}

claimBtn.onclick = () => {
  const id = userIdInput.value.trim();
  if (!id) {
    alert("User ID wajib diisi");
    return;
  }

  claimBtn.disabled = true;
  claimBtn.textContent = "Memverifikasi...";

  setTimeout(() => {
    popupUser.textContent = maskUser(id);
    popupAmount.textContent = randomBonus();
    popupTime.textContent = "Waktu klaim: " + new Date().toLocaleString("id-ID");
    popup.style.display = "flex";

    claimBtn.disabled = false;
    claimBtn.textContent = "Verifikasi & Cek Bonus";
  }, 1300);
};

function closePopup() {
  popup.style.display = "none";
}
