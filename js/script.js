/* =========================================
   LUXURY WEDDING INVITATION INTERACTIVE SCRIPT
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       1. URL GUEST NAME PARSER (?to=Nama+Tamu)
    ========================================= */
    const urlParams = new URLSearchParams(window.location.search);
    const guestParam = urlParams.get("to") || urlParams.get("guest") || urlParams.get("n");

    const guestDisplayElement = document.getElementById("guestNameDisplay");
    const guestInputForm = document.getElementById("guestName");

    if (guestParam) {
        const formattedGuestName = decodeURIComponent(guestParam).replace(/\+/g, " ");
        if (guestDisplayElement) guestDisplayElement.textContent = formattedGuestName;
        if (guestInputForm) guestInputForm.value = formattedGuestName;
    }

    /* =========================================
       2. OPENING COVER & AUDIO AUTOPLAY
    ========================================= */
    const opening = document.getElementById("opening");
    const openButton = document.getElementById("openInvitation");
    const music = document.getElementById("weddingMusic");
    const musicButton = document.getElementById("musicButton");

    let isPlaying = false;

    if (openButton) {
        openButton.addEventListener("click", () => {
            if (opening) opening.classList.add("hidden");
            document.body.classList.remove("locked");

            // Attempt Music Playback
            if (music) {
                music.play().then(() => {
                    isPlaying = true;
                    if (musicButton) musicButton.classList.add("playing");
                }).catch(() => {
                    console.log("Autoplay blocked by browser policy.");
                });
            }
        });
    }

    if (musicButton) {
        musicButton.addEventListener("click", () => {
            if (!music) return;
            if (music.paused) {
                music.play();
                isPlaying = true;
                musicButton.classList.add("playing");
            } else {
                music.pause();
                isPlaying = false;
                musicButton.classList.remove("playing");
            }
        });
    }

    /* =========================================
       3. AUTO SCROLL FEATURE
    ========================================= */
    const autoscrollButton = document.getElementById("autoscrollButton");
    let autoScrollInterval = null;
    let isAutoScrolling = false;

    if (autoscrollButton) {
        autoscrollButton.addEventListener("click", () => {
            if (!isAutoScrolling) {
                isAutoScrolling = true;
                autoscrollButton.classList.add("active");
                autoscrollButton.style.background = "var(--gold-primary)";
                autoscrollButton.style.color = "var(--burgundy-dark)";
                
                autoScrollInterval = setInterval(() => {
                    window.scrollBy({ top: 1.5, behavior: 'smooth' });
                    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 10) {
                        clearInterval(autoScrollInterval);
                        isAutoScrolling = false;
                        autoscrollButton.style.background = "";
                        autoscrollButton.style.color = "";
                    }
                }, 30);
            } else {
                clearInterval(autoScrollInterval);
                isAutoScrolling = false;
                autoscrollButton.style.background = "";
                autoscrollButton.style.color = "";
            }
        });
    }

    /* =========================================
       4. COUNTDOWN TIMER
    ========================================= */
    const weddingDate = new Date("December 12, 2026 08:00:00").getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = weddingDate - now;

        const daysEl = document.getElementById("days");
        const hoursEl = document.getElementById("hours");
        const minutesEl = document.getElementById("minutes");
        const secondsEl = document.getElementById("seconds");

        if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

        if (distance <= 0) {
            daysEl.textContent = "00";
            hoursEl.textContent = "00";
            minutesEl.textContent = "00";
            secondsEl.textContent = "00";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        daysEl.textContent = String(days).padStart(2, "0");
        hoursEl.textContent = String(hours).padStart(2, "0");
        minutesEl.textContent = String(minutes).padStart(2, "0");
        secondsEl.textContent = String(seconds).padStart(2, "0");
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();

    /* =========================================
       5. GALLERY LIGHTBOX
    ========================================= */
    const galleryItems = document.querySelectorAll(".gallery-item");
    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    const closeLightbox = document.getElementById("closeLightbox");

    if (galleryItems.length && lightbox && lightboxImage) {
        galleryItems.forEach(item => {
            item.addEventListener("click", () => {
                const img = item.querySelector("img");
                if (img) {
                    lightboxImage.src = img.src;
                    lightbox.classList.add("active");
                }
            });
        });

        if (closeLightbox) {
            closeLightbox.addEventListener("click", () => {
                lightbox.classList.remove("active");
            });
        }

        lightbox.addEventListener("click", (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove("active");
            }
        });
    }

    /* =========================================
       6. COPY BANK ACCOUNT
    ========================================= */
    const copyButton = document.getElementById("copyAccount");
    if (copyButton) {
        copyButton.addEventListener("click", async () => {
            const accEl = document.getElementById("accountNumber");
            if (!accEl) return;
            const accountNo = accEl.textContent.trim();

            try {
                await navigator.clipboard.writeText(accountNo);
                const originalText = copyButton.innerHTML;
                copyButton.innerHTML = "✓ Nomor Rekening Tersalin!";
                copyButton.style.borderColor = "#28a745";
                
                setTimeout(() => {
                    copyButton.innerHTML = originalText;
                    copyButton.style.borderColor = "";
                }, 2200);
            } catch (err) {
                alert("Nomor rekening: " + accountNo);
            }
        });
    }

    /* =========================================
       7. RSVP WHATSAPP FORM
    ========================================= */
    const rsvpForm = document.getElementById("rsvpForm");
    if (rsvpForm) {
        rsvpForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const name = document.getElementById("guestName")?.value.trim() || "-";
            const attendance = document.getElementById("attendance")?.value || "Hadir";
            const message = document.getElementById("guestMessage")?.value.trim() || "-";

            const phone = "6281335963435";
            const messageText = 
                `*Konfirmasi Kehadiran Undangan Pernikahan*\n` +
                `*Farhan & Nawa*\n\n` +
                `*Nama:* ${name}\n` +
                `*Konfirmasi Kehadiran:* ${attendance}\n` +
                `*Ucapan & Doa:* ${message}`;

            const waURL = `https://wa.me/${phone}?text=${encodeURIComponent(messageText)}`;
            window.open(waURL, "_blank");
        });
    }

    /* =========================================
       8. BOTTOM NAVIGATION ACTIVE TRACKING
    ========================================= */
    const navItems = document.querySelectorAll(".bottom-nav .nav-item");
    const sections = document.querySelectorAll("section[id]");

    window.addEventListener("scroll", () => {
        let currentSectionId = "";
        const scrollPosition = window.scrollY + 200;

        sections.forEach(sec => {
            const secTop = sec.offsetTop;
            const secHeight = sec.offsetHeight;
            if (scrollPosition >= secTop && scrollPosition < secTop + secHeight) {
                currentSectionId = sec.getAttribute("id");
            }
        });

        navItems.forEach(item => {
            item.classList.remove("active");
            if (item.getAttribute("href") === `#${currentSectionId}`) {
                item.classList.add("active");
            }
        });
    });

    /* =========================================
       9. INTERACTION SCROLL REVEAL ANIMATIONS
    ========================================= */
    const revealElements = document.querySelectorAll(
        ".quran-card, .bride-groom-card, .event-card, .timeline-item, .gallery-item, .bank-card, .section-heading"
    );

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("revealed");
            }
        });
    }, { threshold: 0.05 });

    revealElements.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(20px)";
        el.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
        observer.observe(el);
    });

    const style = document.createElement("style");
    style.textContent = `
        .revealed {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    /* =========================================
       10. FALLING ROSE PETALS CANVAS ANIMATION
    ========================================= */
    const canvas = document.getElementById("petalCanvas");
    if (canvas) {
        const ctx = canvas.getContext("2d");
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        window.addEventListener("resize", () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        const petalColors = [
            "rgba(142, 35, 57, 0.75)",
            "rgba(107, 24, 42, 0.85)",
            "rgba(197, 160, 89, 0.65)",
            "rgba(247, 231, 180, 0.55)"
        ];

        class Petal {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * width;
                this.y = -20;
                this.size = Math.random() * 8 + 6;
                this.speedY = Math.random() * 1.2 + 0.8;
                this.speedX = Math.random() * 0.8 - 0.4;
                this.color = petalColors[Math.floor(Math.random() * petalColors.length)];
                this.rotation = Math.random() * Math.PI * 2;
                this.rotationSpeed = Math.random() * 0.02 - 0.01;
            }

            update() {
                this.y += this.speedY;
                this.x += Math.sin(this.y * 0.01) + this.speedX;
                this.rotation += this.rotationSpeed;

                if (this.y > height + 20) {
                    this.reset();
                }
            }

            draw() {
                ctx.save();
                ctx.translate(this.x, this.y);
                ctx.rotate(this.rotation);

                ctx.beginPath();
                ctx.fillStyle = this.color;
                ctx.ellipse(0, 0, this.size, this.size * 0.6, 0, 0, Math.PI * 2);
                ctx.fill();

                ctx.restore();
            }
        }

        const petalsCount = window.innerWidth < 600 ? 25 : 45;
        const petals = Array.from({ length: petalsCount }, () => new Petal());

        function animatePetals() {
            ctx.clearRect(0, 0, width, height);
            petals.forEach(petal => {
                petal.update();
                petal.draw();
            });
            requestAnimationFrame(animatePetals);
        }

        animatePetals();
    }
});
