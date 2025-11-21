import { Link, useNavigate } from 'react-router-dom';
import {
  Code,
  Heart,
  Github,
  Linkedin,
  Mail,
  Twitter,
  Phone,
  MapPin,
  ArrowUp,
  Briefcase,
  Award,
  Users,
  Sparkles,
  ChevronRight,
  Clock,
  Globe,
} from "lucide-react";
import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

export default function Footer() {
  const year = new Date().getFullYear();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [hoveredStat, setHoveredStat] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 120);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  // 🎉 Enhanced Confetti function
  const triggerConfetti = () => {
    const duration = 2500;
    const animationEnd = Date.now() + duration;
    const colors = ["#9400D3", "#4B0082", "#1E40AF", "#10B981", "#FACC15", "#F97316", "#DC2626"];

    const shoot = (particleCount: number, angle: number, origin: { x: number; y: number }, drift: number) => {
      confetti({
        particleCount,
        angle,
        spread: 60,
        origin,
        colors,
        shapes: ["circle", "square"],
        scalar: 1,
        drift,
        startVelocity: 60,
        gravity: 1,
        ticks: 100,
        disableForReducedMotion: true,
      });
    };

    const frame = () => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return;

      const baseCount = 4;
      shoot(baseCount, 70, { x: 0.1, y: 0.9 }, 0.4);
      shoot(baseCount, 110, { x: 0.9, y: 0.9 }, -0.4);
      shoot(baseCount * 0.5, 90, { x: 0.5, y: 0.85 }, 0);

      requestAnimationFrame(frame);
    };

    frame();
  };

  const handleHireMe = () => {
    triggerConfetti();
    setTimeout(() => navigate('/contact'), 800);
  };

  const socialLinks = [
    { 
      name: "GitHub", 
      href: "https://github.com/Suraj1819", 
      icon: <Github className="w-5 h-5" />,
      hoverColor: "hover:bg-gray-800 hover:text-white hover:border-gray-800",
      bgColor: "bg-gray-100 text-gray-700 border-gray-200",
      label: "Follow on GitHub"
    },
    { 
      name: "LinkedIn", 
      href: "https://www.linkedin.com/in/suraj-kumar-72847b30a/", 
      icon: <Linkedin className="w-5 h-5" />,
      hoverColor: "hover:bg-blue-600 hover:text-white hover:border-blue-600",
      bgColor: "bg-blue-50 text-blue-600 border-blue-200",
      label: "Connect on LinkedIn"
    },
    { 
      name: "Twitter", 
      href: "https://x.com/SuraJzRt", 
      icon: <Twitter className="w-5 h-5" />,
      hoverColor: "hover:bg-sky-500 hover:text-white hover:border-sky-500",
      bgColor: "bg-sky-50 text-sky-600 border-sky-200",
      label: "Follow on Twitter"
    },
    { 
      name: "Email", 
      href: "mailto:surajkumarraj8888@gmail.com", 
      icon: <Mail className="w-5 h-5" />,
      hoverColor: "hover:bg-red-500 hover:text-white hover:border-red-500",
      bgColor: "bg-red-50 text-red-600 border-red-200",
      label: "Send an Email"
    },
    { 
      name: "WhatsApp", 
      href: "https://wa.me/919507272341", 
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      ),
      hoverColor: "hover:bg-green-500 hover:text-white hover:border-green-500",
      bgColor: "bg-green-50 text-green-600 border-green-200",
      label: "Chat on WhatsApp"
    },
    { 
      name: "Telegram", 
      href: "https://t.me/surajkumar", 
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
        </svg>
      ),
      hoverColor: "hover:bg-blue-500 hover:text-white hover:border-blue-500",
      bgColor: "bg-blue-50 text-blue-500 border-blue-200",
      label: "Message on Telegram"
    },
  ];

  const quickLinks = [
    { label: "Home", href: "/", icon: <Code className="w-4 h-4" />, desc: "Back to homepage" },
    { label: "About", href: "/about", icon: <Users className="w-4 h-4" />, desc: "Learn about me" },
    { label: "Skills", href: "/skills", icon: <Award className="w-4 h-4" />, desc: "Technical expertise" },
    { label: "Projects", href: "/projects", icon: <Briefcase className="w-4 h-4" />, desc: "View my work" },
    { label: "Services", href: "/services", icon: <Sparkles className="w-4 h-4" />, desc: "What I offer" },
    { label: "Contact", href: "/contact", icon: <Mail className="w-4 h-4" />, desc: "Get in touch" },
  ];

  const stats = [
    { value: "10+", label: "Students Tutored", icon: <Users className="w-5 h-5" />, color: "from-blue-500 to-cyan-500" },
    { value: "300+", label: "Problems Solved", icon: <Award className="w-5 h-5" />, color: "from-purple-500 to-pink-500" },
    { value: "10+", label: "Projects Completed", icon: <Briefcase className="w-5 h-5" />, color: "from-green-500 to-emerald-500" },
    { value: "1+", label: "Years Experience", icon: <Sparkles className="w-5 h-5" />, color: "from-amber-500 to-orange-500" },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-white via-gray-50 to-amber-50 border-t border-gray-200 dark:from-neutral-900 dark:via-neutral-900 dark:to-neutral-800 dark:border-neutral-800 overflow-hidden">
      
      {/* Decorative Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-10 pointer-events-none"></div>
      
      {/* Back to Top Button */}
      {scrolled && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-full shadow-2xl hover:shadow-amber-500/50 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all z-50 group"
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
        </button>
      )}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Stats Section with Enhanced Design */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map((stat) => (
            <div
              key={stat.label}
              onMouseEnter={() => setHoveredStat(stat.label)}
              onMouseLeave={() => setHoveredStat(null)}
              className="relative text-center p-6 bg-white dark:bg-neutral-800 rounded-2xl border border-gray-100 dark:border-neutral-700 hover:border-transparent hover:shadow-2xl transition-all duration-500 hover:scale-105 group overflow-hidden"
            >
              {/* Gradient Background on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
              
              <div className="relative z-10">
                <div className={`flex justify-center mb-3 text-amber-600 dark:text-amber-400 group-hover:scale-125 transition-all duration-500 ${hoveredStat === stat.label ? 'animate-bounce' : ''}`}>
                  {stat.icon}
                </div>
                <p className="text-4xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </p>
                <p className="text-xs font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                  {stat.label}
                </p>
              </div>
              
              {/* Shine Effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            </div>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          
          {/* Brand Section - Enhanced */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="relative p-3 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl shadow-xl group-hover:shadow-2xl transition-shadow">
                <Code className="h-7 w-7 text-white" />
                <div className="absolute -inset-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity"></div>
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent block">
                  SuraJz.dev
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
                  <Globe className="w-3 h-3" />
                  Available Worldwide
                </span>
              </div>
            </div>
            
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Full-stack developer passionate about building elegant solutions and mentoring future developers. 
              <span className="block mt-2 text-amber-600 dark:text-amber-400 font-medium">Let's create something amazing together!</span>
            </p>
            
            {/* Contact Info - Enhanced */}
            <div className="space-y-3">
              <a 
                href="tel:+919507272341" 
                className="flex items-center gap-3 text-sm text-gray-600 hover:text-amber-600 dark:text-gray-400 dark:hover:text-amber-400 transition-all group"
              >
                <div className="p-2.5 bg-gradient-to-br from-gray-100 to-gray-50 dark:from-neutral-800 dark:to-neutral-700 rounded-xl group-hover:from-amber-50 group-hover:to-orange-50 dark:group-hover:from-amber-900/30 dark:group-hover:to-orange-900/30 transition-all group-hover:scale-110 shadow-sm">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-medium">+91 9507272341</span>
                  <span className="block text-xs text-gray-400">Available 24/7</span>
                </div>
              </a>
              
              <a 
                href="https://maps.app.goo.gl/pZJYM4rZkzg4TRSD6" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-3 text-sm text-gray-600 hover:text-amber-600 dark:text-gray-400 dark:hover:text-amber-400 transition-all group"
              >
                <div className="p-2.5 bg-gradient-to-br from-gray-100 to-gray-50 dark:from-neutral-800 dark:to-neutral-700 rounded-xl group-hover:from-amber-50 group-hover:to-orange-50 dark:group-hover:from-amber-900/30 dark:group-hover:to-orange-900/30 transition-all group-hover:scale-110 shadow-sm">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-medium">Vaishali, Bihar, India</span>
                  <span className="block text-xs text-gray-400">Remote Friendly</span>
                </div>
              </a>
            </div>

            {/* Hire Me Button - Enhanced with Confetti */}
            <button
              onClick={handleHireMe}
              className="relative w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white rounded-xl font-bold shadow-xl hover:shadow-2xl hover:shadow-amber-500/50 hover:scale-105 transition-all duration-300 group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <Sparkles className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500 relative z-10" />
              <span className="relative z-10">Hire Me Now</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" />
              
              {/* Animated shine */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
            </button>

            {/* Availability Badge */}
            <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </div>
              <span className="text-xs font-medium text-green-700 dark:text-green-300">Available for freelance projects</span>
            </div>
          </div>

          {/* Quick Links - Enhanced */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-amber-500 to-orange-500 rounded-full"></div>
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.href} 
                    className="group flex items-center gap-3 p-3 rounded-xl hover:bg-amber-50 dark:hover:bg-neutral-800 transition-all duration-300"
                  >
                    <div className="p-2 bg-gradient-to-br from-gray-100 to-gray-50 dark:from-neutral-800 dark:to-neutral-700 rounded-lg group-hover:from-amber-100 group-hover:to-orange-100 dark:group-hover:from-amber-900/30 dark:group-hover:to-orange-900/30 transition-all group-hover:scale-110 shadow-sm">
                      {link.icon}
                    </div>
                    <div className="flex-1">
                      <span className="block text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-amber-600 dark:group-hover:text-amber-400">
                        {link.label}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
                        {link.desc}
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-amber-600 group-hover:translate-x-1 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Connect - Enhanced */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-amber-500 to-orange-500 rounded-full"></div>
              Connect With Me
            </h3>
            <div className="grid grid-cols-3 gap-3 mb-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`relative group p-4 rounded-xl border ${social.bgColor} ${social.hoverColor} transition-all duration-300 flex flex-col items-center justify-center hover:scale-110 hover:shadow-xl overflow-hidden`}
                  aria-label={social.label}
                  title={social.label}
                >
                  <div className="relative z-10">
                    {social.icon}
                  </div>
                  
                  {/* Tooltip */}
                  <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    {social.label}
                  </span>
                  
                  {/* Shine Effect */}
                  <div className="absolute inset-0 -translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
                </a>
              ))}
            </div>
            
            {/* CTA Box */}
            <div className="relative p-5 bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 dark:from-neutral-800 dark:via-neutral-800 dark:to-neutral-700 rounded-2xl border border-amber-200 dark:border-neutral-600 shadow-lg overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-amber-400/20 to-orange-400/20 rounded-full blur-2xl"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span className="font-bold text-amber-700 dark:text-amber-300 text-sm">Open to Opportunities!</span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                  Looking for a dedicated developer? Let's discuss your next project and bring your ideas to life.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider with Gradient */}
        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200 dark:border-neutral-800"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="px-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-medium rounded-full py-1">
              Portfolio © {year}
            </span>
          </div>
        </div>

        {/* Bottom Section - Enhanced */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          
          {/* Copyright */}
          <div className="text-center md:text-left">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © {year} <span className="font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">SuraJz Kumar</span>. All rights reserved.
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
              Crafted with dedication and passion for excellence
            </p>
          </div>
          
          {/* Made With Love */}
          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-amber-600 dark:text-gray-400 dark:hover:text-amber-400 transition-all group cursor-pointer"
            aria-label="Back to top"
          >
            <span className="font-medium">Made with</span>
            <Heart className="w-5 h-5 text-red-500 fill-red-500 group-hover:scale-125 transition-transform animate-pulse" />
            <span className="font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">by SuraJz</span>
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>

      <style>{`
        .bg-grid-pattern {
          background-image: radial-gradient(circle, #00000008 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>
    </footer>
  );
}