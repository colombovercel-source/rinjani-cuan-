// ===== START CLAIM BONUS =====
const claimBtn = document.getElementById("claimBtn");
claimBtn.addEventListener("click", startClaim);

function startClaim() {
  var userId = document.getElementById("userId").value.trim();
  if(!userId) {
    alert("Silakan masukkan User ID terlebih dahulu.");
    return;
  }

  document.getElementById("modal").style.display = "flex";

  // ubah warna teks status modal & progres menjadi putih
  document.getElementById("statusText").style.color = "white";
  document.getElementById("progressBar").style.background = "white";

  simulateProgress(userId);
}

// ===== SIMULASI PROGRESS =====
function simulateProgress(userId) {
  var progress = 0;
  var bar = document.getElementById("progressBar");
  var status = document.getElementById("statusText");

  var interval = setInterval(function() {
    progress += 10;
    bar.style.width = progress + "%";

    if(progress == 30) status.textContent = "Memverifikasi User ID...";
    if(progress == 60) status.textContent = "Mengaktifkan Bonus Freebet...";
    if(progress == 90) status.textContent = "Finalisasi Klaim...";

    if(progress >= 100) {
      clearInterval(interval);
      showSuccess(userId);
    }
  }, 400);
}

// ===== MENAMPILKAN SUKSES =====
function showSuccess(userId) {
  document.getElementById("modalContent").innerHTML = `
    <h2>Selamat</h2>
    <p>
      User ID <b>${userId}</b><br><br>
      Berhasil Claim Bonus Freebet 20.000<br><br>
      Silakan screenshot halaman ini
    </p>
    <button class="cs-btn" onclick="goToCS()">HUBUNGI CS</button>
  `;
  launchConfetti();
}

// ===== HUBUNGI CS =====
function goToCS() {
  window.location.href = "https://rinjanipuncak.com";
}

// ===== CONFETTI =====
function launchConfetti() {
  for(let i=0;i<50;i++){
    let confetti = document.createElement('div');
    confetti.classList.add('confetti-piece');
    confetti.style.left = Math.random() * window.innerWidth + 'px';
    confetti.style.backgroundColor = `hsl(${Math.random()*360},100%,50%)`;
    confetti.style.animationDuration = 1 + Math.random()*2 + 's';
    document.body.appendChild(confetti);
    setTimeout(()=> confetti.remove(),3000);
  }
}

// ===== LIVE FEED =====
const feedList = document.getElementById("feedList");
const users = ["User123","UserABC","PlayerX","LuckyOne","UserXYZ","Gamer77"];
const amounts = [10000,20000,25000,50000,15000];

function addFeed() {
  const user = users[Math.floor(Math.random()*users.length)];
  const amount = amounts[Math.floor(Math.random()*amounts.length)];
  const li = document.createElement("li");
  li.textContent = `${user} berhasil claim ${amount.toLocaleString()}`;
  feedList.prepend(li);
  if(feedList.children.length > 8) feedList.removeChild(feedList.lastChild);
}

// Tambahkan feed setiap 2 detik
setInterval(addFeed, 2000);
