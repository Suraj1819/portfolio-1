import { useState, useEffect } from 'react';
import { motion} from 'framer-motion';
import {
  Code, Database, Server, Brain, Gamepad2, Music,
  BookOpen, Cloud, Shield, GitBranch, Terminal, Monitor,
  Smartphone, Globe, Cpu, Binary, Book, Award, Star, Users
} from 'lucide-react';
import { Badge } from '../components/ui/badge';

import Footer from '../components/Footer';

// Define types for better type safety
type Skill = {
  name: string;
  level: number;
  icon: React.ComponentType<{ className?: string }>;
};

type SkillCategory = {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  skills: Skill[];
};

// Fallback component in case of errors
const ErrorFallback = ({ error }: { error: string }) => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cream-50 via-cream-100 to-amber-50 p-4">
    <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-lg max-w-md text-center">
      <Shield className="h-12 w-12 text-red-500 mx-auto mb-4" />
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Skills Load Error</h2>
      <p className="text-gray-600 mb-4">{error}</p>
      <button
        onClick={() => window.location.reload()}
        className="px-6 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors"
      >
        Retry
      </button>
    </div>
  </div>
);

const LoadingScreen = () => (
  <div
    className="min-h-screen bg-gradient-to-br from-cream-50 via-cream-100 to-amber-50 flex items-center justify-center"
    aria-busy="true"
    aria-live="polite"
  >
    <div className="relative">
      {/* Soft glow effect */}
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
              Loading Skills
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
            Compiling my technical expertise...
          </p>
        </div>
      </div>
    </div>
  </div>
);

