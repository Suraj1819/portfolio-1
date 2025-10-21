import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight, Code, Mail, Github, Linkedin, Phone, Star, Sparkles,
  Heart, ExternalLink, Menu, X, Calendar, MapPin, Award, Zap,
  Target, Globe, Lightbulb, CheckCircle, Clock, Users,
  Database, Brain, ChevronDown,
  Loader2, Send, Terminal, GraduationCap,
  Facebook,
  Code2,
  Instagram,
  School,
  School2,
  AlertCircle
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { useToast } from "../hooks/use-toast";
import Footer from '../components/Footer';
import axios, { AxiosError } from 'axios';
import type { AxiosResponse, AxiosInstance } from 'axios';

// ==================== TYPE DEFINITIONS ====================
interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface AlertMessage {
  type: 'error' | 'success' | '';
  message: string;
}

interface ContactSuccessData {
  id: string;
  category: string;
  priority: string;
  status: string;
}

interface ContactSuccessResponse {
  success: boolean;
  message: string;
  data?: ContactSuccessData;
}

interface ContactValidationError {
  [key: string]: string;
}

interface ContactErrorResponse {
  message: string;
  data?: ContactValidationError[];
}

interface Skill {
  name: string;
  level: number;
  icon: string;
  description: string;
}

interface SkillCategory {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  skills: Skill[];
}

interface Project {
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  features: string[];
  status: string;
  github: string;
  live: string;
  image: string;
  gradient: string;
}

interface Achievement {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  value: string;
  color: string;
  gradient: string;
}

interface Service {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  features: string[];
  price: string;
  duration: string;
  color: string;
}

