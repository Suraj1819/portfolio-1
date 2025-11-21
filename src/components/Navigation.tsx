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
  Volume2,
} from "lucide-react";
import { Button } from "../components/ui/button";

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio
  useEffect(() => {
    // Option 1: Local sound file (recommended)
    // audioRef.current = new Audio('/sounds/drum-hit.mp3');
    
    // Option 2: Free online drum sound (temporary solution)
    const audio = new Audio('https://www.myinstants.com/media/sounds/drum-roll.mp');
    audio.volume = 0.3; // Adjust volume (0 to 1)
    audioRef.current = audio;
    
    return () => {
      if (audioRef.current) {
        audioRef.current = null;
      }
    };
  }, []);

  // Handle Scroll Effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => setIsOpen(false), [location.pathname]);

  //  🎉 CONFETTI + DRUM FUNCTION
  const triggerConfettiWithSound = () => {
    // Play drum sound
    if (audioRef.current) {
      audioRef.current.currentTime = 0; // Reset to start
      audioRef.current.play().catch((e: Error) => console.log("Audio play failed:", e));
    }

    // Trigger confetti
    const end = Date.now() + 3 * 1000;
    const colors = ["#c92c5c", "#2bec72", "#604c32", "#513f31", "#222222"];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
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

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out ${
        scrolled
          ? "bg-white/80 backdrop-blur-xl shadow-lg border-b border-gray-100 py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          
          {/* --- LOGO SECTION (ENHANCED) --- */}
          <Link
            to="/"
            className="flex items-center group"
            aria-label="Suraj Kumar Portfolio"
          >
            <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 via-orange-500 to-orange-600 text-white shadow-xl shadow-orange-500/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-400 mr-3">
              <Code2 className="h-7 w-7" />
              {/* Shimmer overlay */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-transparent via-white/30 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {/* Corner accent */}
              <div className="absolute top-1 right-1 w-2 h-2 bg-white/40 rounded-full blur-sm" />
            </div>
            <div className="leading-tight">
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent tracking-tight group-hover:from-amber-600 group-hover:via-orange-500 group-hover:to-amber-600 transition-all duration-300">
                  Suraj
                </span>
                <span className="text-2xl font-black text-orange-500 group-hover:text-orange-600 transition-colors">
                  _
                </span>
                <span className="text-2xl font-black bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent tracking-tight group-hover:from-amber-600 group-hover:via-orange-500 group-hover:to-amber-600 transition-all duration-300">
                  Kumar
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] font-bold text-amber-600 uppercase tracking-[0.2em] group-hover:text-orange-600 transition-colors">
                  Full Stack
                </span>
                <span className="w-1 h-1 bg-amber-400 rounded-full group-hover:scale-150 transition-transform" />
                <span className="text-[10px] font-bold text-amber-600 uppercase tracking-[0.2em] group-hover:text-orange-600 transition-colors">
                  Developer
                </span>
              </div>
            </div>
          </Link>


          {/* --- DESKTOP NAVIGATION (Floating Island) --- */}
          <div className="hidden lg:flex items-center gap-1 bg-white/70 px-2 py-2 rounded-full border border-white/50 shadow-sm backdrop-blur-md ring-1 ring-gray-100">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 group
                    ${
                      isActive
                        ? "text-amber-700 bg-amber-50 shadow-sm ring-1 ring-amber-100"
                        : "text-gray-600 hover:text-gray-900 hover:bg-white hover:shadow-sm"
                    }`}
                >
                  <span className={`relative z-10 flex items-center gap-2`}>
                     {isActive && <item.icon className="h-3.5 w-3.5 animate-in fade-in zoom-in" />}
                     {item.label}
                  </span>
                  
                  {/* Hover Glow Effect */}
                  {!isActive && (
                    <span className="absolute inset-0 rounded-full bg-gradient-to-r from-gray-50 to-white opacity-0 group-hover:opacity-100 transition-opacity -z-0" />
                  )}
                </Link>
              );
            })}
          </div>


          {/* --- RIGHT ACTIONS --- */}
          <div className="hidden lg:flex items-center gap-5">
            
            {/* Socials */}
            <div className="flex items-center gap-2 pr-5 border-r border-gray-200">
              {[
                {
                  icon: Github,
                  href: "https://github.com/suraj",
                  label: "Github",
                  color: "text-gray-600",
                  hover: "hover:text-black hover:bg-gray-200"
                },
                {
                  icon: Linkedin,
                  href: "https://linkedin.com/in/suraj",
                  label: "Linkedin",
                  color: "text-blue-600",
                  hover: "hover:text-white hover:bg-blue-600"
                },
                {
                  icon: Mail,
                  href: "mailto:suraj@example.com",
                  label: "Email",
                  color: "text-red-500",
                  hover: "hover:text-white hover:bg-red-500"
                },
                {
                  icon: ({ className }: { className: string }) => (
                    <svg
                      className={className}
                      fill="currentColor"
                      viewBox="0 0 32 32"
                    >
                      <path d="M16.003 2.667c-7.364 0-13.333 5.969-13.333 13.333 0 2.35.609 4.633 1.771 6.661l-1.854 6.79 6.967-1.827c1.938 1.06 4.148 1.62 6.449 1.62h.002c7.363 0 13.332-5.969 13.332-13.333 0-3.561-1.387-6.907-3.909-9.429-2.521-2.521-5.868-3.915-9.425-3.915zm0 24.889h-.002c-2.039 0-4.033-.547-5.775-1.582l-.414-.245-4.136 1.083 1.106-4.053-.27-.417c-1.1-1.696-1.68-3.666-1.68-5.675 0-5.803 4.721-10.524 10.525-10.524 2.813 0 5.456 1.096 7.44 3.082 1.985 1.985 3.084 4.628 3.084 7.441 0 5.803-4.721 10.525-10.528 10.525zm5.798-7.889c-.316-.158-1.869-.922-2.159-1.028-.29-.106-.502-.158-.713.158-.21.316-.82 1.027-1.005 1.237-.184.21-.369.237-.685.079-.316-.158-1.333-.492-2.538-1.57-.937-.834-1.568-1.861-1.752-2.177-.184-.316-.02-.486.138-.643.142-.141.316-.369.474-.553.158-.184.21-.316.316-.527.105-.21.053-.395-.026-.553-.079-.158-.713-1.718-.977-2.354-.257-.617-.519-.533-.713-.544-.184-.008-.395-.01-.606-.01-.21 0-.553.079-.843.395-.29.316-1.11 1.085-1.11 2.642 0 1.558 1.136 3.066 1.296 3.277.158.21 2.237 3.414 5.418 4.788.758.327 1.349.522 1.812.667.761.242 1.453.208 2.001.126.61-.091 1.869-.764 2.133-1.503.263-.739.263-1.373.184-1.504-.079-.13-.289-.21-.605-.368z"/>
                    </svg>
                  ),
                  href: "https://wa.me/9507272341",
                  label: "WhatsApp",
                  color: "text-green-600",
                  hover: "hover:text-white hover:bg-green-500"
                }
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className={`
                    p-2 rounded-full transition-all duration-300 hover:scale-110
                    ${social.color} ${social.hover}
                  `}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>

            {/* HIRE ME BUTTON WITH SOUND */}
            <Link to="/contact" onClick={triggerConfettiWithSound}>
              <Button 
                className="relative overflow-hidden bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-xl hover:shadow-2xl hover:shadow-amber-500/20 transition-all duration-300 rounded-full px-7 py-6 font-semibold flex items-center gap-2 group active:scale-95"
              >
                <span className="relative z-10 flex items-center gap-2">
                   Hire Me <Sparkles className="h-4 w-4 text-white animate-pulse" />
                   <Volume2 className="h-3.5 w-3.5 text-white/70 group-hover:translate-y-0.5 transition-transform" />
                </span>
                {/* Button Shine Effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-in-out" />
                
                {/* Pulse Ring */}
                <span className="absolute -inset-1 rounded-full border border-amber-500/50 opacity-0 group-hover:opacity-100 animate-ping duration-1000" />
                
                {/* Sound Wave Animation */}
                <span className="absolute -inset-2 rounded-full border-2 border-amber-400/20 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
              </Button>
            </Link>
          </div>


          {/* --- MOBILE TOGGLE --- */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-gray-600 hover:bg-gray-100 rounded-xl transition-transform active:scale-90"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>


        {/* --- MOBILE MENU --- */}
        {isOpen && (
          <div className="lg:hidden mt-4 p-2 bg-white/90 backdrop-blur-xl rounded-3xl border border-gray-200 shadow-2xl animate-in slide-in-from-top-5 fade-in duration-300">
            <div className="flex flex-col p-2">
              {navItems.map((item) => {
                 const isActive = location.pathname === item.path;
                 return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`p-4 rounded-2xl flex items-center gap-4 font-medium transition-all duration-200
                      ${
                        isActive
                          ? "bg-amber-50 text-amber-800 shadow-sm"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 hover:pl-6"
                      }`}
                  >
                    <div className={`p-2 rounded-xl ${isActive ? "bg-amber-100 text-amber-600" : "bg-gray-100 text-gray-500"}`}>
                        <item.icon className="h-5 w-5" />
                    </div>
                    {item.label}
                  </Link>
                 )
              })}

              <div className="h-px bg-gray-100 my-2 mx-4" />

              {/* Mobile Hire Button WITH SOUND */}
              <Link to="/contact" onClick={triggerConfettiWithSound}>
                <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-7 rounded-2xl font-semibold shadow-lg active:scale-95 transition-transform mt-2 text-lg flex items-center justify-center gap-2">
                  Hire Me Now <Sparkles className="h-5 w-5 text-white" />
                  <Volume2 className="h-4 w-4 text-white/70" />
                </Button>
              </Link>
              
              {/* Simple Mobile Socials */}
              <div className="flex justify-center gap-8 py-4 mt-2">
                 {[Github, Linkedin, Mail].map((Icon, i) => (
                    <div key={i} className="text-gray-400 hover:text-gray-900 transition-colors">
                        <Icon className="h-6 w-6" />
                    </div>
                 ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};