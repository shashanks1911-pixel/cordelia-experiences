import { Suspense, lazy, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router';
import PageShell from './components/layout/PageShell';
import Home from './pages/Home';

const Explore = lazy(() => import('./pages/Explore'));
const ExperienceDetail = lazy(() => import('./pages/ExperienceDetail'));
const Corporate = lazy(() => import('./pages/Corporate'));
const HostDashboard = lazy(() => import('./pages/HostDashboard'));
const Booking = lazy(() => import('./pages/Booking'));
const NotFound = lazy(() => import('./pages/NotFound'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

function RouteFallback() {
  return (
    <div className="grid min-h-screen place-items-center bg-surface">
      <p className="font-display animate-pulse text-2xl italic text-ocean">Cordelia</p>
    </div>
  );
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route element={<PageShell />}>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/experience/:slug" element={<ExperienceDetail />} />
            <Route path="/corporate" element={<Corporate />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="/host" element={<HostDashboard />} />
          <Route path="/book/:slug" element={<Booking />} />
        </Routes>
      </Suspense>
    </>
  );
}
