import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Eye,
  Keyboard,
  FileText,
  CheckCircle,
  AlertTriangle,
  Settings,
  Heart,
  MessageCircle,
  Clock,
  ChevronDown,
  ChevronRight,
  Zap,
  Volume2,
  Layers
} from 'lucide-react';
import Footer from '../components/Footer';

const Accessibility = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeSection, setActiveSection] = useState<string>('');
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setExpandedSections(new Set(['introduction']));
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const toggleSection = (sectionId: string): void => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const scrollToSection = (sectionId: string): void => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' as ScrollBehavior, block: 'start' });
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
              <div className="relative animate-pulse-accessibility">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-2xl">
                  <Eye className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
                  <CheckCircle className="w-3 h-3 text-white" />
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
            Loading Accessibility Statement
          </h2>
          <p className="text-sm sm:text-base text-amber-600 mb-6">
            Preparing inclusive information...
          </p>

          <div className="flex justify-center gap-2">
            <span className="w-2 h-2 sm:w-3 sm:h-3 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' as any }}></span>
            <span className="w-2 h-2 sm:w-3 sm:h-3 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' as any }}></span>
            <span className="w-2 h-2 sm:w-3 sm:h-3 bg-amber-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' as any }}></span>
          </div>

          <style>{`
            @keyframes pulse-accessibility {
              0%, 100% { transform: scale(1) rotate(0deg); }
              50% { transform: scale(1.1) rotate(-3deg); }
            }
            .animate-pulse-accessibility {
              animation: pulse-accessibility 2s ease-in-out infinite;
            }
          `}</style>
        </div>
      </div>
    );
  }

  /* ----------  CONTENT  ---------- */
  const accessibilitySections = [
    {
      id: 'introduction',
      title: 'Our Commitment',
      icon: <Heart className="w-5 h-5" />,
      content: `
        <p class="mb-4">At SuraJz.dev, we are committed to ensuring digital accessibility for people with disabilities. We continuously work to improve the user experience for everyone and apply relevant accessibility standards.</p>
        <p class="mb-4">We believe the web should be accessible to all users, regardless of their abilities or the technologies they use. This commitment extends to all aspects of our website, services, and content.</p>
        <div class="bg-amber-50 border-l-4 border-amber-500 p-4 mt-4">
          <p class="text-sm"><strong>Last Updated:</strong> October 6, 2025</p>
          <p class="text-sm mt-2"><strong>Our Goal:</strong> WCAG 2.1 Level AA Compliance</p>
        </div>
      `
    },
    {
      id: 'standards',
      title: 'WCAG Compliance',
      icon: <CheckCircle className="w-5 h-5" />,
      content: `
        <h4 class="font-semibold mb-3">Standards We Follow:</h4>
        <ul class="list-disc pl-6 space-y-2 mb-4">
          <li><strong>WCAG 2.1 Level AA:</strong> Web Content Accessibility Guidelines</li>
          <li><strong>Section 508:</strong> US Federal accessibility requirements</li>
          <li><strong>ARIA 1.2:</strong> Accessible Rich Internet Applications</li>
          <li><strong>EN 301 549:</strong> European accessibility standard</li>
        </ul>
        <h4 class="font-semibold mb-3 mt-4">Four Principles (POUR):</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div class="bg-amber-50 p-4 rounded-lg">
            <p class="font-semibold mb-2">🔍 Perceivable</p>
            <p class="text-sm">Information must be presentable in ways users can perceive</p>
          </div>
          <div class="bg-amber-50 p-4 rounded-lg">
            <p class="font-semibold mb-2">⚡ Operable</p>
            <p class="text-sm">Interface components must be operable by all users</p>
          </div>
          <div class="bg-amber-50 p-4 rounded-lg">
            <p class="font-semibold mb-2">💡 Understandable</p>
            <p class="text-sm">Information and operation must be understandable</p>
          </div>
          <div class="bg-amber-50 p-4 rounded-lg">
            <p class="font-semibold mb-2">🛠️ Robust</p>
            <p class="text-sm">Content must work with current and future technologies</p>
          </div>
        </div>
        <div class="bg-green-50 border-l-4 border-green-500 p-4 mt-4">
          <p class="text-sm"><strong>Testing:</strong> Regular audits with automated tools and real user testing.</p>
        </div>
      `
    },
    {
      id: 'keyboard',
      title: 'Keyboard Navigation',
      icon: <Keyboard className="w-5 h-5" />,
      content: `
        <h4 class="font-semibold mb-3">Full Keyboard Support:</h4>
        <ul class="list-disc pl-6 space-y-2 mb-4">
          <li><strong>Tab Navigation:</strong> Move forward through interactive elements</li>
          <li><strong>Shift + Tab:</strong> Navigate backward through elements</li>
          <li><strong>Enter/Space:</strong> Activate buttons and links</li>
          <li><strong>Arrow Keys:</strong> Navigate within menus and lists</li>
          <li><strong>Escape:</strong> Close modals and dropdowns</li>
          <li><strong>Skip Links:</strong> Jump directly to main content</li>
        </ul>
        <h4 class="font-semibold mb-3 mt-4">Focus Indicators:</h4>
        <ul class="list-disc pl-6 space-y-2 mb-4">
          <li>Visible focus indicators on all interactive elements</li>
          <li>High contrast focus outlines (3:1 minimum ratio)</li>
          <li>Logical tab order following visual layout</li>
          <li>No keyboard traps in navigation</li>
        </ul>
        <div class="bg-blue-50 border-l-4 border-blue-500 p-4 mt-4">
          <p class="text-sm"><strong>Try It:</strong> Press Tab key now to navigate through this page using only your keyboard!</p>
        </div>
      `
    },
    {
      id: 'screen-readers',
      title: 'Screen Reader Support',
      icon: <Volume2 className="w-5 h-5" />,
      content: `
        <h4 class="font-semibold mb-3">Compatible Screen Readers:</h4>
        <ul class="list-disc pl-6 space-y-2 mb-4">
          <li><strong>JAWS:</strong> Windows (tested with latest version)</li>
          <li><strong>NVDA:</strong> Windows (fully supported)</li>
          <li><strong>VoiceOver:</strong> macOS and iOS (optimized)</li>
          <li><strong>TalkBack:</strong> Android (compatible)</li>
          <li><strong>Narrator:</strong> Windows (supported)</li>
        </ul>
        <h4 class="font-semibold mb-3 mt-4">Semantic HTML:</h4>
        <ul class="list-disc pl-6 space-y-2 mb-4">
          <li>Proper heading hierarchy (H1-H6)</li>
          <li>ARIA labels for complex components</li>
          <li>Descriptive link text (no "click here")</li>
          <li>Alt text for all meaningful images</li>
          <li>Landmark regions for navigation</li>
          <li>Live regions for dynamic content</li>
        </ul>
        <div class="bg-purple-50 border-l-4 border-purple-500 p-4 mt-4">
          <p class="text-sm"><strong>Best Practice:</strong> All interactive elements have descriptive labels and states.</p>
        </div>
      `
    },
    {
      id: 'visual',
      title: 'Visual Accessibility',
      icon: <Eye className="w-5 h-5" />,
      content: `
        <h4 class="font-semibold mb-3">Color & Contrast:</h4>
        <ul class="list-disc pl-6 space-y-2 mb-4">
          <li><strong>Text Contrast:</strong> Minimum 4.5:1 ratio for body text</li>
          <li><strong>UI Contrast:</strong> Minimum 3:1 ratio for components</li>
          <li><strong>Color Independence:</strong> No information conveyed by color alone</li>
          <li><strong>Dark Mode:</strong> High contrast dark theme available</li>
          <li><strong>Pattern Support:</strong> Alternative to color-only indicators</li>
        </ul>
        <h4 class="font-semibold mb-3 mt-4">Typography:</h4>
        <ul class="list-disc pl-6 space-y-2 mb-4">
          <li><strong>Readable Fonts:</strong> Clear, sans-serif typefaces</li>
          <li><strong>Font Sizing:</strong> Responsive text that scales properly</li>
          <li><strong>Line Height:</strong> 1.5x minimum for readability</li>
          <li><strong>Line Length:</strong> 80 characters maximum per line</li>
          <li><strong>Text Spacing:</strong> Adequate spacing between elements</li>
        </ul>
        <h4 class="font-semibold mb-3 mt-4">Zoom & Magnification:</h4>
        <ul class="list-disc pl-6 space-y-2 mb-4">
          <li>Content remains functional up to 200% zoom</li>
          <li>No horizontal scrolling at standard zoom levels</li>
          <li>Browser zoom controls fully supported</li>
          <li>Responsive design adapts to viewport changes</li>
        </ul>
      `
    },
    {
      id: 'content',
      title: 'Content Accessibility',
      icon: <FileText className="w-5 h-5" />,
      content: `
        <h4 class="font-semibold mb-3">Clear Communication:</h4>
        <ul class="list-disc pl-6 space-y-2 mb-4">
          <li><strong>Plain Language:</strong> Simple, concise writing style</li>
          <li><strong>Readability:</strong> Grade 8-10 reading level target</li>
          <li><strong>Consistent Layout:</strong> Predictable page structures</li>
          <li><strong>Clear Headings:</strong> Descriptive section headers</li>
          <li><strong>Short Paragraphs:</strong> Digestible content blocks</li>
        </ul>
        <h4 class="font-semibold mb-3 mt-4">Multimedia:</h4>
        <ul class="list-disc pl-6 space-y-2 mb-4">
          <li><strong>Image Alt Text:</strong> Descriptive alternative text for all images</li>
          <li><strong>Video Captions:</strong> Closed captions for video content</li>
          <li><strong>Transcripts:</strong> Text alternatives for audio content</li>
          <li><strong>Audio Descriptions:</strong> Visual content described in audio</li>
          <li><strong>Pause Controls:</strong> User control over autoplay content</li>
        </ul>
        <div class="bg-indigo-50 border-l-4 border-indigo-500 p-4 mt-4">
          <p class="text-sm"><strong>Commitment:</strong> All new content follows accessibility guidelines from creation.</p>
        </div>
      `
    },
    {
      id: 'assistive-tech',
      title: 'Assistive Technologies',
      icon: <Settings className="w-5 h-5" />,
      content: `
        <h4 class="font-semibold mb-3">Supported Technologies:</h4>
        <ul class="list-disc pl-6 space-y-2 mb-4">
          <li><strong>Screen Magnifiers:</strong> ZoomText, MAGic compatibility</li>
          <li><strong>Voice Control:</strong> Dragon NaturallySpeaking, Voice Control</li>
          <li><strong>Switch Devices:</strong> Compatible with switch access systems</li>
          <li><strong>Braille Displays:</strong> Refreshable braille display support</li>
          <li><strong>Eye Tracking:</strong> Eye-gaze technology compatible</li>
        </ul>
        <h4 class="font-semibold mb-3 mt-4">Browser Features:</h4>
        <ul class="list-disc pl-6 space-y-2 mb-4">
          <li>Reader mode compatibility</li>
          <li>High contrast mode support</li>
          <li>Text-to-speech extensions work properly</li>
          <li>Custom CSS user stylesheets supported</li>
        </ul>
        <div class="bg-gray-50 border-l-4 border-gray-500 p-4 mt-4">
          <p class="text-sm"><strong>Testing:</strong> Regularly tested with popular assistive technologies.</p>
        </div>
      `
    },
    {
      id: 'alternative-formats',
      title: 'Alternative Formats',
      icon: <Layers className="w-5 h-5" />,
      content: `
        <h4 class="font-semibold mb-3">Available Formats:</h4>
        <ul class="list-disc pl-6 space-y-2 mb-4">
          <li><strong>PDF Documents:</strong> Tagged, accessible PDFs with proper structure</li>
          <li><strong>Text Files:</strong> Plain text versions available on request</li>
          <li><strong>Large Print:</strong> Scalable content for magnification</li>
          <li><strong>Simplified Version:</strong> Reduced complexity options</li>
        </ul>
        <h4 class="font-semibold mb-3 mt-4">Request Process:</h4>
        <ul class="list-disc pl-6 space-y-2 mb-4">
          <li>Email accessibility@surajz.dev with your request</li>
          <li>Specify preferred format and assistive technology</li>
          <li>We'll provide alternative format within 48 hours</li>
          <li>No additional charge for alternative formats</li>
        </ul>
      `
    },
    {
      id: 'limitations',
      title: 'Known Limitations',
      icon: <AlertTriangle className="w-5 h-5" />,
      content: `
        <h4 class="font-semibold mb-3">Current Limitations:</h4>
        <ul class="list-disc pl-6 space-y-2 mb-4">
          <li><strong>Third-Party Content:</strong> Some embedded content may not be fully accessible</li>
          <li><strong>Legacy Content:</strong> Older blog posts being updated to meet standards</li>
          <li><strong>Complex Visualizations:</strong> Some charts may need text alternatives</li>
          <li><strong>PDF Documents:</strong> Some older PDFs may not be fully tagged</li>
        </ul>
        <h4 class="font-semibold mb-3 mt-4">Ongoing Improvements:</h4>
        <ul class="list-disc pl-6 space-y-2 mb-4">
          <li>Quarterly accessibility audits</li>
          <li>Continuous remediation of identified issues</li>
          <li>User feedback integration</li>
          <li>Regular staff training on accessibility</li>
        </ul>
        <div class="bg-orange-50 border-l-4 border-orange-500 p-4 mt-4">
          <p class="text-sm"><strong>Transparency:</strong> We acknowledge these limitations and are actively working to address them.</p>
        </div>
      `
    },
    {
      id: 'feedback',
      title: 'Feedback & Support',
      icon: <MessageCircle className="w-5 h-5" />,
      content: `
        <h4 class="font-semibold mb-3">How to Report Issues:</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div class="bg-gray-50 p-4 rounded-lg">
            <p class="font-semibold mb-2">Accessibility Contact:</p>
            <p class="text-sm">📧 accessibility@surajz.dev</p>
            <p class="text-sm">📱 +91 9507272341</p>
          </div>
          <div class="bg-gray-50 p-4 rounded-lg">
            <p class="font-semibold mb-2">Response Times:</p>
            <p class="text-sm">Critical: 24 hours</p>
            <p class="text-sm">Non-critical: 5 business days</p>
          </div>
        </div>
        <h4 class="font-semibold mb-3 mt-4">What to Include:</h4>
        <ul class="list-disc pl-6 space-y-2 mb-4">
          <li>Description of the accessibility issue</li>
          <li>Page URL where issue occurs</li>
          <li>Assistive technology being used (if applicable)</li>
          <li>Browser and operating system details</li>
          <li>Screenshots or error messages (if relevant)</li>
        </ul>
        <h4 class="font-semibold mb-3 mt-4">Our Commitment:</h4>
        <ul class="list-disc pl-6 space-y-2 mb-4">
          <li>All feedback is taken seriously and investigated</li>
          <li>Updates provided throughout resolution process</li>
          <li>Priority given to issues affecting core functionality</li>
          <li>Continuous improvement based on user input</li>
        </ul>
        <div class="bg-green-50 border-l-4 border-green-500 p-4 mt-4">
          <p class="text-sm"><strong>Thank You:</strong> Your feedback helps us create a more inclusive experience for everyone.</p>
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
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 mx-auto mb-6 bg-gradient-to-br from-amber-100 to-orange-200 rounded-full flex items-center justify-center shadow-xl animate-scale-in">
            <Eye className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-amber-600" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-amber-800 mb-4 sm:mb-6 px-4">
            Accessibility Statement
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-amber-600 max-w-3xl mx-auto mb-6 sm:mb-8 px-4 leading-relaxed">
            We're committed to making our website accessible to everyone, including people with disabilities.
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
            {accessibilitySections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`text-left p-2 rounded-lg transition-all duration-300 flex items-center gap-2 ${
                  activeSection === section.id
                    ? 'bg-amber-100 text-amber-700 font-semibold'
                    : 'hover:bg-amber-50 text-gray-700 hover:text-amber-600'
                }`}
                aria-label={`Navigate to ${section.title} section`}
              >
                {section.icon}
                <span className="text-sm">{section.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Accessibility Content */}
        <div className="max-w-5xl mx-auto mb-12 sm:mb-16 lg:mb-20">
          {accessibilitySections.map((section, index) => (
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
                aria-expanded={expandedSections.has(section.id)}
                aria-controls={`${section.id}-content`}
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
                  aria-hidden="true"
                />
              </button>
              {expandedSections.has(section.id) && (
                <div 
                  id={`${section.id}-content`}
                  className="px-6 pb-6 border-t border-amber-100"
                >
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
                <Zap className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Accessibility Highlights</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                  <div className="bg-white/10 rounded-lg p-3">
                    <p className="text-sm leading-relaxed">
                      ✓ WCAG 2.1 Level AA compliant<br/>
                      ✓ Full keyboard navigation support<br/>
                      ✓ Screen reader optimized content
                    </p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3">
                    <p className="text-sm leading-relaxed">
                      ✓ High contrast text and UI elements<br/>
                      ✓ Responsive and mobile-friendly design<br/>
                      ✓ Regular accessibility audits and updates
                    </p>
                  </div>
                </div>
                <p className="text-sm opacity-80 mt-4">
                  We're committed to continuous improvement and welcome your feedback.
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
              Help Us Improve
            </h3>
            <p className="text-base sm:text-lg text-amber-600 mb-6 sm:mb-8 leading-relaxed">
              We value your input! If you encounter any accessibility barriers or have suggestions for improvement, please don't hesitate to reach out. Together, we can make the web more inclusive.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Link 
                to="/contact" 
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 text-sm sm:text-base"
                aria-label="Contact us about accessibility"
              >
                <MessageCircle className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                <span>Report Issue</span>
              </Link>
              <Link 
                to="/" 
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-white hover:bg-amber-50 text-amber-600 rounded-xl font-semibold border-2 border-amber-300 hover:border-amber-400 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 text-sm sm:text-base"
              >
                <span>Back to Home</span>
                <ChevronRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
              </Link>
              <Link 
                to="/privacy" 
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 text-sm sm:text-base"
              >
                <span>Privacy Policy</span>
              </Link>
            </div>
            <div className="p-4 bg-white/50 rounded-xl">
              <p className="text-sm text-amber-600">
                <strong>Our Promise:</strong> We are committed to maintaining and improving the accessibility of SuraJz.dev for all users.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Accessibility;