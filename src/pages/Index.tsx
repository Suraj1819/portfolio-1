import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import {
  ArrowRight, Code, Mail, Github, Linkedin, Phone, Star, Sparkles,
  Heart, ExternalLink, Menu, X, Calendar, MapPin, Award, Zap,
  Target, Globe, Lightbulb, CheckCircle, Clock, Users,
  Database, Brain, ChevronDown,
  Loader2, Send, Terminal, GraduationCap,
  // Facebook,
  MessageCircle,
  Code2,
  Instagram,
  School,
  School2,
  AlertCircle,
  Twitter
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
  category: string;
  duration?: string;
  teamSize?: string;
  challenges?: string[];
  achievements?: string[];
  role?: string;
  screenshots?: string[];
  stats?: {
    commits?: number;
    issues?: number;
    contributors?: number;
    downloads?: number;
  };
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

const customStyles = `
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-12px); }
  }
  
  @keyframes pulse-slow {
    0%, 100% { opacity: 0.4; }
    50% { opacity: 0.6; }
  }
  
  @keyframes scale-in {
    from { transform: scale(0.95); opacity: 0; }
    to { transform: scale(1); opacity: 1; }
  }
  
  @keyframes bounce-gentle {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-6px); }
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-6px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes slideIn {
    from { transform: translateX(-30px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }

  @keyframes slideUp {
    from { transform: translateY(12px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }

  @keyframes shimmer {
    0% { background-position: -1000px 0; }
    100% { background-position: 1000px 0; }
  }

  @keyframes glow-pulse {
    0%, 100% { 
      box-shadow: 0 0 12px rgba(245, 158, 11, 0.3), inset 0 0 12px rgba(245, 158, 11, 0.08);
    }
    50% { 
      box-shadow: 0 0 24px rgba(245, 158, 11, 0.5), inset 0 0 20px rgba(245, 158, 11, 0.12);
    }
  }

  @keyframes rotate-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @keyframes pulse-ring {
    0% { 
      transform: scale(1);
      opacity: 1;
    }
    100% { 
      transform: scale(1.6);
      opacity: 0;
    }
  }

  @keyframes code-float {
    0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.7; }
    33% { transform: translateY(-15px) rotate(1deg); opacity: 0.9; }
    66% { transform: translateY(-5px) rotate(-1deg); opacity: 0.8; }
  }

  @keyframes loading-glow {
    0%, 100% { 
      text-shadow: 0 0 6px rgba(245, 158, 11, 0.4), 0 0 12px rgba(245, 158, 11, 0.2);
    }
    50% { 
      text-shadow: 0 0 12px rgba(245, 158, 11, 0.6), 0 0 24px rgba(245, 158, 11, 0.4);
    }
  }

  @keyframes fade-out {
    from { opacity: 1; }
    to { opacity: 0; }
  }

  /* SIDE TO SIDE WAVE ANIMATION */
  @keyframes wave-side-to-side {
    0% { 
      transform: translateX(-100px) rotate(-2deg) scaleY(1);
      opacity: 0.8;
    }
    25% { 
      transform: translateX(-50px) rotate(0deg) scaleY(1.1);
      opacity: 1;
    }
    50% { 
      transform: translateX(0px) rotate(1deg) scaleY(0.95);
      opacity: 1;
    }
    75% { 
      transform: translateX(50px) rotate(0deg) scaleY(1.05);
      opacity: 1;
    }
    100% { 
      transform: translateX(100px) rotate(-1deg) scaleY(1);
      opacity: 0.8;
    }
  }

  @keyframes wave-dots {
    0% { 
      transform: translateX(-80px) rotate(1deg) scaleY(1);
      opacity: 0.6;
    }
    33% { 
      transform: translateX(-40px) rotate(-1deg) scaleY(1.08);
      opacity: 0.9;
    }
    66% { 
      transform: translateX(40px) rotate(2deg) scaleY(0.92);
      opacity: 0.8;
    }
    100% { 
      transform: translateX(80px) rotate(-2deg) scaleY(1);
      opacity: 0.6;
    }
  }

  @keyframes typing {
    from { width: 0; }
    to { width: 100%; }
  }

  @keyframes blink {
    from, to { border-color: transparent; }
    50% { border-color: #f97316; }
  }

  .animate-wave-side { animation: wave-side-to-side 3.5s ease-in-out infinite; }
  .animate-wave-dots { animation: wave-dots 4s ease-in-out infinite; }
  .animate-float { animation: float 4.5s ease-in-out infinite; }
  .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
  .animate-scale-in { animation: scale-in 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
  .animate-bounce-gentle { animation: bounce-gentle 3s ease-in-out infinite; }
  .animate-fade-in { animation: fadeIn 0.5s ease-out; }
  .animate-slide-in { animation: slideIn 0.7s ease-out; }
  .animate-slide-up { animation: slideUp 0.7s ease-out; }
  .shimmer { 
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
    background-size: 1000px 100%;
    animation: shimmer 3s infinite;
  }
  .animate-glow-pulse { animation: glow-pulse 3.5s ease-in-out infinite; }
  .animate-rotate-slow { animation: rotate-slow 12s linear infinite; }
  .animate-pulse-ring { animation: pulse-ring 3s ease-out infinite; }
  .animate-code-float { animation: code-float 6s ease-in-out infinite; }
  .animate-loading-glow { animation: loading-glow 3s ease-in-out infinite; }
  .fade-out { animation: fade-out 1s ease-in-out forwards; }
  .typing-animation {
    overflow: hidden;
    border-right: 2px solid #f97316;
    white-space: nowrap;
    animation: typing 3.5s steps(40) infinite, blink 1s infinite;
  }

  .loading-circle {
    position: relative;
  }
  
  .loading-circle::before {
    content: '';
    position: absolute;
    top: -4px;
    left: -4px;
    right: -4px;
    bottom: -4px;
    border: 2px solid transparent;
    border-top: 4px solid #f97316;
    border-radius: 50%;
    animation: rotate-slow 1s linear infinite;
  }

  .loading-circle::after {
    content: '';
    position: absolute;
    top: -8px;
    left: -8px;
    right: -8px;
    bottom: -8px;
    border: 1px solid rgba(245, 158, 11, 0.3);
    border-radius: 50%;
    animation: pulse-ring 2s ease-out infinite;
  }

  @media (max-width: 640px) {
    .mobile-loading-text { font-size: 3.5rem !important; line-height: 0.9 !important; }
    .mobile-icon-size { width: 12px !important; height: 12px !important; }
    .mobile-code-snippet { font-size: 0.55rem !important; max-width: 130px !important; }
    .mobile-info-text { font-size: 0.7rem !important; }
    .mobile-detail-text { font-size: 0.6rem !important; }
  }

  @media (min-width: 641px) and (max-width: 768px) {
    .tablet-loading-text { font-size: 4.5rem !important; }
  }

  html {
    scroll-behavior: smooth;
  }

  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }

  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .gradient-text-amber {
    background: linear-gradient(135deg, #f97316 0%, #fb923c 50%, #fbbf24 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .info-panel {
    backdrop-filter: blur(10px);
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(245, 158, 11, 0.2);
  }

  /* Perfect Center Alignment */
  .center-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    width: 100%;
  }

  .content-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 900px;
    text-align: center;
  }

  .icon-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
  }

  @media (max-width: 768px) {
    .icon-row {
      gap: 1.5rem;
    }
  }

  @media (max-width: 480px) {
    .icon-row {
      gap: 1rem;
    }
  }

  /* Perfect Loading Text Container */
  .loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 100%;
  }

  .loading-text-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 0;
    margin-bottom: 1rem;
  }

  .loading-dots-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

// ==================== PERFECT CENTERED LOADING SCREEN ====================
const PremiumLoadingScreen: React.FC = () => {
  const [progress, setProgress] = useState<number>(0);
  const [loadingMessage, setLoadingMessage] = useState<number>(0);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [fadeOut, setFadeOut] = useState<boolean>(false);
  const [currentDetail, setCurrentDetail] = useState<number>(0);

  const loadingMessages: string[] = [
    "Initializing components...",
    "Loading content...",
    "Preparing experience...",
    "Almost ready...",
    "Finalizing...",
    "Thanks for waiting..."
  ];

  const systemDetails: string[] = [
    "🔧 Compiling modules...",
    "📦 Resolving dependencies...",
    "🎨 Rendering styles...",
    "🚀 Optimizing performance...",
    "💾 Loading state...",
    "🌐 Fetching configs...",
    "⚡ Starting monitor...",
    "🔒 Verifying security...",
    "📱 Preparing layout...",
    "🎭 Loading UI...",
    "🎯 Configuring routes...",
    "✨ Finalizing..."
  ];

  const mathFormulas = [
    { text: "E = mc²", left: '5%', top: '15%', delay: 0, mobileLeft: '2%', mobileTop: '10%' },
    { text: "F = ma", left: '75%', top: '10%', delay: 0.5, mobileLeft: '70%', mobileTop: '5%' },
    { text: "a² + b² = c²", left: '15%', top: '65%', delay: 1, mobileLeft: '10%', mobileTop: '55%' },
    { text: "∫ sin(x) dx", left: '80%', top: '75%', delay: 1.5, mobileLeft: '75%', mobileTop: '65%' },
    { text: "e^(iπ) + 1 = 0", left: '65%', top: '35%', delay: 2.5, mobileLeft: '60%', mobileTop: '30%' },
    { text: "σ = √(Σ(xi-μ)²/n)", left: '60%', top: '60%', delay: 5.5, mobileLeft: '55%', mobileTop: '50%' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsComplete(true);
          setTimeout(() => setFadeOut(true), 1000);
          return 100;
        }
        const increment = 1.8 + Math.random() * 2;
        return Math.min(prev + increment, 99);
      });
    }, 180);

    const messageInterval = setInterval(() => {
      setLoadingMessage(prev => (prev + 1) % loadingMessages.length);
    }, 1500);

    const detailInterval = setInterval(() => {
      setCurrentDetail(prev => (prev + 1) % systemDetails.length);
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(messageInterval);
      clearInterval(detailInterval);
    };
  }, []);

  if (fadeOut) {
    return (
      <div className="fixed inset-0 z-50 bg-white flex items-center justify-center transition-opacity duration-1000">
        <h1 className="text-5xl sm:text-6xl font-semibold text-slate-800 flex items-center animate-fade-in">
          Ready
          <CheckCircle className="ml-4 w-10 h-10 text-emerald-500 animate-bounce" />
        </h1>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes glowPulse {
          0% { box-shadow: 0 0 10px rgba(234, 88, 12, 0.2); }
          50% { box-shadow: 0 0 20px rgba(234, 88, 12, 0.4); }
          100% { box-shadow: 0 0 10px rgba(234, 88, 12, 0.2); }
        }

        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-fade-in { animation: fadeIn 0.8s ease forwards; }
        .animate-glow { animation: glowPulse 3s ease-in-out infinite; }

        .gradient-text {
          background: linear-gradient(90deg, #d97706, #ea580c);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .bg-grid {
          background-image: 
            radial-gradient(circle at 1px 1px, rgba(251, 146, 60, 0.1) 1px, transparent 0);
          background-size: 30px 30px;
          opacity: 0.1;
        }

        .min-h-screen-full { min-height: 100vh; }
      `}</style>

      <div className="fixed inset-0 z-50 min-h-screen-full w-full flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 overflow-hidden relative">
        
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-grid pointer-events-none"></div>

        {/* Ambient Background Glows */}
        <div className="absolute inset-0 bg-gradient-to-r from-amber-400/8 via-transparent to-orange-400/8 pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] bg-amber-400/10 rounded-full blur-3xl animate-pulse -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute top-20 left-1/4 w-64 h-64 bg-orange-400/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-amber-400/15 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>

        {/* Floating Math Formulas (Minimal & Decorative) */}
        <div className="absolute inset-0 pointer-events-none">
          {mathFormulas.map((formula, index) => (
            <div
              key={index}
              className="absolute text-amber-600/15 text-sm font-mono animate-pulse select-none"
              style={{
                left: window.innerWidth < 640 ? formula.mobileLeft : formula.left,
                top: window.innerWidth < 640 ? formula.mobileTop : formula.top,
                animationDelay: `${formula.delay}s`,
                transform: 'translateZ(0)',
              }}
            >
              {formula.text}
            </div>
          ))}
        </div>

        {/* Main Content - Full Screen Centered */}
        <div className="relative z-10 w-full max-w-2xl px-8 text-center animate-fade-in">
          
          {/* LOADING Header */}
          <h1 className="text-6xl sm:text-8xl md:text-9xl font-black gradient-text mb-4 tracking-tight">
            LOADING
          </h1>

          {/* Progress Bar */}
          <div className="w-full max-w-lg mx-auto my-8">
            <div className="h-2 bg-amber-200/70 rounded-full overflow-hidden backdrop-blur-sm">
              <div 
                className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-300 ease-out animate-glow"
                style={{ width: `${progress}%`, minWidth: '2%' }}
              ></div>
            </div>
            <div className="text-sm text-amber-700 font-medium mt-2">
              {Math.round(progress)}% Complete
            </div>
          </div>

          {/* Status Message */}
          <p className="text-lg sm:text-xl text-amber-700 font-medium mb-10 leading-relaxed">
            {loadingMessages[loadingMessage]}
          </p>

          {/* Icon Triad with Float */}
          <div className="flex justify-center items-center gap-12 mb-12 animate-float" style={{ animationDuration: '4s' }}>
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg border border-amber-400/30 animate-glow">
                <Code className="w-7 h-7 text-white" />
              </div>
              <span className="text-sm text-amber-600 font-medium">Code</span>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg border border-amber-400/30 animate-glow" style={{ animationDelay: '0.5s' }}>
                <Zap className="w-7 h-7 text-white" />
              </div>
              <span className="text-sm text-amber-600 font-medium">Speed</span>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg border border-amber-400/30 animate-glow" style={{ animationDelay: '1s' }}>
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <span className="text-sm text-amber-600 font-medium">Magic</span>
            </div>
          </div>

          {/* Live System Detail */}
          <div className="text-sm text-amber-500 font-mono mb-6 min-h-6 flex justify-center">
            <span className="px-4 py-2 bg-white/30 rounded-full backdrop-blur-sm border border-amber-200/50">
              {systemDetails[currentDetail]}
            </span>
          </div>

          {/* Final Status */}
          <div className="flex items-center justify-center gap-3 text-base text-amber-700 font-semibold">
            <Loader2 className="w-5 h-5 animate-spin text-amber-600" />
            {isComplete ? "Application Ready" : "Initializing..."}
          </div>
        </div>
      </div>
    </>
  );
};

