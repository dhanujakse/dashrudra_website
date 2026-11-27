import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import * as THREE from 'three';

// Route-specific 3D target coordinates for Camera, Star, Earth, and Curves
const ROUTE_CONFIGS = {
  '/': {
    camera: { x: 0, y: 1.2, z: 22 },
    star: { x: 0, y: 2.2, z: 0, scale: 1.0, rotY: 0, rotX: 0 },
    earth: { x: 0, y: -18.2, z: 0, scale: 1.0 },
    curves: { spread: 1.0, offsetY: 0, opacity: 0.7 }
  },
  '/purpose': {
    camera: { x: 3.2, y: 0.5, z: 20 },
    star: { x: -6.5, y: 1.0, z: 2, scale: 0.75, rotY: 0.4, rotX: 0.15 },
    earth: { x: -3.0, y: -19.5, z: -2, scale: 1.05 },
    curves: { spread: 0.6, offsetY: -1.5, opacity: 0.55 }
  },
  '/what-we-do': {
    camera: { x: 0, y: 3.5, z: 21 },
    star: { x: 0, y: 5.5, z: -2, scale: 0.7, rotY: 0.8, rotX: 0.3 },
    earth: { x: 0, y: -19.0, z: -1, scale: 1.0 },
    curves: { spread: 1.4, offsetY: 0.5, opacity: 0.65 }
  },
  '/solutions': {
    camera: { x: -2.5, y: 1.0, z: 21 },
    star: { x: 7.2, y: 2.8, z: -1, scale: 0.65, rotY: -0.4, rotX: 0.2 },
    earth: { x: 4.5, y: -18.8, z: -2, scale: 1.0 },
    curves: { spread: 1.8, offsetY: -1.0, opacity: 0.7 }
  },
  '/work': {
    camera: { x: 2.0, y: -0.5, z: 19 },
    star: { x: -7.0, y: 2.5, z: 1, scale: 0.6, rotY: 0.5, rotX: -0.2 },
    earth: { x: -4.0, y: -19.2, z: -1, scale: 0.95 },
    curves: { spread: 1.2, offsetY: -2.0, opacity: 0.5 }
  },
  '/about': {
    camera: { x: 0, y: 1.8, z: 21 },
    star: { x: 0, y: 3.5, z: 1, scale: 0.8, rotY: 0, rotX: 0.1 },
    earth: { x: 0, y: -18.5, z: 0, scale: 1.0 },
    curves: { spread: 0.8, offsetY: 0, opacity: 0.45 }
  },
  '/contact': {
    camera: { x: 0, y: 0.2, z: 19 },
    star: { x: 0, y: 1.8, z: -2, scale: 0.7, rotY: 0, rotX: 0 },
    earth: { x: 0, y: -19.5, z: -1, scale: 0.95 },
    curves: { spread: 1.1, offsetY: -1.5, opacity: 0.6 }
  }
};

