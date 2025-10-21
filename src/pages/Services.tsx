import { useEffect, useState } from 'react';
import { 
  Code, GraduationCap, Palette, Brain, ArrowRight, Clock, Trophy, Cpu, TrendingUp, Zap, Target, Star, CheckCircle, Award, Users
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import Footer from '../components/Footer';

// ==================== TYPE DEFINITIONS ====================
interface Service {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  iconBg: string;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  longDescription: string;
  features: string[];
  deliverables: string[];
  price: { min: number; max: number; unit: string };
  duration: string;
  complexity: string;
  technologies: string[];
  projects: number;
  rating: number;
  clients: number;
}

interface ProcessStep {
  step: number;
  title: string;
  description: string;
}

interface Testimonial {
  name: string;
  role: string;
  content: string;
  rating: number;
  service: string;
}

interface Stat {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

// ==================== CUSTOM STYLES ====================
const customStyles = `
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }
  
  @keyframes pulse-slow {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 0.5; }
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  
  .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
  .animate-fade-in { animation: fadeIn 0.3s ease-out; }
  .animate-slide-up { animation: slideUp 0.5s ease-out; }

  html {
    scroll-behavior: smooth;
  }

  /* Custom scrollbar for tabs */
  .tabs-scroll::-webkit-scrollbar {
    height: 6px;
  }

  .tabs-scroll::-webkit-scrollbar-track {
    background: #fef3c7;
    border-radius: 10px;
  }

  .tabs-scroll::-webkit-scrollbar-thumb {
    background: #f59e0b;
    border-radius: 10px;
  }

  .tabs-scroll::-webkit-scrollbar-thumb:hover {
    background: #d97706;
  }

  /* Prevent tab overlap */
  .service-tabs-container {
    display: flex;
    gap: 0.5rem;
    overflow-x: auto;
    padding: 0.5rem;
    scroll-snap-type: x mandatory;
  }

  .service-tab-item {
    scroll-snap-align: start;
    flex-shrink: 0;
  }

  @media (max-width: 640px) {
    .mobile-text-xs { font-size: 0.75rem; }
    .mobile-text-sm { font-size: 0.875rem; }
    .mobile-text-base { font-size: 1rem; }
    .mobile-text-lg { font-size: 1.125rem; }
    .mobile-text-xl { font-size: 1.25rem; }
    .mobile-text-2xl { font-size: 1.5rem; }
    .mobile-text-3xl { font-size: 1.875rem; }
  }
`;

// ==================== MAIN COMPONENT ====================
const Services: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeService, setActiveService] = useState<string>('development');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const services: Service[] = [
    {
      id: 'development',
      icon: Code,
      iconBg: 'from-red-500 to-pink-600',
      title: 'Full-Stack Web Development',
      shortTitle: 'Web Dev',
      tagline: 'Transform ideas into powerful digital solutions',
      description: 'End-to-end web development using cutting-edge technologies',
      longDescription: 'I specialize in building complete web solutions that combine intuitive front-end interfaces with powerful back-end systems. Using modern technologies like React for dynamic UIs, Node.js and Express for RESTful APIs, MongoDB for scalable databases, and cloud platforms for deployment.',
      features: [
        'Dynamic React.js & Next.js frontends with modern hooks',
        'Robust Node.js & Express.js APIs with authentication',
        'MongoDB & PostgreSQL database design and optimization',
        'Cloud deployment on AWS, Vercel, or Heroku with CI/CD',
        'Responsive, mobile-first design with Tailwind CSS',
        'Third-party integrations (Stripe, Google APIs, etc.)'
      ],
      deliverables: [
        'Production-ready web application',
        'Admin dashboard for content management',
        'API documentation and testing suite',
        'Deployment and CI/CD setup',
        '30-day post-launch support'
      ],
      price: { min: 1500, max: 5000, unit: 'project' },
      duration: '2-6 weeks',
      complexity: 'Medium to High',
      technologies: ['React', 'Node.js', 'MongoDB', 'AWS', 'Docker'],
      projects: 15,
      rating: 4.9,
      clients: 12
    },
    {
      id: 'tutoring',
      icon: GraduationCap,
      iconBg: 'from-green-500 to-emerald-600',
      title: 'Programming Tutoring & Mentorship',
      shortTitle: 'Tutoring',
      tagline: 'Accelerate your learning journey with expert guidance',
      description: 'Personalized tutoring and mentorship for programming excellence',
      longDescription: 'My tutoring services focus on empowering students and professionals to excel in programming. From mastering C++ and Python for competitive programming to building real-world projects with the MERN stack.',
      features: [
        'C++ and Python mastery for competitive programming',
        'Data Structures & Algorithms with real-world applications',
        'LeetCode and HackerRank problem-solving strategies',
        'Technical interview preparation with mock interviews',
        'Guided project development for portfolio building'
      ],
      deliverables: [
        'Personalized learning roadmap',
        'Weekly coding assignments and feedback',
        'Access to exclusive study materials',
        'Mock interview sessions',
        'Portfolio project guidance'
      ],
      price: { min: 25, max: 50, unit: 'hour' },
      duration: 'Flexible sessions',
      complexity: 'Beginner to Advanced',
      technologies: ['C++', 'Python', 'JavaScript', 'DSA', 'System Design'],
      projects: 100,
      rating: 4.8,
      clients: 80
    },
    {
      id: 'design',
      icon: Palette,
      iconBg: 'from-pink-500 to-rose-600',
      title: 'UI/UX Design & Consultation',
      shortTitle: 'UI/UX',
      tagline: 'Create experiences that delight and convert users',
      description: 'User-centered design that combines aesthetics with functionality',
      longDescription: 'My UI/UX design services focus on creating intuitive, visually appealing interfaces that prioritize user satisfaction. Using tools like Figma, I craft wireframes, interactive prototypes, and design systems.',
      features: [
        'Figma-based design systems for consistent branding',
        'Responsive wireframes and interactive prototypes',
        'User research and persona development',
        'Accessibility (WCAG) compliance for inclusive design',
        'Visual storytelling through modern design trends'
      ],
      deliverables: [
        'Complete design system and style guide',
        'High-fidelity interactive prototypes',
        'User research reports and personas',
        'Usability testing results and recommendations',
        'Design handoff documentation'
      ],
      price: { min: 800, max: 2500, unit: 'project' },
      duration: '1-3 weeks',
      complexity: 'Medium',
      technologies: ['Figma', 'Adobe XD', 'Sketch', 'Principle', 'Zeplin'],
      projects: 20,
      rating: 4.7,
      clients: 15
    },
    {
      id: 'consultation',
      icon: Brain,
      iconBg: 'from-orange-500 to-red-600',
      title: 'Technical Consultation',
      shortTitle: 'Consult',
      tagline: 'Expert guidance to optimize your technical strategy',
      description: 'Strategic technical advice for project success and scalability',
      longDescription: 'As a technical consultant, I help startups, businesses, and development teams make informed technology decisions. From selecting the right tech stack to optimizing application performance.',
      features: [
        'Technology stack evaluation and recommendations',
        'System architecture planning for scalability',
        'Code reviews with actionable improvement suggestions',
        'Performance optimization for faster load times',
        'Guidance on industry best practices and standards'
      ],
      deliverables: [
        'Technical architecture documentation',
        'Code review report with recommendations',
        'Performance optimization roadmap',
        'Technology migration strategy',
        'Best practices implementation guide'
      ],
      price: { min: 100, max: 200, unit: 'hour' },
      duration: 'Per consultation',
      complexity: 'Varies',
      technologies: ['System Design', 'Architecture', 'DevOps', 'Security'],
      projects: 25,
      rating: 4.9,
      clients: 18
    }
  ];

  const processSteps: ProcessStep[] = [
    { step: 1, title: 'Discovery', description: 'Understanding your needs and goals' },
    { step: 2, title: 'Planning', description: 'Creating a detailed project roadmap' },
    { step: 3, title: 'Development', description: 'Building your solution with expertise' },
    { step: 4, title: 'Review', description: 'Quality assurance and feedback integration' },
    { step: 5, title: 'Delivery', description: 'Launching your project with support' }
  ];

  const testimonials: Testimonial[] = [
    {
      name: 'Sarah Johnson',
      role: 'CEO, TechStart',
      content: 'Exceptional work on our e-commerce platform. The attention to detail and technical expertise exceeded our expectations.',
      rating: 5,
      service: 'development'
    },
    {
      name: 'Michael Chen',
      role: 'Student',
      content: 'The tutoring sessions transformed my understanding of DSA. I landed my dream job thanks to the interview preparation!',
      rating: 5,
      service: 'tutoring'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Product Manager',
      content: 'Beautiful UI design that perfectly captures our brand. User engagement increased by 40% after the redesign.',
      rating: 5,
      service: 'design'
    }
  ];

  const stats: Stat[] = [
    { label: 'Projects Completed', value: '50+', icon: Trophy, color: 'text-amber-600' },
    { label: 'Happy Clients', value: '100+', icon: Users, color: 'text-green-600' },
    { label: 'Years Experience', value: '3+', icon: Clock, color: 'text-blue-600' },
    { label: 'Technologies', value: '20+', icon: Cpu, color: 'text-purple-600' }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream-50 via-cream-100 to-amber-50 flex items-center justify-center px-4">
        <style>{customStyles}</style>
        <div className="relative">
          <div className="absolute -inset-10 bg-gradient-to-tr from-amber-500/20 via-orange-400/20 to-yellow-400/20 blur-3xl rounded-full animate-pulse" />

          <div className="relative z-10 flex flex-col items-center">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28">
              <div className="absolute inset-0 rounded-full border-4 border-amber-200/70" />
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-amber-500 border-r-amber-500 animate-spin" />
              <div className="absolute inset-2 rounded-full border-4 border-transparent border-b-orange-500 border-l-orange-500 animate-spin [animation-direction:reverse] [animation-duration:2.2s]" />
              <div className="absolute inset-0 animate-spin [animation-duration:3s]">
                <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-3.5 lg:h-3.5 bg-amber-500 rounded-full shadow-md" />
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-orange-500 rounded-full shadow-md" />
              </div>
            </div>

            <div className="mt-4 sm:mt-6 text-center">
              <div className="flex justify-center items-baseline gap-2 sm:gap-3">
                <p className="text-lg sm:text-xl lg:text-2xl font-semibold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  Loading Services Page
                </p>
                <div className="flex items-center gap-1 sm:gap-1.5">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-amber-500 animate-bounce" />
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-orange-500 animate-bounce [animation-delay:150ms]" />
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-yellow-500 animate-bounce [animation-delay:300ms]" />
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-amber-400 animate-bounce [animation-delay:450ms]" />
                </div>
              </div>
              
              <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-gray-600">
                Preparing our services for you...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-cream-100 to-amber-50 text-foreground">
      <style>{customStyles}</style>

      {/* Hero Section */}
      <section className="relative pt-20 sm:pt-24 pb-12 sm:pb-16 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-48 sm:w-72 h-48 sm:h-72 bg-amber-300/20 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute top-20 sm:top-40 right-5 sm:right-10 w-64 sm:w-96 h-64 sm:h-96 bg-orange-300/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-10 sm:bottom-20 left-1/4 sm:left-1/3 w-56 sm:w-80 h-56 sm:h-80 bg-yellow-300/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="container mx-auto text-center relative z-10">
          <div className="animate-fade-in space-y-4 sm:space-y-6">
            <Badge className="px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm bg-amber-100 text-amber-800 hover:bg-amber-200 transition-colors">
              <Zap className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
              Professional Services
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold bg-gradient-to-r from-amber-600 via-orange-600 to-red-500 bg-clip-text text-transparent px-4">
              Services & Solutions
            </h1>
            <p className="text-base sm:text-lg lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
              Comprehensive services to transform your ideas into reality, 
              from cutting-edge web development to personalized mentorship and expert consultation.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-6 sm:mt-8 px-4">
              <a href="#contact" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 px-6 sm:px-8 py-3 sm:py-4 group text-sm sm:text-base"
                >
                  Get Started Today
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
              <a href="#process" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-amber-300 text-gray-700 hover:bg-amber-50 backdrop-blur-sm bg-white/50 hover:border-amber-400 transition-all duration-300 hover:scale-105 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base"
                >
                  View Process
                  <Target className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 sm:py-10 lg:py-12 px-4 sm:px-6 bg-white/30 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-white/70 backdrop-blur-sm border border-amber-200 text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardContent className="pt-4 sm:pt-6 p-3 sm:p-6">
                  <stat.icon className={`h-6 w-6 sm:h-8 sm:w-8 ${stat.color} mx-auto mb-1 sm:mb-2`} />
                  <div className="text-xl sm:text-2xl font-bold text-gray-800">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section - IMPROVED BUTTON LAYOUT */}
      <section id="services" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="text-center mb-10 sm:mb-12 lg:mb-16 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">What I Offer</h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Tailored services designed to meet your technical and business needs, 
              backed by expertise and a commitment to excellence.
            </p>
          </div>

          {/* Service Selection - FIXED NON-OVERLAPPING BUTTONS */}
          <div className="mb-8 sm:mb-12">
            {/* Mobile: Scrollable Buttons in Single Row */}
            <div className="lg:hidden">
              <div className="overflow-x-auto tabs-scroll pb-2">
                <div className="flex gap-3 px-2 min-w-min">
                  {services.map((service) => (
                    <button
                      key={service.id}
                      onClick={() => setActiveService(service.id)}
                      className={`flex-shrink-0 rounded-2xl px-5 py-4 transition-all duration-300 flex flex-col items-center gap-2 min-w-[110px] ${
                        activeService === service.id
                          ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg scale-105'
                          : 'bg-white/70 text-gray-700 border border-amber-200 hover:bg-amber-50 hover:shadow-md'
                      }`}
                    >
                      <service.icon className={`w-6 h-6 ${activeService === service.id ? 'text-white' : 'text-amber-600'}`} />
                      <span className="text-xs font-semibold whitespace-nowrap">{service.shortTitle}</span>
                    </button>
                  ))}
                </div>
              </div>
              {/* Scroll hint */}
              <p className="text-center text-xs text-gray-500 mt-2">← Swipe to see more services →</p>
            </div>

            {/* Tablet: 2x2 Grid */}
            <div className="hidden lg:hidden md:grid grid-cols-2 gap-4 max-w-2xl mx-auto">
              {services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => setActiveService(service.id)}
                  className={`rounded-2xl px-6 py-5 transition-all duration-300 flex items-center gap-3 ${
                    activeService === service.id
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg scale-105'
                      : 'bg-white/70 text-gray-700 border border-amber-200 hover:bg-amber-50 hover:shadow-md'
                  }`}
                >
                  <service.icon className={`w-6 h-6 flex-shrink-0 ${activeService === service.id ? 'text-white' : 'text-amber-600'}`} />
                  <span className="text-sm font-semibold">{service.shortTitle}</span>
                </button>
              ))}
            </div>

            {/* Desktop: 4 Column Grid */}
            <div className="hidden lg:grid grid-cols-4 gap-4 max-w-5xl mx-auto">
              {services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => setActiveService(service.id)}
                  className={`rounded-2xl px-6 py-5 transition-all duration-300 flex flex-col items-center gap-3 ${
                    activeService === service.id
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg scale-105'
                      : 'bg-white/70 text-gray-700 border border-amber-200 hover:bg-amber-50 hover:shadow-md'
                  }`}
                >
                  <service.icon className={`w-7 h-7 ${activeService === service.id ? 'text-white' : 'text-amber-600'}`} />
                  <span className="text-sm font-semibold text-center">{service.shortTitle}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Service Content Display */}
          <div className="animate-fade-in">
            {services
              .filter((service) => service.id === activeService)
              .map((service) => (
                <div key={service.id} className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                  {/* Main Service Card */}
                  <div className="lg:col-span-2">
                    <Card className="bg-white/70 backdrop-blur-sm border border-amber-200 overflow-hidden hover:shadow-xl transition-all duration-300">
                      <div className={`h-24 sm:h-32 bg-gradient-to-br ${service.iconBg} relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                          <service.icon className="h-10 w-10 sm:h-12 sm:w-12 lg:h-16 lg:w-16 text-white" />
                        </div>
                      </div>
                      
                      <CardHeader className="p-4 sm:p-6">
                        <div className="flex flex-col sm:flex-row items-start justify-between gap-3 sm:gap-0">
                          <div className="flex-1">
                            <CardTitle className="text-lg sm:text-xl lg:text-2xl mb-1 sm:mb-2">{service.title}</CardTitle>
                            <p className="text-amber-600 font-medium text-sm sm:text-base">{service.tagline}</p>
                          </div>
                          <div className="text-left sm:text-right">
                            <div className="text-xl sm:text-2xl font-bold text-amber-700">
                              ${service.price.min} - ${service.price.max}
                            </div>
                            <div className="text-xs sm:text-sm text-gray-500">per {service.price.unit}</div>
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6 pt-0">
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">Overview</h4>
                          <p className="text-gray-600 leading-relaxed text-xs sm:text-sm">{service.longDescription}</p>
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2 sm:mb-3 text-sm sm:text-base">Key Features</h4>
                          <div className="grid grid-cols-1 gap-2 sm:gap-3">
                            {service.features.map((feature, index) => (
                              <div key={index} className="flex items-start space-x-2">
                                <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 mt-0.5 flex-shrink-0" />
                                <span className="text-xs sm:text-sm text-gray-600">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2 sm:mb-3 text-sm sm:text-base">Deliverables</h4>
                          <div className="grid grid-cols-1 gap-2 sm:gap-3">
                            {service.deliverables.map((deliverable, index) => (
                              <div key={index} className="flex items-start space-x-2">
                                <Award className="h-4 w-4 sm:h-5 sm:w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                                <span className="text-xs sm:text-sm text-gray-600">{deliverable}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                          {service.technologies.map((tech, index) => (
                            <Badge key={index} variant="secondary" className="bg-amber-100 text-amber-700 text-[10px] sm:text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Service Details Sidebar */}
                  <div className="space-y-4 sm:space-y-6">
                    <Card className="bg-white/70 backdrop-blur-sm border border-amber-200">
                      <CardHeader className="p-4 sm:p-6">
                        <CardTitle className="text-base sm:text-lg">Project Details</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
                        <div className="flex justify-between text-xs sm:text-sm">
                          <span className="text-gray-600">Duration</span>
                          <span className="font-medium">{service.duration}</span>
                        </div>
                        <div className="flex justify-between text-xs sm:text-sm">
                          <span className="text-gray-600">Complexity</span>
                          <span className="font-medium">{service.complexity}</span>
                        </div>
                        <div className="flex justify-between text-xs sm:text-sm">
                          <span className="text-gray-600">Projects</span>
                          <span className="font-medium">{service.projects} completed</span>
                        </div>
                        <div className="flex justify-between text-xs sm:text-sm">
                          <span className="text-gray-600">Rating</span>
                          <div className="flex items-center">
                            <Star className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500 mr-1" />
                            <span className="font-medium">{service.rating}/5.0</span>
                          </div>
                        </div>
                        <div className="flex justify-between text-xs sm:text-sm">
                          <span className="text-gray-600">Clients</span>
                          <span className="font-medium">{service.clients} satisfied</span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-amber-100 to-orange-100 border border-amber-300">
                      <CardContent className="p-4 sm:p-6 text-center">
                        <h4 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">Ready to get started?</h4>
                        <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">
                          Let's discuss how I can help bring your vision to life
                        </p>
                        <a href="#contact">
                          <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xs sm:text-sm">
                            Start Your Project
                            <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                          </Button>
                        </a>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
        <div className="container mx-auto">
          <div className="text-center mb-10 sm:mb-12 lg:mb-16 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">How I Work</h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              A streamlined process designed to deliver exceptional results while keeping you involved at every stage.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
            {processSteps.map((step, index) => (
              <div key={index} className="relative">
                <Card className="bg-white/70 backdrop-blur-sm border border-amber-200 hover:shadow-xl transition-all duration-300 hover:scale-105 animate-slide-up text-center h-full">
                  <CardContent className="pt-4 sm:pt-6 p-4 sm:p-6">
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br ${
                      index === 0 ? 'from-blue-400 to-cyan-600' : 
                      index === 1 ? 'from-green-400 to-emerald-600' : 
                      index === 2 ? 'from-purple-400 to-pink-600' : 
                      index === 3 ? 'from-orange-400 to-red-600' : 
                      'from-amber-400 to-orange-600'
                    } rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4`}>
                      <span className="text-lg sm:text-xl lg:text-2xl font-bold text-white">{step.step}</span>
                    </div>
                    <h3 className="font-semibold text-sm sm:text-base lg:text-lg mb-1 sm:mb-2">{step.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-600">{step.description}</p>
                  </CardContent>
                </Card>
                {index < processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6 text-amber-500" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="text-center mb-10 sm:mb-12 lg:mb-16 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">Client Testimonials</h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Don't just take my word for it - hear what my clients have to say about working with me.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white/70 backdrop-blur-sm border border-amber-200 hover:shadow-xl transition-all duration-300 hover:scale-105 animate-slide-up">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center mb-3 sm:mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-3 sm:mb-4 italic text-xs sm:text-sm">"{testimonial.content}"</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-gray-800 text-sm sm:text-base">{testimonial.name}</div>
                      <div className="text-xs sm:text-sm text-gray-500">{testimonial.role}</div>
                    </div>
                    <Badge variant="outline" className="text-[10px] sm:text-xs">
                      {services.find(s => s.id === testimonial.service)?.shortTitle}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
        <div className="container mx-auto text-center">
          <Card className="bg-white/70 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-amber-200 animate-slide-up">
            <CardHeader className="p-4 sm:p-6">
              <CardTitle className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3 sm:mb-4">
                Ready to Transform Your Ideas?
              </CardTitle>
              <CardDescription className="text-sm sm:text-base lg:text-lg text-gray-600 max-w-2xl mx-auto">
                Whether you need a cutting-edge web application, personalized mentorship, 
                stunning design, or expert consultation, I'm here to help you succeed.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                <a href="#contact" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 px-6 sm:px-8 py-3 sm:py-4 group text-sm sm:text-base"
                  >
                    Start Your Project
                    <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </a>
                <a href="#projects" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto border-amber-300 text-gray-700 hover:bg-amber-50 backdrop-blur-sm bg-white/50 hover:border-amber-400 transition-all duration-300 hover:scale-105 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base"
                  >
                    View Portfolio
                    <TrendingUp className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Services;