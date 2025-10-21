// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize all features
  initCinematicEntry();
  initPreloader();
  initNavbar();
  initSmoothScroll();
  initScrollAnimations();
  initGallery();
  initTestimonials();
  initContactForm();
  initThemeToggle();
  initNightMode();
  initMusicControls();
  // initVoiceMessage();
  initCountdown();
  initLoveLetter();
  initLoveQuiz();
  initGiftBox();
  initFloatingBubbles();
  initHeroParticles();
  initSparkles();
  initHeartTrail();
  initFloatingCompliments();
  initLoveConfetti();
  initMobileMenu();
  initLightbox();
});

// Cinematic Entry
function initCinematicEntry() {
  const cinematicEntry = document.getElementById("cinematicEntry");

  setTimeout(() => {
    cinematicEntry.style.display = "none";
  }, 5000);
}

// Preloader
function initPreloader() {
  const preloader = document.getElementById("preloader");

  window.addEventListener("load", function () {
    setTimeout(() => {
      preloader.classList.add("hidden");
      // Trigger love confetti after preloader
      setTimeout(() => {
        createLoveConfetti();
      }, 1000);
    }, 2000);
  });
}

// Navbar scroll effect
function initNavbar() {
  const navbar = document.getElementById("navbar");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
}

// Smooth scrolling for navigation links
function initSmoothScroll() {
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 70;

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });

        // Close mobile menu if open
        const navMenu = document.querySelector(".nav-menu");
        navMenu.classList.remove("active");
      }
    });
  });
}

// Scroll animations using Intersection Observer
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");

        // Add stagger effect for gallery items
        if (entry.target.classList.contains("gallery-item")) {
          const galleryItems = document.querySelectorAll(".gallery-item");
          const index = Array.from(galleryItems).indexOf(entry.target);
          entry.target.style.transitionDelay = `${index * 0.1}s`;
        }

        // Add alternating animation for timeline items
        if (entry.target.classList.contains("timeline-item")) {
          const timelineItems = document.querySelectorAll(".timeline-item");
          const index = Array.from(timelineItems).indexOf(entry.target);
          if (index % 2 === 0) {
            entry.target.style.transform = "translateX(-50px)";
          } else {
            entry.target.style.transform = "translateX(50px)";
          }
        }
      }
    });
  }, observerOptions);

  // Observe all elements with fade-in class
  const fadeElements = document.querySelectorAll(".fade-in");
  fadeElements.forEach((element) => {
    observer.observe(element);
  });
}

// Gallery functionality
function initGallery() {
  const galleryItems = document.querySelectorAll(".gallery-item");

  galleryItems.forEach((item) => {
    item.addEventListener("click", function () {
      const img = this.querySelector(".gallery-img");
      const caption = this.getAttribute("data-caption");
      const title = this.querySelector(".gallery-overlay h4").textContent;
      openLightbox(img.src, title, caption);
    });
  });
}

// Lightbox functionality
function initLightbox() {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.querySelector(".lightbox-img");
  const lightboxTitle = document.querySelector(".lightbox-caption h3");
  const lightboxCaption = document.querySelector(".lightbox-caption p");
  const closeBtn = document.querySelector(".lightbox-close");

  // Close lightbox when clicking close button
  closeBtn.addEventListener("click", closeLightbox);

  // Close lightbox when clicking outside the image
  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Close lightbox with Escape key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && lightbox.classList.contains("active")) {
      closeLightbox();
    }
  });
}

function openLightbox(imgSrc, title, caption) {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.querySelector(".lightbox-img");
  const lightboxTitle = document.querySelector(".lightbox-caption h3");
  const lightboxCaption = document.querySelector(".lightbox-caption p");

  lightboxImg.src = imgSrc;
  lightboxTitle.textContent = title;
  lightboxCaption.textContent = caption;
  lightbox.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  const lightbox = document.getElementById("lightbox");
  lightbox.classList.remove("active");
  document.body.style.overflow = "auto";
}

