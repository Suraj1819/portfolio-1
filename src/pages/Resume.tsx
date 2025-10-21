import React, { useEffect, useState } from 'react';
import {
  GraduationCap, Briefcase, Award, Star, Target, ExternalLink,
  Download, Calendar, MapPin, Users, ChevronRight, Sparkles, Code, Server, Brain, GitBranch, Terminal, Monitor, Cloud, Trophy, Lightbulb, Palette, FileText
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import Footer from '../components/Footer';

// Loading Screen Component
const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 5;
      });
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cream-50 via-amber-100 to-yellow-50 px-4">
      <div className="w-full max-w-xs sm:max-w-sm p-6 bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl border border-amber-200 text-center space-y-4">
        <div className="relative w-20 h-20 mx-auto">
          <div className="absolute inset-0 rounded-full border-4 border-amber-300 border-t-transparent animate-spin-slow"></div>
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-orange-500 animate-spin-fast"></div>
          <div className="absolute inset-3 flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-amber-600 animate-pulse" />
          </div>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent">
          Loading Resume
        </h2>
        <p className="text-sm text-gray-600">Preparing your experience...</p>
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-gray-600">
            <span>0%</span>
            <span>{Math.round(progress)}%</span>
            <span>100%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-orange-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        <div className="flex justify-center gap-2">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="w-2 h-2 bg-amber-500 rounded-full animate-bounce"
              style={{ animationDelay: `${index * 0.2}s` }}
            ></div>
          ))}
        </div>
        <div className="bg-white/70 backdrop-blur-sm p-3 rounded-lg border border-amber-200 text-left">
          <p className="text-xs text-gray-600 italic">
            "Built with React, TypeScript, and Tailwind CSS!"
          </p>
        </div>
        <span className="sr-only">Loading professional resume…</span>
      </div>
    </div>
  );
};

// Section Header Component
const SectionHeader = ({ title, subtitle, icon }: { title: string; subtitle: string; icon: React.ReactNode }) => (
  <div className="text-center mb-8 sm:mb-12">
    <div className="flex justify-center mb-3">
      <Badge className="px-3 py-1 bg-amber-100 text-amber-800 hover:bg-amber-200 transition-colors">
        {icon}
      </Badge>
    </div>
    <h2 className="text-3xl sm:text-4xl font-bold mb-3 bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
      {title}
    </h2>
    <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
      {subtitle}
    </p>
  </div>
);

// Stat Card Component
const StatCard = ({ value, label, icon }: { value: string; label: string; icon: React.ReactNode }) => (
  <Card className="bg-white/70 backdrop-blur-sm border border-amber-200 text-center hover:shadow-md transition-all duration-300 hover:scale-105">
    <CardContent className="p-4">
      <div className="flex justify-center mb-2">{icon}</div>
      <div className="text-xl sm:text-2xl font-bold text-gray-800">{value}</div>
      <div className="text-xs sm:text-sm text-gray-600">{label}</div>
    </CardContent>
  </Card>
);

// Skill Card Component
const SkillCard = ({ title, icon, skills, gradient }: { title: string; icon: React.ReactNode; skills: string[]; gradient: string }) => (
  <Card className="bg-white/70 backdrop-blur-sm border border-amber-200 hover:shadow-md transition-all duration-300 hover:scale-105">
    <div className={`h-1 bg-gradient-to-r ${gradient}`}></div>
    <CardHeader className="pb-3">
      <div className="flex items-center space-x-2">
        {icon}
        <CardTitle className="text-base sm:text-lg text-gray-800">{title}</CardTitle>
      </div>
    </CardHeader>
    <CardContent>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <Badge
            key={index}
            variant="secondary"
            className="text-xs sm:text-sm bg-amber-100 text-amber-800 hover:bg-amber-200 transition-colors"
          >
            {skill}
          </Badge>
        ))}
      </div>
    </CardContent>
  </Card>
);

