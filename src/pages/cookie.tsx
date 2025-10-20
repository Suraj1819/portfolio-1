import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Shield,
  UserCheck,
  Mail,
  Lock,
  Server,
  Smartphone,
  Globe2,
  AlertTriangle,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  Heart,
  Info,
  RefreshCw,
  Cookie,
  Target
} from 'lucide-react';
import Footer from '../components/Footer';

const CookiePolicy = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('');
  const [expandedSections, setExpandedSections] = useState(new Set());

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setExpandedSections(new Set(['introduction']));
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const toggleSection = (sectionId : string) : void => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) newExpanded.delete(sectionId);
    else newExpanded.add(sectionId);
    setExpandedSections(newExpanded);
  };

  const scrollToSection = (sectionId : string) : void  => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(sectionId);
      setExpandedSections((prev) => new Set([...prev, sectionId]));
    }
  };

  /* ----------  LOADING  ---------- */
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100">
        <div className="text-center max-w-md px-4">
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-8">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative animate-pulse-document">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-2xl">
                  <Cookie className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                  <Shield className="w-3 h-3 text-white" />
                </div>
              </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 border-2 border-amber-300 rounded-full animate-ping opacity-75"></div>
              <div
                className="absolute w-28 h-28 sm:w-32 sm:h-32 border-2 border-amber-200 rounded-full animate-ping opacity-50"
                style={{ animationDelay: '0.5s' }}
              ></div>
            </div>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-amber-800 mb-3">
            Loading Cookie Policy
          </h2>
          <p className="text-sm sm:text-base text-amber-600 mb-6">
            Preparing your legal document...
          </p>

          <div className="flex justify-center gap-2">
            <span className="w-2 h-2 sm:w-3 sm:h-3 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
            <span className="w-2 h-2 sm:w-3 sm:h-3 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
            <span className="w-2 h-2 sm:w-3 sm:h-3 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
          </div>

          <style>{`
            @keyframes pulse-document {
              0%, 100% { transform: scale(1) rotate(0deg); }
              50% { transform: scale(1.1) rotate(3deg); }
            }
            .animate-pulse-document {
              animation: pulse-document 2s ease-in-out infinite;
            }
          `}</style>
        </div>
      </div>
    );
  }

  /* ----------  CONTENT  ---------- */
  const cookieSections = [
    {
      id: 'introduction',
      title: 'Introduction',
      icon: <Info className="w-5 h-5" />,
      content: `
        <p class="mb-4">Welcome to SuraJz.dev! This Cookie Policy explains how we collect, use, and manage cookies on our website to enhance your experience while ensuring transparency and compliance with data protection laws.</p>
        <p class="mb-4">We respect your privacy and are committed to protecting your data. This policy applies to all visitors and users of SuraJz.dev.</p>
        <div class="bg-amber-50 border-l-4 border-amber-500 p-4 mt-4">
          <p class="text-sm"><strong>Last Updated:</strong> October 6, 2025</p>
        </div>
      `
    },
    {
      id: 'cookie-usage',
      title: 'Cookie Usage',
      icon: <Cookie className="w-5 h-5" />,
      content: `
        <h4 class="font-semibold mb-3">Purpose of Cookies:</h4>
        <ul class="list-disc pl-6 space-y-2 mb-4">
          <li><strong>Functionality:</strong> Preserve your dark mode preference, login sessions, and other essential settings.</li>
          <li><strong>Analytics:</strong> Track anonymized user behavior (page views, device info, browser type) to improve our services.</li>
          <li><strong>Security:</strong> Prevent fraud, detect malicious activity, and enhance website safety.</li>
          <li><strong>Performance:</strong> Optimize site speed and loading times for better user experience.</li>
        </ul>
        <div class="bg-green-50 border-l-4 border-green-500 p-4 mt-4">
          <p class="text-sm"><strong>Cookie Types:</strong> We use only first-party cookies (set by SuraJz.dev) and do not share or sell your data.</p>
        </div>
      `
    },
    {
      id: 'cookie-types',
      title: 'Types of Cookies We Use',
      icon: <Target className="w-5 h-5" />,
      content: `
        <h4 class="font-semibold mb-3">Essential Cookies:</h4>
        <ul class="list-disc pl-6 space-y-2 mb-4">
          <li><strong>Dark Mode Preference:</strong> Stores your preferred theme setting.</li>
          <li><strong>Login Session:</strong> Maintains user authentication state.</li>
        </ul>
        <h4 class="font-semibold mb-3 mt-4">Analytics Cookies:</h4>
        <ul class="list-disc pl-6 space-y-2 mb-4">
          <li><strong>Google Analytics:</strong> Tracks anonymized traffic patterns.</li>
          <li><strong>Cloudflare:</strong> Monitors site performance and security.</li>
        </ul>
        <h4 class="font-semibold mb-3 mt-4">Security Cookies:</h4>
        <ul class="list-disc pl-6 space-y-2 mb-4">
          <li><strong>Cookie Consent Banner:</strong> Enables cookie management preferences.</li>
          <li><strong>Session Cookies:</strong> Temporarily store data during browsing.</li>
        </ul>
        <div class="bg-blue-50 border-l-4 border-blue-500 p-4 mt-4">
          <p class="text-sm"><strong>Cookie Management:</strong> You can adjust settings in your browser.</p>
        </div>
      `
    },
    {
      id: 'cookie-management',
      title: 'Cookie Management',
      icon: <Globe2 className="w-5 h-5" />,
      content: `
        <h4 class="font-semibold mb-3">How to Manage Cookies:</h4>
        <ul class="list-disc pl-6 space-y-2 mb-4">
          <li>View or modify cookie preferences in your browser settings.</li>
          <li>Opt out of analytics via Google Analytics [settings](https://www.google.com/settings/).</li>
          <li>Clear cookies to reset your preferences.</li>
          <li>Cookie consent banner appears on first visit.</li>
        </ul>
        <h4 class="font-semibold mb-3 mt-4">Cookie Consent:</h4>
        <ul class="list-disc pl-6 space-y-2 mb-4">
          <li>You can accept or reject cookies via the cookie banner.</li>
          <li>Essential cookies cannot be disabled without breaking site functionality.</li>
          <li>Analytics and security cookies are optional but recommended for optimal performance.</li>
        </ul>
        <div class="bg-gray-50 border-l-4 border-gray-500 p-4 mt-4">
          <p class="text-sm"><strong>Cookie Banner:</strong> Appears on first visit to inform you of our cookie policies.</p>
        </div>
      `
    },
    {
      id: 'cookie-banner',
      title: 'Cookie Banner',
      icon: <AlertTriangle className="w-5 h-5" />,
      content: `
        <h4 class="font-semibold mb-3">Cookie Banner Functionality:</h4>
        <ul class="list-disc pl-6 space-y-2 mb-4">
          <li>Displays cookie usage and provides a link to this policy.</li>
          <li>Allows you to accept or reject cookies directly.</li>
          <li>Remembers your preference for future visits.</li>
        </ul>
        <h4 class="font-semibold mb-3 mt-4">Cookie Banner Rules:</h4>
        <ul class="list-disc pl-6 space-y-2 mb-4">
          <li>Appears only once per browser session.</li>
          <li>Includes links to this policy and cookie settings.</li>
          <li>Respects your preference for future visits.</li>
        </ul>
        <div class="bg-red-50 border-l-4 border-red-500 p-4 mt-4">
          <p class="text-sm"><strong>Cookie Consent:</strong> Required for accessing site features.</p>
        </div>
      `
    },
    {
      id: 'data-protection',
      title: 'Data Protection',
      icon: <Lock className="w-5 h-5" />,
      content: `
        <h4 class="font-semibold mb-3">Security Measures:</h4>
        <ul class="list-disc pl-6 space-y-2 mb-4">
          <li>TLS 1.3 encryption for data in transit.</li>
          <li>AES-256 encryption for data at rest.</li>
          <li>Regular security audits and vulnerability scans.</li>
          <li>Incident response procedures for data breaches.</li>
        </ul>
        <h4 class="font-semibold mb-3 mt-4">Data Retention:</h4>
        <ul class="list-disc pl-6 space-y-2 mb-4">
          <li>Essential cookies are stored indefinitely.</li>
          <li>Analytics cookies are deleted after 24 hours.</li>
          <li>Security cookies are removed when the session ends.</li>
        </ul>
        <div class="bg-blue-50 border-l-4 border-blue-500 p-4 mt-4">
          <p class="text-sm"><strong>Legal Compliance:</strong> GDPR-compliant with no data sharing.</p>
        </div>
      `
    },
    {
      id: 'third-party',
      title: 'Third-Party Cookies',
      icon: <Server className="w-5 h-5" />,
      content: `
        <h4 class="font-semibold mb-3">Third-Party Services:</h4>
        <ul class="list-disc pl-6 space-y-2 mb-4">
          <li><strong>Google Analytics:</strong> Anonymized traffic data.</li>
          <li><strong>Cloudflare:</strong> CDN and security tracking.</li>
          <li><strong>Brevo (Sendinblue):</strong> Newsletter delivery (non-tracking).</li>
        </ul>
        <h4 class="font-semibold mb-3 mt-4">Data Sharing:</h4>
        <ul class="list-disc pl-6 space-y-2 mb-4">
          <li>We never share your data with third parties.</li>
          <li>All third-party services are GDPR-compliant.</li>
          <li>Standard Contractual Clauses (SCCs) for international transfers.</li>
        </ul>
        <div class="bg-gray-50 border-l-4 border-gray-500 p-4 mt-4">
          <p class="text-sm"><strong>Cookie Providers:</strong> Google, Cloudflare, and Brevo.</p>
        </div>
      `
    },
    {
      id: 'user-rights',
      title: 'Your Rights',
      icon: <UserCheck className="w-5 h-5" />,
      content: `
        <h4 class="font-semibold mb-3">GDPR Rights:</h4>
        <ul class="list-disc pl-6 space-y-2 mb-4">
          <li><strong>Access:</strong> Request a copy of your cookie preferences.</li>
          <li><strong>Rectification:</strong> Correct inaccurate cookie settings.</li>
          <li><strong>Erasure:</strong> Delete cookies via browser settings.</li>
          <li><strong>Restriction:</strong> Limit cookie processing for specific purposes.</li>
        </ul>
        <h4 class="font-semibold mb-3 mt-4">How to Exercise Rights:</h4>
        <ul class="list-disc pl-6 space-y-2 mb-4">
          <li>Email: <a href="mailto:privacy@surajz.dev" class="text-amber-600 underline">privacy@surajz.dev</a></li>
          <li>Response time: 30 days maximum.</li>
          <li>No fee for requests (unless excessive).</li>
          <li>Identity verification required for data requests.</li>
        </ul>
      `
    },
    {
      id: 'children',
      title: 'Children\'s Privacy',
      icon: <Smartphone className="w-5 h-5" />,
      content: `
        <h4 class="font-semibold mb-3">Age Restrictions:</h4>
        <ul class="list-disc pl-6 space-y-2 mb-4">
          <li>Our services are intended for users 13+ years old.</li>
          <li>We do not knowingly collect data from children under 13.</li>
          <li>Parental consent required for users under 16.</li>
          <li>Immediate deletion if child data is discovered.</li>
        </ul>
        <div class="bg-red-50 border-l-4 border-red-500 p-4 mt-4">
          <p class="text-sm"><strong>Parent Notice:</strong> If you believe your child has provided data, contact us immediately for deletion.</p>
        </div>
      `
    },
    {
      id: 'changes',
      title: 'Policy Changes',
      icon: <RefreshCw className="w-5 h-5" />,
      content: `
        <h4 class="font-semibold mb-3">Update Process:</h4>
        <ul class="list-disc pl-6 space-y-2 mb-4">
          <li>Significant changes announced via newsletter.</li>
          <li>Website banner for major updates.</li>
          <li>30-day notice for material changes.</li>
          <li>Archive of previous versions available.</li>
        </ul>
        <h4 class="font-semibold mb-3 mt-4">Your Responsibility:</h4>
        <p class="mb-2">Continued use after changes constitutes acceptance of the updated policy.</p>
        <div class="bg-amber-50 border-l-4 border-amber-500 p-4 mt-4">
          <p class="text-sm"><strong>Last Updated:</strong> October 6, 2025</p>
        </div>
      `
    },
    {
      id: 'contact',
      title: 'Contact Information',
      icon: <Mail className="w-5 h-5" />,
      content: `
        <h4 class="font-semibold mb-3">Data Protection Officer:</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div class="bg-gray-50 p-4 rounded-lg">
            <p class="font-semibold mb-2">Primary Contact:</p>
            <p class="text-sm">📧 privacy@surajz.dev</p>
            <p class="text-sm">📱 +91 9507272341</p>
          </div>
          <div class="bg-gray-50 p-4 rounded-lg">
            <p class="font-semibold mb-2">Response Times:</p>
            <p class="text-sm">General: 24 hours</p>
            <p class="text-sm">Data requests: 30 days</p>
          </div>
        </div>
                <h4 className="font-semibold mb-3 mt-4">Business Hours:</h4>
        <ul className="list-disc pl-6 space-y-2 mb-4">
          <li>Monday - Friday: 9:00 AM - 6:00 PM IST</li>
          <li>Saturday: 10:00 AM - 2:00 PM IST</li>
          <li>Sunday: Closed</li>
        </ul>
        <div class="bg-green-50 border-l-4 border-green-500 p-4 mt-4">
          <p class="text-sm"><strong>Customer Commitment:</strong> We value your feedback and will respond to all inquiries promptly.</p>
        </div>
      `
    }
  ];

  return (
    <div className="min-h-screen pt-16 sm:pt-20 px-4 sm:px-6 lg:px-8 animate-fade-in bg-gradient-to-br from-amber-50 via-white to-orange-50 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-amber-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-200 rounded-full opacity-20 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 mx-auto mb-6 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-xl animate-scale-in">
            <Cookie className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-amber-800 mb-4 sm:mb-6">
            Cookie Policy
          </h1>
          <p className="text-base sm:text-lg text-amber-600 mb-6 sm:mb-8 leading-relaxed">
            Please read these conditions carefully. By using our website, you agree to the terms set forth herein.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center items-center mb-8">
            <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-3xl p-8 sm:p-12 max-w-4xl mx-auto border-2 border-amber-200 shadow-xl">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center mb-6">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-amber-800 mb-4 sm:mb-6">
                Key Takeaways
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="text-sm leading-relaxed">
                    ✓ We use only first-party cookies for essential functionality.<br/>
                    ✓ No advertising or tracking cookies are used.<br/>
                    ✓ You can manage cookies directly in your browser.
                  </p>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="text-sm leading-relaxed">
                    ✓ Cookie consent banner appears on first visit.<br/>
                    ✓ All third-party services are GDPR-compliant.<br/>
                    ✓ We never share your personal data.
                  </p>
                </div>
              </div>
              <p className="text-sm opacity-80 mt-4">
                By using SuraJz.dev, you agree to our cookie practices. If you have concerns, contact us directly.
              </p>
            </div>
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="mb-12 sticky top-20 z-40 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-4 border border-amber-200">
          <h3 className="text-lg font-semibold text-amber-800 mb-3">Quick Navigation</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {cookieSections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`text-left p-2 rounded-lg transition-all duration-300 flex items-center gap-2 ${
                  activeSection === section.id
                    ? 'bg-amber-100 text-amber-700 font-semibold'
                    : 'hover:bg-amber-50 text-gray-700 hover:text-amber-600'
                }`}
              >
                {section.icon}
                <span className="text-sm">{section.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Cookie Policy Content */}
        <div className="max-w-5xl mx-auto mb-12 sm:mb-16 lg:mb-20">
          {cookieSections.map((section, index) => (
            <div
              key={section.id}
              id={section.id}
              className={`mb-6 bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-amber-200 hover:border-amber-400 transition-all duration-300 hover:shadow-xl ${
                activeSection === section.id ? 'ring-2 ring-amber-400' : ''
              }`}
            >
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-amber-50/50 transition-colors rounded-t-2xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center text-white">
                    {section.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-amber-800">
                      {index + 1}. {section.title}
                    </h3>
                  </div>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-amber-600 transition-transform ${
                    expandedSections.has(section.id) ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {expandedSections.has(section.id) && (
                <div className="px-6 pb-6 border-t border-amber-100">
                  <div 
                    className="prose prose-amber max-w-none text-gray-700 pt-4"
                    dangerouslySetInnerHTML={{ __html: section.content }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Summary Section */}
        <div className="mb-12 sm:mb-16 lg:mb-20">
          <div className="max-w-4xl mx-auto bg-gradient-to-r from-amber-500 to-orange-600 rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl text-white">
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl sm:text-3xl font-bold text-amber-800 mb-4 sm:mb-6">
                  Cookie Policy Summary
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                  <div className="bg-white/10 rounded-lg p-3">
                    <p className="text-sm leading-relaxed">
                      ✓ We use only first-party cookies for essential functionality.<br/>
                      ✓ No advertising or tracking cookies are used.<br/>
                      ✓ You can manage cookies directly in your browser.
                    </p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3">
                    <p className="text-sm leading-relaxed">
                      ✓ Cookie consent banner appears on first visit.<br/>
                      ✓ All third-party services are GDPR-compliant.<br/>
                      ✓ We never share your personal data.
                    </p>
                  </div>
                </div>
                <p className="text-sm opacity-80 mt-4">
                  By using our website, you agree to our cookie practices. If you have concerns, contact us directly.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Acceptance Section */}
        <div className="text-center pb-12 sm:pb-16">
          <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-3xl p-8 sm:p-12 max-w-4xl mx-auto border-2 border-amber-200 shadow-xl">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-amber-800 mb-4 sm:mb-6">
              Thank You for Reading!
            </h3>
            <p className="text-base sm:text-lg text-amber-600 mb-6 sm:mb-8 leading-relaxed">
              Your understanding of this Cookie Policy helps us provide better, transparent services while protecting your data. If you have any questions, please feel free to reach out.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Link 
                to="/" 
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 text-sm sm:text-base"
              >
                <span>Back to Home</span>
                <ChevronRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
              <Link 
                to="/terms" 
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-white hover:bg-amber-50 text-amber-600 rounded-xl font-semibold border-2 border-amber-300 hover:border-amber-400 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 text-sm sm:text-base"
              >
                <span>Terms & Conditions</span>
              </Link>
              <Link 
                to="/contact" 
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 text-sm sm:text-base"
              >
                <span>Contact Us</span>
              </Link>
            </div>
            <div className="p-4 bg-white/50 rounded-xl">
              <p className="text-sm">
                <strong>Continued Use:</strong> By continuing to use SuraJz.dev, you acknowledge that you have read, understood, and agree to this Cookie Policy.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CookiePolicy;