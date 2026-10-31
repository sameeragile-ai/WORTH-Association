import { useState, Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';

// Core Layout Components
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Loader from './components/Loader.jsx';
import BackToTop from './components/BackToTop.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import DonationModal from './components/DonationModal.jsx';
import ApplicationModal from './components/ApplicationModal.jsx';

// Pages (Lazy Loaded for Performance & Code Splitting)
const Home = lazy(() => import('./pages/Home.jsx'));
const Programs = lazy(() => import('./pages/Programs.jsx'));
const GetInvolved = lazy(() => import('./pages/GetInvolved.jsx'));
const Careers = lazy(() => import('./pages/Careers.jsx'));
const Resources = lazy(() => import('./pages/Resources.jsx'));
const Events = lazy(() => import('./pages/Events.jsx'));
const About = lazy(() => import('./pages/About.jsx'));
const Contact = lazy(() => import('./pages/Contact.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));

interface AnimatedRoutesProps {
  onOpenDonate: () => void;
  onOpenApplication: (config: { type: string; contextData?: any }) => void;
}

function AnimatedRoutes({ onOpenDonate, onOpenApplication }: AnimatedRoutesProps) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        className="flex-1 flex flex-col"
      >
        <Suspense
          fallback={
            <div className="min-h-[60vh] flex items-center justify-center bg-[#FDF7F4]">
              <div className="w-10 h-10 border-3 border-[#EC5F8B] border-t-transparent rounded-full animate-spin" />
            </div>
          }
        >
          <Routes location={location}>
            <Route
              path="/"
              element={
                <Home
                  onOpenDonate={onOpenDonate}
                  onOpenApplication={onOpenApplication}
                />
              }
            />
            <Route
              path="/programs"
              element={
                <Programs onOpenApplication={onOpenApplication} />
              }
            />
            <Route
              path="/get-involved"
              element={
                <GetInvolved
                  onOpenDonate={onOpenDonate}
                  onOpenApplication={onOpenApplication}
                />
              }
            />
            <Route
              path="/careers"
              element={
                <Careers onOpenApplication={onOpenApplication} />
              }
            />
            <Route path="/resources" element={<Resources />} />
            <Route
              path="/events"
              element={
                <Events onOpenApplication={onOpenApplication} />
              }
            />
            <Route
              path="/about"
              element={<About onOpenDonate={onOpenDonate} />}
            />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  const [isDonateOpen, setIsDonateOpen] = useState(false);
  const [appModalConfig, setAppModalConfig] = useState({
    isOpen: false,
    type: 'general',
    contextData: null,
  });

  const handleOpenApplication = ({ type, contextData }: { type: string; contextData?: any }) => {
    setAppModalConfig({
      isOpen: true,
      type: type || 'general',
      contextData: contextData || null,
    });
  };

  const handleCloseApplication = () => {
    setAppModalConfig((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-[#FDF7F4] text-[#1F1A1C] font-sans antialiased selection:bg-[#EC5F8B]/25 selection:text-[#9C1F5A]">
        {/* Full-screen Loader on first visit per session */}
        <Loader />

        {/* Route Scroll Restorer */}
        <ScrollToTop />

        {/* Global Fixed / Auto-Hide Navbar */}
        <Navbar onOpenDonate={() => setIsDonateOpen(true)} />

        {/* Main Routed Content with Animated Transitions */}
        <main className="flex-1 flex flex-col">
          <AnimatedRoutes
            onOpenDonate={() => setIsDonateOpen(true)}
            onOpenApplication={handleOpenApplication}
          />
        </main>

        {/* Global Footer */}
        <Footer onOpenDonate={() => setIsDonateOpen(true)} />

        {/* Back to Top with Scroll Progress Ring */}
        <BackToTop />

        {/* Global Donation Modal */}
        <DonationModal
          isOpen={isDonateOpen}
          onClose={() => setIsDonateOpen(false)}
        />

        {/* Global Application & Registration Modal */}
        <ApplicationModal
          isOpen={appModalConfig.isOpen}
          onClose={handleCloseApplication}
          type={appModalConfig.type}
          contextData={appModalConfig.contextData}
        />
      </div>
    </BrowserRouter>
  );
}
