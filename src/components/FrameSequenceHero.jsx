import { useEffect, useRef, useState, useCallback } from 'react';
import { ChevronDown } from 'lucide-react';

const TOTAL_STAR_FRAMES = 129;
const TOTAL_EARTH_FRAMES = 96;

const FrameSequenceHero = () => {
  const containerRef = useRef(null);
  const starCanvasRef = useRef(null);
  const earthCanvasRef = useRef(null);

  // HTMLImageElement caches
  const starImagesRef = useRef([]);
  const earthImagesRef = useRef([]);

  // Animation and state refs
  const maxStarFrameRef = useRef(0);
  const currentEarthFrameRef = useRef(0);
  const earthAnimIdRef = useRef(null);
  const lastEarthTimeRef = useRef(0);

  // Loading states
  const [initialReady, setInitialReady] = useState(false);
  const [loadPercentage, setLoadPercentage] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Helper to draw image contained with aspect ratio & cropping watermark
  const drawContained = (ctx, img, targetX, targetY, targetW, targetH, cropWatermark = true) => {
    if (!img || !img.complete || img.naturalWidth === 0) return;

    // Crop 36px off right and 26px off bottom to cleanly remove any watermark
    const sw = cropWatermark ? img.naturalWidth - 36 : img.naturalWidth;
    const sh = cropWatermark ? img.naturalHeight - 26 : img.naturalHeight;

    const imgAspect = sw / sh;
    const targetAspect = targetW / targetH;

    let dw, dh, dx, dy;
    if (imgAspect > targetAspect) {
      dw = targetW;
      dh = targetW / imgAspect;
      dx = targetX;
      dy = targetY + (targetH - dh) / 2;
    } else {
      dh = targetH;
      dw = targetH * imgAspect;
      dx = targetX + (targetW - dw) / 2;
      dy = targetY;
    }

    ctx.drawImage(img, 0, 0, sw, sh, dx, dy, dw, dh);
  };

  // Draw specific star frame
  const renderStarFrame = useCallback((frameIdx) => {
    const canvas = starCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = starImagesRef.current[frameIdx];
    if (!img || !img.complete) return;

    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    drawContained(ctx, img, 0, 0, w, h, true);
  }, []);

  // Draw current earth frame
  const renderEarthFrame = useCallback((frameIdx) => {
    const canvas = earthCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = earthImagesRef.current[frameIdx];
    if (!img || !img.complete) return;

    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    // Position Earth along the bottom horizon of the viewport
    // The globe occupies the lower portion with its curved atmosphere reaching up
    const targetH = h;
    const targetW = w;
    drawContained(ctx, img, 0, 0, targetW, targetH, true);
  }, []);

  // 1. Preload frames
  useEffect(() => {
    let loadedCount = 0;
    const totalFrames = TOTAL_STAR_FRAMES + TOTAL_EARTH_FRAMES;

    const updateProgress = () => {
      loadedCount++;
      const pct = Math.floor((loadedCount / totalFrames) * 100);
      setLoadPercentage(pct);
    };

    // First load Frame 0 of star and earth to unlock immediate rendering
    const star0 = new Image();
    star0.src = '/frames/star/ezgif-frame-001.jpg';
    starImagesRef.current[0] = star0;

    const earth0 = new Image();
    earth0.src = '/frames/earth/ezgif-frame-001.jpg';
    earthImagesRef.current[0] = earth0;

    Promise.all([
      new Promise((resolve) => {
        if (star0.complete) resolve();
        else {
          star0.onload = resolve;
          star0.onerror = resolve;
        }
      }),
      new Promise((resolve) => {
        if (earth0.complete) resolve();
        else {
          earth0.onload = resolve;
          earth0.onerror = resolve;
        }
      })
    ]).then(() => {
      setInitialReady(true);
      renderStarFrame(0);
      renderEarthFrame(0);
    });

    // Load remaining star frames (1..128)
    for (let i = 0; i < TOTAL_STAR_FRAMES; i++) {
      if (i === 0) continue;
      const numStr = String(i + 1).padStart(3, '0');
      const img = new Image();
      img.src = `/frames/star/ezgif-frame-${numStr}.jpg`;
      img.onload = updateProgress;
      img.onerror = updateProgress;
      starImagesRef.current[i] = img;
    }

    // Load remaining earth frames (1..95)
    for (let i = 0; i < TOTAL_EARTH_FRAMES; i++) {
      if (i === 0) continue;
      const numStr = String(i + 1).padStart(3, '0');
      const img = new Image();
      img.src = `/frames/earth/ezgif-frame-${numStr}.jpg`;
      img.onload = updateProgress;
      img.onerror = updateProgress;
      earthImagesRef.current[i] = img;
    }
  }, [renderStarFrame, renderEarthFrame]);

  // 2. Earth continuous independent animation loop (~24 fps)
  useEffect(() => {
    const fps = 24;
    const frameInterval = 1000 / fps;

    const tick = (now) => {
      earthAnimIdRef.current = requestAnimationFrame(tick);
      if (now - lastEarthTimeRef.current >= frameInterval) {
        lastEarthTimeRef.current = now;
        currentEarthFrameRef.current = (currentEarthFrameRef.current + 1) % TOTAL_EARTH_FRAMES;
        renderEarthFrame(currentEarthFrameRef.current);
      }
    };

    earthAnimIdRef.current = requestAnimationFrame(tick);
    return () => {
      if (earthAnimIdRef.current) cancelAnimationFrame(earthAnimIdRef.current);
    };
  }, [renderEarthFrame]);

  // 3. Scroll synchronization for Star expansion (Strictly Forward Progression)
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const totalScrollable = container.offsetHeight - window.innerHeight;
      if (totalScrollable <= 0) return;

      const scrolled = Math.max(0, -rect.top);
      const progress = Math.min(1, Math.max(0, scrolled / totalScrollable));
      setScrollProgress(progress);

      // Target frame calculated from scroll position
      const targetFrame = Math.min(TOTAL_STAR_FRAMES - 1, Math.floor(progress * (TOTAL_STAR_FRAMES - 1)));

      // STRICT REQUIREMENT: Never reverse the sequence or zoom backwards!
      if (targetFrame > maxStarFrameRef.current) {
        maxStarFrameRef.current = targetFrame;
      }

      // Render the monotonically increasing frame
      renderStarFrame(maxStarFrameRef.current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [renderStarFrame]);

  // 4. Handle resize and high-DPI canvas setup
  useEffect(() => {
    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Setup Star Canvas
      const starCanvas = starCanvasRef.current;
      if (starCanvas) {
        starCanvas.width = width * dpr;
        starCanvas.height = height * dpr;
        const ctx = starCanvas.getContext('2d');
        if (ctx) ctx.scale(dpr, dpr);
        renderStarFrame(maxStarFrameRef.current);
      }

      // Setup Earth Canvas (occupies bottom horizon)
      const earthCanvas = earthCanvasRef.current;
      if (earthCanvas) {
        const earthHeight = Math.round(height * 0.58);
        earthCanvas.width = width * dpr;
        earthCanvas.height = earthHeight * dpr;
        const ctx = earthCanvas.getContext('2d');
        if (ctx) ctx.scale(dpr, dpr);
        renderEarthFrame(currentEarthFrameRef.current);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [renderStarFrame, renderEarthFrame]);

  // Scroll smoothly past hero
  const handleScrollExplore = () => {
    if (containerRef.current) {
      const target = containerRef.current.offsetTop + containerRef.current.offsetHeight;
      window.scrollTo({ top: target, behavior: 'smooth' });
    }
  };

  // Fade curves calculated from scrollProgress
  const textOpacity = Math.max(0, 1 - scrollProgress * 3.5);
  const textTranslateY = scrollProgress * 50;
  const earthOpacity = Math.max(0, 1 - scrollProgress * 2.2);
  const earthTranslateY = scrollProgress * 120;

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        height: '240vh', // Provides ample scroll distance for smooth expansion
        background: '#050B16'
      }}
    >
      {/* Sticky Fullscreen Cinematic Viewport */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {/* Layer 1: Fixed Background JPEG (deep midnight space with blue cosmic ribbons) */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url(/hero-bg.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            zIndex: 1,
            pointerEvents: 'none'
          }}
        />

        {/* Layer 2: Rotating Earth Canvas (At Bottom Horizon with Screen Blending) */}
        <canvas
          ref={earthCanvasRef}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100vw',
            height: '58vh',
            zIndex: 2,
            mixBlendMode: 'screen',
            pointerEvents: 'none',
            opacity: earthOpacity,
            transform: `translateY(${earthTranslateY}px)`,
            transition: 'opacity 0.15s ease-out, transform 0.15s ease-out'
          }}
        />

        {/* Layer 3: Expanding Star Canvas (Synchronized to Scroll Position) */}
        <canvas
          ref={starCanvasRef}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 3,
            mixBlendMode: 'screen',
            pointerEvents: 'none'
          }}
        />

        {/* Layer 4: Cinematic Brand Typography Overlay */}
        <div
          style={{
            position: 'absolute',
            zIndex: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            pointerEvents: textOpacity > 0.05 ? 'auto' : 'none',
            opacity: textOpacity,
            transform: `translateY(${textTranslateY}px)`,
            transition: 'opacity 0.15s ease-out, transform 0.15s ease-out',
            marginTop: '12vh', // Positioned directly below the compass star
            padding: '0 1.5rem'
          }}
        >
          {/* Brand Name */}
          <h1
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.2rem, 5.2vw, 4.2rem)',
              fontWeight: '700',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#FFFFFF',
              lineHeight: 1.1,
              textShadow: '0 0 30px rgba(49, 139, 255, 0.45), 0 2px 8px rgba(0, 0, 0, 0.9)'
            }}
          >
            DASHRUDRA
          </h1>

          {/* Tagline */}
          <p
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: 'clamp(0.68rem, 1.2vw, 0.92rem)',
              fontWeight: '600',
              letterSpacing: '0.34em',
              color: 'var(--metallic-silver)',
              textTransform: 'uppercase',
              marginTop: '0.75rem',
              textShadow: '0 0 14px rgba(49, 139, 255, 0.3)'
            }}
          >
            STRATEGY. INSIGHT. IMPACT.
          </p>
        </div>

        {/* Layer 5: Scroll To Explore Indicator */}
        <div
          onClick={handleScrollExplore}
          style={{
            position: 'absolute',
            bottom: '2.5rem',
            zIndex: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            opacity: textOpacity,
            transform: `translateY(${textTranslateY * 0.5}px)`,
            transition: 'opacity 0.15s ease-out, transform 0.15s ease-out',
            pointerEvents: textOpacity > 0.1 ? 'auto' : 'none'
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-ui)',
              fontSize: '0.68rem',
              fontWeight: '700',
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: 'var(--metallic-silver)'
            }}
          >
            Scroll to Explore
          </span>
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              border: '1px solid rgba(198, 206, 216, 0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--electric-blue)',
              background: 'rgba(7, 19, 38, 0.6)',
              backdropFilter: 'blur(8px)',
              animation: 'bounceSlow 2s infinite ease-in-out'
            }}
          >
            <ChevronDown size={16} />
          </div>
        </div>

        {/* Preload Status Bar (Discreet, Top Edge) */}
        {!initialReady && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '2px',
              background: 'rgba(198, 206, 216, 0.1)',
              zIndex: 10
            }}
          >
            <div
              style={{
                width: `${loadPercentage}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #245B9E, #318BFF)',
                transition: 'width 0.2s ease'
              }}
            />
          </div>
        )}
      </div>

      <style>{`
        @keyframes bounceSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }
      `}</style>
    </div>
  );
};

export default FrameSequenceHero;