import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const CHAPTERS = [
  { path: '/', label: 'Home', number: '01' },
  { path: '/purpose', label: 'Our Purpose', number: '02' },
  { path: '/what-we-do', label: 'What We Do', number: '03' },
  { path: '/solutions', label: 'Solutions', number: '04' },
  { path: '/work', label: 'Our Work', number: '05' },
  { path: '/about', label: 'About Us', number: '06' },
  { path: '/contact', label: 'Contact', number: '07' }
];

const ChapterNavigator = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const currentIndex = CHAPTERS.findIndex((c) => c.path === location.pathname);
  const safeIndex = currentIndex !== -1 ? currentIndex : 0;
  const currentChapter = CHAPTERS[safeIndex];

  const prevChapter = safeIndex > 0 ? CHAPTERS[safeIndex - 1] : null;
  const nextChapter = safeIndex < CHAPTERS.length - 1 ? CHAPTERS[safeIndex + 1] : null;

  // Keyboard navigation: Left Arrow / Right Arrow
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignore if user is currently typing inside an input or textarea
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) {
        return;
      }

      if (e.key === 'ArrowRight' && nextChapter) {
        navigate(nextChapter.path);
      } else if (e.key === 'ArrowLeft' && prevChapter) {
        navigate(prevChapter.path);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [safeIndex, nextChapter, prevChapter, navigate]);

  // Touch Swipe detection without interfering with normal vertical scrolling
  useEffect(() => {
    let touchStartX = 0;
    let touchStartY = 0;

    const handleTouchStart = (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;

      const diffX = touchStartX - touchEndX;
      const diffY = touchStartY - touchEndY;

      // Only trigger if horizontal movement is dominant and exceeds threshold
      if (Math.abs(diffX) > 85 && Math.abs(diffX) > Math.abs(diffY) * 1.8) {
        if (diffX > 0 && nextChapter) {
          navigate(nextChapter.path);
        } else if (diffX < 0 && prevChapter) {
          navigate(prevChapter.path);
        }
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [nextChapter, prevChapter, navigate]);

  return (
    <aside
      aria-label="Chapter Navigation"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        zIndex: 90,
        background: 'linear-gradient(180deg, rgba(5, 11, 22, 0) 0%, rgba(5, 11, 22, 0.95) 45%, #050b16 100%)',
        padding: '1.25rem 0',
        pointerEvents: 'none'
      }}
    >
      <div
        className="page-container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          pointerEvents: 'auto'
        }}
      >
        {/* Previous Chapter Control */}
        <div>
          {prevChapter ? (
            <button
              onClick={() => navigate(prevChapter.path)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--metallic-silver)',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: 'var(--font-ui)',
                fontSize: '0.8rem',
                fontWeight: '600',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                transition: 'color 0.2s ease',
                padding: '6px 0'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--metallic-silver)')}
            >
              <ArrowLeft size={16} />
              <span className="chapter-nav-text">{prevChapter.label}</span>
            </button>
          ) : (
            <div style={{ width: '80px' }} />
          )}
        </div>

        {/* Center Indicator */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '0.72rem',
                fontWeight: '700',
                color: 'var(--electric-blue)',
                letterSpacing: '0.14em'
              }}
            >
              CHAPTER {currentChapter.number}
            </span>
            <span style={{ color: 'var(--slate-dark)', fontSize: '0.75rem' }}>/</span>
            <span
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: '0.72rem',
                fontWeight: '600',
                color: 'var(--metallic-silver)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase'
              }}
            >
              {currentChapter.label}
            </span>
          </div>

          {/* Micro Progress Bar */}
          <div
            style={{
              width: '120px',
              height: '2px',
              background: 'rgba(198, 206, 216, 0.15)',
              borderRadius: '2px',
              overflow: 'hidden'
            }}
          >
            <div
              style={{
                width: `${((safeIndex + 1) / CHAPTERS.length) * 100}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #245B9E 0%, #318BFF 100%)',
                transition: 'width 0.35s ease'
              }}
            />
          </div>
        </div>

        {/* Next Chapter Control */}
        <div>
          {nextChapter ? (
            <button
              onClick={() => navigate(nextChapter.path)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--metallic-silver)',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: 'var(--font-ui)',
                fontSize: '0.8rem',
                fontWeight: '600',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                transition: 'color 0.2s ease',
                padding: '6px 0'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--metallic-silver)')}
            >
              <span className="chapter-nav-text">{nextChapter.label}</span>
              <ArrowRight size={16} />
            </button>
          ) : (
            <div style={{ width: '80px' }} />
          )}
        </div>
      </div>
    </aside>
  );
};

export default ChapterNavigator;