// ==================== HERO SECTION COMPONENT ====================

const HeroSection: React.FC = () => {

  const handleHireClick = (): void => {
    // Confetti explosion effect
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);
    
    // Navigate to contact page after a short delay to see the confetti
    setTimeout(() => {
      window.location.href = '/contact';
    }, 800);
  };

  const socialLinks = [
    { 
      href: "https://github.com/Suraj1819", 
      icon: Github, 
      color: "text-[#2b3137] hover:text-[#24292e]", // GitHub Dark
      bgColor: "hover:bg-gray-100",
      borderColor: "hover:border-[#2b3137]/20",
      title: "GitHub"
    },
    { 
      href: "https://www.linkedin.com/in/suraj-kumar-72847b30a/", 
      icon: Linkedin, 
      color: "text-[#0077B5] hover:text-[#006396]", // LinkedIn Blue
      bgColor: "hover:bg-blue-50",
      borderColor: "hover:border-[#0077B5]/20",
      title: "LinkedIn"
    },
    { 
      href: "https://x.com/SuraJzRt", 
      icon: X, 
      color: "text-[#000000] hover:text-[#333333]", // X Black
      bgColor: "hover:bg-gray-100",
      borderColor: "hover:border-black/20",
      title: "X (formerly Twitter)"
    },
    { 
      href: "https://wa.me/919876543210", // Replace with actual number
      icon: MessageCircle, 
      color: "text-[#25D366] hover:text-[#128C7E]", // WhatsApp Green
      bgColor: "hover:bg-green-50",
      borderColor: "hover:border-[#25D366]/20",
      title: "WhatsApp"
    },
    { 
      href: "https://www.instagram.com/risu2948/", 
      icon: Instagram, 
      color: "text-[#E4405F] hover:text-[#C13584]", // Instagram Pink
      bgColor: "hover:bg-pink-50",
      borderColor: "hover:border-[#E4405F]/20",
      title: "Instagram"
    },
    { 
      href: "https://leetcode.com/u/Suraj_1819/", 
      icon: Code, // Using Code for LeetCode
      color: "text-[#FFA116] hover:text-[#D98200]", // LeetCode Orange
      bgColor: "hover:bg-orange-50",
      borderColor: "hover:border-[#FFA116]/20",
      title: "LeetCode"
    },
    { 
      href: "https://www.geeksforgeeks.org/user/surajkuma16ts/", 
      icon: Code2, // Using Code2 for GeeksforGeeks
      color: "text-[#2F8D46] hover:text-[#1e5c2e]", // GFG Green
      bgColor: "hover:bg-green-50",
      borderColor: "hover:border-[#2F8D46]/20",
      title: "GeeksforGeeks"
    },
  ];

  return (
    <section id="home" className="relative pt-20 sm:pt-24 pb-12 sm:pb-16 px-4 sm:px-6 overflow-hidden min-h-screen flex items-center">
      {/* --- DESKTOP HIRE BUTTON (Floating between text and image) --- */}
      

      {/* Animated Background with Framer Motion (existing) */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* ... existing background blobs ... */}
        <motion.div
          className="absolute top-10 sm:top-20 left-5 sm:left-10 w-48 sm:w-72 h-48 sm:h-72 bg-amber-300/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.6, 0.8, 0.6]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        ></motion.div>

        <motion.div
          className="absolute top-20 sm:top-40 right-5 sm:right-10 w-64 sm:w-96 h-64 sm:h-96 bg-orange-300/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.7, 0.5]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1
          }}
        ></motion.div>

        <motion.div
          className="absolute bottom-10 sm:bottom-20 left-1/4 sm:left-1/3 w-56 sm:w-80 h-56 sm:h-80 bg-yellow-300/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.55, 0.75, 0.55]
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 2
          }}
        ></motion.div>
      </motion.div>

      {/* Floating Elements with Framer Motion (existing) */}
      <motion.div
        className="absolute inset-0 pointer-events-none hidden sm:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        {/* ... existing floating icons ... */}
        <motion.div
          className="absolute top-32 left-20"
          animate={{
            y: [-10, 10, -10],
            x: [0, 5, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "mirror",
            delay: 0.3
          }}
        >
          <div className="w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-r from-amber-400 to-orange-400 rounded-lg flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow">
            <Code className="h-6 sm:h-8 w-6 sm:w-8 text-white" />
          </div>
        </motion.div>

        <motion.div
          className="absolute top-48 right-32"
          animate={{
            y: [-15, 15, -15],
            x: [0, -8, 0]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "mirror",
            delay: 0.7
          }}
        >
          <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow">
            <Sparkles className="h-5 sm:h-6 w-5 sm:w-6 text-white" />
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-40 left-16"
          animate={{
            y: [-12, 12, -12],
            x: [0, 7, 0]
          }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            repeatType: "mirror",
            delay: 1
          }}
        >
          <div className="w-12 sm:w-14 h-12 sm:h-14 bg-gradient-to-r from-yellow-400 to-amber-400 rounded-lg rotate-12 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow">
            <Star className="h-6 sm:h-7 w-6 sm:w-7 text-white" />
          </div>
        </motion.div>
      </motion.div>

      <div className="container mx-auto relative z-10">
        <motion.div
          className="flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Left Content */}
          <motion.div
            className="w-full lg:w-1/2 space-y-6 sm:space-y-8 text-center lg:text-left"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm border border-amber-200 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm shadow-sm"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <motion.div
                className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-green-500 rounded-full"
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              ></motion.div>
              <span className="text-gray-700">Available for opportunities</span>
            </motion.div>

            <motion.div
              className="space-y-4 sm:space-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <motion.h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <span className="block text-gray-800 mb-1 sm:mb-2">Hello,</span>
                <span className="block bg-gradient-to-r from-amber-600 via-orange-600 to-red-500 bg-clip-text text-transparent">
                  I'm SuraJz
                </span>
              </motion.h1>

              <motion.div
                className="space-y-3 sm:space-y-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <p className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-800">
                  Aspiring Software Engineer
                </p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-3">
                  {['C++', 'Python', 'JavaScript', 'DSA', 'MERN', 'Tailwindcss'].map((skill, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                    >
                      <Badge
                        variant="secondary"
                        className="bg-amber-100 text-red-700 border-amber-200 px-2 sm:px-3 py-0.5 sm:py-1 text-xs sm:text-sm hover:bg-amber-200 transition-all hover:-translate-y-1 hover:cursor-pointer"
                      >
                        {skill}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.p
                className="text-sm sm:text-base lg:text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto lg:mx-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                I'm a <span className='bg-amber-200 rounded-lg px-1 sm:px-2 text-red-600 font-semibold text-xs sm:text-sm lg:text-base'>3<sup>rd</sup> Year B.Tech</span> student passionate about coding, problem-solving, and full-stack development. Skilled in
                <span className='text-red-600 font-semibold bg-amber-200 px-1 sm:px-2 rounded-lg ml-1 mr-1 text-xs sm:text-sm lg:text-base'>MERN</span>,
                <span className='text-red-600 font-semibold bg-amber-200 px-1 sm:px-2 rounded-md ml-1 mr-1 text-xs sm:text-sm lg:text-base'>TailwindCss</span>,
                <span className='text-red-600 font-semibold bg-amber-200 px-1 sm:px-2 rounded-md text-xs sm:text-sm lg:text-base'>PostgreSQL</span>,
                <span className='text-red-600 font-semibold bg-amber-200 px-1 sm:px-2 rounded-md text-xs sm:text-sm lg:text-base'>C++</span>, and
                <span className='text-red-600 font-semibold bg-amber-200 px-1 sm:px-2 rounded-md text-xs sm:text-sm lg:text-base'>Python</span>.
              </motion.p>
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.1 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 text-sm sm:text-base"
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  <span>Explore My Work</span>
                  <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-amber-300 text-gray-700 hover:bg-amber-50 backdrop-blur-sm bg-white/50 hover:border-amber-400 transition-all duration-300 hover:scale-105 text-sm sm:text-base"
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Let's Connect
                  <ExternalLink className='ml-2 h-3 w-3 sm:h-4 sm:w-4'/>
                </Button>
              </motion.div>
            </motion.div>

            {/* Professional Social Links */}
            <motion.div
              className="flex justify-center lg:justify-start gap-3 flex-wrap mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.3 }}
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -3 }} // Added y movement on hover
                  whileTap={{ scale: 0.9 }}
                  className={`p-2.5 rounded-full border border-transparent transition-all duration-300 ${social.color} ${social.bgColor} ${social.borderColor} shadow-sm hover:shadow-md`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 1.4 + index * 0.05 }}
                  title={social.title}
                >
                  <social.icon className="h-5 w-5" /> {/* Increased icon size slightly for better visibility */}
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Profile Image */}
          <motion.div
            className="w-full lg:w-1/2 flex justify-center mt-8 lg:mt-0"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative">
              {/* --- MOBILE HIRE BUTTON (Floating above profile circle) --- */}
              <motion.button
                onClick={handleHireClick}
                className="lg:hidden absolute -top-10  sm:-top-16 -left-10 transform -translate-x-1/2 z-30 flex items-center gap-2 
                           bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold py-4 px-5 rounded-full shadow-lg"
                animate={{ y: [0, -8, 0] }} // Floating animation
                transition={{ duration: 2.5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Hire Me</span>
                <Sparkles className="h-4 w-4 ml-2" />
              </motion.button>
              
              {/* Glow Background (existing) */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 rounded-full blur-2xl opacity-30"
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: 'reverse',
                }}
              />

              {/* Profile Circle (existing) */}
              <motion.div
                className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-gradient-to-br from-amber-400 via-orange-400 to-red-400 rounded-full flex items-center justify-center shadow-2xl"
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 25px 50px rgba(245, 158, 11, 0.6)" 
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-56 h-56 sm:w-72 sm:h-72 lg:w-88 lg:h-88 bg-white rounded-full flex items-center justify-center border-4 border-amber-200 overflow-hidden">
                  <img
                    src="https://wallpapercave.com/wp/wp6690023.jpg"
                    alt="Profile Picture"
                    className="w-full h-full object-cover"
                  />
                </div>
              </motion.div>

              {/* Year Badge (existing) */}
              <motion.div
                className="absolute -top-2 sm:-top-4 -right-2 sm:-right-4 w-14 h-14 sm:w-20 sm:h-20 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg font-bold"
                animate={{
                  y: [-8, 8, -8],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                whileHover={{ scale: 1.1 }}
              >
                <span className="text-white font-bold text-xs sm:text-sm lg:text-base">
                  2027
                </span>
              </motion.div>

              {/* Orbital Elements (existing) */}
              <motion.div
                className="absolute top-1/2 left-1/2 w-[130%] h-[130%] -translate-x-1/2 -translate-y-1/2 hidden sm:block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <motion.div
                  className="relative w-full h-full"
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{ transformOrigin: "center center" }}
                >
                  {/* Top Orbital Dot */}
                  <motion.div
                    className="absolute w-3 h-3 sm:w-4 sm:h-4 bg-amber-400 rounded-full shadow-lg"
                    style={{
                      top: "-50%",
                      left: "50%",
                      transform: "translateX(-50%) translateY(0%)",
                    }}
                    animate={{
                      scale: [1, 1.4, 1],
                      opacity: [1, 0.6, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "mirror",
                    }}
                  />

                  {/* Bottom Orbital Dot */}
                  <motion.div
                    className="absolute w-3 h-3 sm:w-4 sm:h-4 bg-orange-400 rounded-full shadow-lg"
                    style={{
                      top: "50%",
                      left: "50%",
                      transform: "translateX(-50%) translateY(50%)",
                    }}
                    animate={{
                      scale: [1, 1.4, 1],
                      opacity: [1, 0.6, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "mirror",
                      delay: 0.5,
                    }}
                  />

                  {/* Left Orbital Dot */}
                  <motion.div
                    className="absolute w-3 h-3 sm:w-4 sm:h-4 bg-red-400 rounded-full shadow-lg"
                    style={{
                      top: "50%",
                      left: "-50%",
                      transform: "translateX(0%) translateY(-50%)",
                    }}
                    animate={{
                      scale: [1, 1.4, 1],
                      opacity: [1, 0.6, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "mirror",
                      delay: 1,
                    }}
                  />

                  {/* Right Orbital Dot */}
                  <motion.div
                    className="absolute w-3 h-3 sm:w-4 sm:h-4 bg-yellow-400 rounded-full shadow-lg"
                    style={{
                      top: "50%",
                      left: "50%",
                      transform: "translateX(50%) translateY(-50%)",
                    }}
                    animate={{
                      scale: [1, 1.4, 1],
                      opacity: [1, 0.6, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "mirror",
                      delay: 1.5,
                    }}
                  />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator - Hidden on mobile */}
        <motion.div
          className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 hidden sm:flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.5 }}
          whileHover={{ scale: 1.1 }}
        >
          <motion.div
            className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-amber-400 rounded-full flex justify-center items-center"
            animate={{
              boxShadow: [
                '0 0 0 0px rgba(251, 191, 36, 0)',
                '0 0 0 8px rgba(251, 191, 36, 0.1)',
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            <motion.div
              className="w-1 h-2 sm:h-3 bg-amber-400 rounded-full"
              animate={{
                y: [0, 8, 0],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
          <motion.span
            className="text-xs text-gray-500 mt-2"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Scroll down
          </motion.span>
        </motion.div>
      </div>
    </section>
  );
}

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
        { name: 'TypeScript', level: 60, icon: '📜', description: 'Type safety and interface design' },
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
        { name: 'Git/GitHub', level: 80, icon: '🐙', description: 'Version control, branching strategies' },
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
      price: "Later",
      duration: "",
      color: "from-amber-500 to-orange-600"
    },
    {
      icon: Target,
      title: "DSA Mentoring",
      description: "Master Data Structures and Algorithms with structured learning and practice",
      features: ["Arrays & Linked Lists", "Sorting & Searching", "Dynamic Programming", "Problem Solving"],
      price: "Later",
      duration: "",
      color: "from-blue-500 to-purple-600"
    },
    {
      icon: Lightbulb,
      title: "Logic Building",
      description: "Develop strong logical thinking and problem-solving approaches for beginners",
      features: ["Computational Thinking", "Algorithm Design", "Pattern Recognition", "Pseudocode"],
      price: "Later",
      duration: "",
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
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<string>('all');

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
      gradient: "from-amber-400 to-orange-600",
      category  : "utility"
    },
    {
      title: "Portfolio Website",
      description: "Modern responsive portfolio built with React and Tailwind CSS.",
      longDescription: "A stunning portfolio website showcasing projects, skills, and professional experience with smooth animations and modern design. This project demonstrates my expertise in React, TypeScript, and responsive design principles.",
      technologies: ["React", "Tailwind CSS", "TypeScript", "Responsive Design"],
      features: ["Responsive Design", "Smooth Animations", "Contact Form", "Project Showcase", "Resume Download"],
      status: "Completed",
      github: "https://github.com/Suraj1819",
      live: "https://surajzxrt.netlify.app/",
      image: "../../assets/Screenshot 2025-11-08 175007.png",
      gradient: "from-blue-400 to-purple-600",
      category: "web development"
    },
    {
      title: "E-commerce Platform",
      description: "Full-stack e-commerce solution with product management and payment integration.",
      longDescription: "A complete e-commerce platform with user authentication, product catalog, shopping cart, and payment processing. Built with the MERN stack, this project showcases my full-stack development skills and understanding of modern web applications.",
      technologies: ["MongoDB", "Express", "React", "Node.js", "Stripe API"],
      features: ["User Authentication", "Product Management", "Shopping Cart", "Payment Processing"],
      status: "In Progress",
      github: "#",
      live: "#",
      image: "https://via.placeholder.com/400x250",
      gradient: "from-green-400 to-emerald-600",
      category: "e-commerce"
    },
    {
      title: "Weather Forecast App",
      description: "A sleek weather app providing real-time forecasts using the OpenWeatherMap API.",
      longDescription: "A beautifully designed weather application that delivers current weather conditions, hourly forecasts, and a 7-day outlook. It uses geolocation to provide local weather data or allows users to search for any city worldwide. The interface changes dynamically based on the weather conditions.",
      technologies: ["React", "API Integration", "Geolocation", "Tailwind CSS", "Axios"],
      features: ["Real-time Weather Data", "City Search", "Geolocation Support", "7-Day Forecast", "Dynamic Backgrounds"],
      status: "Completed",
      github: "https://github.com/Suraj1819",
      live: "#",
      image: "https://via.placeholder.com/400x250",
      gradient: "from-cyan-400 to-light-blue-600",
      category: "weather"
    },
    {
      title: "Real-Time Chat App",
      description: "A full-stack real-time chat application built with Socket.IO and the MERN stack.",
      longDescription: "A real-time messaging application that allows users to join chat rooms, send messages, and see who is currently online. It features a persistent message history stored in MongoDB and uses WebSockets for instant communication.",
      technologies: ["React", "Node.js", "Express", "MongoDB", "Socket.IO", "JWT"],
      features: ["Real-time Messaging", "User Authentication", "Multiple Chat Rooms", "Online User List", "Typing Indicators"],
      status: "In Progress",
      github: "https://github.com/Suraj1819",
      live: "#",
      image: "https://via.placeholder.com/400x250",
      gradient: "from-teal-400 to-cyan-500",
      category: "communication"
    },
    {
      title: "Analytics Dashboard",
      description: "An interactive dashboard for visualizing complex datasets using Chart.js.",
      longDescription: "This project is a powerful analytics dashboard that transforms raw data into beautiful and interactive charts and graphs. It allows users to filter data by date ranges and other parameters, providing insightful visualizations of key metrics. Built with React and Chart.js.",
      technologies: ["React", "Chart.js", "Data Handling", "UI/UX Design", "REST API"],
      features: ["Interactive Charts", "Data Filtering", "Exportable Reports", "Customizable Widgets", "Real-time Data Sync"],
      status: "Completed",
      github: "https://github.com/Suraj1819",
      live: "#",
      image: "https://via.placeholder.com/400x250",
      gradient: "from-indigo-400 to-purple-500",
      category: "data visualization"
    },
    {
      title: "Blog Platform (CMS)",
      description: "A full-featured blog platform with a Markdown editor and user management.",
      longDescription: "A complete Content Management System (CMS) for bloggers. It features a rich Markdown editor for writing posts, user authentication for authors, a comment system, and an admin panel for managing content. The frontend is server-side rendered for better SEO.",
      technologies: ["Next.js", "React", "Prisma", "PostgreSQL", "Tailwind CSS", "NextAuth.js"],
      features: ["Markdown Editor", "User Authentication", "SEO-Friendly", "Comment System", "Admin Dashboard", "Post Categories & Tags"],
      status: "In Progress",
      github: "#",
      live: "#",
      image: "https://via.placeholder.com/400x250",
      gradient: "from-rose-400 to-red-500",
      category: "content management"
    }
  ];

  const statusFilters = ['all', 'completed', 'in progress'];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => 
        project.status.toLowerCase() === filter.toLowerCase()
      );

  const openProjectModal = (project: Project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <section id="projects" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-gradient-to-b from-white to-amber-50">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12 lg:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <span className="text-amber-600 font-medium text-sm sm:text-base mb-2 inline-block">
              PORTFOLIO
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
              Featured Projects
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg">
              Explore my collection of projects that demonstrate my skills and expertise in modern web development
            </p>
          </motion.div>

          <div className="flex justify-center mt-6">
            <div className="inline-flex bg-white rounded-lg p-1 border border-gray-200 shadow-sm">
              {statusFilters.map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-4 py-2 text-sm font-medium rounded-md capitalize transition-colors ${
                    filter === status
                      ? 'bg-amber-500 text-white'
                      : 'text-gray-600 hover:text-amber-600'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <div 
                className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 h-full flex flex-col cursor-pointer"
                onClick={() => openProjectModal(project)}
              >
                <div className={`h-48 relative overflow-hidden group`}>
                  <div 
                    className={`absolute inset-0 bg-gradient-to-br ${project.gradient} transition-transform duration-500 group-hover:scale-110`}
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${
                      project.status === "Completed" 
                        ? "bg-green-500/90" 
                        : "bg-yellow-500/90"
                    }`}>
                      {project.status}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-amber-600 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {project.description}
                    </p>
                  </div>

                  <div className="mt-4">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 4).map((tech, techIndex) => (
                        <span 
                          key={techIndex}
                          className="px-2.5 py-1 bg-amber-50 text-amber-700 text-xs font-medium rounded-full border border-amber-100"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                      <div className="flex items-center space-x-4">
                        <a 
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-500 hover:text-gray-900 transition-colors p-1"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Github className="h-5 w-5" />
                        </a>
                        {project.live !== '#' && (
                          <a 
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-500 hover:text-gray-900 transition-colors p-1"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ExternalLink className="h-5 w-5" />
                          </a>
                        )}
                      </div>
                      <button className="text-sm font-medium text-amber-600 hover:text-amber-700 transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
              onClick={closeProjectModal}
            >
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative">
                  <button
                    onClick={closeProjectModal}
                    className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
                  >
                    <X className="h-5 w-5 text-gray-600" />
                  </button>

                  <div className={`h-64 w-full bg-gradient-to-r ${selectedProject.gradient} relative`}>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                      <h3 className="text-2xl font-bold text-white">
                        {selectedProject.title}
                      </h3>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center space-x-4 mb-6">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        selectedProject.status === "Completed" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {selectedProject.status}
                      </span>
                      <div className="flex items-center space-x-4">
                        <a 
                          href={selectedProject.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-700 hover:text-amber-600 transition-colors flex items-center"
                        >
                          <Github className="h-5 w-5 mr-1" /> GitHub
                        </a>
                        {selectedProject.live !== '#' && (
                          <a 
                            href={selectedProject.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-700 hover:text-amber-600 transition-colors flex items-center"
                          >
                            <ExternalLink className="h-5 w-5 mr-1" /> Live Demo
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">Project Description</h4>
                        <p className="text-gray-600 leading-relaxed">
                          {selectedProject.longDescription}
                        </p>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h4>
                        <ul className="space-y-2">
                          {selectedProject.features.map((feature, index) => (
                            <li key={index} className="flex items-start">
                              <span className="text-amber-500 mr-2 mt-1">•</span>
                              <span className="text-gray-600">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">Technologies Used</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedProject.technologies.map((tech, index) => (
                            <span 
                              key={index}
                              className="px-3 py-1 bg-amber-50 text-amber-700 text-sm font-medium rounded-full border border-amber-100"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};


// ==================== ACHIEVEMENTS SECTION COMPONENT ====================
const AchievementsSection: React.FC = () => {
  const achievements: Achievement[] = [
    {
      icon: Award,
      title: "",
      description: "Developed various projects across different technologies",
      value: "10+",
      color: "text-green-600",
      gradient: "from-green-400 to-emerald-500"
    },
    {
      icon: Zap,
      title: "",
      description: "Algorithmic problems solved on various platforms",
      value: "300+",
      color: "text-purple-600",
      gradient: "from-purple-400 to-violet-500"
    },
    // {
    //   icon: Trophy,
    //   title: "",
    //   description: "Achieved top rankings in coding competitions",
    //   value: "Top 10%",
    //   color: "text-amber-600",
    //   gradient: "from-amber-400 to-orange-500"
    // },
    {
      icon: Clock,
      title: "",
      description: "Total hours spent building and improving skills",
      value: "400+",
      color: "text-blue-600",
      gradient: "from-blue-400 to-cyan-500"
    }
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 bg-gradient-to-b from-white/50 to-amber-50">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-12 lg:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="text-amber-600 font-medium text-sm sm:text-base mb-2 inline-block tracking-wider">
              MY JOURNEY
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-gray-900">
              My <span className="text-amber-600">Achievements</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-base sm:text-lg">
              Milestones and recognition in my programming journey
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.03 }}
              className="relative"
            >
              <motion.div
                className="bg-white/70 backdrop-blur-sm border border-amber-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col"
                whileHover={{ y: -5 }}
              >
                {/* Achievement Icon */}
                <div className="p-6 text-center">
                  <div className={`w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br ${achievement.gradient} rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                    <achievement.icon className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                  </div>
                  
                  {/* Value */}
                  <div className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1 sm:mb-2">{achievement.value}</div>
                  
                  {/* Title */}
                  <div className="text-xs sm:text-sm text-gray-500 mb-1">{achievement.title}</div>
                  
                  {/* Description */}
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                    {achievement.description}
                  </p>
                </div>
                
                {/* Badge */}
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${achievement.color}`}>
                    {achievement.title}
                  </span>
                </div>
                
                {/* Hover Overlay */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6 pointer-events-none"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 0.1 }}
                >
                  <div className="text-white">
                    <h4 className="text-lg font-bold mb-2">Key Achievement</h4>
                    <p className="text-sm">{achievement.description}</p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
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

      if (response.data && response.data.success) {
        navigate('/thankyou');
        toast({
          title: "Message Sent!",
          description: "Thank you for your message. I'll get back to you soon.",
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
          if (status === 422 && data && Array.isArray(data.data)) {
            const serverErrors: FormErrors = { name: '', email: '', subject: '', message: '' };
            data.data.forEach((errorObj: ContactValidationError) => {
              const fieldName = Object.keys(errorObj)[0];
              serverErrors[fieldName as keyof FormErrors] = errorObj[fieldName];
            });
            setErrors(serverErrors);
            setAlertMessage({ type: 'error', message: 'Please fix the validation errors and try again.' });
          } else if (status === 429) {
            setAlertMessage({ type: 'error', message: 'Too many messages sent. Please wait before sending another message.' });
          } else {
            setAlertMessage({ type: 'error', message: data?.message || `Server error (${status}). Please try again later.` });
          }
        } else {
          setAlertMessage({ type: 'error', message: 'Network error. Please check your internet connection.' });
        }
      } else {
        setAlertMessage({ type: 'error', message: 'An unexpected error occurred. Please try again.' });
      }
    } finally {
      setIsSending(false);
    }
  };

  const socialLinks = [
    {
      href: "https://wa.me/919507272341",
      label: "WhatsApp",
      hoverColor: "hover:bg-[#25D366]",
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      )
    },
    {
      href: "https://x.com/SuraJzRt",
      label: "X (Twitter)",
      hoverColor: "hover:bg-black",
      icon: (props: React.SVGProps<SVGSVGElement>) => (
        <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      )
    },
    {
      href: "https://github.com/Suraj1819",
      label: "GitHub",
      hoverColor: "hover:bg-[#24292e]",
      icon: Github
    },
    {
      href: "https://www.linkedin.com/in/suraj-kumar-72847b30a/",
      label: "LinkedIn",
      hoverColor: "hover:bg-[#0077b5]",
      icon: Linkedin
    }
  ];

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
                { icon: Calendar, label: "Contact Me", value: "Contact", href: "/contact" }
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
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 sm:w-12 sm:h-12 bg-gray-100/0 text-gray-500 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm hover:shadow-md hover:text-white ${social.hoverColor}`}
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
                    placeholder="e.g., Project Collaboration "
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
                <p className="text-[10px] sm:text-xs text-gray-500"></p>
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
        <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-amber-200 shadow-sm py-1.5">
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
            {["home", "about", "skills", "services", "projects", "contact"].map(
              (item) => (
                <a
                  key={item}
                  href={`#${item}`}
                  className="relative py-2 px-2 lg:px-3 rounded-lg transition-all duration-300 hover:scale-105 text-gray-700 hover:text-amber-600 hover:bg-amber-50 font-medium capitalize text-sm lg:text-base"
                >
                  {item}
                </a>
              )
            )}

            {/* Hire Me Button - Desktop */}
            <Link
              to="/contact"
              onClick={closeMobileMenu}
              className="px-4 py-2 text-sm lg:text-base font-semibold rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:scale-110 transition-transform duration-300"
            >
              Hire Me
            </Link>

            {/* Heart Link (kept from original) */}
            <Link
              to="/home"
              className="p-2 rounded-full bg-gradient-to-r from-red-400 to-pink-500 hover:from-red-500 hover:to-pink-600 transition-all hover:scale-110"
            >
              <Heart className="h-4 w-4 lg:h-5 lg:w-5 text-white fill-white" />
            </Link>

            {/* Social Icons */}
            <div className="flex items-center space-x-2 ml-2 pl-2 border-l border-amber-200">
              {/* GitHub */}
              <a
                href="https://github.com/your-profile"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-full text-gray-700 hover:text-black hover:bg-gray-200 transition-all duration-300 hover:scale-110"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com/in/your-profile"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-full text-blue-700 hover:text-white hover:bg-blue-700 transition-all duration-300 hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>

              {/* Twitter */}
              <a
                href="https://twitter.com/your-profile"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-full text-sky-500 hover:text-white hover:bg-sky-500 transition-all duration-300 hover:scale-110"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>

              {/* Mail */}
              <a
                href="mailto:your-email@example.com"
                className="p-2 rounded-full text-red-500 hover:text-white hover:bg-red-500 transition-all duration-300 hover:scale-110"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMobileMenu}
              className="p-1.5 sm:p-2 hover:bg-amber-50 rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5 sm:h-6 sm:w-6" />
              ) : (
                <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-amber-200 animate-fade-in">
          <div className="px-3 sm:px-4 lg:px-6 py-3 sm:py-4 space-y-1">
            {["home", "about", "skills", "services", "projects", "contact"].map(
              (item) => (
                <a
                  key={item}
                  href={`#${item}`}
                  className="block py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg transition-all duration-300 hover:scale-105 text-gray-700 hover:text-amber-600 hover:bg-amber-50 font-medium text-sm sm:text-base capitalize"
                  onClick={closeMobileMenu}
                >
                  {item}
                </a>
              )
            )}

            {/* Hire Me Button - Mobile */}
            <Link
              to="/contact"
              onClick={closeMobileMenu}
              className="block w-full text-center mt-2 px-4 py-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold text-sm sm:text-base hover:scale-105 transition-transform duration-300"
            >
              Hire Me
            </Link>

            {/* Heart Link (kept from original) */}
            <Link
              to="/home"
              className="flex items-center justify-center p-2.5 sm:p-3 rounded-full bg-gradient-to-r from-red-400 to-pink-500 hover:from-red-500 hover:to-pink-600 transition-all hover:scale-110 mt-4"
              onClick={closeMobileMenu}
            >
              <Heart className="h-4 w-4 sm:h-5 sm:w-5 text-white fill-white" />
            </Link>

            {/* Social Icons - Mobile */}
            <div className="flex items-center justify-center space-x-3 mt-4">
              <a
                href="https://github.com/your-profile"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-full text-gray-700 hover:text-black hover:bg-gray-200 transition-all duration-300 hover:scale-110"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>

              <a
                href="https://linkedin.com/in/your-profile"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-full text-blue-700 hover:text-white hover:bg-blue-700 transition-all duration-300 hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>

              <a
                href="https://twitter.com/your-profile"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-full text-sky-500 hover:text-white hover:bg-sky-500 transition-all duration-300 hover:scale-110"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>

              <a
                href="mailto:your-email@example.com"
                className="p-2 rounded-full text-red-500 hover:text-white hover:bg-red-500 transition-all duration-300 hover:scale-110"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
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