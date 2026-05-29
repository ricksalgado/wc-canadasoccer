import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './layouts/header';
import Footer from './layouts/footer';
import Homepage from './pages/homepage';
import Roster from './pages/roster/roster';
import WcHistory from './pages/history/wcHistory';
import CanadaHistory from './pages/history/canadaHistory';
import Voyagers from './pages/voyagers/voyagers';
import Contact from './pages/contact';

// ScrollToTop component to reset window scroll position on route navigation
const ScrollToTop: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
};

const App: React.FC = () => {
  return (
    <Router>
      {/* Scroll restoration helper */}
      <ScrollToTop />
      
      {/* Sticky Global Header */}
      <Header />
      
      {/* Router views switcher */}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/roster" element={<Roster />} />
        <Route path="/history/world-cup" element={<WcHistory />} />
        <Route path="/history/canada" element={<CanadaHistory />} />
        <Route path="/voyageurs" element={<Voyagers />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      {/* Architectural Dark Footer */}
      <Footer />
    </Router>
  );
};

export default App;
