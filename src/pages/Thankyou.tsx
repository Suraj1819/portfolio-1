


import  { useState, useEffect } from 'react';
import { CheckCircle, Mail, PhoneCall, MapPinHouseIcon, Github, Linkedin, X, Code2, Instagram, Facebook, Disc2, Telescope, ArrowRight, Clock, MessageSquare, Calendar, Sparkles, Send, Heart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const ThankYou = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [confetti, setConfetti] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setConfetti(true);
      setTimeout(() => setConfetti(false), 3000);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Professional Loading Screen
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cream-50 to-amber-50">
        <div className="text-center max-w-md px-4">
          {/* Paper plane animation */}
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-8">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative animate-fly">
                <svg 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  className="w-12 h-12 sm:w-16 sm:h-16 text-amber-500"
                  style={{ filter: 'drop-shadow(0 4px 6px rgba(245, 158, 11, 0.3))' }}
                >
                  <path 
                    d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            {/* Dotted path */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-full relative">
                <div className="absolute top-1/2 left-0 w-full h-0.5 border-t-2 border-dotted border-amber-300 transform -translate-y-1/2"></div>
              </div>
            </div>
          </div>
          
          <h2 className="text-xl sm:text-2xl font-bold text-cream-800 mb-3">
            Sending Your Message
          </h2>
          <p className="text-sm sm:text-base text-cream-600 mb-6">
            Your message is on its way to my inbox...
          </p>
          
          {/* Animated dots */}
          <div className="flex justify-center gap-2">
            <span className="w-2 h-2 sm:w-3 sm:h-3 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
            <span className="w-2 h-2 sm:w-3 sm:h-3 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
            <span className="w-2 h-2 sm:w-3 sm:h-3 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
          </div>
          
          <style>{`
            @keyframes fly {
              0%, 100% { transform: translate(0, 0) rotate(-15deg); }
              50% { transform: translate(10px, -10px) rotate(-10deg); }
            }
            .animate-fly {
              animation: fly 2s ease-in-out infinite;
            }
          `}</style>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 sm:pt-20 px-4 sm:px-6 lg:px-8 animate-fade-in bg-gradient-to-br from-cream-50 via-white to-amber-50 relative overflow-hidden">
      {/* Confetti Effect */}
      {confetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-amber-500 rounded-full animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-10px',
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      )}

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Hero Thank You Section */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 mx-auto mb-6 bg-gradient-to-br from-green-100 to-emerald-200 rounded-full flex items-center justify-center shadow-xl animate-scale-in">
            <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-green-600 animate-check" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-cream-800 mb-4 sm:mb-6 px-4">
            Message Sent Successfully!
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-cream-600 max-w-2xl mx-auto mb-6 sm:mb-8 px-4 leading-relaxed">
            Thank you for reaching out! Your message has been delivered to my inbox. I appreciate you taking the time to connect, and I'll get back to you as soon as possible.
          </p>
          <div className="bg-white/80 backdrop-blur-sm p-4 sm:p-6 rounded-2xl border-2 border-amber-200 inline-block shadow-lg mx-4">
            <p className="text-base sm:text-lg font-semibold text-amber-700 flex items-center gap-2 justify-center flex-wrap">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
              <span>I'll respond within 24-48 hours!</span>
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
            </p>
          </div>
        </div>

        {/* What Happens Next Timeline */}
        <div className="mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-cream-800 mb-8 sm:mb-12 text-center">
            What Happens Next?
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {/* Step 1 */}
              <div className="relative group">
                <div className="bg-white/80 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border-2 border-amber-200 hover:border-amber-400 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center mb-4 sm:mb-6 mx-auto shadow-lg">
                    <MessageSquare className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>
                  <div className="absolute -top-3 -right-3 w-8 h-8 sm:w-10 sm:h-10 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold text-sm sm:text-base shadow-lg">
                    1
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-cream-800 mb-3 text-center">Message Received</h3>
                  <p className="text-sm sm:text-base text-cream-600 text-center leading-relaxed">
                    Your message is now in my priority inbox and flagged for immediate attention.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative group">
                <div className="bg-white/80 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border-2 border-amber-200 hover:border-amber-400 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mb-4 sm:mb-6 mx-auto shadow-lg">
                    <Clock className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>
                  <div className="absolute -top-3 -right-3 w-8 h-8 sm:w-10 sm:h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm sm:text-base shadow-lg">
                    2
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-cream-800 mb-3 text-center">Review & Analysis</h3>
                  <p className="text-sm sm:text-base text-cream-600 text-center leading-relaxed">
                    I'll carefully review your requirements and prepare a thoughtful response.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative group">
                <div className="bg-white/80 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border-2 border-amber-200 hover:border-amber-400 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center mb-4 sm:mb-6 mx-auto shadow-lg">
                    <Send className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>
                  <div className="absolute -top-3 -right-3 w-8 h-8 sm:w-10 sm:h-10 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm sm:text-base shadow-lg">
                    3
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-cream-800 mb-3 text-center">Detailed Response</h3>
                  <p className="text-sm sm:text-base text-cream-600 text-center leading-relaxed">
                    You'll receive a comprehensive reply with next steps within 24-48 hours.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Response Time Guarantee */}
        <div className="mb-12 sm:mb-16 lg:mb-20">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl text-white">
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0">
                <Calendar className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">My Commitment to You</h3>
                <p className="text-base sm:text-lg leading-relaxed opacity-95">
                  I understand your time is valuable. That's why I guarantee a response within <span className="font-bold underline">24-48 hours</span> during business days. For urgent matters, don't hesitate to give me a call directly!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Contact Options */}
        <div className="mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-cream-800 mb-8 sm:mb-12 text-center">
            Need Immediate Assistance?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto">
            {/* Email */}
            <div className="bg-white/80 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border-2 border-cream-200 hover:border-amber-400 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <Mail className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-cream-800 mb-2 text-center">Email Me</h3>
              <p className="text-sm sm:text-base text-cream-600 mb-3 sm:mb-4 text-center">Check your inbox for updates</p>
              <a 
                href="mailto:surajkr.sinha2003@gmail.com" 
                className="block text-center text-sm sm:text-base text-amber-600 hover:text-amber-700 font-semibold hover:underline transition-colors"
              >
                surajkr.sinha2003@gmail.com
              </a>
            </div>

            {/* Phone */}
            <div className="bg-white/80 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border-2 border-cream-200 hover:border-amber-400 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <PhoneCall className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-cream-800 mb-2 text-center">Call Direct</h3>
              <p className="text-sm sm:text-base text-cream-600 mb-3 sm:mb-4 text-center">For urgent discussions</p>
              <a 
                href="tel:+919507272341" 
                className="block text-center text-sm sm:text-base text-amber-600 hover:text-amber-700 font-semibold hover:underline transition-colors"
              >
                +91 9507272341
              </a>
            </div>

            {/* Location */}
            <div className="bg-white/80 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border-2 border-cream-200 hover:border-amber-400 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group sm:col-span-2 lg:col-span-1">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-red-400 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <MapPinHouseIcon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-cream-800 mb-2 text-center">Visit Me</h3>
              <p className="text-sm sm:text-base text-cream-600 mb-3 sm:mb-4 text-center">Marwan, Muzaffarpur, Bihar</p>
              <a 
                href="https://maps.app.goo.gl/ZL4TBhnhbmTKanEX6" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block text-center text-sm sm:text-base text-amber-600 hover:text-amber-700 font-semibold hover:underline transition-colors"
              >
                View on Google Maps →
              </a>
            </div>
          </div>
        </div>

        {/* Why Choose Me Section */}
        <div className="mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-cream-800 mb-8 sm:mb-12 text-center">
            Why Work With Me?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto">
            {[
              { icon: Clock, title: 'Fast Response', desc: 'Quick turnaround on all communications' },
              { icon: Heart, title: 'Passionate', desc: 'Dedicated to delivering quality work' },
              { icon: Star, title: 'Professional', desc: 'Years of experience in development' },
              { icon: Sparkles, title: 'Innovative', desc: 'Creative solutions for your needs' }
            ].map((item, index) => (
              <div key={index} className="bg-white/70 backdrop-blur-sm p-6 rounded-2xl border border-cream-200 hover:border-amber-300 transition-all duration-300 hover:shadow-lg text-center group hover:-translate-y-1">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-amber-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-200 transition-colors">
                  <item.icon className="w-6 h-6 sm:w-7 sm:h-7 text-amber-600" />
                </div>
                <h4 className="text-base sm:text-lg font-bold text-cream-800 mb-2">{item.title}</h4>
                <p className="text-xs sm:text-sm text-cream-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Social Media Section */}
        <div className="mb-12 sm:mb-16 lg:mb-20">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-cream-800 mb-4 sm:mb-6">
              Let's Stay Connected
            </h2>
            <p className="text-base sm:text-lg text-cream-600 mb-8 sm:mb-12 max-w-2xl mx-auto px-4">
              Follow me on social media for project updates, tech insights, and creative content!
            </p>
            <div className="bg-white/80 backdrop-blur-sm p-6 sm:p-8 md:p-12 rounded-3xl border-2 border-amber-200 max-w-4xl mx-auto shadow-xl">
              <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-8 gap-3 sm:gap-4 md:gap-6">
                {[
                  { icon: Github, link: 'https://github.com/Suraj1819', label: 'GitHub', color: 'hover:bg-gray-700 hover:text-white' },
                  { icon: Linkedin, link: 'https://www.linkedin.com/in/suraj-kumar-72847b30a/', label: 'LinkedIn', color: 'hover:bg-blue-600 hover:text-white' },
                  { icon: X, link: 'https://x.com/SuraJzRt', label: 'Twitter', color: 'hover:bg-black hover:text-white' },
                  { icon: Code2, link: 'https://leetcode.com/u/Suraj_1819/', label: 'LeetCode', color: 'hover:bg-yellow-500 hover:text-white' },
                  { icon: Instagram, link: 'https://www.instagram.com/risu2948/', label: 'Instagram', color: 'hover:bg-pink-600 hover:text-white' },
                  { icon: Facebook, link: 'https://www.facebook.com/profile.php?id=100009742919107', label: 'Facebook', color: 'hover:bg-blue-700 hover:text-white' },
                  { icon: Disc2, link: 'https://www.deviantart.com/suraj1819', label: 'DeviantArt', color: 'hover:bg-green-600 hover:text-white' },
                  { icon: Telescope, link: 'https://www.behance.net/surajkumar1819', label: 'Behance', color: 'hover:bg-blue-500 hover:text-white' }
                ].map((social, index) => (
                  <a 
                    key={index}
                    href={social.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`group relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-amber-100 ${social.color} rounded-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:rotate-6`}
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-amber-900 group-hover:text-current transition-colors" />
                    <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs font-medium text-cream-600 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap hidden sm:block">
                      {social.label}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center pb-12 sm:pb-16">
          <div className="bg-gradient-to-r from-cream-100 to-amber-100 rounded-3xl p-8 sm:p-12 max-w-3xl mx-auto border-2 border-amber-200 shadow-xl">
            <h3 className="text-2xl sm:text-3xl font-bold text-cream-800 mb-4 sm:mb-6">
              While You Wait...
            </h3>
            <p className="text-base sm:text-lg text-cream-600 mb-6 sm:mb-8 leading-relaxed">
              Check out my portfolio to see previous projects, or explore my blog for insights on web development and design trends.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="/" 
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 text-sm sm:text-base"
              >
                <span>Back to Home</span>
                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              
              <Link 
                to="/projects" 
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-white hover:bg-cream-50 text-amber-600 rounded-xl font-semibold border-2 border-amber-300 hover:border-amber-400 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 text-sm sm:text-base"
              >
                <span>View Projects</span>
              </Link>
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
      `}</style>
    </div>
  );
};

export default ThankYou;