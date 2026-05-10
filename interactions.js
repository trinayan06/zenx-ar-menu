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
    if(match) {
        counter.innerText = '0' + (match[2] || '');
        counter.setAttribute('data-target', text);
    }
    counterObserver2.observe(counter);
  });

// ── PORTFOLIO INFINITE AUTO-SCROLL & DRAG ──
const slider = document.querySelector('#portfolio-carousel');
const track = document.querySelector('#portfolio-track');
const originalGroup = document.querySelector('#portfolio-group-original');

if (slider && track && originalGroup) {
  // Clone cards for infinite loop
  const clonedGroup = originalGroup.cloneNode(true);
  clonedGroup.id = 'portfolio-group-cloned';
  track.appendChild(clonedGroup);

  let isDown = false;
  let startX;
  let scrollLeft;
  let velX = 0;
  let momentumID;
  let resumeTimeout;

  const pauseAutoScroll = () => {
    track.classList.add('is-paused');
    clearTimeout(resumeTimeout);
  };

  const resumeAutoScrollAfterDelay = () => {
    clearTimeout(resumeTimeout);
    resumeTimeout = setTimeout(() => {
      track.classList.remove('is-paused');
    }, 2000);
  };

  slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.style.cursor = 'grabbing';
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
    cancelAnimationFrame(momentumID);
    pauseAutoScroll();
  });
  
  slider.addEventListener('mouseleave', () => {
    if (isDown) {
      isDown = false;
      slider.style.cursor = 'grab';
      resumeAutoScrollAfterDelay();
    }
  });
  
  slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.style.cursor = 'grab';
    beginMomentum();
    resumeAutoScrollAfterDelay();
  });
  
  slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2; // scroll speed
    let prevScrollLeft = slider.scrollLeft;
    slider.scrollLeft = scrollLeft - walk;
    velX = slider.scrollLeft - prevScrollLeft;
  });

  // Touch events for mobile pause
  slider.addEventListener('touchstart', pauseAutoScroll, {passive: true});
  slider.addEventListener('touchend', resumeAutoScrollAfterDelay, {passive: true});

  function beginMomentum() {
    momentumID = requestAnimationFrame(momentumLoop);
  }

  function momentumLoop() {
    slider.scrollLeft += velX;
    velX *= 0.95; // friction
    if (Math.abs(velX) > 0.5) {
      momentumID = requestAnimationFrame(momentumLoop);
    }
  }

  // Navigation Arrows
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  
  if (prevBtn && nextBtn) {
    prevBtn.addEventListener('click', () => {
      pauseAutoScroll();
      slider.scrollBy({ left: -344, behavior: 'smooth' });
      resumeAutoScrollAfterDelay();
    });
    nextBtn.addEventListener('click', () => {
      pauseAutoScroll();
      slider.scrollBy({ left: 344, behavior: 'smooth' });
      resumeAutoScrollAfterDelay();
    });
  }
}
});
