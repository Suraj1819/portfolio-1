import { useState, useEffect } from 'react';
import { CheckCircle, Mail, Bell, Gift, Sparkles, ArrowRight, Clock, BookOpen, Star, Heart, Zap, Users, Code, Award,Calendar,Rss, Shield, Target, Lightbulb, Rocket, TrendingUp, FileText, Briefcase, Headphones, Video, MonitorPlay, Coffee, Database, Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const Subscribed = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [confetti, setConfetti] = useState(false);
  const [showBonusContent, setShowBonusContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setConfetti(true);
      setTimeout(() => setConfetti(false), 4000);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Professional Loading Screen
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cream-50 to-amber-50">
        <div className="text-center max-w-md px-4">
          {/* Email subscription animation */}
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-8">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative animate-pulse-email">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-2xl">
                  <Mail className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
                {/* Floating bell notifications */}
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center animate-bounce">
                  <Bell className="w-3 h-3 text-white" />
                </div>
              </div>
            </div>
            {/* Ripple effect */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 border-2 border-amber-300 rounded-full animate-ping opacity-75"></div>
              <div className="absolute w-28 h-28 sm:w-32 sm:h-32 border-2 border-amber-200 rounded-full animate-ping opacity-50" style={{ animationDelay: '0.5s' }}></div>
            </div>
          </div>
          
          <h2 className="text-xl sm:text-2xl font-bold text-cream-800 mb-3">
            Setting Up Your Subscription
          </h2>
          <p className="text-sm sm:text-base text-cream-600 mb-6">
            Adding you to our exclusive newsletter...
          </p>
          
          {/* Animated dots */}
          <div className="flex justify-center gap-2">
            <span className="w-2 h-2 sm:w-3 sm:h-3 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
            <span className="w-2 h-2 sm:w-3 sm:h-3 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
            <span className="w-2 h-2 sm:w-3 sm:h-3 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
          </div>
          
          <style>{`
            @keyframes pulse-email {
              0%, 100% { transform: scale(1) rotate(0deg); }
              50% { transform: scale(1.1) rotate(5deg); }
            }
            .animate-pulse-email {
              animation: pulse-email 2s ease-in-out infinite;
            }
          `}</style>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 sm:pt-20 px-4 sm:px-6 lg:px-8 animate-fade-in bg-gradient-to-br from-cream-50 via-white to-amber-50 relative overflow-hidden">
      {/* Enhanced Confetti Effect */}
      {confetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {/* Regular confetti */}
          {[...Array(60)].map((_, i) => (
            <div
              key={`confetti-${i}`}
              className={`absolute animate-confetti ${
                i % 4 === 0 ? 'bg-amber-500' : 
                i % 4 === 1 ? 'bg-orange-500' : 
                i % 4 === 2 ? 'bg-red-500' : 'bg-pink-500'
              }`}
              style={{
                width: `${Math.random() * 6 + 4}px`,
                height: `${Math.random() * 6 + 4}px`,
                left: `${Math.random() * 100}%`,
                top: '-10px',
                borderRadius: Math.random() > 0.5 ? '50%' : '0%',
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
          {/* Emoji confetti */}
          {['🎉', '🚀', '💻', '⭐', '🔥', '💎', '🏆', '🎊'].map((emoji, i) => (
            <div
              key={`emoji-${i}`}
              className="absolute text-2xl animate-confetti-slow"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-50px',
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            >
              {emoji}
            </div>
          ))}
        </div>
      )}

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Hero Subscription Success Section */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 mx-auto mb-6 bg-gradient-to-br from-green-100 to-emerald-200 rounded-full flex items-center justify-center shadow-xl animate-scale-in">
            <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-green-600 animate-check" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-cream-800 mb-4 sm:mb-6 px-4">
            Welcome to the Community!
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-cream-600 max-w-3xl mx-auto mb-6 sm:mb-8 px-4 leading-relaxed">
            🎉 Congratulations! You've successfully subscribed to my newsletter. You're now part of an exclusive community of developers, learners, and tech enthusiasts who receive premium content straight to their inbox.
          </p>
          <div className="bg-gradient-to-r from-amber-100 to-orange-100 backdrop-blur-sm p-4 sm:p-6 rounded-2xl border-2 border-amber-200 inline-block shadow-lg mx-4">
            <p className="text-base sm:text-lg font-semibold text-amber-700 flex items-center gap-2 justify-center flex-wrap">
              <Gift className="w-5 h-5 sm:w-6 sm:h-6" />
              <span>Check your inbox for a welcome gift worth \$50!</span>
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
            </p>
          </div>
        </div>

        {/* What You'll Get Timeline */}
        <div className="mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-cream-800 mb-8 sm:mb-12 text-center">
            What's Coming Your Way?
          </h2>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {/* Weekly Tips */}
              <div className="relative group">
                <div className="bg-white/80 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border-2 border-purple-200 hover:border-purple-400 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mb-4 sm:mb-6 mx-auto shadow-lg">
                    <BookOpen className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-cream-800 mb-3 text-center">Weekly Tips</h3>
                  <p className="text-sm sm:text-base text-cream-600 text-center leading-relaxed">
                    Expert coding tips, best practices, and problem-solving techniques delivered every Tuesday.
                  </p>
                </div>
              </div>

              {/* Project Updates */}
              <div className="relative group">
                <div className="bg-white/80 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border-2 border-blue-200 hover:border-blue-400 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mb-4 sm:mb-6 mx-auto shadow-lg">
                    <Code className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-cream-800 mb-3 text-center">Project Updates</h3>
                  <p className="text-sm sm:text-base text-cream-600 text-center leading-relaxed">
                    Behind-the-scenes looks at my latest projects and exclusive previews.
                  </p>
                </div>
              </div>

              {/* Tech Insights */}
              <div className="relative group">
                <div className="bg-white/80 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border-2 border-green-200 hover:border-green-400 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center mb-4 sm:mb-6 mx-auto shadow-lg">
                    <Zap className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-cream-800 mb-3 text-center">Tech Insights</h3>
                  <p className="text-sm sm:text-base text-cream-600 text-center leading-relaxed">
                    Industry trends, new technologies, and deep dives into programming concepts.
                  </p>
                </div>
              </div>

              {/* Exclusive Content */}
              <div className="relative group">
                <div className="bg-white/80 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border-2 border-amber-200 hover:border-amber-400 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mb-4 sm:mb-6 mx-auto shadow-lg">
                    <Star className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-cream-800 mb-3 text-center">Exclusive Content</h3>
                  <p className="text-sm sm:text-base text-cream-600 text-center leading-relaxed">
                    Subscriber-only tutorials, resources, and early access to new content.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Services Available Section */}
        <div className="mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-cream-800 mb-8 sm:mb-12 text-center">
            Exclusive Services for Subscribers
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Development Services */}
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-8 text-white shadow-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                  <Code className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Development Services</h3>
                  <p className="opacity-90">Premium 20% subscriber discount</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white/10 rounded-xl p-4">
                  <h4 className="font-semibold mb-2">Web Development</h4>
                  <p className="text-sm opacity-90">Full-stack applications with modern frameworks</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <h4 className="font-semibold mb-2">Mobile Apps</h4>
                  <p className="text-sm opacity-90">React Native & Flutter development</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <h4 className="font-semibold mb-2">API Development</h4>
                  <p className="text-sm opacity-90">RESTful APIs and microservices</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <h4 className="font-semibold mb-2">Database Design</h4>
                  <p className="text-sm opacity-90">Optimized database architecture</p>
                </div>
              </div>
              <Link 
                to="/services" 
                className="mt-6 inline-flex items-center px-6 py-3 bg-white/20 hover:bg-white/30 rounded-xl transition-colors font-semibold"
              >
                View All Services <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>

            {/* Mentoring & Consultation */}
            <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-3xl p-8 text-white shadow-2xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Mentoring & Consultation</h3>
                  <p className="opacity-90">1-on-1 guidance for career growth</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Target className="w-5 h-5" />
                    <h4 className="font-semibold">Career Guidance</h4>
                  </div>
                  <p className="text-sm opacity-90">Personalized roadmaps for your developer journey</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Lightbulb className="w-5 h-5" />
                    <h4 className="font-semibold">Code Reviews</h4>
                  </div>
                  <p className="text-sm opacity-90">Professional feedback on your projects</p>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <Briefcase className="w-5 h-5" />
                    <h4 className="font-semibold">Interview Prep</h4>
                  </div>
                  <p className="text-sm opacity-90">Technical interview coaching and mock sessions</p>
                </div>
              </div>
              <Link 
                to="/mentoring" 
                className="mt-6 inline-flex items-center px-6 py-3 bg-white/20 hover:bg-white/30 rounded-xl transition-colors font-semibold"
              >
                Book Session <Calendar className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Learning Resources Hub */}
        <div className="mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-cream-800 mb-8 sm:mb-12 text-center">
            Exclusive Learning Resources
          </h2>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {/* Video Tutorials */}
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-cream-200 hover:border-amber-300 transition-all duration-300 hover:shadow-lg group">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-red-200 transition-colors">
                  <Video className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="text-lg font-bold text-cream-800 mb-2">Premium Tutorials</h3>
                <p className="text-sm text-cream-600 mb-4">Subscriber-only video content covering advanced topics</p>
                <div className="flex items-center text-xs text-amber-600">
                  <MonitorPlay className="w-4 h-4 mr-1" />
                  50+ Hours of Content
                </div>
              </div>

              {/* Code Templates */}
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-cream-200 hover:border-amber-300 transition-all duration-300 hover:shadow-lg group">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                  <Terminal className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-cream-800 mb-2">Code Templates</h3>
                <p className="text-sm text-cream-600 mb-4">Ready-to-use project templates and boilerplates</p>
                <div className="flex items-center text-xs text-amber-600">
                  <FileText className="w-4 h-4 mr-1" />
                  React, Node.js, Python & More
                </div>
              </div>

              {/* Live Q&A Sessions */}
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-cream-200 hover:border-amber-300 transition-all duration-300 hover:shadow-lg group">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                  <Headphones className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-bold text-cream-800 mb-2">Live Q&A Sessions</h3>
                <p className="text-sm text-cream-600 mb-4">Monthly live sessions to answer your coding questions</p>
                <div className="flex items-center text-xs text-amber-600">
                  <Calendar className="w-4 h-4 mr-1" />
                  Every 2nd Friday
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Subscription Benefits */}
        <div className="mb-12 sm:mb-16 lg:mb-20">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-purple-500 to-indigo-600 rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl text-white">
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0">
                <Gift className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Your Welcome Gift is Ready!</h3>
                <p className="text-base sm:text-lg leading-relaxed opacity-95 mb-4">
                  As a new subscriber, you'll receive a <span className="font-bold underline">free coding cheat sheet collection</span> and access to my exclusive <span className="font-bold">DSA problem-solving guide</span> - both worth \$50!
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div className="bg-white/10 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <FileText className="w-4 h-4" />
                      <span className="font-semibold">Cheat Sheets Bundle</span>
                    </div>
                    <p className="opacity-80">JavaScript, React, Python, C++ reference guides</p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Database className="w-4 h-4" />
                      <span className="font-semibold">DSA Guide</span>
                    </div>
                    <p className="opacity-80">100+ solved problems with explanations</p>
                  </div>
                </div>
                <p className="text-sm opacity-80 mt-4">
                  Check your email inbox in the next few minutes 📧
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Schedule */}
        <div className="mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-cream-800 mb-8 sm:mb-12 text-center">
            Your Weekly Schedule
          </h2>
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* Tuesday */}
            <div className="bg-white/80 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border-2 border-cream-200 hover:border-amber-400 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-cream-800 mb-2">Tuesday</h3>
                <h4 className="text-lg font-semibold text-amber-600 mb-3">Tech Tuesday</h4>
                <p className="text-sm text-cream-600 mb-4">
                  Weekly coding tips, algorithm explanations, and programming best practices.
                </p>
                <div className="bg-amber-50 rounded-lg p-3 text-xs text-amber-700">
                  <strong>Next Topic:</strong> Advanced React Hooks Patterns
                </div>
              </div>
            </div>

            {/* Friday */}
            <div className="bg-white/80 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border-2 border-cream-200 hover:border-amber-400 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Rss className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-cream-800 mb-2">Friday</h3>
                <h4 className="text-lg font-semibold text-amber-600 mb-3">Feature Friday</h4>
                <p className="text-sm text-cream-600 mb-4">
                  Project spotlights, tool reviews, and industry insights to end your week.
                </p>
                <div className="bg-blue-50 rounded-lg p-3 text-xs text-blue-700">
                  <strong>This Week:</strong> Top VS Code Extensions for 2025
                </div>
              </div>
            </div>

            {/* Monthly */}
            <div className="bg-white/80 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border-2 border-cream-200 hover:border-amber-400 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-cream-800 mb-2">Monthly</h3>
                <h4 className="text-lg font-semibold text-amber-600 mb-3">Exclusive Bonus</h4>
                <p className="text-sm text-cream-600 mb-4">
                  Special tutorials, resource bundles, and subscriber-only content.
                </p>
                <div className="bg-green-50 rounded-lg p-3 text-xs text-green-700">
                  <strong>November:</strong> Complete Node.js Authentication Guide
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bonus Content Section */}
        <div className="mb-12 sm:mb-16 lg:mb-20">
          <div className="max-w-4xl mx-auto text-center">
            <button
              onClick={() => setShowBonusContent(!showBonusContent)}
              className="mb-8 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              🎁 Unlock Bonus Content Preview
            </button>
            
            {showBonusContent && (
              <div className="animate-scale-in bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-8 border-2 border-indigo-200">
                <h3 className="text-2xl font-bold text-cream-800 mb-6">Exclusive Subscriber Bonuses</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white/60 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Rocket className="w-6 h-6 text-indigo-600" />
                      <h4 className="font-bold text-cream-800">Project Bootcamp</h4>
                    </div>
                    <p className="text-sm text-cream-600">6-week intensive project building course worth $200</p>
                  </div>
                  <div className="bg-white/60 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Coffee className="w-6 h-6 text-brown-600" />
                      <h4 className="font-bold text-cream-800">Coffee Chat Sessions</h4>
                    </div>
                    <p className="text-sm text-cream-600">Monthly 1-on-1 virtual coffee conversations</p>
                  </div>
                  <div className="bg-white/60 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <TrendingUp className="w-6 h-6 text-green-600" />
                      <h4 className="font-bold text-cream-800">Career Growth Guide</h4>
                    </div>
                    <p className="text-sm text-cream-600">Personalized roadmap for your tech career</p>
                  </div>
                  <div className="bg-white/60 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Shield className="w-6 h-6 text-red-600" />
                      <h4 className="font-bold text-cream-800">Priority Support</h4>
                    </div>
                    <p className="text-sm text-cream-600">Get your questions answered within 24 hours</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Community Stats */}
        <div className="mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-cream-800 mb-8 sm:mb-12 text-center">
            Join Our Growing Community
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
            {[
              { number: '1,200+', label: 'Subscribers', icon: Users, color: 'bg-blue-100 text-blue-600' },
              { number: '95%', label: 'Open Rate', icon: Mail, color: 'bg-green-100 text-green-600' },
              { number: '500+', label: 'Resources Shared', icon: BookOpen, color: 'bg-purple-100 text-purple-600' },
              { number: '4.9/5', label: 'Average Rating', icon: Star, color: 'bg-yellow-100 text-yellow-600' }
            ].map((stat, index) => (
              <div key={index} className="bg-white/70 backdrop-blur-sm p-4 sm:p-6 rounded-2xl border border-cream-200 hover:border-amber-300 transition-all duration-300 hover:shadow-lg text-center group hover:-translate-y-1">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 ${stat.color} rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                  <stat.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <p className="text-xl sm:text-2xl font-bold text-cream-800 mb-1">{stat.number}</p>
                <p className="text-xs sm:text-sm text-cream-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* What's Next Section */}
        <div className="mb-12 sm:mb-16 lg:mb-20">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-amber-400 to-orange-500 rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl text-white text-center">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6">
              <Clock className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">What Happens Next?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="bg-white/10 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold">1</div>
                  <h4 className="font-semibold">Check Your Email</h4>
                </div>
                <p className="text-sm opacity-90">Welcome email with your free gift bundle is already on its way!</p>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold">2</div>
                  <h4 className="font-semibold">First Newsletter</h4>
                </div>
                <p className="text-sm opacity-90">Your first Tech Tuesday newsletter arrives this Tuesday!</p>
              </div>
              <div className="bg-white/10 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-sm font-bold">3</div>
                  <h4 className="font-semibold">Join the Journey</h4>
                </div>
                <p className="text-sm opacity-90">Follow along as we explore coding and build amazing projects together!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Social Proof */}
        <div className="mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-cream-800 mb-8 sm:mb-12 text-center">
            What Subscribers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Sarah Chen",
                role: "Frontend Developer",
                quote: "Best programming newsletter I've subscribed to! The tips are practical and the resources are gold.",
                rating: 5,
                avatar: "SC"
              },
              {
                name: "Mike Johnson",
                role: "CS Student",
                quote: "Suraj's newsletter helped me ace my coding interviews. The DSA explanations are crystal clear!",
                rating: 5,
                avatar: "MJ"
              },
              {
                name: "Priya Patel",
                role: "Full Stack Developer",
                quote: "I look forward to every Tuesday newsletter. Always learn something new that I can apply immediately.",
                rating: 5,
                avatar: "PP"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl border border-cream-200 hover:border-amber-300 transition-all duration-300 hover:shadow-lg group hover:-translate-y-1">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-cream-600 mb-4 italic">"{testimonial.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">{testimonial.avatar}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-cream-800 text-sm">{testimonial.name}</p>
                    <p className="text-xs text-cream-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center pb-12 sm:pb-16">
          <div className="bg-gradient-to-r from-cream-100 to-amber-100 rounded-3xl p-8 sm:p-12 max-w-4xl mx-auto border-2 border-amber-200 shadow-xl">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-cream-800 mb-4 sm:mb-6">
              Thank You for Joining Our Community!
            </h3>
            <p className="text-base sm:text-lg text-cream-600 mb-6 sm:mb-8 leading-relaxed">
              You've made a great choice by subscribing! While you wait for your first newsletter, explore my portfolio, check out my latest projects, or connect with me on social media.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Link 
                to="/" 
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 text-sm sm:text-base"
              >
                <span>Explore Portfolio</span>
                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
              <Link 
                to="/blog" 
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-white hover:bg-cream-50 text-amber-600 rounded-xl font-semibold border-2 border-amber-300 hover:border-amber-400 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 text-sm sm:text-base"
              >
                <span>Read Blog</span>
              </Link>
              <Link 
                to="/projects" 
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 text-sm sm:text-base"
              >
                <span>View Projects</span>
              </Link>
            </div>
            
            {/* Email modification note */}
            <div className="p-4 bg-white/50 rounded-xl">
              <p className="text-sm text-cream-600">
                <strong>Note:</strong> You can modify your subscription preferences or unsubscribe at any time using the links in the newsletter footer. We respect your privacy and will never spam you.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-in;
        }
        @keyframes scale-in {
          0% { transform: scale(0); opacity: 0; }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-scale-in {
          animation: scale-in 0.6s ease-out;
        }
        @keyframes check {
          0% { transform: scale(0) rotate(0deg); }
          50% { transform: scale(1.2) rotate(180deg); }
          100% { transform: scale(1) rotate(360deg); }
        }
        .animate-check {
          animation: check 0.6s ease-out 0.3s both;
        }
        @keyframes confetti {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        .animate-confetti {
          animation: confetti 3s ease-in-out forwards;
        }
        @keyframes confetti-slow {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
        }
        .animate-confetti-slow {
          animation: confetti-slow 4s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Subscribed;