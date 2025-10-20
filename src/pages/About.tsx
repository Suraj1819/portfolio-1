import React, { useEffect, useState } from 'react';
import {
  GraduationCap,
  Heart,
  Target,
  Users,
  Award,
  Code,
  Zap,
  Lightbulb,
  Calendar,
  Star,
  Trophy,
  Download,
  ArrowRight,
  ExternalLink,
  Github,
  Linkedin,
  Twitter,
  Cloud,
  Medal,
  TrendingUp,
  Sparkles,
  Brain,
  Coffee,
  Gamepad2,
  Music,
  Eye,
  FileDown,
  Palette,
  Shield,
  Film,
  Camera,
  Book,
  Pen,
  Mic,
  Dumbbell,
  Plane,
  Utensils,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

// Define types
interface Interest {
  name: string;
  icon: React.ComponentType<any>; // Fixed: Use ComponentType for Lucide icons
  emoji: string;
  color: string;
}

interface Skill {
  name: string;
  icon: string;
  color: string;
  logo?: string | null; // Fixed: Allow null for logo property
  level: number;
}

interface SkillsData {
  [key: string]: Skill[];
}

interface Certificate {
  name: string;
  issuer: string;
  date: string;
  description: string;
  skills: string[];
  certificateUrl: string;
  previewImage?: string;
}

interface Achievement {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  color: string;
  value: string;
  unit: string;
}

interface TimelineItem {
  year: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
  details: string;
}

interface Value {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  color: string;
  quote: string;
}

const About = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedSkillCategory, setSelectedSkillCategory] = useState<string>('all');
  const [selectedInterestCategory, setSelectedInterestCategory] = useState<string>('all');

  // Simulate loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Scroll progress tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setScrollProgress(scrollPercent);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Skills data grouped by category
  const skillsData: SkillsData = {
    'Programming Languages': [
      { name: 'C++', level: 90, icon: '💻', color: 'from-blue-400 to-blue-600', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
      { name: 'Python', level: 85, icon: '🐍', color: 'from-yellow-400 to-blue-500', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
      { name: 'JavaScript', level: 80, icon: '⚡', color: 'from-yellow-300 to-yellow-500', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      { name: 'Java', level: 75, icon: '☕', color: 'from-red-400 to-orange-500', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
      { name: 'C', level: 85, icon: '🔧', color: 'from-blue-500 to-blue-700', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg' }
    ],
    'Frontend Development': [
      { name: 'React', level: 75, icon: '⚛️', color: 'from-cyan-400 to-blue-500', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { name: 'HTML5', level: 90, icon: '📄', color: 'from-orange-400 to-red-500', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
      { name: 'CSS3', level: 85, icon: '🎨', color: 'from-blue-400 to-blue-600', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
      { name: 'Tailwind CSS', level: 80, icon: '🌊', color: 'from-cyan-300 to-blue-400', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg' },
      { name: 'Bootstrap', level: 75, icon: '📦', color: 'from-purple-400 to-purple-600', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg' }
    ],
    'Backend Development': [
      { name: 'Node.js', level: 70, icon: '🟢', color: 'from-green-400 to-green-600', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
      { name: 'Express.js', level: 68, icon: '🚂', color: 'from-gray-600 to-gray-800', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
      { name: 'REST API', level: 72, icon: '🔌', color: 'from-indigo-400 to-purple-500', logo: null },
      { name: 'GraphQL', level: 60, icon: '📊', color: 'from-pink-400 to-purple-500', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg' }
    ],
    'Databases': [
      { name: 'MongoDB', level: 65, icon: '🍃', color: 'from-green-500 to-green-700', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
      { name: 'MySQL', level: 70, icon: '🐬', color: 'from-blue-400 to-blue-600', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
      { name: 'PostgreSQL', level: 60, icon: '🐘', color: 'from-blue-500 to-indigo-600', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
      { name: 'Firebase', level: 65, icon: '🔥', color: 'from-yellow-400 to-orange-500', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' }
    ],
    'Tools & Technologies': [
      { name: 'Git', level: 85, icon: '🔀', color: 'from-orange-400 to-red-500', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
      { name: 'GitHub', level: 80, icon: '😺', color: 'from-gray-700 to-gray-900', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
      { name: 'VS Code', level: 90, icon: '💻', color: 'from-blue-400 to-blue-600', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
      { name: 'Docker', level: 55, icon: '🐳', color: 'from-blue-300 to-blue-500', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
      { name: 'Postman', level: 75, icon: '📮', color: 'from-orange-400 to-orange-600', logo: null }
    ],
    'Core CS Concepts': [
      { name: 'Data Structures', level: 95, icon: '🏗️', color: 'from-purple-400 to-pink-500', logo: null },
      { name: 'Algorithms', level: 90, icon: '🧮', color: 'from-green-400 to-emerald-500', logo: null },
      { name: 'OOP', level: 88, icon: '🎯', color: 'from-red-400 to-pink-500', logo: null },
      { name: 'System Design', level: 70, icon: '🏛️', color: 'from-indigo-400 to-purple-500', logo: null },
      { name: 'Operating Systems', level: 75, icon: '💾', color: 'from-cyan-400 to-blue-500', logo: null }
    ]
  };

  // Achievements
  const achievements: Achievement[] = [
    {
      icon: Trophy,
      title: '100+ Students Mentored',
      description: 'Successfully guided students in programming and interview preparation',
      color: 'from-amber-400 to-orange-500',
      value: '100+',
      unit: 'Students'
    },
    {
      icon: Star,
      title: '500+ DSA Problems',
      description: 'Solved complex algorithmic problems across various platforms',
      color: 'from-blue-400 to-purple-500',
      value: '500+',
      unit: 'Problems'
    },
    {
      icon: Award,
      title: 'Top Performer',
      description: 'Consistently ranked among top students in academics',
      color: 'from-green-400 to-emerald-500',
      value: 'Top 10%',
      unit: 'Academics'
    },
    {
      icon: Code,
      title: '15+ Projects',
      description: 'Developed diverse projects showcasing technical expertise',
      color: 'from-pink-400 to-red-500',
      value: '15+',
      unit: 'Projects'
    }
  ];

  // Timeline of journey
  const timeline: TimelineItem[] = [
    {
      year: '2023',
      title: 'Started B.Tech Journey',
      description: 'Began Computer Science and Engineering at Government Engineering College, Vaishali',
      icon: GraduationCap,
      color: 'from-blue-400 to-cyan-500',
      details: 'Foundation in Computer Science fundamentals'
    },
    {
      year: '2024',
      title: 'Programming Mastery',
      description: 'Mastered C++, Python, and C programming languages with strong DSA foundation',
      icon: Code,
      color: 'from-green-400 to-emerald-500',
      details: 'Advanced problem-solving and algorithmic thinking'
    },
    {
      year: '2024',
      title: 'Tutoring Success',
      description: 'Started tutoring students and helped 100+ students improve their programming skills',
      icon: Users,
      color: 'from-purple-400 to-pink-500',
      details: 'Developed teaching methodology and curriculum'
    },
    {
      year: '2025',
      title: 'Full-Stack Development',
      description: 'Expanding expertise into MERN stack and modern web development',
      icon: Zap,
      color: 'from-orange-400 to-red-500',
      details: 'Building scalable web applications'
    }
  ];

  // Core values
  const values: Value[] = [
    {
      icon: Heart,
      title: 'Passion for Technology',
      description: 'Deeply passionate about creating innovative solutions and exploring new technologies',
      color: 'from-red-400 to-pink-500',
      quote: 'Innovation distinguishes between a leader and a follower.'
    },
    {
      icon: Target,
      title: 'Excellence Driven',
      description: 'Committed to delivering high-quality work and continuous improvement',
      color: 'from-amber-400 to-orange-500',
      quote: 'Quality is not an act, it is a habit.'
    },
    {
      icon: Users,
      title: 'Community Focused',
      description: 'Believe in sharing knowledge and helping others grow in their journey',
      color: 'from-blue-400 to-indigo-500',
      quote: 'Alone we can do so little; together we can do so much.'
    },
    {
      icon: Lightbulb,
      title: 'Innovation Mindset',
      description: 'Always seeking creative solutions and thinking outside the box',
      color: 'from-purple-400 to-violet-500',
      quote: 'Innovation is seeing what everybody has seen and thinking what nobody has thought.'
    }
  ];

  // Interests categorized
  const interestsData: Record<string, Interest[]> = {
    'Technology': [
      { name: 'Competitive Programming', icon: Trophy, emoji: '🏆', color: 'from-yellow-400 to-orange-500' },
      { name: 'Open Source', icon: Github, emoji: '🌍', color: 'from-gray-600 to-gray-800' },
      { name: 'Machine Learning', icon: Brain, emoji: '🤖', color: 'from-purple-400 to-pink-500' },
      { name: 'UI/UX Design', icon: Palette, emoji: '🎨', color: 'from-pink-400 to-red-500' },
      { name: 'Cloud Computing', icon: Cloud, emoji: '☁️', color: 'from-blue-400 to-cyan-500' },
      { name: 'Cyber Security', icon: Shield, emoji: '🔒', color: 'from-red-500 to-orange-600' }
    ],
    'Creative': [
      { name: 'Technical Writing', icon: Pen, emoji: '✍️', color: 'from-indigo-400 to-purple-500' },
      { name: 'Photography', icon: Camera, emoji: '📸', color: 'from-blue-400 to-indigo-500' },
      { name: 'Video Editing', icon: Film, emoji: '🎬', color: 'from-purple-400 to-pink-500' },
      { name: 'Graphic Design', icon: Palette, emoji: '🖌️', color: 'from-pink-400 to-red-400' }
    ],
    'Entertainment': [
      { name: 'Gaming', icon: Gamepad2, emoji: '🎮', color: 'from-green-400 to-emerald-500' },
      { name: 'Music', icon: Music, emoji: '🎵', color: 'from-purple-400 to-indigo-500' },
      { name: 'Podcasts', icon: Mic, emoji: '🎙️', color: 'from-orange-400 to-red-500' },
      { name: 'Movies & Series', icon: Film, emoji: '🎥', color: 'from-blue-500 to-purple-600' }
    ],
    'Lifestyle': [
      { name: 'Reading Books', icon: Book, emoji: '📚', color: 'from-amber-400 to-orange-500' },
      { name: 'Fitness', icon: Dumbbell, emoji: '💪', color: 'from-red-400 to-pink-500' },
      { name: 'Travel', icon: Plane, emoji: '✈️', color: 'from-cyan-400 to-blue-500' },
      { name: 'Cooking', icon: Utensils, emoji: '🍳', color: 'from-yellow-400 to-orange-400' },
      { name: 'Coffee Enthusiast', icon: Coffee, emoji: '☕', color: 'from-amber-500 to-brown-600' }
    ]
  };

  const allInterests: Interest[] = Object.values(interestsData).flat();
  const filteredInterests: Interest[] = selectedInterestCategory === 'all'
    ? allInterests
    : interestsData[selectedInterestCategory] || [];

  // Flatten all skills for "All" filter
  const allSkills: Skill[] = Object.values(skillsData).flat();
  const filteredSkills: Skill[] = selectedSkillCategory === 'all'
    ? allSkills
    : skillsData[selectedSkillCategory] || [];

  // Certifications
  const certifications: Certificate[] = [
    {
      name: 'C++ Programming Masterclass',
      issuer: 'Coursera - Duke University',
      date: '2024',
      description: 'Comprehensive C++ programming covering OOP, STL, and advanced concepts',
      skills: ['C++', 'OOP', 'Data Structures'],
      certificateUrl: '/certificates/cpp-certificate.pdf',
      previewImage: '/certificates/cpp-preview.jpg'
    },
    {
      name: 'Full Stack Web Development',
      issuer: 'Udemy - Angela Yu',
      date: '2024',
      description: 'Complete web development bootcamp covering MERN stack',
      skills: ['React', 'Node.js', 'MongoDB', 'Express'],
      certificateUrl: '/certificates/webdev-certificate.pdf',
      previewImage: '/certificates/webdev-preview.jpg'
    },
    {
      name: 'Data Structures & Algorithms',
      issuer: 'NPTEL - IIT Madras',
      date: '2023',
      description: 'Advanced DSA course with practical implementation',
      skills: ['DSA', 'Algorithms', 'Problem Solving'],
      certificateUrl: '/certificates/dsa-certificate.pdf',
      previewImage: '/certificates/dsa-preview.jpg'
    },
    {
      name: 'Python for Data Science',
      issuer: 'IBM - Cognitive Class',
      date: '2024',
      description: 'Python programming with focus on data analysis and visualization',
      skills: ['Python', 'Data Analysis', 'Pandas', 'NumPy'],
      certificateUrl: '/certificates/python-certificate.pdf',
      previewImage: '/certificates/python-preview.jpg'
    }
  ];

  // Certificate Preview Component
  const CertificateCard = ({ cert, index }: { cert: Certificate; index: number }) => (
    <div className="bg-white/70 backdrop-blur-sm p-5 rounded-xl border border-amber-200 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h4 className="font-semibold text-gray-800 text-base sm:text-lg mb-1">{cert.name}</h4>
          <p className="text-xs sm:text-sm text-gray-500 mb-2">{cert.issuer}</p>
          <p className="text-xs text-gray-600 mb-3">{cert.description}</p>
          <div className="flex flex-wrap gap-1 mb-3">
            {cert.skills.map((skill: string, idx: number) => (
              <Badge key={idx} variant="secondary" className="text-xs">{skill}</Badge>
            ))}
          </div>
        </div>
        <Badge variant="outline" className="text-xs ml-2">{cert.date}</Badge>
      </div>

      <div className="flex gap-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" variant="outline" className="flex-1 border-amber-300 hover:bg-amber-50">
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>{cert.name}</DialogTitle>
              <DialogDescription>{cert.issuer} - {cert.date}</DialogDescription>
            </DialogHeader>
            <div className="mt-4">
              <div className="bg-gray-100 rounded-lg p-8 flex items-center justify-center min-h-[400px]">
                {cert.previewImage ? (
                  <img src={cert.previewImage} alt={cert.name} className="max-w-full max-h-[500px] rounded-lg shadow-lg" />
                ) : (
                  <div className="text-center">
                    <Award className="h-24 w-24 text-amber-500 mx-auto mb-4" />
                    <p className="text-gray-600">Certificate preview coming soon</p>
                  </div>
                )}
              </div>
              <div className="mt-4 flex justify-end gap-2">
                <Button variant="outline">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Verify
                </Button>
                <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600">
                  <FileDown className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <Button
          size="sm"
          className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
          onClick={() => window.open(cert.certificateUrl, '_blank')}
        >
          <FileDown className="h-4 w-4 mr-2" />
          Download
        </Button>
      </div>
    </div>
  );

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
                  Loading About Page
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-cream-100 to-amber-50 text-foreground">
      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div
          className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-300 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-amber-300/20 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-orange-300/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-yellow-300/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="container mx-auto relative z-10">
          <div className="text-center mb-12 sm:mb-16 animate-fade-in">
            <Badge className="px-4 py-2 text-xs sm:text-sm bg-amber-100 text-amber-800 hover:bg-amber-200 transition-all duration-300 mb-4 sm:mb-6 shadow-lg">
              <GraduationCap className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
              Student Developer & Educator
            </Badge>
            <h1 className="text-4xl lg:text-5xl xl:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-amber-600 via-orange-600 to-red-500 bg-clip-text text-transparent">
              About Suraj Kumar
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-2">
              A passionate 3rd-year Computer Science student dedicated to creating innovative solutions 
              and empowering others through education and mentorship.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6 sm:mt-8">
              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] px-6 py-3 group"
              >
                <Link to="/contact">
                  Get in Touch
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <a href="/Snapchat-118928623.jpg" download>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-amber-300 text-gray-700 hover:bg-amber-50 backdrop-blur-sm bg-white/50 hover:border-amber-400 transition-all duration-300 hover:scale-[1.02] px-6 py-3"
                >
                  Download Resume
                  <Download className="ml-2 h-5 w-5" />
                </Button>
              </a>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 sm:gap-12 items-center">
            <div className="space-y-6 sm:space-y-8 animate-slide-up">
              <div className="space-y-4 sm:space-y-6">
                <h2 className="text-3xl lg:text-5xl font-bold text-gray-800">
                  Hello! I'm <span className="text-amber-600">Suraj Kumar</span>
                </h2>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                  I'm a dedicated Computer Science and Engineering student at Government Engineering College, 
                  Vaishali, with a deep passion for technology and education. My journey in programming 
                  started with curiosity and has evolved into a mission to create meaningful digital experiences 
                  and help others succeed in their tech journey.
                </p>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                  My expertise spans from competitive programming to modern 
                  web development, with a strong foundation in data structures and algorithms.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-white/70 backdrop-blur-sm p-4 sm:p-6 rounded-xl border border-amber-200 hover:shadow-lg transition-all duration-300 hover:scale-[1.05] group">
                  <Calendar className="h-6 w-6 sm:h-10 sm:w-10 text-amber-600 mb-2 sm:mb-3 group-hover:scale-110 transition-transform" />
                  <div className="text-2xl sm:text-3xl font-bold text-gray-800">3rd</div>
                  <div className="text-sm sm:text-base text-gray-600 font-medium">Year Student</div>
                  <div className="text-xs text-gray-500 mt-1">CSE Department</div>
                </div>
                <div className="bg-white/70 backdrop-blur-sm p-4 sm:p-6 rounded-xl border border-amber-200 hover:shadow-lg transition-all duration-300 hover:scale-[1.05] group">
                  <Code className="h-6 w-6 sm:h-10 sm:w-10 text-blue-600 mb-2 sm:mb-3 group-hover:scale-110 transition-transform" />
                  <div className="text-2xl sm:text-3xl font-bold text-gray-800">300+</div>
                  <div className="text-sm sm:text-base text-gray-600 font-medium">DSA</div>
                  <div className="text-xs text-gray-500 mt-1">Problems Solved</div>
                </div>
                <div className="bg-white/70 backdrop-blur-sm p-4 sm:p-6 rounded-xl border border-amber-200 hover:shadow-lg transition-all duration-300 hover:scale-[1.05] group">
                  <Trophy className="h-6 w-6 sm:h-10 sm:w-10 text-purple-600 mb-2 sm:mb-3 group-hover:scale-110 transition-transform" />
                  <div className="text-2xl sm:text-3xl font-bold text-gray-800">15+</div>
                  <div className="text-sm sm:text-base text-gray-600 font-medium">Projects</div>
                  <div className="text-xs text-gray-500 mt-1">Completed</div>
                </div>
              </div>
            </div>

            <div className="animate-scale-in">
              <div className="relative">
                <div className="w-full h-80 sm:h-96 bg-gradient-to-br from-amber-400 via-orange-400 to-red-400 rounded-2xl shadow-2xl hover:scale-105 duration-300 transition-all">
                  <div className="absolute inset-4 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <div className="text-center p-4 sm:p-6">
                      <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <GraduationCap className="h-12 w-12 sm:h-16 sm:w-16 text-amber-600" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">Student & Educator</h3>
                      <p className="text-sm sm:text-base text-gray-600 mb-4">Bridging the gap between learning and teaching</p>
                      <div className="flex justify-center space-x-3 sm:space-x-4">
                        <a href="https://github.com/Suraj1819" target="_blank" rel="noopener noreferrer" className="p-2 sm:p-3 bg-amber-100 rounded-full hover:bg-amber-300 transition-all hover:scale-105 duration-300">
                          <Github className="h-5 w-5 text-gray-700 hover:text-amber-600" />
                        </a>
                        <a href="https://linkedin.com/in/suraj-kumar-72847b30a/" target="_blank" rel="noopener noreferrer" className="p-2 sm:p-3 bg-amber-100 rounded-full hover:bg-amber-300 transition-all hover:scale-105 duration-300">
                          <Linkedin className="h-5 w-5 text-gray-700 hover:text-amber-600" />
                        </a>
                        <a href="https://twitter.com/SuraJzRt" target="_blank" rel="noopener noreferrer" className="p-2 sm:p-3 bg-amber-100 rounded-full hover:bg-amber-300 transition-all hover:scale-105 duration-300">
                          <Twitter className="h-5 w-5 text-gray-700 hover:text-amber-600" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="text-center mb-10 sm:mb-16 animate-fade-in">
            <Badge className="px-4 py-2 text-xs sm:text-sm bg-amber-100 text-amber-800 mb-4">
              <Brain className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
              Technical Expertise
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-bold mb-4 sm:mb-6">Technical Skills & Technologies</h2>
            <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              My expertise spans across programming languages, web development, databases, and core computer science concepts.
            </p>

            <div className="flex flex-wrap justify-center gap-2 mb-8">
              <Button
                variant={selectedSkillCategory === 'all' ? 'default' : 'outline'}
                onClick={() => setSelectedSkillCategory('all')}
                className={selectedSkillCategory === 'all' ? 'bg-gradient-to-r from-amber-500 to-orange-500' : 'border-amber-300'}
              >
                All Skills
              </Button>
              {Object.keys(skillsData).map((category: string) => (
                <Button
                  key={category}
                  variant={selectedSkillCategory === category ? 'default' : 'outline'}
                  onClick={() => setSelectedSkillCategory(category)}
                  className={selectedSkillCategory === category ? 'bg-gradient-to-r from-amber-500 to-orange-500' : 'border-amber-300'}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredSkills.map((skill: Skill, index: number) => (
              <div
                key={index}
                className="bg-white/70 backdrop-blur-sm p-4 sm:p-6 rounded-xl border border-amber-200 hover:shadow-lg transition-all duration-300 animate-slide-up group hover:scale-[1.02]"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    {skill.logo ? (
                      <img src={skill.logo} alt={skill.name} className="w-8 h-8 sm:w-10 sm:h-10" />
                    ) : (
                      <span className="text-2xl sm:text-3xl">{skill.icon}</span>
                    )}
                    <div>
                      <h3 className="font-semibold text-gray-800 text-base sm:text-lg">{skill.name}</h3>
                    </div>
                  </div>
                  <span className="text-lg font-bold text-amber-600 group-hover:scale-110 transition-transform">{skill.level}%</span>
                </div>
                <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out`}
                    style={{ width: `${skill.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="container mx-auto">
          <div className="text-center mb-10 sm:mb-16 animate-fade-in">
            <Badge className="px-4 py-2 text-xs sm:text-sm bg-amber-100 text-amber-800 mb-4">
              <Medal className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
              Milestones
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-bold mb-4 sm:mb-6">Achievements & Impact</h2>
            <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Milestones that reflect my dedication to excellence and community contribution.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {achievements.map((achievement: Achievement, index: number) => (
              <Card
                key={index}
                className="bg-white/70 backdrop-blur-sm border border-amber-200 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] animate-slide-up group"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardHeader className="text-center p-4 sm:p-6">
                  <div className={`w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br ${achievement.color} rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                    <achievement.icon className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-gray-800">{achievement.value}</div>
                  <div className="text-xs sm:text-sm text-gray-500">{achievement.unit}</div>
                  <CardTitle className="text-base sm:text-lg group-hover:text-amber-600 transition-colors mt-2">{achievement.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
                  <CardDescription className="text-gray-600 leading-relaxed text-center text-sm">
                    {achievement.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="text-center mb-10 sm:mb-16 animate-fade-in">
            <Badge className="px-4 py-2 text-xs sm:text-sm bg-amber-100 text-amber-800 mb-4">
              <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
              Journey
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-bold mb-4 sm:mb-6">My Journey</h2>
            <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Key milestones that shaped my path as a developer and educator.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {timeline.map((item: TimelineItem, index: number) => (
              <React.Fragment key={index}>
                <div className="hidden md:flex items-center mb-12 animate-slide-up" style={{ animationDelay: `${index * 0.2}s` }}>
                  <div className="flex-shrink-0 w-32 text-right mr-8">
                    <Badge variant="secondary" className="bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700 px-4 py-2 text-lg font-bold border-0 shadow-lg">
                      {item.year}
                    </Badge>
                  </div>
                  <div className="flex-shrink-0 relative">
                    <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-full flex items-center justify-center mr-8 shadow-lg`}>
                      <item.icon className="h-8 w-8 text-white" />
                    </div>
                    {index < timeline.length - 1 && (
                      <div className="absolute w-1 h-20 bg-gradient-to-b from-amber-300 to-orange-300 left-1/2 transform -translate-x-1/2 top-16"></div>
                    )}
                  </div>
                  <div className="flex-grow bg-white/70 backdrop-blur-sm p-6 rounded-xl border border-amber-200 hover:shadow-lg transition-all duration-300">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                    <p className="text-gray-600 mb-2">{item.description}</p>
                    <p className="text-sm text-amber-600 font-medium">Details: {item.details}</p>
                  </div>
                </div>

                <div className="flex md:hidden mb-8 animate-slide-up" style={{ animationDelay: `${index * 0.2}s` }}>
                  <div className="flex flex-col items-center mr-4">
                    <div className={`w-10 h-10 bg-gradient-to-br ${item.color} rounded-full flex items-center justify-center shadow-md flex-shrink-0`}>
                      <item.icon className="h-5 w-5 text-white" />
                    </div>
                    {index < timeline.length - 1 && (
                      <div className="w-0.5 h-full bg-gradient-to-b from-amber-300 to-orange-300 mt-2"></div>
                    )}
                  </div>
                  <div className="flex-grow pt-1 pb-4">
                    <Badge className="mb-2 text-xs font-bold bg-amber-100 text-amber-700">{item.year}</Badge>
                    <div className="bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-amber-200 hover:shadow-lg transition-all duration-300">
                      <h3 className="text-base font-bold text-gray-800 mb-1">{item.title}</h3>
                      <p className="text-sm text-gray-600 mb-1">{item.description}</p>
                      <p className="text-xs text-amber-600 font-medium mt-2">More Detail: {item.details}</p>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="container mx-auto">
          <div className="text-center mb-10 sm:mb-16 animate-fade-in">
            <Badge className="px-4 py-2 text-xs sm:text-sm bg-amber-100 text-amber-800 mb-4">
              <Heart className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
              Principles
            </Badge>
            <h2 className="text-3xl sm:text-5xl font-bold mb-4 sm:mb-6">Core Values</h2>
            <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide my work and interactions with others.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
            {values.map((value: Value, index: number) => (
              <Card
                key={index}
                className="bg-white/70 backdrop-blur-sm border border-amber-200 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] animate-slide-up group"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardHeader className="p-4 sm:p-6">
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br ${value.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}>
                      <value.icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg sm:text-xl group-hover:text-amber-600 transition-colors">{value.title}</CardTitle>
                      <p className="text-xs sm:text-sm text-gray-500 italic mt-1">"{value.quote}"</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-4 pt-0 sm:p-6 sm:pt-0">
                  <CardDescription className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Interests & Certifications */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
            {/* Interests */}
            <div>
              <div className="mb-6">
                <Badge className="px-4 py-2 text-xs sm:text-sm bg-amber-100 text-amber-800 mb-4">
                  <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                  Personal Interests
                </Badge>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Interests & Hobbies</h3>
                <p className="text-gray-600 mb-6">Beyond coding, here are the things that keep me inspired and motivated.</p>

                <div className="flex flex-wrap gap-2 mb-6">
                  <Button
                    size="sm"
                    variant={selectedInterestCategory === 'all' ? 'default' : 'outline'}
                    onClick={() => setSelectedInterestCategory('all')}
                    className={selectedInterestCategory === 'all' ? 'bg-gradient-to-r from-amber-500 to-orange-500' : 'border-amber-300'}
                  >
                    All
                  </Button>
                  {Object.keys(interestsData).map((category: string) => (
                    <Button
                      key={category}
                      size="sm"
                      variant={selectedInterestCategory === category ? 'default' : 'outline'}
                      onClick={() => setSelectedInterestCategory(category)}
                      className={selectedInterestCategory === category ? 'bg-gradient-to-r from-amber-500 to-orange-500' : 'border-amber-300'}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                {filteredInterests.map((interest: Interest, index: number) => (
                  <div
                    key={index}
                    className="bg-white/70 backdrop-blur-sm p-3 sm:p-4 rounded-xl border border-amber-200 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] animate-slide-up text-center group"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className={`w-12 h-12 mx-auto mb-2 rounded-lg bg-gradient-to-br ${interest.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <span className="text-2xl">{interest.emoji}</span>
                    </div>
                    <h4 className="font-semibold text-gray-800 text-xs sm:text-sm">{interest.name}</h4>
                  </div>
                ))}
              </div>
            </div>
            {/* Certifications */}
            <div>
              <div className="mb-6">
                <Badge className="px-4 py-2 text-xs sm:text-sm bg-amber-100 text-amber-800 mb-4">
                  <Award className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                  Professional Credentials
                </Badge>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Certifications & Courses</h3>
                <p className="text-gray-600 mb-6">Professional certifications validating my technical expertise and continuous learning journey.</p>
              </div>

              <div className="space-y-4">
                {certifications.map((cert: Certificate, index: number) => (
                  <CertificateCard key={index} cert={cert} index={index} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="container mx-auto">
          <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-2xl p-6 sm:p-8 lg:p-12 text-center animate-slide-up shadow-xl">
            <Badge className="px-4 py-2 text-xs sm:text-sm bg-white/80 text-amber-800 mb-4">
              <Target className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
              Let's Connect
            </Badge>
            <h2 className="text-2xl sm:text-4xl font-bold text-gray-800 mb-4 sm:mb-6">
              Let's Connect and Create Something Amazing!
            </h2>
            <p className="text-base sm:text-xl text-gray-600 max-w-2xl mx-auto mb-6 sm:mb-8">
              Whether you're looking for collaboration, mentorship, or just want to chat about technology, 
              I'm always excited to connect with like-minded individuals.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] px-6 py-3 group"
              >
                <Link to="/contact">
                  Get In Touch
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-amber-300 text-gray-700 hover:bg-amber-50 backdrop-blur-sm bg-white/50 hover:border-amber-400 transition-all duration-300 hover:scale-[1.02] px-6 py-3"
              >
                <Link to="/projects">
                  View My Work
                  <ExternalLink className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;