// Experience Card Component
const ExperienceCard = ({ experience }: any) => (
  <Card className="bg-white/70 backdrop-blur-sm border border-amber-200 hover:shadow-md transition-all duration-300 hover:scale-105 group">
    <div className={`h-1 bg-gradient-to-r ${experience.gradient}`}></div>
    <CardHeader>
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg bg-gradient-to-br ${experience.gradient}`}>
            <experience.icon className="h-5 w-5 text-white" />
          </div>
          <div>
            <CardTitle className="text-lg sm:text-xl group-hover:text-amber-600 transition-colors">
              {experience.role}
            </CardTitle>
            <CardDescription className="text-sm sm:text-base text-gray-600 font-medium">
              {experience.company}
            </CardDescription>
          </div>
        </div>
        <div className="text-sm text-gray-500">
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1" />
            {experience.period}
          </div>
          <div className="flex items-center mt-1">
            <MapPin className="h-4 w-4 mr-1" />
            {experience.location}
          </div>
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <ul className="space-y-2 mb-3">
        {experience.responsibilities.map((resp: string, idx: number) => (
          <li key={idx} className="flex items-start space-x-2">
            <ChevronRight className="h-4 w-4 text-amber-500 mt-1 flex-shrink-0" />
            <span className="text-sm sm:text-base text-gray-600">{resp}</span>
          </li>
        ))}
      </ul>
      {experience.tags && (
        <div className="flex flex-wrap gap-2">
          {experience.tags.map((tag: string, idx: number) => (
            <Badge key={idx} variant="outline" className="text-xs border-amber-200">
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </CardContent>
  </Card>
);

// Education Card Component
const EducationCard = ({ education }: any) => (
  <Card className="bg-white/70 backdrop-blur-sm border border-amber-200 hover:shadow-md transition-all duration-300 hover:scale-105 group">
    <div className={`h-24 sm:h-28 bg-gradient-to-br ${education.gradient} relative overflow-hidden`}>
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
        <education.icon className="h-8 w-8 sm:h-10 sm:w-10 text-white" />
      </div>
    </div>
    <CardHeader>
      <CardTitle className="text-lg sm:text-xl group-hover:text-amber-600 transition-colors">
        {education.institution}
      </CardTitle>
      <CardDescription className="text-sm sm:text-base text-gray-600">
        {education.degree}
      </CardDescription>
      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-sm text-gray-500 mt-2">
        <span className="flex items-center mb-1 sm:mb-0">
          <Calendar className="h-4 w-4 mr-1" />
          {education.period}
        </span>
        <span className="flex items-center">
          <MapPin className="h-4 w-4 mr-1" />
          {education.location}
        </span>
      </div>
    </CardHeader>
    <CardContent>
      <ul className="space-y-2">
        {education.details.map((detail: string, idx: number) => (
          <li key={idx} className="flex items-start space-x-2">
            <div className="w-2 h-2 bg-amber-500 rounded-full mt-1.5 flex-shrink-0" />
            <span className="text-sm sm:text-base text-gray-600">{detail}</span>
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
);

// Achievement Card Component
const AchievementCard = ({ achievement }: any) => (
  <Card className="bg-white/70 backdrop-blur-sm border border-amber-200 hover:shadow-md transition-all duration-300 hover:scale-105">
    <CardContent className="p-4">
      <div className="flex items-start space-x-3">
        <div className={`p-2 rounded-lg bg-gradient-to-br ${achievement.gradient}`}>
          <achievement.icon className="h-5 w-5 text-white" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-base sm:text-lg text-gray-800 mb-1">{achievement.title}</h4>
          <p className="text-gray-600 text-sm mb-2">{achievement.description}</p>
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="text-xs bg-amber-100 text-amber-800">
              {achievement.metric}
            </Badge>
            <span className="text-xs text-gray-500">{achievement.value}</span>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

// Certification Card Component
const CertificationCard = ({ certification }: any) => (
  <Card className="bg-white/70 backdrop-blur-sm border border-amber-200 hover:shadow-md transition-all duration-300 hover:scale-105">
    <CardContent className="p-4">
      <div className="flex items-start space-x-3">
        <div className={`p-2 rounded-lg bg-gradient-to-br ${certification.gradient}`}>
          <certification.icon className="h-5 w-5 text-white" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-base sm:text-lg text-gray-800 mb-1">{certification.title}</h4>
          <p className="text-gray-600 text-sm mb-2">{certification.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">{certification.issuer}</span>
            <Badge variant="outline" className="text-xs">
              {certification.date}
            </Badge>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

// Future Goal Card Component
const FutureGoalCard = ({ goal }: any) => (
  <Card className="bg-white/70 backdrop-blur-sm border border-amber-200 hover:shadow-md transition-all duration-300 hover:scale-105 group">
    <div className={`h-20 sm:h-24 bg-gradient-to-br ${goal.gradient} relative overflow-hidden`}>
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
        <goal.icon className="h-8 w-8 text-white" />
      </div>
    </div>
    <CardHeader>
      <div className="flex items-start justify-between">
        <CardTitle className="text-base sm:text-lg group-hover:text-amber-600 transition-colors">
          {goal.title}
        </CardTitle>
        <Badge variant="outline" className="text-xs">
          {goal.timeline}
        </Badge>
      </div>
    </CardHeader>
    <CardContent>
      <p className="text-sm sm:text-base text-gray-600">{goal.description}</p>
    </CardContent>
  </Card>
);

const Resume = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Resume data with skill icons
  const resumeData = {
    education: [
      {
        institution: 'SRT  School, Rautania',
        degree: 'Matriculation (10th Grade)',
        period: '2020',
        location: 'Rautania, muzaffarpur',
        details: [
          'Done my Matriculation from SRT School with 82.6% marks',
          'Subjects: Mathematics, Science, Social Studies, English, Hindi',
          'Extracurricular: Member of Science Club, Participated in Math Olympiad'
        ],
        gradient: 'from-blue-400 via-indigo-500 to-purple-600',
        icon: GraduationCap
      },
      {
        institution: 'SRT  School, Rautania',
        degree: 'Matriculation (12th Grade)',
        period: '2022',
        location: 'Rautania, muzaffarpur',
        details: [
          'Completed Higher Secondary Education with 83.2% marks',
          'Stream: Science (Physics, Chemistry, Mathematics, English, Hindi)',
          'Extracurricular: Captain of School Quiz Team, Volunteered in Tech Fest'
        ],
        gradient: 'from-blue-400 via-indigo-500 to-purple-600',
        icon: GraduationCap
      },
      {
        institution: 'Government Engineering College, Vaishali',
        degree: 'B.Tech in Computer Science and Engineering',
        period: '2023 - Present',
        location: 'Bidupur,Chaksikandar, Vaishali,844115',
        details: [
          'Pursuing Bachelor of Technology with a focus on Software Development',
          'Relevant Courses: Data Structures, Algorithms, Database Management, Web Development',
          'GPA: 8.54/10 till 3rd semester',
          'Expected Graduation: 2027',
          
        ],
        gradient: 'from-emerald-400 via-green-500 to-teal-600',
        icon: Award
      }
    ],
    experience: [
      {
        company: 'Freelance Developer',
        role: 'Full-Stack Web Developer',
        period: 'Jan 2023 - Present',
        location: 'Remote',
        responsibilities: [
          'Developed 10+ client projects using MERN stack',
          'Designed responsive UI/UX with 30% user engagement improvement',
          'Optimized backend APIs reducing response times by 25%',
          'Integrated Stripe payments & AWS S3 storage',
          'Technical consultation for startups'
        ],
        gradient: 'from-pink-500 via-rose-500 to-red-600',
        icon: Briefcase,
        tags: ['React', 'Node.js', 'MongoDB', 'AWS']
      },
      {
        company: 'TechBit',
        role: 'Junior Web Developer (Internship)',
        period: 'Jun 2022 - Dec 2022',
        location: 'Bangalore, India',
        responsibilities: [
          'Built customer dashboard using React & Chart.js',
          'Implemented RESTful APIs handling 10K+ monthly requests',
          'Reduced load times by 15% through optimization',
          'Deployed on AWS with 99.9% uptime'
        ],
        gradient: 'from-amber-400 via-orange-500 to-red-500',
        icon: Briefcase,
        tags: ['React', 'Express', 'AWS', 'MongoDB']
      }
    ],
    certifications: [
      {
        title: 'AWS Certified Cloud Practitioner',
        issuer: 'Amazon Web Services',
        date: 'Aug 2023',
        description: 'Cloud concepts, AWS services, architecture best practices',
        icon: Cloud,
        gradient: 'from-orange-400 to-amber-600'
      },
      {
        title: 'Google UX Design Certificate',
        issuer: 'Coursera',
        date: 'Mar 2022',
        description: 'User-centered design, wireframing, prototyping with Figma',
        icon: Palette,
        gradient: 'from-blue-400 to-indigo-600'
      },
      {
        title: 'Advanced React and Redux',
        issuer: 'Udemy',
        date: 'Jan 2022',
        description: 'React, Redux state management, performance optimization',
        icon: Code,
        gradient: 'from-cyan-400 to-blue-600'
      }
    ],
    achievements: [
      {
        title: 'National Hackathon Winner 2023',
        description: 'Led team to 1st place among 200+ teams',
        icon: Trophy,
        gradient: 'from-yellow-400 to-orange-500',
        metric: '1st Place',
        value: '200+'
      },
      {
        title: 'LeetCode Top 1%',
        description: 'Global ranking in DSA problem solving',
        icon: Target,
        gradient: 'from-purple-400 to-pink-600',
        metric: '500+',
        value: 'Problems Solved'
      },
      {
        title: 'Mentorship Impact',
        description: 'Guided students in programming & web development',
        icon: Users,
        gradient: 'from-green-400 to-emerald-600',
        metric: '100+',
        value: 'Students Mentored'
      }
    ],
    skills: [
      {
        title: 'Frontend Development',
        icon: <Monitor className="h-5 w-5 text-amber-600" />,
        gradient: 'from-blue-400 to-cyan-500',
        skills: [
          { name: 'React.js', icon: '⚛️' },
          { name: 'Next.js', icon: '⚡' },
          { name: 'TypeScript', icon: '🔵' },
          { name: 'Tailwind CSS', icon: '🌪️' },
          { name: 'Redux', icon: '🔄' },
          { name: 'HTML5', icon: '💻' },
          { name: 'CSS3', icon: '🎨' },
          { name: 'JavaScript', icon: '🟡' }
        ]
      },
      {
        title: 'Backend Development',
        icon: <Server className="h-5 w-5 text-amber-600" />,
        gradient: 'from-green-400 to-emerald-500',
        skills: [
          { name: 'Node.js', icon: '🟢' },
          { name: 'Express.js', icon: '🚀' },
          { name: 'MongoDB', icon: '🍃' },
          { name: 'PostgreSQL', icon: '🐘' },
          { name: 'REST APIs', icon: '🔗' },
          { name: 'GraphQL', icon: '📊' },
          { name: 'Firebase', icon: '🔥' }
        ]
      },
      {
        title: 'DevOps & Tools',
        icon: <Terminal className="h-5 w-5 text-amber-600" />,
        gradient: 'from-red-400 to-orange-500',
        skills: [
          { name: 'Git/GitHub', icon: '🐙' },
          { name: 'Docker', icon: '🐳' },
          { name: 'AWS', icon: '☁️' },
          { name: 'CI/CD', icon: '🔄' },
          { name: 'Webpack', icon: '📦' },
          { name: 'Vite', icon: '⚡' },
          { name: 'Jest', icon: '🧪' }
        ]
      },
      {
        title: 'Core CS Skills',
        icon: <Brain className="h-5 w-5 text-amber-600" />,
        gradient: 'from-purple-400 to-violet-500',
        skills: [
          { name: 'Data Structures', icon: '🏗️' },
          { name: 'Algorithms', icon: '🧮' },
          { name: 'OOP', icon: '🔄' },
          { name: 'Computer Networks', icon: '🌐' },
          { name: 'Operating Systems', icon: '🖥️' },
          { name: 'System Design', icon: '📐' },
          { name: 'Database Design', icon: '🗃️' }
        ]
      },
      {
        title: 'Programming Languages',
        icon: <Code className="h-5 w-5 text-amber-600" />,
        gradient: 'from-amber-400 to-yellow-500',
        skills: [
          { name: 'C++', icon: '💻' },
          { name: 'Python', icon: '🐍' },
          { name: 'JavaScript', icon: '🟡' },
          { name: 'TypeScript', icon: '🔵' },
          { name: 'Java', icon: '☕' },
          { name: 'SQL', icon: '🗃️' },
          { name: 'Bash', icon: '🐚' }
        ]
      },
      {
        title: 'Soft Skills',
        icon: <Users className="h-5 w-5 text-amber-600" />,
        gradient: 'from-pink-400 to-rose-500',
        skills: [
          { name: 'Team Leadership', icon: '👥' },
          { name: 'Problem Solving', icon: '🧠' },
          { name: 'Communication', icon: '💬' },
          { name: 'Project Management', icon: '📋' },
          { name: 'Mentoring', icon: '🎓' },
          { name: 'Collaboration', icon: '🤝' },
          { name: 'Creativity', icon: '🎨' }
        ]
      }
    ],
    futureGoals: [
      {
        title: 'Master AI/ML & Web3',
        description: 'TensorFlow, Solidity, blockchain development',
        icon: Lightbulb,
        gradient: 'from-violet-400 to-purple-600',
        timeline: '2024-2025'
      },
      {
        title: 'Open-Source Contributions',
        description: '10+ impactful PRs to major projects',
        icon: GitBranch,
        gradient: 'from-blue-400 to-cyan-600',
        timeline: 'By 2027'
      },
      {
        title: 'Launch EdTech Startup',
        description: 'SaaS product targeting 10K+ users',
        icon: Briefcase,
        gradient: 'from-emerald-400 to-green-600',
        timeline: '2025-2026'
      },
      {
        title: 'Technical Author',
        description: 'Blogs & book on modern web development',
        icon: FileText,
        gradient: 'from-rose-400 to-pink-600',
        timeline: '2026-2027'
      }
    ],
    stats: [
      { value: '10+', label: 'Projects Completed', icon: <Briefcase className="h-6 w-6 text-amber-600 mx-auto mb-2" /> },
      { value: '2+', label: 'Years Experience', icon: <Calendar className="h-6 w-6 text-amber-600 mx-auto mb-2" /> },
      { value: '15+', label: 'Happy Clients', icon: <Users className="h-6 w-6 text-amber-600 mx-auto mb-2" /> },
      { value: '5+', label: 'Certifications', icon: <Award className="h-6 w-6 text-amber-600 mx-auto mb-2" /> }
    ]
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-cream-100 to-amber-50 text-foreground">
      {/* Inline CSS for Animations */}
      <style>{`
        @keyframes spin-slow { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes spin-fast { 0% { transform: rotate(0deg); } 100% { transform: rotate(-360deg); } }
        @keyframes pulse-slow { 0%, 100% { opacity: 0.4; } 50% { opacity: 0.8; } }
        @keyframes bounce-gentle { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        .animate-spin-slow { animation: spin-slow 4s linear infinite; }
        .animate-spin-fast { animation: spin-fast 2s linear infinite; }
        .animate-pulse-slow { animation: pulse-slow 3s ease-in-out infinite; }
        .animate-bounce-gentle { animation: bounce-gentle 2s ease-in-out infinite; }
        .animate-slide-up { animation: fadeInUp 0.6s ease-out; }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      {/* Hero Section */}
      <section className="relative pt-16 pb-12 px-4 sm:pt-20 sm:pb-16 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          {[20, 40, 80].map((top, i) => (
            <div
              key={i}
              className="absolute rounded-full blur-3xl animate-pulse-slow"
              style={{
                top: `${top}%`,
                left: i === 0 ? '10%' : i === 1 ? 'auto' : '33%',
                right: i === 1 ? '10%' : 'auto',
                width: i === 0 ? '12rem' : i === 1 ? '16rem' : '14rem',
                height: i === 0 ? '12rem' : i === 1 ? '16rem' : '14rem',
                background: i === 0 ? 'rgba(251, 191, 36, 0.2)' :
                           i === 1 ? 'rgba(245, 158, 11, 0.2)' : 'rgba(251, 191, 36, 0.2)',
                animationDelay: `${i}s`
              }}
            ></div>
          ))}
        </div>

        <div className="container mx-auto text-center relative z-10">
          <div className="animate-slide-up space-y-4 sm:space-y-6">
            <Badge className="px-3 py-1 text-xs sm:text-sm bg-amber-100 text-amber-800 hover:bg-amber-200 transition-colors">
              Available for Opportunities
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-amber-600 via-orange-600 to-red-500 bg-clip-text text-transparent">
              My Resume
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-xl sm:max-w-2xl mx-auto leading-relaxed">
              Full-Stack Developer & Tech Educator passionate about building scalable solutions and mentoring the next generation.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-6 sm:mt-8">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 px-6 sm:px-8 py-3 group"
              >
                <a href="/resume.pdf" download = "SurajKumar-resume.pdf" className="flex items-center">
                  Download Resume
                  <Download className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-y-0.5 transition-transform" />
                </a>
              </Button>
              <a href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-amber-300 text-gray-700 hover:bg-amber-50 backdrop-blur-sm bg-white/50 hover:border-amber-400 transition-all duration-300 hover:scale-105 px-6 sm:px-8 py-3 group"
                >
                  Get in Touch
                  <ExternalLink className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-0.5 transition-transform" />
                </Button>
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce-gentle">
          <div className="w-5 h-8 border-2 border-amber-400 rounded-full flex justify-center">
            <div className="w-1 h-2 bg-amber-400 rounded-full mt-1 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-8 sm:py-12 px-4 sm:px-6 bg-white/30 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {resumeData.stats.map((stat: any, index: number) => (
              <StatCard
                key={index}
                value={stat.value}
                label={stat.label}
                icon={stat.icon}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="container mx-auto">
          <SectionHeader
            title="Technical Skills"
            subtitle="Comprehensive skill set for modern web development."
            icon={<Code className="w-4 h-4" />}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {resumeData.skills.map((skillCategory: any, index: number) => (
              <SkillCard
                key={index}
                title={skillCategory.title}
                icon={skillCategory.icon}
                skills={skillCategory.skills.map((s: any) => `${s.icon} ${s.name}`)}
                gradient={skillCategory.gradient}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto">
          <SectionHeader
            title="Professional Experience"
            subtitle="Delivering impactful solutions through full-stack expertise."
            icon={<Briefcase className="w-4 h-4" />}
          />
          <div className="space-y-6">
            {resumeData.experience.map((exp: any, index: number) => (
              <ExperienceCard key={index} experience={exp} />
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="container mx-auto">
          <SectionHeader
            title="Education"
            subtitle="Academic foundation with continuous learning."
            icon={<GraduationCap className="w-4 h-4" />}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {resumeData.education.map((edu: any, index: number) => (
              <EducationCard key={index} education={edu} />
            ))}
          </div>
        </div>
      </section>

      {/* Achievements & Certifications */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto">
          <SectionHeader
            title="Achievements & Certifications"
            subtitle="Recognition and professional growth."
            icon={<Award className="w-4 h-4" />}
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800 flex items-center">
                <Star className="h-5 w-5 sm:h-6 sm:w-6 mr-2 text-amber-600" />
                Key Achievements
              </h3>
              <div className="space-y-4">
                {resumeData.achievements.map((ach: any, index: number) => (
                  <AchievementCard key={index} achievement={ach} />
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-800 flex items-center">
                <Award className="h-5 w-5 sm:h-6 sm:w-6 mr-2 text-amber-600" />
                Certifications
              </h3>
              <div className="space-y-4">
                {resumeData.certifications.map((cert: any, index: number) => (
                  <CertificationCard key={index} certification={cert} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Future Goals */}
      <section className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="container mx-auto">
          <SectionHeader
            title="Future Goals"
            subtitle="Aiming to innovate in technology and education."
            icon={<Target className="w-4 h-4" />}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {resumeData.futureGoals.map((goal: any, index: number) => (
              <FutureGoalCard key={index} goal={goal} />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto text-center">
          <Card className="bg-white/70 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-amber-200 animate-slide-up shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-2xl sm:text-3xl font-bold text-gray-800 mb-3">
                Let's Build Something Amazing
              </CardTitle>
              <CardDescription className="text-base sm:text-lg text-gray-600 max-w-xl mx-auto">
                Excited for new challenges and collaborations. Need a developer, consultant, or mentor? I'm here!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 px-6 sm:px-8 py-3 group"
                >
                  <a href="/resume.pdf" download className="flex items-center">
                    Download Resume
                    <Download className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-y-0.5 transition-transform" />
                  </a>
                </Button>
                <a href="#contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto border-amber-300 text-gray-700 hover:bg-amber-50 backdrop-blur-sm bg-white/50 hover:border-amber-400 transition-all duration-300 hover:scale-105 px-6 sm:px-8 py-3 group"
                  >
                    Schedule a Call
                    <ExternalLink className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-0.5 transition-transform" />
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

export default Resume;