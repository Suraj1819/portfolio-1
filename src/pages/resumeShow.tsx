import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Download,
  Eye,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Twitter,
  ExternalLink,
  Calendar,
  Award,
  Briefcase,
  GraduationCap,
  Code,
  Terminal,
  Globe,
  Database,
  Server,
  GitBranch,
  Palette,
  Users,
  Star,
  CheckCircle,
  ChevronRight,
  Heart,
  Target,
  BookOpen,
  MessageSquare,
  Clock,
  FileText,
  Lightbulb,
  Rocket,
  Trophy,
  BarChart3,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import Footer from '../components/Footer';

export default function ResumeDefault() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('preview');
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    // Simulate progressive loading
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 300);
          return 100;
        }
        return prev + 20;
      });
    }, 200);
    
    return () => clearInterval(interval);
  }, []);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Suraj_Kumar_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const skills = [
    { name: 'C++', level: 90, icon: <Terminal className="w-4 h-4" />, category: 'Programming' },
    { name: 'Python', level: 85, icon: <Code className="w-4 h-4" />, category: 'Programming' },
    { name: 'JavaScript', level: 88, icon: <Code className="w-4 h-4" />, category: 'Programming' },
    { name: 'React', level: 85, icon: <Code className="w-4 h-4" />, category: 'Frontend' },
    { name: 'Node.js', level: 80, icon: <Server className="w-4 h-4" />, category: 'Backend' },
    { name: 'Data Structures', level: 88, icon: <GitBranch className="w-4 h-4" />, category: 'Core CS' },
    { name: 'MongoDB', level: 75, icon: <Database className="w-4 h-4" />, category: 'Database' },
    { name: 'Tailwind CSS', level: 85, icon: <Palette className="w-4 h-4" />, category: 'Frontend' },
    { name: 'Git', level: 88, icon: <GitBranch className="w-4 h-4" />, category: 'Tools' },
    { name: 'TypeScript', level: 82, icon: <Code className="w-4 h-4" />, category: 'Programming' },
    { name: 'Express.js', level: 78, icon: <Server className="w-4 h-4" />, category: 'Backend' },
    { name: 'SQL', level: 80, icon: <Database className="w-4 h-4" />, category: 'Database' },
  ];

  const experiences = [
    {
      title: 'Full Stack Developer',
      company: 'Tech Company',
      period: '2022 - Present',
      location: 'Remote',
      type: 'Full-time',
      description: 'Leading the development of scalable web applications and mentoring junior developers in modern web technologies.',
      achievements: [
        'Architected and deployed 5+ production applications serving 10K+ users',
        'Mentored 20+ students in programming, resulting in 15+ successful project completions',
        'Improved system performance by 40% through optimization techniques',
        'Implemented CI/CD pipelines reducing deployment time by 60%',
        'Led a team of 3 developers in agile development methodology'
      ],
      technologies: ['React', 'Node.js', 'MongoDB', 'AWS', 'Docker', 'TypeScript']
    },
    {
      title: 'Software Engineer Intern',
      company: 'Startup Inc.',
      period: '2021 - 2022',
      location: 'Bangalore, India',
      type: 'Internship',
      description: 'Worked on frontend and backend development using modern tech stack, contributing to multiple client projects.',
      achievements: [
        'Built 20+ responsive UI components with 95% accessibility score',
        'Implemented RESTful APIs reducing response time by 30%',
        'Collaborated with cross-functional teams in agile environment',
        'Reduced bug count by 25% through comprehensive testing',
        'Participated in code reviews maintaining code quality standards'
      ],
      technologies: ['JavaScript', 'React', 'Node.js', 'PostgreSQL', 'Redis']
    },
    {
      title: 'Freelance Developer',
      company: 'Self-Employed',
      period: '2020 - 2021',
      location: 'Remote',
      type: 'Freelance',
      description: 'Provided web development solutions to various clients, focusing on e-commerce and educational platforms.',
      achievements: [
        'Delivered 10+ projects on time with 100% client satisfaction',
        'Developed custom e-commerce solutions with payment integration',
        'Created educational platforms with 5K+ active users',
        'Managed full project lifecycle from requirements to deployment'
      ],
      technologies: ['HTML/CSS', 'JavaScript', 'PHP', 'MySQL', 'WordPress']
    }
  ];

  const education = [
    {
      degree: 'Bachelor of Technology',
      field: 'Computer Science & Engineering',
      institution: 'National Institute of Technology',
      location: 'Patna, India',
      period: '2019 - 2023',
      gpa: '8.5/10',
      achievements: [
        'Dean\'s List for 3 consecutive semesters',
        'Led the coding club, organized 10+ workshops',
        'Published research paper on Machine Learning applications',
        'Completed 50+ online courses on various technologies'
      ],
      coursework: ['Data Structures & Algorithms', 'Database Systems', 'Web Development', 'Machine Learning', 'Cloud Computing']
    },
    {
      degree: 'Intermediate',
      field: 'Science (PCM)',
      institution: 'Board of Secondary Education',
      location: 'Bihar, India',
      period: '2017 - 2019',
      gpa: '9.2/10',
      achievements: [
        'Top 5% in state board examinations',
        'School topper in Mathematics and Computer Science',
        'Participated in National Science Exhibition'
      ]
    }
  ];

  const certifications = [
    { name: 'Advanced React Development', issuer: 'Udemy', year: '2023', credential: 'UC-123456', skills: ['React', 'Redux', 'Next.js'] },
    { name: 'Python for Data Science', issuer: 'Coursera', year: '2023', credential: 'COUR-789012', skills: ['Python', 'NumPy', 'Pandas', 'Matplotlib'] },
    { name: 'C++ Programming', issuer: 'NPTEL', year: '2022', credential: 'NPTEL-CS456', skills: ['C++', 'Data Structures', 'Algorithms'] },
    { name: 'AWS Cloud Practitioner', issuer: 'Amazon Web Services', year: '2023', credential: 'AWS-CP-345678', skills: ['AWS', 'Cloud Computing', 'DevOps'] },
    { name: 'MongoDB Certified Developer', issuer: 'MongoDB University', year: '2023', credential: 'MDB-DEV-901234', skills: ['MongoDB', 'NoSQL', 'Database Design'] },
    { name: 'Git Professional', issuer: 'Atlassian', year: '2022', credential: 'GIT-PRO-567890', skills: ['Git', 'GitHub', 'Version Control'] }
  ];

  const projects = [
    {
      name: 'E-Learning Platform',
      description: 'A comprehensive online learning management system with video streaming, quizzes, and progress tracking.',
      technologies: ['React', 'Node.js', 'MongoDB', 'AWS S3'],
      features: ['Real-time video streaming', 'Interactive quizzes', 'Progress analytics', 'Certificate generation'],
      link: 'https://github.com/Suraj1819/elearning',
      status: 'Completed',
      users: '5000+'
    },
    {
      name: 'Task Management App',
      description: 'A collaborative task management tool with real-time updates and team collaboration features.',
      technologies: ['React', 'TypeScript', 'Node.js', 'Socket.io', 'PostgreSQL'],
      features: ['Real-time collaboration', 'Drag-and-drop interface', 'Team management', 'Analytics dashboard'],
      link: 'https://github.com/Suraj1819/taskmanager',
      status: 'In Progress',
      users: '1000+'
    },
    {
      name: 'Blog Platform',
      description: 'A modern blogging platform with markdown support, SEO optimization, and social features.',
      technologies: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Vercel'],
      features: ['Markdown editor', 'SEO optimization', 'Social sharing', 'Comment system'],
      link: 'https://github.com/Suraj1819/blog-platform',
      status: 'Completed',
      users: '2000+'
    }
  ];

  const achievements = [
    {
      title: 'Hackathon Winner',
      organization: 'Tech Innovation Challenge',
      date: '2023',
      description: 'Won first place in a 48-hour hackathon for developing an innovative solution to educational accessibility.',
      icon: <Trophy className="w-5 h-5" />
    },
    {
      title: 'Best Mentor Award',
      organization: 'Coding Bootcamp',
      date: '2023',
      description: 'Recognized for exceptional mentoring skills and dedication to student success.',
      icon: <Award className="w-5 h-5" />
    },
    {
      title: 'Open Source Contributor',
      organization: 'GitHub',
      date: '2022-2023',
      description: 'Contributed to 10+ open source projects with 500+ commits.',
      icon: <Github className="w-5 h-5" />
    },
    {
      title: 'Technical Blogger',
      organization: 'Medium & Dev.to',
      date: '2022-2023',
      description: 'Published 50+ technical articles with 100K+ total views.',
      icon: <FileText className="w-5 h-5" />
    }
  ];

  const testimonials = [
    {
      name: 'Rahul Sharma',
      role: 'B.Tech Student',
      company: 'IIT Delhi',
      content: 'Suraj is an exceptional mentor! His guidance helped me land my dream job at a top tech company.',
      rating: 5,
      avatar: 'RS'
    },
    {
      name: 'Priya Singh',
      role: 'Senior Developer',
      company: 'Microsoft',
      content: 'Working with Suraj was a great experience. His technical skills and problem-solving abilities are outstanding.',
      rating: 5,
      avatar: 'PS'
    },
    {
      name: 'Amit Kumar',
      role: 'Project Manager',
      company: 'Tech Solutions',
      content: 'Suraj delivered our project ahead of schedule with excellent quality. Highly recommended!',
      rating: 5,
      avatar: 'AK'
    }
  ];

  const languages = [
    { name: 'English', proficiency: 'Professional Working', level: 90 },
    { name: 'Hindi', proficiency: 'Native', level: 100 },
    { name: 'Bhojpuri', proficiency: 'Native', level: 100 }
  ];

  const interests = [
    { name: 'Open Source Contribution', icon: <Github className="w-4 h-4" /> },
    { name: 'Technical Writing', icon: <FileText className="w-4 h-4" /> },
    { name: 'Competitive Programming', icon: <Code className="w-4 h-4" /> },
    { name: 'Technology Research', icon: <Lightbulb className="w-4 h-4" /> },
    { name: 'Mentoring', icon: <Users className="w-4 h-4" /> },
    { name: 'Reading Tech Blogs', icon: <BookOpen className="w-4 h-4" /> }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 dark:from-neutral-900 dark:to-neutral-800 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="mb-8">
            <div className="w-20 h-20 mx-auto mb-4 relative">
              <div className="w-20 h-20 border-4 border-amber-200 rounded-full"></div>
              <div className="w-20 h-20 border-4 border-amber-500 border-t-transparent rounded-full absolute top-0 animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Briefcase className="w-8 h-8 text-amber-600" />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Loading Resume</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">Preparing your professional profile...</p>
          </div>
          
          <div className="space-y-4">
            <div className="relative">
              <div className="w-full bg-gray-200 rounded-full h-3 dark:bg-neutral-700">
                <div 
                  className="bg-gradient-to-r from-amber-500 to-orange-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${loadingProgress}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{loadingProgress}%</p>
            </div>
            
            <div className="flex justify-center space-x-2">
              <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
          
          <div className="mt-8 text-xs text-gray-500 dark:text-gray-400">
            <p>Loading components: {loadingProgress < 40 ? 'Profile' : loadingProgress < 80 ? 'Experience & Skills' : 'Projects & Certifications'}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-amber-50 dark:from-neutral-900 dark:to-neutral-800">
      {/* Header */}
      <header className="bg-white dark:bg-neutral-900 border-b border-gray-200 dark:border-neutral-800 sticky top-0 z-40 backdrop-blur-lg bg-opacity-90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className="p-2 text-gray-600 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors dark:text-gray-300 dark:hover:text-amber-400 dark:hover:bg-neutral-800"
                aria-label="Go back"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-3">
                <span className="p-2 bg-amber-100 rounded-lg dark:bg-amber-900/30">
                  <Briefcase className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                </span>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">Resume</h1>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveTab('preview')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'preview' 
                    ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'
                    : 'text-gray-600 hover:text-amber-600 hover:bg-amber-50 dark:text-gray-300 dark:hover:text-amber-400 dark:hover:bg-neutral-800'
                }`}
              >
                <Eye className="w-4 h-4" />
                Preview
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <section className="bg-white dark:bg-neutral-900 rounded-xl shadow-lg p-8 mb-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-start gap-6">
                <div className="w-32 h-32 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                  SK
                </div>
                <div className="flex-1">
                  <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Suraj Kumar</h2>
                  <p className="text-xl text-amber-600 dark:text-amber-400 mb-4">Full Stack Developer & Mentor</p>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    Passionate Software Engineer with 3+ years of experience in building scalable web applications and 
                    empowering developers through mentorship. Specialized in React, Node.js, and cloud technologies. 
                    Committed to writing clean, efficient code and creating exceptional user experiences.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                      <Mail className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                      <a href="mailto:surajkumarraj8888@gmail.com" className="hover:text-amber-600 dark:hover:text-amber-400">
                        surajkumarraj8888@gmail.com
                      </a>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                      <Phone className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                      <a href="tel:+919507272341" className="hover:text-amber-600 dark:hover:text-amber-400">
                        +91 9507272341
                      </a>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                      <MapPin className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                      <span>Vaishali, Bihar, India</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-300">
                      <Globe className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                      <a href="https://surajz.dev" target="_blank" rel="noopener noreferrer" className="hover:text-amber-600 dark:hover:text-amber-400">
                        surajz.dev
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <a
                      href="https://github.com/Suraj1819"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-amber-100 hover:text-amber-600 transition-colors dark:bg-neutral-800 dark:text-gray-300 dark:hover:bg-neutral-700"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/suraj-kumar-72847b30a/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-amber-100 hover:text-amber-600 transition-colors dark:bg-neutral-800 dark:text-gray-300 dark:hover:bg-neutral-700"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a
                      href="https://x.com/SuraJzRt"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-amber-100 hover:text-amber-600 transition-colors dark:bg-neutral-800 dark:text-gray-300 dark:hover:bg-neutral-700"
                    >
                      <Twitter className="w-5 h-5" />
                    </a>
                    <a
                      href="https://medium.com/@surajkumar"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-amber-100 hover:text-amber-600 transition-colors dark:bg-neutral-800 dark:text-gray-300 dark:hover:bg-neutral-700"
                    >
                      <FileText className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-neutral-800 dark:to-neutral-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  Quick Stats
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Experience</span>
                    <span className="text-sm font-semibold text-amber-600 dark:text-amber-400">3+ Years</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Projects</span>
                    <span className="text-sm font-semibold text-amber-600 dark:text-amber-400">15+</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Students Mentored</span>
                    <span className="text-sm font-semibold text-amber-600 dark:text-amber-400">50+</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Tech Stack</span>
                    <span className="text-sm font-semibold text-amber-600 dark:text-amber-400">20+</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-300">Blog Articles</span>
                    <span className="text-sm font-semibold text-amber-600 dark:text-amber-400">50+</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-neutral-800 dark:to-neutral-700 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  Career Goals
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Lead a development team</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Contribute to open source</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Build scalable products</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Tabs */}
        <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-lg mb-8">
          <div className="border-b border-gray-200 dark:border-neutral-800 overflow-x-auto">
            <nav className="flex gap-1 px-8 min-w-max" aria-label="Resume sections">
              {[
                { id: 'preview', label: 'Preview', icon: <Eye className="w-4 h-4" /> },
                { id: 'skills', label: 'Skills', icon: <Code className="w-4 h-4" /> },
                { id: 'experience', label: 'Experience', icon: <Briefcase className="w-4 h-4" /> },
                { id: 'projects', label: 'Projects', icon: <Rocket className="w-4 h-4" /> },
                { id: 'education', label: 'Education', icon: <GraduationCap className="w-4 h-4" /> },
                { id: 'certifications', label: 'Certifications', icon: <Award className="w-4 h-4" /> },
                { id: 'achievements', label: 'Achievements', icon: <Trophy className="w-4 h-4" /> },
                { id: 'testimonials', label: 'Testimonials', icon: <MessageSquare className="w-4 h-4" /> },
                { id: 'languages', label: 'Languages', icon: <Globe className="w-4 h-4" /> },
                { id: 'interests', label: 'Interests', icon: <Heart className="w-4 h-4" /> }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 py-4 px-4 border-b-2 font-medium text-sm capitalize transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-amber-500 text-amber-600 dark:text-amber-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {/* Preview Tab */}
            {activeTab === 'preview' && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Resume Preview</h3>
                <div className="bg-gray-50 dark:bg-neutral-800 rounded-lg p-4">
                  <iframe
                    src="/resume.pdf"
                    title="Resume Preview"
                    className="w-full h-[600px] rounded-lg"
                    frameBorder="0"
                  />
                </div>
              </div>
            )}

            {/* Skills Tab */}
            {activeTab === 'skills' && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Technical Skills</h3>
                <div className="space-y-6">
                  {['Programming', 'Frontend', 'Backend', 'Database', 'Tools', 'Core CS'].map((category) => (
                    <div key={category}>
                      <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-3">{category}</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        {skills.filter(skill => skill.category === category).map((skill) => (
                          <div key={skill.name} className="bg-gray-50 dark:bg-neutral-800 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <span className="text-amber-600 dark:text-amber-400">{skill.icon}</span>
                                <span className="font-medium text-gray-900 dark:text-white">{skill.name}</span>
                              </div>
                              <span className="text-sm text-gray-600 dark:text-gray-300">{skill.level}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-neutral-700">
                              <div
                                className="bg-gradient-to-r from-amber-500 to-orange-500 h-2 rounded-full transition-all duration-1000"
                                style={{ width: `${skill.level}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Experience Tab */}
            {activeTab === 'experience' && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Work Experience</h3>
                <div className="space-y-6">
                  {experiences.map((exp, index) => (
                    <div key={index} className="relative pl-8 pb-6 border-l-2 border-amber-200 dark:border-amber-800 last:border-l-0">
                      <div className="absolute -left-2 top-0 w-4 h-4 bg-amber-500 rounded-full"></div>
                      <div className="bg-gray-50 dark:bg-neutral-800 rounded-lg p-6">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{exp.title}</h4>
                            <p className="text-amber-600 dark:text-amber-400">{exp.company}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300 mt-1">
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {exp.location}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {exp.type}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                            <Calendar className="w-4 h-4" />
                            {exp.period}
                          </div>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">{exp.description}</p>
                        <div className="mb-4">
                          <h5 className="font-medium text-gray-900 dark:text-white mb-2">Key Achievements:</h5>
                          <ul className="space-y-2">
                            {exp.achievements.map((achievement, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                                {achievement}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h5 className="font-medium text-gray-900 dark:text-white mb-2">Technologies Used:</h5>
                          <div className="flex flex-wrap gap-2">
                            {exp.technologies.map((tech, i) => (
                              <span key={i} className="px-3 py-1 bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 rounded-full text-xs">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Projects Tab */}
            {activeTab === 'projects' && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Featured Projects</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {projects.map((project, index) => (
                    <div key={index} className="bg-gray-50 dark:bg-neutral-800 rounded-lg p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{project.name}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          project.status === 'Completed' 
                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                            : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                        }`}>
                          {project.status}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>
                      <div className="mb-4">
                        <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Features:</h5>
                        <ul className="space-y-1">
                          {project.features.map((feature, i) => (
                            <li key={i} className="text-xs text-gray-600 dark:text-gray-300 flex items-center gap-1">
                              <CheckCircle className="w-3 h-3 text-green-500" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="mb-4">
                        <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Technologies:</h5>
                        <div className="flex flex-wrap gap-1">
                          {project.technologies.map((tech, i) => (
                            <span key={i} className="px-2 py-1 bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 rounded text-xs">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          <Users className="w-3 h-3 inline mr-1" />
                          {project.users} users
                        </span>
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education Tab */}
            {activeTab === 'education' && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Education</h3>
                <div className="space-y-6">
                  {education.map((edu, index) => (
                    <div key={index} className="bg-gray-50 dark:bg-neutral-800 rounded-lg p-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-amber-100 rounded-lg dark:bg-amber-900/30">
                          <GraduationCap className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{edu.degree}</h4>
                          <p className="text-amber-600 dark:text-amber-400">{edu.field}</p>
                          <p className="text-gray-600 dark:text-gray-300">{edu.institution} • {edu.location}</p>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-600 dark:text-gray-300">
                            <span className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              {edu.period}
                            </span>
                            <span className="flex items-center gap-2">
                              <Award className="w-4 h-4" />
                              GPA: {edu.gpa}
                            </span>
                          </div>
                          {edu.achievements && (
                            <div className="mt-4">
                              <h5 className="font-medium text-gray-900 dark:text-white mb-2">Achievements:</h5>
                              <ul className="space-y-1">
                                {edu.achievements.map((achievement, i) => (
                                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                                    {achievement}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {edu.coursework && (
                            <div className="mt-4">
                              <h5 className="font-medium text-gray-900 dark:text-white mb-2">Relevant Coursework:</h5>
                              <div className="flex flex-wrap gap-2">
                                {edu.coursework.map((course, i) => (
                                  <span key={i} className="px-3 py-1 bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 rounded-full text-xs">
                                    {course}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications Tab */}
            {activeTab === 'certifications' && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Certifications</h3>
                <div className="space-y-4">
                  {certifications.map((cert, index) => (
                    <div key={index} className="bg-gray-50 dark:bg-neutral-800 rounded-lg p-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-amber-100 rounded-lg dark:bg-amber-900/30">
                          <Award className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{cert.name}</h4>
                              <p className="text-amber-600 dark:text-amber-400">{cert.issuer}</p>
                            </div>
                            <div className="text-right">
                              <span className="text-sm text-gray-600 dark:text-gray-300">{cert.year}</span>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">ID: {cert.credential}</p>
                            </div>
                          </div>
                          <div className="mt-3">
                            <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Skills:</h5>
                            <div className="flex flex-wrap gap-2">
                              {cert.skills.map((skill, i) => (
                                <span key={i} className="px-3 py-1 bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 rounded-full text-xs">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Achievements Tab */}
            {activeTab === 'achievements' && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Achievements & Awards</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="bg-gray-50 dark:bg-neutral-800 rounded-lg p-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-amber-100 rounded-lg dark:bg-amber-900/30 text-amber-600 dark:text-amber-400">
                          {achievement.icon}
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{achievement.title}</h4>
                          <p className="text-amber-600 dark:text-amber-400">{achievement.organization}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{achievement.date}</p>
                          <p className="text-gray-600 dark:text-gray-300">{achievement.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Testimonials Tab */}
            {activeTab === 'testimonials' && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Testimonials</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {testimonials.map((testimonial, index) => (
                    <div key={index} className="bg-gray-50 dark:bg-neutral-800 rounded-lg p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                          {testimonial.avatar}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</h4>
                          <p className="text-amber-600 dark:text-amber-400 text-sm">{testimonial.role}</p>
                          <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">{testimonial.company}</p>
                          <div className="flex mb-3">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${i < testimonial.rating ? 'text-amber-500 fill-amber-500' : 'text-gray-300 dark:text-gray-600'}`}
                              />
                            ))}
                          </div>
                          <p className="text-gray-600 dark:text-gray-300 italic">"{testimonial.content}"</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Languages Tab */}
            {activeTab === 'languages' && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Languages</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {languages.map((language, index) => (
                    <div key={index} className="bg-gray-50 dark:bg-neutral-800 rounded-lg p-6">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{language.name}</h4>
                        <span className="text-sm text-amber-600 dark:text-amber-400">{language.proficiency}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 dark:bg-neutral-700">
                        <div
                          className="bg-gradient-to-r from-amber-500 to-orange-500 h-3 rounded-full transition-all duration-1000"
                          style={{ width: `${language.level}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{language.level}% Proficiency</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Interests Tab */}
            {activeTab === 'interests' && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Interests & Hobbies</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {interests.map((interest, index) => (
                    <div key={index} className="bg-gray-50 dark:bg-neutral-800 rounded-lg p-4 flex items-center gap-3">
                      <div className="p-2 bg-amber-100 rounded-lg dark:bg-amber-900/30 text-amber-600 dark:text-amber-400">
                        {interest.icon}
                      </div>
                      <span className="text-gray-900 dark:text-white">{interest.name}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-neutral-800 dark:to-neutral-700 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Personal Statement</h4>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Beyond coding, I'm passionate about knowledge sharing and community building. I believe in the 
                    power of education and regularly contribute to open-source projects. I enjoy exploring new 
                    technologies, writing technical articles, and mentoring aspiring developers. In my free time, 
                    you'll find me reading tech blogs, participating in hackathons, or working on personal projects 
                    that push the boundaries of what's possible with code.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Call to Action */}
        <section className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Let's Work Together</h3>
          <p className="mb-6 opacity-90">I'm always open to discussing new opportunities and exciting projects.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="px-6 py-3 bg-white text-amber-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Get In Touch
            </Link>
            <Link
              to="/projects"
              className="px-6 py-3 bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-700 transition-colors"
            >
              View Projects
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer/>
    </div>
  );
}