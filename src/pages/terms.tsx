import { useState, useEffect } from 'react';
import { 
  Shield, 
  Scale, 
  Mail, 
  FileText, 
  CheckCircle, 
  Clock, 
  Heart, 
  Code, 
  ChevronRight,
  ChevronDown,
  X,
  Lock,
  UserCheck,
  CreditCard,
  FileCheck,
  AlertTriangle,
  Info,
  RefreshCw
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const TermsAndConditions = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('');
  const [expandedSections, setExpandedSections] = useState(new Set<string>());

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Auto-expand first section
      setExpandedSections(new Set(['introduction']));
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(sectionId);
      // Auto-expand the section
      setExpandedSections(prev => new Set([...prev, sectionId]));
    }
  };

  // Professional Loading Screen
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100">
        <div className="text-center max-w-md px-4">
          {/* Document loading animation */}
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-8">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative animate-pulse-document">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-2xl">
                  <FileText className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
                {/* Shield overlay */}
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                  <Shield className="w-3 h-3 text-white" />
                </div>
              </div>
            </div>
            {/* Ripple effect */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 sm:w-24 sm:h-24 border-2 border-amber-300 rounded-full animate-ping opacity-75"></div>
              <div className="absolute w-28 h-28 sm:w-32 sm:h-32 border-2 border-amber-200 rounded-full animate-ping opacity-50" style={{ animationDelay: '0.5s' }}></div>
            </div>
          </div>
          
          <h2 className="text-xl sm:text-2xl font-bold text-amber-800 mb-3">
            Loading Terms & Conditions
          </h2>
          <p className="text-sm sm:text-base text-amber-600 mb-6">
            Preparing your legal document...
          </p>
          
          {/* Animated dots */}
          <div className="flex justify-center gap-2">
            <span className="w-2 h-2 sm:w-3 sm:h-3 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
            <span className="w-2 h-2 sm:w-3 sm:h-3 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
            <span className="w-2 h-2 sm:w-3 sm:h-3 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
          </div>
        </div>
      </div>
    );
  }

  const termsSections = [
    {
      id: 'introduction',
      title: 'Introduction',
      icon: <Info className="w-5 h-5" />,
      content: `
        <p class="mb-4">Welcome to SuraJz.dev! These Terms and Conditions ("Terms") govern your use of our website, services, and newsletter subscription. By accessing or using our services, you agree to be bound by these Terms.</p>
        <p class="mb-4">SuraJz.dev is a platform dedicated to software development education, mentoring, and technical consulting services. We are committed to providing valuable content and services while protecting your rights and privacy.</p>
        <div class="bg-amber-50 border-l-4 border-amber-500 p-4 mt-4">
          <p class="text-sm"><strong>Last Updated:</strong> October 6, 2025</p>
        </div>
      `
    },
    {
      id: 'services',
      title: 'Services Description',
      icon: <Code className="w-5 h-5" />,
      content: `
        <h4 class="font-semibold mb-3">Our Services Include:</h4>
        <ul class="list-disc pl-6 space-y-2 mb-4">
          <li><strong>Newsletter Subscription:</strong> Weekly tech tips, project updates, and exclusive content</li>
          <li><strong>Web Development:</strong> Full-stack application development using modern technologies</li>
          <li><strong>Mobile App Development:</strong> iOS and Android applications</li>
          <li><strong>Mentoring Services:</strong> 1-on-1 programming guidance and career advice</li>
          <li><strong>Technical Consulting:</strong> Architecture design and optimization services</li>
          <li><strong>Code Reviews:</strong> Professional feedback on your projects</li>
          <li><strong>Interview Preparation:</strong> Technical interview coaching and mock sessions</li>
        </ul>
        <p class="text-sm text-gray-600">All services are subject to availability and may require separate agreements for complex projects.</p>
      `
    },
    {
      id: 'user-responsibilities',
      title: 'User Responsibilities',
      icon: <UserCheck className="w-5 h-5" />,
      content: `
        <h4 class="font-semibold mb-3">As a user of our services, you agree to:</h4>
        <ul class="list-disc pl-6 space-y-2 mb-4">
          <li>Provide accurate and complete information when required</li>
          <li>Respect intellectual property rights and not reproduce content without permission</li>
          <li>Use our services for lawful purposes only</li>
          <li>Not attempt to gain unauthorized access to our systems</li>
          <li>Not share or distribute paid content without proper authorization</li>
          <li>Maintain professional conduct in all interactions</li>
          <li>Provide constructive feedback when participating in mentoring sessions</li>
        </ul>
        <div class="bg-amber-50 border-l-4 border-amber-500 p-4 mt-4">
          <p class="text-sm"><strong>Important:</strong> Violation of these responsibilities may result in immediate termination of services.</p>
        </div>
      `
    },
    {
      id: 'subscription-terms',
      title: 'Newsletter Subscription Terms',
      icon: <Mail className="w-5 h-5" />,
      content: `
        <h4 class="font-semibold mb-3">Subscription Details:</h4>
        <ul class="list-disc pl-6 space-y-2 mb-4">
          <li><strong>Free Subscription:</strong> Our newsletter is completely free with no hidden charges</li>
          <li><strong>Content Delivery:</strong> Weekly newsletters on Tuesdays and Fridays, plus monthly special editions</li>
          <li><strong>Welcome Gift:</strong> New subscribers receive exclusive resources worth \$50</li>
          <li><strong>Unsubscribe:</strong> You can unsubscribe at any time using the link in newsletter footer</li>
          <li><strong>Email Privacy:</strong> We never sell or share your email with third parties</li>
        </ul>
        <h4 class="font-semibold mb-3 mt-4">Premium Content Access:</h4>
        <p class="mb-2">Some exclusive content may require additional subscription or payment. Details will be clearly communicated before any charges.</p>
        <div class="bg-green-50 border-l-4 border-green-500 p-4 mt-4">
          <p class="text-sm"><strong>Benefit:</strong> Subscribers get 20% discount on all paid services!</p>
        </div>
      `
    },
    {
      id: 'payment-terms',
      title: 'Payment and Refund Terms',
      icon: <CreditCard className="w-5 h-5" />,
      content: `
        <h4 class="font-semibold mb-3">Payment Processing:</h4>
        <ul class="list-disc pl-6 space-y-2 mb-4">
          <li>All payments are processed securely through trusted payment gateways</li>
          <li>Prices are clearly displayed before any purchase confirmation</li>
          <li>Payment is required before service delivery for paid services</li>
          <li>We accept major credit cards, debit cards, and digital wallets</li>
        </ul>
        <h4 class="font-semibold mb-3 mt-4">Refund Policy:</h4>
        <ul class="list-disc pl-6 space-y-2 mb-4">
          <li><strong>Digital Products:</strong> No refunds once downloaded or accessed</li>
          <li><strong>Services:</strong> 50% refund if cancelled 48 hours before scheduled session</li>
          <li><strong>Technical Issues:</strong> Full refund if service cannot be delivered due to technical problems</li>
          <li><strong>Refund Processing:</strong> Refunds are processed within 7-10 business days</li>
        </ul>
        <div class="bg-amber-50 border-l-4 border-amber-500 p-4 mt-4">
          <p class="text-sm"><strong>Note:</strong> All refund requests must be submitted in writing with detailed explanation.</p>
        </div>
      `
    },
    {
      id: 'privacy-policy',
      title: 'Privacy and Data Protection',
      icon: <Lock className="w-5 h-5" />,
      content: `
        <h4 class="font-semibold mb-3">Data We Collect:</h4>
        <ul class="list-disc pl-6 space-y-2 mb-4">
          <li><strong>Email Address:</strong> For newsletter delivery and account management</li>
          <li><strong>Name:</strong> For personalization and service delivery</li>
          <li><strong>Usage Data:</strong> To improve our services and user experience</li>
          <li><strong>Payment Information:</strong> Processed securely by third-party providers</li>
        </ul>
        <h4 class="font-semibold mb-3 mt-4">How We Use Your Data:</h4>
        <ul class="list-disc pl-6 space-y-2 mb-4">
          <li>Deliver newsletter content and service updates</li>
          <li>Personalize your experience with our platform</li>
          <li>Analyze usage patterns to improve our services</li>
          <li>Communicate about your account and services</li>
          <li>Comply with legal obligations</li>
        </ul>
        <p class="text-sm text-gray-600">We comply with GDPR and other applicable data protection regulations. For complete details, please refer to our Privacy Policy.</p>
      `
    },
    {
      id: 'intellectual-property',
      title: 'Intellectual Property Rights',
      icon: <FileCheck className="w-5 h-5" />,
      content: `
        <h4 class="font-semibold mb-3">Our Content:</h4>
        <p class="mb-4">All content on SuraJz.dev, including but not limited to text, graphics, logos, images, videos, tutorials, and code samples, is owned by or licensed to SuraJz.dev and is protected by copyright, trademark, and other intellectual property laws.</p>
        <h4 class="font-semibold mb-3 mt-4">Usage Rights:</h4>
        <ul class="list-disc pl-6 space-y-2 mb-4">
          <li><strong>Personal Use:</strong> You may use our content for personal learning and development</li>
          <li><strong>Commercial Use:</strong> Requires explicit written permission and proper attribution</li>
          <li><strong>Sharing:</strong> You may share links to our content but cannot reproduce entire articles</li>
          <li><strong>Code Samples:</strong> Free to use in personal projects with attribution</li>
        </ul>
        <div class="bg-red-50 border-l-4 border-red-500 p-4 mt-4">
          <p class="text-sm"><strong>Warning:</strong> Unauthorized use or reproduction may result in legal action.</p>
        </div>
      `
    },
    {
      id: 'limitation-liability',
      title: 'Limitation of Liability',
      icon: <AlertTriangle className="w-5 h-5" />,
      content: `
        <h4 class="font-semibold mb-3">Service Availability:</h4>
        <p class="mb-4">We strive to maintain high service availability but cannot guarantee uninterrupted access. Services may be temporarily unavailable for maintenance, updates, or technical issues.</p>
        <h4 class="font-semibold mb-3 mt-4">Liability Limitations:</h4>
        <ul class="list-disc pl-6 space-y-2 mb-4">
          <li>Our total liability for any claim is limited to the amount paid for the specific service</li>
          <li>We are not liable for indirect, incidental, or consequential damages</li>
          <li>We do not guarantee specific results from our mentoring or consulting services</li>
          <li>Third-party links and services are used at your own risk</li>
        </ul>
        <h4 class="font-semibold mb-3 mt-4">User Responsibility:</h4>
        <p class="mb-2">You are responsible for implementing advice and recommendations appropriately. Professional judgment should be exercised when applying technical guidance.</p>
        <div class="bg-gray-50 border-l-4 border-gray-500 p-4 mt-4">
          <p class="text-sm"><strong>Disclaimer:</strong> Our services are educational and should not replace professional technical advice for critical systems.</p>
        </div>
      `
    },
    {
      id: 'termination',
      title: 'Service Termination',
      icon: <X className="w-5 h-5" />,
      content: `
        <h4 class="font-semibold mb-3">Termination by User:</h4>
        <ul class="list-disc pl-6 space-y-2 mb-4">
          <li>You may terminate your newsletter subscription at any time</li>
          <li>Paid services can be cancelled according to the specific service terms</li>
          <li>Account deletion removes all personal data from our active systems</li>
        </ul>
        <h4 class="font-semibold mb-3 mt-4">Termination by Us:</h4>
        <p class="mb-4">We reserve the right to terminate or suspend services for:</p>
        <ul class="list-disc pl-6 space-y-2 mb-4">
          <li>Violation of these Terms and Conditions</li>
          <li>Illegal or harmful use of our services</li>
          <li>Non-payment for paid services</li>
          <li>Technical or security reasons</li>
        </ul>
        <h4 class="font-semibold mb-3 mt-4">Post-Termination:</h4>
        <p class="text-sm text-gray-600">Upon termination, access to paid content and services will cease. Refunds, if applicable, will be processed according to our refund policy.</p>
      `
    },
    {
      id: 'dispute-resolution',
      title: 'Dispute Resolution',
      icon: <Scale className="w-5 h-5" />,
      content: `
        <h4 class="font-semibold mb-3">Good Faith Resolution:</h4>
        <p class="mb-4">We believe in resolving disputes amicably. If you have any concerns or complaints, please contact us first at surajkumarraj8888@gmail.com.</p>
        <h4 class="font-semibold mb-3 mt-4">Resolution Process:</h4>
        <ul class="list-disc pl-6 space-y-2 mb-4">
          <li><strong>Step 1:</strong> Contact us with detailed information about your concern</li>
          <li><strong>Step 2:</strong> We will respond within 5 business days</li>
          <li><strong>Step 3:</strong> We will work towards a mutually acceptable solution</li>
          <li><strong>Step 4:</strong> If unresolved, we may suggest mediation or arbitration</li>
        </ul>
        <h4 class="font-semibold mb-3 mt-4">Governing Law:</h4>
        <p class="mb-2">These Terms are governed by the laws of India. Any disputes will be resolved in the courts of Vaishali, Bihar, India.</p>
        <div class="bg-amber-50 border-l-4 border-amber-500 p-4 mt-4">
          <p class="text-sm"><strong>Commitment:</strong> We are committed to fair and transparent dispute resolution.</p>
        </div>
      `
    },
    {
      id: 'updates-modifications',
      title: 'Updates and Modifications',
      icon: <RefreshCw className="w-5 h-5" />,
      content: `
        <h4 class="font-semibold mb-3">Terms Updates:</h4>
        <p class="mb-4">We may update these Terms periodically to reflect changes in our services, legal requirements, or business practices. Significant changes will be communicated through:</p>
        <ul class="list-disc pl-6 space-y-2 mb-4">
          <li>Email notification to active subscribers</li>
          <li>Website banner notifications</li>
          <li>Direct notification for paid service users</li>
        </ul>
        <h4 class="font-semibold mb-3 mt-4">Service Changes:</h4>
        <ul class="list-disc pl-6 space-y-2 mb-4">
          <li>We may improve, modify, or discontinue services with reasonable notice</li>
          <li>Price changes for paid services will be communicated 30 days in advance</li>
          <li>Feature additions or removals will be announced via newsletter</li>
        </ul>
        <p class="text-sm text-gray-600">Continued use of our services after changes constitutes acceptance of the updated Terms.</p>
      `
    },
    {
      id: 'contact-info',
      title: 'Contact Information',
      icon: <Mail className="w-5 h-5" />,
      content: `
        <h4 class="font-semibold mb-3">Get in Touch:</h4>
        <p class="mb-4">If you have any questions about these Terms and Conditions, please don't hesitate to contact us:</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div class="bg-gray-50 p-4 rounded-lg">
            <p class="font-semibold mb-2">Primary Contact:</p>
            <p class="text-sm">📧 surajkumarraj8888@gmail.com</p>
            <p class="text-sm">📱 +91 9507272341</p>
          </div>
          <div class="bg-gray-50 p-4 rounded-lg">
            <p class="font-semibold mb-2">Business Hours:</p>
            <p class="text-sm">Monday - Friday: 9:00 AM - 6:00 PM IST</p>
            <p class="text-sm">Saturday: 10:00 AM - 2:00 PM IST</p>
          </div>
        </div>
        <h4 class="font-semibold mb-3 mt-4">Response Times:</h4>
        <ul class="list-disc pl-6 space-y-2 mb-4">
          <li><strong>General Inquiries:</strong> Within 24 hours</li>
          <li><strong>Technical Support:</strong> Within 48 hours</li>
          <li><strong>Urgent Issues:</strong> Within 4 hours during business hours</li>
        </ul>
        <div class="bg-green-50 border-l-4 border-green-500 p-4 mt-4">
          <p class="text-sm"><strong>Customer Commitment:</strong> We value your feedback and are always here to help!</p>
        </div>
      `
    }
  ];

  return (
    <div className="min-h-screen pt-16 sm:pt-20 px-4 sm:px-6 lg:px-8 animate-fade-in bg-gradient-to-br from-amber-50 via-white to-orange-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-amber-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-200 rounded-full opacity-20 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 mx-auto mb-6 bg-gradient-to-br from-amber-100 to-orange-200 rounded-full flex items-center justify-center shadow-xl animate-scale-in">
            <Shield className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-amber-600" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-amber-800 mb-4 sm:mb-6 px-4">
            Terms & Conditions
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-amber-600 max-w-3xl mx-auto mb-6 sm:mb-8 px-4 leading-relaxed">
            Please read these terms carefully before using our services. Your continued use of SuraJz.dev constitutes acceptance of these terms.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <div className="bg-gradient-to-r from-amber-100 to-orange-100 backdrop-blur-sm p-4 sm:p-6 rounded-2xl border-2 border-amber-200 inline-block shadow-lg">
              <p className="text-base sm:text-lg font-semibold text-amber-700 flex items-center gap-2 justify-center flex-wrap">
                <Clock className="w-5 h-5 sm:w-6 sm:h-6" />
                <span>Last Updated: October 6, 2025</span>
              </p>
            </div>
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="mb-12 sticky top-20 z-40 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-4 border border-amber-200">
          <h3 className="text-lg font-semibold text-amber-800 mb-3">Quick Navigation</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {termsSections.map((section) => (
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

        {/* Terms Content */}
        <div className="max-w-5xl mx-auto mb-12 sm:mb-16 lg:mb-20">
          {termsSections.map((section, index) => (
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
                <h3 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Key Takeaways</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                  <div className="bg-white/10 rounded-lg p-3">
                    <p className="text-sm leading-relaxed">
                      ✓ Free newsletter with no hidden charges<br/>
                      ✓ 20% discount on all paid services for subscribers<br/>
                      ✓ Easy unsubscribe option anytime
                    </p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3">
                    <p className="text-sm leading-relaxed">
                      ✓ Your data is protected and never sold<br/>
                      ✓ Clear refund policy for paid services<br/>
                      ✓ Dedicated customer support
                    </p>
                  </div>
                </div>
                <p className="text-sm opacity-80 mt-4">
                  By using our services, you agree to these terms designed to protect both you and us.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Acceptance Section */}
        <div className="text-center pb-12 sm:pb-16">
          <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-3xl p-8 sm:p-12 max-w-4xl mx-auto border-2 border-amber-200 shadow-xl">
            <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-amber-800 mb-4 sm:mb-6">
              Thank You for Reading!
            </h3>
            <p className="text-base sm:text-lg text-amber-600 mb-6 sm:mb-8 leading-relaxed">
              Your understanding of these terms helps us provide better services while protecting everyone's rights. If you have any questions or need clarification, please don't hesitate to reach out.
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
  to="/privacy" 
  className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-white hover:bg-amber-50 text-amber-600 rounded-xl font-semibold border-2 border-amber-300 hover:border-amber-400 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 text-sm sm:text-base"
>
  <span>Privacy Policy</span>
</Link>
<Link 
  to="/contact" 
  className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 text-sm sm:text-base"
>
  <span>Contact Us</span>
</Link>
            </div>
            
            {/* Acceptance note */}
            <div className="p-4 bg-white/50 rounded-xl">
              <p className="text-sm text-amber-600">
                <strong>Continued Use:</strong> By continuing to use SuraJz.dev services, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TermsAndConditions;