// Testimonials slider
function initTestimonials() {
  const testimonialCards = document.querySelectorAll(".message-card");
  const dots = document.querySelectorAll(".dot");
  let currentSlide = 0;

  function showSlide(index) {
    // Hide all cards
    testimonialCards.forEach((card) => card.classList.remove("active"));
    dots.forEach((dot) => dot.classList.remove("active"));

    // Show current card
    testimonialCards[index].classList.add("active");
    dots[index].classList.add("active");
  }

  // Auto-advance slides
  function nextSlide() {
    currentSlide = (currentSlide + 1) % testimonialCards.length;
    showSlide(currentSlide);
  }

  // Start auto-slide
  setInterval(nextSlide, 5000);

  // Dot navigation
  dots.forEach((dot, index) => {
    dot.addEventListener("click", function () {
      currentSlide = index;
      showSlide(currentSlide);
    });
  });
}

// Contact form
function initContactForm() {
  const form = document.getElementById("contactForm");
  const successMessage = document.getElementById("successMessage");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(form);
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");

    // Simple validation
    if (!name || !email || !message) {
      alert("Mohon lengkapi semua field!");
      return;
    }

    // Simulate form submission
    const submitBtn = form.querySelector(".submit-btn");
    const originalText = submitBtn.innerHTML;

    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Mengirim...</span>';
    submitBtn.disabled = true;

    setTimeout(() => {
      // Reset form
      form.reset();

      // Restore button
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;

      // Show success message
      showSuccessMessage();

      // Create love confetti
      createLoveConfetti();

      // Log form data (in real app, this would be sent to server)
      console.log("Pesan cinta diterima:", { name, email, message });
    }, 2000);
  });
}

function showSuccessMessage() {
  const successMessage = document.getElementById("successMessage");
  successMessage.classList.add("show");

  setTimeout(() => {
    successMessage.classList.remove("show");
  }, 5000);
}

// Theme toggle
function initThemeToggle() {
  const themeToggle = document.getElementById("themeToggle");
  const body = document.body;

  // Check for saved theme preference
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "white") {
    body.classList.add("white-theme");
  }

  themeToggle.addEventListener("click", function () {
    body.classList.toggle("white-theme");

    // Save theme preference
    if (body.classList.contains("white-theme")) {
      localStorage.setItem("theme", "white");
    } else {
      localStorage.setItem("theme", "pink");
    }

    // Add rotation animation
    this.style.transform = "scale(1.1) rotate(360deg)";
    setTimeout(() => {
      this.style.transform = "";
    }, 300);
  });
}

// Night mode toggle
function initNightMode() {
  const nightModeToggle = document.getElementById("nightModeToggle");
  const body = document.body;

  // Check for saved night mode preference
  const savedNightMode = localStorage.getItem("nightMode");
  if (savedNightMode === "true") {
    body.classList.add("night-mode");
  }

  nightModeToggle.addEventListener("click", function () {
    body.classList.toggle("night-mode");

    // Save night mode preference
    localStorage.setItem("nightMode", body.classList.contains("night-mode"));

    // Add rotation animation
    this.style.transform = "scale(1.1) rotate(360deg)";
    setTimeout(() => {
      this.style.transform = "";
    }, 300);

    // Create stars if night mode is activated
    if (body.classList.contains("night-mode")) {
      createStars();
    }
  });
}

