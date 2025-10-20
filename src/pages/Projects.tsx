import React, { useEffect, useState } from 'react';
import { 
  Star, Users, Calendar,Github, Code, LibraryBig, Rocket, Target, Clock, 
  ArrowRight, Zap, Shield, Globe, Smartphone, Database, Cloud, Cpu, Palette, Terminal,
  ChevronRight, CheckCircle, AlertCircle, TrendingUp, Award, Lightbulb, Monitor, ShoppingBag, Circle
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import Footer from '../components/Footer';

import { Link } from 'react-router-dom';

const Projects = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Use standard Tailwind animation classes instead of custom ones
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const ProjectsData = [ // Renamed to ProjectsData to avoid conflict with component name
    {
      title: "PassGenie - Random Password Generator",
      description: "A modern and secure password generator built with React and Tailwind CSS, offering customizable options and responsive design.",
      longDescription: "PassGenie is a powerful and secure web application designed to generate strong, unique, and customizable passwords instantly. Developed using React for dynamic UI and Tailwind CSS for modern responsive styling, it provides users with complete control over password length, inclusion of special characters, numbers, and uppercase/lowercase letters.",
      technologies: ["React", "Tailwind CSS", "JavaScript", "HTML5"],
      features: ["Random Password Generation", "Customizable Length", "Special Characters Support", "Copy to Clipboard", "Responsive Design"],
      gradient: "from-pink-500 to-red-600",
      status: "completed",
      category: "web",
      users: "Personal Use",
      github: "https://github.com/Suraj1819/RandomPasswordGenerator.site",
      live: "https://randompasswordgenerator2357.netlify.app/",
      metrics: {
        downloads: "100+",
        rating: "4.8",
        stars: "25"
      }
    },
    {
      title: "CodeMaster - Learning Management System",
      description: "Comprehensive educational platform for programming courses with interactive coding environments and progress tracking.",
      longDescription: "A complete LMS designed specifically for programming education, featuring interactive code editors, automated testing, progress analytics, and gamification elements to enhance student engagement. Built with React, Node.js, and MongoDB.",
      technologies: ["React", "Node.js", "MongoDB", "Socket.io", "Docker"],
      features: ["Live Code Editor", "Automated Testing", "Progress Analytics", "Real-time Collaboration", "Multi-language Support"],
      gradient: "from-blue-400 to-purple-600",
      status: "in-progress",
      category: "education",
      users: "Beta Testers",
      github: "https://github.com/Suraj1819",
      metrics: {
        downloads: "50+",
        rating: "4.5",
        stars: "42"
      }
    },
    {
      title: "ShopEase - E-Commerce Platform",
      description: "Modern e-commerce solution with AI-powered recommendations, real-time inventory management, and secure payment processing.",
      longDescription: "A full-featured e-commerce platform built with modern technologies, featuring responsive design, advanced search, payment integration with Stripe, and a comprehensive admin dashboard for business management.",
      technologies: ["React", "Node.js", "MongoDB", "Stripe", "AWS S3"],
      features: ["AI Recommendations", "Payment Gateway", "Inventory Management", "Order Tracking", "Admin Dashboard"],
      gradient: "from-green-400 to-emerald-600",
      status: "in-progress",
      category: "ecommerce",
      users: "1000+ customers (Projected)",
      github: "https://github.com/Suraj1819",
      metrics: {
        downloads: "N/A",
        rating: "N/A",
        stars: "15"
      }
    },
    {
      title: "TaskFlow - Project Management Tool",
      description: "Collaborative project management application with real-time updates, team communication, and advanced reporting.",
      longDescription: "A comprehensive project management solution that combines task tracking, team collaboration, and project analytics in an intuitive interface. Built with React, Socket.io, and PostgreSQL.",
      technologies: ["React", "Socket.io", "Express", "PostgreSQL", "Redis"],
      features: ["Real-time Updates", "Team Chat", "File Sharing", "Time Tracking", "Advanced Reports"],
      gradient: "from-orange-400 to-red-500",
      status: "in-progress",
      category: "productivity",
      users: "200+ teams (Projected)",
      github: "https://github.com/Suraj1819",
      metrics: {
        downloads: "N/A",
        rating: "N/A",
        stars: "28"
      }
    },
    {
      title: "WeatherWise - Smart Weather App",
      description: "Intelligent weather application with location-based forecasts, weather alerts, and beautiful data visualizations.",
      longDescription: "A sophisticated weather application that provides accurate forecasts, severe weather alerts, and detailed analytics with stunning visual representations using Chart.js. Built as a Progressive Web App (PWA).",
      technologies: ["React", "Chart.js", "Weather API", "PWA", "Service Workers"],
      features: ["Location-based Forecasts", "Weather Alerts", "Historical Data", "Data Visualization", "Offline Support"],
      gradient: "from-cyan-400 to-blue-600",
      status: "completed",
      category: "utility",
      users: "5000+ users (Projected)",
      github: "https://github.com/Suraj1819",
      metrics: {
        downloads: "500+",
        rating: "4.6",
        stars: "67"
      }
    },
    {
      title: "CodeCollab - Real-time Code Editor",
      description: "Collaborative code editor with real-time synchronization, multiple language support, and video chat for pair programming.",
      longDescription: "A powerful collaborative coding platform that enables real-time code sharing, live collaboration, and integrated communication tools using WebRTC. Built with React, Socket.io, and Monaco Editor.",
      technologies: ["React", "Socket.io", "Monaco Editor", "WebRTC", "Docker"],
      features: ["Real-time Collaboration", "Multi-language Support", "Integrated Terminal", "Video Chat", "Code Execution"],
      gradient: "from-purple-400 to-pink-600",
      status: "beta",
      category: "development",
      users: "300+ developers (Projected)",
      github: "https://github.com/Suraj1819",
      metrics: {
        downloads: "100+",
        rating: "4.7",
        stars: "89"
      }
    },
    {
      title: "DSA Visualizer - Algorithm Learning Tool",
      description: "Interactive tool for learning data structures and algorithms with animated visualizations and practice problems.",
      longDescription: "An educational tool that simplifies learning DSA through interactive visualizations and step-by-step algorithm execution. Built with React, D3.js, and Firebase.",
      technologies: ["React", "D3.js", "Animation Libraries", "Firebase", "Python"],
      features: ["Algorithm Visualization", "Interactive Learning", "Practice Problems", "Progress Tracking", "Code Comparison"],
      gradient: "from-indigo-400 to-purple-600",
      status: "completed",
      category: "education",
      users: "2000+ students (Projected)",
      github: "https://github.com/Suraj1819",
      metrics: {
        downloads: "1000+",
        rating: "4.9",
        stars: "156"
      }
    },
    {
      title: "PyCalc - Tkinter Calculator",
      description: "A simple and efficient calculator built using Python's Tkinter library for GUI applications.",
      longDescription: "PyCalc is a lightweight calculator application developed with Python Tkinter. It provides a clean and interactive interface for performing basic arithmetic operations.",
      technologies: ["Python", "Tkinter"],
      features: ["Basic Arithmetic", "User-friendly Interface", "Responsive Buttons", "Lightweight App"],
      gradient: "from-green-400 to-emerald-600",
      status: "completed",
      category: "desktop",
      users: "Personal Use",
      github: "https://github.com/Suraj1819/SimpleCalculator",
      live: "N/A",
      metrics: {
        downloads: "10+",
        rating: "4.0",
        stars: "5"
      }
    }
  ];

  const futureProjects = [
    {
      title: "AI-Powered Code Review Assistant",
      description: "An intelligent tool that automatically reviews code, suggests improvements, and helps developers write better code.",
      timeline: "Q2 2024",
      status: "planning",
      technologies: ["Python", "TensorFlow", "React", "OpenAI API"],
      icon: Cpu,
      gradient: "from-violet-400 to-purple-600",
      features: ["Automated Code Analysis", "Best Practices Suggestions", "Security Vulnerability Detection", "Performance Optimization Tips"]
    },
    {
      title: "Blockchain-Based Voting System",
      description: "A secure and transparent voting platform built on blockchain technology for fair elections.",
      timeline: "Q3 2024",
      status: "research",
      technologies: ["Solidity", "Web3.js", "React", "Ethereum"],
      icon: Shield,
      gradient: "from-blue-400 to-cyan-600",
      features: ["Immutable Voting Records", "Real-time Results", "Secure Authentication", "Transparent Audit Trail"]
    },
    {
      title: "AR/VR Learning Platform",
      description: "Immersive educational platform using augmented and virtual reality for enhanced learning experiences.",
      timeline: "Q4 2024",
      status: "concept",
      technologies: ["Unity", "C#", "WebXR", "Three.js"],
      icon: Globe,
      gradient: "from-green-400 to-emerald-600",
      features: ["3D Interactive Models", "Virtual Classrooms", "Hands-on Simulations", "Multi-user Collaboration"]
    },
    {
      title: "IoT Smart Home Dashboard",
      description: "Centralized control system for smart home devices with automation and energy monitoring.",
      timeline: "Q1 2025",
      status: "planning",
      technologies: ["Node-RED", "MQTT", "React", "Raspberry Pi"],
      icon: Smartphone,
      gradient: "from-orange-400 to-red-600",
      features: ["Device Control", "Energy Monitoring", "Automation Rules", "Voice Control Integration"]
    }
  ];

  const categories = [
    { id: 'all', label: 'All Projects', icon: LibraryBig },
    { id: 'web', label: 'Web Apps', icon: Globe },
    { id: 'mobile', label: 'Mobile', icon: Smartphone },
    { id: 'desktop', label: 'Desktop', icon: Monitor },
    { id: 'education', label: 'Education', icon: Award },
    { id: 'ecommerce', label: 'E-Commerce', icon: ShoppingBag },
    { id: 'productivity', label: 'Productivity', icon: Target },
    { id: 'utility', label: 'Utilities', icon: Zap },
    { id: 'development', label: 'Dev Tools', icon: Code }
  ];

  const getStatusColor = (status : string) => {
    switch(status) {
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'beta': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'planning': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'research': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'concept': return 'bg-pink-100 text-pink-800 border-pink-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status : string) => {
    switch(status) {
      case 'completed': return CheckCircle;
      case 'in-progress': return Clock;
      case 'beta': return AlertCircle;
      case 'planning': return Target;
      case 'research': return Lightbulb;
      case 'concept': return Rocket;
      default: return Circle;
    }
  };

  const filteredProjects = filter === 'all' 
    ? ProjectsData 
    : ProjectsData.filter(project => project.category === filter);

if (isLoading) {
  return (
    <div
      className="min-h-screen bg-gradient-to-br from-cream-50 via-cream-100 to-amber-50 flex items-center justify-center"
      aria-busy="true"
      aria-live="polite"
    >
      <div className="relative">
        {/* Soft glow */}
        <div className="absolute -inset-10 bg-gradient-to-tr from-amber-500/20 via-orange-400/20 to-yellow-400/20 blur-3xl rounded-full animate-pulse" />

        <div className="relative z-10 flex flex-col items-center">
          {/* Brand orbit loader */}
          <div className="relative w-28 h-28">
            {/* Base ring */}
            <div className="absolute inset-0 rounded-full border-4 border-amber-200/70" />
            {/* Outer spinner */}
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-amber-500 border-r-amber-500 animate-spin" />
            {/* Inner counter-rotating spinner */}
            <div className="absolute inset-2 rounded-full border-4 border-transparent border-b-orange-500 border-l-orange-500 animate-spin [animation-direction:reverse] [animation-duration:2.2s]" />
            {/* Orbiting dots */}
            <div className="absolute inset-0 animate-spin [animation-duration:3s]">
              <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-amber-500 rounded-full shadow-md" />
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-orange-500 rounded-full shadow-md" />
            </div>
          </div>

          {/* Loading text + animated dots */}
          <div className="mt-6 text-center">
            {/* Flex container to center the text and dots together */}
            <div className="flex justify-center items-baseline gap-3">
              <p className="text-2xl font-semibold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                
              </p>
              {/* 4 Dots with animation delays */}
              <div className="flex items-center gap-1.5" aria-hidden="true">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-bounce [animation-delay:150ms]" />
                <span className="w-2 h-2 rounded-full bg-yellow-500 animate-bounce [animation-delay:300ms]" />
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce [animation-delay:450ms]" />
              </div>
            </div>
            
            {/* Subtitle remains below */}
            <p className="mt-3 text-sm text-gray-600">
              Preparing your contact experience…
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}



  



  

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-100 to-amber-200 text-foreground">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          {/* Replaced custom animation with standard Tailwind 'animate-pulse' */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-amber-300/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-orange-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-yellow-300/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="container mx-auto text-center relative z-10">
          <div className="animate-fade-in space-y-6">
            <Badge className="px-4 py-2 text-sm bg-amber-100 text-amber-800 hover:bg-amber-200 transition-colors">
              <Zap className="w-4 h-4 mr-2" />
              8+ Projects Delivered
            </Badge>
            <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-amber-600 via-orange-600 to-red-500 bg-clip-text text-transparent">
              Project Portfolio
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Explore my collection of innovative projects built with cutting-edge technologies, 
              showcasing expertise in full-stack development, AI integration, and user-centric design.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
              {/* <a href="#contact">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 px-8 py-4 group"
                >
                  Discuss Your Project
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a> */}

              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 px-8 py-4 group"
              >
                <Link to="/contact">
                  Discuss Your Project
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <a href="#future-projects">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-amber-300 text-gray-700 hover:bg-amber-50 backdrop-blur-sm bg-white/50 hover:border-amber-400 transition-all duration-300 hover:scale-105 px-8 py-4"
                >
                  Upcoming Projects
                  <Rocket className="ml-2 h-5 w-5" />
                </Button>
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-amber-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-amber-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-6 bg-white/30 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Total Projects', value: '8+', icon: Code, color: 'text-amber-600' },
              { label: 'Technologies', value: '15+', icon: Cpu, color: 'text-blue-600' },
              { label: 'GitHub Stars', value: '400+', icon: Star, color: 'text-purple-600' },
              { label: 'Happy Users', value: '1000+', icon: Users, color: 'text-green-600' }
            ].map((stat, index) => (
              <Card key={index} className="bg-white/70 backdrop-blur-sm border border-amber-200 text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardContent className="pt-6">
                  <stat.icon className={`h-8 w-8 ${stat.color} mx-auto mb-2`} />
                  <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
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
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Featured Projects</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A curated collection of my best work, demonstrating technical expertise and creative problem-solving.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={filter === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(category.id)}
                className={`${
                  filter === category.id 
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white' 
                    : 'border-amber-300 text-gray-700 hover:bg-amber-50'
                } transition-all duration-300`}
              >
                <category.icon className="w-4 h-4 mr-2" />
                {category.label}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <Card
                key={index}
                className="bg-white/70 backdrop-blur-sm border border-amber-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Project Header */}
                <div className={`h-48 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                    <div className="text-center">
                      <Badge className={`mb-2 ${getStatusColor(project.status)}`}>
                        {getStatusIcon(project.status) && React.createElement(getStatusIcon(project.status), { className: "w-3 h-3 mr-1" })}
                        {project.status.replace('-', ' ').toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <CardTitle className="text-xl mb-2 group-hover:text-amber-600 transition-colors">
                        {project.title}
                      </CardTitle>
                      <CardDescription className="text-gray-600 leading-relaxed">
                        {project.description}
                      </CardDescription>
                    </div>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 3).map((tech, techIndex) => (
                        <Badge key={techIndex} variant="secondary" className="bg-amber-100 text-amber-700 text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {project.technologies.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.technologies.length - 3} more
                        </Badge>
                      )}
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="bg-amber-50 rounded-lg p-2">
                        <div className="text-sm font-semibold text-amber-700">{project.metrics.downloads}</div>
                        <div className="text-xs text-gray-600">Downloads</div>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-2">
                        <div className="text-sm font-semibold text-blue-700">{project.metrics.rating}</div>
                        <div className="text-xs text-gray-600">Rating</div>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-2">
                        <div className="text-sm font-semibold text-purple-700">{project.metrics.stars}</div>
                        <div className="text-xs text-gray-600">Stars</div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-4 border-t border-amber-200">
                      {project.live && project.live !== "" ? (
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white flex-1"
                        >
                          <a href={project.live} target="_blank" rel="noopener noreferrer" className="flex items-center">
                            <Globe className="w-4 h-4 mr-2" />
                            Live Demo
                          </a>
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          disabled
                          className="bg-gray-300 text-gray-600 flex-1 cursor-not-allowed"
                        >
                          <Globe className="w-4 h-4 mr-2" />
                          Coming Soon
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-amber-300 text-gray-700 hover:bg-amber-50"
                      >
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="w-4 h-4" />
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

      {/* Future Projects Section */}
      <section id="future-projects" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <Badge className="px-4 py-2 text-sm bg-purple-100 text-purple-800 hover:bg-purple-200 transition-colors mb-4">
              <Rocket className="w-4 h-4 mr-2" />
              Coming Soon
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Future Projects</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Exciting projects in the pipeline, pushing the boundaries of technology and innovation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {futureProjects.map((project, index) => (
              <Card
                key={index}
                className="bg-white/70 backdrop-blur-sm border border-amber-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 group"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className={`h-32 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                    <project.icon className="h-12 w-12 text-white" />
                  </div>
                </div>

                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-xl group-hover:text-amber-600 transition-colors">
                      {project.title}
                    </CardTitle>
                    <Badge className={getStatusColor(project.status)}>
                      {project.status.toUpperCase()}
                    </Badge>
                  </div>
                  <CardDescription className="text-gray-600">
                    {project.description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <Calendar className="w-4 h-4 mr-2" />
                        Timeline: {project.timeline}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-800 text-sm mb-2">Key Features:</h4>
                      <div className="grid grid-cols-1 gap-1">
                        {project.features.slice(0, 3).map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center space-x-2">
                            <ChevronRight className="h-3 w-3 text-amber-500 flex-shrink-0" />
                            <span className="text-sm text-gray-600">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Stack Section */}
      <section className="py-20 px-6 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Technology Stack</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive expertise across modern technologies and frameworks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Frontend",
                icon: Palette,
                technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Redux", "Figma"],
                gradient: "from-blue-400 to-cyan-600"
              },
              {
                title: "Backend",
                icon: Database,
                technologies: ["Node.js", "Express", "Python", "MongoDB", "PostgreSQL", "Redis"],
                gradient: "from-green-400 to-emerald-600"
              },
              {
                title: "Cloud & DevOps",
                icon: Cloud,
                technologies: ["AWS", "Docker", "Git", "CI/CD", "Vercel", "Firebase"],
                gradient: "from-purple-400 to-pink-600"
              },
              {
                title: "Tools & Others",
                icon: Terminal,
                technologies: ["VS Code", "Postman", "Chrome DevTools", "Webpack", "Jest", "GraphQL"],
                gradient: "from-orange-400 to-red-600"
              }
            ].map((stack, index) => (
              <Card key={index} className="bg-white/70 backdrop-blur-sm border border-amber-200 hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stack.gradient} flex items-center justify-center mb-4`}>
                    <stack.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-lg">{stack.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {stack.technologies.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="secondary" className="bg-amber-100 text-amber-700 text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center">
          <Card className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl border border-amber-200 animate-slide-up">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-gray-800 mb-4">
                Let's Build Something Amazing Together
              </CardTitle>
              <CardDescription className="text-lg text-gray-600 max-w-2xl mx-auto">
                Have an idea for a project? I'm always excited to collaborate on innovative solutions 
                and bring creative visions to life with cutting-edge technology.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a href="#contact">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 px-8 py-4 group"
                  >
                    Start a Project
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </a>
                <a href="#services">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-amber-300 text-gray-700 hover:bg-amber-50 backdrop-blur-sm bg-white/50 hover:border-amber-400 transition-all duration-300 hover:scale-105 px-8 py-4"
                  >
                    View Services
                    <TrendingUp className="ml-2 h-5 w-5" />
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

export default Projects;