const Skills = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('Programming');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // Skills data with proper icon components
  const skillsData: SkillCategory[] = [
    {
      name: 'Programming',
      icon: Code,
      color: 'from-blue-400 to-cyan-500',
      skills: [
        { name: 'C++', level: 92, icon: Cpu },
        { name: 'Python', level: 88, icon: Binary },
        { name: 'JavaScript', level: 85, icon: Terminal },
        { name: 'TypeScript', level: 80, icon: Book },
        { name: 'Java', level: 75, icon: Cpu },
      ]
    },
    {
      name: 'Web Development',
      icon: Globe,
      color: 'from-purple-400 to-violet-500',
      skills: [
        { name: 'React.js', level: 85, icon: Monitor },
        { name: 'Next.js', level: 80, icon: Smartphone },
        { name: 'Node.js', level: 78, icon: Server },
        { name: 'Express.js', level: 75, icon: Cloud },
        { name: 'Tailwind CSS', level: 88, icon: Globe },
      ]
    },
    {
      name: 'Database',
      icon: Database,
      color: 'from-green-400 to-emerald-500',
      skills: [
        { name: 'MongoDB', level: 80, icon: Database },
        { name: 'PostgreSQL', level: 78, icon: Server },
        { name: 'Firebase', level: 75, icon: Cloud },
        { name: 'MySQL', level: 70, icon: Database },
      ]
    },
    {
      name: 'DevOps & Tools',
      icon: Terminal,
      color: 'from-red-400 to-orange-500',
      skills: [
        { name: 'Git/GitHub', level: 90, icon: GitBranch },
        { name: 'Docker', level: 75, icon: Cloud },
        { name: 'AWS', level: 70, icon: Server },
        { name: 'CI/CD', level: 72, icon: Terminal },
      ]
    },
    {
      name: 'Core CS',
      icon: Brain,
      color: 'from-amber-400 to-yellow-500',
      skills: [
        { name: 'Data Structures', level: 95, icon: Binary },
        { name: 'Algorithms', level: 92, icon: Brain },
        { name: 'OOP', level: 88, icon: Cpu },
        { name: 'OS', level: 80, icon: Terminal },
        { name: 'Computer Networks', level: 78, icon: Globe },
      ]
    },
    {
      name: 'Other Skills',
      icon: Star,
      color: 'from-pink-400 to-rose-500',
      skills: [
        { name: 'Competitive Programming', level: 90, icon: Award },
        { name: 'Problem Solving', level: 92, icon: Brain },
        { name: 'Mentoring', level: 88, icon: Users },
        { name: 'Technical Writing', level: 80, icon: BookOpen },
      ]
    }
  ];

  // Calculate skill stats
  const skillStats = {
    totalSkills: skillsData.reduce((sum, category) => sum + category.skills.length, 0),
    categories: skillsData.length,
    highestLevel: Math.max(...skillsData.flatMap(cat => cat.skills.map(skill => skill.level))),
    averageLevel: Math.round(
      skillsData.flatMap(cat => cat.skills.map(skill => skill.level))
        .reduce((sum, level) => sum + level, 0) /
      skillsData.flatMap(cat => cat.skills).length
    )
  };

  // Handle loading with error catching
  useEffect(() => {
    try {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1500);
      return () => clearTimeout(timer);
    } catch (err) {
      setError('Failed to load skills data');
      setIsLoading(false);
    }
  }, []);

  // Handle scroll progress
  useEffect(() => {
    const handleScroll = () => {
      try {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        setScrollProgress(scrollPercent);
      } catch (err) {
        console.error("Scroll error:", err);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle errors
  if (error) {
    return <ErrorFallback error={error} />;
  }

  // Show loading screen
  if (isLoading) {
    return <LoadingScreen />;
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
      <section className="relative pt-28 pb-16 px-4 sm:px-6">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-48 h-48 sm:w-72 sm:h-72 bg-amber-300/20 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute top-40 right-10 w-64 h-64 sm:w-96 sm:h-96 bg-orange-300/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="container mx-auto relative z-10">
          <div className="text-center mb-12 sm:mb-16 animate-fade-in">
            <Badge className="px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm bg-amber-100 text-amber-800 hover:bg-amber-200 transition-all duration-300 mb-4 sm:mb-6 shadow-lg">
              <Code className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              Technical Skills
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-amber-600 via-orange-600 to-red-500 bg-clip-text text-transparent leading-tight">
              My Professional Skills
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 max-w-3xl lg:max-w-4xl mx-auto leading-relaxed px-4">
              A comprehensive overview of my technical expertise and professional competencies
              developed through years of learning and practice.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 mb-12 sm:mb-16 animate-slide-up">
            {[
              { icon: Award, value: skillStats.totalSkills, label: "Total Skills" },
              { icon: Book, value: skillStats.categories, label: "Categories" },
              { icon: Star, value: `${skillStats.highestLevel}%`, label: "Highest Proficiency" },
              { icon: Brain, value: `${skillStats.averageLevel}%`, label: "Average Proficiency" }
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white/70 backdrop-blur-sm p-3 sm:p-6 rounded-xl border border-amber-200 hover:shadow-lg transition-all duration-300 hover:scale-105 group"
              >
                <stat.icon className="h-6 w-6 sm:h-10 sm:w-10 text-amber-600 mb-2 sm:mb-3 group-hover:scale-110 transition-transform" />
                <div className="text-xl sm:text-3xl font-bold text-gray-800">{stat.value}</div>
                <div className="text-xs sm:text-base text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Categories */}
      <section className="py-8 sm:py-12 px-4 sm:px-6">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8 sm:mb-12 animate-fade-in">
            {skillsData.map((category) => (
              <button
                key={category.name}
                onClick={() => setActiveCategory(category.name)}
                className={`px-3 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 flex items-center space-x-2 ${
                  activeCategory === category.name
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg'
                    : 'bg-white/70 text-gray-700 hover:bg-amber-50 hover:shadow-md'
                }`}
              >
                <category.icon className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>{category.name}</span>
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            {skillsData
              .filter(category => category.name === activeCategory)
              .map((category) => (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white/70 backdrop-blur-sm rounded-2xl border border-amber-200 overflow-hidden hover:shadow-xl transition-all duration-300 md:col-span-2"
                >
                  <div className={`p-4 sm:p-6 bg-gradient-to-r ${category.color} text-white`}>
                    <div className="flex items-center space-x-3">
                      <category.icon className="h-6 w-6 sm:h-8 sm:w-8" />
                      <h3 className="text-xl sm:text-2xl font-bold">{category.name}</h3>
                    </div>
                  </div>

                  <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
                    {category.skills.map((skill, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-2 sm:space-x-3">
                            <skill.icon className="h-4 w-4 sm:h-5 sm:w-5 text-amber-600" />
                            <span className="font-medium text-gray-800 text-sm sm:text-base">{skill.name}</span>
                          </div>
                          <span className="text-base sm:text-lg font-bold text-amber-600">{skill.level}%</span>
                        </div>
                        <div className="relative h-2 sm:h-3 bg-gray-200 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                            className={`absolute top-0 left-0 h-full rounded-full bg-gradient-to-r ${category.color}`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </section>

      {/* Skills Overview - Mobile Responsive */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="text-center mb-12 sm:mb-16 animate-fade-in">
            <Badge className="px-3 sm:px-4 py-2 text-xs sm:text-sm bg-amber-100 text-amber-800 mb-4">
              <Shield className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              Expertise Summary
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">Skills Overview</h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              A visual representation of my technical proficiency across different domains.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8">
            {/* Proficiency Chart */}
            <div className="bg-white/70 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-amber-200 shadow-lg animate-slide-up">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center">
                <Code className="h-5 w-5 sm:h-6 sm:w-6 mr-2 text-amber-600" />
                Proficiency Levels
              </h3>
              <div className="space-y-4 sm:space-y-6">
                {['Beginner (0-50%)', 'Intermediate (50-75%)', 'Advanced (75-90%)', 'Expert (90-100%)'].map((level, index) => {
                  const range = level.match(/(\d+)-(\d+)%/) || [];
                  const min = range[1] ? parseInt(range[1]) : 0;
                  const max = range[2] ? parseInt(range[2]) : 100;

                  const skillsInRange = skillsData.flatMap(cat =>
                    cat.skills.filter(skill => skill.level > min && skill.level <= max)
                  ).length;

                  const percentage = (skillsInRange / skillStats.totalSkills) * 100;

                  return (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-xs sm:text-sm">
                        <span className="font-medium text-gray-700">{level}</span>
                        <span className="font-bold text-amber-600">{skillsInRange} skills</span>
                      </div>
                      <div className="relative h-3 sm:h-4 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Skills Distribution - Mobile Responsive */}
            <div className="bg-white/70 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-amber-200 shadow-lg animate-slide-up">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center">
                <Brain className="h-5 w-5 sm:h-6 sm:w-6 mr-2 text-amber-600" />
                Skills Distribution
              </h3>

              {/* Mobile: Show as cards */}
              <div className="sm:hidden space-y-3">
                {skillsData.map((category, index) => {
                  const avgLevel = Math.round(
                    category.skills.reduce((sum, skill) => sum + skill.level, 0) / category.skills.length
                  );
                  return (
                    <div key={index} className="bg-white/50 p-3 rounded-lg border border-amber-100">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <category.icon className="h-4 w-4 text-amber-600" />
                          <span className="font-medium text-gray-800 text-sm">{category.name}</span>
                        </div>
                        <span className="text-sm font-bold text-amber-600">{avgLevel}%</span>
                      </div>
                      <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-500"
                          style={{ width: `${avgLevel}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Desktop: Show radar chart */}
              <div className="hidden sm:block relative w-full h-64 flex items-center justify-center">
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  {/* Radar background */}
                  {[1, 2, 3, 4].map((circle) => (
                    <circle
                      key={circle}
                      cx="100"
                      cy="100"
                      r={circle * 20}
                      fill="none"
                      stroke="#f3f4f6"
                      strokeWidth="1"
                      strokeDasharray={circle === 4 ? '0' : '3 2'}
                    />
                  ))}

                  {/* Axes */}
                  {skillsData.map((category, index) => {
                    const angle = (index * 2 * Math.PI) / skillsData.length;
                    const x = 100 + 80 * Math.sin(angle);
                    const y = 100 - 80 * Math.cos(angle);
                    const labelX = 100 + 90 * Math.sin(angle);
                    const labelY = 100 - 90 * Math.cos(angle);

                    return (
                      <g key={index}>
                        <line
                          x1="100"
                          y1="100"
                          x2={x}
                          y2={y}
                          stroke="#e5e7eb"
                          strokeWidth="1"
                        />
                        <text
                          x={labelX}
                          y={labelY}
                          textAnchor={Math.sin(angle) > 0 ? 'start' : 'end'}
                          dominantBaseline="middle"
                          className="text-xs fill-gray-500"
                        >
                          {category.name.split(' ')[0]}
                        </text>
                      </g>
                    );
                  })}

                  {/* Data points */}
                  <polygon
                    points={skillsData.map((category, index) => {
                      const angle = (index * 2 * Math.PI) / skillsData.length;
                      const avgLevel = category.skills.reduce((sum, skill) => sum + skill.level, 0) / category.skills.length;
                      const radius = (avgLevel / 100) * 80;
                      const x = 100 + radius * Math.sin(angle);
                      const y = 100 - radius * Math.cos(angle);
                      return `${x},${y}`;
                    }).join(' ')}
                    fill="rgba(251, 146, 60, 0.2)"
                    stroke="rgba(245, 158, 11, 0.8)"
                    strokeWidth="2"
                  />
                </svg>
              </div>

              {/* Desktop Legend */}
              <div className="hidden sm:flex justify-center space-x-4 mt-4 flex-wrap gap-2">
                {skillsData.map((category, index) => (
                  <div key={index} className="flex items-center space-x-1 text-xs">
                    <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: `hsl(${index * 60}, 80%, 50%)` }}></div>
                    <span>{category.name}</span>
                  </div>
                ))}
              </div>

              {/* Mobile Legend */}
              <div className="sm:hidden grid grid-cols-2 gap-2 mt-4">
                {skillsData.map((category, index) => (
                  <div key={index} className="flex items-center space-x-1 text-xs">
                    <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: `hsl(${index * 60}, 80%, 50%)` }}></div>
                    <span>{category.name.split(' ')[0]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Skills */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="container mx-auto">
          <div className="text-center mb-12 sm:mb-16 animate-fade-in">
            <Badge className="px-3 sm:px-4 py-2 text-xs sm:text-sm bg-amber-100 text-amber-800 mb-4">
              <Gamepad2 className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              Beyond Coding
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">Additional Competencies</h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Skills that complement my technical expertise and make me a well-rounded professional.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                title: 'Soft Skills',
                icon: Users,
                color: 'from-blue-400 to-cyan-500',
                skills: [
                  { name: 'Mentoring', level: 90 },
                  { name: 'Communication', level: 85 },
                  { name: 'Teamwork', level: 88 },
                  { name: 'Problem Solving', level: 92 }
                ]
              },
              {
                title: 'Interests',
                icon: Music,
                color: 'from-purple-400 to-pink-500',
                skills: [
                  { name: 'Competitive Programming', level: 90 },
                  { name: 'Open Source', level: 80 },
                  { name: 'Technical Writing', level: 75 },
                  { name: 'UI/UX Design', level: 70 }
                ]
              },
              {
                title: 'Languages',
                icon: BookOpen,
                color: 'from-green-400 to-emerald-500',
                skills: [
                  { name: 'English', level: 85 },
                  { name: 'Hindi', level: 95 },
                  { name: 'Bhojpuri', level: 90 }
                ]
              }
            ].map((group, index) => (
              <div
                key={index}
                className="bg-white/70 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-amber-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-slide-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex items-center mb-4 sm:mb-6">
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br ${group.color} rounded-xl flex items-center justify-center mr-3 sm:mr-4`}>
                    <group.icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-2xl font-bold text-gray-800">{group.title}</h3>
                </div>
                <div className="space-y-3 sm:space-y-4">
                  {group.skills.map((skill, skillIndex) => (
                                        <div key={skillIndex} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700 text-sm sm:text-base">{skill.name}</span>
                        <span className="font-bold text-amber-600 text-sm sm:text-base">{skill.level}%</span>
                      </div>
                      <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.2 + skillIndex * 0.1 }}
                          className={`absolute top-0 left-0 h-full rounded-full bg-gradient-to-r ${group.color}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Journey Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="container mx-auto">
          <div className="text-center mb-12 sm:mb-16 animate-fade-in">
            <Badge className="px-3 sm:px-4 py-2 text-xs sm:text-sm bg-amber-100 text-amber-800 mb-4">
              <Award className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              Learning Journey
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">Continuous Learning</h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              My commitment to staying current with technology trends and continuously improving my skills.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                title: 'Currently Learning',
                icon: BookOpen,
                color: 'from-blue-400 to-cyan-500',
                items: [
                  'Advanced React Patterns',
                  'System Design',
                  'Microservices Architecture',
                  'Cloud Computing (AWS)',
                  'Machine Learning Basics'
                ]
              },
              {
                title: 'Recent Achievements',
                icon: Award,
                color: 'from-green-400 to-emerald-500',
                items: [
                  'Completed 500+ LeetCode Problems',
                  'Built 15+ Full-Stack Projects',
                  'Mentored 50+ Students',
                  'Published Technical Articles',
                  'Contributed to Open Source'
                ]
              },
              {
                title: 'Future Goals',
                icon: Star,
                color: 'from-purple-400 to-pink-500',
                items: [
                  'Master DevOps & CI/CD',
                  'Learn Kubernetes & Docker',
                  'Contribute to Major Open Source',
                  'Become a Tech Lead',
                  'Start a Tech Blog/YouTube'
                ]
              }
            ].map((section, index) => (
              <div
                key={index}
                className="bg-white/70 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-amber-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-slide-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex items-center mb-4 sm:mb-6">
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br ${section.color} rounded-xl flex items-center justify-center mr-3 sm:mr-4`}>
                    <section.icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-2xl font-bold text-gray-800">{section.title}</h3>
                </div>
                <ul className="space-y-2 sm:space-y-3">
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700 text-sm sm:text-base">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="container mx-auto">
          <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl p-8 sm:p-12 text-center text-white shadow-2xl animate-fade-in">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
              <Code className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">
              Let's Build Something Amazing Together!
            </h2>
            <p className="text-lg sm:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto opacity-90">
              Ready to bring your ideas to life? With my diverse skill set and passion for technology,
              I'm here to help you create exceptional digital experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-amber-600 rounded-xl font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 text-sm sm:text-base">
                View My Projects
              </button>
              <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-semibold border-2 border-white/20 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 text-sm sm:text-base">
                Get In Touch
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Skills;