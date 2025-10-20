import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import {
  Code,
  BookOpen,
  Cpu,
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
  MessageCircle,
  BarChart3,
  Sparkles,
  Video,
  CheckCheck,
  Flame,
  Quote,
  Linkedin,
  Twitter,
  Briefcase,
  Share2,
  Bug, 
  Globe, 
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

const PythonCourse = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  // const [selectedLevel, setSelectedLevel] = useState('beginner');

  // --- Python Color Palette (Modified to Amber/Orange theme) ---

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

  const handleDownload = (type : string) => {
    alert(`Downloading ${type}... This feature will be implemented soon!`);
  };

  const handleStartModule = (module : string) => {
    alert(`Starting module: ${module}. Redirecting to course content...`);
  };

  const handleWatchVideo = () => {
    window.open('https://www.youtube.com/results?search_query=python+tutorial+for+beginners', '_blank');
  };

  const handleBrowseCode = () => {
    window.open('https://github.com/search?q=python+examples', '_blank');
  };

  const handlePractice = () => {
    window.open('https://leetcode.com/problemset/all/?difficulty=Easy&listId=wpwgkgt&page=1&topicSlugs=python', '_blank');
  };

  const handleViewProjects = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    alert('Projects section coming soon!');
  };

  const handleReadDocs = () => {
    window.open('https://docs.python.org/3/tutorial/', '_blank');
  };

  const handleShare = (platform :'twitter' | 'linkedin' | 'facebook') => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent('Check out this amazing Python course!');
    
    const urls = {
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
        className="min-h-screen bg-gradient-to-br from-amber-50 via-gray-100 to-amber-100 flex items-center justify-center px-6"
        aria-busy="true"
        aria-live="polite"
      >
        <div className="w-full max-w-sm rounded-2xl border border-amber-200/60 bg-white/60 backdrop-blur-xl shadow-lg p-8">
          <div className="flex flex-col items-center">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-full border-2 border-amber-200" />
              <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-orange-500 animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <Code className="w-7 h-7 text-amber-600 animate-bounce" />
              </div>
            </div>
            <p className="mt-6 text-lg font-semibold text-gray-800">Loading Python Course</p>
            <p className="mt-1 text-sm text-gray-600">Initializing Python VM...</p>
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
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-gray-100 to-amber-100">
      {/* Custom Animations CSS (Kept generic) */}
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
          {/* Amber Blur Background */}
          <div className="absolute top-20 left-10 w-48 sm:w-72 h-48 sm:h-72 bg-amber-300/20 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute top-40 right-10 w-64 sm:w-96 h-64 sm:h-96 bg-orange-300/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 left-1/3 w-56 sm:w-80 h-56 sm:h-80 bg-yellow-300/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="container mx-auto text-center relative z-10">
          <div className="animate-fade-in">
            {/* Python Logo with Amber Gradient */}
            <div className="mb-6 sm:mb-8 flex justify-center">
              <div className="relative group animate-float">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl sm:rounded-2xl blur-lg sm:blur-xl opacity-75 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative bg-gradient-to-br from-orange-600 to-red-700 p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-2xl">
                  <Code className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-white animate-bounce" />
                </div>
              </div>
            </div>

            <Badge className="mb-4 sm:mb-6 bg-amber-500/20 text-amber-700 border-amber-400/30 px-4 sm:px-6 py-1.5 sm:py-2 text-sm sm:text-base md:text-lg animate-scale-in">
              The World's Most Popular Language
            </Badge>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent px-4 animate-slide-up">
              Master Python: Data Science, AI & Automation
            </h1>

            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 mb-6 sm:mb-8 leading-relaxed max-w-3xl mx-auto px-4 animate-slide-up stagger-1">
              Gain proficiency in Python from scratch, mastering core libraries like Pandas and NumPy, and building real-world applications in Machine Learning, Web Development (Flask/Django), and scripting.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-8 sm:mb-12 px-4 animate-slide-up stagger-2">
              <Button
                  size="lg"
                  onClick={() => {
                    const learningPathElement = document.getElementById('learning-path');
                    // Check if the element exists AND if offsetTop is a valid number
                    if (learningPathElement && typeof learningPathElement.offsetTop === 'number') {
                      window.scrollTo({
                        top: learningPathElement.offsetTop - 100,
                        behavior: 'smooth'
                      });
                    } else {
                      console.warn("Element with ID 'learning-path' not found or offsetTop is not available.");
                      // Optionally, you could scroll to the top as a fallback
                      // window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                  className="w-full sm:w-auto bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg group">
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
                { icon: BookMarked, label: 'Modules', value: '60+' },
                { icon: FileCode, label: 'Examples', value: '300+' },
                { icon: Trophy, label: 'Projects', value: '40+' },
                { icon: Users, label: 'Students', value: '5000+' }
              ].map((stat, index) => (
                <div 
                  key={index} 
                  className={`bg-white/70 backdrop-blur-md rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6 border border-amber-200 hover:bg-white/80 hover:shadow-lg transition-all duration-300 hover:scale-105 animate-slide-up stagger-${index + 3}`}
                >
                  <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 text-amber-600 mx-auto mb-2" />
                  <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-amber-600 text-xs sm:text-sm">{stat.label}</div>
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

      {/* Why Learn Python Section with Card Animations */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-8 sm:mb-12 md:mb-16 animate-slide-up">
            <Badge className="mb-3 sm:mb-4 bg-amber-100 text-amber-700 border-amber-200 px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base">
              Why Python?
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6 px-4">
              The Versatility and Power of Python
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Python's clear syntax and industry-leading library support make it the essential language for modern computing and automation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {[
              {
                icon: BookOpen,
                title: 'Exceptional Readability',
                description: 'Clean, English-like syntax minimizes boilerplate code, significantly boosting development speed and team collaboration.',
                color: 'from-green-400 to-emerald-500',
                badge: 'Fast Development'
              },
              {
                icon: Brain,
                title: 'AI & ML Dominance',
                description: 'The unrivaled choice for Machine Learning, utilizing powerful frameworks like TensorFlow, PyTorch, and the Scikit-learn ecosystem.',
                color: 'from-purple-400 to-pink-500',
                badge: 'AI/ML Focus'
              },
              {
                icon: Layers,
                title: 'Vast Library Ecosystem',
                description: 'Access to a comprehensive collection of pre-built modules for everything from scientific computing (NumPy) to data visualization.',
                color: 'from-amber-400 to-orange-500',
                badge: 'Comprehensive'
              },
              {
                icon: BarChart3,
                title: 'Data Science & Analytics',
                description: 'The foundation for data analysis and ETL, relying on industry standards like Pandas and Matplotlib for deep insights.',
                color: 'from-yellow-400 to-orange-500',
                badge: 'Data Mastery'
              },
              {
                icon: Globe,
                title: 'Scalable Backend Web Dev',
                description: 'Build robust, scalable server-side applications and APIs using enterprise-grade frameworks such as Django and Flask.',
                color: 'from-cyan-400 to-blue-500',
                badge: 'Web Ready'
              },
              {
                icon: Terminal,
                title: 'System Automation',
                description: 'Ideal for scripting, system administration, and automating complex, repetitive tasks across various operating systems.',
                color: 'from-red-400 to-rose-500',
                badge: 'Automation'
              }
            ].map((feature, index) => (
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
              Your Structured Roadmap to Python Mastery
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Follow our comprehensive modules designed for practical, job-ready development skills.
            </p>
          </div>

          {/* Beginner Level - Green/Emerald */}
          <div className="mb-12 sm:mb-16">
            <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8 animate-slide-up">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 flex items-center justify-center shadow-lg">
                <Target className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Beginner Level: Core Fundamentals</h3>
                <p className="text-sm sm:text-base text-gray-600">Foundation, Syntax & Core Data Structures</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              {[
                {
                  title: 'Python Fundamentals',
                  topics: ['Installation & Environment Setup', 'Basic Syntax & Comments', 'Variables & Built-in Data Types', 'Console Input/Output'],
                  duration: '2 weeks',
                  projects: 3
                },
                {
                  title: 'Conditional Logic & Loops',
                  topics: ['If-Elif-Else Control Flow', 'For Loops (Iterables)', 'While Loops', 'Loop Control (Break & Continue)'],
                  duration: '1 week',
                  projects: 2
                },
                {
                  title: 'Sequences: Lists & Tuples',
                  topics: ['List Manipulation (Slicing, Methods)', 'List Comprehensions', 'Tuple Packing/Unpacking', 'Memory Efficiency'],
                  duration: '2 weeks',
                  projects: 4
                },
                {
                  title: 'Mappings: Dictionaries & Sets',
                  topics: ['Key-Value Operations', 'Dictionary Methods (get, items)', 'Set Operations (Union, Intersection)', 'Using Hashable Keys'],
                  duration: '2 weeks',
                  projects: 3
                },
                {
                  title: 'Functions and Scope',
                  topics: ['Defining Functions (def)', 'Positional and Keyword Arguments', 'Scope (Local, Enclosing, Global)', 'Lambda Functions'],
                  duration: '2 weeks',
                  projects: 4
                },
                {
                  title: 'Modules, Packages & Virtual Environments',
                  topics: ['Importing Libraries (import)', 'Creating Custom Modules', 'The role of `pip` and `venv`', 'Structuring code into packages'],
                  duration: '1 week',
                  projects: 3
                }
              ].map((module, index) => (
                <Card 
                  key={index} 
                  className={`group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-2 border-green-100 hover:border-green-300 bg-white/80 backdrop-blur-sm animate-slide-up stagger-${index + 1}`}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-emerald-500 to-green-600 flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-md">
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
                      {module.topics.map((topic, idx) => (
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

          {/* Intermediate Level - Amber/Orange */}
          <div className="mb-12 sm:mb-16">
            <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8 animate-slide-up">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 flex items-center justify-center shadow-lg">
                <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Intermediate Level: Applied Development</h3>
                <p className="text-sm sm:text-base text-gray-600">Object-Oriented Programming & Advanced Concepts</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              {[
                {
                  title: 'Object-Oriented Programming (OOP)',
                  topics: ['Classes, Objects, and Methods', 'Inheritance and Polymorphism', 'The Role of `self` and `__init__`', 'Data Encapsulation and Properties'],
                  duration: '3 weeks',
                  projects: 5
                },
                {
                  title: 'File Handling & Context Managers',
                  topics: ['Reading/Writing Text Files', 'Parsing CSV and JSON Data', 'The `with` statement (Context Managers)', 'Handling Binary Data'],
                  duration: '2 weeks',
                  projects: 3
                },
                {
                  title: 'Error Handling, Logging, and Debugging',
                  // FIX APPLIED HERE: Changed single quotes to double quotes for the problematic string.
                  topics: ['Custom Exceptions (try-except-finally)', "Using Python's Built-in Logging Module", 'The PDB Debugger', 'Best practices for Robust Code'],
                  duration: '2 weeks',
                  projects: 3
                },
                {
                  title: 'Iterators, Generators, and Decorators',
                  topics: ['Implementing Iterators', 'Using the `yield` keyword', 'Building Function Decorators', 'Built-in Decorators (`@property`, `@classmethod`)'],
                  duration: '3 weeks',
                  projects: 4
                },
                {
                  title: 'Introduction to Web Development (Flask)',
                  topics: ['HTTP Fundamentals and Requests', 'Setting up a basic Flask Application', 'Routing and URL Mapping', 'Templating with Jinja2'],
                  duration: '3 weeks',
                  projects: 5
                },
                {
                  title: 'Testing and Code Quality (Pytest)',
                  topics: ['Writing Unit Tests with Pytest', 'Mocking External Dependencies', 'Test Driven Development (TDD) principles', 'Code Coverage Metrics'],
                  duration: '2 weeks',
                  projects: 3
                }
              ].map((module, index) => (
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
                      {module.topics.map((topic, idx) => (
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

          {/* Advanced Level - Purple/Pink (for AI/ML, keeping this distinct) */}
          <div>
            <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8 animate-slide-up">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center shadow-lg">
                <Brain className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Advanced Level: Data & Performance</h3>
                <p className="text-sm sm:text-base text-gray-600">Data Science, AI Foundations, and Concurrency</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              {[
                {
                  title: 'Data Wrangling with Pandas',
                  topics: ['Deep Dive into DataFrames', 'Data Cleaning and Preprocessing', 'Merging, Joining, and Reshaping Data', 'Advanced Aggregation Techniques'],
                  duration: '4 weeks',
                  projects: 5
                },
                {
                  title: 'Numerical Computing (NumPy)',
                  topics: ['Vectorized Operations for Performance', 'N-Dimensional Array Manipulation', 'Broadcasting Rules', 'Basic Linear Algebra'],
                  duration: '2 weeks',
                  projects: 3
                },
                {
                  title: 'Machine Learning Foundations',
                  topics: ['Overview of Scikit-learn', 'Supervised Learning Models (Classification, Regression)', 'Cross-Validation and Hyperparameter Tuning', 'Feature Engineering'],
                  duration: '4 weeks',
                  projects: 5
                },
                {
                  title: 'Advanced Web APIs (Django)',
                  topics: ['Django Project Structure', 'Models, Views, and ORM', 'Building RESTful APIs with DRF', 'Authentication and Permissions'],
                  duration: '4 weeks',
                  projects: 5
                },
                {
                  title: 'High Performance and Concurrency',
                  topics: ['Introduction to `asyncio`', 'Understanding the Global Interpreter Lock (GIL)', 'Multithreading and Multiprocessing', 'Concurrent HTTP Requests'],
                  duration: '3 weeks',
                  projects: 4
                },
                {
                  title: 'Optimization and Deployment',
                  topics: ['Code Profiling for Bottlenecks', 'Using Cython or Numba for Speed', 'Containerization with Docker', 'Deployment Strategies (Gunicorn/NGINX)'],
                  duration: '2 weeks',
                  projects: 3
                }
              ].map((module, index) => (
                <Card 
                  key={index} 
                  className={`group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-2 border-purple-100 hover:border-purple-300 bg-white/80 backdrop-blur-sm animate-slide-up stagger-${index + 1}`}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-md">
                        <span className="text-white font-bold text-base">{index + 1}</span>
                      </div>
                      <div className="flex flex-col gap-1.5 items-end">
                        <Badge className="bg-purple-100 text-purple-700 border-purple-200 text-xs">
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
                      {module.topics.map((topic, idx) => (
                        <li key={idx} className="flex items-start text-xs sm:text-sm text-gray-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-purple-500 mr-2 flex-shrink-0 mt-0.5" />
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
                        className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 group text-xs"
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
            <Badge className="mb-3 sm:mb-4 bg-amber-100 text-amber-700 border-amber-200 px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base">
              Success Stories
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6 px-4">
              What Our Graduates Say
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Hear from developers who transformed their careers using Python taught through our program.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="bg-white/80 backdrop-blur-sm border-2 border-gray-100 shadow-xl animate-scale-in">
              <CardContent className="p-8 sm:p-12">
                <Quote className="w-12 h-12 text-amber-500 mb-6" />
                {[
                  {
                    text: "This Python course was the perfect entry into Data Science. The detailed modules on Pandas and NumPy helped me secure my first analyst role!",
                    name: "Alex Rodriguez",
                    role: "Data Analyst at Meta",
                    avatar: "👨‍🔬"
                  },
                  {
                    text: "I used Python for simple scripts before, but now I can build robust web applications using Django. The intermediate section was invaluable.",
                    name: "Lina Kapoor",
                    role: "Backend Developer at Spotify",
                    avatar: "👩‍💻"
                  },
                  {
                    text: "The Machine Learning section is top-notch. It covered everything from basic classification to deploying models using Python frameworks.",
                    name: "David Lee",
                    role: "AI Engineer at NVIDIA",
                    avatar: "🧠"
                  }
                ][activeTestimonial] && (
                  <div className="animate-fade-in">
                    <p className="text-lg sm:text-xl text-gray-700 mb-6 italic leading-relaxed">
                      "{[
                        {
                          text: "This Python course was the perfect entry into Data Science. The detailed modules on Pandas and NumPy helped me secure my first analyst role!",
                          name: "Alex Rodriguez",
                          role: "Data Analyst at Meta",
                          avatar: "👨‍🔬"
                        },
                        {
                          text: "I used Python for simple scripts before, but now I can build robust web applications using Django. The intermediate section was invaluable.",
                          name: "Lina Kapoor",
                          role: "Backend Developer at Spotify",
                          avatar: "👩‍💻"
                        },
                        {
                          text: "The Machine Learning section is top-notch. It covered everything from basic classification to deploying models using Python frameworks.",
                          name: "David Lee",
                          role: "AI Engineer at NVIDIA",
                          avatar: "🧠"
                        }
                      ][activeTestimonial].text}"
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 flex items-center justify-center text-2xl sm:text-3xl">
                        {[
                          {
                            text: "This Python course was the perfect entry into Data Science. The detailed modules on Pandas and NumPy helped me secure my first analyst role!",
                            name: "Alex Rodriguez",
                            role: "Data Analyst at Meta",
                            avatar: "👨‍🔬"
                          },
                          {
                            text: "I used Python for simple scripts before, but now I can build robust web applications using Django. The intermediate section was invaluable.",
                            name: "Lina Kapoor",
                            role: "Backend Developer at Spotify",
                            avatar: "👩‍💻"
                          },
                          {
                            text: "The Machine Learning section is top-notch. It covered everything from basic classification to deploying models using Python frameworks.",
                            name: "David Lee",
                            role: "AI Engineer at NVIDIA",
                            avatar: "🧠"
                          }
                        ][activeTestimonial].avatar}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-lg">
                          {[
                            {
                              text: "This Python course was the perfect entry into Data Science. The detailed modules on Pandas and NumPy helped me secure my first analyst role!",
                              name: "Alex Rodriguez",
                              role: "Data Analyst at Meta",
                              avatar: "👨‍🔬"
                            },
                            {
                              text: "I used Python for simple scripts before, but now I can build robust web applications using Django. The intermediate section was invaluable.",
                              name: "Lina Kapoor",
                              role: "Backend Developer at Spotify",
                              avatar: "👩‍💻"
                            },
                            {
                              text: "The Machine Learning section is top-notch. It covered everything from basic classification to deploying models using Python frameworks.",
                              name: "David Lee",
                              role: "AI Engineer at NVIDIA",
                              avatar: "🧠"
                            }
                          ][activeTestimonial].name}
                        </h4>
                        <p className="text-amber-600 text-sm">
                          {[
                            {
                              text: "This Python course was the perfect entry into Data Science. The detailed modules on Pandas and NumPy helped me secure my first analyst role!",
                              name: "Alex Rodriguez",
                              role: "Data Analyst at Meta",
                              avatar: "👨‍🔬"
                            },
                            {
                              text: "I used Python for simple scripts before, but now I can build robust web applications using Django. The intermediate section was invaluable.",
                              name: "Lina Kapoor",
                              role: "Backend Developer at Spotify",
                              avatar: "👩‍💻"
                            },
                            {
                              text: "Best investment in my career. The memory management and optimization techniques I learned here are invaluable in my daily work.",
                              name: "David Lee",
                              role: "AI Engineer at NVIDIA",
                              avatar: "🧠"
                            }
                          ][activeTestimonial].role}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                <div className="flex justify-center gap-2 mt-8">
                  {[0, 1, 2].map((index) => (
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
            <Badge className="mb-3 sm:mb-4 bg-orange-100 text-orange-700 border-orange-200 px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base">
              Core Concepts
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6 px-4">
              Essential Concepts for Python Proficiency
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Focus on these fundamentals to build robust, maintainable, and idiomatic Python solutions.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {[
              { icon: Sparkles, title: 'Decorators', desc: 'Powerful technique for modifying functions/classes behavior.', color: 'from-pink-500 to-rose-600' },
              { icon: Database, title: 'Pythonic Data Structures', desc: 'Deep dive into List, Dict, Set, and Tuple operations.', color: 'from-amber-500 to-orange-600' },
              { icon: Settings, title: 'Virtual Environments', desc: 'Properly manage dependencies for isolated projects using `venv`.', color: 'from-teal-500 to-cyan-600' },
              { icon: Lightbulb, title: 'Idionmatic Python', desc: 'Write elegant, "Pythonic" code following PEP 8 standards.', color: 'from-yellow-500 to-orange-600' },
              { icon: GitBranch, title: 'Generators', desc: 'Create memory-efficient, lazy-evaluated iterators using `yield`.', color: 'from-green-500 to-emerald-600' },
              { icon: Cpu, title: 'Asynchronous Code', desc: 'Master `async` and `await` for high concurrency using `asyncio`.', color: 'from-red-500 to-pink-600' },
              { icon: Bug, title: 'Error Handling & Logging', desc: 'Implement robust `try...except` blocks and professional logging.', color: 'from-indigo-500 to-purple-600' },
              { icon: Terminal, title: 'Standard Library', desc: 'Leverage built-in tools like `os`, `sys`, and `datetime`.', color: 'from-cyan-500 to-blue-600' }
            ].map((concept, index) => (
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
              Everything You Need to Master Python
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Access comprehensive video tutorials, practical coding exercises, and career resources.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {[
              {
                icon: Video,
                title: 'Video Tutorials',
                description: 'Step-by-step video lessons covering all Python concepts with live coding demonstrations.',
                items: ['60+ Hours Content', 'HD Quality', 'Library Walkthroughs'],
                buttonText: 'Watch Now',
                buttonIcon: Play,
                gradient: 'from-red-500 to-pink-600',
                action: handleWatchVideo
              },
              {
                icon: FileCode,
                title: 'Code Examples',
                description: 'Well-commented, Pythonic code samples for every concept, ready to run and experiment with.',
                items: ['300+ Examples', 'Jupyter Notebooks', 'Copy & Run'],
                buttonText: 'Browse Code',
                buttonIcon: Code,
                gradient: 'from-amber-500 to-orange-600',
                action: handleBrowseCode
              },
              {
                icon: Puzzle,
                title: 'Practice Problems',
                description: 'Solve curated problems focusing on data manipulation, algorithms, and OOP principles.',
                items: ['600+ Problems', 'Auto Grading', 'Hints Available'],
                buttonText: 'Start Solving',
                buttonIcon: Target,
                gradient: 'from-green-500 to-emerald-600',
                action: handlePractice
              },
              {
                icon: Rocket,
                title: 'Real Projects',
                description: 'Build real-world applications like a Flask API, a data analyzer, and an ML model.',
                items: ['40+ Projects', 'Source Code', 'Video Walkthroughs'],
                buttonText: 'View Projects',
                buttonIcon: ExternalLink,
                gradient: 'from-purple-500 to-pink-600',
                action: handleViewProjects
              },
              {
                icon: BookMarked,
                title: 'Official Documentation',
                description: 'Quick links and guides to the official Python documentation and PEP standards.',
                items: ['Searchable', 'PEP 8 Guide', 'Standard Library Docs'],
                buttonText: 'Read Docs',
                buttonIcon: BookOpen,
                gradient: 'from-cyan-500 to-blue-600',
                action: handleReadDocs
              },
              {
                icon: Download,
                title: 'Quick Reference Sheets',
                description: 'Cheat sheets for Python syntax, standard library functions, and Pandas/NumPy basics.',
                items: ['Printable PDFs', 'Bookmark Ready', 'Mobile Friendly'],
                buttonText: 'Download',
                buttonIcon: Download,
                gradient: 'from-yellow-500 to-orange-600',
                action: () => handleDownload('Python Cheat Sheets')
              }
            ].map((resource, index) => (
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
                    {resource.items.map((item, idx) => (
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
              Where Python Mastery Can Take You
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Python proficiency opens doors to some of the highest-demand, highest-paying roles in tech today.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {[
              {
                title: 'Data Scientist',
                companies: ['Google', 'Amazon', 'Netflix', 'Tesla'],
                salary: '$110K - $180K',
                icon: '📊',
                color: 'border-blue-200 hover:border-blue-400',
                description: 'Analyze complex datasets and build predictive models using Pandas and SciPy.'
              },
              {
                title: 'AI/ML Engineer',
                companies: ['OpenAI', 'DeepMind', 'Microsoft', 'NVIDIA'],
                salary: '$120K - $200K',
                icon: '🧠',
                color: 'border-purple-200 hover:border-purple-400',
                description: 'Design and deploy deep learning and AI systems using TensorFlow/PyTorch.'
              },
              {
                title: 'Backend Web Developer',
                companies: ['Instagram', 'Spotify', 'Pinterest', 'Uber'],
                salary: '$95K - $160K',
                icon: '🌐',
                color: 'border-amber-200 hover:border-amber-400',
                description: 'Build scalable servers, APIs, and microservices using Django/Flask.'
              },
              {
                title: 'DevOps/Automation Engineer',
                companies: ['Red Hat', 'Cisco', 'Cloud Providers'],
                salary: '$90K - $150K',
                icon: '☁️',
                color: 'border-orange-200 hover:border-orange-400',
                description: 'Automate infrastructure tasks and CI/CD pipelines with scripting.'
              },
              {
                title: 'Software Development Engineer',
                companies: ['FAANG', 'Startups', 'Fintech'],
                salary: '$100K - $170K',
                icon: '⚙️',
                color: 'border-yellow-200 hover:border-yellow-400',
                description: 'General software development in various sectors utilizing Python versatility.'
              },
              {
                title: 'Quantitative Analyst',
                companies: ['Hedge Funds', 'JPMorgan', 'Bloomberg'],
                salary: '$130K - $250K',
                icon: '📈',
                color: 'border-green-200 hover:border-green-400',
                description: 'Develop high-frequency trading algorithms and financial models.'
              }
            ].map((career, index) => (
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
                                       {career.companies.map((company, idx) => (
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
                Ready to Become a Python Expert?
              </CardTitle>
              <CardDescription className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 px-2">
                Join thousands of successful students leveraging Python's power for data science, AI, and development. Enroll today and transform your career.
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

      {/* Share Section (Kept Blue/Social Colors) */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center animate-slide-up">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Love This Course? Share It!</h3>
            <p className="text-gray-600 mb-6">Help others discover the power of Python programming</p>
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
            <Badge className="mb-3 sm:mb-4 bg-orange-100 text-orange-700 border-orange-200 px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base">
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
                question: "Is Python difficult to learn for beginners?",
                answer: "Python is widely considered the easiest language for beginners due to its clear syntax and high readability. Our course starts from absolute zero and uses practical examples."
              },
              {
                question: "How long does it take to learn enough to get a job?",
                answer: "If you focus on the Beginner and Intermediate paths (around 4-6 months with dedicated study), you can be ready for entry-level roles like Junior Developer or Data Analyst."
              },
              {
                question: "Which Python libraries are covered in detail?",
                answer: "We cover the essential trio: NumPy (numerical computing), Pandas (data analysis), and Matplotlib/Seaborn (visualization) extensively, plus Flask/Django and Scikit-learn."
              },
              {
                question: "What hardware/software do I need?",
                answer: "A standard computer running Windows, macOS, or Linux, and a free code editor like VS Code or PyCharm Community Edition is all you need. All software is free."
              },
              {
                question: "Do you cover Python 2 or Python 3?",
                answer: "The entire course is built exclusively on Modern Python 3 (specifically Python 3.10+ recommendations) as Python 2 is officially deprecated."
              }
            ].map((faq, index) => (
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
              { icon: Users, value: '5,000+', label: 'Students Enrolled', color: 'from-amber-500 to-orange-500' },
              { icon: Trophy, value: '92%', label: 'Project Completion Rate', color: 'from-green-500 to-emerald-500' },
              { icon: Star, value: '4.8/5', label: 'Average Rating', color: 'from-yellow-500 to-orange-500' },
              { icon: Briefcase, value: '88%', label: 'Job Placement', color: 'from-purple-500 to-pink-500' }
            ].map((stat, index) => (
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

export default PythonCourse;