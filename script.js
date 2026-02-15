function startClaim() {
  var userId = document.getElementById("userId").value;

  if(userId === "") {
    alert("Silakan masukkan User ID terlebih dahulu.");
    return;
  }

  document.getElementById("modal").style.display = "flex";
  simulateProgress(userId);
}

function simulateProgress(userId) {
  var progress = 0;
  var bar = document.getElementById("progressBar");
  var status = document.getElementById("statusText");

  var interval = setInterval(function() {
    progress += 10;
    bar.style.width = progress + "%";

    if(progress == 40) {
      status.innerHTML = "Memverifikasi User ID...";
    }
    if(progress == 70) {
      status.innerHTML = "Mengaktifkan Bonus Freebet...";
    }

    if(progress >= 100) {
      clearInterval(interval);
      showSuccess(userId);
    }
  }, 400);
}

function showSuccess(userId) {
  document.getElementById("modalContent").innerHTML = `
    <h2>Selamat 🎉</h2>
    <p>
      User ID <b>${userId}</b><br><br>
      Berhasil Claim Bonus Freebet 20.000
      <br><br>
      Silakan screenshot halaman ini dan hubungi CS untuk proses aktivasi bonus.
    </p>
    <button onclick="goToCS()">HUBUNGI CS</button>
  `;
}

function goToCS() {
  window.location.href = "https://rinjanipuncak.com";
}
