// JavaScript for Bali Cahaya Wellness

document.addEventListener("DOMContentLoaded", () => {
  // 1. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });

    // Close menu when clicking on a link
    mobileMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
      });
    });
  }

  // 2. Menu Category Filtering
  const filterBtns = document.querySelectorAll(".filter-btn");
  const menuCards = document.querySelectorAll(".menu-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active class from all buttons
      filterBtns.forEach((b) => {
        b.classList.remove("bg-brand-wine", "text-white", "shadow-sm");
        b.classList.add(
          "bg-white",
          "text-brand-charcoal",
          "border",
          "border-brand-sand",
        );
      });

      // Add active class to clicked button
      btn.classList.add("bg-brand-wine", "text-white", "shadow-sm");
      btn.classList.remove("bg-white", "text-brand-charcoal");

      const category = btn.getAttribute("data-category");

      menuCards.forEach((card) => {
        if (category === "all" || card.classList.contains(category)) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // 3. Set default date on booking form (Today)
  const custDate = document.getElementById("cust-date");
  if (custDate) {
    const today = new Date().toISOString().split("T")[0];
    custDate.value = today;
    custDate.min = today;
  }

  // 4. Quick WhatsApp Booking Form Handler
  const bookingForm = document.getElementById("booking-form");
  if (bookingForm) {
    bookingForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("cust-name").value.trim();
      const treatment = document.getElementById("cust-treatment").value;
      const date = document.getElementById("cust-date").value;
      const time = document.getElementById("cust-time").value;
      const people = document.getElementById("cust-people").value;
      const notes = document.getElementById("cust-notes").value.trim();

      let message = `Halo Bali Cahaya Wellness, saya ingin reservasi treatment:\n\n`;
      message += `• Nama: ${name}\n`;
      message += `• Treatment: ${treatment}\n`;
      message += `• Rencana Tanggal: ${date}\n`;
      message += `• Jam Kedatangan: ${time} WITA\n`;
      message += `• Jumlah Orang: ${people}\n`;
      if (notes) {
        message += `• Catatan: ${notes}\n`;
      }
      message += `\nApakah jadwal di jam tersebut masih tersedia? Terima kasih! 🙏`;

      const encodedMessage = encodeURIComponent(message);
      const waUrl = `https://wa.me/6285113592729?text=${encodedMessage}`;
      window.open(waUrl, "_blank");
    });
  }

  // 5. Gallery Category Filtering
  const galleryFilterBtns = document.querySelectorAll(".gallery-filter-btn");
  const galleryItems = document.querySelectorAll(".gallery-item");

  if (galleryFilterBtns.length > 0 && galleryItems.length > 0) {
    galleryFilterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        galleryFilterBtns.forEach((b) => {
          b.classList.remove("bg-brand-wine", "text-white", "shadow-sm");
          b.classList.add(
            "bg-white",
            "text-brand-charcoal",
            "border",
            "border-brand-sand",
          );
        });

        btn.classList.add("bg-brand-wine", "text-white", "shadow-sm");
        btn.classList.remove("bg-white", "text-brand-charcoal");

        const filter = btn.getAttribute("data-gallery-filter");

        galleryItems.forEach((item) => {
          if (filter === "all" || item.classList.contains(filter)) {
            item.style.display = "flex";
          } else {
            item.style.display = "none";
          }
        });
      });
    });
  }

  // 6. Real-time Spa Status (09.00 - 23.00 WITA)
  function checkSpaStatus() {
    const topStatusText = document.getElementById("top-status-text");
    const topStatusDot = document.getElementById("top-status-dot");
    if (!topStatusText || !topStatusDot) return;

    // Hitung waktu saat ini dalam WITA (UTC+8)
    const now = new Date();
    const utcTime = now.getTime() + now.getTimezoneOffset() * 60000;
    const witaTime = new Date(utcTime + 8 * 3600000);
    const hour = witaTime.getHours();
    const min = witaTime.getMinutes();
    const totalMin = hour * 60 + min;

    // Buka 09.00 - 23.00 WITA (540 menit s.d. 1380 menit)
    const isOpen = totalMin >= 9 * 60 && totalMin < 23 * 60;

    if (isOpen) {
      topStatusDot.className =
        "inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse";
      topStatusText.innerHTML =
        "✨ <strong>Buka Sekarang</strong> • 09.00 - 23.00 WITA";
    } else {
      topStatusDot.className = "inline-block w-2 h-2 rounded-full bg-rose-400";
      topStatusText.innerHTML =
        "🌙 <strong>Tutup Sementara</strong> • Buka Jam 09.00 WITA";
    }
  }

  checkSpaStatus();
  setInterval(checkSpaStatus, 30000);

  // Helper untuk testing simulasi jam di Console browser: testJam(23, 5)
  window.testJam = function (hour, min = 0) {
    const topStatusText = document.getElementById("top-status-text");
    const topStatusDot = document.getElementById("top-status-dot");
    if (!topStatusText || !topStatusDot) return;
    const totalMin = hour * 60 + min;
    const isOpen = totalMin >= 9 * 60 && totalMin < 23 * 60;
    const padMin = min < 10 ? "0" + min : min;
    if (isOpen) {
      topStatusDot.className =
        "inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse";
      topStatusText.innerHTML = `✨ <strong>Buka Sekarang</strong> (Simulasi ${hour}.${padMin} WITA) • 09.00 - 23.00 WITA`;
    } else {
      topStatusDot.className = "inline-block w-2 h-2 rounded-full bg-rose-400";
      topStatusText.innerHTML = `🌙 <strong>Tutup Sementara</strong> (Simulasi ${hour}.${padMin} WITA) • Buka Jam 09.00 WITA`;
    }
  };
});
