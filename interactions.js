// interactions.js
document.addEventListener("DOMContentLoaded", () => {
  // 1. 3D Tilt Effect for Cards
  const cards = document.querySelectorAll('.step-card, .feature-card, .price-card, .founder-card, .signup-card');
  
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

  // 7. Auto-split Hero Heading Text for Interactive Typography
  const splitTextElements = document.querySelectorAll('.hero-split-text');
  
  splitTextElements.forEach(el => {
    const text = el.innerText;
    el.innerHTML = ''; // Clear existing content
    
    // Split into characters, keeping spaces intact
    const chars = text.split('');
    let charIndex = 0;
    
    chars.forEach(char => {
      if (char === ' ') {
        // Just append a space without a span so it wraps naturally
        el.appendChild(document.createTextNode(' '));
      } else {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.setProperty('--i', ++charIndex);
        el.appendChild(span);
      }
    });
  });
});
