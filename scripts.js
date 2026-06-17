document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-link");
  const toggleIcon = navToggle.querySelector("i");

  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("show");

    if (navMenu.classList.contains("show")) {
      toggleIcon.className = "fa-solid fa-xmark";
    } else {
      toggleIcon.className = "fa-solid fa-bars";
    }
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      navLinks.forEach((item) => item.classList.remove("active"));

      this.classList.add("active");

      if (navMenu.classList.contains("show")) {
        navMenu.classList.remove("show");
        toggleIcon.className = "fa-solid fa-bars";
      }
    });
  });
});

document.querySelectorAll(".read-more-btn").forEach((button) => {
  button.addEventListener("click", function () {
    const desc = this.previousElementSibling;

    desc.classList.toggle("expanded");

    if (desc.classList.contains("expanded")) {
      this.textContent = "Sembunyikan";
    } else {
      this.textContent = "Baca Semuanya";
    }
  });
});

const downloadCvBtn = document.getElementById("downloadCvBtn");
const cvProgressBar = downloadCvBtn.querySelector(".btn-progress-bar");
const cvBtnText = downloadCvBtn.querySelector(".btn-text");
const cvBtnIcon = downloadCvBtn.querySelector(".btn-content i");
const hiddenDownloadLink = document.getElementById("hiddenDownloadLink");

downloadCvBtn.addEventListener("click", function () {
  if (this.classList.contains("loading") || this.classList.contains("success"))
    return;

  this.classList.add("loading");
  cvBtnIcon.className = "fa-solid fa-spinner fa-spin";

  let downloadProgress = 0;

  const progressInterval = setInterval(() => {
    downloadProgress += Math.floor(Math.random() * 5) + 1;

    if (downloadProgress >= 100) {
      downloadProgress = 100;
      clearInterval(progressInterval);

      cvProgressBar.style.width = "100%";
      cvBtnText.textContent = "Selesai!";
      cvBtnIcon.className = "fa-solid fa-circle-check";
      downloadCvBtn.classList.remove("loading");
      downloadCvBtn.classList.add("success");

      hiddenDownloadLink.click();

      setTimeout(() => {
        downloadCvBtn.classList.remove("success");
        cvProgressBar.style.width = "0%";
        cvBtnText.textContent = "Download CV";
        cvBtnIcon.className = "fa-solid fa-cloud-arrow-down";
      }, 3000);
    } else {
      cvProgressBar.style.width = `${downloadProgress}%`;
      cvBtnText.textContent = `Mengunduh ${downloadProgress}%`;
    }
  }, 40);
});

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

const observerOptions = {
  root: null,
  rootMargin: "-10% 0px -40% 0px",
  threshold: 0.2,
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const currentSectionId = entry.target.getAttribute("id");

      if (!currentSectionId) return;

      dotItems.forEach((item) => item.classList.remove("active"));

      const activeDot = document.querySelector(
        `.dot-item[data-section="${currentSectionId}"]`,
      );
      if (activeDot) {
        activeDot.classList.add("active");
      }

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

const securityOverlay = document.getElementById("securityOverlay");
const closeSecurityBtn = document.getElementById("closeSecurityBtn");

function showAlert() {
  securityOverlay.classList.add("show");
}

closeSecurityBtn.addEventListener("click", () => {
  securityOverlay.classList.remove("show");
});

document.addEventListener("contextmenu", (e) => {
  e.preventDefault();
  showAlert();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "F12") {
    e.preventDefault();
    showAlert();
  }

  if (
    e.ctrlKey &&
    e.shiftKey &&
    (e.key === "I" ||
      e.key === "J" ||
      e.key === "C" ||
      e.key === "i" ||
      e.key === "j" ||
      e.key === "c")
  ) {
    e.preventDefault();
    showAlert();
  }

  if (e.ctrlKey && (e.key === "U" || e.key === "u")) {
    e.preventDefault();
    showAlert();
  }

  if (e.ctrlKey && (e.key === "S" || e.key === "s")) {
    e.preventDefault();
    showAlert();
  }
});
