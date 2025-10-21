import React, { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import type { AxiosResponse, AxiosInstance } from 'axios';
import {
  ArrowRight, Code, Star, Sparkles, Download, Mail,
  GraduationCap, Heart, Target, Users, Award, BookOpen,
  Github, Linkedin, ExternalLink, Calendar, Clock,
  Database, Server, Brain, Zap,
  Trophy, Globe, ExternalLinkIcon, Gamepad2Icon, DatabaseZap,
  Send, Code2, AlertCircle, CheckCircle
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { useToast } from '../hooks/use-toast';
import Footer from '../components/Footer';
import ThankYou from './Thankyou';

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

interface Value {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  color: string;
}

interface Skill {
  name: string;
  level: number;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  projects: string;
}

interface Service {
  icon: React.ComponentType<{ className?: string }>;
  iconBg: string;
  title: string;
  description: string;
  features: string[];
  price: string;
  duration: string;
  projects: string;
}

interface Project {
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  features: string[];
  gradient: string;
  status: string;
  users: string;
  github: string;
  live: string;
}

interface Certificate {
  title: string;
  issuer: string;
  year: string;
  description: string;
  skills: string[];
  icon: React.ComponentType<{ className?: string }>;
  credentialId: string;
}

interface Achievement {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  metric: string;
}

// ==================== API CONFIGURATION ====================
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8081/api/v1";

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

  @keyframes pageSlideUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-float { animation: float 3s ease-in-out infinite; }
  .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
  .animate-scale-in { animation: scale-in 0.5s ease-out; }
  .animate-bounce-gentle { animation: bounce-gentle 2s ease-in-out infinite; }
  .animate-fade-in { animation: fadeIn 0.3s ease-out; }
  .animate-slide-in { animation: slideIn 0.5s ease-out; }
  .animate-slide-up { animation: slideUp 0.5s ease-out; }
  .page-entrance { animation: pageSlideUp 0.8s ease-out forwards; }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(40px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .animate-fade-in-up {
    animation: fadeInUp 0.8s ease-out forwards;
  }

  .animate-slide-left {
    animation: slideInLeft 0.8s ease-out forwards;
  }

  .animate-slide-right {
    animation: slideInRight 0.8s ease-out forwards;
  }

  .animate-on-visible {
    opacity: 0;
    transform: translateY(30px);
    transition: all 0.8s ease-out;
  }
  
  .animate-on-visible.visible {
    opacity: 1;
    transform: translateY(0);
  }

  html {
    scroll-behavior: smooth;
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
const Home: React.FC = () => {
  const { toast } = useToast();
  const [showThankYou, setShowThankYou] = useState<boolean>(false);
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
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  // Simulate loading and trigger animations
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Small delay to ensure DOM is ready before starting animations
      setTimeout(() => setIsVisible(true), 100);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showThankYou) {
      const thankYouTimer = setTimeout(() => {
        setShowThankYou(false);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setErrors({ name: '', email: '', subject: '', message: '' });
        setAlertMessage({ type: '', message: '' });
      }, 5000);
      return () => clearTimeout(thankYouTimer);
    }
  }, [showThankYou]);

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
        setShowThankYou(true);
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

  // ==================== DATA DEFINITIONS ====================
  const values: Value[] = [
    {
      icon: Heart,
      title: "Passion",
      description: "Deeply passionate about technology and helping others learn",
      color: "text-red-500 bg-red-100"
    },
    {
      icon: Target,
      title: "Dedication",
      description: "Committed to excellence and continuous improvement",
      color: "text-amber-500 bg-amber-100"
    },
    {
      icon: Users,
      title: "Teaching",
      description: "Love sharing knowledge",
      color: "text-orange-500 bg-orange-100"
    },
    {
      icon: BookOpen,
      title: "Learning",
      description: "Always eager to explore new technologies and concepts",
      color: "text-yellow-500 bg-yellow-100"
    },
    {
      icon: Gamepad2Icon,
      title: "Gaming",
      description: "Gaming isn't just a hobby for me, it's my passion.",
      color: "text-purple-500 bg-purple-100"
    }
  ];

  const skills: Skill[] = [
    {
      name: "React.js",
      level: 72,
      category: "Frontend",
      icon: Code,
      description: "Building interactive UIs with hooks, context, and modern patterns",
      projects: "15+ projects"
    },
    {
      name: "Node.js",
      level: 88,
      category: "Backend",
      icon: Server,
      description: "RESTful APIs, microservices, and server-side applications",
      projects: "12+ projects"
    },
    {
      name: "MongoDB",
      level: 85,
      category: "Database",
      icon: Database,
      description: "NoSQL database design, aggregation pipelines, and optimization",
      projects: "10+ projects"
    },
    {
      name: "Python",
      level: 75,
      category: "Programming",
      icon: Brain,
      description: "Data structures, algorithms, automation, and AI/ML basics",
      projects: "50+ solutions"
    },
    {
      name: "C++",
      level: 83,
      category: "Programming",
      icon: Zap,
      description: "Competitive programming, DSA, and system-level programming",
      projects: "100+ problems"
    },
    {
      name: "Express.js",
      level: 87,
      category: "Backend",
      icon: Globe,
      description: "Web servers, middleware, authentication, and API development",
      projects: "8+ APIs"
    },
    {
      name: "JavaScript",
      level: 80,
      category: "Programming",
      icon: Code,
      description: "ES6+, async programming, and modern JS frameworks",
      projects: "20+ projects"
    },
    {
      name: "Git & GitHub",
      level: 80,
      category: "Tools",
      icon: Github,
      description: "Version control, collaboration, and project management",
      projects: "Daily usage"
    },
    {
      name: "PostgreSQL",
      level: 60,
      category: "Database",
      icon: DatabaseZap,
      description: "SQL database design",
      projects: "Daily usage"
    }
  ];

  const services: Service[] = [
    {
      icon: Code,
      iconBg: "from-red-500 to-pink-600",
      title: "Full-Stack Web Development",
      description: "Complete web solutions from concept to deployment using MERN stack, including responsive design, API integration, database management, and modern deployment practices.",
      features: ["React.js & Next.js", "Node.js & Express", "MongoDB & PostgreSQL", "AWS/Vercel Deployment", "Mobile-First Design", "Express.js"],
      price: "",
      duration: "2-6 weeks",
      projects: "5+ completed"
    },
    {
      icon: GraduationCap,
      iconBg: "from-green-500 to-emerald-600",
      title: "Programming Tutoring & Mentorship",
      description: "Comprehensive programming education covering DSA, competitive programming, web development, and interview preparation with personalized learning paths.",
      features: ["C++ & Python Mastery", "Data Structures & Algorithms", "LeetCode Problem Solving", "Interview Preparation", "Project Guidance"],
      price: "",
      duration: "Flexible sessions",
      projects: ".../"
    }
  ];

  const projects: Project[] = [
    {
      title: "PassGenie - Random Password Generator",
      description: "A modern and secure password generator built with React and Tailwind CSS, offering customizable options and responsive design.",
      longDescription: "PassGenie is a powerful and secure web application designed to generate strong, unique, and customizable passwords instantly.",
      technologies: [
        "React",
        "Tailwind CSS",
        "JavaScript (ES6+)",
        "HTML5"
      ],
      features: [
        "Random Password Generation",
        "Customizable Length",
        "Special Characters Support",
        "Copy to Clipboard",
        "Responsive Design"
      ],
      gradient: "from-pink-500 to-red-600",
      status: "Completed",
      users: "me only",
      github: "https://github.com/Suraj1819/RandomPasswordGenerator.site",
      live: "https://passgenie.demo.com"
    },
    {
      title: "ShopEase - E-Commerce Platform",
      description: "Modern e-commerce solution with advanced features including AI-powered recommendations and secure payment processing.",
      longDescription: "A full-featured e-commerce platform built with modern technologies, featuring responsive design and robust admin tools.",
      technologies: ["React", "Node.js", "MongoDB", "Stripe", "AWS S3"],
      features: ["AI Recommendations", "Payment Gateway", "Inventory Management", "Order Tracking", "Admin Dashboard"],
      gradient: "from-green-400 to-emerald-600",
      status: "In Progress",
      users: "1000+ customers in Future",
      github: "https://github.com/Suraj1819",
      live: "#"
    },
    {
      title: "PyCalc - Tkinter Calculator",
      description: "A simple and efficient calculator built using Python's Tkinter library for GUI applications.",
      longDescription: "PyCalc is a lightweight calculator application developed with Python Tkinter.",
      technologies: ["Python", "Tkinter"],
      features: ["Basic Arithmetic", "User-friendly Interface", "Responsive Buttons", "Lightweight App"],
      gradient: "from-blue-400 to-cyan-600",
      status: "Completed",
      users: "Only I am using LOL 😂",
      github: "https://github.com/Suraj1819/SimpleCalculator",
      live: "N/A"
    }
  ];

  const certificates: Certificate[] = [
    {
      title: "Advanced Data Structures & Algorithms",
      issuer: "GeeksforGeeks",
      year: "2024",
      description: "Comprehensive course covering advanced DSA concepts and optimization techniques.",
      skills: ["Dynamic Programming", "Graph Algorithms", "Tree Structures", "Optimization"],
      icon: Trophy,
      credentialId: "GFG-DSA-2024-001"
    },
    {
      title: "Full Stack Web Development Certification",
      issuer: "GeeksforGeeks",
      year: "2024",
      description: "Complete full-stack development program covering frontend frameworks and backend development.",
      skills: ["React.js", "Node.js", "MongoDB", "API Development"],
      icon: Award,
      credentialId: "FCC-FSWD-2024-001"
    },
    {
      title: "Cybersecurity Essentials Certification",
      issuer: "Simplilearn | Skillup",
      year: "2024",
      description: "Comprehensive course on cybersecurity fundamentals and threat analysis.",
      skills: ["Network Security", "Threat Analysis", "Ethical Hacking", "Risk Management"],
      icon: Award,
      credentialId: "8289220"
    },
    {
      title: "Microsoft Excel Mastery Certification",
      issuer: "LearnX",
      year: "2024",
      description: "In-depth Excel training covering advanced formulas and data analysis.",
      skills: ["Advanced Formulas", "PivotTables", "XLOOKUP", "Data Analysis", "Macros & VBA"],
      icon: Award,
      credentialId: "a3yydcv6ub8"
    },
    {
      title: "50 Days Streak Badge",
      issuer: "LeetCode",
      year: "2025",
      description: "Earned by consistently solving coding problems every day.",
      skills: ["Problem Solving", "Data Structures", "Algorithms", "Consistency"],
      icon: Award,
      credentialId: "LEETCODE-STREAK-50-2025"
    },
    {
      title: "100 Days Streak Badge",
      issuer: "LeetCode",
      year: "2025",
      description: "Earned by consistently solving coding problems every day for 100 days.",
      skills: ["Problem Solving", "Data Structures", "Algorithms", "Consistency"],
      icon: Award,
      credentialId: "LEETCODE-STREAK-100-2025"
    },
    {
      title: "Python Certification",
      issuer: "LearnX",
      year: "2024",
      description: "Specialized certification in Python programming for data science.",
      skills: ["Python", "NumPy", "Pandas"],
      icon: Brain,
      credentialId: "a3yydcv6ub8"
    }
  ];

  const achievements: Achievement[] = [
    {
      title: "Top 5% on LeetCode",
      description: "Ranked in top 5% globally with 500+ problems solved",
      icon: Trophy,
      metric: "300+ Problems"
    },
    {
      title: "Open Source Contributor",
      description: "Contributing to various open-source projects on GitHub",
      icon: Github,
      metric: "50+ Contributions"
    }
  ];

  // Loading State
  if (isLoading) {
    return (
      <div
        className="min-h-screen bg-gradient-to-br from-cream-50 via-cream-100 to-amber-50 flex items-center justify-center"
        aria-busy="true"
        aria-live="polite"
      >
        <div className="relative">
          <div className="absolute -inset-10 bg-gradient-to-tr from-amber-500/20 via-orange-400/20 to-yellow-400/20 blur-3xl rounded-full animate-pulse" />
          <div className="relative z-10 flex flex-col items-center">
            <div className="relative w-28 h-28">
              <div className="absolute inset-0 rounded-full border-4 border-amber-200/70" />
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-amber-500 border-r-amber-500 animate-spin" />
              <div className="absolute inset-2 rounded-full border-4 border-transparent border-b-orange-500 border-l-orange-500 animate-spin [animation-direction:reverse] [animation-duration:2.2s]" />
              <div className="absolute inset-0 animate-spin [animation-duration:3s]">
                <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-amber-500 rounded-full shadow-md" />
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-orange-500 rounded-full shadow-md" />
              </div>
            </div>
            <div className="mt-6 text-center">
              <div className="flex justify-center items-baseline gap-3">
                <p className="text-2xl font-semibold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  Loading Portfolio
                </p>
                <div className="flex items-center gap-1.5" aria-hidden="true">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-orange-500 animate-bounce [animation-delay:150ms]" />
                  <span className="w-2 h-2 rounded-full bg-yellow-500 animate-bounce [animation-delay:300ms]" />
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce [animation-delay:450ms]" />
                </div>
              </div>
              <p className="mt-3 text-sm text-gray-600">
                Preparing amazing content for you...
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showThankYou) {
    try {
      return <ThankYou />;
    } catch (error: unknown) {
      console.error('Error rendering ThankYou component:', error);
      return (
        <div className="min-h-screen bg-gradient-to-br from-cream-50 via-cream-100 to-amber-50 flex items-center justify-center px-4">
          <Card className="bg-white/70 backdrop-blur-sm border border-amber-200 p-6 sm:p-8 max-w-md w-full">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl text-gray-800">Something Went Wrong</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm sm:text-base text-gray-600 mb-4">An error occurred while displaying the thank you message. Please try again.</p>
              <Button
                onClick={() => setShowThankYou(false)}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white"
              >
                Back to Contact Form
              </Button>
            </CardContent>
          </Card>
        </div>
      );
    }
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-cream-50 via-cream-100 to-amber-50 text-foreground page-entrance`}>
      <style>{customStyles}</style>

      {/* Enhanced Hero Section */}
      <section className="relative pt-20 sm:pt-24 pb-12 sm:pb-16 px-4 sm:px-6 overflow-hidden min-h-screen flex items-center">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-48 sm:w-72 h-48 sm:h-72 bg-amber-300/20 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute top-20 sm:top-40 right-5 sm:right-10 w-64 sm:w-96 h-64 sm:h-96 bg-orange-300/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-10 sm:bottom-20 left-1/4 sm:left-1/3 w-56 sm:w-80 h-56 sm:h-80 bg-yellow-300/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Floating Elements - Hidden on mobile */}
        <div className="absolute inset-0 pointer-events-none hidden sm:block">
          <div className="absolute top-32 left-20 animate-float" style={{ animationDelay: '0.3s' }}>
            <div className="w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-r from-amber-400 to-orange-400 rounded-lg flex items-center justify-center shadow-lg">
              <Code className="h-6 sm:h-8 w-6 sm:w-8 text-white" />
            </div>
          </div>
          <div className="absolute top-48 right-32 animate-float" style={{ animationDelay: '0.7s' }}>
            <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center shadow-lg">
              <Sparkles className="h-5 sm:h-6 w-5 sm:w-6 text-white" />
            </div>
          </div>
          <div className="absolute bottom-40 left-16 animate-float" style={{ animationDelay: '1s' }}>
            <div className="w-12 sm:w-14 h-12 sm:h-14 bg-gradient-to-r from-yellow-400 to-amber-400 rounded-lg rotate-12 flex items-center justify-center shadow-lg">
              <Star className="h-6 sm:h-7 w-6 sm:w-7 text-white" />
            </div>
          </div>
        </div>

        <div className="container mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-12">
            <div className="w-full lg:w-1/2 space-y-6 sm:space-y-8 animate-fade-in-up text-center lg:text-left">
              {/* Status Badge */}
              <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm border border-amber-200 rounded-full px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm shadow-sm animate-slide-up">
                <div className="w-1.5 sm:w-2 h-1.5 sm:h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-gray-700 font-medium">Available for opportunities</span>
              </div>

              <div className="space-y-4 sm:space-y-6">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold leading-tight tracking-tight animate-slide-up" style={{ animationDelay: '0.2s' }}>
                  <span className="block text-gray-800 mb-1 sm:mb-2">Hello,</span>
                  <span className="block bg-gradient-to-r from-amber-600 via-orange-600 to-red-500 bg-clip-text text-transparent">
                    I'm Suraj
                  </span>
                </h1>

                <div className="space-y-3 sm:space-y-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
                  <p className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-800">
                    Full-Stack Developer
                  </p>
                  <p className="text-base sm:text-lg lg:text-xl text-gray-600 font-medium">
                    MERN Stack • Python • C++ • DSA Expert
                  </p>
                  <div className="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-3">
                    {['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Tailwindcss'].map((tech, idx) => (
                      <Badge key={idx} variant="secondary" className="bg-amber-100 text-amber-700 border-amber-200 px-2 sm:px-4 py-1 sm:py-2 hover:bg-amber-200 transition-colors text-xs sm:text-sm font-medium">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>

                <p className="text-sm sm:text-base lg:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed animate-slide-up" style={{ animationDelay: '0.6s' }}>
                  I'm a B.Tech student passionate about full-stack development and problem-solving. I work with MERN Stack, Tailwind CSS, PostgreSQL, C++, and Python to build real-world projects that push my skills.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start animate-slide-up" style={{ animationDelay: '0.8s' }}>
                <a href="#projects" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base lg:text-lg"
                  >
                    <span>View My Projects</span>
                    <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                  </Button>
                </a>
                <a href="#resume" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto border-amber-300 text-gray-700 hover:bg-amber-50 backdrop-blur-sm bg-white/50 hover:border-amber-400 transition-all duration-300 hover:scale-105 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base lg:text-lg"
                  >
                    <Download className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                    Download Resume
                  </Button>
                </a>
              </div>

              <div className="flex justify-center lg:justify-start space-x-4 sm:space-x-6 animate-slide-up" style={{ animationDelay: '1s' }}>
                {[
                  { href: "https://github.com/Suraj1819", icon: Github },
                  { href: "https://www.linkedin.com/in/suraj-kumar-72847b30a/", icon: Linkedin },
                  { href: "https://leetcode.com/u/Suraj_1819/", icon: Code }
                ].map((social, idx) => (
                  <a key={idx} href={social.href} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-amber-600 transition-all duration-300 hover:scale-110 p-2 sm:p-3 rounded-full hover:bg-amber-100 shadow-sm">
                    <social.icon className="h-5 w-5 sm:h-6 sm:w-6" />
                  </a>
                ))}
              </div>
            </div>

            <div className="w-full lg:w-1/2 flex justify-center mt-8 lg:mt-0">
              <div className="relative animate-slide-right" style={{ animationDelay: '0.5s' }}>
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 rounded-full blur-xl opacity-30 animate-pulse-slow"></div>
                <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-gradient-to-br from-amber-400 via-orange-400 to-red-400 rounded-full flex items-center justify-center shadow-2xl hover:shadow-3xl transition-shadow duration-500">
                  <div className="w-56 h-56 sm:w-72 sm:h-72 lg:w-88 lg:h-88 bg-white rounded-full flex items-center justify-center border-4 border-amber-200 overflow-hidden">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0DIfnIJb34lm7mYgKzTqIbWfhjNdqmRY52g&s"
                      alt="Profile Picture"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="absolute -top-2 sm:-top-4 -right-2 sm:-right-4 w-14 h-14 sm:w-20 sm:h-20 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center animate-bounce-gentle shadow-lg">
                  <span className="text-white font-bold text-xs sm:text-sm">2027</span>
                </div>
                {/* Orbit Elements - Hidden on mobile */}
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

      {/* Quick Stats Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {[
              { value: "10+", label: "Projects Completed" },
              { value: "Kidding None", label: "Students Tutored" },
              { value: "10+", label: "Technologies" },
              { value: "2027", label: "Graduation Year" }
            ].map((stat, idx) => (
              <div key={idx} className={`text-center animate-on-visible ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: `${idx * 0.2}s` }}>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-amber-600 mb-1 sm:mb-2">{stat.value}</div>
                <div className="text-xs sm:text-sm lg:text-base text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
        <div className="container mx-auto">
          <div className={`text-center mb-10 sm:mb-12 lg:mb-16 animate-on-visible ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: '0.1s' }}>
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6">About Me</h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
              A passionate developer on a mission to create innovative solutions
              and help others achieve their programming goals.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center mb-12 sm:mb-16 lg:mb-20">
            <div className="space-y-4 sm:space-y-6 animate-slide-left">
              <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
                <GraduationCap className="h-6 w-6 sm:h-8 sm:w-8 text-amber-600" />
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-800">My Journey</h3>
              </div>

              <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed">
                I'm Suraj Kumar, a dedicated <span className='text-lg sm:text-xl lg:text-2xl'>3<sup>rd</sup></span>-year Computer Science and Engineering student at
                Government Engineering College, Vaishali. My journey in technology began with curiosity
                and has evolved into a deep passion for creating meaningful digital experiences.
              </p>

              <p className="text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed">
                What sets me apart is not just my technical skills in C++, Python, and modern web
                technologies, but my genuine love for teaching and helping others succeed.
              </p>
            </div>

            <div className="animate-slide-right">
              <div className="relative">
                <div className="w-full h-64 sm:h-80 lg:h-96 bg-gradient-to-br from-amber-400 via-orange-400 to-red-400 rounded-2xl shadow-2xl hover:scale-105 duration-300 transition-all">
                  <div className="absolute inset-4 bg-white rounded-xl flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                        <GraduationCap className="h-12 w-12 sm:h-16 sm:w-16 text-amber-600" />
                      </div>
                      <h4 className="text-lg sm:text-xl font-bold text-gray-800 mb-1 sm:mb-2">Student & Educator</h4>
                      <p className="text-xs sm:text-sm text-gray-600">Bridging the gap between learning and teaching</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {values.map((value, index) => (
              <Card key={index} className={`bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-on-visible ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: `${index * 0.1}s` }}>
                <CardHeader className="text-center p-4 sm:p-6">
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 ${value.color} rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4`}>
                    <value.icon className="h-6 w-6 sm:h-8 sm:w-8" />
                  </div>
                  <CardTitle className="text-base sm:text-lg lg:text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <CardDescription className="text-center text-gray-600 text-xs sm:text-sm">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className={`text-center mb-10 sm:mb-12 lg:mb-16 animate-on-visible ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: '0.2s' }}>
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6">My Skills</h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Technologies and expertise I've developed throughout my journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {skills.map((skill, index) => (
              <Card key={index} className={`bg-white/70 backdrop-blur-sm border border-amber-200 hover:shadow-xl transition-all duration-300 hover:scale-105 group animate-on-visible ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: `${index * 0.1}s` }}>
                <CardHeader className="pb-3 sm:pb-4 p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                        <skill.icon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-base sm:text-lg">{skill.name}</CardTitle>
                        <Badge variant="secondary" className="bg-amber-100 text-amber-700 text-[10px] sm:text-xs">
                          {skill.category}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl sm:text-2xl font-bold text-amber-600">{skill.level}%</div>
                      <div className="text-[10px] sm:text-xs text-gray-500">{skill.projects}</div>
                    </div>
                  </div>

                  <div className="w-full bg-amber-200 rounded-full h-2 sm:h-3 mb-2 sm:mb-3">
                    <div
                      className="bg-gradient-to-r from-amber-500 to-orange-500 h-2 sm:h-3 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <CardDescription className="text-gray-600 leading-relaxed text-xs sm:text-sm">
                    {skill.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
        <div className="container mx-auto">
          <div className={`text-center mb-10 sm:mb-12 lg:mb-16 animate-on-visible ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: '0.3s' }}>
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6">My Services</h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Comprehensive solutions for your digital needs and learning goals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {services.map((service, index) => (
              <Card key={index} className={`bg-white/70 backdrop-blur-sm border border-amber-200 hover:shadow-xl transition-all duration-300 hover:scale-105 group overflow-hidden animate-on-visible ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: `${index * 0.2}s` }}>
                <CardHeader className="pb-3 sm:pb-4 p-4 sm:p-6">
                  <div className="flex items-center space-x-3 sm:space-x-4 mb-3 sm:mb-4">
                    <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r ${service.iconBg} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}>
                      <service.icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-base sm:text-lg lg:text-xl mb-1 sm:mb-2">{service.title}</CardTitle>
                      <div className="flex items-center space-x-3 sm:space-x-4 text-xs sm:text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span>{service.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Trophy className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span>{service.projects}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
                  <CardDescription className="text-gray-600 leading-relaxed text-xs sm:text-sm">
                    {service.description}
                  </CardDescription>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-800 text-xs sm:text-sm">Key Features:</h4>
                    <div className="grid grid-cols-1 gap-1.5 sm:gap-2">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"></div>
                          <span className="text-xs sm:text-sm text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-amber-200">
                    <div>
                      <div className="text-xl sm:text-2xl font-bold text-amber-700">{service.price}</div>
                      <div className="text-[10px] sm:text-xs text-gray-500">{service.duration}</div>
                    </div>
                    <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white transition-all duration-300 hover:scale-105 text-xs sm:text-sm">
                      Get Started
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className={`text-center mb-10 sm:mb-12 lg:mb-16 animate-on-visible ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: '0.4s' }}>
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6">My Projects</h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              A showcase of my recent work and creative solutions
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {projects.map((project, index) => (
              <Card key={index} className={`bg-white/70 backdrop-blur-sm border border-amber-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 group animate-on-visible ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: `${index * 0.2}s` }}>
                <div className={`h-32 sm:h-40 lg:h-48 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                    <Badge className={`bg-white/20 text-white border-white/30 text-xs sm:text-sm ${
                      project.status === 'Completed' ? 'bg-green-500/20 border-green-300' :
                        project.status === 'In Progress' ? 'bg-yellow-500/20 border-yellow-300' :
                          'bg-blue-500/20 border-blue-300'
                    }`}>
                      {project.status}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-4 sm:p-6">
                  <div className="space-y-3 sm:space-y-4">
                    <div>
                      <CardTitle className="text-base sm:text-lg lg:text-xl mb-1 sm:mb-2 group-hover:text-amber-600 transition-colors">
                        {project.title}
                      </CardTitle>
                      <CardDescription className="text-gray-600 leading-relaxed mb-2 sm:mb-3 text-xs sm:text-sm">
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
                          <Badge key={techIndex} variant="secondary" className="bg-amber-100 text-amber-700 text-[10px] sm:text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-xs sm:text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Users className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span>{project.users}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span>{project.status}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 sm:gap-3 pt-3 sm:pt-4 border-t border-amber-200">
                      <Button size="sm" className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white flex-1 transition-all hover:scale-105 duration-300 text-xs sm:text-sm">
                        <ExternalLinkIcon className="mr-1.5 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
                        Live Demo
                      </Button>
                      <Button size="sm" variant="outline" className="border-amber-300 text-gray-700 hover:bg-amber-50 transition-all hover:scale-110 duration-300">
                        <a href={project.github} target='_blank' rel="noopener noreferrer"><Github className="h-3 w-3 sm:h-4 sm:w-4" /></a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Resume & Certificates Section */}
      <section id="resume" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
        <div className="container mx-auto">
          <div className={`text-center mb-10 sm:mb-12 lg:mb-16 animate-on-visible ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: '0.5s' }}>
            <div className="inline-flex items-center justify-center space-x-2 sm:space-x-3 mb-3 sm:mb-4">
              <GraduationCap className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-amber-600" />
              <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold">Resume</h2>
            </div>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              My professional journey, qualifications, and achievements in technology
            </p>
          </div>

          {/* Education Section */}
          <div className="mb-10 sm:mb-12 lg:mb-16">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8 flex items-center justify-center animate-on-visible ${isVisible ? 'visible' : ''}">
              <GraduationCap className="h-6 w-6 sm:h-8 sm:w-8 text-amber-600 mr-2 sm:mr-3" />
              Education
            </h3>
            <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
              {[
                {
                  title: "Matriculation (10th)",
                  school: "SRT School",
                  percentage: "82.6/100",
                  year: "2020",
                  courses: ["Hindi", "English", "Maths", "Science", "Computer-IT", "Sanskrit"]
                },
                {
                  title: "Intermediate (12th)",
                  school: "SRT School",
                  percentage: "83.2/100",
                  year: "2022",
                  courses: ["Maths", "Physics", "Chemistry", "English", "Computer-IT"]
                },
                {
                  title: "Bachelor of Technology in CSE",
                  school: "Government Engineering College",
                  percentage: "CGPA: 8.54/10",
                  year: "2023 - 2027",
                  courses: ["Data Structures", "Algorithms", "Web Development", "Database Systems", "Operating Systems"]
                }
              ].map((edu, idx) => (
                <Card key={idx} className={`bg-white/70 backdrop-blur-sm border-2 border-amber-300 hover:shadow-xl transition-all duration-300 hover:scale-105 animate-on-visible ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: `${idx * 0.1}s` }}>
                  <CardContent className="p-4 sm:p-6 lg:p-8">
                    <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
                      <div className="md:col-span-2">
                        <h4 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800 mb-1 sm:mb-2">{edu.title}</h4>
                        <p className="text-base sm:text-lg text-amber-600 font-semibold mb-1 sm:mb-2">{edu.school}</p>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                          <Badge className="bg-green-100 text-green-700 text-xs sm:text-sm">{edu.percentage}</Badge>
                          <Badge className="bg-blue-100 text-blue-700 text-xs sm:text-sm">First Division</Badge>
                        </div>
                        <div className="space-y-1 sm:space-y-2">
                          <p className="text-xs sm:text-sm text-gray-700"><strong>Relevant Coursework:</strong></p>
                          <div className="flex flex-wrap gap-1.5 sm:gap-2">
                            {edu.courses.map((course, courseIdx) => (
                              <Badge key={courseIdx} variant="secondary" className="bg-gray-100 text-gray-800 text-[10px] sm:text-xs">
                                {course}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col justify-between items-end">
                        <div className="text-right">
                          <div className="text-2xl sm:text-3xl font-bold text-amber-600 mb-1 sm:mb-3">{edu.year}</div>
                        </div>
                        <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                          <GraduationCap className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-white" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Certificates Section */}
          <div className="mb-10 sm:mb-12 lg:mb-16">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8 flex items-center justify-center animate-on-visible ${isVisible ? 'visible' : ''}">
              <Award className="h-6 w-6 sm:h-8 sm:w-8 text-amber-600 mr-2 sm:mr-3" />
              Professional Certifications
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
              {certificates.map((cert, index) => (
                <Card key={index} className={`bg-white/70 backdrop-blur-sm border border-amber-200 hover:shadow-xl transition-all duration-300 hover:scale-105 group animate-on-visible ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: `${index * 0.1}s` }}>
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-start justify-between mb-3 sm:mb-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                        <cert.icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                      </div>
                      <Badge className="bg-amber-100 text-amber-700 text-xs sm:text-sm">{cert.year}</Badge>
                    </div>
                    <CardTitle className="text-sm sm:text-base lg:text-lg mb-1 sm:mb-2 group-hover:text-amber-600 transition-colors">{cert.title}</CardTitle>
                    <p className="text-amber-600 font-semibold text-xs sm:text-sm mb-2 sm:mb-3">{cert.issuer}</p>
                    <CardDescription className="text-gray-600 text-[10px] sm:text-xs mb-3 sm:mb-4 leading-relaxed line-clamp-3">
                      {cert.description}
                    </CardDescription>
                    <div className="flex flex-wrap gap-1 mb-3 sm:mb-4">
                      {cert.skills.slice(0, 3).map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="secondary" className="bg-gray-100 text-gray-700 text-[10px] sm:text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    <div className="pt-3 sm:pt-4 border-t border-amber-200">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] sm:text-xs text-gray-500 truncate">ID: {cert.credentialId}</span>
                        <Button size="sm" variant="ghost" className="text-amber-700 hover:bg-amber-50 h-6 sm:h-8 px-1 sm:px-2">
                          <ExternalLink className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Achievements Section */}
          <div className="mb-10 sm:mb-12 lg:mb-16">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8 flex items-center justify-center animate-on-visible ${isVisible ? 'visible' : ''}">
              <Trophy className="h-6 w-6 sm:h-8 sm:w-8 text-amber-600 mr-2 sm:mr-3" />
              Key Achievements
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto">
              {achievements.map((achievement, index) => (
                <Card key={index} className={`bg-gradient-to-br from-white to-amber-50 border-2 border-amber-200 hover:shadow-xl transition-all duration-300 hover:scale-105 group animate-on-visible ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: `${index * 0.1}s` }}>
                  <CardContent className="p-4 sm:p-6 text-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform">
                      <achievement.icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                    </div>
                    <div className="text-2xl sm:text-3xl font-bold text-amber-600 mb-1 sm:mb-2">{achievement.metric}</div>
                    <CardTitle className="text-sm sm:text-base mb-1 sm:mb-2">{achievement.title}</CardTitle>
                    <CardDescription className="text-[10px] sm:text-xs text-gray-600">
                      {achievement.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Download Resume Button */}
          <div
            className={`text-center animate-on-visible ${isVisible ? 'visible' : ''}`}
            style={{ transitionDelay: '0.6s' }}
          >
            <a
              href="/resume.pdf"
              download="Suraj_Kumar.pdf"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base lg:text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <Download className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Download Full Resume
              </Button>
            </a>
          </div>

        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className={`text-center mb-10 sm:mb-12 lg:mb-16 animate-on-visible ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: '0.6s' }}>
            <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-4 sm:mb-6">Get In Touch</h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Let's discuss your next project, tutoring needs, or just connect and share ideas
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12">
            {/* Contact Form */}
            <Card className={`bg-white/70 backdrop-blur-sm border border-amber-200 hover:shadow-xl transition-all duration-300 animate-slide-up animate-on-visible ${isVisible ? 'visible' : ''}`} style={{ transitionDelay: '0.1s' }}>
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center">
                  <Mail className="h-6 w-6 sm:h-8 sm:w-8 text-amber-600 mr-2 sm:mr-3" />
                  Send a Message
                </CardTitle>
                <CardDescription className="text-sm sm:text-base lg:text-lg text-gray-600">
                  Share your project details or questions. I'll provide a personalized response.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
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

                <form className="space-y-4 sm:space-y-6" onSubmit={handleContactSubmit}>
                  <div className="space-y-1.5 sm:space-y-2">
                    <Label htmlFor="name" className="text-gray-700 font-semibold text-xs sm:text-sm">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter your full name"
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
                    <Label htmlFor="email" className="text-gray-700 font-semibold text-xs sm:text-sm">Email Address *</Label>
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
                    <Label htmlFor="subject" className="text-gray-700 font-semibold text-xs sm:text-sm">Subject *</Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      placeholder="e.g., Project Collaboration"
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
                    <Label htmlFor="message" className="text-gray-700 font-semibold text-xs sm:text-sm">Your Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={4}
                      placeholder="Describe your project or questions..."
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

                  <p className="text-[10px] sm:text-xs text-gray-500">* Required fields. Your information is kept confidential.</p>

                  <Button
                    type="submit"
                    disabled={isSending}
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed text-xs sm:text-sm"
                  >
                    {isSending ? (
                      <>
                        <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-6 sm:space-y-8">
              <Card className="bg-white/70 backdrop-blur-sm border border-amber-200 hover:shadow-xl transition-all duration-300 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center">
                    <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-amber-600 mr-2 sm:mr-3" />
                    Email
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <p className="text-gray-600 mb-3 sm:mb-4 text-xs sm:text-sm">Reach out for project inquiries or consultations.</p>
                  <a href="mailto:surajkumarraj8888@gmail.com" className="text-amber-600 hover:text-amber-800 font-semibold flex items-center text-xs sm:text-sm">
                    surajkumarraj8888@gmail.com
                    <ExternalLink className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                  </a>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border border-amber-200 hover:shadow-xl transition-all duration-300 animate-slide-up" style={{ animationDelay: '0.4s' }}>
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center">
                    <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6 text-amber-600 mr-2 sm:mr-3" />
                    College
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <p className="text-gray-600 mb-3 sm:mb-4 text-xs sm:text-sm">Studying at Government Engineering College, Vaishali.</p>
                  <a href="https://www.gecvaishali.ac.in/" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:text-amber-800 font-semibold flex items-center text-xs sm:text-sm">
                    GEC Vaishali
                    <ExternalLink className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                  </a>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border border-amber-200 hover:shadow-xl transition-all duration-300 animate-slide-up" style={{ animationDelay: '0.6s' }}>
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center">
                    <Github className="h-5 w-5 sm:h-6 sm:w-6 text-amber-600 mr-2 sm:mr-3" />
                    Connect on Social
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <p className="text-gray-600 mb-3 sm:mb-4 text-xs sm:text-sm">Follow me for updates and tech insights!</p>
                  <div className="grid grid-cols-4 gap-3 sm:gap-4">
                    {[
                      { href: "https://github.com/Suraj1819", icon: Github },
                      { href: "https://www.linkedin.com/in/suraj-kumar-72847b30a/", icon: Linkedin },
                      { href: "https://leetcode.com/u/Suraj_1819/", icon: Code },
                      { href: "https://www.geeksforgeeks.org/user/surajkuma16ts/", icon: Code2 }
                    ].map((social, idx) => (
                      <Button key={idx} variant="ghost" className="p-0 hover:bg-amber-100 transition-all duration-300 hover:scale-110">
                        <a href={social.href} target="_blank" rel="noopener noreferrer">
                          <social.icon className="h-6 w-6 sm:h-8 sm:w-8 text-amber-700" />
                        </a>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;