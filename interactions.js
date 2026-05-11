// interactions.js
document.addEventListener("DOMContentLoaded", () => {
  // 1. 3D Tilt Effect for Cards
  const cards = document.querySelectorAll('.step-card, .feature-card, .price-card, .founder-card, .signup-card, .service-card, .why-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', handleTilt);
    card.addEventListener('mouseleave', resetTilt);
  });

  function handleTilt(e) {
    const card = e.currentTarget;
    const cardRect = card.getBoundingClientRect();
    const x = e.clientX - cardRect.left;
    const y = e.clientY - cardRect.top;

    const centerX = cardRect.width / 2;
    const centerY = cardRect.height / 2;

    const maxTilt = 10;
    const tiltX = ((y - centerY) / centerY) * -maxTilt;
    const tiltY = ((x - centerX) / centerX) * maxTilt;

    card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
    card.style.transition = 'transform 0.1s ease-out';
    card.style.zIndex = '10';
  }

  function resetTilt(e) {
    const card = e.currentTarget;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    card.style.transition = 'transform 0.5s ease-out';
    card.style.zIndex = '1';
  }

  // 4. Animated Counter
  const counters = document.querySelectorAll('.stat-num');
  const speed = 200;

  const animateCounterNew = (counter) => {
    const targetText = counter.getAttribute('data-target') || counter.innerText;
    const targetMatch = targetText.match(/([\d.]+)(.*)/);
    if (!targetMatch) return;

    const target = parseFloat(targetMatch[1]);
    const suffix = targetMatch[2] || '';
    const isFloat = targetText.includes('.');

    let count = 0;
    const inc = target / speed;

    const updateCount = () => {
      count += inc;
      if (count < target) {
        counter.innerText = (isFloat ? count.toFixed(1) : Math.ceil(count)) + suffix;
        requestAnimationFrame(updateCount);
      } else {
        counter.innerText = targetText;
      }
    };

    updateCount();
  };

  const counterObserver2 = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounterNew(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => {
    const text = counter.innerText;
    const match = text.match(/([\d.]+)(.*)/);
    if (match) {
      counter.innerText = '0' + (match[2] || '');
      counter.setAttribute('data-target', text);
    }
    counterObserver2.observe(counter);
  });

  // ── INFINITE AUTO SCROLL PORTFOLIO ──
  const track = document.querySelector('#portfolio-carousel');

  if (track) {
    // Clone all cards and append to make infinite loop
    const originalHTML = track.innerHTML;
    track.innerHTML = originalHTML + originalHTML + originalHTML; // triple for seamless loop

    let scrollPos = 0;
    let speed = 1; // pixels per frame
    let isPaused = false;
    let isDragging = false;
    let startX = 0;
    let startScroll = 0;

    // Get the width of ONE set of cards (original set)
    function getSetWidth() {
      const allCards = track.querySelectorAll('.port-card');
      const totalCards = allCards.length;
      const oneSetCount = totalCards / 3;
      let width = 0;
      for (let i = 0; i < oneSetCount; i++) {
        width += allCards[i].offsetWidth;
      }
      // Add gap between cards
      const gap = parseInt(window.getComputedStyle(track).gap) || 24;
      width += gap * oneSetCount; // gap after each card in the set
      return width;
    }

    // Auto scroll loop
    function autoScroll() {
      if (!isPaused && !isDragging) {
        scrollPos += speed;
        const setWidth = getSetWidth();
        // Reset to start when we've scrolled one full set
        if (scrollPos >= setWidth) {
          scrollPos -= setWidth;
        }
        if (scrollPos < 0) {
          scrollPos += setWidth;
        }
        track.style.transform = 'translateX(-' + scrollPos + 'px)';
      }
      requestAnimationFrame(autoScroll);
    }

    // Pause on hover
    track.addEventListener('mouseenter', () => { isPaused = true; });
    track.addEventListener('mouseleave', () => {
      if (!isDragging) {
        isPaused = false;
      }
    });

    // Drag to scroll manually (mouse)
    track.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.pageX;
      startScroll = scrollPos;
      track.style.cursor = 'grabbing';
      e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const diff = startX - e.pageX;
      scrollPos = startScroll + diff;
      const setWidth = getSetWidth();
      // Wrap around
      if (scrollPos < 0) scrollPos = setWidth + scrollPos;
      if (scrollPos >= setWidth) scrollPos = scrollPos - setWidth;
      track.style.transform = 'translateX(-' + scrollPos + 'px)';
    });

    document.addEventListener('mouseup', () => {
      if (!isDragging) return;
      isDragging = false;
      track.style.cursor = 'grab';
      isPaused = false;
    });

    // Click vs drag detection for CTA card
    track.addEventListener('click', (e) => {
      // If mouse moved significantly, prevent the click
      if (Math.abs(startX - e.pageX) > 5) {
        e.preventDefault();
        e.stopPropagation();
      }
    }, true);

    // Touch support for mobile
    let touchStartX = 0;
    let touchStartScroll = 0;
    track.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].pageX;
      touchStartScroll = scrollPos;
      isPaused = true;
    }, { passive: true });

    track.addEventListener('touchmove', (e) => {
      const diff = touchStartX - e.touches[0].pageX;
      scrollPos = touchStartScroll + diff;
      const setWidth = getSetWidth();
      if (scrollPos < 0) scrollPos = setWidth + scrollPos;
      if (scrollPos >= setWidth) scrollPos = scrollPos - setWidth;
      track.style.transform = 'translateX(-' + scrollPos + 'px)';
    }, { passive: true });

    track.addEventListener('touchend', () => { isPaused = false; });

    // Navigation Arrows
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    if (prevBtn && nextBtn) {
      prevBtn.addEventListener('click', () => {
        scrollPos -= 344;
        const setWidth = getSetWidth();
        if (scrollPos < 0) scrollPos = setWidth + scrollPos;
        track.style.transition = 'transform 0.4s ease';
        track.style.transform = 'translateX(-' + scrollPos + 'px)';
        setTimeout(() => { track.style.transition = 'none'; }, 400);
      });
      nextBtn.addEventListener('click', () => {
        scrollPos += 344;
        const setWidth = getSetWidth();
        if (scrollPos >= setWidth) scrollPos = scrollPos - setWidth;
        track.style.transition = 'transform 0.4s ease';
        track.style.transform = 'translateX(-' + scrollPos + 'px)';
        setTimeout(() => { track.style.transition = 'none'; }, 400);
      });
    }

    // Start the infinite scroll
    requestAnimationFrame(autoScroll);
  }
});
