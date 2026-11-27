import FrameSequenceHero from '../components/FrameSequenceHero';
import MainHomepageContent from '../components/MainHomepageContent';

const HomePage = () => {
  return (
    <div className="homepage-cinematic-flow">
      {/* 1. Cinematic Opening & Extracted Frame Sequences (Earth Loop + Forward Star Expansion) */}
      <FrameSequenceHero />

      {/* 2. Main Editorial Homepage Content (Seamlessly revealed after the star transition) */}
      <MainHomepageContent />
    </div>
  );
};

export default HomePage;