interface TimelineItem {
  year: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

interface SkillProgress {
  [key: string]: number;
}

// ==================== API CONFIGURATION ====================
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    console.log('Making request to:', config.url);
    return config;
  },
  (error: AxiosError) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse<ContactSuccessResponse>) => {
    console.log('Response received:', response.data);
    return response;
  },
  (error: AxiosError<ContactErrorResponse>) => {
    console.error('Response error:', error);
    if (!error.response) {
      console.error('Network error or server is down');
    }
    return Promise.reject(error);
  }
);

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
  
  @keyframes scale-in {
    from { transform: scale(0.8); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }
  
  @keyframes bounce-gentle {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes slideIn {
    from { transform: translateX(-100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }

  @keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  
  .animate-float { animation: float 3s ease-in-out infinite; }
  .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
  .animate-scale-in { animation: scale-in 0.5s ease-out; }
  .animate-bounce-gentle { animation: bounce-gentle 2s ease-in-out infinite; }
  .animate-fade-in { animation: fadeIn 0.3s ease-out; }
  .animate-slide-in { animation: slideIn 0.5s ease-out; }
  .animate-slide-up { animation: slideUp 0.5s ease-out; }

  /* Mobile Responsive Utilities */
  @media (max-width: 640px) {
    .mobile-text-xs { font-size: 0.75rem; }
    .mobile-text-sm { font-size: 0.875rem; }
    .mobile-text-base { font-size: 1rem; }
    .mobile-text-lg { font-size: 1.125rem; }
    .mobile-text-xl { font-size: 1.25rem; }
    .mobile-text-2xl { font-size: 1.5rem; }
    .mobile-text-3xl { font-size: 1.875rem; }
    
    .mobile-p-2 { padding: 0.5rem; }
    .mobile-p-4 { padding: 1rem; }
    .mobile-p-6 { padding: 1.5rem; }
    
    .mobile-m-2 { margin: 0.5rem; }
    .mobile-m-4 { margin: 1rem; }
    
    .mobile-gap-2 { gap: 0.5rem; }
    .mobile-gap-4 { gap: 1rem; }
  }

  /* Smooth Scrolling */
  html {
    scroll-behavior: smooth;
  }

  /* Hide scrollbar for Chrome, Safari and Opera */
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

// ==================== LOADING SCREEN COMPONENT ====================
const PremiumLoadingScreen: React.FC = () => {
  const [progress, setProgress] = useState<number>(0);
  const [loadingMessage, setLoadingMessage] = useState<number>(0);

  const loadingMessages: string[] = [
    "Initializing components...",
    "Loading awesome content...",
    "Preparing amazing experience...",
    "Almost ready...",
    "Finalizing details...",
    "Thanks for waiting..."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    const messageInterval = setInterval(() => {
      setLoadingMessage(prev => (prev + 1) % loadingMessages.length);
    }, 400);

    return () => {
      clearInterval(interval);
      clearInterval(messageInterval);
    };
  }, [loadingMessages.length]);

  return (
    <>
      <style>{customStyles}</style>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 px-4">
        <div className="text-center w-full max-w-md">
          {/* Animated Logo Container */}
          <div className="flex justify-center items-center space-x-4 sm:space-x-8 mb-8 sm:mb-12">
            {/* Left Side: Spinning Circle */}
            <div className="relative">
              <div className="w-24 h-24 sm:w-32 sm:h-32 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto" style={{ animationDuration: '2s' }}></div>
              <div className="absolute inset-4 sm:inset-6 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-2xl">
                <Code className="h-8 w-8 sm:h-10 sm:w-10 text-white animate-pulse" />
              </div>
            </div>

            {/* Right Side: Spinning Circle with Image */}
            <div className="relative">
              <div className="w-24 h-24 sm:w-32 sm:h-32 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto" style={{ animationDuration: '2s', animationDirection: 'reverse' }}></div>
              <div className="absolute inset-4 sm:inset-6 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-2xl overflow-hidden">
                <img 
                  src="https://picsum.photos/200/300"
                  alt="Loading Icon"
                  className="h-12 w-12 sm:h-16 sm:w-16 object-cover rounded-full animate-pulse"
                />
              </div>
            </div>
          </div>

          {/* Loading Text */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 sm:mb-4 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            Loading Portfolio
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 max-w-md mx-auto min-h-[24px] px-4">
            {loadingMessages[loadingMessage]}
          </p>

          {/* Progress Bar */}
          <div className="w-full sm:w-64 mx-auto mb-6 sm:mb-8 px-4">
            <div className="flex justify-between text-xs sm:text-sm text-gray-600 mb-2">
              <span>Loading</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-amber-500 to-orange-500 h-2 sm:h-3 rounded-full transition-all duration-300 ease-out relative"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Loading Dots */}
          <div className="flex justify-center space-x-2 sm:space-x-3">
            {[0, 0.2, 0.4].map((delay, i) => (
              <div
                key={i}
                className="w-2 h-2 sm:w-3 sm:h-3 bg-amber-500 rounded-full animate-bounce"
                style={{ animationDelay: `${delay}s` }}
              ></div>
            ))}
          </div>

          {/* Loading Tips */}
          <div className="mt-8 sm:mt-12 max-w-md mx-auto px-4">
            <div className="bg-white/80 backdrop-blur-sm p-3 sm:p-4 rounded-lg shadow-sm border border-amber-100">
              <p className="text-xs sm:text-sm text-gray-600 italic">
                "Did you know? This portfolio is built with React, TypeScript, and Tailwind CSS!"
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// ==================== HERO SECTION COMPONENT ====================
const HeroSection: React.FC = () => {
  return (
    <section id="home" className="relative pt-20 sm:pt-24 pb-12 sm:pb-16 px-4 sm:px-6 overflow-hidden min-h-screen flex items-center">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-48 sm:w-72 h-48 sm:h-72 bg-amber-300/20 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-20 sm:top-40 right-5 sm:right-10 w-64 sm:w-96 h-64 sm:h-96 bg-orange-300/20 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-10 sm:bottom-20 left-1/4 sm:left-1/3 w-56 sm:w-80 h-56 sm:h-80 bg-yellow-300/20 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Floating Elements - Hidden on mobile for performance */}
      <div className="absolute inset-0 pointer-events-none hidden sm:block">
        <div className="absolute top-32 left-20 animate-float" style={{animationDelay: '0.3s'}}>
          <div className="w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-r from-amber-400 to-orange-400 rounded-lg flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow">
            <Code className="h-6 sm:h-8 w-6 sm:w-8 text-white" />
          </div>
        </div>
        <div className="absolute top-48 right-32 animate-float" style={{animationDelay: '0.7s'}}>
          <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow">
            <Sparkles className="h-5 sm:h-6 w-5 sm:w-6 text-white" />
          </div>
        </div>
        <div className="absolute bottom-40 left-16 animate-float" style={{animationDelay: '1s'}}>
          <div className="w-12 sm:w-14 h-12 sm:h-14 bg-gradient-to-r from-yellow-400 to-amber-400 rounded-lg rotate-12 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow">
            <Star className="h-6 sm:h-7 w-6 sm:w-7 text-white" />
          </div>
        </div>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-12">
          {/* Left Content */}
          <div className="w-full lg:w-1/2 space-y-6 sm:space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm border border-amber-200 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm shadow-sm">
              <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-gray-700">Available for opportunities</span>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight tracking-tight">
                <span className="block text-gray-800 mb-1 sm:mb-2">Hello,</span>
                <span className="block bg-gradient-to-r from-amber-600 via-orange-600 to-red-500 bg-clip-text text-transparent">
                  I'm SuraJz
                </span>
              </h1>

              <div className="space-y-3 sm:space-y-4">
                <p className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800">
                  Aspiring Software Engineer
                </p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-3">
                  {['C++', 'Python', 'JavaScript', 'DSA', 'MERN', 'Tailwindcss'].map((skill, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-amber-100 text-red-700 border-amber-200 px-2 sm:px-3 py-0.5 sm:py-1 text-xs sm:text-sm hover:bg-amber-200 transition-all hover:-translate-y-1 hover:cursor-pointer"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <p className="text-sm sm:text-base lg:text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                I'm a <span className='bg-amber-200 rounded-lg px-1 sm:px-2 text-red-600 font-semibold text-xs sm:text-sm lg:text-base'>3<sup>rd</sup> Year B.Tech</span> student passionate about coding, problem-solving, and full-stack development. Skilled in
                <span className='text-red-600 font-semibold bg-amber-200 px-1 sm:px-2 rounded-lg ml-1 mr-1 text-xs sm:text-sm lg:text-base'>MERN</span>,
                <span className='text-red-600 font-semibold bg-amber-200 px-1 sm:px-2 rounded-md ml-1 mr-1 text-xs sm:text-sm lg:text-base'>TailwindCss</span>,
                <span className='text-red-600 font-semibold bg-amber-200 px-1 sm:px-2 rounded-md text-xs sm:text-sm lg:text-base'>PostgreSQL</span>,
                <span className='text-red-600 font-semibold bg-amber-200 px-1 sm:px-2 rounded-md text-xs sm:text-sm lg:text-base'>C++</span>, and
                <span className='text-red-600 font-semibold bg-amber-200 px-1 sm:px-2 rounded-md text-xs sm:text-sm lg:text-base'>Python</span>.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-sm sm:text-base"
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <span>Explore My Work</span>
                <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-amber-300 text-gray-700 hover:bg-amber-50 backdrop-blur-sm bg-white/50 hover:border-amber-400 transition-all duration-300 hover:scale-105 text-sm sm:text-base"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Let's Connect
                <ExternalLink className='ml-2 h-3 w-3 sm:h-4 sm:w-4'/>
              </Button>
            </div>

            <div className="flex justify-center lg:justify-start space-x-3 sm:space-x-6">
              {[
                { href: "https://github.com/Suraj1819", icon: Github },
                { href: "https://www.linkedin.com/in/suraj-kumar-72847b30a/", icon: Linkedin },
                { href: "https://leetcode.com/u/Suraj_1819/", icon: Code },
                { href: "https://www.geeksforgeeks.org/user/surajkuma16ts/", icon: Code2 },
                { href: "https://github.com/Suraj1819", icon: Facebook },
                { href: "https://x.com/SuraJzRt", icon: X },
                { href: "https://www.instagram.com/risu2948/", icon: Instagram },
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-amber-700 transition-all duration-300 hover:scale-110 p-1.5 sm:p-2 rounded-full hover:bg-amber-200"
                >
                  <social.icon className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
                </a>
              ))}
            </div>
          </div>

          {/* Right Content - Profile Image */}
          <div className="w-full lg:w-1/2 flex justify-center mt-8 lg:mt-0">
            <div className="relative animate-scale-in">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 rounded-full blur-xl opacity-30 animate-pulse-slow"></div>
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-gradient-to-br from-amber-400 via-orange-400 to-red-400 rounded-full flex items-center justify-center shadow-2xl hover:shadow-3xl transition-shadow duration-500">
                <div className="w-56 h-56 sm:w-72 sm:h-72 lg:w-88 lg:h-88 bg-white rounded-full flex items-center justify-center border border-amber-200 overflow-hidden">
                  <img
                    src="https://wallpapercave.com/wp/wp6690023.jpg"
                    alt="Profile Picture"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="absolute -top-2 sm:-top-4 -right-2 sm:-right-4 w-14 h-14 sm:w-20 sm:h-20 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center animate-bounce-gentle shadow-lg">
                <span className="text-white font-bold text-xs sm:text-sm lg:text-md">2027</span>
              </div>
              <div className="absolute top-1/2 left-1/2 w-[120%] h-[120%] -translate-x-1/2 -translate-y-1/2 hidden sm:block">
                <div className="relative w-full h-full animate-spin" style={{ animationDuration: '20s' }}>
                  <div className="absolute top-0 left-1/2 w-3 h-3 sm:w-4 sm:h-4 bg-amber-400 rounded-full -translate-x-1/2 -translate-y-1/2 shadow-lg"></div>
                  <div className="absolute bottom-0 left-1/2 w-3 h-3 sm:w-4 sm:h-4 bg-orange-400 rounded-full -translate-x-1/2 translate-y-1/2 shadow-lg"></div>
                  <div className="absolute left-0 top-1/2 w-3 h-3 sm:w-4 sm:h-4 bg-red-400 rounded-full -translate-x-1/2 -translate-y-1/2 shadow-lg"></div>
                  <div className="absolute right-0 top-1/2 w-3 h-3 sm:w-4 sm:h-4 bg-yellow-400 rounded-full translate-x-1/2 -translate-y-1/2 shadow-lg"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator - Hidden on mobile */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-gentle hidden sm:block">
          <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-amber-400 rounded-full flex justify-center">
            <div className="w-1 h-2 sm:h-3 bg-amber-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ==================== ABOUT SECTION COMPONENT ====================
const AboutSection: React.FC = () => {
  const timeline: TimelineItem[] = [
    {
      year: "2020",
      title: "Started Matriculation",
      description: "Began Matriculation at SRT School, Rautania",
      icon: School,
      color: "from-amber-400 to-orange-600"
    },
    {
      year: "2022",
      title: "Started intermediate",
      description: "Began intermediate at SRT School, Rautania",
      icon: School2,
      color: "from-red-400 to-red-500"
    },
    {
      year: "2023",
      title: "Started B.Tech Journey",
      description: "Began Computer Science and Engineering at Government Engineering College, Vaishali",
      icon: GraduationCap,
      color: "from-blue-400 to-cyan-500"
    },
    {
      year: "2024",
      title: "Programming Mastery",
      description: "Mastered C++, Python, and C programming languages with strong DSA foundation",
      icon: Code,
      color: "from-green-400 to-emerald-500"
    },
    {
      year: "2025",
      title: "Full-Stack Development",
      description: "Expanding expertise into MERN stack and modern web development",
      icon: Zap,
      color: "from-orange-400 to-red-500"
    }
  ];

  return (
    <section id="about" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-white/30 backdrop-blur-sm">
      <div className="container mx-auto">
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">About Me</h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Get to know me better and my journey in tech
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
          <div className="space-y-6 sm:space-y-8">
            <h3 className="text-xl sm:text-2xl font-semibold text-amber-600">My Journey</h3>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              I'm Suraj Kumar, a passionate 3rd-year Computer Science and Engineering student at
              Government Engineering College, Vaishali. Currently working towards my graduation in 2027,
              I'm building a strong foundation in programming and problem-solving.
            </p>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              My expertise lies in C++, Python, and JavaScript, with a solid understanding of
              Data Structures and Algorithms. Beyond coding, I enjoy helping others learn.
            </p>

            <div className="space-y-3 sm:space-y-4">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <Badge className="bg-amber-100 text-amber-700 text-xs sm:text-sm">Education</Badge>
                <Badge className="bg-green-100 text-green-700 text-xs sm:text-sm">Continue</Badge>
                <span className="text-xs sm:text-sm text-gray-600 hover:underline">B.Tech CSE, GEC Vaishali (2023-2027)</span>
              </div>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <Badge className="bg-green-100 text-green-700 text-xs sm:text-sm">Focus</Badge>
                <span className="text-xs sm:text-sm text-gray-600">Software Development & Problem Solving</span>
              </div>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <Badge className="bg-orange-100 text-orange-700 text-xs sm:text-sm">Passion</Badge>
                <span className="text-xs sm:text-sm text-gray-600">Coding and Development</span>
              </div>
            </div>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <h3 className="text-xl sm:text-2xl font-semibold text-amber-600">My Timeline</h3>
            <div className="space-y-4 sm:space-y-6">
              {timeline.map((item, index) => (
                <div key={index} className="flex items-start gap-3 sm:gap-4">
                  <div className="flex-shrink-0 w-16 sm:w-20 lg:w-24 text-right pr-2 sm:pr-4">
                    <Badge variant="secondary" className={`bg-gradient-to-r ${item.color} text-white px-2 sm:px-3 lg:px-4 py-1 sm:py-2 text-xs sm:text-sm lg:text-lg font-bold border-0 shadow-lg`}>
                      {item.year}
                    </Badge>
                  </div>
                  <div className="flex-shrink-0 relative">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${item.color} rounded-full flex items-center justify-center mr-2 sm:mr-4 shadow-lg`}>
                      <item.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>
                    {index < timeline.length - 1 && (
                      <div className="absolute w-0.5 sm:w-1 h-16 sm:h-20 bg-gradient-to-b from-amber-300 to-orange-300 left-1/2 transform -translate-x-1/2 top-10 sm:top-12"></div>
                    )}
                  </div>
                  <div className="flex-grow bg-white/70 backdrop-blur-sm p-3 sm:p-4 rounded-xl border border-amber-200 hover:shadow-lg transition-all duration-300">
                    <h4 className="font-semibold text-gray-800 mb-1 text-sm sm:text-base">{item.title}</h4>
                    <p className="text-gray-600 text-xs sm:text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mt-12 sm:mt-16 lg:mt-20">
          <h3 className="text-xl sm:text-2xl font-semibold text-amber-600 text-center mb-8 sm:mb-10 lg:mb-12">Core Values</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {[
              { title: "Curiosity", desc: "Always eager to learn new technologies", icon: Lightbulb, color: "text-amber-600" },
              { title: "Consistency", desc: "Dedicated to continuous improvement", icon: Clock, color: "text-orange-600" },
              { title: "Dedication", desc: "Committed to excellence", icon: Target, color: "text-yellow-600" },
              { title: "Teaching", desc: "Love sharing knowledge", icon: Users, color: "text-red-600" },
            ].map((value, index) => (
              <Card key={index} className="bg-white/70 backdrop-blur-sm border border-amber-200 hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardContent className="p-4 sm:p-6 text-center">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${value.color.replace('text-', 'from-')}-100 ${value.color.replace('text-', 'to-')}-200 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4`}>
                    <value.icon className={`h-5 w-5 sm:h-6 sm:w-6 ${value.color}`} />
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-1 sm:mb-2 text-sm sm:text-base">{value.title}</h4>
                  <p className="text-gray-600 text-xs sm:text-sm">{value.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ==================== SKILLS SECTION COMPONENT ====================
const SkillsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('Programming');
  const [animateSkills, setAnimateSkills] = useState<boolean>(true);
  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);

  const skillsData: SkillCategory[] = [
    {
      name: 'Programming',
      icon: Code,
      color: 'from-blue-400 to-cyan-500',
      skills: [
        { name: 'C++', level: 90, icon: '💻', description: 'Advanced proficiency with STL and OOP' },
        { name: 'Python', level: 70, icon: '🐍', description: 'Data analysis and automation scripts' },
        { name: 'JavaScript', level: 85, icon: '⚡', description: 'ES6+, async programming, DOM manipulation' },
        { name: 'TypeScript', level: 80, icon: '📜', description: 'Type safety and interface design' },
      ]
    },
    {
      name: 'Web Development',
      icon: Globe,
      color: 'from-purple-400 to-violet-500',
      skills: [
        { name: 'React.js', level: 85, icon: '⚛️', description: 'Hooks, Context API, Performance optimization' },
        { name: 'Next.js', level: 80, icon: '🔗', description: 'SSR, SSG, API routes' },
        { name: 'Node.js', level: 78, icon: '🟢', description: 'RESTful APIs, middleware, authentication' },
        { name: 'Express.js', level: 75, icon: '🚀', description: 'Routing, middleware, template engines' },
        { name: 'Tailwind CSS', level: 88, icon: '🎨', description: 'Responsive design, custom components' },
      ]
    },
    {
      name: 'Database',
      icon: Database,
      color: 'from-green-400 to-emerald-500',
      skills: [
        { name: 'MongoDB', level: 80, icon: '🍃', description: 'NoSQL, aggregation pipelines, indexing' },
        { name: 'PostgreSQL', level: 60, icon: '🐘', description: 'Complex queries, transactions, optimization' },
        { name: 'MySQL', level: 10, icon: '📊', description: 'Relational design, joins, stored procedures' },
      ]
    },
    {
      name: 'DevOps & Tools',
      icon: Terminal,
      color: 'from-red-400 to-orange-500',
      skills: [
        { name: 'Git/GitHub', level: 90, icon: '🐙', description: 'Version control, branching strategies, CI/CD' },
      ]
    },
    {
      name: 'Core CS',
      icon: Brain,
      color: 'from-amber-400 to-yellow-500',
      skills: [
        { name: 'Data Structures', level: 95, icon: '🏗️', description: 'Arrays, trees, graphs, hash tables' },
        { name: 'Algorithms', level: 92, icon: '🧮', description: 'Sorting, searching, dynamic programming' },
        { name: 'OOP', level: 88, icon: '🔄', description: 'Encapsulation, inheritance, polymorphism' },
        { name: 'OS', level: 80, icon: '🖥️', description: 'Process management, memory, file systems' },
      ]
    },
    {
      name: 'Other Skills',
      icon: Star,
      color: 'from-pink-400 to-rose-500',
      skills: [
        { name: 'Competitive Programming', level: 90, icon: '🏆', description: 'Codeforces, LeetCode contests' },
        { name: 'Problem Solving', level: 92, icon: '🧠', description: 'Analytical thinking, optimization' },
        { name: 'Mentoring', level: 88, icon: '🎓', description: 'Teaching, code reviews, guidance' },
        { name: 'Technical Writing', level: 80, icon: '✍️', description: 'Documentation, blogs, tutorials' },
      ]
    }
  ];

  const [skillProgress, setSkillProgress] = useState<SkillProgress>({});

  // Initialize progress values
  useEffect(() => {
    const initialProgress: SkillProgress = {};
    skillsData.forEach(category => {
      category.skills.forEach(skill => {
        initialProgress[`${category.name}-${skill.name}`] = isInitialLoad ? skill.level : 0;
      });
    });
    setSkillProgress(initialProgress);
    
    if (isInitialLoad) {
      setIsInitialLoad(false);
      setTimeout(() => {
        const resetProgress: SkillProgress = {};
        skillsData.forEach(category => {
          category.skills.forEach(_skill => {
            // Unused variable prefixed with underscore
          });
        });
        setSkillProgress(resetProgress);
        
        setTimeout(() => {
          const animatingProgress: SkillProgress = {};
          skillsData.forEach(category => {
            category.skills.forEach(skill => {
              if (category.name === activeCategory) {
                animatingProgress[`${category.name}-${skill.name}`] = skill.level;
              } else {
                animatingProgress[`${category.name}-${skill.name}`] = 0;
              }
            });
          });
          setSkillProgress(animatingProgress);
        }, 100);
      }, 500);
    }
  }, []);

  // Animate progress when category changes
  useEffect(() => {
    if (!animateSkills || isInitialLoad) return;

    const timer = setTimeout(() => {
      const newProgress = { ...skillProgress };
      
      skillsData.forEach(category => {
        category.skills.forEach(_skill => {
          // Unused variable prefixed with underscore
        });
      });
      setSkillProgress(newProgress);

      setTimeout(() => {
        const activeCategoryData = skillsData.find(cat => cat.name === activeCategory);
        
        if (activeCategoryData) {
          activeCategoryData.skills.forEach((skill, index) => {
            setTimeout(() => {
              setSkillProgress(prev => ({
                ...prev,
                [`${activeCategory}-${skill.name}`]: skill.level
              }));
            }, index * 150);
          });
        }
      }, 100);
    }, 100);

    return () => clearTimeout(timer);
  }, [activeCategory, animateSkills, isInitialLoad, skillProgress, skillsData]);

  const handleCategoryClick = (categoryName: string): void => {
    if (categoryName === activeCategory) return;
    
    setActiveCategory(categoryName);
    setAnimateSkills(false);
    
    setTimeout(() => setAnimateSkills(true), 50);
  };

  const getProgressBarColor = (level: number): string => {
    if (level >= 90) return 'from-green-400 to-emerald-500';
    if (level >= 80) return 'from-blue-400 to-cyan-500';
    if (level >= 70) return 'from-amber-400 to-orange-500';
    return 'from-red-400 to-pink-500';
  };

  return (
    <section id="skills" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
      <style>{customStyles}</style>
      <div className="container mx-auto">
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">My Skills</h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Technologies and expertise I've developed through continuous learning and practice
          </p>
        </div>

        {/* Skill Category Selector */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 lg:gap-4 mb-8 sm:mb-10 lg:mb-12">
          {skillsData.map((category) => (
            <Button
              key={category.name}
              onClick={() => handleCategoryClick(category.name)}
              className={`px-3 sm:px-4 lg:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 flex items-center space-x-1 sm:space-x-2 ${
                activeCategory === category.name
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg transform scale-105'
                  : 'bg-white/70 text-gray-700 hover:bg-amber-50 hover:shadow-md hover:scale-105'
              }`}
            >
              <category.icon className="h-3 w-3 sm:h-4 sm:w-4" />
              <span>{category.name}</span>
            </Button>
          ))}
        </div>

        {/* Skills Display */}
        <div className="grid grid-cols-1 gap-6 sm:gap-8">
          {skillsData
            .filter(category => category.name === activeCategory)
            .map((category) => (
              <div
                key={category.name}
                className="bg-white/70 backdrop-blur-sm rounded-2xl border border-amber-200 overflow-hidden hover:shadow-xl transition-all duration-300 w-full"
              >
                <div className={`p-4 sm:p-6 bg-gradient-to-r ${category.color} text-white relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="relative flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <category.icon className="h-6 w-6 sm:h-8 sm:w-8" />
                      <h3 className="text-xl sm:text-2xl font-bold">{category.name}</h3>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs sm:text-sm opacity-90">Skills</span>
                      <Badge className="bg-white/20 text-white border-white/30 text-xs sm:text-sm">
                        {category.skills.length}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                  {category.skills.map((skill, index) => {
                    const progressKey: string = `${category.name}-${skill.name}`;
                    const currentProgress = skillProgress[progressKey] || 0;
                    
                    return (
                      <div key={index} className="space-y-2 sm:space-y-3 p-3 sm:p-4 rounded-lg bg-white/50 hover:bg-white/70 transition-colors">
                        <div className="flex justify-between items-start">
                          <div className="flex items-start space-x-2 sm:space-x-3">
                            <span className="text-xl sm:text-2xl">{skill.icon}</span>
                            <div>
                              <span className="font-medium text-gray-800 text-sm sm:text-base">{skill.name}</span>
                              <p className="text-xs text-gray-500 mt-0.5 sm:mt-1">{skill.description}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="text-base sm:text-lg font-bold text-amber-600">
                              {Math.round(currentProgress)}%
                            </span>
                            <div className="text-[10px] sm:text-xs text-gray-500">Proficiency</div>
                          </div>
                        </div>
                        <div className="relative h-3 sm:h-4 bg-gray-100 rounded-full overflow-hidden shadow-inner">
                          <div
                            className={`absolute top-0 left-0 h-full rounded-full bg-gradient-to-r ${getProgressBarColor(skill.level)} transition-all duration-1000 ease-out relative shadow-sm`}
                            style={{ 
                              width: `${currentProgress}%`,
                              transitionDelay: `${index * 150}ms`
                            }}
                          >
                            <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                          </div>
                        </div>
                        <div className="flex justify-between text-[10px] sm:text-xs text-gray-400">
                          <span>Beginner</span>
                          <span className="hidden sm:inline">Intermediate</span>
                          <span>Advanced</span>
                          <span className="hidden sm:inline">Expert</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
        </div>

        {/* Skills Overview */}
        <div className="mt-10 sm:mt-12 lg:mt-16">
          <h3 className="text-xl sm:text-2xl font-semibold text-amber-600 mb-6 sm:mb-8 text-center">Explore Other Skills</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {skillsData
              .filter(category => category.name !== activeCategory)
              .map((category) => (
                <div
                  key={category.name}
                  className="bg-white/70 backdrop-blur-sm p-4 sm:p-6 rounded-xl border border-amber-200 hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer group"
                  onClick={() => handleCategoryClick(category.name)}
                >
                  <div className="flex items-center justify-between mb-3 sm:mb-4">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <category.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 text-sm sm:text-base">{category.name}</h3>
                        <p className="text-[10px] sm:text-xs text-gray-500">{category.skills.length} skills</p>
                      </div>
                    </div>
                    <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400 group-hover:text-amber-600 transition-colors" />
                  </div>
                  <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                    {category.skills.slice(0, 4).map((skill, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-1 sm:space-x-2 bg-amber-50/50 p-1.5 sm:p-2 rounded-lg hover:bg-amber-100 transition-colors"
                      >
                        <span className="text-xs sm:text-sm">{skill.icon}</span>
                        <span className="text-[10px] sm:text-xs font-medium text-gray-700 truncate">{skill.name}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-amber-100">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] sm:text-xs text-gray-500">Average proficiency</span>
                      <span className="text-[10px] sm:text-xs font-bold text-amber-600">
                        {Math.round(category.skills.reduce((acc, s) => acc + s.level, 0) / category.skills.length)}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Skill Statistics */}
        <div className="mt-10 sm:mt-12 lg:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200 transition-all hover:scale-105 duration-300 hover:cursor-pointer">
            <CardContent className="p-4 sm:p-6 text-center">
              <div className="text-2xl sm:text-3xl font-bold text-amber-600 mb-1 sm:mb-2">
                {skillsData.reduce((acc, cat) => acc + cat.skills.length, 0)}
              </div>
              <p className="text-xs sm:text-sm text-gray-600">Total Skills</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200 transition-all hover:scale-105 duration-300 hover:cursor-pointer">
            <CardContent className="p-4 sm:p-6 text-center">
              <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1 sm:mb-2">
                {skillsData.length}
              </div>
              <p className="text-xs sm:text-sm text-gray-600">Skill Categories</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 transition-all hover:scale-105 duration-300 hover:cursor-pointer">
            <CardContent className="p-4 sm:p-6 text-center">
              <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-1 sm:mb-2">
                {Math.round(skillsData.reduce((acc, cat) => 
                  acc + cat.skills.reduce((sacc, skill) => sacc + skill.level, 0) / cat.skills.length, 0
                ) / skillsData.length)}%
              </div>
              <p className="text-xs sm:text-sm text-gray-600">Average Proficiency</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

// ==================== SERVICES SECTION COMPONENT ====================
const ServicesSection: React.FC = () => {
  const services: Service[] = [
    {
      icon: Code,
      title: "Programming Tutoring",
      description: "Learn C++, Python, and JavaScript from basics to advanced concepts with personalized sessions",
      features: ["Fundamentals of Programming", "OOP Concepts", "Debugging Techniques", "Project Guidance"],
      price: "₹500/hr",
      duration: "1-2 hours/session",
      color: "from-amber-500 to-orange-600"
    },
    {
      icon: Target,
      title: "DSA Mentoring",
      description: "Master Data Structures and Algorithms with structured learning and practice",
      features: ["Arrays & Linked Lists", "Sorting & Searching", "Dynamic Programming", "Problem Solving"],
      price: "₹600/hr",
      duration: "2 hours/session",
      color: "from-blue-500 to-purple-600"
    },
    {
      icon: Lightbulb,
      title: "Logic Building",
      description: "Develop strong logical thinking and problem-solving approaches for beginners",
      features: ["Computational Thinking", "Algorithm Design", "Pattern Recognition", "Pseudocode"],
      price: "₹400/hr",
      duration: "1 hour/session",
      color: "from-green-500 to-emerald-600"
    }
  ];

  return (
    <section id="services" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-white/50 backdrop-blur-sm">
      <div className="container mx-auto">
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">Services</h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            How I can help you achieve your programming goals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="bg-white/70 backdrop-blur-sm border border-amber-200 hover:border-amber-400 transition-all duration-300 hover:scale-105 hover:shadow-lg group"
            >
              <CardHeader className="text-center pb-3 sm:pb-4">
                <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r ${service.color} rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform`}>
                  <service.icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                </div>
                <CardTitle className="text-lg sm:text-xl group-hover:text-amber-600 transition-colors">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4">
                <CardDescription className="text-gray-600 text-center leading-relaxed text-xs sm:text-sm">
                  {service.description}
                </CardDescription>
                <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-600">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center space-x-2">
                      <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-green-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="pt-3 sm:pt-4 border-t border-amber-200">
                  <div className="flex justify-between items-center mb-2 sm:mb-3">
                    <span className="text-base sm:text-lg font-bold text-amber-600">{service.price}</span>
                    <span className="text-xs sm:text-sm text-gray-500">{service.duration}</span>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xs sm:text-sm">
                    Book Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

// ==================== PROJECTS SECTION COMPONENT ====================
const ProjectsSection: React.FC = () => {
  const projects: Project[] = [
    {
      title: "Calculator App",
      description: "A functional calculator application built using Python. Performs basic arithmetic operations with a clean user interface.",
      longDescription: "A comprehensive calculator application with advanced mathematical operations, memory functions, and a clean, intuitive interface. Built with Python and Tkinter, this project demonstrates my understanding of GUI development and mathematical operations in programming.",
      technologies: ["Python", "Tkinter", "Math Logic", "UI Design"],
      features: ["Basic Arithmetic", "Memory Functions", "History", "Keyboard Support"],
      status: "Completed",
      github: "https://github.com/Suraj1819/SimpleCalculator",
      live: "#",
      image: "https://wallpapercave.com/wp/wp15709336.jpg",
      gradient: "from-amber-400 to-orange-600"
    },
    {
      title: "Portfolio Website",
      description: "Modern responsive portfolio built with React and Tailwind CSS",
      longDescription: "A stunning portfolio website showcasing projects, skills, and professional experience with smooth animations and modern design. This project demonstrates my expertise in React, TypeScript, and responsive design principles.",
      technologies: ["React", "Tailwind CSS", "TypeScript", "Responsive Design"],
      features: ["Responsive Design", "Smooth Animations", "Contact Form", "Project Gallery"],
      status: "Completed",
      github: "https://github.com/Suraj1819",
      live: "#",
      image: "https://via.placeholder.com/400x250",
      gradient: "from-blue-400 to-purple-600"
    },
    {
      title: "E-commerce Platform",
      description: "Full-stack e-commerce solution with product management and payment integration",
      longDescription: "A complete e-commerce platform with user authentication, product catalog, shopping cart, and payment processing. Built with the MERN stack, this project showcases my full-stack development skills and understanding of modern web applications.",
      technologies: ["MongoDB", "Express", "React", "Node.js", "Stripe API"],
      features: ["User Authentication", "Product Management", "Shopping Cart", "Payment Processing"],
      status: "In Progress",
      github: "#",
      live: "#",
      image: "https://via.placeholder.com/400x250",
      gradient: "from-green-400 to-emerald-600"
    }
  ];

  return (
    <section id="projects" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
      <div className="container mx-auto">
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">My Projects</h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Showcasing my work and technical skills through real-world projects
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="bg-white/70 backdrop-blur-sm border border-amber-200 overflow-hidden hover:border-amber-400 transition-all duration-300 hover:scale-105 hover:shadow-lg group"
            >
              <div className={`h-32 sm:h-40 lg:h-48 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                  <Badge className={`bg-white/20 text-white border-white/30 text-xs sm:text-sm ${
                    project.status === "Completed" ? "bg-green-500/20 border-green-300" : "bg-yellow-500/20 border-yellow-300"
                  }`}>
                    {project.status}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-4 sm:p-6">
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <CardTitle className="text-lg sm:text-xl mb-1 sm:mb-2 group-hover:text-amber-600 transition-colors">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="text-gray-600 leading-relaxed text-xs sm:text-sm">
                      {project.description}
                    </CardDescription>
                  </div>

                  <div className="space-y-2 sm:space-y-3">
                    <div>
                      <h4 className="font-semibold text-gray-800 text-xs sm:text-sm mb-1 sm:mb-2">Key Features:</h4>
                      <div className="grid grid-cols-1 gap-0.5 sm:gap-1">
                        {project.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center space-x-1.5 sm:space-x-2">
                            <Star className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-amber-500 flex-shrink-0" />
                            <span className="text-xs sm:text-sm text-gray-600">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="outline" className="border-amber-200 text-amber-700 text-[10px] sm:text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-amber-200">
                    <Button size="sm" className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white flex-1 text-xs sm:text-sm">
                      <ExternalLink className="mr-1.5 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                      Live Demo
                    </Button>
                    <Button size="sm" variant="outline" className="border-amber-300 text-gray-700 hover:bg-amber-50">
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="h-3 w-3 sm:h-4 sm:w-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

// ==================== ACHIEVEMENTS SECTION COMPONENT ====================
const AchievementsSection: React.FC = () => {
  const achievements: Achievement[] = [
    {
      icon: Award,
      title: "Projects Completed",
      description: "Developed various projects across different technologies",
      value: "10+",
      color: "text-green-600",
      gradient: "from-green-400 to-emerald-500"
    },
    {
      icon: Zap,
      title: "Problems Solved",
      description: "Algorithmic problems solved on various platforms",
      value: "300+",
      color: "text-purple-600",
      gradient: "from-purple-400 to-violet-500"
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-white/50 backdrop-blur-sm">
      <div className="container mx-auto">
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">Achievements</h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Milestones and recognition in my programming journey
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {achievements.map((achievement, index) => (
            <Card
              key={index}
              className="bg-white/70 backdrop-blur-sm border border-amber-200 hover:shadow-xl transition-all duration-300 hover:scale-105 group"
            >
              <CardHeader className="text-center">
                <div className={`w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br ${achievement.gradient} rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                  <achievement.icon className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-gray-800">{achievement.value}</div>
                <div className="text-xs sm:text-sm text-gray-500">{achievement.title}</div>
                <CardTitle className="text-base sm:text-lg group-hover:text-amber-600 transition-colors mt-1 sm:mt-2">
                  {achievement.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 leading-relaxed text-center text-xs sm:text-sm">
                  {achievement.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

// ==================== CONTACT SECTION COMPONENT ====================
const ContactSection: React.FC = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSending, setIsSending] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<AlertMessage>({ type: '', message: '' });
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<FormErrors>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    if (alertMessage.message) {
      const timer = setTimeout(() => {
        setAlertMessage({ type: '', message: '' });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [alertMessage.message]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = { name: '', email: '', subject: '', message: '' };
    let isValid: boolean = true;

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters long';
      isValid = false;
    } else if (formData.name.trim().length > 50) {
      newErrors.name = 'Name cannot exceed 50 characters';
      isValid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name.trim())) {
      newErrors.name = 'Name should only contain letters and spaces';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    } else if (formData.email.trim().length > 100) {
      newErrors.email = 'Email cannot exceed 100 characters';
      isValid = false;
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
      isValid = false;
    } else if (formData.subject.trim().length < 5) {
      newErrors.subject = 'Subject must be at least 5 characters long';
      isValid = false;
    } else if (formData.subject.trim().length > 100) {
      newErrors.subject = 'Subject cannot exceed 100 characters';
      isValid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      isValid = false;
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
      isValid = false;
    } else if (formData.message.trim().length > 1000) {
      newErrors.message = 'Message cannot exceed 1000 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name as keyof FormErrors]: '' }));
    }

    if (alertMessage.message) {
      setAlertMessage({ type: '', message: '' });
    }
  };

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if (!validateForm()) {
      setAlertMessage({
        type: 'error',
        message: 'Please fix the errors above and try again.'
      });
      return;
    }

    setIsSending(true);
    setAlertMessage({ type: '', message: '' });

    try {
      const submitData: FormData = {
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        subject: formData.subject.trim(),
        message: formData.message.trim()
      };

      console.log('Submitting contact form:', submitData);

      const response: AxiosResponse<ContactSuccessResponse> = await axiosInstance.post('/contact/send', submitData);

      console.log('Contact form response:', response.data);

      if (response.data && response.data.success) {
        navigate('/thankyou');
        toast({
          title: "Message Sent!",
          description: "Thank you for your message. I'll get back to you soon.",
        });

        console.log('Contact form submitted successfully:', {
          messageId: response.data.data?.id,
          category: response.data.data?.category,
          priority: response.data.data?.priority,
          status: response.data.data?.status
        });

        setAlertMessage({
          type: 'success',
          message: response.data.message || 'Message sent successfully! Thank you for reaching out.'
        });
      } else {
        setAlertMessage({
          type: 'error',
          message: response.data?.message || 'Something went wrong. Please try again.'
        });
      }
    } catch (error: unknown) {
      console.error('Contact form submission error:', error);

      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ContactErrorResponse>;

        if (axiosError.response) {
          const { status, data } = axiosError.response;
          console.log('Error status:', status);
          console.log('Error data:', data);

          if (status === 422 && data && Array.isArray(data.data)) {
            const serverErrors: FormErrors = { name: '', email: '', subject: '', message: '' };

            data.data.forEach((errorObj: ContactValidationError) => {
              const fieldName = Object.keys(errorObj)[0];
              const errorMessage = errorObj[fieldName];
              if (Object.prototype.hasOwnProperty.call(serverErrors, fieldName)) {
                serverErrors[fieldName as keyof FormErrors] = errorMessage;
              }
            });

            setErrors(serverErrors);
            setAlertMessage({
              type: 'error',
              message: 'Please fix the validation errors and try again.'
            });
          } else if (status === 429) {
            setAlertMessage({
              type: 'error',
              message: 'Too many messages sent. Please wait before sending another message.'
            });
          } else if (status === 400) {
            setAlertMessage({
              type: 'error',
              message: data?.message || 'Invalid request. Please check your input and try again.'
            });
          } else if (status === 500) {
            setAlertMessage({
              type: 'error',
              message: 'Server error. Please try again later or contact support.'
            });
          } else {
            setAlertMessage({
              type: 'error',
              message: data?.message || `Server error (${status}). Please try again later.`
            });
          }
        } else if (axiosError.request) {
          console.error('Network error:', axiosError.request);
          setAlertMessage({
            type: 'error',
            message: 'Network error. Please check your internet connection and try again.'
          });
        } else if (axiosError.code === 'ECONNABORTED') {
          setAlertMessage({
            type: 'error',
            message: 'Request timeout. Please try again.'
          });
        }
      } else {
        console.error('Unknown error:', error);
        setAlertMessage({
          type: 'error',
          message: 'An unexpected error occurred. Please try again.'
        });
      }
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contact" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
      <div className="container mx-auto">
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">Get In Touch</h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            Let's connect and discuss opportunities
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <div className="space-y-6 sm:space-y-8">
            <h3 className="text-xl sm:text-2xl font-semibold text-amber-600">Contact Information</h3>

            <div className="space-y-4 sm:space-y-6">
              {[
                { icon: Mail, label: "Email", value: "surajkumarraj8888@gmail.com", href: "mailto:surajkumarraj8888@gmail.com" },
                { icon: Phone, label: "Phone", value: "+91 9507272341", href: "tel:+919507272341" },
                { icon: MapPin, label: "Location", value: "Vaishali, Bihar, India", href: "https://maps.app.goo.gl/5Cmg979kkJ4EE6dK9" },
                { icon: Calendar, label: "Available", value: "Mon-Sat, 9AM-6PM", href: "/contact" }
              ].map((item, index) => (
                <a
                  key={index}
                  href={item.href || "#"}
                  className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-amber-200 hover:border-amber-400 transition-all duration-300 hover:scale-105 group"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <item.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm text-gray-500">{item.label}</p>
                    <p className="text-gray-800 font-medium group-hover:text-amber-600 transition-colors text-xs sm:text-sm lg:text-base">
                      {item.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            <div className="space-y-3 sm:space-y-4">
              <h4 className="text-base sm:text-lg font-semibold text-orange-600">Connect With Me</h4>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {[
                  { href: "https://github.com/Suraj1819", icon: Github, label: "GitHub" },
                  { href: "https://www.linkedin.com/in/suraj-kumar-72847b30a/", icon: Linkedin, label: "LinkedIn" },
                  { href: "https://leetcode.com/u/Suraj_1819/", icon: Code, label: "LeetCode" },
                  { href: "https://www.geeksforgeeks.org/user/surajkuma16ts/", icon: Code2, label: "GeeksforGeeks" }
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                    title={social.label}
                  >
                    <social.icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="bg-white/70 backdrop-blur-sm border border-amber-200">
            <CardHeader>
              <CardTitle className="text-orange-600 text-lg sm:text-xl">Send me a message</CardTitle>
            </CardHeader>
            <CardContent>
              {alertMessage.message && (
                <div className={`mb-4 sm:mb-6 p-3 sm:p-4 rounded-lg border flex items-center ${
                  alertMessage.type === 'error'
                    ? 'border-red-200 bg-red-50 text-red-800'
                    : 'border-green-200 bg-green-50 text-green-800'
                }`}>
                  {alertMessage.type === 'error' ? (
                    <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-2 flex-shrink-0" />
                  ) : (
                    <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-2 flex-shrink-0" />
                  )}
                  <span className="text-xs sm:text-sm">{alertMessage.message}</span>
                </div>
              )}
              <form onSubmit={handleContactSubmit} className="space-y-3 sm:space-y-4">
                <div className="space-y-1.5 sm:space-y-2">
                  <Label htmlFor="name" className="text-gray-700 font-medium text-xs sm:text-sm">Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={isSending}
                    className={`border-amber-200 focus:ring-amber-500 bg-white/50 text-xs sm:text-sm ${
                      errors.name ? 'border-red-300 focus:ring-red-500' : ''
                    }`}
                    aria-invalid={!!errors.name}
                    aria-describedby="name-error"
                    maxLength={50}
                  />
                  {errors.name && (
                    <p id="name-error" className="text-red-500 text-xs sm:text-sm flex items-center">
                      <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                      {errors.name}
                    </p>
                  )}
                </div>
                <div className="space-y-1.5 sm:space-y-2">
                  <Label htmlFor="email" className="text-gray-700 font-medium text-xs sm:text-sm">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={isSending}
                    className={`border-amber-200 focus:ring-amber-500 bg-white/50 text-xs sm:text-sm ${
                      errors.email ? 'border-red-300 focus:ring-red-500' : ''
                    }`}
                    aria-invalid={!!errors.email}
                    aria-describedby="email-error"
                    maxLength={100}
                  />
                  {errors.email && (
                    <p id="email-error" className="text-red-500 text-xs sm:text-sm flex items-center">
                      <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                      {errors.email}
                    </p>
                  )}
                </div>
                <div className="space-y-1.5 sm:space-y-2">
                  <Label htmlFor="subject" className="text-gray-700 font-medium text-xs sm:text-sm">Subject *</Label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    placeholder="e.g., Project Collaboration or Tutoring Inquiry"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    disabled={isSending}
                    className={`border-amber-200 focus:ring-amber-500 bg-white/50 text-xs sm:text-sm ${
                      errors.subject ? 'border-red-300 focus:ring-red-500' : ''
                    }`}
                    aria-invalid={!!errors.subject}
                    aria-describedby="subject-error"
                    maxLength={100}
                  />
                  {errors.subject && (
                    <p id="subject-error" className="text-red-500 text-xs sm:text-sm flex items-center">
                      <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                      {errors.subject}
                    </p>
                  )}
                </div>
                <div className="space-y-1.5 sm:space-y-2">
                  <Label htmlFor="message" className="text-gray-700 font-medium text-xs sm:text-sm">Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Tell me about your project or how I can help you..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    disabled={isSending}
                    className={`border-amber-200 focus:ring-amber-500 bg-white/50 resize-none text-xs sm:text-sm ${
                      errors.message ? 'border-red-300 focus:ring-red-500' : ''
                    }`}
                    aria-invalid={!!errors.message}
                    aria-describedby="message-error"
                    maxLength={1000}
                  />
                  <div className="flex justify-between items-center">
                    {errors.message && (
                      <p id="message-error" className="text-red-500 text-xs sm:text-sm flex items-center">
                        <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                        {errors.message}
                      </p>
                    )}
                    <p className="text-xs text-gray-500 ml-auto">{formData.message.length}/1000</p>
                  </div>
                </div>
                <p className="text-[10px] sm:text-xs text-gray-500">* Required fields. Your information is kept confidential and used only for responding to your inquiry.</p>
                <Button
                  type="submit"
                  disabled={isSending}
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed text-xs sm:text-sm"
                >
                  {isSending ? (
                    <>
                      <Loader2 className="mr-1.5 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-1.5 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

// ==================== MAIN INDEX COMPONENT ====================
const Index: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const toggleMobileMenu = (): void => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = (): void => {
    setIsMobileMenuOpen(false);
  };

  if (isLoading) {
    return <PremiumLoadingScreen />;
  }

  return (
    <>
      <style>{customStyles}</style>
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 text-foreground">
        {/* Navigation */}
        <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-amber-200 shadow-sm">
          <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-2.5 sm:py-3 lg:py-4">
            <div className="flex items-center justify-between">
              {/* Logo and Brand Name */}
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <Code className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </div>

                <Link
                  to="/home"
                  className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent flex items-center space-x-1 sm:space-x-2 hover:scale-105 transition-transform duration-300"
                  onClick={closeMobileMenu}
                >
                  <span>SuraJz</span>
                  <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 text-orange-500 animate-pulse" />
                </Link>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-4 lg:space-x-6 xl:space-x-8">
                {["home", "about", "skills", "services", "projects", "contact"].map((item) => (
                  <a
                    key={item}
                    href={`#${item}`}
                    className="relative py-2 px-2 lg:px-3 rounded-lg transition-all duration-300 hover:scale-105 text-gray-700 hover:text-amber-600 hover:bg-amber-50 font-medium capitalize text-sm lg:text-base"
                  >
                    {item}
                  </a>
                ))}
                <Link to="/home" className="p-2 rounded-full bg-gradient-to-r from-red-400 to-pink-500 hover:from-red-500 hover:to-pink-600 transition-all hover:scale-110">
                  <Heart className="h-4 w-4 lg:h-5 lg:w-5 text-white fill-white" />
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleMobileMenu}
                  className="p-1.5 sm:p-2 hover:bg-amber-50 rounded-lg transition-colors"
                >
                  {isMobileMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-amber-200 animate-fade-in">
              <div className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 space-y-1">
                {["home", "about", "skills", "services", "projects", "contact"].map((item) => (
                  <a
                    key={item}
                    href={`#${item}`}
                    className="block py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg transition-all duration-300 hover:scale-105 text-gray-700 hover:text-amber-600 hover:bg-amber-50 font-medium text-sm sm:text-base capitalize"
                    onClick={closeMobileMenu}
                  >
                    {item}
                  </a>
                ))}
                <Link
                  to="/home"
                  className="flex items-center justify-center p-2.5 sm:p-3 rounded-full bg-gradient-to-r from-red-400 to-pink-500 hover:from-red-500 hover:to-pink-600 transition-all hover:scale-110 mt-2"
                  onClick={closeMobileMenu}
                >
                  <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-white fill-white" />
                </Link>
              </div>
            </div>
          )}
        </nav>

        {/* Main Content */}
        <main>
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ServicesSection />
          <ProjectsSection />
          <AchievementsSection />
          <ContactSection />
          <Footer />
        </main>
      </div>
    </>
  );
};

export default Index;