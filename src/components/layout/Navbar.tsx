import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router';
import { AnimatePresence, motion } from 'motion/react';
import { Menu, X } from 'lucide-react';
import useScrolled from '../../hooks/useScrolled';
import Button from '../ui/Button';
import Wordmark from './Wordmark';

const LINKS = [
  { to: '/explore', label: 'Explore' },
  { to: '/corporate', label: 'Corporate' },
  { to: '/host', label: 'Host dashboard' },
];

/** Routes whose hero sits behind the nav, wanting white text until scroll. */
const IMMERSIVE_ROUTES = [/^\/$/, /^\/experience\//];

export default function Navbar() {
  const scrolled = useScrolled(24);
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  const immersive = IMMERSIVE_ROUTES.some((route) => route.test(pathname));
  const solid = scrolled || !immersive || open;

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid ? 'glass shadow-[0_1px_0_oklch(24%_0.055_250/0.06)]' : 'bg-transparent'
      }`}
    >
      <nav
        aria-label="Main navigation"
        className={`shell flex h-16 items-center justify-between gap-4 md:h-[4.5rem] ${
          solid ? 'text-ink' : 'text-white'
        }`}
      >
        <Wordmark />

        <div className="hidden items-center gap-1 md:flex">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  solid ? 'hover:bg-ink/5' : 'hover:bg-white/10'
                } ${isActive ? 'after:horizon-rule after:absolute after:inset-x-4 after:-bottom-0.5' : 'opacity-80 hover:opacity-100'}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <Button to="/corporate" variant={solid ? 'ghost' : 'glass'} size="sm">
            Host your event
          </Button>
          <Button to="/explore" variant={solid ? 'primary' : 'sunrise'} size="sm">
            Explore experiences
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="grid size-10 place-items-center rounded-full transition-colors hover:bg-ink/5 md:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="glass fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto md:hidden"
          >
            <div className="shell flex min-h-full flex-col gap-2 py-8 text-ink">
              {LINKS.map((link, index) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * index, duration: 0.35 }}
                >
                  <Link
                    to={link.to}
                    className="font-display block border-b border-ink/8 py-5 text-3xl font-medium tracking-tight"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <div className="mt-8 flex flex-col gap-3">
                <Button to="/explore" variant="sunrise" size="lg">
                  Explore experiences
                </Button>
                <Button to="/corporate" variant="outline" size="lg">
                  Host your event
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
