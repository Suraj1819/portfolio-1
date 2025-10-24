import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  FileText,
  Mail,
  Server,
  Smartphone,
  Globe2,
  AlertTriangle,
  CheckCircle,
  Clock,
  ChevronDown,
  ChevronRight,
  Heart,
  Info,
  RefreshCw,
  Cookie,
  HelpCircle,
  Target,
  Home as HomeIcon,
  User,
  FolderKanban,
  BookOpen,
  MessageCircle,
  ExternalLink,
  ArrowRight,
  Zap,
  Code,
  Palette,
  Layers,
  Github,
  Linkedin,
  Twitter,
  Rocket,
  Calendar,
  Lightbulb,
  Users,
  BarChart3,
  Building,
  GraduationCap,
  Award,
  Settings,
  Share2,
  Download,
  Search,
  Filter,
  Grid,
  List,
  Map,
  Briefcase,
  Star,
  TrendingUp,
  Package,
  Database,
  Wifi,
  Monitor,
  Eye,
  Bell,
  FileCode,
  GitBranch,
  Activity,
  ShoppingCart,
  Send,
} from 'lucide-react';
import Footer from '../components/Footer';

const Sitemap = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('');
  const [expandedSections, setExpandedSections] = useState(new Set<string>());
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [animatedCards, setAnimatedCards] = useState(new Set<string>());
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Newsletter State Management
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'subscribing' | 'success' | 'error'>('idle');
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setExpandedSections(new Set(['home']));
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  // Intersection Observer for upward animations
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAnimatedCards((prev) => new Set([...prev, entry.target.id]));
          }
        });
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    const cards = document.querySelectorAll('.animate-on-scroll');
    cards.forEach((card) => {
      if (observerRef.current) observerRef.current.observe(card);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [isLoading]);

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) newExpanded.delete(sectionId);
    else newExpanded.add(sectionId);
    setExpandedSections(newExpanded);
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(`section-${sectionId}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(sectionId);
      setExpandedSections((prev) => new Set([...prev, sectionId]));
    }
  };

  // Newsletter Submission Handler
  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || newsletterStatus === 'subscribing' || redirecting) return;

    setNewsletterStatus('subscribing');
    
    // Simulate API call/processing time
    setTimeout(() => {
      if (newsletterEmail.includes('@')) {
        setNewsletterStatus('success');
        
        // Simulate redirecting after a short delay
        setTimeout(() => {
          setRedirecting(true);
          // In a real app, you would navigate: navigate('/subscribe-confirmation?email=' + newsletterEmail);
          console.log(`Simulated Redirect to subscription page for: ${newsletterEmail}`);
          // Reset state for next interaction (though in a real redirect, this component unmounts)
          setNewsletterEmail('');
          setNewsletterStatus('idle');
          setRedirecting(false);
        }, 1500); 
      } else {
        setNewsletterStatus('error');
        console.error("Invalid email format.");
      }
    }, 1000);
  };

  // Enhanced site sections data with more details
  const sitePages = [
    {
      id: 'home',
      title: 'Home',
      icon: HomeIcon,
      gradient: 'from-amber-500 to-orange-600',
      description: 'Welcome page with portfolio overview',
      category: 'main' as const,
      features: [
        'Dynamic hero section with animations',
        'Featured projects carousel',
        'Quick navigation dashboard',
        'Latest updates feed',
        'Call-to-action buttons',
        'Social proof and testimonials preview'
      ],
      stats: { visits: '10K+', rating: '4.9', updated: '2 days ago' },
      link: '/',
      subPages: [
        { name: 'Hero Section', link: '/#hero' },
        { name: 'Featured Work', link: '/#featured' },
        { name: 'Skills Overview', link: '/#skills' }
      ]
    },
    {
      id: 'about',
      title: 'About Me',
      icon: User,
      gradient: 'from-blue-500 to-cyan-600',
      description: 'Professional journey and expertise',
      category: 'main' as const,
      features: [
        'Professional bio and story',
        'Skills and technology stack',
        'Work experience timeline',
        'Education and certifications',
        'Awards and achievements',
        'Personal interests and hobbies',
        'Download resume button'
      ],
      stats: { visits: '8K+', rating: '4.8', updated: '1 week ago' },
      link: '/about',
      subPages: [
        { name: 'My Story', link: '/about#story' },
        { name: 'Skills & Tools', link: '/about#skills' },
        { name: 'Experience', link: '/about#experience' },
        { name: 'Education', link: '/about#education' }
      ]
    },
    {
      id: 'projects',
      title: 'Projects',
      icon: FolderKanban,
      gradient: 'from-purple-500 to-pink-600',
      description: 'Development portfolio showcase',
      category: 'main' as const,
      features: [
        'Interactive project gallery',
        'Live demos and previews',
        'Source code links',
        'Technology stack details',
        'Project case studies',
        'Filter by category',
        'Search functionality',
        'Performance metrics'
      ],
      stats: { visits: '12K+', rating: '5.0', updated: '3 days ago' },
      link: '/projects',
      subPages: [
        { name: 'Web Apps', link: '/projects?category=web' },
        { name: 'Mobile Apps', link: '/projects?category=mobile' },
        { name: 'Open Source', link: '/projects?category=opensource' },
        { name: 'Client Work', link: '/projects?category=client' }
      ]
    },
    {
      id: 'blog',
      title: 'Blog',
      icon: BookOpen,
      gradient: 'from-green-500 to-teal-600',
      description: 'Tech articles and tutorials',
      category: 'main' as const,
      features: [
        'Technical tutorials',
        'Industry insights and trends',
        'Best practices guides',
        'Code snippets and examples',
        'Development tips',
        'Category filtering',
        'Search by tags',
        'Reading time estimates',
        'Comment system'
      ],
      stats: { visits: '15K+', rating: '4.9', updated: '1 day ago' },
      link: '/blog',
      subPages: [
        { name: 'Latest Posts', link: '/blog?sort=latest' },
        { name: 'Popular', link: '/blog?sort=popular' },
        { name: 'Categories', link: '/blog/categories' },
        { name: 'Tags', link: '/blog/tags' }
      ]
    },
    {
      id: 'contact',
      title: 'Contact',
      icon: MessageCircle,
      gradient: 'from-red-500 to-rose-600',
      description: 'Get in touch for collaborations',
      category: 'main' as const,
      features: [
        'Contact form with validation',
        'Email and phone details',
        'Social media links',
        'Location and availability',
        'Response time information',
        'Professional inquiries form',
        'Project request form',
        'Calendar booking integration'
      ],
      stats: { visits: '6K+', rating: '4.7', updated: '5 days ago' },
      link: '/contact',
      subPages: [
        { name: 'Contact Form', link: '/contact#form' },
        { name: 'Social Links', link: '/contact#social' },
        { name: 'Book Meeting', link: '/contact#booking' }
      ]
    }
  ];

  // Professional pages
  const professionalPages = [
    {
      id: 'portfolio',
      title: 'Portfolio',
      icon: Briefcase,
      gradient: 'from-indigo-500 to-blue-600',
      description: 'Curated work collection',
      category: 'professional' as const,
      features: [
        'Interactive project showcases',
        'Detailed case studies',
        'Before/after comparisons',
        'Client testimonials',
        'Technology breakdowns',
        'Results and metrics',
        'Download PDF portfolio'
      ],
      stats: { projects: '50+', clients: '30+', years: '5+' },
      link: '/portfolio',
      subPages: [
        { name: 'Featured Work', link: '/portfolio/featured' },
        { name: 'Case Studies', link: '/portfolio/case-studies' },
        { name: 'Client List', link: '/portfolio/clients' }
      ]
    },
    {
      id: 'resume',
      title: 'Resume',
      icon: FileText,
      gradient: 'from-violet-500 to-purple-600',
      description: 'Professional experience',
      category: 'professional' as const,
      features: [
        'Detailed work history',
        'Technical skills matrix',
        'Certifications showcase',
        'Education timeline',
        'Professional achievements',
        'Downloadable PDF version',
        'Print-friendly format'
      ],
      stats: { experience: '5+ years', skills: '40+', certs: '15+' },
      link: '/resume',
      subPages: [
        { name: 'Download PDF', link: '/resume/download' },
        { name: 'Skills', link: '/resume#skills' },
        { name: 'Experience', link: '/resume#experience' }
      ]
    },
    {
      id: 'services',
      title: 'Services',
      icon: Package,
      gradient: 'from-cyan-500 to-blue-600',
      description: 'What I offer',
      category: 'professional' as const,
      features: [
        'Service packages',
        'Pricing information',
        'Consultation booking',
        'Custom quotes',
        'FAQ section',
        'Process overview',
        'Success stories'
      ],
      stats: { services: '10+', clients: '50+', satisfaction: '98%' },
      link: '/services',
      subPages: [
        { name: 'Web Development', link: '/services/web' },
        { name: 'Consulting', link: '/services/consulting' },
        { name: 'Pricing', link: '/services/pricing' }
      ]
    },
    {
      id: 'case-studies',
      title: 'Case Studies',
      icon: BarChart3,
      gradient: 'from-orange-500 to-red-600',
      description: 'Deep project analysis',
      category: 'professional' as const,
      features: [
        'Problem-solution approach',
        'Implementation details',
        'Business impact metrics',
        'Technologies used',
        'Challenges overcome',
        'Lessons learned',
        'ROI statistics'
      ],
      stats: { studies: '20+', impact: '300%', satisfaction: '95%' },
      link: '/case-studies',
      subPages: [
        { name: 'E-commerce', link: '/case-studies/ecommerce' },
        { name: 'SaaS', link: '/case-studies/saas' },
        { name: 'Corporate', link: '/case-studies/corporate' }
      ]
    }
  ];

  // Upcoming pages
  const upcomingPages = [
    {
      id: 'testimonials',
      title: 'Testimonials',
      icon: Award,
      gradient: 'from-yellow-500 to-orange-600',
      description: 'Client success stories',
      category: 'upcoming' as const,
      features: [
        'Video testimonials',
        'Written reviews',
        'Star ratings',
        'Case study highlights',
        'Project outcomes',
        'Industry recognition'
      ],
      status: 'In Development',
      progress: 75,
      eta: 'Q4 2025'
    },
    {
      id: 'resources',
      title: 'Resources',
      icon: GraduationCap,
      gradient: 'from-green-500 to-emerald-600',
      description: 'Learning materials',
      category: 'upcoming' as const,
      features: [
        'Free templates',
        'Code snippets',
        'Learning paths',
        'Tool recommendations',
        'Ebooks and guides',
        'Video tutorials'
      ],
      status: 'Planned',
      progress: 45,
      eta: 'Q1 2026'
    },
    {
      id: 'events',
      title: 'Events',
      icon: Calendar,
      gradient: 'from-pink-500 to-rose-600',
      description: 'Workshops and talks',
      category: 'upcoming' as const,
      features: [
        'Speaking engagements',
        'Workshop schedules',
        'Webinar calendar',
        'Community meetups',
        'Conference talks',
        'Registration forms'
      ],
      status: 'Coming Soon',
      progress: 60,
      eta: 'Q4 2025'
    },
    {
      id: 'shop',
      title: 'Shop',
      icon: ShoppingCart,
      gradient: 'from-blue-500 to-indigo-600',
      description: 'Digital products store',
      category: 'upcoming' as const,
      features: [
        'Templates marketplace',
        'UI kits for sale',
        'Code packages',
        'Courses and tutorials',
        'Consulting packages',
        'Secure checkout'
      ],
      status: 'In Planning',
      progress: 30,
      eta: 'Q2 2026'
    },
    {
      id: 'community',
      title: 'Community',
      icon: Users,
      gradient: 'from-purple-500 to-violet-600',
      description: 'Developer community hub',
      category: 'upcoming' as const,
      features: [
        'Discussion forums',
        'Q&A section',
        'Member directory',
        'Collaborative projects',
        'Mentorship program',
        'Events calendar'
      ],
      status: 'Planned',
      progress: 20,
      eta: 'Q3 2026'
    },
    {
      id: 'newsletter',
      title: 'Newsletter',
      icon: Mail,
      gradient: 'from-teal-500 to-cyan-600',
      description: 'Weekly tech insights',
      category: 'upcoming' as const,
      features: [
        'Weekly updates',
        'Exclusive content',
        'Early access to posts',
        'Special offers',
        'Tech news roundup',
        'Subscriber-only resources'
      ],
      status: 'Coming Soon',
      progress: 80,
      eta: 'Q4 2025'
    }
  ];

  // Legal pages
  const legalPages = [
    {
      title: 'Privacy Policy',
      icon: Shield,
      link: '/privacy',
      gradient: 'from-blue-500 to-cyan-600',
      description: 'How we protect your data',
      sections: ['Data Collection', 'Usage', 'Security', 'Your Rights']
    },
    {
      title: 'Terms & Conditions',
      icon: FileText,
      link: '/terms',
      gradient: 'from-purple-500 to-pink-600',
      description: 'Usage guidelines and rules',
      sections: ['User Agreement', 'Services', 'Limitations', 'Termination']
    },
    {
      title: 'Cookie Policy',
      icon: Cookie,
      link: '/cookies',
      gradient: 'from-orange-500 to-red-600',
      description: 'Cookie usage information',
      sections: ['What are Cookies', 'How We Use', 'Your Choices', 'More Info']
    },
    {
      title: 'Accessibility',
      icon: Eye,
      link: '/accessibility',
      gradient: 'from-green-500 to-teal-600',
      description: 'Accessibility commitment',
      sections: ['Standards', 'Features', 'Feedback', 'Improvements']
    }
  ];

  // Quick links by category
  const quickLinks = {
    explore: [
      { name: 'All Projects', icon: Grid, link: '/projects' },
      { name: 'Latest Posts', icon: Clock, link: '/blog?sort=latest' },
      { name: 'Popular Work', icon: TrendingUp, link: '/portfolio/featured' },
      { name: 'Get Started', icon: Rocket, link: '/contact' }
    ],
    learn: [
      { name: 'Tutorials', icon: BookOpen, link: '/blog?category=tutorials' },
      { name: 'Case Studies', icon: BarChart3, link: '/case-studies' },
      { name: 'Resources', icon: Database, link: '/resources' },
      { name: 'FAQs', icon: HelpCircle, link: '/faq' }
    ],
    connect: [
      { name: 'Contact Form', icon: Send, link: '/contact#form' },
      { name: 'Social Media', icon: Share2, link: '/contact#social' },
      { name: 'Book Meeting', icon: Calendar, link: '/contact#booking' },
      { name: 'Newsletter', icon: Mail, link: '/newsletter' }
    ],
    tools: [
      { name: 'Sitemap', icon: Map, link: '/sitemap' },
      { name: 'Search', icon: Search, link: '/search' },
      { name: 'RSS Feed', icon: Wifi, link: '/rss' },
      { name: 'API Docs', icon: Code, link: '/api-docs' }
    ]
  };

  // Filter and search logic
  const allPages = [...sitePages, ...professionalPages];
  const filteredPages = allPages.filter((page) => {
    const matchesSearch = page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      page.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterCategory === 'all' || page.category === filterCategory;
    return matchesSearch && matchesFilter;
  });

  /* ----------  LOADING  ---------- */
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 relative overflow-hidden">
        {/* Enhanced background animation */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-300/20 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-300/20 rounded-full blur-3xl animate-pulse-slow animation-delay-1000"></div>
        </div>

        <div className="text-center max-w-md px-4 relative z-10">
          <div className="relative w-40 h-40 mx-auto mb-8">
            {/* Spinning rings */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 border-4 border-amber-300 border-t-amber-600 rounded-full animate-spin"></div>
              <div className="absolute inset-3 border-4 border-orange-300 border-t-orange-600 rounded-full animate-spin-reverse"></div>
              <div className="absolute inset-6 border-4 border-amber-400 border-t-amber-700 rounded-full animate-spin animation-delay-500"></div>
            </div>

            {/* Center icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-2xl animate-pulse-scale">
                  <Map className="w-12 h-12 text-white animate-bounce-subtle" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center animate-ping">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-amber-900 mb-3 animate-fade-in">
            Mapping Your Journey
          </h2>
          <p className="text-lg text-amber-700 mb-8 animate-fade-in animation-delay-300">
            Preparing comprehensive navigation...
          </p>

          {/* Progress bar */}
          <div className="w-full bg-amber-200 rounded-full h-2 mb-4 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-amber-500 to-orange-600 rounded-full animate-progress"></div>
          </div>

          <div className="flex justify-center gap-2">
            {[0, 150, 300, 450].map((delay, i) => (
              <span
                key={i}
                className="w-3 h-3 bg-amber-500 rounded-full animate-bounce"
                style={{ animationDelay: `${delay}ms` }}
              ></span>
            ))}
          </div>
        </div>

        <style>{`
          @keyframes pulse-slow {
            0%, 100% { opacity: 0.3; transform: scale(1); }
            50% { opacity: 0.5; transform: scale(1.1); }
          }
          .animate-pulse-slow {
            animation: pulse-slow 4s ease-in-out infinite;
          }
          @keyframes spin-reverse {
            from { transform: rotate(360deg); }
            to { transform: rotate(0deg); }
          }
          .animate-spin-reverse {
            animation: spin-reverse 2s linear infinite;
          }
          @keyframes pulse-scale {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
          }
          .animate-pulse-scale {
            animation: pulse-scale 2s ease-in-out infinite;
          }
          @keyframes bounce-subtle {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }
          .animate-bounce-subtle {
            animation: bounce-subtle 2s ease-in-out infinite;
          }
          @keyframes progress {
            0% { width: 0%; }
            100% { width: 100%; }
          }
          .animate-progress {
            animation: progress 1.5s ease-out forwards;
          }
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in {
            animation: fade-in 0.6s ease-out forwards;
          }
          .animation-delay-300 {
            animation-delay: 300ms;
          }
          .animation-delay-500 {
            animation-delay: 500ms;
          }
          .animation-delay-1000 {
            animation-delay: 1s;
          }
        `}</style>
      </div>
    );
  }

  /* ----------  MAIN SITEMAP  ---------- */
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-amber-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-amber-300/20 to-orange-300/20 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-amber-400/20 to-orange-400/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-gradient-to-br from-amber-300/20 to-orange-300/20 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 pt-20 sm:pt-24 px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          {/* Hero Header */}
          <div className="text-center mb-12">
            <div className="inline-block mb-6 animate-float">
              <div className="relative">
                <div className="w-28 h-28 bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl flex items-center justify-center shadow-2xl transform hover:rotate-6 transition-all duration-300">
                  <Map className="w-14 h-14 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div className="absolute -bottom-2 -left-2 w-10 h-10 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-lg animate-pulse animation-delay-500">
                  <Star className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 animate-gradient">
                Complete Site Map
              </span>
            </h1>
            
            <p className="text-xl text-amber-800 mb-6 max-w-3xl mx-auto leading-relaxed">
              Navigate every corner of <span className="font-bold text-amber-900">SuraJz.dev</span> with ease. 
              Explore current features and upcoming additions.
            </p>

            {/* Enhanced Stats Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 max-w-4xl mx-auto">
              {[
                { label: 'Active Pages', value: sitePages.length + professionalPages.length, icon: CheckCircle, color: 'from-green-500 to-emerald-600' },
                { label: 'Upcoming', value: upcomingPages.length, icon: Rocket, color: 'from-purple-500 to-pink-600' },
                { label: 'Total Sections', value: sitePages.length + professionalPages.length + upcomingPages.length + legalPages.length, icon: Layers, color: 'from-blue-500 to-cyan-600' },
                { label: 'Quick Links', value: Object.values(quickLinks).flat().length, icon: Zap, color: 'from-orange-500 to-red-600' }
              ].map((stat, i) => (
                <div key={i} className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border-2 border-amber-200 hover:border-amber-400 transition-all duration-300 hover:scale-105 group">
                  <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:rotate-6 transition-transform duration-300`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-orange-600">
                    {stat.value}
                  </div>
                  <div className="text-sm text-amber-700 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Search and Filter Bar */}
          <div className="mb-12 sticky top-4 z-50">
            <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl p-6 border-2 border-amber-200">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-500" />
                  <input
                    type="text"
                    placeholder="Search pages..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-amber-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all duration-300"
                  />
                </div>

                {/* Filter */}
                <div className="relative">
                  <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-500" />
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-amber-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none transition-all duration-300 appearance-none cursor-pointer"
                  >
                    <option value="all">All Categories</option>
                    <option value="main">Main Pages</option>
                    <option value="professional">Professional</option>
                    <option value="upcoming">Upcoming</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-amber-500 pointer-events-none" />
                </div>

                {/* View Mode */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                      viewMode === 'grid'
                        ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg'
                        : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                    }`}
                  >
                    <Grid className="w-5 h-5" />
                    <span className="hidden sm:inline">Grid</span>
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                      viewMode === 'list'
                        ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg'
                        : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                    }`}
                  >
                    <List className="w-5 h-5" />
                    <span className="hidden sm:inline">List</span>
                  </button>
                </div>
              </div>

              {/* Quick Navigation Pills */}
              <div className="flex flex-wrap gap-2">
                {allPages.slice(0, 8).map((page) => (
                  <button
                    key={page.id}
                    onClick={() => scrollToSection(page.id)}
                    className={`group flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                      activeSection === page.id
                        ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg scale-105'
                        : 'bg-amber-100 text-amber-700 hover:bg-amber-200 hover:scale-105'
                    }`}
                  >
                    <page.icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{page.title}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content Grid/List */}
          <div className="mb-16" id="section-main">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-amber-900 mb-2 flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
                    <Layers className="w-6 h-6 text-white" />
                  </div>
                  Core Pages
                </h2>
                <p className="text-amber-700 ml-13">Main sections of the portfolio</p>
              </div>
              <div className="flex gap-2">
                <Link
                  to="/"
                  className="px-4 py-2 bg-white rounded-xl border-2 border-amber-200 text-amber-700 hover:border-amber-400 transition-all duration-300 flex items-center gap-2 group"
                >
                  <HomeIcon className="w-4 h-4" />
                  <span className="hidden sm:inline">Home</span>
                </Link>
              </div>
            </div>

            <div className={viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
              : 'space-y-4'
            }>
              {filteredPages.filter(p => p.category === 'main').map((page, index) => {
                const Icon = page.icon;
                const isExpanded = expandedSections.has(page.id);
                const isAnimated = animatedCards.has(`card-${page.id}`);
                
                return (
                  <div
                    key={page.id}
                    id={`card-${page.id}`}
                    className={`animate-on-scroll group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 border-amber-100 hover:border-amber-300 ${
                      isAnimated ? 'animate-slide-up' : 'opacity-0'
                    } ${viewMode === 'list' ? 'flex' : ''}`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Card Header */}
                    <div className={`bg-gradient-to-br ${page.gradient} p-6 ${viewMode === 'list' ? 'w-1/3' : ''}`}>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white">{page.title}</h3>
                          <p className="text-white/90 text-sm">{page.category}</p>
                        </div>
                      </div>
                      <p className="text-white/95 text-sm leading-relaxed">{page.description}</p>
                    </div>

                    {/* Card Body */}
                    <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        {Object.entries(page.stats).map(([key, value]) => (
                          <div key={key} className="bg-amber-50 rounded-lg p-2 text-center">
                            <div className="text-lg font-bold text-amber-600">{value}</div>
                            <div className="text-xs text-amber-700 capitalize">{key}</div>
                          </div>
                        ))}
                      </div>

                      {/* Features Toggle */}
                      <button
                        onClick={() => toggleSection(page.id)}
                        className="flex items-center justify-between w-full text-left mb-3 group/btn"
                      >
                        <span className="text-sm font-semibold text-gray-800 flex items-center gap-2">
                          <Lightbulb className="w-4 h-4 text-amber-600" />
                          Key Features ({page.features.length})
                        </span>
                        <ChevronDown
                          className={`w-5 h-5 text-amber-600 transition-transform duration-300 ${
                            isExpanded ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      
                      {/* Features List */}
                      <div
                        className={`space-y-2 transition-all duration-300 overflow-hidden ${
                          isExpanded ? 'max-h-96 opacity-100 mb-4' : 'max-h-0 opacity-0'
                        }`}
                      >
                        {page.features.map((feature, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-2 text-sm text-gray-700 bg-gradient-to-r from-amber-50 to-orange-50 p-3 rounded-lg hover:shadow-md transition-all duration-300"
                          >
                            <CheckCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* Sub Pages */}
                      {page.subPages && page.subPages.length > 0 && (
                        <div className="mb-4">
                          <div className="text-xs font-semibold text-gray-600 mb-2 flex items-center gap-1">
                            <ChevronRight className="w-3 h-3" />
                            Quick Links
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {page.subPages.map((subPage, idx) => (
                              <Link
                                key={idx}
                                to={subPage.link}
                                className="text-xs px-3 py-1.5 bg-amber-100 text-amber-700 rounded-full hover:bg-amber-200 transition-all duration-300 flex items-center gap-1"
                              >
                                <span>{subPage.name}</span>
                                <ExternalLink className="w-3 h-3" />
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <Link
                          to={page.link}
                          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all duration-300 bg-gradient-to-r ${page.gradient} text-white hover:shadow-lg hover:scale-105`}
                        >
                          <span>Visit Page</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </Link>
                        <button
                          onClick={() => scrollToSection(page.id)}
                          className="px-4 py-3 bg-amber-100 rounded-xl text-amber-700 hover:bg-amber-200 transition-all duration-300"
                          title="Jump to section"
                        >
                          <Target className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    {/* Hover Gradient Effect */}
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${page.gradient} opacity-0 group-hover:opacity-10 rounded-full -mr-16 -mt-16 transition-all duration-500 group-hover:scale-150 pointer-events-none`}></div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Professional Pages Section */}
          <div className="mb-16" id="section-professional">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-blue-900 mb-2 flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
                    <Building className="w-6 h-6 text-white" />
                  </div>
                  Professional Sections
                </h2>
                <p className="text-blue-700 ml-13">Enhanced portfolio and career resources</p>
              </div>
            </div>

            <div className={viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6' 
              : 'space-y-4'
            }>
              {professionalPages.map((page, index) => {
                const Icon = page.icon;
                const isExpanded = expandedSections.has(page.id);
                const isAnimated = animatedCards.has(`prof-card-${page.id}`);
                
                return (
                  <div
                    key={page.id}
                    id={`prof-card-${page.id}`}
                    className={`animate-on-scroll group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 border-blue-100 hover:border-blue-300 ${
                      isAnimated ? 'animate-slide-up' : 'opacity-0'
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className={`bg-gradient-to-br ${page.gradient} p-5`}>
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-white text-center">{page.title}</h3>
                      <p className="text-white/90 text-sm text-center mt-1">{page.description}</p>
                    </div>

                    <div className="p-5">
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        {Object.entries(page.stats).map(([key, value]) => (
                          <div key={key} className="bg-blue-50 rounded-lg p-2 text-center">
                            <div className="text-sm font-bold text-blue-600">{value}</div>
                            <div className="text-xs text-blue-700 capitalize">{key}</div>
                          </div>
                        ))}
                      </div>

                      <button
                        onClick={() => toggleSection(page.id)}
                        className="flex items-center justify-between w-full text-left mb-3"
                      >
                        <span className="text-sm font-semibold text-gray-800">Features</span>
                        <ChevronDown
                          className={`w-4 h-4 text-blue-600 transition-transform duration-300 ${
                            isExpanded ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      
                      <div
                        className={`space-y-2 transition-all duration-300 overflow-hidden ${
                          isExpanded ? 'max-h-96 opacity-100 mb-4' : 'max-h-0 opacity-0'
                        }`}
                      >
                        {page.features.map((feature, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-2 text-sm text-gray-700 bg-blue-50 p-2 rounded-lg"
                          >
                            <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>

                      <Link
                        to={page.link}
                        className={`flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg font-medium transition-all duration-300 bg-gradient-to-r ${page.gradient} text-white hover:shadow-md hover:scale-105`}
                      >
                        <span>Explore</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Upcoming Pages Section */}
          <div className="mb-16" id="section-upcoming">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center animate-bounce">
                  <Rocket className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-purple-900">Upcoming Pages</h2>
              </div>
              <p className="text-purple-700 text-lg">Exciting new features in development</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingPages.map((page, index) => {
                const Icon = page.icon;
                const isAnimated = animatedCards.has(`upcoming-card-${page.id}`);
                
                return (
                  <div
                    key={index}
                    id={`upcoming-card-${page.id}`}
                    className={`animate-on-scroll group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-purple-100 hover:border-purple-300 overflow-hidden ${
                      isAnimated ? 'animate-slide-up' : 'opacity-0'
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${page.gradient} opacity-10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500`}></div>
                    
                    <div className="relative">
                      <div className={`w-16 h-16 bg-gradient-to-br ${page.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{page.title}</h3>
                      <p className="text-gray-600 text-sm mb-4 leading-relaxed">{page.description}</p>
                      
                      {/* Progress Bar */}
                      <div className="mb-4">
                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                          <span>Progress</span>
                          <span className="font-bold">{page.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-full bg-gradient-to-r ${page.gradient} rounded-full transition-all duration-1000`}
                            style={{ width: `${page.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Features Preview */}
                      <div className="mb-4 space-y-1">
                        {page.features.slice(0, 3).map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-gray-600">
                            <CheckCircle className="w-3 h-3 text-purple-500" />
                            <span>{feature}</span>
                          </div>
                        ))}
                        {page.features.length > 3 && (
                          <div className="text-xs text-purple-600 font-medium">
                            +{page.features.length - 3} more features
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          {page.status}
                        </span>
                        <div className="flex items-center text-purple-600 font-semibold text-sm">
                          <Clock className="w-4 h-4 mr-1" />
                          <span>{page.eta}</span>
                        </div>
                      </div>

                      {/* Newsletter Signup for Updates - NEW BUTTON STYLE FOR UPCOMING PAGES */}
                      <button 
                        onClick={() => {
                          // Scroll to the newsletter section at the bottom
                          const newsletterSection = document.getElementById('section-newsletter');
                          if (newsletterSection) {
                            newsletterSection.scrollIntoView({ behavior: 'smooth' });
                          }
                          // Optionally set the email if the user was trying to subscribe here
                          setNewsletterEmail('');
                          setNewsletterStatus('idle');
                        }}
                        className="mt-4 w-full py-2 px-4 bg-gradient-to-r from-purple-200 to-pink-200 text-purple-700 rounded-lg hover:from-purple-300 hover:to-pink-300 transition-all duration-300 flex items-center justify-center gap-2 text-sm font-medium shadow-md hover:shadow-lg"
                      >
                        <Bell className="w-4 h-4" />
                        <span>Get Status Updates</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Links Grid */}
          <div className="mb-16" id="section-quick-links">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-amber-900 mb-2">Quick Navigation</h2>
              <p className="text-amber-700">Jump to any section instantly</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {Object.entries(quickLinks).map(([category, links], catIndex) => (
                <div
                  key={category}
                  id={`quicklinks-${category}`}
                  className={`animate-on-scroll bg-white rounded-2xl p-6 shadow-lg border-2 border-amber-100 hover:border-amber-300 transition-all duration-300 ${
                    animatedCards.has(`quicklinks-${category}`) ? 'animate-slide-up' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${catIndex * 100}ms` }}
                >
                  <h3 className="text-lg font-bold text-amber-900 mb-4 capitalize flex items-center gap-2">
                    {category === 'explore' && <Globe2 className="w-5 h-5" />}
                    {category === 'learn' && <BookOpen className="w-5 h-5" />}
                    {category === 'connect' && <MessageCircle className="w-5 h-5" />}
                    {category === 'tools' && <Settings className="w-5 h-5" />}
                    {category}
                  </h3>
                  <div className="space-y-2">
                    {links.map((link, idx) => (
                      <Link
                        key={idx}
                        to={link.link}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-amber-50 transition-all duration-300 group"
                      >
                        <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center group-hover:bg-amber-200 transition-all duration-300">
                          <link.icon className="w-4 h-4 text-amber-600" />
                        </div>
                        <span className="text-sm font-medium text-gray-700 group-hover:text-amber-700 flex-1">
                          {link.name}
                        </span>
                        <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-amber-600 group-hover:translate-x-1 transition-all duration-300" />
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Legal Pages Section */}
          <div className="mb-16" id="section-legal">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-amber-900 mb-2 flex items-center justify-center gap-3">
                <Shield className="w-8 h-8" />
                Legal & Policy Pages
              </h2>
              <p className="text-amber-700">Important information about your privacy and our policies</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {legalPages.map((page, index) => {
                const Icon = page.icon;
                const isAnimated = animatedCards.has(`legal-card-${index}`);
                
                return (
                  <Link
                    key={index}
                    id={`legal-card-${index}`}
                    to={page.link}
                    className={`animate-on-scroll group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-amber-100 hover:border-amber-300 overflow-hidden ${
                      isAnimated ? 'animate-slide-up' : 'opacity-0'
                    }`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${page.gradient} opacity-10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500`}></div>
                    
                    <div className="relative">
                      <div className={`w-14 h-14 bg-gradient-to-br ${page.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-amber-700 transition-colors duration-300">
                        {page.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">{page.description}</p>

                      {/* Sections Preview */}
                      <div className="mb-4 space-y-1">
                        {page.sections.map((section, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-gray-600">
                            <div className="w-1 h-1 bg-amber-500 rounded-full"></div>
                            <span>{section}</span>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex items-center text-amber-600 font-semibold text-sm group-hover:text-amber-700">
                        <span>Read Full Policy</span>
                        <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Site Features Highlight */}
          <div className="mb-16 bg-gradient-to-br from-amber-100 to-orange-100 rounded-3xl p-8 sm:p-12 border-2 border-amber-200 shadow-2xl">
            <div className="max-w-5xl mx-auto">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-xl">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-amber-900">
                    Site Highlights & Features
                  </h3>
                  <p className="text-amber-700">What makes this portfolio special</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { icon: Code, title: 'Modern Tech Stack', desc: 'Built with React, Node.js, and latest frameworks', color: 'from-blue-500 to-cyan-600' },
                  { icon: Palette, title: 'Beautiful Design', desc: 'Carefully crafted UI with attention to detail', color: 'from-purple-500 to-pink-600' },
                  { icon: Smartphone, title: 'Fully Responsive', desc: 'Perfect experience on all devices', color: 'from-green-500 to-teal-600' },
                                    { icon: Zap, title: 'Lightning Fast', desc: 'Optimized performance and load times', color: 'from-yellow-500 to-orange-600' },
                  { icon: Shield, title: 'Secure & Private', desc: 'Your data is protected and encrypted', color: 'from-red-500 to-rose-600' },
                  { icon: Activity, title: 'SEO Optimized', desc: 'Better visibility on search engines', color: 'from-indigo-500 to-purple-600' }
                ].map((feature, i) => (
                  <div
                    key={i}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-amber-200 hover:border-amber-400 hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2 text-lg">{feature.title}</h4>
                    <p className="text-sm text-gray-700 leading-relaxed">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Technology Stack Section */}
          <div className="mb-16 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-3xl p-8 sm:p-12 border-2 border-blue-200 shadow-2xl">
            <div className="max-w-5xl mx-auto">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center shadow-xl">
                  <Code className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-blue-900">
                    Technology Stack
                  </h3>
                  <p className="text-blue-700">Technologies powering this portfolio</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {[
                  { name: 'React', icon: Code, color: 'from-cyan-500 to-blue-600' },
                  { name: 'Node.js', icon: Server, color: 'from-green-500 to-emerald-600' },
                  { name: 'Tailwind CSS', icon: Palette, color: 'from-blue-500 to-cyan-500' },
                  { name: 'JavaScript', icon: FileCode, color: 'from-yellow-500 to-orange-600' },
                  { name: 'Git', icon: GitBranch, color: 'from-orange-500 to-red-600' },
                  { name: 'MongoDB', icon: Database, color: 'from-green-600 to-teal-600' },
                  { name: 'REST API', icon: Wifi, color: 'from-purple-500 to-pink-600' },
                  { name: 'Responsive', icon: Monitor, color: 'from-indigo-500 to-purple-600' }
                ].map((tech, i) => (
                  <div
                    key={i}
                    className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border-2 border-blue-200 hover:border-blue-400 hover:shadow-lg transition-all duration-300 group text-center"
                  >
                    <div className={`w-12 h-12 bg-gradient-to-br ${tech.color} rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                      <tech.icon className="w-6 h-6 text-white" />
                    </div>
                    <h4 className="font-bold text-gray-900 text-sm">{tech.name}</h4>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Social Media & Connect Section */}
          <div className="mb-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-3xl p-8 sm:p-12 border-2 border-purple-200 shadow-2xl">
            <div className="max-w-5xl mx-auto">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-xl">
                  <Share2 className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-purple-900">
                    Connect With Me
                  </h3>
                  <p className="text-purple-700">Let's build something amazing together</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { name: 'GitHub', icon: Github, link: 'https://github.com/surajz', color: 'from-gray-700 to-gray-900', desc: 'View my code' },
                  { name: 'LinkedIn', icon: Linkedin, link: 'https://linkedin.com/in/surajz', color: 'from-blue-600 to-blue-800', desc: 'Professional network' },
                  { name: 'Twitter', icon: Twitter, link: 'https://twitter.com/surajz', color: 'from-sky-500 to-blue-600', desc: 'Follow for updates' }
                ].map((social, i) => (
                  <a
                    key={i}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-purple-200 hover:border-purple-400 hover:shadow-lg transition-all duration-300"
                  >
                    <div className={`w-16 h-16 bg-gradient-to-br ${social.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                      <social.icon className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="font-bold text-gray-900 text-xl mb-2">{social.name}</h4>
                    <p className="text-sm text-gray-700">{social.desc}</p>
                    <div className="mt-4 flex items-center text-purple-600 font-semibold text-sm">
                      <span>Connect Now</span>
                      <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Download Resources Section */}
          <div className="mb-16 bg-gradient-to-br from-green-100 to-teal-100 rounded-3xl p-8 sm:p-12 border-2 border-green-200 shadow-2xl">
            <div className="max-w-5xl mx-auto">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-xl">
                  <Download className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-green-900">
                    Download Resources
                  </h3>
                  <p className="text-green-700">Get my latest materials and documents</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { name: 'Resume PDF', icon: FileText, size: '245 KB', downloads: '1.2K', color: 'from-red-500 to-rose-600' },
                  { name: 'Portfolio PDF', icon: Briefcase, size: '3.8 MB', downloads: '890', color: 'from-blue-500 to-cyan-600' },
                  { name: 'Case Studies', icon: BarChart3, size: '1.5 MB', downloads: '650', color: 'from-purple-500 to-pink-600' }
                ].map((resource, i) => (
                  <button
                    key={i}
                    className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-green-200 hover:border-green-400 hover:shadow-lg transition-all duration-300 text-left"
                  >
                    <div className={`w-14 h-14 bg-gradient-to-br ${resource.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                      <resource.icon className="w-7 h-7 text-white" />
                    </div>
                    <h4 className="font-bold text-gray-900 text-lg mb-2">{resource.name}</h4>
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                      <span>{resource.size}</span>
                      <span className="text-green-600 font-semibold">{resource.downloads} downloads</span>
                    </div>
                    <div className="flex items-center text-green-600 font-semibold text-sm">
                      <Download className="w-4 h-4 mr-2" />
                      <span>Download Now</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Newsletter Subscription Section (Updated with Amber Styling and States) */}
          <div className="mb-16" id="section-newsletter">
            <div className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-3xl p-8 sm:p-12 border-2 border-amber-200 shadow-2xl">
              <div className="max-w-3xl mx-auto text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl animate-pulse">
                  <Mail className="w-10 h-10 text-white" />
                </div>
                
                <h3 className="text-3xl font-bold text-amber-900 mb-4">
                  Stay Updated
                </h3>
                <p className="text-amber-700 text-lg mb-8">
                  Subscribe to my newsletter for the latest updates, articles, and exclusive content.
                </p>

                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email address"
                    value={newsletterEmail}
                    onChange={(e) => {
                      setNewsletterEmail(e.target.value);
                      if (newsletterStatus === 'error') setNewsletterStatus('idle'); // Clear error on typing
                    }}
                    required
                    disabled={newsletterStatus === 'subscribing' || redirecting}
                    className="flex-1 px-6 py-4 rounded-xl border-2 border-amber-300 focus:border-orange-500 focus:ring-4 focus:ring-amber-200 outline-none transition-all duration-300 disabled:bg-amber-50 disabled:cursor-not-allowed"
                  />
                  <button 
                    type="submit"
                    disabled={newsletterStatus === 'subscribing' || redirecting || newsletterEmail.length === 0}
                    className={`px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed
                        ${newsletterStatus === 'subscribing' 
                            ? 'bg-amber-600 text-amber-100' 
                            : 'bg-gradient-to-r from-amber-500 to-orange-600 text-white hover:scale-105'
                        }
                    `}
                  >
                    {newsletterStatus === 'subscribing' ? (
                      <>
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        <span>Subscribing...</span>
                      </>
                    ) : newsletterStatus === 'success' ? (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Redirecting...</span>
                      </>
                    ) : (
                      <>
                        <span>Subscribe</span>
                        <Send className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>
                
                {newsletterStatus === 'success' && !redirecting && (
                    <p className="text-sm text-amber-700 font-semibold mt-4 flex items-center justify-center gap-2 animate-pulse">
                        <CheckCircle className="w-4 h-4"/> Success! Redirecting you now...
                    </p>
                )}
                {newsletterStatus === 'error' && (
                    <p className="text-sm text-red-600 font-semibold mt-4">
                        <AlertTriangle className="w-4 h-4 inline mr-1"/> Invalid email format or subscription failed.
                    </p>
                )}

                <p className="text-sm text-amber-600 mt-4">
                  Join {new Date().getFullYear() - 2020 + 1} years of subscribers • No spam, unsubscribe anytime
                </p>
              </div>
            </div>
          </div>

          {/* Statistics Dashboard */}
          <div className="mb-16 bg-gradient-to-br from-orange-100 to-red-100 rounded-3xl p-8 sm:p-12 border-2 border-orange-200 shadow-2xl">
            <div className="max-w-5xl mx-auto">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center shadow-xl">
                  <Activity className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-orange-900">
                    Portfolio Statistics
                  </h3>
                  <p className="text-orange-700">Real-time performance metrics</p>
                </div>
              </div>

                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: 'Projects Completed', value: '50+', icon: FolderKanban, change: '+12%', color: 'from-blue-500 to-cyan-600' },
                  { label: 'Happy Clients', value: '30+', icon: Users, change: '+8%', color: 'from-green-500 to-emerald-600' },
                  { label: 'Code Commits', value: '2.5K+', icon: GitBranch, change: '+25%', color: 'from-purple-500 to-pink-600' },
                  { label: 'Blog Posts', value: '75+', icon: BookOpen, change: '+15%', color: 'from-orange-500 to-red-600' }
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border-2 border-orange-200 hover:border-orange-400 hover:shadow-lg transition-all duration-300 group"
                  >
                    <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-all duration-300`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                    <div className="text-sm text-gray-600 mb-2">{stat.label}</div>
                    <div className="flex items-center text-xs font-semibold text-green-600">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      <span>{stat.change} this month</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-16" id="section-faq">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center gap-3 mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
                  <HelpCircle className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-amber-900">Frequently Asked Questions</h2>
              </div>
              <p className="text-amber-700 text-lg">Quick answers to common questions</p>
            </div>

            <div className="max-w-4xl mx-auto space-y-4">
              {[
                { q: 'How can I navigate through the sitemap?', a: 'Use the search bar, filters, or quick navigation pills at the top. You can also click on section headers to jump directly.' },
                { q: 'Are all pages currently available?', a: 'Most pages are live! Pages marked as "Upcoming" are in development and will be available soon.' },
                { q: 'Can I download your portfolio materials?', a: 'Yes! Visit the Download Resources section to get my resume, portfolio PDF, and case studies.' },
                { q: 'How often is the site updated?', a: 'The portfolio is updated regularly with new projects, blog posts, and features. Subscribe to the newsletter for updates.' },
                { q: 'How can I get in touch with you?', a: 'Visit the Contact page, use the contact form, or reach out via social media links provided throughout the site.' }
              ].map((faq, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-6 shadow-lg border-2 border-amber-100 hover:border-amber-300 transition-all duration-300"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Info className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg mb-2">{faq.q}</h4>
                      <p className="text-gray-700 leading-relaxed">{faq.a}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Final CTA Section */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-3xl p-12 sm:p-16 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMjEtMS43OS00LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQtMS43OSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>
              
              <div className="relative">
                <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                  <Heart className="w-12 h-12 text-white" />
                </div>
                
                <h3 className="text-4xl sm:text-5xl font-bold text-white mb-4">
                  Ready to Start Your Journey?
                </h3>
                <p className="text-xl text-white/95 mb-8 max-w-2xl mx-auto">
                  Explore my work, read my articles, or get in touch to discuss your next project.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                  <Link
                    to="/"
                    className="group inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-amber-50 text-amber-600 rounded-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                  >
                    <HomeIcon className="w-5 h-5" />
                    <span>Explore Portfolio</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                  
                  <Link
                    to="/contact"
                    className="group inline-flex items-center gap-2 px-8 py-4 bg-amber-900 hover:bg-amber-950 text-white rounded-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Let's Connect</span>
                  </Link>

                  <Link
                    to="/projects"
                    className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                  >
                    <Rocket className="w-5 h-5" />
                    <span>View Projects</span>
                  </Link>
                </div>

                <div className="flex flex-wrap justify-center gap-6 text-white/90">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    <span>100% Responsive</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    <span>Lightning Fast</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    <span>Secure & Private</span>
                  </div>
                </div>

                <div className="mt-8 p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 max-w-2xl mx-auto">
                  <p className="text-sm text-white/95">
                    <strong className="text-white">Legal Notice:</strong> By using this website, you acknowledge that you have read and understood our{' '}
                    <Link to="/privacy" className="underline hover:text-amber-200 transition-colors">Privacy Policy</Link>
                    {', '}
                    <Link to="/terms" className="underline hover:text-amber-200 transition-colors">Terms of Service</Link>
                    {', and '}
                    <Link to="/cookies" className="underline hover:text-amber-200 transition-colors">Cookie Policy</Link>.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Back to Top Button */}
          <div className="mt-12 text-center">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-2 px-6 py-3 bg-amber-100 text-amber-700 rounded-xl font-semibold hover:bg-amber-200 transition-all duration-300 group"
            >
              <ChevronRight className="w-5 h-5 rotate-[-90deg] group-hover:-translate-y-1 transition-transform duration-300" />
              <span>Back to Top</span>
            </button>
          </div>
        </div>
      </div>

      <Footer />

      {/* Custom Animations & Styles */}
      <style>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
        }

        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        .animation-delay-500 {
          animation-delay: 500ms;
        }
        
        /* Loading screen specific keyframes */
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .animate-spin-reverse {
          animation: spin-reverse 2s linear infinite;
        }
        @keyframes pulse-scale {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        .animate-pulse-scale {
          animation: pulse-scale 2s ease-in-out infinite;
        }
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        .animate-progress {
          animation: progress 1.5s ease-out forwards;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Sitemap;