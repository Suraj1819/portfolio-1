import React, { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import type { AxiosResponse, AxiosInstance } from 'axios';
import {
  ArrowRight, Code, Star, Sparkles, Download, Mail,
  GraduationCap, Heart, Target, Users, Award, BookOpen,
  Github, Linkedin, ExternalLink, Calendar, Clock,
  Database, Server, Brain, Zap,
  Trophy, Coffee, Rocket, Globe, ExternalLinkIcon, Gamepad2Icon, DatabaseZap,
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

// Define types for state management
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

// Define types for API responses
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

// Axios configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8081/api/v1"; // Fallback to localhost if env variable is not set

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

const Home = () => {
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

  useEffect(() => {
    // Reset thank you page after 5 seconds
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
    // Clear alert after 5 seconds
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

    // Name validation
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

    // Email validation
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

    // Subject validation
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

    // Message validation
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

  const values = [
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
      description: "Gaming isn’t just a hobby for me, it’s my passion. I love exploring virtual worlds, mastering strategies, and pushing my limits to achieve victory while enjoying the thrill of competition.",
      color: "text-yellow-500 bg-yellow-100"
    }
  ];

  const skills = [
    {
      name: "React.js",
      level: 92,
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
      level: 95,
      category: "Programming",
      icon: Brain,
      description: "Data structures, algorithms, automation, and AI/ML basics",
      projects: "50+ solutions"
    },
    {
      name: "C++",
      level: 93,
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
      level: 90,
      category: "Programming",
      icon: Code,
      description: "ES6+, async programming, and modern JS frameworks",
      projects: "20+ projects"
    },
    {
      name: "Git & GitHub",
      level: 88,
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

  const services = [
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

  const projects = [
    {
      title: "PassGenie - Random Password Generator",
      description: "A modern and secure password generator built with React and Tailwind CSS, offering customizable options and responsive design.",
      longDescription: "PassGenie is a powerful and secure web application designed to generate strong, unique, and customizable passwords instantly. Developed using React for dynamic UI and Tailwind CSS for modern responsive styling, it provides users with complete control over password length, inclusion of special characters, numbers, and uppercase/lowercase letters. With JavaScript handling the generation logic and HTML5 structuring the interface, PassGenie combines security, usability, and performance in a sleek design. Its copy-to-clipboard functionality and responsive layout make it an essential tool for individuals and professionals alike.",
      technologies: [
        "React - Component-based UI development",
        "Tailwind CSS - Utility-first CSS for styling",
        "JavaScript (ES6+) - Logic for password generation",
        "HTML5 - Structural backbone of the UI"
      ],
      features: [
        "Random Password Generation",
        "Customizable Length",
        "Special Characters, Numbers, Uppercase/Lowercase Support",
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
      description: "Modern e-commerce solution with advanced features including AI-powered recommendations, real-time inventory management, secure payment processing, and comprehensive admin dashboard.",
      longDescription: "A full-featured e-commerce platform built with modern technologies, featuring responsive design, advanced search, payment integration, and robust admin tools for complete business management.",
      technologies: ["React", "Node.js", "MongoDB", "Stripe", "AWS S3"],
      features: ["AI Recommendations", "Payment Gateway", "Inventory Management", "Order Tracking", "Admin Dashboard"],
      gradient: "from-green-400 to-emerald-600",
      status: "In Progress",
      users: "1000+ customers in Future",
      github: "https://github.com/Suraj1819"
    },
    {
      title: "PyCalc - Tkinter Calculator",
      description: "A simple and efficient calculator built using Python's Tkinter library for GUI applications.",
      longDescription: "PyCalc is a lightweight calculator application developed with Python Tkinter. It provides a clean and interactive interface for performing basic arithmetic operations such as addition, subtraction, multiplication, and division. Designed as a beginner-friendly project, it showcases the power of Python's GUI programming.",
      technologies: ["Python", "Tkinter"],
      features: ["Basic Arithmetic", "User-friendly Interface", "Responsive Buttons", "Lightweight App"],
      gradient: "from-green-400 to-emerald-600",
      status: "Completed",
      users: "Only I am using LOL 😂",
      github: "https://github.com/Suraj1819/SimpleCalculator",
      live: "N/A"
    }
  ];

  const certificates = [
    {
      title: "Advanced Data Structures & Algorithms",
      issuer: "GeeksforGeeks",
      year: "2024",
      description: "Comprehensive course covering advanced DSA concepts, optimization techniques, and competitive programming strategies.",
      skills: ["Dynamic Programming", "Graph Algorithms", "Tree Structures", "Optimization"],
      icon: Trophy,
      credentialId: "GFG-DSA-2024-001"
    },
    {
      title: "Full Stack Web Development Certification",
      issuer: "GeeksforGeeks",
      year: "2024",
      description: "Complete full-stack development program covering frontend frameworks, backend development, and database management.",
      skills: ["React.js", "Node.js", "MongoDB", "API Development"],
      icon: Award,
      credentialId: "FCC-FSWD-2024-001"
    },
    {
      title: "Cybersecurity Essentials Certification",
      issuer: "Simplilearn | Skillup",
      year: "2024",
      description: "Comprehensive course on cybersecurity fundamentals, covering network security, threat analysis, ethical hacking basics, and risk management strategies.",
      skills: ["Network Security", "Threat Analysis", "Ethical Hacking", "Risk Management"],
      icon: Award,
      credentialId: "8289220"
    },
    {
      title: "Microsoft Excel Mastery Certification",
      issuer: "LearnX",
      year: "2024",
      description: "In-depth Excel training covering advanced formulas, data analysis, PivotTables, charting, and automation with macros and VBA for real-world business tasks.",
      skills: ["Advanced Formulas", "PivotTables & PivotCharts", "XLOOKUP / VLOOKUP", "Data Analysis & Visualization", "Macros & VBA"],
      icon: Award,
      credentialId: "a3yydcv6ub8"
    },
    {
      title: "50 Days Streak Badge",
      issuer: "LeetCode",
      year: "2025",
      description: "Earned the 50 Days Streak badge on LeetCode by consistently solving coding problems every day, showcasing strong dedication and problem-solving consistency.",
      skills: ["Problem Solving", "Data Structures", "Algorithms", "Consistency", "Competitive Programming"],
      icon: Award,
      credentialId: "LEETCODE-STREAK-50-2025"
    },
    {
      title: "100 Days Streak Badge",
      issuer: "LeetCode",
      year: "2025",
      description: "Earned the 100 Days Streak badge on LeetCode by consistently solving coding problems every day, showcasing strong dedication and problem-solving consistency.",
      skills: ["Problem Solving", "Data Structures", "Algorithms", "Consistency", "Competitive Programming"],
      icon: Award,
      credentialId: "LEETCODE-STREAK-100-2025"
    },
    {
      title: "Python",
      issuer: "LearnX",
      year: "2024",
      description: "Specialized certification in Python programming for data science",
      skills: ["Python", "NumPy", "Pandas"],
      icon: Brain,
      credentialId: "a3yydcv6ub8"
    }
  ];

  const achievements = [
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

  if (showThankYou) {
    try {
      return <ThankYou />;
    } catch (error: unknown) {
      console.error('Error rendering ThankYou component:', error);
      return (
        <div className="min-h-screen bg-gradient-to-br from-cream-50 via-cream-100 to-amber-50 flex items-center justify-center">
          <Card className="bg-white/70 backdrop-blur-sm border border-amber-200 p-8">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-800">Something Went Wrong</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">An error occurred while displaying the thank you message. Please try again.</p>
              <Button
                onClick={() => setShowThankYou(false)}
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white"
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
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-cream-100 to-amber-50 text-foreground">
      {/* Enhanced Hero Section */}
      <section className="relative pt-24 pb-16 px-6 overflow-hidden min-h-screen flex items-center">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-amber-300/20 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-orange-300/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-yellow-300/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-32 left-20 animate-float" style={{ animationDelay: '0.3s' }}>
            <div className="w-16 h-16 bg-gradient-to-r from-amber-400 to-orange-400 rounded-lg flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow">
              <Code className="h-8 w-8 text-white" />
            </div>
          </div>
          <div className="absolute top-48 right-32 animate-float" style={{ animationDelay: '0.7s' }}>
            <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
          </div>
          <div className="absolute bottom-40 left-16 animate-float" style={{ animationDelay: '1s' }}>
            <div className="w-14 h-14 bg-gradient-to-r from-yellow-400 to-amber-400 rounded-lg rotate-12 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow">
              <Star className="h-7 w-7 text-white" />
            </div>
          </div>
        </div>

        <div className="container mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="lg:w-1/2 space-y-8 animate-fade-in">
              {/* Status Badge */}
              <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm border border-amber-200 rounded-full px-6 py-3 text-sm shadow-sm animate-slide-up">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-gray-700 font-medium">Available for opportunities</span>
              </div>

              <div className="space-y-6">
                <h1 className="text-6xl lg:text-8xl font-bold leading-tight tracking-tight animate-slide-up" style={{ animationDelay: '0.2s' }}>
                  <span className="block text-gray-800 mb-2">Hello,</span>
                  <span className="block bg-gradient-to-r from-amber-600 via-orange-600 to-red-500 bg-clip-text text-transparent">
                    I'm Suraj
                  </span>
                </h1>

                <div className="space-y-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
                  <p className="text-3xl lg:text-4xl font-semibold text-gray-800">
                    Full-Stack Developer
                  </p>
                  <p className="text-xl text-gray-600 font-medium">
                    MERN Stack • Python • C++ • DSA Expert
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Badge variant="secondary" className="bg-amber-100 text-amber-700 border-amber-200 px-4 py-2 hover:bg-amber-200 transition-colors text-sm font-medium">
                      MongoDB
                    </Badge>
                    <Badge variant="secondary" className="bg-orange-100 text-orange-700 border-orange-200 px-4 py-2 hover:bg-orange-200 transition-colors text-sm font-medium">
                      Express.js
                    </Badge>
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-700 border-yellow-200 px-4 py-2 hover:bg-yellow-200 transition-colors text-sm font-medium">
                      React.js
                    </Badge>
                    <Badge variant="secondary" className="bg-red-100 text-red-700 border-red-200 px-4 py-2 hover:bg-red-200 transition-colors text-sm font-medium">
                      Node.js
                    </Badge>
                    <Badge variant="secondary" className="bg-red-100 text-red-700 border-red-200 px-4 py-2 hover:bg-red-200 transition-colors text-sm font-medium">
                      Tailwindcss
                    </Badge>
                  </div>
                </div>

                <p className="text-lg lg:text-xl text-gray-600 max-w-2xl leading-relaxed animate-slide-up" style={{ animationDelay: '0.6s' }}>
                  I’m a B.Tech student passionate about full-stack development and problem-solving. I work with MERN Stack, Tailwind CSS, PostgreSQL, C++, and Python to build real-world projects that push my skills. I love exploring data structures, algorithms, and new technologies, aiming to grow as a Software Development Engineer and create meaningful, innovative solutions that make an impact.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 animate-slide-up" style={{ animationDelay: '0.8s' }}>
                <a href="#projects">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 px-8 py-4 text-lg"
                  >
                    <span>View My Projects</span>
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </a>
                <a href="#resume">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-amber-300 text-gray-700 hover:bg-amber-50 backdrop-blur-sm bg-white/50 hover:border-amber-400 transition-all duration-300 hover:scale-105 px-8 py-4 text-lg"
                  >
                    <Download className="mr-2 h-5 w-5" />
                    Download Resume
                  </Button>
                </a>
                <a href="#contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-orange-300 text-gray-700 hover:bg-orange-50 backdrop-blur-sm bg-white/50 hover:border-orange-400 transition-all duration-300 hover:scale-105 px-8 py-4 text-lg"
                  >
                    <Mail className="mr-2 h-5 w-5" />
                    Let's Connect
                  </Button>
                </a>
              </div>

              <div className="flex space-x-6 animate-slide-up" style={{ animationDelay: '1s' }}>
                <a href="https://github.com/Suraj1819" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-amber-600 transition-all duration-300 hover:scale-110 p-3 rounded-full hover:bg-amber-100 shadow-sm">
                  <Github className="h-6 w-6" />
                </a>
                <a href="https://www.linkedin.com/in/suraj-kumar-72847b30a/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-amber-600 transition-all duration-300 hover:scale-110 p-3 rounded-full hover:bg-amber-100 shadow-sm">
                  <Linkedin className="h-6 w-6" />
                </a>
                <a href="https://leetcode.com/u/Suraj_1819/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-amber-600 transition-all duration-300 hover:scale-110 p-3 rounded-full hover:bg-amber-100 shadow-sm">
                  <Code className="h-6 w-6" />
                </a>
              </div>
            </div>

            <div className="lg:w-1/2 flex justify-center mt-12 lg:mt-0">
              <div className="relative animate-scale-in" style={{ animationDelay: '0.5s' }}>
                {/* Glowing Ring */}
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 rounded-full blur-xl opacity-30 animate-pulse-slow"></div>

                {/* Main Profile Circle */}
                <div className="relative w-80 h-80 lg:w-96 lg:h-96 bg-gradient-to-br from-amber-400 via-orange-400 to-red-400 rounded-full flex items-center justify-center shadow-2xl hover:shadow-3xl transition-shadow duration-500">
                  <div className="w-72 h-72 lg:w-88 lg:h-88 bg-white rounded-full flex items-center justify-center border-4 border-amber-200 overflow-hidden">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0DIfnIJb34lm7mYgKzTqIbWfhjNdqmRY52g&s"
                      alt="Profile Picture"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Floating Badge */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center animate-bounce-gentle shadow-lg">
                  <span className="text-white font-bold text-sm">2027</span>
                </div>

                {/* Orbit Elements */}
                <div className="absolute top-1/2 left-1/2 w-[120%] h-[120%] -translate-x-1/2 -translate-y-1/2">
                  <div className="relative w-full h-full animate-spin" style={{ animationDuration: '20s' }}>
                    <div className="absolute top-0 left-1/2 w-4 h-4 bg-amber-400 rounded-full -translate-x-1/2 -translate-y-1/2 shadow-lg"></div>
                    <div className="absolute bottom-0 left-1/2 w-4 h-4 bg-orange-400 rounded-full -translate-x-1/2 translate-y-1/2 shadow-lg"></div>
                    <div className="absolute left-0 top-1/2 w-4 h-4 bg-red-400 rounded-full -translate-x-1/2 -translate-y-1/2 shadow-lg"></div>
                    <div className="absolute right-0 top-1/2 w-4 h-4 bg-yellow-400 rounded-full translate-x-1/2 -translate-y-1/2 shadow-lg"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-gentle">
            <div className="w-6 h-10 border-2 border-amber-400 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-amber-400 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats Section */}
      <section className="py-20 px-6 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center animate-fade-in">
              <div className="text-4xl font-bold text-amber-600 mb-2">10+</div>
              <div className="text-gray-600">Projects Completed</div>
            </div>
            <div className="text-center animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="text-4xl font-bold text-orange-600 mb-2">Kidding None</div>
              <div className="text-gray-600">Students Tutored</div>
            </div>
            <div className="text-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="text-4xl font-bold text-yellow-600 mb-2">10+</div>
              <div className="text-gray-600">Technologies</div>
            </div>
            <div className="text-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <div className="text-4xl font-bold text-red-600 mb-2">2027</div>
              <div className="text-gray-600">Graduation Year</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-5xl lg:text-6xl font-bold mb-6">About Me</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              A passionate developer on a mission to create innovative solutions
              and help others achieve their programming goals.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="space-y-6 animate-slide-up">
              <div className="flex items-center space-x-3 mb-6">
                <GraduationCap className="h-8 w-8 text-amber-600" />
                <h3 className="text-3xl font-bold text-gray-800">My Journey</h3>
              </div>

              <p className="text-gray-600 leading-relaxed text-lg">
                <span className=''>I</span>'m Suraj Kumar, a dedicated <span className=' p-0.5 text-2xl'>3<sup className=''>rd</sup></span> -  <strong className='text-2xl'>year</strong> Computer Science and Engineering student at
                Government Engineering College, Vaishali. My journey in technology began with curiosity
                and has evolved into a deep passion for creating meaningful digital experiences.
              </p>

              <p className="text-gray-600 leading-relaxed text-lg">
                What sets me apart is not just my technical skills in C++, Python, and modern web
                technologies, but my genuine love for teaching and helping others succeed.
              </p>
            </div>

            <div className="animate-scale-in">
              <div className="relative">
                <div className="w-full h-96 bg-gradient-to-br from-amber-400 via-orange-400 to-red-400 rounded-2xl shadow-2xl hover:scale-105 duration-300 transition-all">
                  <div className="absolute inset-4 bg-white rounded-xl flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-32 h-32 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <GraduationCap className="h-16 w-16 text-amber-600" />
                      </div>
                      <h4 className="text-xl font-bold text-gray-800 mb-2">Student & Educator</h4>
                      <p className="text-gray-600">Bridging the gap between learning and teaching</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Values Section */}
          <div className="grid lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="bg-white/70 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 " style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 ${value.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <value.icon className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-gray-600">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-5xl lg:text-6xl font-bold mb-6">My Skills</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Technologies and expertise I've developed throughout my journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skill, index) => (
              <Card key={index} className="bg-white/70 backdrop-blur-sm border border-amber-200 hover:shadow-xl transition-all duration-300 hover:scale-105 group" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                        <skill.icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{skill.name}</CardTitle>
                        <Badge variant="secondary" className="bg-amber-100 text-amber-700 text-xs">
                          {skill.category}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-amber-600">{skill.level}%</div>
                      <div className="text-xs text-gray-500">{skill.projects}</div>
                    </div>
                  </div>

                  <div className="w-full bg-amber-200 rounded-full h-3 mb-3">
                    <div
                      className="bg-gradient-to-r from-amber-500 to-orange-500 h-3 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {skill.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-5xl lg:text-6xl font-bold mb-6">My Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive solutions for your digital needs and learning goals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="bg-white/70 backdrop-blur-sm border border-amber-200 hover:shadow-xl transition-all duration-300 hover:scale-105 group overflow-hidden" style={{ animationDelay: `${index * 0.2}s` }}>
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className={`w-16 h-16 bg-gradient-to-r ${service.iconBg} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}>
                      <service.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{service.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Trophy className="h-4 w-4" />
                          <span>{service.projects}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {service.description}
                  </CardDescription>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-800 text-sm">Key Features:</h4>
                    <div className="grid grid-cols-1 gap-2">
                      {service.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full"></div>
                          <span className="text-sm text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-amber-200">
                    <div>
                      <div className="text-2xl font-bold text-amber-700">{service.price}</div>
                      <div className="text-xs text-gray-500">{service.duration}</div>
                    </div>
                    <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white transition-all duration-300 hover:scale-105">
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
      <section id="projects" className="py-20 px-6 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-5xl lg:text-6xl font-bold mb-6">My Projects</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A showcase of my recent work and creative solutions
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <Card key={index} className="bg-white/70 backdrop-blur-sm border border-amber-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 group" style={{ animationDelay: `${index * 0.2}s` }}>
                <div className={`h-48 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                    <Badge className={`bg-white/20 text-white border-white/30 ${
                      project.status === 'completed' ? 'bg-green-500/20 border-green-300' :
                        project.status === 'In Progress' ? 'bg-yellow-500/20 border-yellow-300' :
                          'bg-blue-500/20 border-blue-300'
                    }`}>
                      {project.status}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <CardTitle className="text-xl mb-2 group-hover:text-amber-600 transition-colors">
                        {project.title}
                      </CardTitle>
                      <CardDescription className="text-gray-600 leading-relaxed mb-3">
                        {project.description}
                      </CardDescription>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold text-gray-800 text-sm mb-2">Key Features:</h4>
                        <div className="grid grid-cols-1 gap-1">
                          {project.features.map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-center space-x-2">
                              <Star className="h-3 w-3 text-amber-500" />
                              <span className="text-sm text-gray-600">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, techIndex) => (
                          <Badge key={techIndex} variant="secondary" className="bg-amber-100 text-amber-700 text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4" />
                          <span>{project.users}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{project.status}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 pt-4 border-t border-amber-200">
                      <Button size="sm" className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white flex-1 transition-all hover:scale-105 duration-300">
                        <ExternalLinkIcon className="mr-2 h-4 w-4" />
                        Live Demo
                      </Button>
                      <Button size="sm" variant="outline" className="border-amber-300 text-gray-700 hover:bg-amber-50 transition-all hover:scale-110 duration-300 ml-3">
                        <a href={project.github} target='_blank'><Github /></a>
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
      <section id="resume" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center justify-center space-x-3 mb-4">
              <GraduationCap className="h-12 w-12 text-amber-600" />
              <h2 className="text-5xl lg:text-6xl font-bold">Resume</h2>
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              My professional journey, qualifications, and achievements in technology
            </p>
          </div>

          {/* Education Section */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-gray-800 mb-8 flex items-center justify-center animate-fade-in">
              <GraduationCap className="h-8 w-8 text-amber-600 mr-3" />
              Education
            </h3>
            <div className="max-w-4xl mx-auto">
              <Card className="bg-white/70 backdrop-blur-sm border-2 border-amber-300 hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="md:col-span-2">
                      <h4 className="text-2xl font-bold text-gray-800 mb-2">Matriculation-(10<sup>th</sup>)</h4>
                      <p className="text-lg text-amber-600 font-semibold mb-2">SRT School</p>
                      <p className="text-gray-600 mb-4"></p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge className="bg-green-100 text-green-700">PERCENTAGE: 82.6/100</Badge>
                        <Badge className="bg-blue-100 text-blue-700">First Division</Badge>
                        <Badge className="bg-purple-100 text-purple-700">Science</Badge>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-gray-700"><strong>Relevant Coursework:</strong></p>
                        <div className="flex flex-wrap gap-2">
                          {["Hindi", "English", "Maths", "Science", "Paintings", "Computer-IT", "Sanskrit"].map((course, idx) => (
                            <Badge key={idx} variant="secondary" className="bg-gray-100 text-gray-800 text-xs">
                              {course}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col justify-between items-end">
                      <div className="text-right">
                        <div className="text-3xl font-bold text-amber-600 mb-3">2020</div>
                        <p className="text-sm textgray-red-700 text-center"><strong className='font-semibold'>Matriculation</strong></p>
                      </div>
                      <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                        <GraduationCap className="h-12 w-12 text-white" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white/70 backdrop-blur-sm border-2 border-amber-300 hover:shadow-xl transition-all duration-300 hover:scale-105 mt-8">
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="md:col-span-2">
                      <h4 className="text-2xl font-bold text-gray-800 mb-2">Intermediate-(12<sup>th</sup>)</h4>
                      <p className="text-lg text-amber-600 font-semibold mb-2">SRT School</p>
                      <p className="text-gray-600 mb-4"></p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge className="bg-green-100 text-green-700">PERCENTAGE: 83.2/100</Badge>
                        <Badge className="bg-blue-100 text-blue-700">First Division</Badge>
                        <Badge className="bg-purple-100 text-purple-700">Science</Badge>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-gray-700"><strong>Relevant Coursework:</strong></p>
                        <div className="flex flex-wrap gap-2">
                          {["Maths", "Physics", "Chemistry", "English", "Paintings", "Computer-IT"].map((course, idx) => (
                            <Badge key={idx} variant="secondary" className="bg-gray-100 text-gray-700 text-xs">
                              {course}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col justify-between items-end">
                      <div className="text-right">
                        <div className="text-3xl font-bold text-amber-600 mb-1">2022</div>
                        <p className="text-sm textgray-red-700 text-center"><strong className='font-semibold'>Intermediate</strong></p>
                      </div>
                      <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                        <GraduationCap className="h-12 w-12 text-white" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-white/70 backdrop-blur-sm border-2 border-amber-300 hover:shadow-xl transition-all duration-300 hover:scale-105 mt-8">
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="md:col-span-2">
                      <h4 className="text-2xl font-bold text-gray-800 mb-2">Bachelor of Technology in Computer Science</h4>
                      <p className="text-lg text-amber-600 font-semibold mb-2">Government Engineering College</p>
                      <p className="text-gray-600 mb-4">Specialization in Software Engineering & Data Structures</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge className="bg-green-100 text-green-700">CGPA: 8.54/10</Badge>
                        <Badge className="bg-blue-100 text-blue-700">First Division</Badge>
                        <Badge className="bg-purple-100 text-purple-700">CSE</Badge>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-gray-700"><strong>Relevant Coursework:</strong></p>
                        <div className="flex flex-wrap gap-2">
                          {["Data Structures", "Algorithms", "Web Development", "Database Systems", "Operating Systems", "Computer Networks", "COA", "Digital Electronics"].map((course, idx) => (
                            <Badge key={idx} variant="secondary" className="bg-gray-100 text-gray-700 text-xs">
                              {course}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col justify-between items-end">
                      <div className="text-right">
                        <div className="text-3xl font-bold text-amber-600 mb-1">2023 - 2027</div>
                        <p className="text-sm textgray-red-700 text-center"><strong className='font-semibold'>Graduation</strong></p>
                      </div>
                      <div className="w-24 h-24 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                        <GraduationCap className="h-12 w-12 text-white" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Experience Section */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-gray-800 mb-8 flex items-center justify-center animate-fade-in">
              <Coffee className="h-8 w-8 text-amber-600 mr-3" />
              Professional Experience
            </h3>
            <div className="max-w-4xl mx-auto space-y-6">
              <Card className="bg-white/70 backdrop-blur-sm border border-amber-200 hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Code className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-gray-800">Programming Tutor & Mentor</h4>
                        <p className="text-amber-600 font-semibold">Freelance</p>
                      </div>
                    </div>
                    <Badge className="bg-amber-100 text-amber-700 whitespace-nowrap">2023 - Present</Badge>
                  </div>
                  <div className="ml-16 space-y-3">
                    <p className="text-gray-700 leading-relaxed">
                      Providing personalized programming instruction and mentorship to 100+ students across various skill levels.
                    </p>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-amber-500 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
                        <span>Taught C++, Python, Data Structures & Algorithms to students preparing for technical interviews</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-amber-500 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
                        <span>Helped 50+ students successfully crack coding interviews at top tech companies</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-amber-500 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
                        <span>Developed custom learning curriculum and practice problem sets for individual student needs</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-amber-500 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
                        <span>Conducted mock interviews and provided detailed feedback to improve problem-solving skills</span>
                      </li>
                    </ul>
                    <div className="flex flex-wrap gap-2 pt-2">
                      <Badge variant="outline" className="border-amber-300 text-amber-700 text-xs">C++</Badge>
                      <Badge variant="outline" className="border-amber-300 text-amber-700 text-xs">Python</Badge>
                      <Badge variant="outline" className="border-amber-300 text-amber-700 text-xs">DSA</Badge>
                      <Badge variant="outline" className="border-amber-300 text-amber-700 text-xs">Interview Prep</Badge>
                      <Badge variant="outline" className="border-amber-300 text-amber-700 text-xs">Mentoring</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border border-amber-200 hover:shadow-xl transition-all duration-300 hover:scale-105" style={{ animationDelay: '0.2s' }}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Users className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-gray-800">Programming Club Lead</h4>
                        <p className="text-amber-600 font-semibold">Government Engineering College</p>
                      </div>
                    </div>
                    <Badge className="bg-blue-100 text-blue-700 whitespace-nowrap">2023 - Present</Badge>
                  </div>
                  <div className="ml-16 space-y-3">
                    <p className="text-gray-700 leading-relaxed">
                      Leading the college programming club with 200+ active members and organizing technical events.
                    </p>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
                        <span>Organized 10+ technical workshops on web development, DSA, and competitive programming</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
                        <span>Coordinated coding competitions with 500+ participants across multiple colleges</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
                        <span>Mentored junior students in full-stack development and competitive programming</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
                        <span>Led development of college's official website and student portal projects</span>
                      </li>
                    </ul>
                    <div className="flex flex-wrap gap-2 pt-2">
                      <Badge variant="outline" className="border-blue-300 text-blue-700 text-xs">Leadership</Badge>
                      <Badge variant="outline" className="border-blue-300 text-blue-700 text-xs">Event Management</Badge>
                      <Badge variant="outline" className="border-blue-300 text-blue-700 text-xs">Public Speaking</Badge>
                      <Badge variant="outline" className="border-blue-300 text-blue-700 text-xs">Team Building</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border border-amber-200 hover:shadow-xl transition-all duration-300 hover:scale-105" style={{ animationDelay: '0.4s' }}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Rocket className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-gray-800">Full-Stack Developer</h4>
                        <p className="text-amber-600 font-semibold">Freelance Projects</p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-700 whitespace-nowrap">2023 - Present</Badge>
                  </div>
                  <div className="ml-16 space-y-3">
                    <p className="text-gray-700 leading-relaxed">
                      Developing custom web applications and solutions for clients across various industries.
                    </p>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-green-500 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
                        <span>Built 15+ full-stack web applications using MERN stack for various clients</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-green-500 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
                        <span>Implemented responsive UI/UX designs with React, Tailwind CSS, and modern frameworks</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-green-500 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
                        <span>Developed RESTful APIs and integrated third-party services (Stripe, AWS, Google APIs)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-green-500 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
                        <span>Deployed applications on AWS, Vercel, and Heroku with CI/CD pipelines</span>
                      </li>
                    </ul>
                    <div className="flex flex-wrap gap-2 pt-2">
                      <Badge variant="outline" className="border-green-300 text-green-700 text-xs">React.js</Badge>
                      <Badge variant="outline" className="border-green-300 text-green-700 text-xs">Node.js</Badge>
                      <Badge variant="outline" className="border-green-300 text-green-700 text-xs">MongoDB</Badge>
                      <Badge variant="outline" className="border-green-300 text-green-700 text-xs">REST APIs</Badge>
                      <Badge variant="outline" className="border-green-300 text-green-700 text-xs">Deployment</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Certificates Section */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-gray-800 mb-8 flex items-center justify-center animate-fade-in">
              <Award className="h-8 w-8 text-amber-600 mr-3" />
              Professional Certifications
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {certificates.map((cert, index) => (
                <Card key={index} className="bg-white/70 backdrop-blur-sm border border-amber-200 hover:shadow-xl transition-all duration-300 hover:scale-105 group" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform flex-shrink-0">
                        <cert.icon className="h-6 w-6 text-white" />
                      </div>
                      <Badge className="bg-amber-100 text-amber-700">{cert.year}</Badge>
                    </div>
                    <CardTitle className="text-lg mb-2 group-hover:text-amber-600 transition-colors">{cert.title}</CardTitle>
                    <p className="text-amber-600 font-semibold text-sm mb-3">{cert.issuer}</p>
                    <CardDescription className="text-gray-600 text-xs mb-4 leading-relaxed line-clamp-3">
                      {cert.description}
                    </CardDescription>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {cert.skills.slice(0, 3).map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="secondary" className="bg-gray-100 text-gray-700 text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    <div className="pt-4 border-t border-amber-200">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 truncate">ID: {cert.credentialId}</span>
                        <Button size="sm" variant="ghost" className="text-amber-700 hover:bg-amber-50 h-8 px-2">
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Achievements Section */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-gray-800 mb-8 flex items-center justify-center animate-fade-in">
              <Trophy className="h-8 w-8 text-amber-600 mr-3" />
              Key Achievements
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {achievements.map((achievement, index) => (
                <Card key={index} className="bg-gradient-to-br from-white to-amber-50 border-2 border-amber-200 hover:shadow-xl transition-all duration-300 hover:scale-105 group" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <achievement.icon className="h-8 w-8 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-amber-600 mb-2">{achievement.metric}</div>
                    <CardTitle className="text-base mb-2">{achievement.title}</CardTitle>
                    <CardDescription className="text-xs text-gray-600">
                      {achievement.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Download Resume Button */}
          <div className="text-center animate-fade-in">
            <Button size="lg" className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <Download className="mr-2 h-5 w-5" />
              Download Full Resume
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-5xl lg:text-6xl font-bold mb-6">Get In Touch</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Let's discuss your next project, tutoring needs, or just connect and share ideas
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="bg-white/70 backdrop-blur-sm border border-amber-200 hover:shadow-xl transition-all duration-300 animate-slide-up">
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-gray-800 flex items-center">
                  <Mail className="h-8 w-8 text-amber-600 mr-3" />
                  Send a Message
                </CardTitle>
                <CardDescription className="text-lg text-gray-600">
                  Share your project details, technical questions, or mentorship needs. I'll provide a personalized response.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {alertMessage.message && (
                  <div className={`mb-6 p-4 rounded-lg border flex items-center ${
                    alertMessage.type === 'error'
                      ? 'border-red-200 bg-red-50 text-red-800'
                      : 'border-green-200 bg-green-50 text-green-800'
                  }`}>
                    {alertMessage.type === 'error' ? (
                      <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                    ) : (
                      <CheckCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                    )}
                    <span className="text-sm">{alertMessage.message}</span>
                  </div>
                )}

                <form className="space-y-6" onSubmit={handleContactSubmit}>
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-700 font-semibold">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      disabled={isSending}
                      className={`border-amber-200 focus:ring-amber-500 bg-white/50 ${
                        errors.name ? 'border-red-300 focus:ring-red-500' : ''
                      }`}
                      aria-invalid={!!errors.name}
                      aria-describedby="name-error"
                      maxLength={50}
                    />
                    {errors.name && (
                      <p id="name-error" className="text-red-500 text-sm flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-700 font-semibold">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled={isSending}
                      className={`border-amber-200 focus:ring-amber-500 bg-white/50 ${
                        errors.email ? 'border-red-300 focus:ring-red-500' : ''
                      }`}
                      aria-invalid={!!errors.email}
                      aria-describedby="email-error"
                      maxLength={100}
                    />
                    {errors.email && (
                      <p id="email-error" className="text-red-500 text-sm flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-gray-700 font-semibold">Subject *</Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      placeholder="e.g., Project Collaboration or Tutoring Inquiry"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      disabled={isSending}
                      className={`border-amber-200 focus:ring-amber-500 bg-white/50 ${
                        errors.subject ? 'border-red-300 focus:ring-red-500' : ''
                      }`}
                      aria-invalid={!!errors.subject}
                      aria-describedby="subject-error"
                      maxLength={100}
                    />
                    {errors.subject && (
                      <p id="subject-error" className="text-red-500 text-sm flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-gray-700 font-semibold">Your Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={5}
                      placeholder="Describe your project, requirements, or questions in detail..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                      disabled={isSending}
                      className={`border-amber-200 focus:ring-amber-500 bg-white/50 resize-none ${
                        errors.message ? 'border-red-300 focus:ring-red-500' : ''
                      }`}
                      aria-invalid={!!errors.message}
                      aria-describedby="message-error"
                      maxLength={1000}
                    />
                    <div className="flex justify-between items-center">
                      {errors.message && (
                        <p id="message-error" className="text-red-500 text-sm flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.message}
                        </p>
                      )}
                      <p className="text-sm text-gray-500 ml-auto">{formData.message.length}/1000</p>
                    </div>
                  </div>

                  <p className="text-sm text-gray-500">* Required fields. Your information is kept confidential and used only for responding to your inquiry.</p>

                  <Button
                    type="submit"
                    disabled={isSending}
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSending ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-8">
              <Card className="bg-white/70 backdrop-blur-sm border border-amber-200 hover:shadow-xl transition-all duration-300 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-800 flex items-center">
                    <Mail className="h-6 w-6 text-amber-600 mr-3" />
                    Email
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Reach out for project inquiries, technical consultations, or mentorship discussions.</p>
                  <a href="mailto:surajkumarraj8888@gmail.com" className="text-amber-600 hover:text-amber-800 font-semibold flex items-center">
                    surajkumarraj8888@gmail.com
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border border-amber-200 hover:shadow-xl transition-all duration-300 animate-slide-up" style={{ animationDelay: '0.4s' }}>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-800 flex items-center">
                    <GraduationCap className="h-6 w-6 text-amber-600 mr-3" />
                    College
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Studying at Government Engineering College, Vaishali.</p>
                  <a href="https://www.gecvaishali.ac.in/" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:text-amber-800 font-semibold flex items-center">
                    Government Engineering College, Vaishali
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border border-amber-200 hover:shadow-xl transition-all duration-300 animate-slide-up" style={{ animationDelay: '0.6s' }}>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-800 flex items-center">
                    <Github className="h-6 w-6 text-amber-600 mr-3" />
                    Connect on Social
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Follow me for updates on projects, coding tips, and tech insights. Let's connect and grow together!</p>
                  <div className="grid grid-cols-4 gap-4">
                    <Button variant="ghost" className="p-0 hover:bg-amber-100 transition-all duration-300 hover:scale-110">
                      <a href="https://github.com/Suraj1819" target="_blank" rel="noopener noreferrer">
                        <Github className="h-8 w-8 text-amber-700" />
                      </a>
                    </Button>
                    <Button variant="ghost" className="p-0 hover:bg-amber-100 transition-all duration-300 hover:scale-110">
                      <a href="https://www.linkedin.com/in/suraj-kumar-72847b30a/" target="_blank" rel="noopener noreferrer">
                        <Linkedin className="h-8 w-8 text-amber-700" />
                      </a>
                    </Button>
                    <Button variant="ghost" className="p-0 hover:bg-amber-100 transition-all duration-300 hover:scale-110">
                      <a href="https://leetcode.com/u/Suraj_1819/" target="_blank" rel="noopener noreferrer">
                        <Code className="h-8 w-8 text-amber-700" />
                      </a>
                    </Button>
                    <Button variant="ghost" className="p-0 hover:bg-amber-100 transition-all duration-300 hover:scale-110">
                      <a href="https://www.geeksforgeeks.org/user/surajkuma16ts/" target="_blank" rel="noopener noreferrer">
                        <Code2 className="h-8 w-8 text-amber-700" />
                      </a>
                    </Button>
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