// Music controls
function initMusicControls() {
  const musicToggle = document.getElementById("musicToggle");
  const musicSelector = document.getElementById("musicSelector");
  const backgroundMusic = document.getElementById("backgroundMusic");
  const moodBtns = document.querySelectorAll(".mood-btn");
  let isPlaying = false;

  backgroundMusic.volume = 0.3;

  const musicSources = {
    sweet: "assets/music/Banda.mp3",
    cheerful: "assets/music/Hindia.mp3",
    dreamy: "assets/music/Pamungkas.mp3",
  };

  // ✅ Perbaikan: aktifkan musik hanya setelah interaksi user pertama
  let userInteracted = false;
  const enableMusic = () => {
    if (!userInteracted) {
      userInteracted = true;
      backgroundMusic.play().catch((err) => {
        console.log("Autoplay diblokir, menunggu tombol musik:", err);
      });
    }
  };

  document.addEventListener("click", enableMusic, { once: true });
  document.addEventListener("touchstart", enableMusic, { once: true });

  musicToggle.addEventListener("click", function () {
    musicSelector.classList.toggle("show");

    if (isPlaying) {
      backgroundMusic.pause();
      this.classList.remove("playing");
      this.innerHTML = '<i class="fas fa-music"></i>';
    } else {
      backgroundMusic
        .play()
        .then(() => {
          this.classList.add("playing");
          this.innerHTML = '<i class="fas fa-pause"></i>';
        })
        .catch((error) => {
          console.log("Music autoplay blocked:", error);
          showMusicMessage();
        });
    }

    isPlaying = !isPlaying;
  });

  moodBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const mood = this.getAttribute("data-mood");
      moodBtns.forEach((b) => b.classList.remove("active"));
      this.classList.add("active");
      backgroundMusic.src = musicSources[mood];
      if (isPlaying) backgroundMusic.play();
      localStorage.setItem("musicMood", mood);
    });
  });

  const savedMood = localStorage.getItem("musicMood");
  if (savedMood) {
    const moodBtn = document.querySelector(`[data-mood="${savedMood}"]`);
    if (moodBtn) moodBtn.click();
  }
}

