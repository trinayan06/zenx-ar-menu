// three-hero.js
document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById('hero-3d-canvas');
  if (!canvas) return;

  // Scene, Camera, Renderer
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.z = 5;

  const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;

  // Icosahedron Object
  const geometry = new THREE.IcosahedronGeometry(1.8, 0);
  
  // Standard Material
  const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.9,
    roughness: 0.1,
    flatShading: true
  });
  
  // Wireframe Material Overlay
  const wireframeMaterial = new THREE.MeshBasicMaterial({
    color: 0xff3333,
    wireframe: true,
    transparent: true,
    opacity: 0.15
  });

  const icosahedron = new THREE.Mesh(geometry, material);
  const wireframe = new THREE.Mesh(geometry, wireframeMaterial);
  
  // Group them
  const objectGroup = new THREE.Group();
  objectGroup.add(icosahedron);
  objectGroup.add(wireframe);
  scene.add(objectGroup);

  // Initial Position
  let targetX = window.innerWidth < 768 ? 0 : 2.5;
  let targetScale = window.innerWidth < 768 ? 0.7 : 1.0;
  objectGroup.position.set(targetX, 0, 0);
  objectGroup.scale.set(targetScale, targetScale, targetScale);
  if (window.innerWidth < 768) {
    canvas.style.opacity = '0.6';
  }

  // Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const pointLight1 = new THREE.PointLight(0xff3333, 2);
  pointLight1.position.set(2, 3, 4);
  scene.add(pointLight1);

  const pointLight2 = new THREE.PointLight(0xffffff, 1);
  pointLight2.position.set(-3, -2, -2);
  scene.add(pointLight2);

  // Particles
  const particlesGeometry = new THREE.BufferGeometry();
  const particlesCount = 80;
  const posArray = new Float32Array(particlesCount * 3);

  for(let i = 0; i < particlesCount * 3; i+=3) {
    const r = 4 * Math.cbrt(Math.random());
    const theta = Math.random() * 2 * Math.PI;
    const phi = Math.acos(2 * Math.random() - 1);
    
    posArray[i] = r * Math.sin(phi) * Math.cos(theta);
    posArray[i+1] = r * Math.sin(phi) * Math.sin(theta);
    posArray[i+2] = r * Math.cos(phi);
  }

  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
  const particlesMaterial = new THREE.PointsMaterial({
    color: 0xff3333,
    size: 0.03,
    transparent: true,
    opacity: 0.5
  });
  
  const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particlesMesh);

  // Animation Variables
  let targetRotX = 0;
  let targetRotY = 0;
  let currentRotX = 0;
  let currentRotY = 0;
  let isBursting = false;
  let burstScale = targetScale;
  let burstVelocity = 0;

  // Event Listeners
  window.addEventListener('mousemove', (e) => {
    targetRotY = ((e.clientX / window.innerWidth) - 0.5) * 0.8;
    targetRotX = ((e.clientY / window.innerHeight) - 0.5) * 0.4;
  });

  if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', (e) => {
      if (e.gamma && e.beta) {
        targetRotY = (e.gamma / 90) * 0.8;
        targetRotX = (e.beta / 90) * 0.4;
      }
    });
  }

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);

    if (window.innerWidth < 768) {
      targetX = 0;
      targetScale = 0.7;
      canvas.style.opacity = '0.6';
    } else {
      targetX = 2.5;
      targetScale = 1.0;
      canvas.style.opacity = '1.0';
    }
    objectGroup.position.x = targetX;
    if (!isBursting) {
      burstScale = targetScale;
      objectGroup.scale.set(targetScale, targetScale, targetScale);
    }
  });

  // Click Burst
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(icosahedron);
    
    if (intersects.length > 0) {
      isBursting = true;
      burstVelocity = 0.15; // Initial burst push (spring)
      // Hard set scale to 1.3 instantly, then let spring bring it down?
      // "scale up to 1.3 in 0.1s then back to 1.0 in 0.3s using a spring easing"
      burstScale = 1.3;
    }
  });

  function animate() {
    requestAnimationFrame(animate);

    const time = Date.now() * 0.001;

    // Parallax lerp
    currentRotY += (targetRotY - currentRotY) * 0.05;
    currentRotX += (targetRotX - currentRotX) * 0.05;

    // Constant rotation + parallax
    objectGroup.rotation.y = time * 0.2 + currentRotY;
    objectGroup.rotation.x = time * 0.06 + currentRotX;

    // Floating bob
    objectGroup.position.y = Math.sin(time) * 0.15;

    // Particles rotation
    particlesMesh.rotation.y -= 0.0005;

    // Spring Animation for Burst
    if (isBursting) {
      const tension = 0.15;
      const friction = 0.8;
      
      burstVelocity += (targetScale - burstScale) * tension;
      burstVelocity *= friction;
      burstScale += burstVelocity;
      
      objectGroup.scale.set(burstScale, burstScale, burstScale);
      
      if (Math.abs(burstVelocity) < 0.001 && Math.abs(burstScale - targetScale) < 0.001) {
        burstScale = targetScale;
        isBursting = false;
      }
    }

    renderer.render(scene, camera);
  }

  animate();
});
