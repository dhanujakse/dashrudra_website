import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const HeroScene3D = ({ scrollProgress = 0 }) => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const compassGroupRef = useRef(null);
  const earthGroupRef = useRef(null);
  const ribbonsGroupRef = useRef(null);
  const reqIdRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 24);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // ==========================================
    // 1. LIGHTING (Atmospheric Blue & Metallic Silver)
    // ==========================================
    const ambientLight = new THREE.AmbientLight(0x0c1e3d, 1.2);
    scene.add(ambientLight);

    // Top key directional light (Silver specular highlights)
    const dirLight = new THREE.DirectionalLight(0xdbe6f5, 2.8);
    dirLight.position.set(5, 12, 10);
    scene.add(dirLight);

    // Electric blue rim light for atmospheric edge
    const blueRimLight = new THREE.PointLight(0x318bff, 4.5, 50);
    blueRimLight.position.set(-8, -4, 6);
    scene.add(blueRimLight);

    const bottomGlow = new THREE.PointLight(0x245b9e, 3, 40);
    bottomGlow.position.set(0, -10, 8);
    scene.add(bottomGlow);

    // ==========================================
    // 2. PROCEDURAL EARTH TEXTURES (No broken assets)
    // ==========================================
    const createEarthTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 2048;
      canvas.height = 1024;
      const ctx = canvas.getContext('2d');

      // Deep ocean gradient
      const oceanGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      oceanGrad.addColorStop(0, '#040d1a');
      oceanGrad.addColorStop(0.5, '#07162c');
      oceanGrad.addColorStop(1, '#020813');
      ctx.fillStyle = oceanGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Continent shapes (Procedural realistic organic blobs & archipelagos)
      ctx.fillStyle = '#0f2b48';
      const continents = [
        // Eurasia & Africa
        { x: 1050, y: 380, rx: 320, ry: 190 },
        { x: 1020, y: 560, rx: 160, ry: 210 },
        // Americas
        { x: 420, y: 360, rx: 200, ry: 160 },
        { x: 500, y: 640, rx: 140, ry: 220 },
        // Asia / India subcontinent & Australasia
        { x: 1350, y: 440, rx: 170, ry: 140 },
        { x: 1480, y: 720, rx: 130, ry: 110 }
      ];

      continents.forEach(c => {
        ctx.beginPath();
        for (let a = 0; a < Math.PI * 2; a += 0.08) {
          const noise = 1 + Math.sin(a * 7) * 0.15 + Math.cos(a * 13) * 0.08;
          const x = c.x + Math.cos(a) * c.rx * noise;
          const y = c.y + Math.sin(a) * c.ry * noise;
          if (a === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();
      });

      // City light clusters on continents
      ctx.fillStyle = '#60a5fa';
      for (let i = 0; i < 650; i++) {
        const c = continents[Math.floor(Math.random() * continents.length)];
        const ang = Math.random() * Math.PI * 2;
        const rad = Math.random() * 0.75;
        const x = c.x + Math.cos(ang) * c.rx * rad;
        const y = c.y + Math.sin(ang) * c.ry * rad;
        const size = Math.random() * 2.2 + 0.6;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Bright major tech hubs (golden-white pinpoints)
      ctx.fillStyle = '#ffffff';
      for (let i = 0; i < 180; i++) {
        const c = continents[Math.floor(Math.random() * continents.length)];
        const ang = Math.random() * Math.PI * 2;
        const rad = Math.random() * 0.6;
        const x = c.x + Math.cos(ang) * c.rx * rad;
        const y = c.y + Math.sin(ang) * c.ry * rad;
        ctx.beginPath();
        ctx.arc(x, y, Math.random() * 1.5 + 0.5, 0, Math.PI * 2);
        ctx.fill();
      }

      const texture = new THREE.CanvasTexture(canvas);
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.ClampToEdgeWrapping;
      return texture;
    };

    // ==========================================
    // 3. 3D ROTATING EARTH (Bottom Horizon)
    // ==========================================
    const earthGroup = new THREE.Group();
    earthGroupRef.current = earthGroup;

    // Positioned so the top curvature creates the majestic Earth horizon
    const earthRadius = 16.5;
    const earthGeo = new THREE.SphereGeometry(earthRadius, 64, 64);
    const earthTex = createEarthTexture();

    const earthMat = new THREE.MeshStandardMaterial({
      map: earthTex,
      roughness: 0.65,
      metalness: 0.25,
      emissive: new THREE.Color(0x051329),
      emissiveIntensity: 0.4
    });

    const earthMesh = new THREE.Mesh(earthGeo, earthMat);
    earthGroup.add(earthMesh);

    // Blue atmospheric glow shell (Fresnel inversion)
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
          float intensity = pow(0.72 - dot(vNormal, vViewDir), 2.4);
          vec3 atmosphereColor = vec3(0.19, 0.55, 1.0); // #318BFF Electric Blue
          gl_FragColor = vec4(atmosphereColor, intensity * 0.85);
        }
      `,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true,
      depthWrite: false
    });
    const atmosphereMesh = new THREE.Mesh(atmosphereGeo, atmosphereMat);
    earthGroup.add(atmosphereMesh);

    // Initial position: curvature peeks from below the center
    earthGroup.position.set(0, -18.2, 0);
    earthGroup.rotation.x = 0.35;
    scene.add(earthGroup);

    // ==========================================
    // 4. 3D COMPASS-STAR (Faceted Metallic Star)
    // ==========================================
    const createCompassStar = () => {
      const group = new THREE.Group();

      // Geometry for 8-pointed multifaceted star
      // 4 primary points (cardinal: N, S, E, W) - length 3.4
      // 4 secondary points (diagonal: NE, NW, SE, SW) - length 2.1
      const points = 8;
      const rPrimary = 3.4;
      const rSecondary = 2.0;
      const rInner = 0.75;
      const depth = 0.55;

      const positions = [];
      const normals = [];

      // Build facets for front side
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

        // Helper to add triangular facet with proper normal
        const addTriangle = (p1, p2, p3) => {
          positions.push(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z, p3.x, p3.y, p3.z);
          const vA = new THREE.Vector3().subVectors(p2, p1);
          const vB = new THREE.Vector3().subVectors(p3, p1);
          const norm = new THREE.Vector3().crossVectors(vA, vB).normalize();
          normals.push(norm.x, norm.y, norm.z, norm.x, norm.y, norm.z, norm.x, norm.y, norm.z);
        };

        // Front Left facet
        addTriangle(centerFront, tip, leftPoint);
        // Front Right facet
        addTriangle(centerFront, rightPoint, tip);
        // Back Left facet
        addTriangle(centerBack, leftPoint, tip);
        // Back Right facet
        addTriangle(centerBack, tip, rightPoint);
      }

      const starGeometry = new THREE.BufferGeometry();
      starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
      starGeometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));

      // Metallic silver with subtle steel blue specular reflections
      const starMaterial = new THREE.MeshStandardMaterial({
        color: 0xe2e8f0,
        metalness: 0.95,
        roughness: 0.18,
        envMapIntensity: 1.5,
        emissive: new THREE.Color(0x10264a),
        emissiveIntensity: 0.2
      });

      const starMesh = new THREE.Mesh(starGeometry, starMaterial);
      group.add(starMesh);

      // Central radiant lens glow flare
      const flareCanvas = document.createElement('canvas');
      flareCanvas.width = 128;
      flareCanvas.height = 128;
      const fCtx = flareCanvas.getContext('2d');
      const grad = fCtx.createRadialGradient(64, 64, 0, 64, 64, 64);
      grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      grad.addColorStop(0.2, 'rgba(49, 139, 255, 0.8)');
      grad.addColorStop(0.6, 'rgba(36, 91, 158, 0.25)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      fCtx.fillStyle = grad;
      fCtx.fillRect(0, 0, 128, 128);

      const flareTexture = new THREE.CanvasTexture(flareCanvas);
      const flareMat = new THREE.SpriteMaterial({
        map: flareTexture,
        blending: THREE.AdditiveBlending,
        transparent: true,
        opacity: 0.9
      });
      const flareSprite = new THREE.Sprite(flareMat);
      flareSprite.scale.set(4.2, 4.2, 1);
      group.add(flareSprite);

      return group;
    };

    const compassStar = createCompassStar();
    compassStar.position.set(0, 2.5, 0);
    compassGroupRef.current = compassStar;
    scene.add(compassStar);

    // ==========================================
    // 5. FLOWING BLUE-SILVER METALLIC CURVES
    // ==========================================
    const ribbonsGroup = new THREE.Group();
    ribbonsGroupRef.current = ribbonsGroup;

    const createFlowingCurve = (offsetY, colorHex, opacityVal, speedVal) => {
      const curvePoints = [];
      const numPoints = 60;
      for (let i = 0; i <= numPoints; i++) {
        const t = (i / numPoints) * 2 - 1; // -1 to 1
        const x = t * 24;
        const y = Math.sin(t * 3.2) * 2.8 + offsetY;
        const z = Math.cos(t * 2.5) * 3 - 2;
        curvePoints.push(new THREE.Vector3(x, y, z));
      }

      const curve = new THREE.CatmullRomCurve3(curvePoints);
      const tubeGeo = new THREE.TubeGeometry(curve, 100, 0.08, 8, false);
      const tubeMat = new THREE.MeshStandardMaterial({
        color: colorHex,
        metalness: 0.9,
        roughness: 0.2,
        transparent: true,
        opacity: opacityVal,
        emissive: new THREE.Color(colorHex),
        emissiveIntensity: 0.35
      });

      const tubeMesh = new THREE.Mesh(tubeGeo, tubeMat);
      tubeMesh.userData = { speed: speedVal, baseY: offsetY, initialPoints: curvePoints };
      return tubeMesh;
    };

    // Layered metallic silver and electric blue curves
    const curve1 = createFlowingCurve(-2.5, 0x318bff, 0.65, 0.0018); // Electric Blue
    const curve2 = createFlowingCurve(-4.0, 0xc6ced8, 0.5, 0.0012);  // Metallic Silver
    const curve3 = createFlowingCurve(1.5, 0x245b9e, 0.55, 0.0015);  // Steel Blue
    const curve4 = createFlowingCurve(-6.0, 0x7cb4ff, 0.4, 0.002);   // Luminous Cyan-Blue

    ribbonsGroup.add(curve1);
    ribbonsGroup.add(curve2);
    ribbonsGroup.add(curve3);
    ribbonsGroup.add(curve4);
    scene.add(ribbonsGroup);

    // ==========================================
    // 6. SUBTLE BACKGROUND STARFIELD
    // ==========================================
    const starCount = 350;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 3) {
      starPositions[i] = (Math.random() - 0.5) * 60;
      starPositions[i + 1] = Math.random() * 30 - 5;
      starPositions[i + 2] = -5 - Math.random() * 25;
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0xc6ced8,
      size: 0.09,
      transparent: true,
      opacity: 0.7
    });
    const starField = new THREE.Points(starGeo, starMat);
    scene.add(starField);

    // ==========================================
    // MOUSE PARALLAX & RESIZE LISTENERS
    // ==========================================
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      mouseRef.current.targetX = (e.clientX / innerWidth - 0.5) * 2;
      mouseRef.current.targetY = -(e.clientY / innerHeight - 0.5) * 2;
    };

    const handleResize = () => {
      if (!container || !rendererRef.current) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      rendererRef.current.setSize(newWidth, newHeight);

      // Responsive positioning for Earth and star on mobile vs desktop
      if (newWidth < 768) {
        camera.position.z = 29;
        if (earthGroupRef.current) earthGroupRef.current.position.y = -20;
      } else {
        camera.position.z = 24;
        if (earthGroupRef.current) earthGroupRef.current.position.y = -18.2;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    handleResize();

    // ==========================================
    // ANIMATION LOOP
    // ==========================================
    let clock = new THREE.Clock();

    const animate = () => {
      reqIdRef.current = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // 1. Earth rotation
      if (earthGroupRef.current && !prefersReducedMotion) {
        earthGroupRef.current.rotation.y = elapsedTime * 0.045;
      }

      // 2. Compass Star floating & subtle tilt
      if (compassGroupRef.current) {
        if (!prefersReducedMotion) {
          compassGroupRef.current.rotation.z = Math.sin(elapsedTime * 0.4) * 0.04;
          compassGroupRef.current.rotation.y = Math.sin(elapsedTime * 0.6) * 0.12 + mouseRef.current.x * 0.15;
          compassGroupRef.current.rotation.x = Math.cos(elapsedTime * 0.5) * 0.08 + mouseRef.current.y * 0.12;
          compassGroupRef.current.position.y = 2.5 + Math.sin(elapsedTime * 0.8) * 0.15;
        }
      }

      // 3. Flowing Curves gentle wave animation
      if (ribbonsGroupRef.current && !prefersReducedMotion) {
        ribbonsGroupRef.current.children.forEach((tube, idx) => {
          tube.rotation.y = Math.sin(elapsedTime * 0.3 + idx) * 0.05;
          tube.position.y = tube.userData.baseY + Math.sin(elapsedTime * 0.5 + idx * 0.7) * 0.25;
        });
        ribbonsGroupRef.current.position.x = mouseRef.current.x * 0.6;
      }

      // Parallax camera tilt
      camera.position.x = mouseRef.current.x * 0.8;
      camera.position.y = mouseRef.current.y * 0.5;
      camera.lookAt(0, 0, 0);

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

  // Update position & scale on scroll progress
  useEffect(() => {
    if (!compassGroupRef.current || !earthGroupRef.current) return;

    // As user scrolls down (scrollProgress 0 to 1):
    // 1. Compass star smoothly scales down and floats upwards/backwards
    const starScale = Math.max(0.4, 1 - scrollProgress * 0.9);
    compassGroupRef.current.scale.set(starScale, starScale, starScale);
    compassGroupRef.current.position.z = -scrollProgress * 8;
    compassGroupRef.current.position.y = 2.5 - scrollProgress * 6.5;

    // 2. Earth gently drops and rotates slightly
    earthGroupRef.current.position.y = -18.2 - scrollProgress * 4.5;

    // 3. Ribbons spread out as digital pathways
    if (ribbonsGroupRef.current) {
      ribbonsGroupRef.current.scale.set(
        1 + scrollProgress * 0.4,
        1 + scrollProgress * 0.2,
        1
      );
    }
  }, [scrollProgress]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
        overflow: 'hidden'
      }}
      aria-hidden="true"
    />
  );
};

export default HeroScene3D;