function showMusicMessage() {
  const message = document.createElement("div");
  message.className = "music-message";
  message.innerHTML = '<i class="fas fa-info-circle"></i> <p>Klik tombol musik lagi untuk memulai</p>';
  message.style.cssText = `
        position: fixed;
        top: 140px;
        right: 20px;
        background: linear-gradient(135deg, #FFC0CB 0%, #FF69B4 100%);
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(255, 192, 203, 0.3);
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;

  document.body.appendChild(message);

  setTimeout(() => {
    message.style.animation = "slideOut 0.3s ease";
    setTimeout(() => {
      document.body.removeChild(message);
    }, 300);
  }, 3000);
}

// // Voice message
// function initVoiceMessage() {
//   const voiceMessageBtn = document.getElementById("voiceMessageBtn");
//   const voiceMessage = document.getElementById("voiceMessage");
//   let isRecording = false;

//   voiceMessageBtn.addEventListener("click", function () {
//     if (!isRecording) {
//       // Start recording animation
//       this.classList.add("recording");
//       this.innerHTML = '<i class="fas fa-stop"></i>';

//       // Play voice message (simulated)
//       voiceMessage
//         .play()
//         .then(() => {
//           console.log("Voice message playing");
//         })
//         .catch((error) => {
//           console.log("Voice message play blocked:", error);
//         });

//       // Auto stop after 3 seconds
//       setTimeout(() => {
//         this.classList.remove("recording");
//         this.innerHTML = '<i class="fas fa-microphone"></i>';
//         voiceMessage.pause();
//         voiceMessage.currentTime = 0;
//       }, 3000);
//     } else {
//       // Stop recording
//       this.classList.remove("recording");
//       this.innerHTML = '<i class="fas fa-microphone"></i>';
//       voiceMessage.pause();
//       voiceMessage.currentTime = 0;
//     }

//     isRecording = !isRecording;
//   });
// }

// Countdown timer
function initCountdown() {
  const countdownContainer = document.getElementById("countdownContainer");
  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");
  const messageEl = document.getElementById("countdownMessage");

  // Set target date (7 days from now)
  const targetDate = new Date("2025-10-22T00:00:00").getTime();

  function updateCountdown() {
    const now = new Date();
    const difference = targetDate - now;

    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      daysEl.textContent = String(days).padStart(2, "0");
      hoursEl.textContent = String(hours).padStart(2, "0");
      minutesEl.textContent = String(minutes).padStart(2, "0");
      secondsEl.textContent = String(seconds).padStart(2, "0");

      // Show countdown after 2 seconds
      setTimeout(() => {
        countdownContainer.classList.add("show");
      }, 2000);
    } else {
      messageEl.textContent = "Yeeay, Hari Spesial Telah tiba 💕";
      createLoveConfetti();
    }
  }

  // Update countdown every second
  setInterval(updateCountdown, 1000);
  updateCountdown();
}

// Love letter reveal
function initLoveLetter() {
  const loveLetterBtn = document.getElementById("loveLetterBtn");
  const loveLetter = document.getElementById("loveLetter");

  loveLetterBtn.addEventListener("click", function () {
    loveLetter.classList.add("revealed");
    this.style.display = "none";

    // Create confetti effect
    createLoveConfetti();

    // Smooth scroll to letter
    setTimeout(() => {
      loveLetter.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 500);
  });
}

// Love quiz
function initLoveQuiz() {
  const quizOptions = document.querySelectorAll(".quiz-option");
  const quizResult = document.getElementById("quizResult");

  quizOptions.forEach((option) => {
    option.addEventListener("click", function () {
      const answer = this.getAttribute("data-answer");

      // Remove previous results
      quizOptions.forEach((opt) => {
        opt.classList.remove("correct", "wrong");
        opt.disabled = true;
      });

      // Show result
      if (answer === "correct") {
        this.classList.add("correct");
        quizResult.innerHTML = '<i class="fas fa-heart"></i> <p>Benar! Kamu memang ingat semuanya! 💕 Aku sayang kamu, Rahma!</p>';
        quizResult.classList.add("show");
        createLoveConfetti();
      } else {
        this.classList.add("wrong");
        quizResult.innerHTML = '<i class="fas fa-smile"></i> <p>Hehe, gapapa, yang penting aku tetap sayang 😘</p>';
        quizResult.classList.add("show");
      }

      // Reset after 5 seconds
      setTimeout(() => {
        quizOptions.forEach((opt) => {
          opt.classList.remove("correct", "wrong");
          opt.disabled = false;
        });
        quizResult.classList.remove("show");
      }, 5000);
    });
  });
}

// Gift box Easter egg
function initGiftBox() {
  const giftBox = document.getElementById("giftBox");
  const giftSurprise = document.getElementById("giftSurprise");
  const closeSurprise = document.getElementById("closeSurprise");

  giftBox.addEventListener("click", function () {
    this.classList.add("opened");
    giftSurprise.classList.add("show");

    // Create confetti
    createLoveConfetti();
  });

  closeSurprise.addEventListener("click", function () {
    giftSurprise.classList.remove("show");
    giftBox.classList.remove("opened");
  });

  // Close when clicking outside
  giftSurprise.addEventListener("click", function (e) {
    if (e.target === giftSurprise) {
      giftSurprise.classList.remove("show");
      giftBox.classList.remove("opened");
    }
  });
}

// Floating bubbles
function initFloatingBubbles() {
  const container = document.getElementById("floatingBubbles");
  const emojis = ["💕", "💖", "💗", "💝", "🌹", "🌸", "🌷", "💐"];

  function createBubble() {
    const bubble = document.createElement("div");
    bubble.className = "bubble";
    bubble.style.left = Math.random() * 100 + "%";
    bubble.style.width = bubble.style.height = Math.random() * 40 + 20 + "px";
    bubble.style.animationDuration = Math.random() * 3 + 5 + "s";
    bubble.style.animationDelay = Math.random() * 2 + "s";
    bubble.setAttribute("data-emoji", emojis[Math.floor(Math.random() * emojis.length)]);

    container.appendChild(bubble);

    // Remove bubble after animation
    setTimeout(() => {
      container.removeChild(bubble);
    }, 8000);
  }

  // Create bubbles periodically
  setInterval(createBubble, 3000);

  // Create initial bubbles
  for (let i = 0; i < 5; i++) {
    setTimeout(createBubble, i * 1000);
  }
}

// Hero particles
function initHeroParticles() {
  const container = document.getElementById("heroParticles");
  const hearts = ["💕", "💖", "💗", "💝"];

  function createHeartParticle() {
    const particle = document.createElement("div");
    particle.className = "heart-particle";
    particle.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    particle.style.left = Math.random() * 100 + "%";
    particle.style.animationDuration = Math.random() * 3 + 4 + "s";
    particle.style.animationDelay = Math.random() * 2 + "s";

    container.appendChild(particle);

    // Remove particle after animation
    setTimeout(() => {
      container.removeChild(particle);
    }, 6000);
  }

  // Create heart particles periodically
  setInterval(createHeartParticle, 2000);

  // Create initial particles
  for (let i = 0; i < 8; i++) {
    setTimeout(createHeartParticle, i * 500);
  }
}

// Sparkles
function initSparkles() {
  const container = document.getElementById("sparkles");

  function createSparkle() {
    const sparkle = document.createElement("div");
    sparkle.className = "sparkle";
    sparkle.style.left = Math.random() * 100 + "%";
    sparkle.style.top = Math.random() * 100 + "%";
    sparkle.style.animationDelay = Math.random() * 3 + "s";

    container.appendChild(sparkle);

    // Remove sparkle after animation
    setTimeout(() => {
      container.removeChild(sparkle);
    }, 3000);
  }

  // Create sparkles periodically
  setInterval(createSparkle, 500);
}

// Heart trail cursor
function initHeartTrail() {
  let mouseTimer;

  document.addEventListener("mousemove", function (e) {
    clearTimeout(mouseTimer);

    mouseTimer = setTimeout(() => {
      createHeartTrail(e.clientX, e.clientY);
    }, 50);
  });
}

function createHeartTrail(x, y) {
  const heart = document.createElement("div");
  heart.className = "heart-trail";
  heart.textContent = "💕";
  heart.style.left = x + "px";
  heart.style.top = y + "px";

  document.body.appendChild(heart);

  // Remove heart after animation
  setTimeout(() => {
    document.body.removeChild(heart);
  }, 1000);
}

// Floating compliments
function initFloatingCompliments() {
  const compliments = [
    "Cantiknyaaa 😍",
    "Kamu bikin hariku indah, Rahma 💕",
    "Tetap senyum ya 🌷",
    "Senyummu adalah matahariku ☀️",
    "Kamu sempurna di mataku 💖",
    "Aku sayang kamu, Rahma 💕",
    "Kamu adalah yang terbaik 🌟",
    "Bersamamu selalu indah 🌹",
  ];

  document.addEventListener("click", function (e) {
    // Don't show compliment on buttons, links, or form elements
    if (e.target.tagName === "BUTTON" || e.target.tagName === "A" || e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") {
      return;
    }

    const compliment = document.getElementById("floatingCompliment");
    const randomCompliment = compliments[Math.floor(Math.random() * compliments.length)];

    compliment.textContent = randomCompliment;
    compliment.style.left = e.clientX + "px";
    compliment.style.top = e.clientY + "px";
    compliment.classList.add("show");

    // Remove compliment after animation
    setTimeout(() => {
      compliment.classList.remove("show");
    }, 2000);
  });
}

// Love confetti effect
function initLoveConfetti() {
  // Hero button click
  const heroBtn = document.getElementById("heroBtn");
  if (heroBtn) {
    heroBtn.addEventListener("click", function () {
      createLoveConfetti();
    });
  }
}

function createLoveConfetti() {
  const canvas = document.getElementById("confettiCanvas");
  const ctx = canvas.getContext("2d");
  const confettiCount = 15;
  const confetti = [];

  // Set canvas size
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Create confetti pieces
  for (let i = 0; i < confettiCount; i++) {
    confetti.push({
      x: Math.random() * canvas.width,
      y: -10,
      vx: Math.random() * 2 - 1,
      vy: Math.random() * 4 + 3,
      size: Math.random() * 45 + 30,
      color: ["#FFC0CB", "#FF69B4", "#E0BFB8", "#FFDAB9", "#DDA0DD"][Math.floor(Math.random() * 5)],
      emoji: ["💕", "💖", "💗", "💝", "🌹", "🌸"][Math.floor(Math.random() * 6)],
      rotation: Math.random() * 360,
      rotationSpeed: Math.random() * 10 - 5,
    });
  }

  canvas.style.display = "block";

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let activeConfetti = 0;

    confetti.forEach((piece, index) => {
      if (piece.y < canvas.height) {
        activeConfetti++;

        // Update position
        piece.x += piece.vx;
        piece.y += piece.vy;
        piece.rotation += piece.rotationSpeed;

        // Add gravity
        piece.vy += 0.1;

        // Draw confetti
        ctx.save();
        ctx.translate(piece.x, piece.y);
        ctx.rotate((piece.rotation * Math.PI) / 180);
        ctx.font = piece.size + "px Arial";
        ctx.fillText(piece.emoji, 0, 0);
        ctx.restore();
      }
    });

    if (activeConfetti > 0) {
      requestAnimationFrame(animate);
    } else {
      canvas.style.display = "none";
    }
  }

  animate();
}

// Create stars for night mode
function createStars() {
  const starsContainer = document.createElement("div");
  starsContainer.className = "stars-container";
  starsContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 0;
    `;

  for (let i = 0; i < 100; i++) {
    const star = document.createElement("div");
    star.className = "star";
    star.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: white;
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: twinkle ${Math.random() * 3 + 2}s ease-in-out infinite;
            animation-delay: ${Math.random() * 3}s;
        `;
    starsContainer.appendChild(star);
  }

  document.body.appendChild(starsContainer);

  // Add twinkle animation
  const style = document.createElement("style");
  style.textContent = `
        @keyframes twinkle {
            0%, 100% { opacity: 0.3; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.2); }
        }
    `;
  document.head.appendChild(style);
}

// Mobile menu
function initMobileMenu() {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  hamburger.addEventListener("click", function () {
    navMenu.classList.toggle("active");

    // Animate hamburger
    const spans = this.querySelectorAll("span");
    if (navMenu.classList.contains("active")) {
      spans[0].style.transform = "rotate(45deg) translateY(8px)";
      spans[1].style.opacity = "0";
      spans[2].style.transform = "rotate(-45deg) translateY(-8px)";
    } else {
      spans[0].style.transform = "";
      spans[1].style.opacity = "1";
      spans[2].style.transform = "";
    }
  });

  // Close menu when clicking outside
  document.addEventListener("click", function (e) {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
      navMenu.classList.remove("active");

      // Reset hamburger
      const spans = hamburger.querySelectorAll("span");
      spans[0].style.transform = "";
      spans[1].style.opacity = "1";
      spans[2].style.transform = "";
    }
  });
}

// Utility function to scroll to section
function scrollToSection(sectionId) {
  const section = document.querySelector(sectionId);
  if (section) {
    const offsetTop = section.offsetTop - 70;

    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    });
  }
}

// Add some CSS animations dynamically
const style = document.createElement("style");
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .music-message {
        animation: slideIn 0.3s ease;
    }
`;
document.head.appendChild(style);

// Parallax effect for hero section
window.addEventListener("scroll", function () {
  const scrolled = window.pageYOffset;
  const heroContent = document.querySelector(".hero-content");
  const floatingHearts = document.querySelectorAll(".floating-heart");

  if (heroContent) {
    heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
  }

  floatingHearts.forEach((heart, index) => {
    const speed = 0.3 + index * 0.1;
    heart.style.transform = `translateY(${scrolled * speed}px)`;
  });
});

// Add sound effect for button clicks
function addClickSound() {
  const audio = new Audio(
    "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT"
  );
  audio.volume = 0.1;

  document.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", function () {
      audio.play().catch((e) => console.log("Audio play failed:", e));
    });
  });
}

// Initialize click sound
addClickSound();

// Window resize handler
window.addEventListener("resize", function () {
  // Update confetti canvas size
  const canvas = document.getElementById("confettiCanvas");
  if (canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
});

// Add typing effect to hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = "";

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// Initialize typing effect when page loads
window.addEventListener("load", function () {
  const heroTitle = document.querySelector(".hero-title");
  if (heroTitle) {
    const originalText = heroTitle.textContent;
    setTimeout(() => {
      typeWriter(heroTitle, originalText, 50);
    }, 6000);
  }
});
