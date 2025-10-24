import React, { useState, useEffect } from 'react';
import {
  Star,
  Send,
  MessageSquare,
  ThumbsUp,
  Sparkles,
  Award,
  CheckCircle,
  AlertCircle,
  Loader2,
  TrendingUp,
  Code,
  Palette,
  Zap,
  Eye,
  Heart,
  User,
  Users,
  Smartphone,
  Target,
  Briefcase,
  Shield,
  Layout,
  Navigation,
  FileText,
  Linkedin,
  MousePointer,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import Footer from '../components/Footer';

// Enhanced Type Definitions
interface FeedbackFormData {
  // Personal Information
  name: string;
  email: string;
  company: string;
  jobTitle: string;
  industry: string;
  location: string;
  linkedinProfile: string;
  
  // Overall Ratings
  overallRating: number;
  designRating: number;
  contentRating: number;
  functionalityRating: number;
  performanceRating: number;
  navigationRating: number;
  responsiveRating: number;
  accessibilityRating: number;
  
  // Detailed Ratings (1-10 scale)
  visualAppealScore: number;
  colorSchemeScore: number;
  typographyScore: number;
  layoutScore: number;
  animationScore: number;
  loadingSpeedScore: number;
  easeOfNavigationScore: number;
  contentClarityScore: number;
  
  // Experience Questions
  experienceLevel: string;
  visitPurpose: string;
  favoriteSection: string;
  wouldRecommend: string;
  likelyToHire: string;
  deviceUsed: string;
  browserUsed: string;
  visitDuration: string;
  
  // Multiple Choice
  designStyle: string[];
  improvementAreas: string[];
  mostImpressiveFeatures: string[];
  projectsInterest: string[];
  skillsNeeded: string[];
  
  // Priority Rankings
  mostImportantAspect: string;
  leastImportantAspect: string;
  
  // Yes/No Questions
  wouldBookmark: boolean;
  wouldShare: boolean;
  portfolioStandsOut: boolean;
  navigationEasy: boolean;
  loadedQuickly: boolean;
  mobileExperienceGood: boolean;
  wouldContactForJob: boolean;
  foundWhatLookingFor: boolean;
  
  // Comparison
  comparisonToOthers: string;
  professionalLevel: string;
  
  // NPS Style
  recommendScore: number;
  
  // Written Feedback
  strengths: string;
  improvements: string;
  firstImpression: string;
  standoutElement: string;
  confusingElement: string;
  missingFeature: string;
  additionalComments: string;
  adviceForImprovement: string;
}

interface FormErrors {
  [key: string]: string | undefined; 
}


interface RatingCategory {
  id: keyof FeedbackFormData;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  description: string;
}

interface ScoreCategory {
  id: keyof FeedbackFormData;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  minLabel: string;
  maxLabel: string;
}

interface FormStatus {
  type: 'idle' | 'loading' | 'success' | 'error';
  message: string;
}

interface SelectOption {
  value: string;
  label: string;
  icon: string;
}

const PortfolioFeedback: React.FC = () => {
  const [formData, setFormData] = useState<FeedbackFormData>({
    // Personal Information
    name: '',
    email: '',
    company: '',
    jobTitle: '',
    industry: '',
    location: '',
    linkedinProfile: '',
    
    // Overall Ratings (1-5 stars)
    overallRating: 0,
    designRating: 0,
    contentRating: 0,
    functionalityRating: 0,
    performanceRating: 0,
    navigationRating: 0,
    responsiveRating: 0,
    accessibilityRating: 0,
    
    // Detailed Scores (1-10 scale)
    visualAppealScore: 0,
    colorSchemeScore: 0,
    typographyScore: 0,
    layoutScore: 0,
    animationScore: 0,
    loadingSpeedScore: 0,
    easeOfNavigationScore: 0,
    contentClarityScore: 0,
    
    // Experience Questions
    experienceLevel: '',
    visitPurpose: '',
    favoriteSection: '',
    wouldRecommend: '',
    likelyToHire: '',
    deviceUsed: '',
    browserUsed: '',
    visitDuration: '',
    
    // Multiple Choice
    designStyle: [],
    improvementAreas: [],
    mostImpressiveFeatures: [],
    projectsInterest: [],
    skillsNeeded: [],
    
    // Priority Rankings
    mostImportantAspect: '',
    leastImportantAspect: '',
    
    // Yes/No Questions
    wouldBookmark: false,
    wouldShare: false,
    portfolioStandsOut: false,
    navigationEasy: false,
    loadedQuickly: false,
    mobileExperienceGood: false,
    wouldContactForJob: false,
    foundWhatLookingFor: false,
    
    // Comparison
    comparisonToOthers: '',
    professionalLevel: '',
    
    // NPS
    recommendScore: 0,
    
    // Written Feedback
    strengths: '',
    improvements: '',
    firstImpression: '',
    standoutElement: '',
    confusingElement: '',
    missingFeature: '',
    additionalComments: '',
    adviceForImprovement: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [formStatus, setFormStatus] = useState<FormStatus>({
    type: 'idle',
    message: '',
  });
  const [hoveredStar, setHoveredStar] = useState<Record<string, number>>({});
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadingProgress, setLoadingProgress] = useState<number>(0);

  // Simulate initial loading with progress
  useEffect(() => {
    const progressInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 10;
      });
    }, 150);

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(timer);
    };
  }, []);

  // Scroll progress tracking
  useEffect(() => {
    const handleScroll = (): void => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setScrollProgress(scrollPercent);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Rating Categories (1-5 stars)
  const ratingCategories: RatingCategory[] = [
    {
      id: 'designRating',
      label: 'Visual Design',
      icon: Palette,
      color: 'from-pink-400 to-rose-500',
      description: 'Colors, layout, aesthetics',
    },
    {
      id: 'contentRating',
      label: 'Content Quality',
      icon: MessageSquare,
      color: 'from-blue-400 to-cyan-500',
      description: 'Information, clarity, relevance',
    },
    {
      id: 'functionalityRating',
      label: 'Functionality',
      icon: Code,
      color: 'from-green-400 to-emerald-500',
      description: 'Features, interactivity, usability',
    },
    {
      id: 'performanceRating',
      label: 'Performance',
      icon: Zap,
      color: 'from-yellow-400 to-orange-500',
      description: 'Speed, responsiveness, smoothness',
    },
    {
      id: 'navigationRating',
      label: 'Navigation',
      icon: Navigation,
      color: 'from-purple-400 to-indigo-500',
      description: 'Ease of finding information',
    },
    {
      id: 'responsiveRating',
      label: 'Responsiveness',
      icon: Smartphone,
      color: 'from-cyan-400 to-blue-500',
      description: 'Mobile and tablet experience',
    },
    {
      id: 'accessibilityRating',
      label: 'Accessibility',
      icon: Shield,
      color: 'from-green-500 to-emerald-600',
      description: 'Usability for all users',
    },
  ];

  // Score Categories (1-10 slider scale)
  const scoreCategories: ScoreCategory[] = [
    {
      id: 'visualAppealScore',
      label: 'Visual Appeal',
      description: 'How visually attractive is the portfolio?',
      icon: Eye,
      minLabel: 'Not Appealing',
      maxLabel: 'Extremely Appealing',
    },
    {
      id: 'colorSchemeScore',
      label: 'Color Scheme',
      description: 'How well do the colors work together?',
      icon: Palette,
      minLabel: 'Poor',
      maxLabel: 'Excellent',
    },
    {
      id: 'typographyScore',
      label: 'Typography',
      description: 'How readable and appealing is the text?',
      icon: FileText,
      minLabel: 'Hard to Read',
      maxLabel: 'Very Clear',
    },
    {
      id: 'layoutScore',
      label: 'Layout & Structure',
      description: 'How well is the content organized?',
      icon: Layout,
      minLabel: 'Confusing',
      maxLabel: 'Perfect',
    },
    {
      id: 'animationScore',
      label: 'Animations & Transitions',
      description: 'How smooth and appropriate are the animations?',
      icon: Sparkles,
      minLabel: 'Distracting',
      maxLabel: 'Delightful',
    },
    {
      id: 'loadingSpeedScore',
      label: 'Loading Speed',
      description: 'How fast did the portfolio load?',
      icon: Zap,
      minLabel: 'Very Slow',
      maxLabel: 'Instant',
    },
    {
      id: 'easeOfNavigationScore',
      label: 'Ease of Navigation',
      description: 'How easy is it to find what you need?',
      icon: MousePointer,
      minLabel: 'Difficult',
      maxLabel: 'Effortless',
    },
    {
      id: 'contentClarityScore',
      label: 'Content Clarity',
      description: 'How clear and understandable is the content?',
      icon: MessageSquare,
      minLabel: 'Unclear',
      maxLabel: 'Crystal Clear',
    },
  ];

  // Experience Level Options
  const experienceLevelOptions: SelectOption[] = [
    { value: 'student', label: 'Student', icon: '🎓' },
    { value: 'junior', label: 'Junior Developer (0-2 years)', icon: '👨‍💻' },
    { value: 'mid', label: 'Mid-Level Developer (2-5 years)', icon: '💼' },
    { value: 'senior', label: 'Senior Developer (5+ years)', icon: '🏆' },
    { value: 'lead', label: 'Tech Lead / Manager', icon: '👔' },
    { value: 'recruiter', label: 'Recruiter / HR', icon: '🤝' },
    { value: 'founder', label: 'Founder / Entrepreneur', icon: '🚀' },
    { value: 'designer', label: 'Designer', icon: '🎨' },
    { value: 'other', label: 'Other', icon: '🌟' },
  ];

  // Visit Purpose Options
  const visitPurposeOptions: SelectOption[] = [
    { value: 'hiring', label: 'Evaluating for Job Opportunity', icon: '💼' },
    { value: 'collaboration', label: 'Looking for Collaboration', icon: '🤝' },
    { value: 'freelance', label: 'Considering for Freelance Work', icon: '💰' },
    { value: 'inspiration', label: 'Seeking Design Inspiration', icon: '💡' },
    { value: 'learning', label: 'Learning & Research', icon: '📚' },
    { value: 'networking', label: 'Professional Networking', icon: '🌐' },
    { value: 'referral', label: 'Came from Referral', icon: '👥' },
    { value: 'casual', label: 'Casual Browsing', icon: '👀' },
  ];

  // Industry Options
  const industryOptions: SelectOption[] = [
    { value: 'tech', label: 'Technology / Software', icon: '💻' },
    { value: 'finance', label: 'Finance / Banking', icon: '💰' },
    { value: 'healthcare', label: 'Healthcare', icon: '🏥' },
    { value: 'education', label: 'Education', icon: '🎓' },
    { value: 'ecommerce', label: 'E-commerce / Retail', icon: '🛒' },
    { value: 'marketing', label: 'Marketing / Advertising', icon: '📢' },
    { value: 'consulting', label: 'Consulting', icon: '👔' },
    { value: 'startup', label: 'Startup', icon: '🚀' },
    { value: 'other', label: 'Other', icon: '🌟' },
  ];

  // Device Used Options
  const deviceOptions: SelectOption[] = [
    { value: 'desktop', label: 'Desktop Computer', icon: '🖥️' },
    { value: 'laptop', label: 'Laptop', icon: '💻' },
    { value: 'tablet', label: 'Tablet', icon: '📱' },
    { value: 'mobile', label: 'Mobile Phone', icon: '📱' },
  ];

  // Browser Options
  const browserOptions: SelectOption[] = [
    { value: 'chrome', label: 'Google Chrome', icon: '🌐' },
    { value: 'firefox', label: 'Mozilla Firefox', icon: '🦊' },
    { value: 'safari', label: 'Safari', icon: '🧭' },
    { value: 'edge', label: 'Microsoft Edge', icon: '🔷' },
    { value: 'other', label: 'Other', icon: '🌍' },
  ];

  // Design Style Options (Multiple Select)
  const designStyleOptions: SelectOption[] = [
    { value: 'modern', label: 'Modern', icon: '✨' },
    { value: 'minimalist', label: 'Minimalist', icon: '⚪' },
    { value: 'colorful', label: 'Colorful', icon: '🌈' },
    { value: 'professional', label: 'Professional', icon: '👔' },
    { value: 'creative', label: 'Creative', icon: '🎨' },
    { value: 'clean', label: 'Clean', icon: '🧼' },
    { value: 'bold', label: 'Bold', icon: '💪' },
    { value: 'elegant', label: 'Elegant', icon: '💎' },
  ];

  // Improvement Areas (Multiple Select)
  const improvementAreasOptions: SelectOption[] = [
    { value: 'design', label: 'Visual Design', icon: '🎨' },
    { value: 'content', label: 'Content Writing', icon: '✍️' },
    { value: 'navigation', label: 'Navigation', icon: '🧭' },
    { value: 'performance', label: 'Page Load Speed', icon: '⚡' },
    { value: 'mobile', label: 'Mobile Experience', icon: '📱' },
    { value: 'projects', label: 'Project Descriptions', icon: '💼' },
    { value: 'contact', label: 'Contact Information', icon: '📧' },
    { value: 'animations', label: 'Animations', icon: '✨' },
    { value: 'accessibility', label: 'Accessibility', icon: '♿' },
    { value: 'seo', label: 'SEO', icon: '🔍' },
  ];

  // Most Impressive Features (Multiple Select)
  const impressiveFeaturesOptions: SelectOption[] = [
    { value: 'design', label: 'Overall Design', icon: '🎨' },
    { value: 'animations', label: 'Smooth Animations', icon: '✨' },
    { value: 'projects', label: 'Project Showcase', icon: '💼' },
    { value: 'skills', label: 'Skills Section', icon: '🎯' },
    { value: 'about', label: 'About Section', icon: '👤' },
    { value: 'responsiveness', label: 'Mobile Responsiveness', icon: '📱' },
    { value: 'performance', label: 'Fast Loading', icon: '⚡' },
    { value: 'navigation', label: 'Easy Navigation', icon: '🧭' },
    { value: 'content', label: 'Clear Content', icon: '📝' },
    { value: 'creativity', label: 'Creative Approach', icon: '💡' },
  ];

  // Priority Aspects
  const priorityAspectsOptions: SelectOption[] = [
    { value: 'design', label: 'Visual Design', icon: '🎨' },
    { value: 'content', label: 'Content Quality', icon: '📝' },
    { value: 'performance', label: 'Performance', icon: '⚡' },
    { value: 'projects', label: 'Project Showcase', icon: '💼' },
    { value: 'skills', label: 'Skills Display', icon: '🎯' },
    { value: 'navigation', label: 'Easy Navigation', icon: '🧭' },
    { value: 'mobile', label: 'Mobile Experience', icon: '📱' },
    { value: 'contact', label: 'Contact Options', icon: '📧' },
  ];

  // Comparison Options
  const comparisonOptions: SelectOption[] = [
    { value: 'much-better', label: 'Much Better Than Others', icon: '⭐' },
    { value: 'better', label: 'Better Than Most', icon: '👍' },
    { value: 'average', label: 'About Average', icon: '😐' },
    { value: 'below', label: 'Below Average', icon: '👎' },
    { value: 'much-below', label: 'Needs Major Improvement', icon: '❌' },
  ];

  // Professional Level Assessment
  const professionalLevelOptions: SelectOption[] = [
    { value: 'beginner', label: 'Beginner Level', icon: '🌱' },
    { value: 'intermediate', label: 'Intermediate Level', icon: '📈' },
    { value: 'advanced', label: 'Advanced Level', icon: '🚀' },
    { value: 'expert', label: 'Expert/Professional Level', icon: '👑' },
    { value: 'world-class', label: 'World-Class', icon: '🏆' },
  ];

  // Hiring Likelihood
  const hiringLikelihoodOptions: SelectOption[] = [
    { value: 'definitely', label: 'Definitely Would Hire', icon: '✅' },
    { value: 'probably', label: 'Probably Would Hire', icon: '👍' },
    { value: 'maybe', label: 'Maybe, Need More Info', icon: '🤔' },
    { value: 'unlikely', label: 'Unlikely', icon: '👎' },
    { value: 'no', label: 'Would Not Hire', icon: '❌' },
    { value: 'not-hiring', label: 'Not Looking to Hire', icon: '🚫' },
  ];

  // Validation
  const validateField = (name: string, value: any): string | undefined => {
    switch (name) {
      case 'name':
        if (!value || !value.trim()) return 'Name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        return undefined;

      case 'email':
        if (!value || !value.trim()) return 'Email is required';
        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
          return 'Invalid email address';
        }
        return undefined;

      case 'overallRating':
        if (!value || value === 0) return 'Please provide an overall rating';
        return undefined;

      case 'experienceLevel':
      case 'visitPurpose':
      case 'deviceUsed':
        if (!value) return 'Please make a selection';
        return undefined;

      case 'strengths':
      case 'improvements':
      case 'firstImpression':
        if (!value || !value.trim()) return 'This field is required';
        if (value.trim().length < 10) return 'Please provide more details (at least 10 characters)';
        return undefined;

      default:
        return undefined;
    }
  };

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ): void => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  // Handle blur
  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  // Handle rating change
  const handleRatingChange = (category: keyof FeedbackFormData, rating: number): void => {
    setFormData((prev) => ({ ...prev, [category]: rating }));
    setTouched((prev) => ({ ...prev, [category]: true }));
    
    if (category === 'overallRating') {
      const error = validateField('overallRating', rating);
      setErrors((prev) => ({ ...prev, overallRating: error }));
    }
  };

  // Handle score change (slider)
  const handleScoreChange = (category: keyof FeedbackFormData, score: number): void => {
    setFormData((prev) => ({ ...prev, [category]: score }));
  };

  // Handle multiple select
  const handleMultipleSelect = (category: keyof FeedbackFormData, value: string): void => {
    setFormData((prev) => {
      const currentValues = prev[category] as string[];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];
      return { ...prev, [category]: newValues };
    });
  };

  // Star Rating Component
  const StarRating: React.FC<{
    category: keyof FeedbackFormData;
    value: number;
    onChange: (rating: number) => void;
    size?: 'sm' | 'md' | 'lg';
    showLabel?: boolean;
  }> = ({ category, value, onChange, size = 'md', showLabel = true }) => {
    const sizeClasses = {
      sm: 'h-6 w-6',
      md: 'h-8 w-8',
      lg: 'h-10 w-10',
    };

    const currentHovered = hoveredStar[category] || 0;
    const displayValue = currentHovered || value;

    return (
      <div className="flex items-center gap-2">
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => onChange(star)}
              onMouseEnter={() => setHoveredStar((prev) => ({ ...prev, [category]: star }))}
              onMouseLeave={() => setHoveredStar((prev) => ({ ...prev, [category]: 0 }))}
              className="transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-amber-500 rounded"
            >
              <Star
                className={`${sizeClasses[size]} transition-colors duration-200 ${
                  star <= displayValue
                    ? 'fill-amber-400 text-amber-400'
                    : 'text-gray-300'
                }`}
              />
            </button>
          ))}
        </div>
        {showLabel && displayValue > 0 && (
          <span className="text-sm font-medium text-gray-600 min-w-[100px]">
            {displayValue === 1 && '😞 Poor'}
            {displayValue === 2 && '😕 Fair'}
            {displayValue === 3 && '😊 Good'}
            {displayValue === 4 && '😄 Great'}
            {displayValue === 5 && '🤩 Excellent'}
          </span>
        )}
      </div>
    );
  };

  // Slider Score Component
  const SliderScore: React.FC<{
    category: keyof FeedbackFormData;
    value: number;
    onChange: (score: number) => void;
    minLabel: string;
    maxLabel: string;
  }> = ({ value, onChange, minLabel, maxLabel }) => {
    return (
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500">{minLabel}</span>
          <span className="text-lg font-bold text-amber-600">{value || 0}/10</span>
          <span className="text-xs text-gray-500">{maxLabel}</span>
        </div>
        <input
          type="range"
          min="0"
          max="10"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
          style={{
            background: `linear-gradient(to right, #f59e0b 0%, #f59e0b ${value * 10}%, #e5e7eb ${value * 10}%, #e5e7eb 100%)`
          }}
        />
        <div className="flex justify-between text-xs text-gray-400">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
            <span key={num}>{num}</span>
          ))}
        </div>
      </div>
    );
  };

  // NPS Score Component
  const NPSScore: React.FC = () => {
    return (
      <div className="space-y-4">
        <p className="text-sm text-gray-600">
          On a scale of 0-10, how likely are you to recommend this portfolio to a colleague or friend?
        </p>
        <div className="grid grid-cols-11 gap-2">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => (
            <button
              key={score}
              type="button"
              onClick={() => setFormData((prev) => ({ ...prev, recommendScore: score }))}
              className={`h-12 rounded-lg font-bold transition-all hover:scale-105 ${
                formData.recommendScore === score
                  ? score <= 6
                    ? 'bg-red-500 text-white shadow-lg'
                    : score <= 8
                    ? 'bg-yellow-500 text-white shadow-lg'
                    : 'bg-green-500 text-white shadow-lg'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {score}
            </button>
          ))}
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          <span>Not at all likely</span>
          <span>Extremely likely</span>
        </div>
        {formData.recommendScore > 0 && (
          <p className="text-sm font-medium text-center">
            {formData.recommendScore <= 6 && '😞 Detractor - Needs significant improvement'}
            {formData.recommendScore >= 7 && formData.recommendScore <= 8 && '😐 Passive - Good but could be better'}
            {formData.recommendScore >= 9 && '🤩 Promoter - Excellent work!'}
          </p>
        )}
      </div>
    );
  };

  // Calculate form completion percentage
  const calculateCompletion = (): number => {
    const totalFields = Object.keys(formData).length;
    const filledFields = Object.values(formData).filter((value) => {
      if (Array.isArray(value)) return value.length > 0;
      if (typeof value === 'boolean') return true;
      if (typeof value === 'number') return value > 0;
      return value && value.toString().trim().length > 0;
    }).length;
    return Math.round((filledFields / totalFields) * 100);
  };

  // Validate entire form
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    const requiredFields = [
      'name',
      'email',
      'overallRating',
      'experienceLevel',
      'visitPurpose',
      'deviceUsed',
      'strengths',
      'improvements',
      'firstImpression',
    ];

    requiredFields.forEach((field) => {
      const value = formData[field as keyof FeedbackFormData];
      const error = validateField(field, value);
      if (error) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    const allTouched = Object.keys(formData).reduce(
      (acc, key) => ({ ...acc, [key]: true }),
      {}
    );
    setTouched(allTouched);

    if (!validateForm()) {
      setFormStatus({
        type: 'error',
        message: 'Please fill all required fields correctly',
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setFormStatus({ type: 'loading', message: 'Submitting your comprehensive feedback...' });

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log('Comprehensive Feedback submitted:', {
        ...formData,
        completionPercentage: calculateCompletion(),
        submittedAt: new Date().toISOString(),
      });

      setFormStatus({
        type: 'success',
        message: 'Thank you for your detailed feedback! Your insights are invaluable and will help me improve significantly.',
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        company: '',
        jobTitle: '',
        industry: '',
        location: '',
        linkedinProfile: '',
        overallRating: 0,
        designRating: 0,
        contentRating: 0,
        functionalityRating: 0,
        performanceRating: 0,
        navigationRating: 0,
        responsiveRating: 0,
        accessibilityRating: 0,
        visualAppealScore: 0,
        colorSchemeScore: 0,
        typographyScore: 0,
        layoutScore: 0,
        animationScore: 0,
        loadingSpeedScore: 0,
        easeOfNavigationScore: 0,
        contentClarityScore: 0,
        experienceLevel: '',
        visitPurpose: '',
        favoriteSection: '',
        wouldRecommend: '',
        likelyToHire: '',
        deviceUsed: '',
        browserUsed: '',
        visitDuration: '',
        designStyle: [],
        improvementAreas: [],
        mostImpressiveFeatures: [],
        projectsInterest: [],
        skillsNeeded: [],
        mostImportantAspect: '',
        leastImportantAspect: '',
        wouldBookmark: false,
        wouldShare: false,
        portfolioStandsOut: false,
        navigationEasy: false,
        loadedQuickly: false,
        mobileExperienceGood: false,
        wouldContactForJob: false,
        foundWhatLookingFor: false,
        comparisonToOthers: '',
        professionalLevel: '',
        recommendScore: 0,
        strengths: '',
        improvements: '',
        firstImpression: '',
        standoutElement: '',
        confusingElement: '',
        missingFeature: '',
        additionalComments: '',
        adviceForImprovement: '',
      });
      setErrors({});
      setTouched({});

      setTimeout(() => {
        setFormStatus({ type: 'idle', message: '' });
      }, 5000);
    } catch (error) {
      setFormStatus({
        type: 'error',
        message: 'Something went wrong. Please try again.',
      });
      console.error('Submission error:', error);
    }
  };

  // Professional Loading Screen
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream-50 via-cream-100 to-amber-50 flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-amber-300/20 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute top-40 right-10 w-96 h-96 bg-orange-300/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-yellow-300/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative z-10 text-center px-4">
          {/* Main Loading Icon */}
          <div className="relative w-32 h-32 mx-auto mb-8">
            <div className="absolute inset-0 rounded-full border-4 border-amber-200/50" />
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-amber-500 border-r-amber-500 animate-spin" />
            <div className="absolute inset-2 rounded-full border-4 border-transparent border-b-orange-500 border-l-orange-500 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
            
            {/* Center Icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <MessageSquare className="h-12 w-12 text-amber-600 animate-pulse" />
            </div>
          </div>

          {/* Loading Text */}
          <div className="mb-6">
            <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-amber-600 via-orange-600 to-red-500 bg-clip-text text-transparent">
              Loading Feedback Form
            </h2>
            <p className="text-gray-600 text-lg">
              Preparing your feedback experience...
            </p>
          </div>

          {/* Progress Bar */}
          <div className="max-w-md mx-auto">
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
            <p className="text-sm text-gray-500">{loadingProgress}% Complete</p>
          </div>

          {/* Loading Features */}
          <div className="mt-8 grid grid-cols-3 gap-4 max-w-lg mx-auto">
            {[
              { icon: Star, label: 'Ratings', delay: '0s' },
              { icon: MessageSquare, label: 'Feedback', delay: '0.2s' },
              { icon: Award, label: 'Reviews', delay: '0.4s' },
            ].map((item, index) => (
              <div 
                key={index}
                className="flex flex-col items-center p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-amber-200 animate-fade-in"
                style={{ animationDelay: item.delay }}
              >
                <item.icon className="h-8 w-8 text-amber-600 mb-2" />
                <span className="text-xs font-medium text-gray-700">{item.label}</span>
              </div>
            ))}
          </div>

          {/* Loading Tips */}
          <div className="mt-8 max-w-md mx-auto">
            <div className="bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-amber-200">
              <p className="text-sm text-gray-600">
                💡 <span className="font-medium">Tip:</span> Your honest feedback helps create a better portfolio experience for everyone!
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-cream-100 to-amber-50">
      {/* Scroll Progress */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div
          className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative pt-24 pb-12 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-amber-300/20 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute top-40 right-10 w-96 h-96 bg-orange-300/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-12 animate-fade-in">
            <Badge className="px-4 py-2 text-sm bg-amber-100 text-amber-800 mb-6 shadow-lg">
              <Award className="w-4 h-4 mr-2" />
              Comprehensive Portfolio Feedback
            </Badge>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-amber-600 via-orange-600 to-red-500 bg-clip-text text-transparent">
              Your Feedback Matters
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-6">
              Help me create an outstanding portfolio by sharing your detailed thoughts, ratings, and suggestions across multiple dimensions.
            </p>
            
            {/* Completion Percentage */}
            <div className="max-w-md mx-auto">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-600">Form Completion</span>
                <span className="text-sm font-bold text-amber-600">{calculateCompletion()}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-amber-500 to-orange-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${calculateCompletion()}%` }}
                />
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 max-w-4xl mx-auto">
              {[
                { icon: Star, label: 'Rate Multiple Aspects', color: 'from-pink-400 to-rose-500', count: '15+' },
                { icon: MessageSquare, label: 'Share Detailed Thoughts', color: 'from-blue-400 to-cyan-500', count: '8+' },
                { icon: ThumbsUp, label: 'Give Specific Feedback', color: 'from-green-400 to-emerald-500', count: '20+' },
                { icon: Target, label: 'Help Me Improve', color: 'from-red-400 to-pink-500', count: '100%' },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-amber-200 animate-slide-up hover:scale-105 transition-transform"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-lg flex items-center justify-center mx-auto mb-2`}>
                    <item.icon className="h-6 w-6 text-white" />
                  </div>
                  <p className="text-2xl font-bold text-gray-800 mb-1">{item.count}</p>
                  <p className="text-xs font-medium text-gray-600">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

       <section className="py-12 px-4 sm:px-6">
              <div className="container mx-auto max-w-5xl">
                <form onSubmit={handleSubmit} className="space-y-8" noValidate>
                  {/* Status Message */}
                  {formStatus.type !== 'idle' && (
                    <Card className="animate-fade-in">
                      <CardContent className="p-6">
                        <div
                          className={`flex items-start space-x-3 ${
                            formStatus.type === 'success'
                              ? 'text-green-800'
                              : formStatus.type === 'error'
                              ? 'text-red-800'
                              : 'text-blue-800'
                          }`}
                        >
                          {formStatus.type === 'success' && <CheckCircle className="h-6 w-6 flex-shrink-0" />}
                          {formStatus.type === 'error' && <AlertCircle className="h-6 w-6 flex-shrink-0" />}
                          {formStatus.type === 'loading' && <Loader2 className="h-6 w-6 flex-shrink-0 animate-spin" />}
                          <p className="font-medium">{formStatus.message}</p>
                        </div>
                      </CardContent>
                    </Card>
                  )}
      
                  {/* Section 1: Personal Information */}
                  <Card className="bg-white/70 backdrop-blur-sm border border-amber-200 shadow-xl animate-slide-up">
                    <CardHeader className="border-b border-amber-100 bg-gradient-to-r from-blue-50 to-cyan-50">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-lg flex items-center justify-center">
                          <User className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-2xl">Personal Information</CardTitle>
                          <CardDescription>Tell us about yourself (all fields with * are required)</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label htmlFor="name" className="text-sm font-medium text-gray-700">
                            Full Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="John Doe"
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 transition-all ${
                              errors.name && touched.name ? 'border-red-500 bg-red-50' : 'border-gray-300'
                            }`}
                          />
                          {errors.name && touched.name && (
                            <p className="text-sm text-red-600 flex items-center">
                              <AlertCircle className="h-4 w-4 mr-1" />
                              {errors.name}
                            </p>
                          )}
                        </div>
      
                        <div className="space-y-2">
                          <label htmlFor="email" className="text-sm font-medium text-gray-700">
                            Email Address <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="john@example.com"
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 transition-all ${
                              errors.email && touched.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
                            }`}
                          />
                          {errors.email && touched.email && (
                            <p className="text-sm text-red-600 flex items-center">
                              <AlertCircle className="h-4 w-4 mr-1" />
                              {errors.email}
                            </p>
                          )}
                        </div>
      
                        <div className="space-y-2">
                          <label htmlFor="company" className="text-sm font-medium text-gray-700">
                            Company / Organization
                          </label>
                          <input
                            type="text"
                            id="company"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            placeholder="Tech Corp"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 transition-all"
                          />
                        </div>
      
                        <div className="space-y-2">
                          <label htmlFor="jobTitle" className="text-sm font-medium text-gray-700">
                            Job Title / Role
                          </label>
                          <input
                            type="text"
                            id="jobTitle"
                            name="jobTitle"
                            value={formData.jobTitle}
                            onChange={handleChange}
                            placeholder="Software Engineer"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 transition-all"
                          />
                        </div>
      
                        <div className="space-y-2">
                          <label htmlFor="industry" className="text-sm font-medium text-gray-700">
                            Industry
                          </label>
                          <select
                            id="industry"
                            name="industry"
                            value={formData.industry}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 transition-all"
                          >
                            <option value="">Select industry</option>
                            {industryOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.icon} {option.label}
                              </option>
                            ))}
                          </select>
                        </div>
      
                        <div className="space-y-2">
                          <label htmlFor="location" className="text-sm font-medium text-gray-700">
                            Location
                          </label>
                          <input
                            type="text"
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="City, Country"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 transition-all"
                          />
                        </div>
                      </div>
      
                      <div className="space-y-2">
                        <label htmlFor="linkedinProfile" className="text-sm font-medium text-gray-700 flex items-center">
                          <Linkedin className="h-4 w-4 mr-2 text-blue-600" />
                          LinkedIn Profile (Optional)
                        </label>
                        <input
                          type="url"
                          id="linkedinProfile"
                          name="linkedinProfile"
                          value={formData.linkedinProfile}
                          onChange={handleChange}
                          placeholder="https://linkedin.com/in/yourprofile"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 transition-all"
                        />
                      </div>
      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label htmlFor="experienceLevel" className="text-sm font-medium text-gray-700">
                            Your Experience Level <span className="text-red-500">*</span>
                          </label>
                          <select
                            id="experienceLevel"
                            name="experienceLevel"
                            value={formData.experienceLevel}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 transition-all ${
                              errors.experienceLevel && touched.experienceLevel ? 'border-red-500 bg-red-50' : 'border-gray-300'
                            }`}
                          >
                            <option value="">Select your level</option>
                            {experienceLevelOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.icon} {option.label}
                              </option>
                            ))}
                          </select>
                          {errors.experienceLevel && touched.experienceLevel && (
                            <p className="text-sm text-red-600 flex items-center">
                              <AlertCircle className="h-4 w-4 mr-1" />
                              {errors.experienceLevel}
                            </p>
                          )}
                        </div>
      
                        <div className="space-y-2">
                          <label htmlFor="visitPurpose" className="text-sm font-medium text-gray-700">
                            Purpose of Visit <span className="text-red-500">*</span>
                          </label>
                          <select
                            id="visitPurpose"
                            name="visitPurpose"
                            value={formData.visitPurpose}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 transition-all ${
                              errors.visitPurpose && touched.visitPurpose ? 'border-red-500 bg-red-50' : 'border-gray-300'
                            }`}
                          >
                            <option value="">Select purpose</option>
                            {visitPurposeOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.icon} {option.label}
                              </option>
                            ))}
                          </select>
                          {errors.visitPurpose && touched.visitPurpose && (
                            <p className="text-sm text-red-600 flex items-center">
                              <AlertCircle className="h-4 w-4 mr-1" />
                              {errors.visitPurpose}
                            </p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
      
                  {/* Section 2: Overall Portfolio Rating */}
                  <Card className="bg-white/70 backdrop-blur-sm border border-amber-200 shadow-xl animate-slide-up">
                    <CardHeader className="border-b border-amber-100 bg-gradient-to-r from-amber-50 to-orange-50">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center">
                          <Star className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-2xl">Overall Portfolio Rating</CardTitle>
                          <CardDescription>Rate your overall impression (1-5 stars)</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                      <div className="p-6 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                          <Star className="h-5 w-5 mr-2 text-amber-600" />
                          Overall Portfolio Rating <span className="text-red-500 ml-1">*</span>
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">How would you rate my portfolio overall?</p>
                        <div className="flex justify-center">
                          <StarRating
                            category="overallRating"
                            value={formData.overallRating}
                            onChange={(rating) => handleRatingChange('overallRating', rating)}
                            size="lg"
                          />
                        </div>
                        {errors.overallRating && touched.overallRating && (
                          <p className="text-sm text-red-600 flex items-center justify-center mt-4">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            {errors.overallRating}
                          </p>
                        )}
                      </div>
      
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Category Ratings</h3>
                        <div className="grid md:grid-cols-2 gap-6">
                          {ratingCategories.map((category, index) => (
                            <div
                              key={category.id}
                              className="p-4 bg-white rounded-xl border border-amber-200 hover:shadow-lg transition-all"
                              style={{ animationDelay: `${index * 0.1}s` }}
                            >
                              <div className="flex items-center mb-3">
                                <div className={`w-10 h-10 bg-gradient-to-br ${category.color} rounded-lg flex items-center justify-center mr-3`}>
                                  <category.icon className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                  <h4 className="font-semibold text-gray-800">{category.label}</h4>
                                  <p className="text-xs text-gray-500">{category.description}</p>
                                </div>
                              </div>
                              <StarRating
                                category={category.id}
                                value={formData[category.id] as number}
                                onChange={(rating) => handleRatingChange(category.id, rating)}
                                size="sm"
                                showLabel={false}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
      
                  {/* Section 3: Detailed Scores (1-10 Sliders) */}
                  <Card className="bg-white/70 backdrop-blur-sm border border-amber-200 shadow-xl animate-slide-up">
                    <CardHeader className="border-b border-amber-100 bg-gradient-to-r from-purple-50 to-pink-50">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center">
                          <TrendingUp className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-2xl">Detailed Scores</CardTitle>
                          <CardDescription>Rate specific aspects on a scale of 1-10</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6 space-y-8">
                      {scoreCategories.map((category, index) => (
                        <div key={category.id} className="animate-slide-up" style={{ animationDelay: `${index * 0.05}s` }}>
                          <div className="flex items-center mb-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center mr-3">
                              <category.icon className="h-4 w-4 text-white" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-800">{category.label}</h4>
                              <p className="text-xs text-gray-500">{category.description}</p>
                            </div>
                          </div>
                          <SliderScore
                            category={category.id}
                            value={formData[category.id] as number}
                            onChange={(score) => handleScoreChange(category.id, score)}
                            minLabel={category.minLabel}
                            maxLabel={category.maxLabel}
                          />
                        </div>
                      ))}
                    </CardContent>
                  </Card>
      
                  {/* Section 4: Design Assessment (Multiple Choice) */}
                  <Card className="bg-white/70 backdrop-blur-sm border border-amber-200 shadow-xl animate-slide-up">
                    <CardHeader className="border-b border-amber-100 bg-gradient-to-r from-pink-50 to-rose-50">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-rose-500 rounded-lg flex items-center justify-center">
                          <Palette className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-2xl">Design Assessment</CardTitle>
                          <CardDescription>Select all that apply</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Which words best describe the design style?</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {designStyleOptions.map((option) => (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() => handleMultipleSelect('designStyle', option.value)}
                              className={`p-4 rounded-lg border-2 transition-all hover:scale-105 ${
                                formData.designStyle.includes(option.value)
                                  ? 'border-pink-500 bg-pink-100 shadow-lg'
                                  : 'border-gray-200 bg-white hover:border-pink-300'
                              }`}
                            >
                              <div className="text-2xl mb-2">{option.icon}</div>
                              <div className="text-sm font-medium text-gray-700">{option.label}</div>
                            </button>
                          ))}
                        </div>
                      </div>
      
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">What are the most impressive features?</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {impressiveFeaturesOptions.map((option) => (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() => handleMultipleSelect('mostImpressiveFeatures', option.value)}
                              className={`p-4 rounded-lg border-2 transition-all hover:scale-105 text-left ${
                                formData.mostImpressiveFeatures.includes(option.value)
                                  ? 'border-green-500 bg-green-100 shadow-lg'
                                  : 'border-gray-200 bg-white hover:border-green-300'
                              }`}
                            >
                              <div className="flex items-center space-x-2">
                                <span className="text-xl">{option.icon}</span>
                                <span className="text-sm font-medium text-gray-700">{option.label}</span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
      
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">What areas need improvement?</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {improvementAreasOptions.map((option) => (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() => handleMultipleSelect('improvementAreas', option.value)}
                              className={`p-4 rounded-lg border-2 transition-all hover:scale-105 text-left ${
                                formData.improvementAreas.includes(option.value)
                                  ? 'border-orange-500 bg-orange-100 shadow-lg'
                                  : 'border-gray-200 bg-white hover:border-orange-300'
                              }`}
                            >
                              <div className="flex items-center space-x-2">
                                <span className="text-xl">{option.icon}</span>
                                <span className="text-sm font-medium text-gray-700">{option.label}</span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
      
                  {/* Section 5: User Experience & Technical */}
                  <Card className="bg-white/70 backdrop-blur-sm border border-amber-200 shadow-xl animate-slide-up">
                    <CardHeader className="border-b border-amber-100 bg-gradient-to-r from-green-50 to-emerald-50">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
                          <Eye className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-2xl">User Experience & Technical</CardTitle>
                          <CardDescription>Your browsing experience</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label htmlFor="deviceUsed" className="text-sm font-medium text-gray-700">
                            Device Used <span className="text-red-500">*</span>
                          </label>
                          <select
                            id="deviceUsed"
                            name="deviceUsed"
                            value={formData.deviceUsed}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 transition-all ${
                              errors.deviceUsed && touched.deviceUsed ? 'border-red-500 bg-red-50' : 'border-gray-300'
                            }`}
                          >
                            <option value="">Select device</option>
                            {deviceOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.icon} {option.label}
                              </option>
                            ))}
                          </select>
                          {errors.deviceUsed && touched.deviceUsed && (
                            <p className="text-sm text-red-600 flex items-center">
                              <AlertCircle className="h-4 w-4 mr-1" />
                              {errors.deviceUsed}
                            </p>
                          )}
                        </div>
      
                        <div className="space-y-2">
                          <label htmlFor="browserUsed" className="text-sm font-medium text-gray-700">
                            Browser Used
                          </label>
                          <select
                            id="browserUsed"
                            name="browserUsed"
                            value={formData.browserUsed}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 transition-all"
                          >
                            <option value="">Select browser</option>
                            {browserOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.icon} {option.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
      
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Yes/No Questions</h3>
                        <div className="space-y-4">
                          {[
                            { key: 'loadedQuickly', label: 'Did the portfolio load quickly?', icon: Zap },
                            { key: 'navigationEasy', label: 'Was navigation intuitive and easy?', icon: Navigation },
                            { key: 'mobileExperienceGood', label: 'Was the mobile experience good?', icon: Smartphone },
                            { key: 'foundWhatLookingFor', label: 'Did you find what you were looking for?', icon: Target },
                            { key: 'portfolioStandsOut', label: 'Does this portfolio stand out from others?', icon: Award },
                            { key: 'wouldBookmark', label: 'Would you bookmark this portfolio?', icon: Heart },
                            { key: 'wouldShare', label: 'Would you share this with others?', icon: Users },
                            { key: 'wouldContactForJob', label: 'Would you contact for a job/project?', icon: Briefcase },
                          ].map((item) => (
                            <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                              <div className="flex items-center space-x-3">
                                <item.icon className="h-5 w-5 text-gray-600" />
                                <span className="text-sm font-medium text-gray-700">{item.label}</span>
                              </div>
                              <div className="flex space-x-2">
                                <button
                                  type="button"
                                  onClick={() => setFormData((prev) => ({ ...prev, [item.key]: true }))}
                                  className={`px-6 py-2 rounded-lg font-medium transition-all ${
                                    formData[item.key as keyof FeedbackFormData] === true
                                      ? 'bg-green-500 text-white shadow-lg'
                                      : 'bg-white text-gray-600 border border-gray-300 hover:bg-green-50'
                                  }`}
                                >
                                  Yes
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setFormData((prev) => ({ ...prev, [item.key]: false }))}
                                  className={`px-6 py-2 rounded-lg font-medium transition-all ${
                                    formData[item.key as keyof FeedbackFormData] === false
                                      ? 'bg-red-500 text-white shadow-lg'
                                      : 'bg-white text-gray-600 border border-gray-300 hover:bg-red-50'
                                  }`}
                                >
                                  No
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
      
                  {/* Section 6: Competitive Analysis */}
                  <Card className="bg-white/70 backdrop-blur-sm border border-amber-200 shadow-xl animate-slide-up">
                    <CardHeader className="border-b border-amber-100 bg-gradient-to-r from-indigo-50 to-purple-50">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-lg flex items-center justify-center">
                          <Target className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-2xl">Competitive Analysis</CardTitle>
                          <CardDescription>How does this portfolio compare?</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                          Compared to other portfolios you've seen, this one is:
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                          {comparisonOptions.map((option) => (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() => setFormData((prev) => ({ ...prev, comparisonToOthers: option.value }))}
                              className={`p-4 rounded-lg border-2 transition-all hover:scale-105 ${
                                formData.comparisonToOthers === option.value
                                  ? 'border-indigo-500 bg-indigo-100 shadow-lg'
                                  : 'border-gray-200 bg-white hover:border-indigo-300'
                              }`}
                            >
                              <div className="text-2xl mb-2">{option.icon}</div>
                              <div className="text-xs font-medium text-gray-700">{option.label}</div>
                            </button>
                          ))}
                        </div>
                      </div>
      
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                          What professional level does this portfolio represent?
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                          {professionalLevelOptions.map((option) => (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() => setFormData((prev) => ({ ...prev, professionalLevel: option.value }))}
                              className={`p-4 rounded-lg border-2 transition-all hover:scale-105 ${
                                formData.professionalLevel === option.value
                                  ? 'border-purple-500 bg-purple-100 shadow-lg'
                                  : 'border-gray-200 bg-white hover:border-purple-300'
                              }`}
                            >
                              <div className="text-2xl mb-2">{option.icon}</div>
                              <div className="text-xs font-medium text-gray-700">{option.label}</div>
                            </button>
                          ))}
                        </div>
                      </div>
      
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">
                          If you were hiring, would you consider this candidate?
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {hiringLikelihoodOptions.map((option) => (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() => setFormData((prev) => ({ ...prev, likelyToHire: option.value }))}
                              className={`p-4 rounded-lg border-2 transition-all hover:scale-105 ${
                                formData.likelyToHire === option.value
                                  ? 'border-green-500 bg-green-100 shadow-lg'
                                  : 'border-gray-200 bg-white hover:border-green-300'
                              }`}
                            >
                              <div className="text-2xl mb-2">{option.icon}</div>
                              <div className="text-xs font-medium text-gray-700">{option.label}</div>
                            </button>
                          ))}
                        </div>
                      </div>
      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label htmlFor="mostImportantAspect" className="text-sm font-medium text-gray-700">
                            Most Important Aspect
                          </label>
                          <select
                            id="mostImportantAspect"
                            name="mostImportantAspect"
                            value={formData.mostImportantAspect}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 transition-all"
                          >
                            <option value="">Select most important</option>
                            {priorityAspectsOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.icon} {option.label}
                              </option>
                            ))}
                          </select>
                        </div>
      
                        <div className="space-y-2">
                          <label htmlFor="leastImportantAspect" className="text-sm font-medium text-gray-700">
                            Least Important Aspect
                          </label>
                          <select
                            id="leastImportantAspect"
                            name="leastImportantAspect"
                            value={formData.leastImportantAspect}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 transition-all"
                          >
                            <option value="">Select least important</option>
                            {priorityAspectsOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.icon} {option.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
      
                  {/* Section 7: NPS Recommendation Score */}
                  <Card className="bg-white/70 backdrop-blur-sm border border-amber-200 shadow-xl animate-slide-up">
                    <CardHeader className="border-b border-amber-100 bg-gradient-to-r from-cyan-50 to-blue-50">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                          <ThumbsUp className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-2xl">Net Promoter Score</CardTitle>
                          <CardDescription>Would you recommend this portfolio?</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      <NPSScore />
                    </CardContent>
                  </Card>
      
                  {/* Section 8: Written Feedback */}
                  <Card className="bg-white/70 backdrop-blur-sm border border-amber-200 shadow-xl animate-slide-up">
                    <CardHeader className="border-b border-amber-100 bg-gradient-to-r from-orange-50 to-red-50">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
                          <MessageSquare className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-2xl">Written Feedback</CardTitle>
                          <CardDescription>Share your detailed thoughts</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                      <div className="space-y-2">
                        <label htmlFor="firstImpression" className="text-sm font-medium text-gray-700">
                          First Impression <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          id="firstImpression"
                          name="firstImpression"
                          value={formData.firstImpression}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          rows={3}
                          placeholder="What was your first impression when you landed on the portfolio?"
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 transition-all resize-none ${
                            errors.firstImpression && touched.firstImpression ? 'border-red-500 bg-red-50' : 'border-gray-300'
                          }`}
                        />
                        {errors.firstImpression && touched.firstImpression ? (
                          <p className="text-sm text-red-600 flex items-center">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            {errors.firstImpression}
                          </p>
                        ) : (
                          <span className="text-sm text-gray-500">{formData.firstImpression.length} characters</span>
                        )}
                      </div>
      
                      <div className="space-y-2">
                        <label htmlFor="strengths" className="text-sm font-medium text-gray-700">
                          What did you like most? <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          id="strengths"
                          name="strengths"
                          value={formData.strengths}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          rows={4}
                          placeholder="Share what impressed you or stood out positively..."
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 transition-all resize-none ${
                            errors.strengths && touched.strengths ? 'border-red-500 bg-red-50' : 'border-gray-300'
                          }`}
                        />
                        {errors.strengths && touched.strengths ? (
                          <p className="text-sm text-red-600 flex items-center">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            {errors.strengths}
                          </p>
                        ) : (
                          <span className="text-sm text-gray-500">{formData.strengths.length} characters</span>
                        )}
                      </div>
      
                      <div className="space-y-2">
                        <label htmlFor="improvements" className="text-sm font-medium text-gray-700">
                          What could be improved? <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          id="improvements"
                          name="improvements"
                          value={formData.improvements}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          rows={4}
                          placeholder="Share constructive suggestions for improvement..."
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-amber-500 transition-all resize-none ${
                            errors.improvements && touched.improvements ? 'border-red-500 bg-red-50' : 'border-gray-300'
                          }`}
                        />
                        {errors.improvements && touched.improvements ? (
                          <p className="text-sm text-red-600 flex items-center">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            {errors.improvements}
                          </p>
                        ) : (
                          <span className="text-sm text-gray-500">{formData.improvements.length} characters</span>
                        )}
                      </div>
      
                      <div className="space-y-2">
                        <label htmlFor="standoutElement" className="text-sm font-medium text-gray-700">
                          What element stood out the most?
                        </label>
                        <textarea
                          id="standoutElement"
                          name="standoutElement"
                          value={formData.standoutElement}
                          onChange={handleChange}
                          rows={2}
                          placeholder="What caught your attention immediately?"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 transition-all resize-none"
                        />
                      </div>
      
                      <div className="space-y-2">
                        <label htmlFor="confusingElement" className="text-sm font-medium text-gray-700">
                          What was confusing or unclear?
                        </label>
                        <textarea
                          id="confusingElement"
                          name="confusingElement"
                          value={formData.confusingElement}
                          onChange={handleChange}
                          rows={2}
                          placeholder="Anything that was hard to understand or navigate?"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 transition-all resize-none"
                        />
                      </div>
      
                      <div className="space-y-2">
                        <label htmlFor="missingFeature" className="text-sm font-medium text-gray-700">
                          What's missing?
                        </label>
                        <textarea
                          id="missingFeature"
                          name="missingFeature"
                          value={formData.missingFeature}
                          onChange={handleChange}
                          rows={2}
                          placeholder="What features or sections would you like to see added?"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 transition-all resize-none"
                        />
                      </div>
      
                      <div className="space-y-2">
                        <label htmlFor="adviceForImprovement" className="text-sm font-medium text-gray-700">
                          Your Advice for Improvement
                        </label>
                        <textarea
                          id="adviceForImprovement"
                          name="adviceForImprovement"
                          value={formData.adviceForImprovement}
                          onChange={handleChange}
                          rows={3}
                          placeholder="If you were to give one key piece of advice, what would it be?"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 transition-all resize-none"
                        />
                      </div>
      
                      <div className="space-y-2">
                        <label htmlFor="additionalComments" className="text-sm font-medium text-gray-700">
                          Additional Comments
                        </label>
                        <textarea
                          id="additionalComments"
                          name="additionalComments"
                          value={formData.additionalComments}
                          onChange={handleChange}
                          rows={4}
                          placeholder="Any other thoughts, suggestions, or feedback you'd like to share..."
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 transition-all resize-none"
                        />
                      </div>
                    </CardContent>
                  </Card>
      
                  {/* Submit Section */}
                  <Card className="bg-gradient-to-r from-amber-100 to-orange-100 border-0 shadow-xl animate-slide-up">
                    <CardContent className="p-8 text-center">
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">Ready to Submit?</h3>
                      <p className="text-gray-600 mb-6">
                        Thank you for taking the time to provide comprehensive feedback. Your insights are invaluable!
                      </p>
                      
                      <div className="mb-6">
                        <div className="flex justify-center items-center space-x-2 text-sm text-gray-600 mb-2">
                          <CheckCircle className="h-5 w-5 text-green-600" />
                          <span>Form is {calculateCompletion()}% complete</span>
                        </div>
                        <div className="max-w-md mx-auto w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${calculateCompletion()}%` }}
                          />
                        </div>
                      </div>
      
                      <Button
                        type="submit"
                        size="lg"
                        disabled={formStatus.type === 'loading'}
                        className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group disabled:opacity-50 px-12 py-6 text-lg"
                      >
                        {formStatus.type === 'loading' ? (
                          <>
                            <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                            Submitting...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                            Submit Comprehensive Feedback
                          </>
                        )}
                      </Button>
                      
                      <p className="text-xs text-gray-500 mt-6">
                        Your feedback will be kept confidential and used solely for portfolio improvement purposes. 🙏
                      </p>
                    </CardContent>
                  </Card>
                </form>

                {/* Thank You Note */}
                          <Card className="mt-8 bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 animate-slide-up">
                            <CardContent className="p-6">
                              <div className="flex items-start space-x-4">
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0">
                                  <Heart className="h-8 w-8 text-white" />
                                </div>
                                <div>
                                  <h3 className="text-xl font-bold text-gray-800 mb-2">Why Your Detailed Feedback Matters</h3>
                                  <p className="text-sm text-gray-600 leading-relaxed">
                                    Your comprehensive feedback across multiple dimensions helps me understand not just what works and what doesn't, 
                                    but also why. This deep insight enables me to make data-driven decisions to improve the portfolio, 
                                    enhance user experience, and better showcase my skills. Every rating, comment, and suggestion contributes 
                                    to making this portfolio world-class. Thank you for investing your time and expertise! ❤️
                                  </p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </section>
              
      
      
      <Footer />
    </div>
  );
};

export default PortfolioFeedback;