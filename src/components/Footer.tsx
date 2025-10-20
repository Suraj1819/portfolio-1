import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  // Brand + UI
  Code,
  Heart,
  ChevronRight,
  ChevronDown,
  ArrowUp,

  // Social
  Github,
  Linkedin,
  Mail,
  Twitter,

  // Contact
  Phone,
  MapPin,
  Copy,

  // Content
  BookOpen,
  Award,
  Users,
  Star,

  // Tech
  Terminal,
  Globe,
  Database,
  Cpu,
  Palette,
  Server,
  GitBranch,

  // Actions
  ExternalLink,
  Download,
  Eye,
  Send,
  CheckCircle,
  AlertCircle,
  X,

} from "lucide-react";
import { useState, useEffect } from 'react';

// Define the footer section type
type FooterSection = 'brand' | 'quick' | 'resources' | 'services' | 'contact';

// Define the open state interface
interface FooterOpenState {
  brand: boolean;
  quick: boolean;
  resources: boolean;
  services: boolean;
  contact: boolean;
}

export default function Footer() {
  const year = new Date().getFullYear();
  const navigate = useNavigate();
  const location = useLocation();

  // UI states
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [subscribing, setSubscribing] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showResumePreview, setShowResumePreview] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  // New state for the extra collapsible button in quick links
  const [extraOpen, setExtraOpen] = useState(false);

  // Collapsible sections (mobile)
  const [open, setOpen] = useState<FooterOpenState>({
    brand: true,
    quick: true,
    resources: true,
    services: true,
    contact: true,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 120);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggle = (key: FooterSection) => 
    setOpen((prev) => ({ ...prev, [key]: !prev[key] }));

  const quickLinks = [
    { label: "Home", href: "/", icon: <Globe className="w-4 h-4" />, description: "Welcome to my portfolio" },
    { label: "About", href: "/about", icon: <Users className="w-4 h-4" />, description: "Learn more about me" },
    { label: "Skills", href: "/skills", icon: <Award className="w-4 h-4" />, description: "Technical expertise" },
    { label: "Projects", href: "/projects", icon: <Code className="w-4 h-4" />, description: "My work showcase" },
    { label: "Services", href: "/services", icon: <Cpu className="w-4 h-4" />, description: "What I offer" },
    { label: "Blog", href: "/blog", icon: <BookOpen className="w-4 h-4" />, description: "Latest articles" },
  ];


  const myExpertise = [
    { name: 'C++', href: '/cplusplus', icon: <Terminal className="w-4 h-4" /> },
    { name: 'Python', href: '/python', icon: <Terminal className="w-4 h-4" /> },
    { name: 'DSA', href: '/dsa', icon: <GitBranch className="w-4 h-4" /> },
    { name: 'Web Dev', href: '/webdev', icon: <Globe className="w-4 h-4" /> },
  ];

  const techStack = [
    // { name: 'C++', level: 90, color: 'bg-blue-500', href: '/cplusplus', icon: <Terminal className="w-4 h-4" />, internal: true },
    // { name: 'Python', level: 85, color: 'bg-green-500', href: '/python', icon: <Terminal className="w-4 h-4" />, internal: true },
    // { name: 'DSA', level: 88, color: 'bg-purple-500', href: '/dsa', icon: <Award className="w-4 h-4" />, internal: true },
    // { name: 'WebDev', level: 85, color: 'bg-indigo-500', href: '/webdev', icon: <Globe className="w-4 h-4" />, internal: true },
      { name: 'C++', level: 88, color: 'bg-yellow-500', officialLink: 'https://cplusplus.com/', icon: <Globe className="w-4 h-4" />, internal: false },
        { name: 'Python', level: 88, color: 'bg-yellow-500', officialLink: 'https://www.python.org/', icon: <Globe className="w-4 h-4" />, internal: false },
    { name: 'DSA', level: 88, color: 'bg-yellow-500', officialLink: 'https://the-algorithms.com/', icon: <Globe className="w-4 h-4" />, internal: false },
    { name: 'WevDev', level: 88, color: 'bg-yellow-500', officialLink: 'https://web.dev/', icon: <Globe className="w-4 h-4" />, internal: false },

    // { name: 'WevDev', level: 88, color: 'bg-yellow-500', officialLink: 'https://web.dev/', icon: <Globe className="w-4 h-4" />, internal: false },
    
      { name: 'JavaScript', level: 88, color: 'bg-yellow-500', officialLink: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript', icon: <Globe className="w-4 h-4" />, internal: false },
    { name: 'React', level: 85, color: 'bg-cyan-500', officialLink: 'https://react.dev/', icon: <Code className="w-4 h-4" />, internal: false },
    { name: 'Node.js', level: 80, color: 'bg-green-600', officialLink: 'https://nodejs.org/', icon: <Server className="w-4 h-4" />, internal: false },
    { name: 'Tailwind CSS', level: 85, color: 'bg-teal-500', officialLink: 'https://tailwindcss.com/', icon: <Palette className="w-4 h-4" />, internal: false },
    { name: 'MongoDB', level: 75, color: 'bg-green-700', officialLink: 'https://www.mongodb.com/', icon: <Database className="w-4 h-4" />, internal: false },
    { name: 'Git', level: 88, color: 'bg-orange-600', officialLink: 'https://git-scm.com/', icon: <GitBranch className="w-4 h-4" />, internal: false },
  ];

  const learningResources = [
    { label: "C++ Documentation", href: "https://isocpp.org/", icon: <Terminal className="w-4 h-4" />, description: "ISO C++ official site", external: true },
    { label: "Python.org", href: "https://www.python.org/", icon: <Terminal className="w-4 h-4" />, description: "Python official website", external: true },
    { label: "MDN Web Docs", href: "https://developer.mozilla.org/", icon: <Globe className="w-4 h-4" />, description: "Web technology docs", external: true },
    { label: "React Docs", href: "https://react.dev/learn", icon: <Code className="w-4 h-4" />, description: "React official docs", external: true },
    { label: "Node.js Docs", href: "https://nodejs.org/en/docs", icon: <Server className="w-4 h-4" />, description: "Node.js documentation", external: true },
    { label: "LeetCode", href: "https://leetcode.com/problemset/", icon: <Star className="w-4 h-4" />, description: "Practice coding problems", external: true },
  ];

  const services = [
    { label: "Web Development", icon: <Code className="w-4 h-4" />, description: "Full-stack web solutions" },
    { label: "Mobile Apps", icon: <Cpu className="w-4 h-4" />, description: "iOS & Android development" },
    { label: "Mentoring", icon: <Users className="w-4 h-4" />, description: "1-on-1 programming guidance" },
    { label: "Consulting", icon: <Award className="w-4 h-4" />, description: "Technical consulting services" },
  ];

  const socials = [
    { icon: <Github className="w-5 h-5" />, href: "https://github.com/Suraj1819", label: "GitHub" },
    { icon: <Linkedin className="w-5 h-5" />, href: "https://www.linkedin.com/in/suraj-kumar-72847b30a/", label: "LinkedIn" },
    { icon: <Twitter className="w-5 h-5" />, href: "https://x.com/SuraJzRt", label: "Twitter" },
    { icon: <Mail className="w-5 h-5" />, href: "mailto:surajkumarraj8888@gmail.com", label: "Email" },
  ];

  const testimonials = [
    { name: "Rahul Sharma", role: "B.Tech Student", quote: "Excellent mentoring! Helped me understand complex DSA concepts easily.", rating: 5 },
    { name: "Priya Singh", role: "Developer", quote: "Great guidance for web development. Very patient and knowledgeable.", rating: 5 },
  ];

  const legalLinks = [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Accessibility", href: "/access" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "Sitemap", href: "/sitemap" },
  ];

  const stats = [
    { value: "10+", label: "Students tutored", icon: <Users className="w-4 h-4" /> },
    { value: "300+", label: "Problems Solved", icon: <CheckCircle className="w-4 h-4" /> },
    { value: "10+", label: "Projects", icon: <Code className="w-4 h-4" /> },
    { value: "1+", label: "Years Experience", icon: <Award className="w-4 h-4" /> },
  ];

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const validateEmail = (val : string) : boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(val);
  };

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }
    
    setEmailError('');
    setSubscribing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setSubscribing(false);
    setSubscribed(true);
    
    // Navigate to thank you page after showing success
    setTimeout(() => {
      navigate('/subscribe');
    }, 1500);
  };

  const copyEmailToClipboard = async () => {
    try {
      await navigator.clipboard.writeText('surajkumarraj8888@gmail.com');
      setEmailError('');
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch {
      setEmailError('Could not copy email. Please try manually.');
    }
  };

  return (
    <footer className="bg-white border-t border-gray-200 dark:bg-neutral-900 dark:border-neutral-800">
      {/* Back to top */}
      {scrolled && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 bg-amber-500 text-white rounded-full shadow-lg hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all z-50"
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <section aria-labelledby="footer-brand" className="lg:col-span-2">
            <button
              type="button"
              onClick={() => toggle('brand')}
              className="flex w-full items-center justify-between md:justify-start md:pointer-events-none"
              aria-controls="footer-brand-panel"
              aria-expanded={open.brand}
            >
              <div className="flex items-center gap-3">
                <span className="p-3 bg-amber-100 rounded-xl shadow-sm dark:bg-amber-900/30">
                  <Code className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                </span>
                <h2 id="footer-brand" className="text-2xl font-bold text-gray-900 dark:text-white">
                  SuraJz.dev
                </h2>
              </div>
              <ChevronDown
                className={`w-5 h-5 text-gray-500 md:hidden transition-transform ${open.brand ? 'rotate-180' : ''}`}
                aria-hidden="true"
              />
            </button>

            <div id="footer-brand-panel" className={`mt-4 ${open.brand ? 'block' : 'hidden md:block'}`}>
              <p className="text-gray-600 text-sm dark:text-gray-300">
                Passionate Software Engineer dedicated to creating elegant solutions and empowering others
                through programming education and mentorship.
              </p>
              {/* MODIFICATION : My Created page links */}
              <div className="mt-5">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  My Expertise
                </h4>
                {/*TODO:Use myExpertise*/}
                <div className="grid grid-cols-2 gap-2">
                  {myExpertise.map((tech) => (
                    <Link
                      key={tech.name}
                      to={tech.href}
                      className="group relative flex items-center p-2 bg-gray-50 rounded-lg hover:bg-amber-50 transition-colors dark:bg-neutral-800 dark:hover:bg-neutral-700"
                      aria-label={`Learn more about ${tech.name}`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-amber-600 dark:text-amber-400">{tech.icon}</span>
                        <span className="text-xs font-medium text-gray-700 group-hover:text-amber-700 dark:text-gray-200 dark:group-hover:text-amber-300">
                          {tech.name}
                        </span>
                      </div>
                      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform"></div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Tech stack (internal and external links) */}
              <div className="mt-5">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  Tech Stack
                  <span className="text-xs text-gray-500 dark:text-gray-400">(Navigate to official docs)</span>
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {techStack.map((tech) => (
                    tech.internal ? (
                      <Link
                        key={tech.name}
                        to={tech.officialLink}
                        className="group relative flex items-center justify-between p-2 bg-gray-50 rounded-lg hover:bg-amber-50 transition-colors dark:bg-neutral-800 dark:hover:bg-neutral-700"
                        aria-label={`Navigate to ${tech.name} page`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-amber-600 dark:text-amber-400">{tech.icon}</span>
                          <span className="text-xs font-medium text-gray-700 group-hover:text-amber-700 dark:text-gray-200 dark:group-hover:text-amber-300">
                            {tech.name}
                          </span>
                        </div>
                        <ChevronRight className="w-3 h-3 text-gray-400 group-hover:text-amber-600 dark:text-gray-500" />
                        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform"></div>
                      </Link>
                    ) : (
                      <a
                        key={tech.name}
                        href={tech.officialLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative flex items-center justify-between p-2 bg-gray-50 rounded-lg hover:bg-amber-50 transition-colors dark:bg-neutral-800 dark:hover:bg-neutral-700"
                        aria-label={`Open official ${tech.name} documentation`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-amber-600 dark:text-amber-400">{tech.icon}</span>
                          <span className="text-xs font-medium text-gray-700 group-hover:text-amber-700 dark:text-gray-200 dark:group-hover:text-amber-300">
                            {tech.name}
                          </span>
                        </div>
                        <ExternalLink className="w-3 h-3 text-gray-400 group-hover:text-amber-600 dark:text-gray-500" />
                        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform"></div>
                      </a>
                    )
                  ))}
                </div>
              </div>

              {/* Socials */}
              <div className="mt-5 flex gap-3">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target={social.label !== 'Email' ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="p-2.5 text-gray-500 bg-white border border-gray-200 rounded-lg hover:text-amber-700 hover:border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-300 transition-all dark:text-gray-300 dark:bg-neutral-800 dark:border-neutral-700 dark:hover:text-amber-300 hover:scale-125 duration-300"
                  >
                    {social.icon}
                    <span className="sr-only">{social.label}</span>
                  </a>
                ))}
              </div>

              {/* Testimonials */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {testimonials.map((t) => (
                  <figure key={t.name} className="p-3 bg-gray-50 rounded-lg border border-gray-100 dark:bg-neutral-800 dark:border-neutral-700">
                    <figcaption className="flex items-center gap-2 mb-1">
                      <Users className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{t.name}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">• {t.role}</span>
                    </figcaption>
                    <blockquote className="text-sm text-gray-600 dark:text-gray-300">"{t.quote}"</blockquote>
                    <div className="mt-2 flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${i < t.rating ? 'text-amber-500 fill-amber-500' : 'text-gray-300 dark:text-gray-600'}`}
                          aria-hidden="true"
                        />
                      ))}
                      <span className="sr-only">Rating: {t.rating} out of 5</span>
                    </div>
                  </figure>
                ))}
              </div>
            </div>
          </section>

          <section aria-labelledby="footer-quick">
            <button
              type="button"
              onClick={() => toggle('quick')}
              className="flex w-full items-center justify-between md:justify-start md:pointer-events-none"
              aria-controls="footer-quick-panel"
              aria-expanded={open.quick}
            >
              <h3 id="footer-quick" className="text-lg font-bold text-gray-800 dark:text-white">Quick Links</h3>
              <ChevronDown className={`w-5 h-5 text-gray-500 md:hidden transition-transform ${open.quick ? 'rotate-180' : ''}`} />
            </button>
            <nav id="footer-quick-panel" className={`mt-3 ${open.quick ? 'block' : 'hidden md:block'}`} aria-label="Footer Quick Links">
              <ul className="space-y-2">
                {quickLinks.map((link) => {
                  const isActive = location.pathname === link.href;
                  return (
                    <li key={link.label}>
                      <Link
                        to={link.href}
                        className={`group flex items-center p-2 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-amber-300 duration-300 hover:scale-105  ${
                          isActive
                            ? 'bg-amber-50 text-amber-700 dark:bg-neutral-800 dark:text-amber-300'
                            : 'hover:bg-amber-50 text-gray-700 dark:text-gray-300 dark:hover:bg-neutral-800'
                        }`}
                        aria-current={isActive ? 'page' : undefined}
                      >
                        <span className="text-amber-600 mr-3">
                          <ChevronRight className="w-4 h-4" />
                        </span>
                        <div>
                          <span className={`font-medium text-sm ${isActive ? 'text-amber-700 dark:text-amber-300' : ''}`}>
                            {link.label}
                          </span>
                          <p className="text-xs text-gray-500 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                            {link.description}
                          </p>
                        </div>
                      </Link>
                    </li>
                  );
                })}
                {/* New button "More" with sub-buttons */}
                <li key="extra">
                  <button
                    onClick={() => setExtraOpen(!extraOpen)}
                    className="group flex items-center p-2 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-amber-300 hover:bg-amber-50 text-gray-700 dark:text-gray-300 w-full duration-300 hover:scale-105"
                  >
                    <span className="text-amber-600 mr-3">
                      <ChevronRight className={`w-4 h-4 transition-transform ${extraOpen ? 'rotate-90' : ''}`} />
                    </span>
                    <div>
                      <span className="font-medium text-sm  mr-32">More</span>
                      <p className="text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity">
                        Explore more pages
                      </p>
                    </div>
                  </button>
                  {extraOpen && (
                    <ul className="mt-2 ml-6 space-y-2 ">
                      <li>
                        <Link
                          to="/cplusplus"
                          className="flex items-center p-2 rounded-lg hover:bg-amber-50 text-gray-700 dark:text-gray-300 transition-all duration-300 hover:scale-105"
                        >
                          <span className="mr-3"><ChevronRight className="w-4 h-4" /></span>
                          <span className="font-medium text-sm">C++</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/python"
                          className="flex items-center p-2 rounded-lg hover:bg-amber-50 text-gray-700 dark:text-gray-300 transition-all duration-300 hover:scale-105"
                        >
                          <span className="mr-3"><ChevronRight className="w-4 h-4" /></span>
                          <span className="font-medium text-sm">Python</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/dsa"
                          className="flex items-center p-2 rounded-lg hover:bg-amber-50 text-gray-700 dark:text-gray-300 transition-all duration-300 hover:scale-105"
                        >
                          <span className="mr-3"><ChevronRight className="w-4 h-4" /></span>
                          <span className="font-medium text-sm">DSA</span>
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/webdev"
                          className="flex items-center p-2 rounded-lg hover:bg-amber-50 text-gray-700 dark:text-gray-300 transition-all duration-300 hover:scale-105"
                        >
                          <span className="mr-3"><ChevronRight className="w-4 h-4" /></span>
                          <span className="font-medium text-sm">WebDev</span>
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>
              </ul>
            </nav>
          </section>
          

          {/* Learning Resources */}
          <section aria-labelledby="footer-resources">
            <button
              type="button"
              onClick={() => toggle('resources')}
              className="flex w-full items-center justify-between md:justify-start md:pointer-events-none "
              aria-controls="footer-resources-panel"
              aria-expanded={open.resources}
            >
              <h3 id="footer-resources" className="text-lg font-bold text-gray-800 dark:text-white">Learning Resources</h3>
              <ChevronDown className={`w-5 h-5 text-gray-500 md:hidden transition-transform ${open.resources ? 'rotate-180' : ''}`} />
            </button>

            <div id="footer-resources-panel" className={`mt-3 ${open.resources ? 'block' : 'hidden md:block'}`}>
              <ul className="space-y-2">
                {learningResources.map((resource) => (
                  <li key={resource.label}>
                    <a
                      href={resource.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start gap-3 p-2 rounded-lg hover:bg-amber-50  focus:outline-none focus:ring-2 focus:ring-amber-300 dark:hover:bg-neutral-800 duration-300 hover:scale-105 transition-all"
                      aria-label={`${resource.label} — opens in a new tab`}
                    >
                      <span className="text-amber-600 mt-0.5">{resource.icon}</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-1">
                          <span className="text-gray-700 group-hover:text-amber-700 font-medium text-sm dark:text-gray-200 dark:group-hover:text-amber-300">
                            {resource.label}
                          </span>
                          {resource.external && <ExternalLink className="w-3 h-3 text-gray-400 dark:text-gray-500" />}
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                          {resource.description}
                        </p>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>

              {/* Helpful alternates */}
              <div className="mt-4 text-xs text-gray-500 dark:text-gray-400 ">
                <p>
                  Tip: For deep C++ references, visit{' '}
                  <a href="https://en.cppreference.com/w/" target="_blank" rel="noopener noreferrer" className="text-amber-700 hover:underline dark:text-amber-300">
                    cppreference.com
                  </a>
                  . For JavaScript APIs, explore{' '}
                  <a href="https://developer.mozilla.org/docs/Web/JavaScript" target="_blank" rel="noopener noreferrer" className="text-amber-700 hover:underline dark:text-amber-300">
                    MDN JavaScript
                  </a>
                  .
                </p>
              </div>
            </div>
          </section>

          {/* Services + Contact */}
          <section aria-labelledby="footer-services" className="space-y-6">
            {/* Services - Now behaves like Quick Links */}
            <div>
              <button
                type="button"
                onClick={() => toggle('services')}
                className="flex w-full items-center justify-between md:justify-start md:pointer-events-none"
                aria-controls="footer-services-panel"
                aria-expanded={open.services}
              >
                <h3 id="footer-services" className="text-lg font-bold text-gray-800 dark:text-white">Services</h3>
                <ChevronDown className={`w-5 h-5 text-gray-500 md:hidden transition-transform ${open.services ? 'rotate-180' : ''}`} />
              </button>
              <nav id="footer-services-panel" className={`mt-3 ${open.services ? 'block' : 'hidden md:block'}`} aria-label="Footer Services">
                <ul className="space-y-2">
                  {services.map((service) => (
                    <li key={service.label}>
                      <Link
                        to="/services"
                        className="group flex items-center p-2 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-amber-300 hover:bg-amber-50 text-gray-700 dark:text-gray-300 dark:hover:bg-neutral-800 duration-300 hover:scale-105"
                      >
                        <span className="text-amber-600 mr-3">
                          <ChevronRight className="w-4 h-4" />
                        </span>
                        <div>
                          <span className="font-medium text-sm">
                            {service.label}
                          </span>
                          <p className="text-xs text-gray-500 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                            {service.description}
                          </p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Contact */}
            <div>
              <button
                type="button"
                onClick={() => toggle('contact')}
                className="flex w-full items-center justify-between md:justify-start md:pointer-events-none"
                aria-controls="footer-contact-panel"
                aria-expanded={open.contact}
              >
                <h3 id="footer-contact" className="text-lg font-bold text-gray-800 dark:text-white">Contact</h3>
                <ChevronDown className={`w-5 h-5 text-gray-500 md:hidden transition-transform ${open.contact ? 'rotate-180' : ''}`} />
              </button>
              <div id="footer-contact-panel" className={`mt-3 ${open.contact ? 'block' : 'hidden md:block'}`}>
                <div className="space-y-3">
                  {/* Email Section - Fixed overflow issue */}
                  <div className="group relative">
                    <div className="flex items-center gap-2 p-3 bg-amber-50 rounded-lg border-2 border-amber-200 hover:border-amber-400  dark:bg-neutral-800 dark:border-neutral-700 dark:hover:border-amber-600 duration-300 hover:scale-105 transition-all">
                      <Mail className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <a
                          href="mailto:surajkumarraj8888@gmail.com"
                          className="text-sm font-medium text-gray-800 hover:text-amber-700 transition-colors dark:text-gray-200 dark:hover:text-amber-300 truncate block "
                        >
                          surajkumarraj8888@gmail.com
                        </a>
                      </div>
                      <button
                        type="button"
                        onClick={copyEmailToClipboard}
                        className={`p-2 rounded-md transition-all duration-300 flex-shrink-0 ${
                          copySuccess 
                            ? 'bg-green-500 text-white' 
                            : 'bg-white hover:bg-amber-100 text-gray-600 hover:text-amber-700 border border-amber-300'
                        } focus:outline-none focus:ring-2 focus:ring-amber-400`}
                        aria-label="Copy email address"
                        title="Copy email"
                      >
                        {copySuccess ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    {copySuccess && (
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-green-600 text-white text-xs px-3 py-1 rounded-full whitespace-nowrap animate-fade-in">
                        Email copied!
                      </div>
                    )}
                  </div>

                  {/* Phone */}
                  <a
                    href="tel:+919507272341"
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-amber-50 hover:border-amber-300 transition-all group dark:bg-neutral-800 dark:border-neutral-700 dark:hover:bg-neutral-700 dark:hover:border-amber-600 duration-300 hover:scale-105"
                  >
                    <Phone className="w-5 h-5 text-gray-500 group-hover:text-amber-600 dark:text-gray-400 dark:group-hover:text-amber-400" />
                    <span className="text-sm font-medium text-gray-700 group-hover:text-amber-700 dark:text-gray-300 dark:group-hover:text-amber-300">
                      +91 9507272341
                    </span>
                  </a>

                  {/* Location */}
                  <a
                    href="https://maps.app.goo.gl/pZJYM4rZkzg4TRSD6" target='_blank'
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-amber-50 hover:border-amber-300 transition-all group dark:bg-neutral-800 dark:border-neutral-700 dark:hover:bg-neutral-700 dark:hover:border-amber-600 duration-300 hover:scale-105"
                  >
                    <MapPin className="w-5 h-5 text-gray-500 group-hover:text-amber-600 dark:text-gray-400 dark:group-hover:text-amber-400" />
                    <span className="text-sm font-medium text-gray-700 group-hover:text-amber-700 dark:text-gray-300 dark:group-hover:text-amber-300">
                      Vaishali, Bihar, India
                    </span>
                  </a>
                </div>

                {/* Resume Section */}
                <div className="mt-6">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    Resume
                  </h4>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setShowResumePreview(true)}
                      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50"
                    >
                      <Eye className="w-4 h-4" />
                      Preview Resume
                    </button>
                    <a
                      href="/resume.pdf"
                      download
                      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-amber-50 hover:text-amber-700 rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-amber-300 dark:bg-neutral-700 dark:text-gray-300 dark:hover:bg-neutral-600 dark:hover:text-amber-300"
                    >
                      <Download className="w-4 h-4" />
                      Download PDF
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Resume Preview Modal - Shows Local Image */}
        {showResumePreview && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowResumePreview(false)}
          >
            <div 
              className="bg-white rounded-xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden dark:bg-neutral-900"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-800">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Resume Preview</h3>
                <div className="flex items-center gap-2">
                  <a
                    href="/resume.pdf"
                    download
                    className="px-3 py-1.5 text-sm bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors flex items-center gap-1"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </a>
                  <button
                    onClick={() => setShowResumePreview(false)}
                    className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-amber-300 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-neutral-700"
                    aria-label="Close preview"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="overflow-auto" style={{ height: 'calc(90vh - 73px)' }}>
                <div className="flex justify-center items-center p-8 bg-white dark:bg-neutral-900">
                  <img 
                    src="https://cdn.pixabay.com/photo/2018/08/13/22/53/resume-3604240_1280.jpg" 
                    alt="Resume Preview" 
                    className="max-w-full h-auto rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Newsletter */}
        <section aria-labelledby="footer-newsletter" className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-6 mb-12 dark:from-neutral-800 dark:to-neutral-800">
          <div className="text-center mb-4">
            <h3 id="footer-newsletter" className="text-lg font-bold text-gray-800 dark:text-white mb-1">Stay Updated</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">Get the latest tutorials and updates delivered to your inbox</p>
          </div>
          <form onSubmit={handleSubscribe} noValidate className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <label htmlFor="newsletter-email" className="sr-only">Email address</label>
            <input
              id="newsletter-email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError('');
              }}
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-lg border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all duration-300 dark:bg-neutral-900 dark:border-neutral-700 dark:text-gray-200"
              required
              disabled={subscribing || subscribed}
              aria-invalid={!!emailError}
              aria-describedby={emailError ? 'newsletter-error' : undefined}
            />
            <button
              type="submit"
              disabled={subscribing || subscribed}
              className="px-6 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-300 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-amber-400 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {subscribing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Subscribing...
                </>
              ) : subscribed ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  Subscribed!
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Subscribe
                </>
              )}
            </button>
          </form>

          <div className="mt-3 flex justify-center">
            {emailError && (
              <div id="newsletter-error" className="flex items-center gap-2 text-red-600 text-sm" role="alert">
                <AlertCircle className="w-4 h-4" />
                {emailError}
              </div>
            )}
            {subscribed && !emailError && (
              <div className="flex items-center gap-2 text-amber-600 text-sm" role="status" aria-live="polite">
                <CheckCircle className="w-4 h-4" />
                Redirecting to subscription page...
              </div>
            )}
          </div>
        </section>

        {/* Stats */}
        <section aria-labelledby="footer-stats" className="mb-12">
          <h3 id="footer-stats" className="sr-only">Quick Stats</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="text-center p-4 bg-white rounded-lg border border-gray-100 hover:border-amber-200 hover:shadow-md transition-all hover:scale-105 duration-300 dark:bg-neutral-800 dark:border-neutral-700 hover:cursor-pointer"
              >
                <div className="flex justify-center mb-2 text-amber-600 dark:text-amber-400">
                  {stat.icon}
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer Bottom */}
        <div className="border-t border-gray-200 dark:border-neutral-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Legal */}
            <div className="text-center md:text-left">
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                © {year} SuraJz Kumar. All rights reserved.
              </p>
              <nav aria-label="Legal links" className="flex flex-wrap gap-4 justify-center md:justify-start">
                {legalLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="text-xs text-gray-500 hover:text-amber-700 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-300 rounded dark:text-gray-400 dark:hover:text-amber-300"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Made with */}
            <button
              type="button"
              onClick={scrollToTop}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-amber-700 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-300 rounded dark:text-gray-300 dark:hover:text-amber-300"
              aria-label="Back to top"
            >
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current animate-bounce" />
              <span>by SuraJz Kumar • Back to top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}