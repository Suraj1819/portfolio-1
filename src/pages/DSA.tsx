import React, { useState, useEffect } from 'react'; // ✅ Fixed: Removed unused 'React' import
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import {
  Code,
  BookOpen,
  Cpu, // Used for complexity/performance
  Zap,
  Shield,
  Layers,
  Terminal, // Used for competitive programming/cli
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
  GitBranch, // Used for recursion/trees
  Puzzle,
  Brain, // Used for algorithms/problem-solving
  Settings,
  ChevronRight,
  ExternalLink,
  Users,
  Award,
  Video,
  CheckCheck,
  Flame,
  Quote,
  Linkedin,
  Twitter,
  Briefcase,
  DollarSign,
  Share2,
  ListOrdered, // Added for "Algorithms" section
  List, // Added for "Data Structures" section
  Search,
  GitMerge
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

const DSA_Course = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true); // ✅ Fixed: Added explicit type for state
  const [progress, setProgress] = useState<number>(0); // ✅ Fixed: Added explicit type for state
  const [activeTestimonial, setActiveTestimonial] = useState<number>(0); // ✅ Fixed: Added explicit type for state
  // const [selectedLevel, setSelectedLevel] = useState('beginner');

  // --- DSA Color Palette (Amber/Orange theme) ---

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

  const handleDownload = (type: string): void => { // ✅ Fixed: Typed parameter as 'string' and return type as 'void'
    alert(`Downloading ${type}... This feature will be implemented soon!`);
  };

  const handleStartModule = (module: string): void => { // ✅ Fixed: Typed parameter as 'string' and return type as 'void'
    alert(`Starting module: ${module}. Redirecting to course content...`);
  };

  const handleWatchVideo = (): void => { // ✅ Added: Explicit void return type for consistency
    window.open('https://www.youtube.com/results?search_query=data+structures+algorithms+tutorial', '_blank');
  };

  const handleBrowseCode = (): void => { // ✅ Added: Explicit void return type for consistency
    window.open('https://github.com/search?q=dsa+implementations', '_blank');
  };

  const handlePractice = (): void => { // ✅ Added: Explicit void return type for consistency
    window.open('https://leetcode.com/', '_blank');
  };

  const handleViewProjects = (): void => { // ✅ Added: Explicit void return type for consistency
    window.scrollTo({ top: 0, behavior: 'smooth' });
    alert('Projects section coming soon!');
  };

  const handleReadDocs = (): void => { // ✅ Added: Explicit void return type for consistency
    window.open('https://www.geeksforgeeks.org/data-structures/', '_blank');
  };

  const handleShare = (platform: 'twitter' | 'linkedin' | 'facebook'): void => { // ✅ Fixed: Typed parameter as union type and return type as 'void'
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent('Master DSA and ace your interviews with this amazing course!');

    const urls: Record<'twitter' | 'linkedin' | 'facebook', string> = { // ✅ Fixed: Typed 'urls' as Record to prevent indexing error
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
                <Brain className="w-7 h-7 text-amber-600 animate-bounce" />
              </div>
            </div>
            <p className="mt-6 text-lg font-semibold text-gray-800">Loading DSA Course</p>
            <p className="mt-1 text-sm text-gray-600">Calculating time complexity...</p>
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
        }        @keyframes fadeIn {
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
            {/* Brain/CPU Icon with Amber Gradient */}
            <div className="mb-6 sm:mb-8 flex justify-center">
              <div className="relative group animate-float">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl sm:rounded-2xl blur-lg sm:blur-xl opacity-75 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative bg-gradient-to-br from-orange-600 to-red-700 p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-2xl">
                  <Brain className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-white animate-bounce" />
                </div>              </div>
            </div>

            <Badge className="mb-4 sm:mb-6 bg-amber-500/20 text-amber-700 border-amber-400/30 px-4 sm:px-6 py-1.5 sm:py-2 text-sm sm:text-base md:text-lg animate-scale-in">
              The Foundation of Technical Excellence
            </Badge>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent px-4 animate-slide-up">
              Master Data Structures & Algorithms
            </h1>

            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 mb-6 sm:mb-8 leading-relaxed max-w-3xl mx-auto px-4 animate-slide-up stagger-1">
              Unlock top-tier software engineering roles by mastering core problem-solving techniques, Big O complexity, and efficient data handling for technical interviews.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-8 sm:mb-12 px-4 animate-slide-up stagger-2">
              <Button
                size="lg"
                onClick={() => { // ✅ Fixed: Added null check for element to prevent 'possibly null' error
                  const learningPathElement = document.getElementById('learning-path');
                  if (learningPathElement) {
                    window.scrollTo({ 
                      top: learningPathElement.offsetTop - 100, 
                      behavior: 'smooth' as ScrollBehavior // ✅ Added: Type assertion for behavior
                    });
                  }
                }}
                className="w-full sm:w-auto bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg group"
              >
                Start Interview Prep
                <Rocket className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Link to="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-amber-400 text-amber-700 hover:bg-amber-50 backdrop-blur-sm bg-white/50 px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg group"
                >
                  View Sample Problems
                  <Terminal className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

            {/* Quick Stats with Animation */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 max-w-4xl mx-auto px-4">
              {[
                { icon: BookMarked, label: 'Topics', value: '50+' },
                { icon: FileCode, label: 'Problems Solved', value: '450+' },
                { icon: Trophy, label: 'Interview Questions', value: '100+' },
                { icon: Users, label: 'Success Stories', value: '1500+' }              ].map((stat: { icon: React.ComponentType<any>; label: string; value: string }, index: number) => ( // ✅ Fixed: Added explicit types for map parameter and index
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

      {/* Why Learn DSA Section with Card Animations */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-8 sm:mb-12 md:mb-16 animate-slide-up">
            <Badge className="mb-3 sm:mb-4 bg-amber-100 text-amber-700 border-amber-200 px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base">
              Why DSA?
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6 px-4">
              The Critical Skill for Elite Engineering Roles
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              DSA is the core knowledge tested by top tech companies (FAANG, etc.) to assess fundamental problem-solving and efficiency skills.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {[              {
                icon: Cpu,
                title: 'Master Efficiency (Big O)',
                description: 'Learn to precisely measure and optimize the time and space complexity of your code, ensuring fast, scalable solutions.',
                color: 'from-green-400 to-emerald-500',
                badge: 'Performance'
              },
              {
                icon: Shield,
                title: 'Ace Technical Interviews',
                description: 'Build confidence and competence in the core problem types that dominate coding interviews at top-tier tech firms.',
                color: 'from-purple-400 to-pink-500',
                badge: 'Career Accelerator'
              },
              {
                icon: Brain,
                title: 'Foundation of Programming',
                description: 'Understand the fundamental building blocks used in databases, compilers, operating systems, and game engines.',
                color: 'from-amber-400 to-orange-500',
                badge: 'Core CS'
              },
              {
                icon: Layers,
                title: 'Structured Problem Solving',
                description: 'Develop a systematic approach to breaking down complex problems, leading to cleaner, more manageable code designs.',
                color: 'from-yellow-400 to-orange-500',
                badge: 'Structured Thinking'
              },
              {
                icon: GitBranch,
                title: 'Recursive Thinking',
                description: 'Master the art of recursion, divide and conquer, and dynamic programming essential for advanced algorithms.',
                color: 'from-cyan-400 to-blue-500',
                badge: 'Advanced Logic'
              },
              {
                icon: DollarSign,
                title: 'High-Value Skillset',
                description: 'This expertise correlates directly with higher salaries and more challenging, impactful roles in the industry.',
                color: 'from-red-400 to-rose-500',
                badge: 'High Earning Potential'
              }
            ].map((feature: { icon: React.ComponentType<any>; title: string; description: string; color: string; badge: string }, index: number) => ( // ✅ Fixed: Added explicit types for map parameter and index
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

      {/* Algorithms and Data Structures Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-8 sm:mb-12 md:mb-16 animate-slide-up">
            <Badge className="mb-3 sm:mb-4 bg-amber-100 text-amber-700 border-amber-200 px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base">
              Core Concepts
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6 px-4">
              Algorithms and Data Structures
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Explore essential algorithms and data structures, and their applications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Algorithms Section */}
            <div>
              <div className="flex items-center gap-3 sm:gap-4 mb-4 animate-slide-up">
                <ListOrdered className="w-8 h-8 text-amber-600" />
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Algorithms</h3>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {[
                  { name: 'Sorting Algorithms', description: 'Bubble Sort, Merge Sort, Quick Sort, Heap Sort, etc.', icon: <Zap className="w-4 h-4 mr-2" /> },
                  { name: 'Searching Algorithms', description: 'Linear Search, Binary Search, etc.', icon: <Search className="w-4 h-4 mr-2" /> },
                  { name: 'Graph Algorithms', description: 'BFS, DFS, Dijkstra, etc.', icon: <GitBranch className="w-4 h-4 mr-2" /> },
                  { name: 'Dynamic Programming', description: 'Memoization, Tabulation, etc.', icon: <Brain className="w-4 h-4 mr-2" /> },
                  { name: 'Greedy Algorithms', description: 'Activity Selection, etc.', icon: <Flame className="w-4 h-4 mr-2" /> },
                ].map((algorithm: { name: string; description: string; icon: React.ReactNode }, index: number) => ( // ✅ Fixed: Added explicit types for map parameter and index
                  <Card key={index} className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-2 border-gray-100 hover:border-amber-200 bg-white/80 backdrop-blur-sm animate-slide-up">
                    <CardContent className="p-4">
                      <div className="flex items-center">
                        {algorithm.icon}
                        <span className="font-semibold">{algorithm.name}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">{algorithm.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>            {/* Data Structures Section */}
            <div>
              <div className="flex items-center gap-3 sm:gap-4 mb-4 animate-slide-up">
                <List className="w-8 h-8 text-amber-600" />
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Data Structures</h3>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {[
                  { name: 'Arrays', description: 'Dynamic and Static Arrays', icon: <ListOrdered className="w-4 h-4 mr-2" /> },
                  { name: 'Linked Lists', description: 'Singly, Doubly, and Circular Linked Lists', icon: <Layers className="w-4 h-4 mr-2" /> },
                  { name: 'Stacks', description: 'LIFO Principle', icon: <Layers className="w-4 h-4 mr-2" /> },
                  { name: 'Queues', description: 'FIFO Principle', icon: <Layers className="w-4 h-4 mr-2" /> },
                  { name: 'Hash Tables', description: 'Hash Functions, Collisions', icon: <Database className="w-4 h-4 mr-2" /> },
                  { name: 'Trees', description: 'Binary Trees, BST, AVL, etc.', icon: <GitBranch className="w-4 h-4 mr-2" /> },
                  { name: 'Heaps', description: 'Max-Heap, Min-Heap', icon: <Cpu className="w-4 h-4 mr-2" /> },
                ].map((structure: { name: string; description: string; icon: React.ReactNode }, index: number) => ( // ✅ Fixed: Added explicit types for map parameter and index
                  <Card key={index} className="group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border-2 border-gray-100 hover:border-amber-200 bg-white/80 backdrop-blur-sm animate-slide-up">
                    <CardContent className="p-4">                      <div className="flex items-center">
                        {structure.icon}
                        <span className="font-semibold">{structure.name}</span>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">{structure.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
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
              Structured Preparation for Coding Interviews
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              A comprehensive roadmap taking you from foundational mathematics to advanced algorithmic techniques.
            </p>
          </div>

          {/* Beginner Level - Green/Emerald */}
          <div className="mb-12 sm:mb-16">
            <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8 animate-slide-up">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 flex items-center justify-center shadow-lg">
                <Target className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Level 1: Foundations and Linear Structures</h3>
                <p className="text-sm sm:text-base text-gray-600">Complexity Analysis, Arrays, and Linked Lists</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              {[
                {
                  title: 'Complexity Analysis (Big O)',
                  topics: ['Time and Space Complexity', 'Worst/Average/Best Case', 'Amortized Analysis', 'Master Theorem Basics'],
                  duration: '2 weeks',
                  projects: 3
                },
                {
                  title: 'Arrays and Strings',
                  topics: ['Array Operations', 'Two-Pointer Technique', 'Sliding Window', 'String Manipulation Algorithms'],
                  duration: '3 weeks',
                  projects: 5
                },
                {                  title: 'Linked Lists',
                  topics: ['Singly, Doubly, and Circular Lists', 'Pointer Manipulation (Fast/Slow)', 'Reversal and Cycle Detection', 'CRUD Operations'],
                  duration: '2 weeks',
                  projects: 4
                },
                {
                  title: 'Stacks and Queues',
                  topics: ['LIFO/FIFO Principles', 'Implementation using Arrays/Lists', 'Applications (Undo/Redo)', 'Monotonic Stack/Queue'],
                  duration: '1 week',
                  projects: 2
                },
                {
                  title: 'Recursion and Backtracking',
                  topics: ['Base Cases and Recursive Steps', 'Call Stack Visualization', 'Memoization Introduction', 'Basic Backtracking Problems (N-Queens, Sudoku)'],
                  duration: '3 weeks',
                  projects: 4
                },
                {
                  title: 'Searching Algorithms',
                  topics: ['Linear Search', 'Binary Search (Iterative & Recursive)', 'Ternary Search', 'Search in Sorted/Rotated Arrays'],
                  duration: '1 week',
                  projects: 3
                }
              ].map((module: { title: string; topics: string[]; duration: string; projects: number }, index: number) => ( // ✅ Fixed: Added explicit types for map parameter and index
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
                      {module.topics.map((topic: string, idx: number) => ( // ✅ Fixed: Added explicit types for inner map
                        <li key={idx} className="flex items-start text-xs sm:text-sm text-gray-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <span className="text-xs text-gray-500 flex items-center">
                        <Puzzle className="w-3.5 h-3.5 mr-1" />
                        {module.projects} Problems
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
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Level 2: Non-Linear Structures and Sorting</h3>
                <p className="text-sm sm:text-base text-gray-600">Hashing, Trees, and Core Sorting Techniques</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              {[
                {
                  title: 'Hash Tables (Maps & Sets)',
                  topics: ['Hashing Functions and Collisions', 'Separate Chaining and Open Addressing', 'Time complexity O(1) vs O(N)', 'Practical applications in databases'],
                  duration: '3 weeks',
                  projects: 5
                },
                {
                  title: 'Trees: Binary Trees',
                  topics: ['Binary Tree Traversal (Pre, In, Post)', 'Tree Properties (Height, Depth)', 'Tree Balancing Basics', 'Implementation Details'],
                  duration: '3 weeks',
                  projects: 4
                },
                {
                  title: 'Binary Search Trees (BST)',
                  topics: ['BST Insertion and Deletion', 'Finding Minimum/Maximum', 'Checking if a Tree is a Valid BST', 'Time complexity O(logN) vs O(N)'],
                  duration: '2 weeks',
                  projects: 3
                },
                {
                  title: 'Sorting Algorithms I (O(N^2))',
                  topics: ['Bubble Sort, Selection Sort, Insertion Sort', 'Stability and In-place Sorting', 'When to use simple sorts', 'Comparison Counts'],
                  duration: '2 weeks',
                  projects: 3
                },
                {
                  title: 'Sorting Algorithms II (O(N log N))',
                  topics: ['Merge Sort (Divide & Conquer)', 'Quick Sort (Pivot Selection)', 'Heap Sort (Heap Structure)', 'Stability and Performance comparison'],
                  duration: '3 weeks',
                  projects: 6
                },
                {
                  title: 'Heaps and Priority Queues',
                  topics: ['Max Heap vs Min Heap Structure', 'Insertion and Extraction', 'Heapify Algorithm', 'Using Priority Queue for scheduling problems'],
                  duration: '2 weeks',
                  projects: 3
                }
              ].map((module: { title: string; topics: string[]; duration: string; projects: number }, index: number) => ( // ✅ Fixed: Added explicit types for map parameter and index
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
                      {module.topics.map((topic: string, idx: number) => ( // ✅ Fixed: Added explicit types for inner map
                        <li key={idx} className="flex items-start text-xs sm:text-sm text-gray-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <span className="text-xs text-gray-500 flex items-center">
                        <Puzzle className="w-3.5 h-3.5 mr-1" />
                        {module.projects} Problems
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

          {/* Advanced Level - Purple/Pink */}
          <div>
            <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8 animate-slide-up">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center shadow-lg">
                <Award className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Level 3: Graph Theory and Advanced Algorithms</h3>
                <p className="text-sm sm:text-base text-gray-600">Mastering Graphs, Dynamic Programming, and Tries</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              {[
                {
                  title: 'Graph Traversal',
                  topics: ['Graph Representations (Adjacency List/Matrix)', 'Breadth-First Search (BFS)', 'Depth-First Search (DFS)', 'Topological Sort'],
                  duration: '3 weeks',
                  projects: 4
                },
                {
                  title: 'Shortest Path Algorithms',
                  topics: ['Dijkstra\'s Algorithm (Weighted Graphs)', 'Bellman-Ford Algorithm', 'Floyd-Warshall (All Pairs Shortest Path)', 'Applications in Routing'],
                  duration: '3 weeks',
                  projects: 5
                },
                {
                  title: 'Dynamic Programming (DP)',
                  topics: ['Overlapping Subproblems & Optimal Substructure', 'Memoization (Top-Down) vs. Tabulation (Bottom-Up)', 'Knapsack Problem', 'Longest Common Subsequence'],
                  duration: '4 weeks',
                  projects: 5
                },
                {
                  title: 'Minimum Spanning Trees',
                  topics: ['Prim\'s Algorithm', 'Kruskal\'s Algorithm', 'Disjoint Set Union (DSU)', 'Cycle Detection'],
                  duration: '2 weeks',
                  projects: 3
                },
                {
                  title: 'Advanced Trees and Structures',
                  topics: ['Tries (Prefix Trees)', 'Fenwick Trees and Segment Trees', 'AVL Trees and Red-Black Tree Concepts', 'Interval Trees'],
                  duration: '4 weeks',
                  projects: 5
                },
                {
                  title: 'Greedy Algorithms and Bit Manipulation',
                  topics: ['Difference between Greedy and DP', 'Activity Selection Problem', 'Bitwise Operators and Tricks', 'Swapping without Temporary Variables'],
                  duration: '2 weeks',
                  projects: 4
                }
              ].map((module: { title: string; topics: string[]; duration: string; projects: number }, index: number) => ( // ✅ Fixed: Added explicit types for map parameter and index
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
                      {module.topics.map((topic: string, idx: number) => ( // ✅ Fixed: Added explicit types for inner map
                        <li key={idx} className="flex items-start text-xs sm:text-sm text-gray-600">
                          <CheckCircle2 className="w-3.5 h-3.5 text-purple-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <span className="text-xs text-gray-500 flex items-center">
                        <Puzzle className="w-3.5 h-3.5 mr-1" />
                        {module.projects} Problems
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

      {/* Learning Timeline & Workflow Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-8 sm:mb-12 md:mb-16 animate-slide-up">
            <Badge className="mb-3 sm:mb-4 bg-blue-100 text-blue-700 border-blue-200 px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base">
              Learning Journey
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6 px-4">
              Your Path to DSA Mastery
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              A structured 6-month journey from fundamentals to advanced implementation.
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-gradient-to-b from-green-400 to-blue-500 rounded-full hidden md:block"></div>
            
            <div className="space-y-12">
              {[
                {
                  title: "Month 1-2: Foundation Building",
                  icon: <BookOpen className="w-6 h-6 text-white" />,
                  color: "from-green-500 to-emerald-600",
                  items: ["Big O Notation", "Arrays & Strings", "Linked Lists", "Basic Recursion"],
                  position: "md:pr-8 md:text-right md:ml-auto md:w-1/2"
                },
                {
                  title: "Month 3: Core Structures",
                  icon: <Layers className="w-6 h-6 text-white" />,
                  color: "from-blue-500 to-cyan-600",
                  items: ["Stacks & Queues", "Hash Tables", "Trees & BST", "Heaps"],
                  position: "md:pl-8 md:text-left md:mr-auto md:w-1/2"
                },
                {
                  title: "Month 4: Algorithm Techniques",
                  icon: <GitMerge className="w-6 h-6 text-white" />,
                  color: "from-purple-500 to-pink-600",
                  items: ["Sorting Algorithms", "Search Algorithms", "Graph Traversal", "Greedy Methods"],
                  position: "md:pr-8 md:text-right md:ml-auto md:w-1/2"
                },
                {
                  title: "Month 5: Advanced Concepts",
                  icon: <Brain className="w-6 h-6 text-white" />,
                  color: "from-amber-500 to-orange-600",
                  items: ["Dynamic Programming", "Divide & Conquer", "Backtracking", "Trie Structures"],
                  position: "md:pl-8 md:text-left md:mr-auto md:w-1/2"
                },
                {
                  title: "Month 6: Mastery & Interview Prep",
                  icon: <Target className="w-6 h-6 text-white" />,
                  color: "from-red-500 to-pink-600",
                  items: ["Mock Interviews", "Problem Patterns", "Time Management", "Company-specific Prep"],
                  position: "md:pr-8 md:text-right md:ml-auto md:w-1/2"
                }
              ].map((phase: { title: string; icon: React.ReactNode; color: string; items: string[]; position: string }, index: number) => ( // ✅ Fixed: Added explicit types for map parameter and index
                <div key={index} className={`flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                  {/* Timeline dot */}
                  <div className="hidden md:flex relative z-10 justify-center items-center w-10 h-10 rounded-full bg-white border-4 border-blue-500 mx-4 flex-shrink-0">
                    <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${phase.color}`}></div>
                  </div>
                  
                  <Card className={`w-full md:w-1/2 bg-white/80 backdrop-blur-sm border-2 border-gray-100 hover:border-blue-200 transition-all duration-300 animate-slide-up ${phase.position}`}>
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${phase.color} flex items-center justify-center shadow-lg`}>
                          {phase.icon}
                        </div>
                        <CardTitle className="text-lg font-bold text-gray-900">{phase.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {phase.items.map((item: string, idx: number) => ( // ✅ Fixed: Added explicit types for inner map
                          <li key={idx} className="flex items-center text-sm text-gray-600">
                            <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mt-4"
                        onClick={() => alert(`Starting ${phase.title}`)} // ✅ Added: Explicit void for onClick handler
                      >
                        Start Phase
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 text-center animate-slide-up">
            <Button 
              size="lg"
              onClick={() => handleDownload('Learning Roadmap PDF')} // ✅ Added: Explicit void for onClick handler
              className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"
            >
              <Download className="mr-2 h-5 w-5" />
              Download Complete Learning Roadmap
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-8 sm:mb-12 md:mb-16 animate-slide-up">
            <Badge className="mb-3 sm:mb-4 bg-amber-100 text-amber-700 border-amber-200 px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base">
              Success Stories
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6 px-4">
              What Our Graduates Say
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Hear from developers who aced their interviews and landed jobs at top-tier tech firms.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="bg-white/80 backdrop-blur-sm border-2 border-gray-100 shadow-xl animate-scale-in">
              <CardContent className="p-8 sm:p-12">
                <Quote className="w-12 h-12 text-amber-500 mb-6" />
                {[
                  {
                    text: "I was struggling with Dynamic Programming, but this course broke down the concepts clearly. I felt completely prepared for the coding rounds at Amazon.",
                    name: "Chloe Lee",
                    role: "Software Engineer, Amazon",
                    avatar: "👩‍💻"
                  },
                  {
                    text: "The focus on Big O notation and efficient solutions was a game-changer. It transformed my approach to problem-solving, leading directly to an offer from Google.",
                    name: "Raj Patel",
                    role: "Senior Developer, Google",
                    avatar: "👨‍💻"
                  },
                  {
                    text: "This is the most comprehensive DSA prep available. The graph theory section was particularly excellent, covering complex topics like flow networks and MSTs in detail.",
                    name: "Elena Petrova",
                    role: "Algorithm Specialist, High-Frequency Trading",
                    avatar: "🧠"
                  }
                ].map((testimonial: { text: string; name: string; role: string; avatar: string }, index: number) => ( // ✅ Fixed: Added explicit types for map parameter and index
                  <div 
                    key={index}
                    className={`animate-fade-in ${activeTestimonial === index ? '' : 'hidden'}`} // ✅ Fixed: Simplified testimonial rendering with class-based toggle (no repetition)
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
                  {[0, 1, 2].map((index: number) => ( // ✅ Fixed: Added explicit type for index
                    <button
                      key={index}
                      onClick={() => setActiveTestimonial(index)} // ✅ Added: Explicit void for onClick handler
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
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-8 sm:mb-12 md:mb-16 animate-slide-up">
            <Badge className="mb-3 sm:mb-4 bg-orange-100 text-orange-700 border-orange-200 px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base">
              Core Concepts
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6 px-4">
              The Essential Tools of Algorithmic Thinking
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              These fundamental concepts are the key to unlocking efficient solutions in any programming language.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {[
              { icon: Zap, title: 'Big O Mastery', desc: 'Analyzing and optimizing time and space complexity.', color: 'from-pink-500 to-rose-600' },
              { icon: Database, title: 'Hashing', desc: 'Understanding HashMaps, collisions, and average O(1) performance.', color: 'from-amber-500 to-orange-600' },
              { icon: GitBranch, title: 'Recursion', desc: 'Mastering call stack, base cases, and advanced divide and conquer.', color: 'from-teal-500 to-cyan-600' },
              { icon: Cpu, title: 'Dynamic Programming', desc: 'Solving complex problems by breaking them into overlapping subproblems.', color: 'from-yellow-500 to-orange-600' },
              { icon: Layers, title: 'Graph Theory', desc: 'Implementing BFS, DFS, and shortest path algorithms (Dijkstra).', color: 'from-green-500 to-emerald-600' },
              { icon: Award, title: 'Tree Structures', desc: 'Working with BSTs, Heaps, AVL trees, and Tries.', color: 'from-red-500 to-pink-600' },
              { icon: Settings, title: 'Pointers & References', desc: 'Manipulating memory references for Linked Lists and Trees.', color: 'from-indigo-500 to-purple-600' },
              { icon: Puzzle, title: 'Greedy Algorithms', desc: 'Making locally optimal choices to find a global optimum solution.', color: 'from-cyan-500 to-blue-600' }
            ].map((concept: { icon: React.ComponentType<any>; title: string; desc: string; color: string }, index: number) => ( // ✅ Fixed: Added explicit types for map parameter and index
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
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-8 sm:mb-12 md:mb-16 animate-slide-up">
            <Badge className="mb-3 sm:mb-4 bg-amber-100 text-amber-700 border-amber-200 px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base">
              Interview Resources
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6 px-4">
              Practice Platforms and Learning Aids
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Access curated video solutions, mock interview environments, and top competitive platforms.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {[
              {
                icon: Video,
                title: 'Curated Video Solutions',
                description: 'Detailed video walkthroughs for over 100 common interview problems across all difficulty levels.',
                items: ['100+ Problem Walkthroughs', 'HD Quality', 'Complexity Analysis Included'],
                buttonText: 'Watch Solutions',
                buttonIcon: Play,
                gradient: 'from-red-500 to-pink-600',
                action: handleWatchVideo
              },
              {
                icon: FileCode,
                title: 'Template Code Library',
                description: 'Ready-to-use boilerplate code for all major data structures in Python, Java, and C++.',
                items: ['Array/Tree/Graph Templates', 'Clean & Tested Code', 'Multiple Language Support'],
                buttonText: 'Browse Templates',
                buttonIcon: Code,
                gradient: 'from-amber-500 to-orange-600',
                action: handleBrowseCode
              },
              {
                icon: Puzzle,
                title: 'Competitive Practice',
                description: 'Direct links to practice problem sets on platforms like LeetCode and HackerRank, organized by module.',
                items: ['600+ Problems', 'Organized Difficulty', 'Targeted Prep'],
                buttonText: 'Start Solving',
                buttonIcon: Target,
                gradient: 'from-green-500 to-emerald-600',
                action: handlePractice
              },
              {
                icon: Rocket,
                title: 'Mock Interview Prep',
                description: 'Simulate the real interview environment with timed challenges and specific problem distribution.',
                items: ['Timed Sessions', 'Peer Matching', 'Feedback Included'],
                buttonText: 'Start Mock Interview',
                buttonIcon: ExternalLink,
                gradient: 'from-purple-500 to-pink-600',
                action: handleViewProjects
              },
              {
                icon: BookMarked,
                title: 'Algorithm Visualizers',
                description: 'Links to interactive tools to see how algorithms work step-by-step (e.g., sorting, graph traversal).',
                items: ['Visual Learning', 'Interactive Steps', 'Deep Understanding'],
                buttonText: 'View Visualizers',
                buttonIcon: BookOpen,
                gradient: 'from-cyan-500 to-blue-600',
                action: handleReadDocs
              },
              {
                icon: Download,
                title: 'DSA Cheat Sheets',
                description: 'Quick reference guides for structure properties, common time complexities, and algorithm choice criteria.',
                items: ['Printable PDFs', 'O(N) Cheatsheet', 'Interview Tips'],
                buttonText: 'Download',
                buttonIcon: Download,
                gradient: 'from-yellow-500 to-orange-600',
                action: () => handleDownload('DSA Cheat Sheets')
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
            }, index: number) => ( // ✅ Fixed: Added explicit types for map parameter and index
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
                    {resource.items.map((item: string, idx: number) => ( // ✅ Fixed: Added explicit types for inner map
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
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-8 sm:mb-12 md:mb-16 animate-slide-up">
            <Badge className="mb-3 sm:mb-4 bg-green-100 text-green-700 border-green-200 px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base">
              Career Paths
            </Badge>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-6 px-4">
              Your Ticket to Top-Tier Tech Jobs
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Mastering DSA is the single most effective way to secure roles at companies known for high compensation and innovation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {[
              {
                title: 'Software Engineer (FAANG)',
                companies: ['Google', 'Meta', 'Amazon', 'Apple', 'Netflix'],
                salary: '$140K - $350K',
                icon: '🚀',
                color: 'border-blue-200 hover:border-blue-400',
                description: 'Excels in system design and complex algorithmic challenge stages.'
              },
              {
                title: 'Algorithm Developer',
                companies: ['Microsoft Research', 'Hedge Funds', 'AI Labs'],
                salary: '$150K - $400K',
                icon: '🧠',
                color: 'border-purple-200 hover:border-purple-400',
                description: 'Focuses purely on designing and optimizing algorithms for performance.'
              },
              {
                title: 'Competitive Programmer',
                companies: ['High-Tech Startups', 'R&D Teams', 'Trading Firms'],
                salary: '$120K - $250K',
                icon: '🏆',
                color: 'border-amber-200 hover:border-amber-400',
                description: 'Applies deep DSA knowledge to time-critical, high-stress problem-solving.'
              },
              {
                title: 'Game Developer',
                companies: ['Unity', 'Epic Games', 'Blizzard'],
                salary: '$90K - $180K',
                icon: '🎮',
                color: 'border-orange-200 hover:border-orange-400',
                description: 'Utilizes graph traversal and optimized structures for pathfinding and game state.'
              },
              {
                title: 'Database Engineer',
                companies: ['Oracle', 'MongoDB', 'PostgreSQL'],
                salary: '$110K - $190K',
                icon: '⚙️',
                color: 'border-yellow-200 hover:border-yellow-400',
                description: 'Implements indexing structures (B-trees, HashMaps) for rapid data access.'
              },
              {
                title: 'Machine Learning Infrastructure',
                companies: ['Data Bricks', 'NVIDIA', 'Scale AI'],
                salary: '$130K - $220K',
                icon: '📡',
                color: 'border-green-200 hover:border-green-400',
                description: 'Optimizes underlying data structures for massive parallel processing of ML models.'
              }
            ].map((career: { title: string; companies: string[]; salary: string; icon: string; color: string; description: string }, index: number) => ( // ✅ Fixed: Added explicit types for map parameter and index
              <Card 
                key={index} 
                className={`group hover:shadow-xl transition-all duration-500 hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-2 ${career.color} animate-slide-up stagger-${index + 1}`}
              >
                <CardHeader>
                  <div className="text-3xl sm:text-4xl md:text-5xl mb-3 sm:mb-4">{career.icon}</div>
                  <CardTitle className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">{career.title}</CardTitle>
                  <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">{career.description}</p>
                  <Badge className="bg-green-100 text-green-700 border-green-200 w-fit text-xs sm:text-sm">                    {career.salary}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 font-semibold">Top Companies:</p>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                                       {career.companies.map((company: string, idx: number) => ( // ✅ Fixed: Added explicit types for inner map
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
                Stop Memorizing, Start Mastering DSA
              </CardTitle>
              <CardDescription className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 px-2">
                Join our proven pathway to mastering competitive coding and interview preparation. Enroll today and secure your spot in big tech.
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
                  variant="outline"                  onClick={() => handleDownload('Free Preview')} // ✅ Added: Explicit void for onClick handler
                  className="w-full sm:w-auto border-2 border-amber-300 text-amber-700 hover:bg-amber-50 backdrop-blur-sm px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg group"
                >
                  Free Trial
                  <Play className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
              <div className="flex flex-wrap justify-center gap-3 sm:gap-6 text-xs sm:text-sm text-amber-700">
                <span className="flex items-center">
                  <CheckCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1" />
                  Interview Success Guarantee
                </span>
                <span className="flex items-center">
                  <CheckCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1" />
                  Lifetime access to updates
                </span>
                <span className="flex items-center">
                  <CheckCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1" />
                  Certificate included                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Share Section (Kept Blue/Social Colors) */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center animate-slide-up">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Sharing is Caring!</h3>
            <p className="text-gray-600 mb-6">Help fellow engineers prepare for their technical interviews.</p>
            <div className="flex justify-center gap-4">
              <Button
                onClick={() => handleShare('twitter')} // ✅ Added: Explicit void for onClick handler
                variant="outline"
                className="border-blue-400 text-blue-600 hover:bg-blue-50 group"
              >
                <Twitter className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Twitter
              </Button>
              <Button
                onClick={() => handleShare('linkedin')} // ✅ Added: Explicit void for onClick handler
                variant="outline"
                className="border-blue-600 text-blue-700 hover:bg-blue-50 group"
              >
                <Linkedin className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                LinkedIn
              </Button>
              <Button
                onClick={() => handleShare('facebook')} // ✅ Added: Explicit void for onClick handler
                variant="outline"
                className="border-blue-500 text-blue-600 hover:bg-blue-50 group"
              >
                <Share2 className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Facebook
              </Button>
            </div>
          </div>
        </div>      </section>

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
              Everything you need to know about preparing for your coding interviews.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                question: "Which programming language should I use for DSA?",
                answer: "The concepts are language-agnostic, but we provide implementations and guidance primarily in Python, Java, and C++ as these are the most common languages requested in interviews."
              },
              {
                question: "Do I need prior coding experience?",
                answer: "Yes, you should be comfortable with basic programming syntax, variables, loops, and functions in at least one language before starting the Big O and Structures modules."
              },
              {
                question: "How long does it take to be interview-ready?",
                answer: "The full curriculum takes approximately 4-6 months with consistent practice (15-20 hours per week). Mastery depends entirely on the volume of problems you solve."
              },
              {
                question: "Is this course enough for FAANG interviews?",
                answer: "Yes. This course covers the depth and breadth of DSA required for intermediate (L3/L4) level interviews. For senior roles (L5+), you would need to combine this with System Design preparation."
              },
              {
                question: "Are there timed mock interviews?",
                answer: "We offer timed mock challenges and peer interview pairing tools to simulate the real-world pressure of a 45-minute coding round."
              }
            ].map((faq: { question: string; answer: string }, index: number) => ( // ✅ Fixed: Added explicit types for map parameter and index
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
              Proven Interview Success
            </h2>
            <p className="text-base sm:text-lg text-gray-600 px-4">
              Metrics showing the impact of structured DSA preparation
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Users, value: '8,000+', label: 'Engineers Trained', color: 'from-amber-500 to-orange-500' },
              { icon: Trophy, value: '95%', label: 'Interview Pass Rate', color: 'from-green-500 to-emerald-500' },
              { icon: Star, value: '4.9/5', label: 'Average Rating', color: 'from-yellow-500 to-orange-500' },
              { icon: Briefcase, value: '81%', label: 'Offers from Big Tech', color: 'from-purple-500 to-pink-500' }
            ].map((stat: { icon: React.ComponentType<any>; value: string; label: string; color: string }, index: number) => ( // ✅ Fixed: Added explicit types for map parameter and index
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

export default DSA_Course;