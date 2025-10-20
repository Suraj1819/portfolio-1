import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { 
  Code2, 
  BookOpen, 
  Cpu, 
  Zap, 
  Shield, 
  Layers, 
  Terminal, 
  FileCode, 
  Rocket, 
  Target, 
  CheckCircle2, 
  Download, 
  Play, 
  BookMarked,  
  Trophy, 
  Star, 
  TrendingUp,
  Database,
  GitBranch,
  Puzzle,
  Brain,
  Settings,
  ChevronRight,
  ExternalLink,
  Lightbulb,
  Users,
  Award,
  MessageCircle,
  Video,
  CheckCheck,
  Flame,
  Quote,
  Linkedin,
  Twitter,
  Briefcase,
  Share2
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

const CPlusPlus = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const [activeTestimonial, setActiveTestimonial] = useState<number>(0);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      setProgress(100);
      return;
    }
    const interval = setInterval(() => {
      setProgress(prev => Math.min(prev + 2, 90));
    }, 30);
    return () => clearInterval(interval);
  }, [isLoading]);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleDownload = (type: string): void => {
    alert(`Downloading ${type}... This feature will be implemented soon!`);
  };

  const handleStartModule = (module: string): void => {
    alert(`Starting module: ${module}. Redirecting to course content...`);
  };

  const handleWatchVideo = (): void => {
    window.open('https://www.youtube.com/results?search_query=c%2B%2B+tutorial', '_blank');
  };

  const handleBrowseCode = (): void => {
    window.open('https://github.com/search?q=cpp+examples', '_blank');
  };

  const handlePractice = (): void => {
    window.open('https://leetcode.com/problemset/all/?difficulty=Easy&listId=wpwgkgt&page=1&topicSlugs=cpp', '_blank');
  };

  const handleViewProjects = (): void => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    alert('Projects section coming soon!');
  };

  const handleReadDocs = (): void => {
    window.open('https://cplusplus.com/doc/tutorial/', '_blank');
  };

  const handleShare = (platform: 'twitter' | 'linkedin' | 'facebook'): void => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent('Check out this amazing C++ course!');
    
    const urls: Record<'twitter' | 'linkedin' | 'facebook', string> = {
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`
    };
    
    window.open(urls[platform], '_blank', 'width=600,height=400');
  };

  // Loading Screen
  if (isLoading) {
    return (
      <div
        className="min-h-screen bg-gradient-to-br from-cream-50 via-cream-100 to-amber-50 flex items-center justify-center px-6"
        aria-busy="true"
        aria-live="polite"
      >
        <div className="w-full max-w-sm rounded-2xl border border-amber-200/60 bg-white/60 backdrop-blur-xl shadow-lg p-8">
          <div className="flex flex-col items-center">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-full border-2 border-amber-200" />
              <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-amber-500 animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Code2 className="w-7 h-7 text-amber-600 animate-bounce" />
              </div>
            </div>
            <p className="mt-6 text-lg font-semibold text-gray-800">Loading C++ Course</p>
            <p className="mt-1 text-sm text-gray-600">Compiling knowledge...</p>
            <div
              className="mt-6 w-full h-3 rounded-full bg-amber-100/80 overflow-hidden relative"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progress}
            >
              <div
                className="h-full rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
              <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-amber-800">
                {progress}%
              </span>
            </div>
            <div className="mt-4 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-bounce [animation-delay:150ms]" />
              <span className="w-2 h-2 rounded-full bg-red-500 animate-bounce [animation-delay:300ms]" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-cream-100 to-amber-50">
      {/* Custom Animations CSS */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(-25%) translateX(-50%); }
          50% { transform: translateY(0) translateX(-50%); }
        }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-slide-up { animation: slideUp 0.6s ease-out; }
        .animate-fade-in { animation: fadeIn 0.8s ease-out; }
        .animate-scale-in { animation: scaleIn 0.5s ease-out; }
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
        .animate-bounce-gentle { animation: bounce-gentle 2s ease-in-out infinite; }
        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.2s; }
        .stagger-3 { animation-delay: 0.3s; }
        .stagger-4 { animation-delay: 0.4s; }
        .stagger-5 { animation-delay: 0.5s; }
        .stagger-6 { animation-delay: 0.6s; }
      `}</style>

      {/* Hero Section */}
      <section className="relative pt-20 sm:pt-24 pb-12 sm:pb-16 px-4 sm:px-6 overflow-hidden min-h-[60vh] sm:min-h-[70vh] flex items-center">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-48 sm:w-72 h-48 sm:h-72 bg-amber-300/20 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute top-40 right-10 w-64 sm:w-96 h-64 sm:h-96 bg-orange-300/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 left-1/3 w-56 sm:w-80 h-56 sm:h-80 bg-yellow-300/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="container mx-auto text-center relative z-10">
          <div className="animate-fade-in">
            {/* C++ Logo with Bounce Animation */}
            <div className="mb-6 sm:mb-8 flex justify-center">
              <div className="relative group animate-float">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl sm:rounded-2xl blur-lg sm:blur-xl opacity-75 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative bg-gradient-to-br from-amber-600 to-orange-700 p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-2xl">
                  <Code2 className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-white animate-bounce" />
                </div>
              </div>
            </div>

            <Badge className="mb-4 sm:mb-6 bg-amber-500/20 text-amber-700 border-amber-400/30 px-4 sm:px-6 py-1.5 sm:py-2 text-sm sm:text-base md:text-lg animate-scale-in">
              Programming Language
            </Badge>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent px-4 animate-slide-up">
              Master C++ Programming
            </h1>

            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 mb-6 sm:mb-8 leading-relaxed max-w-3xl mx-auto px-4 animate-slide-up stagger-1">
              Dive deep into the world of high-performance programming. Learn C++ from basics to advanced concepts, including OOP, STL, memory management, and modern C++ features.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-8 sm:mb-12 px-4 animate-slide-up stagger-2">
              <Button
                size="lg"
                onClick={() => {
                  const learningPathElement = document.getElementById('learning-path');
                  if (learningPathElement) {
                    window.scrollTo({ 
                      top: learningPathElement.offsetTop - 100, 
                      behavior: 'smooth' as ScrollBehavior 
                    });
                  }
                }}
                className="w-full sm:w-auto bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg group"
              >
                Start Learning
                <Rocket className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Link to="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-amber-400 text-amber-700 hover:bg-amber-50 backdrop-blur-sm bg-white/50 px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg group"
                >
                  Get in Touch
                  <MessageCircle className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

            {/* Quick Stats with Animation */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 max-w-4xl mx-auto px-4">
              {[
                { icon: BookMarked, label: 'Modules', value: '50+' },
                { icon: FileCode, label: 'Examples', value: '200+' },
                { icon: Trophy, label: 'Projects', value: '30+' },
                { icon: Users, label: 'Students', value: '1000+' }
              ].map((stat: { icon: React.ComponentType<any>; label: string; value: string }, index: number) => (
                <div 
                  key={index} 
                  className={`bg-white/70 backdrop-blur-md rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 border border-amber-200 hover:bg-white/80 hover:shadow-lg transition-all duration-300 hover:scale-105 animate-slide-up stagger-${index + 3}`}
                >
                  <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 text-amber-600 mx-auto mb-2" />
                  <div className="text-xl sm:text-3xl font-bold text-gray-800 mb-1">{stat.value}</div>
                  <div className="text-sm sm:text-base text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-gentle hidden sm:block">
          <div className="w-6 h-10 border-2 border-amber-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-amber-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Why Learn C++ Section with Card Animations */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-8 sm:mb-12 md:mb-16 animate-slide-up">
            <Badge className="mb-3 sm:mb-4 bg-amber-100 text-amber-700 border-amber-200 px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base">
              Why C++?
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6 px-4">
              The Power of C++ Programming
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              C++ is one of the most powerful and versatile programming languages, used in everything from system software to game development.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {[
              {
                icon: Zap,
                title: 'High Performance',
                description: 'Direct hardware access and efficient memory management make C++ extremely fast and suitable for performance-critical applications.',
                color: 'from-yellow-400 to-orange-500',
                badge: 'Speed'
              },
              {
                icon: Shield,
                title: 'Type Safety',
                description: 'Strong static typing helps catch errors at compile-time, ensuring robust and reliable code in production.',
                color: 'from-green-400 to-emerald-500',
                badge: 'Reliable'
              },
              {
                icon: Layers,
                title: 'Multi-Paradigm',
                description: 'Supports procedural, object-oriented, and generic programming paradigms for flexible code architecture.',
                color: 'from-amber-400 to-orange-500',
                badge: 'Flexible'
              },
              {
                icon: Database,
                title: 'Memory Control',
                description: 'Fine-grained control over memory allocation and deallocation for optimal resource management.',
                color: 'from-purple-400 to-pink-500',
                badge: 'Control'
              },
              {
                icon: Cpu,
                title: 'System Programming',
                description: 'Perfect for operating systems, drivers, embedded systems, and low-level programming tasks.',
                color: 'from-red-400 to-rose-500',
                badge: 'Systems'
              },
              {
                icon: Rocket,
                title: 'Industry Standard',
                description: 'Used by major companies like Google, Microsoft, Amazon, Facebook, and more in production systems.',
                color: 'from-cyan-400 to-blue-500',
                badge: 'Popular'
              }
            ].map((feature: { icon: React.ComponentType<any>; title: string; description: string; color: string; badge: string }, index: number) => (
              <Card 
                key={index} 
                className={`group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-2 border-gray-100 hover:border-amber-200 bg-white/80 backdrop-blur-sm animate-slide-up stagger-${index + 1}`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-3 sm:mb-4">
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-r ${feature.color} p-2.5 sm:p-3 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                      <feature.icon className="w-full h-full text-white" />
                    </div>
                    <Badge className="bg-amber-50 text-amber-700 border-amber-200 text-xs">
                      {feature.badge}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Path Section with Working Buttons */}
      <section id="learning-path" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-8 sm:mb-12 md:mb-16 animate-slide-up">
            <Badge className="mb-3 sm:mb-4 bg-orange-100 text-orange-700 border-orange-200 px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base">
              Learning Path
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6 px-4">
              Your Journey to C++ Mastery
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Follow our structured roadmap designed to take you from beginner to expert level.
            </p>
          </div>

          {/* Beginner Level */}
          <div className="mb-12 sm:mb-16">
            <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8 animate-slide-up">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center shadow-lg">
                <Target className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Beginner Level</h3>
                <p className="text-sm sm:text-base text-gray-600">Foundation & Core Concepts</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              {[
                {
                  title: 'Introduction to C++',
                  topics: ['History & Features', 'Setup & IDEs', 'First Program', 'Basic Syntax'],
                  duration: '2 weeks',
                  projects: 3
                },
                {
                  title: 'Data Types & Variables',
                  topics: ['Primitive Types', 'Type Conversion', 'Constants', 'Operators'],
                  duration: '1 week',
                  projects: 2
                },
                {
                  title: 'Control Structures',
                  topics: ['If-Else Statements', 'Switch Cases', 'Loops (for, while)', 'Break & Continue'],
                  duration: '2 weeks',
                  projects: 4
                },
                {
                  title: 'Functions',
                  topics: ['Function Basics', 'Parameters & Arguments', 'Return Types', 'Recursion'],
                  duration: '2 weeks',
                  projects: 3
                },
                {
                  title: 'Arrays & Strings',
                  topics: ['1D & 2D Arrays', 'String Class', 'Character Arrays', 'String Operations'],
                  duration: '2 weeks',
                  projects: 4
                },
                {
                  title: 'Pointers Basics',
                  topics: ['Pointer Syntax', 'Address Operator', 'Pointer Arithmetic', 'Null Pointers'],
                  duration: '2 weeks',
                  projects: 3
                }
              ].map((module: { title: string; topics: string[]; duration: string; projects: number }, index: number) => (
                <Card 
                  key={index} 
                  className={`group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-2 border-green-100 hover:border-green-300 bg-white/80 backdrop-blur-sm animate-slide-up stagger-${index + 1}`}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-md">
                        <span className="text-white font-bold text-base">{index + 1}</span>
                      </div>
                      <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">
                        {module.duration}
                      </Badge>
                    </div>
                    <CardTitle className="text-base sm:text-lg font-bold text-gray-900 mb-2">{module.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1.5 mb-3">
                      {module.topics.map((topic: string, idx: number) => (
                        <li key={idx} className="flex items-start text-xs sm:text-sm text-gray-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <span className="text-xs text-gray-500 flex items-center">
                        <Puzzle className="w-3.5 h-3.5 mr-1" />
                        {module.projects} Projects
                      </span>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => handleStartModule(module.title)}
                        className="text-green-600 hover:text-green-700 hover:bg-green-50 group text-xs"
                      >
                        Start
                        <ChevronRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Intermediate Level */}
          <div className="mb-12 sm:mb-16">
            <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8 animate-slide-up">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 flex items-center justify-center shadow-lg">
                <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Intermediate Level</h3>
                <p className="text-sm sm:text-base text-gray-600">Advanced Concepts & Techniques</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              {[
                {
                  title: 'Object-Oriented Programming',
                  topics: ['Classes & Objects', 'Encapsulation', 'Constructors & Destructors', 'Access Modifiers'],
                  duration: '3 weeks',
                  projects: 5
                },
                {
                  title: 'Inheritance & Polymorphism',
                  topics: ['Base & Derived Classes', 'Virtual Functions', 'Abstract Classes', 'Interfaces'],
                  duration: '3 weeks',
                  projects: 4
                },
                {
                  title: 'Operator Overloading',
                  topics: ['Unary Operators', 'Binary Operators', 'Friend Functions', 'Stream Operators'],
                  duration: '2 weeks',
                  projects: 3
                },
                {
                  title: 'Templates',
                  topics: ['Function Templates', 'Class Templates', 'Template Specialization', 'Variadic Templates'],
                  duration: '2 weeks',
                  projects: 3
                },
                {
                  title: 'Standard Template Library',
                  topics: ['Vectors & Lists', 'Maps & Sets', 'Algorithms', 'Iterators'],
                  duration: '3 weeks',
                  projects: 6
                },
                {
                  title: 'File Handling',
                  topics: ['File Streams', 'Reading & Writing', 'Binary Files', 'File Manipulation'],
                  duration: '2 weeks',
                  projects: 3
                }
              ].map((module: { title: string; topics: string[]; duration: string; projects: number }, index: number) => (
                <Card 
                  key={index} 
                  className={`group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-2 border-amber-100 hover:border-amber-300 bg-white/80 backdrop-blur-sm animate-slide-up stagger-${index + 1}`}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-md">
                        <span className="text-white font-bold text-base">{index + 1}</span>
                      </div>
                      <Badge className="bg-amber-100 text-amber-700 border-amber-200 text-xs">
                        {module.duration}
                      </Badge>
                    </div>
                    <CardTitle className="text-base sm:text-lg font-bold text-gray-900 mb-2">{module.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1.5 mb-3">
                      {module.topics.map((topic: string, idx: number) => (
                        <li key={idx} className="flex items-start text-xs sm:text-sm text-gray-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <span className="text-xs text-gray-500 flex items-center">
                        <Puzzle className="w-3.5 h-3.5 mr-1" />
                        {module.projects} Projects
                      </span>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => handleStartModule(module.title)}
                        className="text-amber-600 hover:text-amber-700 hover:bg-amber-50 group text-xs"
                      >
                        Start
                        <ChevronRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Advanced Level */}
          <div>
            <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8 animate-slide-up">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-r from-red-500 to-pink-600 flex items-center justify-center shadow-lg">
                <Award className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Advanced Level</h3>
                <p className="text-sm sm:text-base text-gray-600">Expert Topics & Optimization</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              {[
                {
                  title: 'Memory Management',
                  topics: ['Dynamic Allocation', 'Smart Pointers', 'Memory Leaks Prevention', 'RAII Pattern'],
                  duration: '3 weeks',
                  projects: 4
                },
                {
                  title: 'Modern C++ Features',
                  topics: ['Lambda Expressions', 'Auto Keyword', 'Range-based Loops', 'Move Semantics'],
                  duration: '3 weeks',
                  projects: 5
                },
                {
                  title: 'Multithreading',
                  topics: ['Thread Management', 'Synchronization', 'Mutexes & Locks', 'Condition Variables'],
                  duration: '4 weeks',
                  projects: 4
                },
                {
                  title: 'Advanced STL',
                  topics: ['Custom Allocators', 'Function Objects', 'Bind & Placeholders', 'Tuple & Pair'],
                  duration: '2 weeks',
                  projects: 3
                },
                {
                  title: 'Design Patterns',
                  topics: ['Singleton Pattern', 'Factory Pattern', 'Observer Pattern', 'Strategy & Decorator'],
                  duration: '4 weeks',
                  projects: 5
                },
                {
                  title: 'Performance Optimization',
                  topics: ['Code Profiling', 'Cache Optimization', 'Compiler Optimizations', 'Algorithm Efficiency'],
                  duration: '3 weeks',
                  projects: 4
                }
              ].map((module: { title: string; topics: string[]; duration: string; projects: number }, index: number) => (
                <Card 
                  key={index} 
                  className={`group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-2 border-red-100 hover:border-red-300 bg-white/80 backdrop-blur-sm animate-slide-up stagger-${index + 1}`}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-red-500 to-pink-600 flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-md">
                        <span className="text-white font-bold text-base">{index + 1}</span>
                      </div>
                      <div className="flex flex-col gap-1.5 items-end">
                        <Badge className="bg-red-100 text-red-700 border-red-200 text-xs">
                          {module.duration}
                        </Badge>
                        <Badge variant="outline" className="text-xs flex items-center gap-1">
                          <Flame className="w-3 h-3" />
                          Expert
                        </Badge>
                      </div>
                    </div>
                    <CardTitle className="text-base sm:text-lg font-bold text-gray-900 mb-2">{module.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1.5 mb-3">
                      {module.topics.map((topic: string, idx: number) => (
                        <li key={idx} className="flex items-start text-xs sm:text-sm text-gray-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <span className="text-xs text-gray-500 flex items-center">
                        <Puzzle className="w-3.5 h-3.5 mr-1" />
                        {module.projects} Projects
                      </span>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => handleStartModule(module.title)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 group text-xs"
                      >
                        Start
                        <ChevronRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-8 sm:mb-12 md:mb-16 animate-slide-up">
            <Badge className="mb-3 sm:mb-4 bg-purple-100 text-purple-700 border-purple-200 px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base">
              Success Stories
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6 px-4">
              What Our Students Say
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Hear from developers who transformed their careers through our C++ program.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="bg-white/80 backdrop-blur-sm border-2 border-gray-100 shadow-xl animate-scale-in">
              <CardContent className="p-8 sm:p-12">
                <Quote className="w-12 h-12 text-amber-500 mb-6" />
                {[
                  {
                    text: "This C++ course completely changed my understanding of programming. The hands-on projects and expert guidance helped me land a job at a top tech company!",
                    name: "Sarah Johnson",
                    role: "Software Engineer at Google",
                    avatar: "👩‍💻"
                  },
                  {
                    text: "The structured curriculum and real-world projects made learning C++ actually enjoyable. I went from beginner to building my own game engine!",
                    name: "Michael Chen",
                    role: "Game Developer at Unity",
                    avatar: "👨‍💻"
                  },
                  {
                    text: "Best investment in my career. The memory management and optimization techniques I learned here are invaluable in my daily work.",
                    name: "Priya Sharma",
                    role: "Systems Programmer at Microsoft",
                    avatar: "👩‍🔬"
                  }
                ].map((testimonial: { text: string; name: string; role: string; avatar: string }, index: number) => (
                  <div 
                    key={index}
                    className={`animate-fade-in ${activeTestimonial === index ? '' : 'hidden'}`}
                  >
                    <p className="text-lg sm:text-xl text-gray-700 mb-6 italic leading-relaxed">
                      "{testimonial.text}"
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center text-2xl sm:text-3xl">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-lg">
                          {testimonial.name}
                        </h4>
                        <p className="text-amber-600 text-sm">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="flex justify-center gap-2 mt-8">
                  {[0, 1, 2].map((index: number) => (
                    <button
                      key={index}
                      onClick={() => setActiveTestimonial(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        activeTestimonial === index ? 'bg-amber-500 w-8' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Key Concepts Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-8 sm:mb-12 md:mb-16 animate-slide-up">
            <Badge className="mb-3 sm:mb-4 bg-cyan-100 text-cyan-700 border-cyan-200 px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base">
              Core Concepts
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6 px-4">
              Essential C++ Concepts to Master
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Understanding these fundamental concepts is crucial for becoming a proficient C++ developer.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {[
              { icon: Brain, title: 'OOP Principles', desc: 'Master classes, objects, inheritance, polymorphism', color: 'from-pink-500 to-rose-600' },
              { icon: Database, title: 'Memory Management', desc: 'Understand pointers, references, dynamic allocation', color: 'from-amber-500 to-orange-600' },
              { icon: Settings, title: 'STL Mastery', desc: 'Learn containers, iterators, and algorithms', color: 'from-purple-500 to-indigo-600' },
              { icon: Lightbulb, title: 'Best Practices', desc: 'Write clean, efficient, maintainable code', color: 'from-yellow-500 to-orange-600' },
              { icon: GitBranch, title: 'Templates', desc: 'Create generic and reusable code components', color: 'from-green-500 to-emerald-600' },
              { icon: Cpu, title: 'Performance', desc: 'Optimize code for speed and efficiency', color: 'from-red-500 to-pink-600' },
              { icon: Shield, title: 'Exception Handling', desc: 'Handle errors gracefully and safely', color: 'from-indigo-500 to-purple-600' },
              { icon: Terminal, title: 'Modern C++', desc: 'Utilize C++11/14/17/20 features', color: 'from-cyan-500 to-blue-600' }
            ].map((concept: { icon: React.ComponentType<any>; title: string; desc: string; color: string }, index: number) => (
              <Card 
                key={index} 
                className={`group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-2 border-gray-100 hover:border-amber-200 animate-slide-up stagger-${index + 1}`}
              >
                <CardContent className="pt-4 sm:pt-6 p-3 sm:p-6">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg sm:rounded-xl bg-gradient-to-r ${concept.color} p-2 sm:p-2.5 md:p-3 mb-2 sm:mb-3 md:mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg mx-auto`}>
                    <concept.icon className="w-full h-full text-white" />
                  </div>
                  <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-1 sm:mb-2 text-center">{concept.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 text-center leading-relaxed">{concept.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Section with Working Buttons */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-8 sm:mb-12 md:mb-16 animate-slide-up">
            <Badge className="mb-3 sm:mb-4 bg-amber-100 text-amber-700 border-amber-200 px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base">
              Learning Resources
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6 px-4">
              Everything You Need to Learn C++
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Access comprehensive tutorials, practice problems, projects, and reference materials.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {[
              {
                icon: Video,
                title: 'Video Tutorials',
                description: 'Step-by-step video lessons covering all C++ concepts with live coding demonstrations.',
                items: ['50+ Hours Content', 'HD Quality', 'Downloadable'],
                buttonText: 'Watch Now',
                buttonIcon: Play,
                gradient: 'from-red-500 to-pink-600',
                action: handleWatchVideo
              },
              {
                icon: FileCode,
                title: 'Code Examples',
                description: 'Well-commented code samples for every concept, ready to run and experiment with.',
                items: ['200+ Examples', 'Syntax Highlighted', 'Copy & Run'],
                buttonText: 'Browse Code',
                buttonIcon: Code2,
                gradient: 'from-amber-500 to-orange-600',
                action: handleBrowseCode
              },
              {
                icon: Puzzle,
                title: 'Practice Problems',
                description: 'Solve curated problems from easy to hard, with detailed solutions and explanations.',
                items: ['500+ Problems', 'Auto Grading', 'Hints Available'],
                buttonText: 'Start Solving',
                buttonIcon: Target,
                gradient: 'from-green-500 to-emerald-600',
                action: handlePractice
              },
              {
                icon: Rocket,
                title: 'Real Projects',
                description: 'Build real-world applications like games, tools, and system software.',
                items: ['30+ Projects', 'Source Code', 'Video Walkthroughs'],
                buttonText: 'View Projects',
                buttonIcon: ExternalLink,
                gradient: 'from-purple-500 to-pink-600',
                action: handleViewProjects
              },
              {
                icon: BookMarked,
                title: 'Documentation',
                description: 'Complete reference guide for C++ syntax, libraries, and best practices.',
                items: ['Searchable', 'PDF Export', 'Always Updated'],
                buttonText: 'Read Docs',
                buttonIcon: BookOpen,
                gradient: 'from-orange-500 to-red-600',
                action: handleReadDocs
              },
              {
                icon: Download,
                title: 'Cheat Sheets',
                description: 'Quick reference cards for syntax, STL, and common patterns.',
                items: ['Printable PDFs', 'Bookmark Ready', 'Mobile Friendly'],
                buttonText: 'Download',
                buttonIcon: Download,
                gradient: 'from-cyan-500 to-amber-600',
                action: () => handleDownload('C++ Cheat Sheets')
              }
            ].map((resource: { 
              icon: React.ComponentType<any>; 
              title: string; 
              description: string; 
              items: string[]; 
              buttonText: string; 
              buttonIcon: React.ComponentType<any>; 
              gradient: string; 
              action: () => void; 
            }, index: number) => (
              <Card 
                key={index} 
                className={`group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-2 border-gray-100 hover:border-amber-200 animate-slide-up stagger-${index + 1}`}
              >
                <CardHeader>
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-r ${resource.gradient} p-2.5 sm:p-3 mb-3 sm:mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                    <resource.icon className="w-full h-full text-white" />
                  </div>
                  <CardTitle className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">{resource.title}</CardTitle>
                  <CardDescription className="text-sm sm:text-base text-gray-600">
                    {resource.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1.5 sm:space-y-2 mb-4 sm:mb-6">
                    {resource.items.map((item: string, idx: number) => (
                      <li key={idx} className="flex items-center text-xs sm:text-sm text-gray-600">
                        <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-500 mr-2 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    onClick={resource.action}
                    className={`w-full bg-gradient-to-r ${resource.gradient} hover:shadow-lg transition-all duration-300 group text-sm sm:text-base`}
                  >
                    {resource.buttonText}
                    <resource.buttonIcon className="ml-2 h-3.5 w-3.5 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Career Opportunities Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-8 sm:mb-12 md:mb-16 animate-slide-up">
            <Badge className="mb-3 sm:mb-4 bg-green-100 text-green-700 border-green-200 px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base">
              Career Paths
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6 px-4">
              Where C++ Can Take You
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              C++ developers are in high demand across various industries with excellent career prospects.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {[
              {
                title: 'Game Development',
                companies: ['Unity', 'Unreal Engine', 'EA', 'Blizzard'],
                salary: '$80K - $150K',
                icon: '🎮',
                color: 'border-purple-200 hover:border-purple-400',
                description: 'Build AAA games and game engines'
              },
              {
                title: 'System Software',
                companies: ['Microsoft', 'Apple', 'Linux', 'Oracle'],
                salary: '$90K - $160K',
                icon: '💻',
                color: 'border-amber-200 hover:border-amber-400',
                description: 'Develop operating systems and drivers'
              },
              {
                title: 'Embedded Systems',
                companies: ['Tesla', 'Intel', 'Qualcomm', 'ARM'],
                salary: '$85K - $145K',
                icon: '🔧',
                color: 'border-green-200 hover:border-green-400',
                description: 'Create IoT and embedded solutions'
              },
              {
                title: 'Finance & Trading',
                companies: ['Goldman Sachs', 'Morgan Stanley', 'JPMorgan'],
                salary: '$100K - $200K',
                icon: '💰',
                color: 'border-yellow-200 hover:border-yellow-400',
                description: 'High-frequency trading systems'
              },
              {
                title: 'Graphics & Visualization',
                companies: ['Pixar', 'Adobe', 'Autodesk', 'NVIDIA'],
                salary: '$85K - $155K',
                icon: '🎨',
                color: 'border-pink-200 hover:border-pink-400',
                description: '3D rendering and visual effects'
              },
              {
                title: 'Research & AI',
                companies: ['Google', 'Facebook', 'Amazon', 'IBM'],
                salary: '$95K - $180K',
                icon: '🤖',
                color: 'border-indigo-200 hover:border-indigo-400',
                description: 'Machine learning and AI research'
              }
            ].map((career: { title: string; companies: string[]; salary: string; icon: string; color: string; description: string }, index: number) => (
              <Card 
                key={index} 
                className={`group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-2 ${career.color} animate-slide-up stagger-${index + 1}`}
              >
                <CardHeader>
                  <div className="text-3xl sm:text-4xl md:text-5xl mb-3 sm:mb-4">{career.icon}</div>
                  <CardTitle className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">{career.title}</CardTitle>
                  <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">{career.description}</p>
                  <Badge className="bg-green-100 text-green-700 border-green-200 w-fit text-xs sm:text-sm">
                    {career.salary}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 font-semibold">Top Companies:</p>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {career.companies.map((company: string, idx: number) => (
                      <Badge key={idx} variant="outline" className="bg-gray-50 text-xs">
                        {company}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-white/70 backdrop-blur-sm p-6 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl border-2 border-amber-200 shadow-xl animate-slide-up">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 px-2">
                Ready to Start Your C++ Journey?
              </CardTitle>
              <CardDescription className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 px-2">
                Join thousands of students learning C++ and building amazing projects. Get started today with our comprehensive curriculum and expert guidance.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-4 sm:mb-6">
                <Link to="/contact" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg group"
                  >
                    Enroll Now
                    <Rocket className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => handleDownload('Free Preview')}
                  className="w-full sm:w-auto border-2 border-amber-300 text-amber-700 hover:bg-amber-50 backdrop-blur-sm px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg group"
                >
                  Free Preview
                  <Play className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
              <div className="flex flex-wrap justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-amber-700">
                <span className="flex items-center">
                  <CheckCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1" />
                  30-day money-back
                </span>
                <span className="flex items-center">
                  <CheckCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1" />
                  Lifetime access
                </span>
                <span className="flex items-center">
                  <CheckCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1" />
                  Certificate included
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Share Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center animate-slide-up">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Love This Course? Share It!</h3>
            <p className="text-gray-600 mb-6">Help others discover the power of C++ programming</p>
            <div className="flex justify-center gap-4">
              <Button
                onClick={() => handleShare('twitter')}
                variant="outline"
                className="border-blue-400 text-blue-600 hover:bg-blue-50 group"
              >
                <Twitter className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Twitter
              </Button>
              <Button
                onClick={() => handleShare('linkedin')}
                variant="outline"
                className="border-blue-600 text-blue-700 hover:bg-blue-50 group"
              >
                <Linkedin className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                LinkedIn
              </Button>
              <Button
                onClick={() => handleShare('facebook')}
                variant="outline"
                className="border-blue-500 text-blue-600 hover:bg-blue-50 group"
              >
                <Share2 className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Facebook
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8 sm:mb-12 animate-slide-up">
            <Badge className="mb-3 sm:mb-4 bg-blue-100 text-blue-700 border-blue-200 px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base">
              FAQ
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 px-4">
              Frequently Asked Questions
            </h2>
            <p className="text-base sm:text-lg text-gray-600 px-4">
              Got questions? We've got answers!
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                question: "Do I need prior programming experience?",
                answer: "No! Our beginner level starts from scratch. However, basic computer literacy is recommended."
              },
              {
                question: "How long does it take to complete the course?",
                answer: "The complete course takes approximately 6-8 months if you dedicate 10-15 hours per week. You can go at your own pace."
              },
              {
                question: "Will I get a certificate?",
                answer: "Yes! Upon completion, you'll receive a certificate that you can share on LinkedIn and add to your resume."
              },
              {
                question: "What if I get stuck?",
                answer: "We offer community support, detailed documentation, and mentor sessions to help you overcome any challenges."
              },
              {
                question: "Can I access the course on mobile?",
                answer: "Yes! All course materials are mobile-friendly, though we recommend using a computer for coding exercises."
              }
            ].map((faq: { question: string; answer: string }, index: number) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border-2 border-gray-100 hover:border-amber-200 transition-all duration-300 animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl text-gray-900 flex items-start">
                    <span className="text-amber-600 mr-2">Q:</span>
                    {faq.question}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 ml-6">
                    <span className="text-amber-600 mr-2">A:</span>
                    {faq.answer}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-8 sm:mb-12 animate-slide-up">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 px-4">
              Course Impact
            </h2>
            <p className="text-base sm:text-lg text-gray-600 px-4">
              Real results from real students
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Users, value: '10,000+', label: 'Students Enrolled', color: 'from-blue-500 to-cyan-500' },
              { icon: Trophy, value: '95%', label: 'Completion Rate', color: 'from-green-500 to-emerald-500' },
              { icon: Star, value: '4.9/5', label: 'Average Rating', color: 'from-yellow-500 to-orange-500' },
              { icon: Briefcase, value: '85%', label: 'Job Placement', color: 'from-purple-500 to-pink-500' }
            ].map((stat: { icon: React.ComponentType<any>; value: string; label: string; color: string }, index: number) => (
              <Card key={index} className={`group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-2 border-gray-100 animate-slide-up stagger-${index + 1}`}>
                <CardContent className="pt-6 p-6 text-center">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${stat.color} p-4 mb-4 group-hover:scale-110 transition-transform mx-auto shadow-lg`}>
                    <stat.icon className="w-full h-full text-white" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <p className="text-sm sm:text-base text-gray-600">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CPlusPlus;