import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import confetti from "canvas-confetti";
import {
  Menu,
  X,
  Code2,
  Github,
  Linkedin,
  Mail,
  Home,
  User,
  Wrench,
  Briefcase,
  FolderOpen,
  FileText,
  PhoneCall,
  Sparkles,
} from "lucide-react";
import { Button } from "../components/ui/button";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const location = useLocation();
  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  // Handle Scroll Effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => setIsOpen(false), [location.pathname]);

  // Respect reduced motion preference
  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia) {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      const update = () => setReduceMotion(mq.matches);
      update();
      mq.addEventListener?.("change", update);
      return () => mq.removeEventListener?.("change", update);
    }
  }, []);

  // Manage focus + ESC + scroll lock
  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => closeButtonRef.current?.focus(), 50);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Confetti (Green Colors now)
  const triggerConfetti = () => {
    if (reduceMotion) return;
    const end = Date.now() + 1500;
    // Changed colors to Green shades to match button
    const colors = ["#16a34a", "#22c55e", "#4ade80", "#059669", "#ffffff"];

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 50,
        origin: { x: 0 },
        colors,
        scalar: 0.9,
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 50,
        origin: { x: 1 },
        colors,
        scalar: 0.9,
      });

      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  };

  const navItems = [
    { path: "/home", label: "Home", icon: Home },
    { path: "/about", label: "About", icon: User },
    { path: "/skills", label: "Skills", icon: Wrench },
    { path: "/services", label: "Services", icon: Briefcase },
    { path: "/projects", label: "Projects", icon: FolderOpen },
    { path: "/resume", label: "Resume", icon: FileText },
    { path: "/contact", label: "Contact", icon: PhoneCall },
  ];

  const socials = [
    {
      icon: Github,
      href: "https://github.com/Suraj1819",
      label: "GitHub",
      base: "text-gray-700",
      hover: "hover:bg-gray-900 hover:text-white",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/suraj-kumar-72847b30a/",
      label: "LinkedIn",
      base: "text-[#0A66C2]",
      hover: "hover:bg-[#0A66C2] hover:text-white",
    },
    {
      icon: Mail,
      href: "mailto:surajkumarraj8888@gmail.com",
      label: "Email",
      base: "text-[#EA4335]",
      hover: "hover:bg-[#EA4335] hover:text-white",
    },
    
    {
      icon: ({ className }: { className: string }) => (
        <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M20.52 3.48A11.72 11.72 0 0 0 12.06.01C5.51.01.2 5.32.2 11.87c0 2.09.55 4.15 1.6 5.95L.02 24l6.35-1.64a11.7 11.7 0 0 0 5.69 1.45h.01c6.55 0 11.86-5.31 11.86-11.86 0-3.17-1.24-6.16-3.41-8.32Zm-8.46 18.1h-.01a9.86 9.86 0 0 1-5.02-1.37l-.36-.21-3.6.93.96-3.51-.24-.36a9.83 9.83 0 0 1-1.43-5.23c0-5.43 4.42-9.85 9.86-9.85 2.63 0 5.11 1.02 6.97 2.88 1.86 1.86 2.88 4.34 2.88 6.97 0 5.44-4.42 9.86-9.89 9.86Zm5.45-7.39c-.3-.15-1.75-.87-2.02-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.16-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.41-1.49-.89-.79-1.49-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.08-.15-.67-1.63-.92-2.23-.24-.58-.49-.5-.67-.51-.17-.01-.37-.01-.57-.01-.2 0-.52.07-.8.37-.27.3-1.04 1.03-1.04 2.51s1.07 2.91 1.22 3.1c.15.2 2.11 3.23 5.11 4.53.72.31 1.27.49 1.71.63.72.23 1.37.2 1.88.12.57-.09 1.75-.72 2-1.42.25-.7.25-1.29.17-1.41-.08-.12-.27-.2-.57-.35Z"
          />
        </svg>
      ),
      href: "https://wa.me/9507272341",
      label: "WhatsApp",
      base: "text-[#25D366]",
      hover: "hover:bg-[#25D366] hover:text-white",
    },
  ];

  const menuId = "mobile-primary-menu";
  const menuTitleId = "mobile-menu-title";

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out`}
      aria-label="Primary"
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <div
        className={`${
          scrolled
            ? "bg-white/85 backdrop-blur-xl shadow-lg border-b border-gray-100 py-2"
            : "bg-transparent py-3"
        } transition-all duration-500 ease-in-out`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between">
            {/* --- LOGO SECTION (Shifted More Left) --- */}
            <Link
              to="/"
              aria-label="Suraj Kumar Portfolio Home"
              className="flex items-center group focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-xl ml-0 sm:ml-0 lg:-ml-4 px-1 sm:px-0" // 👈 removed negative margin
            >
              {/* Logo Icon Box */}
              <div className="relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-2xl 
                              bg-gradient-to-br from-amber-500 via-orange-500 to-orange-600 text-white 
                              shadow-xl shadow-orange-500/30 group-hover:scale-105 group-hover:rotate-3 
                              transition-all mr-3">
                <Code2 className="h-6 w-6 sm:h-8 sm:w-8" />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-transparent via-white/30 to-white/5 
                                opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              {/* Text Block */}
              <div className="leading-tight text-left">
                <div className="flex flex-wrap items-baseline gap-1 sm:gap-1.5">
                  <span className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 
                                  bg-clip-text text-transparent tracking-tight group-hover:from-amber-600 
                                  group-hover:via-orange-500 group-hover:to-amber-600 transition-all">
                    Suraj
                  </span>
                  <span className="text-2xl sm:text-3xl font-black text-orange-500 group-hover:text-orange-600 transition-colors">
                    _
                  </span>
                  <span className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 
                                  bg-clip-text text-transparent tracking-tight group-hover:from-amber-600 
                                  group-hover:via-orange-500 group-hover:to-amber-600 transition-all">
                    Kumar
                  </span>
                </div>

                {/* Subtitle */}
                <div className="flex flex-wrap items-center gap-1 sm:gap-2 mt-1">
                  <span className="text-[10px] sm:text-xs font-bold text-amber-600 uppercase tracking-[0.25em] sm:tracking-[0.3em] 
                                  group-hover:text-orange-600 transition-colors">
                    Full Stack
                  </span>
                  <span className="w-1 h-1 bg-amber-400 rounded-full group-hover:scale-125 transition-transform" />
                  <span className="text-[10px] sm:text-xs font-bold text-amber-600 uppercase tracking-[0.25em] sm:tracking-[0.3em] 
                                  group-hover:text-orange-600 transition-colors">
                    Developer
                  </span>
                </div>
              </div>
            </Link>

            {/* --- DESKTOP NAVIGATION --- */}
            <ul className="hidden lg:flex items-center gap-1 bg-white/70 px-2 py-2 rounded-full border border-white/50 shadow-sm backdrop-blur-md ring-1 ring-gray-100" role="list">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 ${
                        isActive
                          ? "text-amber-700 bg-amber-50 shadow-sm ring-1 ring-amber-100"
                          : "text-gray-700 hover:text-gray-900 hover:bg-white hover:shadow-sm"
                      }`}
                      aria-current={isActive ? "page" : undefined}
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        {isActive && <item.icon className="h-3.5 w-3.5 animate-in fade-in zoom-in" />}
                        {item.label}
                      </span>
                      {!isActive && (
                        <span className="absolute inset-0 rounded-full bg-gradient-to-r from-gray-50 to-white opacity-0 group-hover:opacity-100 transition-opacity -z-0" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* --- RIGHT ACTIONS (DESKTOP) --- */}
            <div className="hidden lg:flex items-center gap-4">
              <div className="flex items-center gap-2 pr-4 border-r border-gray-200">
                {socials.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className={`p-2 rounded-full transition-all duration-200 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-500 ${social.base} ${social.hover}`}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>

              {/* --- GREEN BUTTON DESKTOP (Enhanced Hover) --- */}
              <Link to="/contact" onClick={triggerConfetti}>
                <Button className="
                  relative overflow-hidden rounded-full px-6 py-5 font-semibold flex items-center gap-2 group
                  bg-gradient-to-r from-green-600 to-emerald-600 text-white
                  shadow-lg shadow-green-600/20
                  hover:shadow-2xl hover:shadow-green-500/50 hover:-translate-y-0.5 hover:scale-[1.02]
                  active:scale-95
                  transition-all duration-300 ease-out
                  focus-visible:ring-2 focus-visible:ring-green-500
                ">
                  <span className="relative z-10 flex items-center gap-2">
                    Hire Me <Sparkles className="h-4 w-4 text-white animate-pulse" />
                  </span>
                  {/* Shine Animation */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-in-out" />
                  {/* Subtle Glow Ring */}
                  <div className="absolute inset-0 rounded-full ring-0 group-hover:ring-2 ring-white/30 transition-all duration-300" />
                </Button>
              </Link>
            </div>

            {/* --- MOBILE TOGGLE --- */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-gray-700 hover:bg-gray-100 rounded-xl transition-transform active:scale-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
              onClick={() => setIsOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
              aria-controls={menuId}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* --- OVERLAY --- */}
      <button
        type="button"
        aria-hidden={!isOpen}
        tabIndex={-1}
        onClick={() => setIsOpen(false)}
        className={`${
          isOpen ? "fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 opacity-100" : "pointer-events-none opacity-0"
        } lg:hidden z-40`}
      />

      {/* --- MOBILE MENU --- */}
      <div
        id={menuId}
        role="dialog"
        aria-modal="true"
        aria-labelledby={menuTitleId}
        className={`lg:hidden fixed inset-x-3 top-14 z-50 rounded-2xl border border-gray-200 shadow-2xl backdrop-blur-xl ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <div
          className={`bg-white/95 overflow-hidden transform origin-top transition-all duration-300 rounded-2xl ${
            isOpen ? "opacity-100 scale-y-100" : "opacity-0 scale-y-95"
          }`}
        >
          {/* --- MENU HEADER --- */}
          <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-white/95 backdrop-blur-xl">
            <span id={menuTitleId} className="text-lg font-bold text-gray-900 flex items-center gap-2">
              Menu <span className="text-xs font-normal text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">Navigation</span>
            </span>
            <button
              ref={closeButtonRef}
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-full bg-gray-100 text-gray-500 hover:bg-red-50 hover:text-red-500 transition-colors active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* --- NAV LIST --- */}
          <nav aria-label="Mobile">
            <ul className="flex flex-col p-2" role="list">
              {navItems.map((item, idx) => {
                const isActive = location.pathname === item.path;
                const delay = reduceMotion ? undefined : `${idx * 60}ms`;
                return (
                  <li key={item.path}>
                    <Link
                      ref={idx === 0 ? firstLinkRef : undefined}
                      to={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`px-3 py-3 rounded-xl flex items-center gap-3 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500
                        ${isActive ? "bg-amber-50 text-amber-800 shadow-sm" : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"}`}
                      aria-current={isActive ? "page" : undefined}
                      style={{
                        animationDuration: "220ms",
                        animationTimingFunction: "ease-out",
                        animationFillMode: "both",
                        animationName: reduceMotion ? undefined : "fadeInUp",
                        animationDelay: delay,
                        willChange: reduceMotion ? undefined : "opacity, transform",
                      }}
                    >
                      <div
                        className={`p-2 rounded-lg ${isActive ? "bg-amber-100 text-amber-600" : "bg-gray-100 text-gray-500"}`}
                      >
                        <item.icon className="h-5 w-5" />
                      </div>
                      {item.label}
                    </Link>
                  </li>
                );
              })}

              <li className="my-2 mx-2">
                <div className="h-px bg-gray-100" />
              </li>

              {/* --- GREEN BUTTON MOBILE (Enhanced Hover) --- */}
              <li
                style={{
                  animationDuration: "240ms",
                  animationTimingFunction: "ease-out",
                  animationFillMode: "both",
                  animationName: reduceMotion ? undefined : "fadeInUp",
                  animationDelay: reduceMotion ? undefined : `${navItems.length * 60}ms`,
                }}
              >
                <Link
                  to="/contact"
                  onClick={() => {
                    setIsOpen(false);
                    triggerConfetti();
                  }}
                  className="mt-1 block"
                >
                  <Button className="
                    w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 group
                    bg-gradient-to-r from-green-600 to-emerald-600 text-white
                    shadow-lg shadow-green-600/20
                    active:scale-95 active:shadow-inner
                    hover:shadow-green-500/40 hover:scale-[1.01]
                    transition-all duration-200
                    focus-visible:ring-2 focus-visible:ring-green-500
                  ">
                    Hire Me Now <Sparkles className="h-5 w-5 text-white animate-pulse" />
                    {/* Shine Animation Mobile */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-in-out" />
                  </Button>
                </Link>
              </li>

              <li
                className="py-3 mt-1"
                style={{
                  animationDuration: "240ms",
                  animationTimingFunction: "ease-out",
                  animationFillMode: "both",
                  animationName: reduceMotion ? undefined : "fadeInUp",
                  animationDelay: reduceMotion ? undefined : `${(navItems.length + 1) * 60}ms`,
                }}
              >
                <div className="flex justify-center gap-4">
                  {socials.map((social, idx) => (
                    <a
                      key={`m-${idx}`}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={social.label}
                      className={`p-2 rounded-full ${social.base} ${social.hover} transition-all hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-500`}
                    >
                      <social.icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <style>
        {`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(6px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </nav>
  );
};