document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-link");
  const toggleIcon = navToggle.querySelector("i");

  // 1. Fungsi Toggle Hide/Show Navbar & Ubah Ikon Hamburger ke 'X'
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("show");

    // Perubahan ikon Font Awesome secara smooth
    if (navMenu.classList.contains("show")) {
      toggleIcon.className = "fa-solid fa-xmark";
    } else {
      toggleIcon.className = "fa-solid fa-bars";
    }
  });

  // 2. Fungsi Klik Menu: Pindah Focus (Active), lalu otomatis Hide Navbar
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      // Hapus kelas 'active' dari semua menu
      navLinks.forEach((item) => item.classList.remove("active"));

      // Tambahkan kelas 'active' ke menu yang baru saja diklik (Tetap Focus)
      this.classList.add("active");

      // Jika dalam tampilan mobile (navbar sedang terbuka), tutup otomatis dengan anggun
      if (navMenu.classList.contains("show")) {
        navMenu.classList.remove("show");
        toggleIcon.className = "fa-solid fa-bars"; // Kembalikan ikon ke hamburger
      }
    });
  });
});

// Baca Semuanya Js
document.querySelectorAll(".read-more-btn").forEach((button) => {
  button.addEventListener("click", function () {
    // Cari elemen paragraf (.portfolio-item-desc) yang berada tepat sebelum/serumah dengan tombol ini
    const desc = this.previousElementSibling;

    // Toggle class 'expanded' pada paragraf
    desc.classList.toggle("expanded");

    // Ubah teks tombol sesuai kondisi statusnya
    if (desc.classList.contains("expanded")) {
      this.textContent = "Sembunyikan";
    } else {
      this.textContent = "Baca Semuanya";
    }
  });
});

// Download CV
// --- LOGIKA PROGRESS DOWNLOAD CV ---
const downloadCvBtn = document.getElementById("downloadCvBtn");
const cvProgressBar = downloadCvBtn.querySelector(".btn-progress-bar");
const cvBtnText = downloadCvBtn.querySelector(".btn-text");
const cvBtnIcon = downloadCvBtn.querySelector(".btn-content i");
const hiddenDownloadLink = document.getElementById("hiddenDownloadLink");

downloadCvBtn.addEventListener("click", function () {
  // Kunci tombol agar tidak bisa diklik ulang selama proses berjalan
  if (this.classList.contains("loading") || this.classList.contains("success"))
    return;

  // Aktifkan visual status loading
  this.classList.add("loading");
  cvBtnIcon.className = "fa-solid fa-spinner fa-spin"; // Ikon berputar

  let downloadProgress = 0;

  const progressInterval = setInterval(() => {
    // Angka acak konstan naik demi simulasi kelancaran unduhan
    downloadProgress += Math.floor(Math.random() * 5) + 1;

    if (downloadProgress >= 100) {
      downloadProgress = 100;
      clearInterval(progressInterval);

      // Transisi visual ke status Sukses
      cvProgressBar.style.width = "100%";
      cvBtnText.textContent = "Selesai!";
      cvBtnIcon.className = "fa-solid fa-circle-check";
      downloadCvBtn.classList.remove("loading");
      downloadCvBtn.classList.add("success");

      // Eksekusi trigger unduhan file asli
      hiddenDownloadLink.click();

      // Kembalikan tombol ke keadaan semula setelah jeda 3 detik
      setTimeout(() => {
        downloadCvBtn.classList.remove("success");
        cvProgressBar.style.width = "0%";
        cvBtnText.textContent = "Download CV";
        cvBtnIcon.className = "fa-solid fa-cloud-arrow-down";
      }, 3000);
    } else {
      // Tampilkan angka persentase real-time
      cvProgressBar.style.width = `${downloadProgress}%`;
      cvBtnText.textContent = `Mengunduh ${downloadProgress}%`;
    }
  }, 40); // Kecepatan render bar per milidetik
});

// Progress Scroll
// --- VERTICAL/HORIZONTAL SCROLL PROGRESS & ACTIVE MENU INDICATOR ---
window.addEventListener("scroll", () => {
  const verticalBar = document.getElementById("verticalBar");

  const totalHeight =
    document.documentElement.scrollHeight - window.innerHeight;
  const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;

  if (window.innerWidth <= 768) {
    verticalBar.style.height = "100%";
    verticalBar.style.width = `${progress}%`;
  } else {
    verticalBar.style.width = "100%";
    verticalBar.style.height = `${progress}%`;
  }
});

window.addEventListener("resize", () => {
  const verticalBar = document.getElementById("verticalBar");
  if (window.innerWidth <= 768) {
    verticalBar.style.height = "100%";
  } else {
    verticalBar.style.width = "100%";
  }
});

const sections = document.querySelectorAll("section, header, div#home");
const dotItems = document.querySelectorAll(".dot-item");
const navbarLinks = document.querySelectorAll(
  ".navbar-nav a, .nav-menu a, .nav-links a",
);

// PERBAIKAN 1: Menurunkan threshold ke 0.3 (30%) agar section yang pendek seperti portfolio langsung terdeteksi aktif
const observerOptions = {
  root: null,
  rootMargin: "-10% 0px -40% 0px", // Mengoptimalkan area baca sensor deteksi browser
  threshold: 0.2,
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const currentSectionId = entry.target.getAttribute("id");

      if (!currentSectionId) return; // Lewati jika elemen tidak punya ID

      // 1. SINKRONISASI TITIK VERTIKAL POJOK KANAN
      dotItems.forEach((item) => item.classList.remove("active"));

      // PERBAIKAN 2: Menggunakan try-catch atau pengecekan manual agar tidak memicu error jika ada typo id
      const activeDot = document.querySelector(
        `.dot-item[data-section="${currentSectionId}"]`,
      );
      if (activeDot) {
        activeDot.classList.add("active");
      }

      // 2. SINKRONISASI NAVBAR UTAMA
      navbarLinks.forEach((link) => {
        link.classList.remove("active");

        const hrefValue = link.getAttribute("href");
        if (hrefValue === `#${currentSectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
}, observerOptions);

sections.forEach((section) => {
  if (section.getAttribute("id")) {
    sectionObserver.observe(section);
  }
});

dotItems.forEach((dot) => {
  dot.addEventListener("click", () => {
    const targetId = dot.getAttribute("data-section");
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});