const ThreeBackgroundWorld = () => {
  const containerRef = useRef(null);
  const location = useLocation();

  // Internal 3D object references
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const compassGroupRef = useRef(null);
  const earthGroupRef = useRef(null);
  const ribbonsGroupRef = useRef(null);
  const reqIdRef = useRef(null);

  // Dynamic lerp targets
  const currentTargetRef = useRef(ROUTE_CONFIGS['/']);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  // Update target coordinates whenever route path changes
  useEffect(() => {
    const path = location.pathname;
    const config = ROUTE_CONFIGS[path] || ROUTE_CONFIGS['/'];
    currentTargetRef.current = config;
  }, [location.pathname]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const width = window.innerWidth;
    const height = window.innerHeight;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 1.2, 22);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // 2. Sophisticated Lighting (Royal Navy, Electric Blue & Metallic Silver)
    const ambientLight = new THREE.AmbientLight(0x0a1c36, 1.4);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xe5edf8, 3.0);
    dirLight.position.set(6, 14, 12);
    scene.add(dirLight);

    const blueRimLight = new THREE.PointLight(0x318bff, 5.0, 60);
    blueRimLight.position.set(-10, -3, 8);
    scene.add(blueRimLight);

    const silverReflect = new THREE.PointLight(0xc6ced8, 2.8, 45);
    silverReflect.position.set(10, 4, 6);
    scene.add(silverReflect);

    // 3. Genuine 3D Earth with Procedural Shaders & Atmospheric Limb
    const createEarthTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 2048;
      canvas.height = 1024;
      const ctx = canvas.getContext('2d');

      // Deep oceanic gradient
      const oceanGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      oceanGrad.addColorStop(0, '#040d1a');
      oceanGrad.addColorStop(0.5, '#07162c');
      oceanGrad.addColorStop(1, '#020813');
      ctx.fillStyle = oceanGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Continent landmasses
      ctx.fillStyle = '#0e2946';
      const continents = [
        { x: 1060, y: 380, rx: 320, ry: 190 }, // Eurasia
        { x: 1020, y: 570, rx: 160, ry: 210 }, // Africa
        { x: 420, y: 360, rx: 200, ry: 160 },  // North America
        { x: 500, y: 640, rx: 140, ry: 220 },  // South America
        { x: 1350, y: 440, rx: 180, ry: 140 }, // Asia / India
        { x: 1480, y: 720, rx: 130, ry: 110 }  // Australia
      ];

      continents.forEach(c => {
        ctx.beginPath();
        for (let a = 0; a < Math.PI * 2; a += 0.08) {
          const noise = 1 + Math.sin(a * 7) * 0.14 + Math.cos(a * 13) * 0.07;
          const x = c.x + Math.cos(a) * c.rx * noise;
          const y = c.y + Math.sin(a) * c.ry * noise;
          if (a === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();
      });

      // Night City Light Clusters (Electric Blue & Pearl White)
      ctx.fillStyle = '#60a5fa';
      for (let i = 0; i < 700; i++) {
        const c = continents[Math.floor(Math.random() * continents.length)];
        const ang = Math.random() * Math.PI * 2;
        const rad = Math.random() * 0.72;
        const x = c.x + Math.cos(ang) * c.rx * rad;
        const y = c.y + Math.sin(ang) * c.ry * rad;
        ctx.beginPath();
        ctx.arc(x, y, Math.random() * 2.2 + 0.6, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = '#ffffff';
      for (let i = 0; i < 220; i++) {
        const c = continents[Math.floor(Math.random() * continents.length)];
        const ang = Math.random() * Math.PI * 2;
        const rad = Math.random() * 0.58;
        const x = c.x + Math.cos(ang) * c.rx * rad;
        const y = c.y + Math.sin(ang) * c.ry * rad;
        ctx.beginPath();
        ctx.arc(x, y, Math.random() * 1.6 + 0.4, 0, Math.PI * 2);
        ctx.fill();
      }

      const texture = new THREE.CanvasTexture(canvas);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.ClampToEdgeWrapping;
      return texture;
    };

    const earthGroup = new THREE.Group();
    earthGroupRef.current = earthGroup;

    const earthRadius = 16.5;
    const earthGeo = new THREE.SphereGeometry(earthRadius, 64, 64);
    const earthTex = createEarthTexture();

    const earthMat = new THREE.MeshStandardMaterial({
      map: earthTex,
      roughness: 0.62,
      metalness: 0.28,
      emissive: new THREE.Color(0x06152b),
      emissiveIntensity: 0.4
    });

    const earthMesh = new THREE.Mesh(earthGeo, earthMat);
    earthGroup.add(earthMesh);

    // Atmospheric Fresnel scattering limb
    const atmosphereGeo = new THREE.SphereGeometry(earthRadius * 1.025, 48, 48);
    const atmosphereMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vViewDir;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          vViewDir = normalize(-mvPosition.xyz);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        varying vec3 vViewDir;
        void main() {
          float intensity = pow(0.72 - dot(vNormal, vViewDir), 2.5);
          vec3 atmosphereColor = vec3(0.19, 0.55, 1.0); // #318BFF Electric Blue
          gl_FragColor = vec4(atmosphereColor, intensity * 0.88);
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
      depthWrite: false
    });
    const atmosphereMesh = new THREE.Mesh(atmosphereGeo, atmosphereMat);
    earthGroup.add(atmosphereMesh);

    earthGroup.position.set(0, -18.2, 0);
    earthGroup.rotation.x = 0.35;
    scene.add(earthGroup);

    // 4. Exact 8-Pointed Faceted Metallic 3D Compass-Star Logo
    const createCompassStar = () => {
      const group = new THREE.Group();

      const points = 8;
      const rPrimary = 3.4;
      const rSecondary = 2.05;
      const rInner = 0.75;
      const depth = 0.58;

      const positions = [];
      const normals = [];

      for (let i = 0; i < points; i++) {
        const angleTip = (i * Math.PI * 2) / points;
        const angleLeft = ((i - 0.5) * Math.PI * 2) / points;
        const angleRight = ((i + 0.5) * Math.PI * 2) / points;

        const isPrimary = i % 2 === 0;
        const rTip = isPrimary ? rPrimary : rSecondary;

        const tip = new THREE.Vector3(Math.cos(angleTip) * rTip, Math.sin(angleTip) * rTip, 0);
        const centerFront = new THREE.Vector3(0, 0, depth);
        const centerBack = new THREE.Vector3(0, 0, -depth);

        const leftPoint = new THREE.Vector3(Math.cos(angleLeft) * rInner, Math.sin(angleLeft) * rInner, 0);
        const rightPoint = new THREE.Vector3(Math.cos(angleRight) * rInner, Math.sin(angleRight) * rInner, 0);

        const addTriangle = (p1, p2, p3) => {
          positions.push(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z, p3.x, p3.y, p3.z);
          const vA = new THREE.Vector3().subVectors(p2, p1);
          const vB = new THREE.Vector3().subVectors(p3, p1);
          const norm = new THREE.Vector3().crossVectors(vA, vB).normalize();
          normals.push(norm.x, norm.y, norm.z, norm.x, norm.y, norm.z, norm.x, norm.y, norm.z);
        };

        addTriangle(centerFront, tip, leftPoint);
        addTriangle(centerFront, rightPoint, tip);
        addTriangle(centerBack, leftPoint, tip);
        addTriangle(centerBack, tip, rightPoint);
      }

      const starGeometry = new THREE.BufferGeometry();
      starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
      starGeometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));

      const starMaterial = new THREE.MeshStandardMaterial({
        color: 0xe2e8f0,
        metalness: 0.95,
        roughness: 0.18,
        emissive: new THREE.Color(0x10264a),
        emissiveIntensity: 0.25
      });

      const starMesh = new THREE.Mesh(starGeometry, starMaterial);
      group.add(starMesh);

      // Central radiant flare
      const flareCanvas = document.createElement('canvas');
      flareCanvas.width = 128;
      flareCanvas.height = 128;
      const fCtx = flareCanvas.getContext('2d');
      const grad = fCtx.createRadialGradient(64, 64, 0, 64, 64, 64);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.2, 'rgba(49, 139, 255, 0.85)');
      grad.addColorStop(0.6, 'rgba(36, 91, 158, 0.25)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      fCtx.fillStyle = grad;
      fCtx.fillRect(0, 0, 128, 128);

      const flareTexture = new THREE.CanvasTexture(flareCanvas);
      const flareMat = new THREE.SpriteMaterial({
        map: flareTexture,
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: 0.92
      });
      const flareSprite = new THREE.Sprite(flareMat);
      flareSprite.scale.set(4.4, 4.4, 1);
      group.add(flareSprite);

      return group;
    };

    const compassStar = createCompassStar();
    compassStar.position.set(0, 2.2, 0);
    compassGroupRef.current = compassStar;
    scene.add(compassStar);

    // 5. Flowing 3D Metallic Curves
    const ribbonsGroup = new THREE.Group();
    ribbonsGroupRef.current = ribbonsGroup;

    const createFlowingCurve = (offsetY, colorHex, opacityVal, speedVal) => {
      const curvePoints = [];
      const numPoints = 60;
      for (let i = 0; i <= numPoints; i++) {
        const t = (i / numPoints) * 2 - 1;
        const x = t * 26;
        const y = Math.sin(t * 3.0) * 2.8 + offsetY;
        const z = Math.cos(t * 2.4) * 3 - 2;
        curvePoints.push(new THREE.Vector3(x, y, z));
      }

      const curve = new THREE.CatmullRomCurve3(curvePoints);
      const tubeGeo = new THREE.TubeGeometry(curve, 100, 0.09, 8, false);
      const tubeMat = new THREE.MeshStandardMaterial({
        color: colorHex,
        metalness: 0.92,
        roughness: 0.18,
        transparent: true,
        opacity: opacityVal,
        emissive: new THREE.Color(colorHex),
        emissiveIntensity: 0.35
      });

      const tubeMesh = new THREE.Mesh(tubeGeo, tubeMat);
      tubeMesh.userData = { speed: speedVal, baseY: offsetY };
      return tubeMesh;
    };

    const curve1 = createFlowingCurve(-2.5, 0x318bff, 0.7, 0.0018); // Electric Blue
    const curve2 = createFlowingCurve(-4.0, 0xc6ced8, 0.55, 0.0012); // Metallic Silver
    const curve3 = createFlowingCurve(1.5, 0x245b9e, 0.6, 0.0015);  // Steel Blue
    const curve4 = createFlowingCurve(-6.0, 0x7cb4ff, 0.45, 0.002);  // Luminous Blue

    ribbonsGroup.add(curve1);
    ribbonsGroup.add(curve2);
    ribbonsGroup.add(curve3);
    ribbonsGroup.add(curve4);
    scene.add(ribbonsGroup);

    // 6. Pointer & Resize Listeners
    const handleMouseMove = (e) => {
      mouseRef.current.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.targetY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    // 7. Continuous Animation Loop with Smooth Route Lerp
    let lastTime = performance.now();

    const animate = (currentTime) => {
      reqIdRef.current = requestAnimationFrame(animate);
      if (location.pathname === '/') return;
      const delta = (currentTime - lastTime) * 0.001 || 0.016;
      lastTime = currentTime;
      const elapsedTime = currentTime * 0.001;

      // Smooth pointer lerp
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      const target = currentTargetRef.current;

      // Smooth Camera Transitions across Routes
      camera.position.x += (target.camera.x + mouseRef.current.x * 0.6 - camera.position.x) * 0.045;
      camera.position.y += (target.camera.y + mouseRef.current.y * 0.4 - camera.position.y) * 0.045;
      camera.position.z += (target.camera.z - camera.position.z) * 0.045;
      camera.lookAt(0, 0, 0);

      // Smooth Earth Transitions
      if (earthGroupRef.current) {
        if (!prefersReducedMotion) {
          earthGroupRef.current.rotation.y = elapsedTime * 0.04;
        }
        earthGroupRef.current.position.x += (target.earth.x - earthGroupRef.current.position.x) * 0.045;
        earthGroupRef.current.position.y += (target.earth.y - earthGroupRef.current.position.y) * 0.045;
        earthGroupRef.current.position.z += (target.earth.z - earthGroupRef.current.position.z) * 0.045;
      }

      // Smooth Compass-Star Transitions & Subtle Floating
      if (compassGroupRef.current) {
        if (!prefersReducedMotion) {
          compassGroupRef.current.rotation.z = Math.sin(elapsedTime * 0.4) * 0.04;
          compassGroupRef.current.rotation.y += ((target.star.rotY + Math.sin(elapsedTime * 0.5) * 0.1 + mouseRef.current.x * 0.12) - compassGroupRef.current.rotation.y) * 0.05;
          compassGroupRef.current.rotation.x += ((target.star.rotX + Math.cos(elapsedTime * 0.4) * 0.06 + mouseRef.current.y * 0.08) - compassGroupRef.current.rotation.x) * 0.05;
        }

        const floatOffset = prefersReducedMotion ? 0 : Math.sin(elapsedTime * 0.8) * 0.12;
        compassGroupRef.current.position.x += (target.star.x - compassGroupRef.current.position.x) * 0.05;
        compassGroupRef.current.position.y += ((target.star.y + floatOffset) - compassGroupRef.current.position.y) * 0.05;
        compassGroupRef.current.position.z += (target.star.z - compassGroupRef.current.position.z) * 0.05;

        const currentScale = compassGroupRef.current.scale.x;
        const newScale = currentScale + (target.star.scale - currentScale) * 0.05;
        compassGroupRef.current.scale.set(newScale, newScale, newScale);
      }

      // Smooth Flowing Curves Animation & Morphing
      if (ribbonsGroupRef.current && !prefersReducedMotion) {
        ribbonsGroupRef.current.children.forEach((tube, idx) => {
          tube.rotation.y = Math.sin(elapsedTime * 0.25 + idx) * 0.04;
          tube.position.y = (tube.userData.baseY + target.curves.offsetY) + Math.sin(elapsedTime * 0.5 + idx * 0.6) * 0.2;
        });
        ribbonsGroupRef.current.position.x = mouseRef.current.x * 0.5;

        const curSpread = ribbonsGroupRef.current.scale.x;
        const newSpread = curSpread + (target.curves.spread - curSpread) * 0.045;
        ribbonsGroupRef.current.scale.set(newSpread, 1, 1);
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(reqIdRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (rendererRef.current && rendererRef.current.domElement) {
        rendererRef.current.dispose();
        if (container.contains(rendererRef.current.domElement)) {
          container.removeChild(rendererRef.current.domElement);
        }
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 1,
        overflow: 'hidden',
        display: location.pathname === '/' ? 'none' : 'block'
      }}
      aria-hidden="true"
    />
  );
};

export default ThreeBackgroundWorld;
