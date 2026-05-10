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

// ── 3D HERO INTERACTIVE OBJECT (THREE.JS) ──
function initHero3D() {
  const canvas = document.getElementById('hero-3d-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.z = 5;

  const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;

  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const pointLight1 = new THREE.PointLight(0xff3333, 2);
  pointLight1.position.set(2, 3, 4);
  scene.add(pointLight1);

  const pointLight2 = new THREE.PointLight(0xffffff, 1);
  pointLight2.position.set(-3, -2, -2);
  scene.add(pointLight2);

  // Group for the main object to handle parallax & floating
  const objectGroup = new THREE.Group();
  scene.add(objectGroup);

  // Icosahedron
  const geometry = new THREE.IcosahedronGeometry(1.8, 0);
  const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.9,
    roughness: 0.1,
    flatShading: true
  });
  const mesh = new THREE.Mesh(geometry, material);
  objectGroup.add(mesh);

  // Wireframe overlay
  const wireMat = new THREE.MeshBasicMaterial({
    color: 0xff3333,
    wireframe: true,
    transparent: true,
    opacity: 0.15
  });
  const wireMesh = new THREE.Mesh(geometry, wireMat);
  wireMesh.scale.set(1.005, 1.005, 1.005);
  objectGroup.add(wireMesh);

  // Particles
  const particlesGeo = new THREE.BufferGeometry();
  const particlesCount = 80;
  const posArray = new Float32Array(particlesCount * 3);
  for(let i=0; i<particlesCount*3; i+=3) {
    const u = Math.random();
    const v = Math.random();
    const theta = u * 2.0 * Math.PI;
    const phi = Math.acos(2.0 * v - 1.0);
    const r = Math.cbrt(Math.random()) * 4;
    posArray[i] = r * Math.sin(phi) * Math.cos(theta);
    posArray[i+1] = r * Math.sin(phi) * Math.sin(theta);
    posArray[i+2] = r * Math.cos(phi);
  }
  particlesGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
  const particlesMat = new THREE.PointsMaterial({
    size: 0.03,
    color: 0xff3333,
    transparent: true,
    opacity: 0.5
  });
  const particlesMesh = new THREE.Points(particlesGeo, particlesMat);
  scene.add(particlesMesh);

  // Interaction State
  let mouseX = 0;
  let mouseY = 0;
  let targetRotationX = 0;
  let targetRotationY = 0;
  let isMobile = window.innerWidth < 768;

  function updateLayout() {
    isMobile = window.innerWidth < 768;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    if (isMobile) {
      objectGroup.position.x = 0;
      objectGroup.scale.set(0.7, 0.7, 0.7);
      canvas.style.opacity = '0.6';
    } else {
      objectGroup.position.x = 2.5;
      objectGroup.scale.set(1, 1, 1);
      canvas.style.opacity = '1';
    }
  }
  window.addEventListener('resize', updateLayout);
  updateLayout();

  // Mouse move
  document.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    targetRotationY = mouseX * 0.4;
    targetRotationX = -mouseY * 0.2; 
  });

  // Gyroscope
  if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', (e) => {
      if (!isMobile) return;
      if (e.gamma !== null && e.beta !== null) {
        targetRotationY = (e.gamma / 90) * 0.4;
        targetRotationX = ((e.beta - 45) / 90) * 0.2; 
      }
    });
  }

  // Click animation (Raycaster)
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();
  let clickAnimTime = 0;
  let isClickAnimating = false;

  canvas.addEventListener('click', (e) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(mesh);
    if (intersects.length > 0 && !isClickAnimating) {
      isClickAnimating = true;
      clickAnimTime = Date.now();
    }
  });

  function animate() {
    requestAnimationFrame(animate);

    // Constant slow rotation
    mesh.rotation.y += 0.003;
    mesh.rotation.x += 0.001;
    wireMesh.rotation.copy(mesh.rotation);

    // Particles rotation
    particlesMesh.rotation.y += 0.0005;

    // Mouse Parallax & Gyro (lerp)
    objectGroup.rotation.y += (targetRotationY - objectGroup.rotation.y) * 0.05;
    objectGroup.rotation.x += (targetRotationX - objectGroup.rotation.x) * 0.05;

    // Floating bob
    let bobY = Math.sin(Date.now() * 0.001) * 0.15;

    // Click burst animation
    let scaleModifier = 1;
    if (isClickAnimating) {
      const elapsed = Date.now() - clickAnimTime;
      if (elapsed < 100) {
        // Scale up to 1.3
        const t = elapsed / 100;
        scaleModifier = 1 + 0.3 * Math.sin(t * Math.PI / 2);
      } else if (elapsed < 400) {
        // Scale down to 1.0
        const t = (elapsed - 100) / 300;
        scaleModifier = 1.3 - 0.3 * Math.sin(t * Math.PI / 2);
      } else {
        isClickAnimating = false;
        scaleModifier = 1;
      }
      
      const baseScale = isMobile ? 0.7 : 1.0;
      objectGroup.scale.set(baseScale * scaleModifier, baseScale * scaleModifier, baseScale * scaleModifier);
    }

    objectGroup.position.y = bobY;

    renderer.render(scene, camera);
  }
  animate();
}

initHero3D();
