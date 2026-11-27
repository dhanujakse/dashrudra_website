import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';

import ThreeBackgroundWorld from './components/ThreeBackgroundWorld';
import HeaderNav from './components/HeaderNav';
import ChapterNavigator from './components/ChapterNavigator';

import HomePage from './pages/HomePage';
import PurposePage from './pages/PurposePage';
import WhatWeDoPage from './pages/WhatWeDoPage';
import SolutionsPage from './pages/SolutionsPage';
import WorkPage from './pages/WorkPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

import './App.css';

// Automatically reset scroll position to top whenever route changes
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function MainLayout() {
  return (
    <div className="app-root">
      {/* Scroll restoration */}
      <ScrollToTop />

      {/* Persistent 3D Three.js World (Earth, Compass-Star, Flowing Curves) */}
      <ThreeBackgroundWorld />

      {/* Top Editorial Brand Header */}
      <HeaderNav />

      {/* Real Multi-Page Route Views */}
      <main className="page-content-wrapper">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/purpose" element={<PurposePage />} />
          <Route path="/what-we-do" element={<WhatWeDoPage />} />
          <Route path="/solutions" element={<SolutionsPage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Horizontal Chapter Traversal Controller (Gestures, Keyboard, Navigation) */}
      <ChapterNavigator />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <MainLayout />
    </BrowserRouter>
  );
}

export default App;
