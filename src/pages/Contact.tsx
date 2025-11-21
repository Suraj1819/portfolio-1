import React, { useState, useEffect } from 'react';
import axios, { AxiosError } from 'axios'; // Import Axios types
import Footer from '../components/Footer';
import type { AxiosResponse, AxiosInstance } from 'axios'; // Import AxiosResponse type
import {
  Mail, PhoneCall, MapPinHouse, Github, Linkedin, X, Code2, Instagram, Facebook,ArrowRight, MessageCircle, ExternalLink, AlertCircle, CheckCircle,Star,Share2,Zap,Shield,Clock,Send
} from 'lucide-react';
import ThankYou from './Thankyou'; // Assuming ThankYou is a React component
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../components/ui/tooltip';

// 1. Define types for state management
interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface AlertMessage {
  type: 'error' | 'success' | '';
  message: string;
}

// 2. Define types for API responses
interface ContactSuccessData {
  id: string;
  category: string;
  priority: string;
  status: string;
}

interface ContactSuccessResponse {
  success: boolean;
  message: string;
  data?: ContactSuccessData;
}

interface ContactValidationError {
  [key: string]: string; // e.g., { "name": "Name is required" }
}

interface ContactErrorResponse {
  message: string;
  data?: ContactValidationError[]; // For 422 Unprocessable Entity
}


// Axios configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1"; // Fallback to localhost if env variable is not set

const axiosInstance: AxiosInstance = axios.create({ // Explicitly type axiosInstance
  baseURL: API_BASE_URL,
  timeout: 15000, // 15 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    console.log('Making request to:', config.url);
    return config;
  },
  (error: AxiosError) => { // Type the error as AxiosError
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse<ContactSuccessResponse>) => { // Type the successful response data
    console.log('Response received:', response.data);
    return response;
  },
  (error: AxiosError<ContactErrorResponse>) => { // Type the error response data using ContactErrorResponse
    console.error('Response error:', error);

    // Handle network errors
    if (!error.response) {
      console.error('Network error or server is down');
    }

    return Promise.reject(error);
  }
);

const Contact: React.FC = () => { // Use React.FC for functional components
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const [showThankYou, setShowThankYou] = useState<boolean>(false);
  const [isSending, setIsSending] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<AlertMessage>({ type: '', message: '' }); // Use AlertMessage type
  const [formData, setFormData] = useState<FormData>({ // Use FormData type
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<FormErrors>({ // Use FormErrors type
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    // Reset thank you page after 5 seconds
    if (showThankYou) {
      const thankYouTimer = setTimeout(() => {
        setShowThankYou(false);
        setFormData({ name: '', email: '', subject: '', message: '' });
        setErrors({ name: '', email: '', subject: '', message: '' });
        setAlertMessage({ type: '', message: '' });
      }, 5000);
      return () => clearTimeout(thankYouTimer); // Cleanup for thankYouTimer
    }

    return () => clearTimeout(timer); // Cleanup for the initial timer
  }, [showThankYou]);

  useEffect(() => {
    if (!isLoading) {
      setProgress(100);
      return;
    }
    // Smoothly increment to 95% while loading
    const interval = setInterval(() => {
      setProgress(prev => Math.min(prev + 2, 95));
    }, 30);

    return () => clearInterval(interval);
  }, [isLoading]);

  // Clear alert after 5 seconds
  useEffect(() => {
    if (alertMessage.message) {
      const timer = setTimeout(() => {
        setAlertMessage({ type: '', message: '' });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [alertMessage.message]);

  const validateForm = (): boolean => { // Explicitly type return value
    const newErrors: FormErrors = { name: '', email: '', subject: '', message: '' }; // Type newErrors
    let isValid: boolean = true; // Type isValid

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters long';
      isValid = false;
    } else if (formData.name.trim().length > 50) {
      newErrors.name = 'Name cannot exceed 50 characters';
      isValid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name.trim())) {
      newErrors.name = 'Name should only contain letters and spaces';
      isValid = false;
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    } else if (formData.email.trim().length > 100) {
      newErrors.email = 'Email cannot exceed 100 characters';
      isValid = false;
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
      isValid = false;
    } else if (formData.subject.trim().length < 5) {
      newErrors.subject = 'Subject must be at least 5 characters long';
      isValid = false;
    } else if (formData.subject.trim().length > 100) {
      newErrors.subject = 'Subject cannot exceed 100 characters';
      isValid = false;
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      isValid = false;
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
      isValid = false;
    } else if (formData.message.trim().length > 1000) {
      newErrors.message = 'Message cannot exceed 1000 characters';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => { // Type the event object
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear specific field error when user starts typing
    // Use type assertion `as keyof FormErrors` to safely index `errors`
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name as keyof FormErrors]: '' }));
    }

    // Clear alert message when user starts typing
    if (alertMessage.message) {
      setAlertMessage({ type: '', message: '' });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => { // Type the event and return value
    e.preventDefault();

    // Client-side validation
    if (!validateForm()) {
      setAlertMessage({
        type: 'error',
        message: 'Please fix the errors above and try again.'
      });
      return;
    }

    setIsSending(true);
    setAlertMessage({ type: '', message: '' });

    try {
      // Prepare data for submission
      const submitData: FormData = { // Type submitData
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        subject: formData.subject.trim(),
        message: formData.message.trim()
      };

      console.log('Submitting contact form:', submitData);

      // Send to backend
      const response: AxiosResponse<ContactSuccessResponse> = await axiosInstance.post('/contact/send', submitData); // Type response

      console.log('Contact form response:', response.data);

      // Check if response is successful
      if (response.data && response.data.success) {
        // Success - show thank you page
        setShowThankYou(true);

        // Log success for analytics
        console.log('Contact form submitted successfully:', {
          messageId: response.data.data?.id,
          category: response.data.data?.category,
          priority: response.data.data?.priority,
          status: response.data.data?.status
        });

        // Show success message temporarily
        setAlertMessage({
          type: 'success',
          message: response.data.message || 'Message sent successfully! Thank you for reaching out.'
        });

      } else {
        // Handle unexpected response format
        setAlertMessage({
          type: 'error',
          message: response.data?.message || 'Something went wrong. Please try again.'
        });
      }

    } catch (error: unknown) { // Use 'unknown' for better type safety, then narrow it
      console.error('Contact form submission error:', error);

      // Handle different types of errors using type guards
      if (axios.isAxiosError(error)) { // Narrow 'error' to AxiosError
        const axiosError = error as AxiosError<ContactErrorResponse>; // Cast to specific AxiosError type

        if (axiosError.response) {
          // Server responded with error status
          const { status, data } = axiosError.response;
          console.log('Error status:', status);
          console.log('Error data:', data);

          if (status === 422 && data && Array.isArray(data.data)) {
            // Validation errors from server
            const serverErrors: FormErrors = { name: '', email: '', subject: '', message: '' }; // Type serverErrors

            data.data.forEach((errorObj: ContactValidationError) => { // Type errorObj
              const fieldName = Object.keys(errorObj)[0];
              const errorMessage = errorObj[fieldName];
              if (Object.prototype.hasOwnProperty.call(serverErrors, fieldName)) { // Safer check
                serverErrors[fieldName as keyof FormErrors] = errorMessage; // Type assertion for index signature
              }
            });

            setErrors(serverErrors);
            setAlertMessage({
              type: 'error',
              message: 'Please fix the validation errors and try again.'
            });

          } else if (status === 429) {
            // Rate limiting
            setAlertMessage({
              type: 'error',
              message: 'Too many messages sent. Please wait before sending another message.'
            });

          } else if (status === 400) {
            // Bad request
            setAlertMessage({
              type: 'error',
              message: data?.message || 'Invalid request. Please check your input and try again.'
            });

          } else if (status === 500) {
            // Server error
            setAlertMessage({
              type: 'error',
              message: 'Server error. Please try again later or contact support.'
            });

          } else {
            // Other server errors
            setAlertMessage({
              type: 'error',
              message: data?.message || `Server error (${status}). Please try again later.`
            });
          }

        } else if (axiosError.request) {
          // Network error - no response received
          console.error('Network error:', axiosError.request);
          setAlertMessage({
            type: 'error',
            message: 'Network error. Please check your internet connection and try again.'
          });

        } else if (axiosError.code === 'ECONNABORTED') {
          // Timeout error
          setAlertMessage({
            type: 'error',
            message: 'Request timeout. Please try again.'
          });
        }
      } else {
        // Other errors (e.g., non-Axios errors or unexpected structure)
        console.error('Unknown error:', error);
        setAlertMessage({
          type: 'error',
          message: 'An unexpected error occurred. Please try again.'
        });
      }

    } finally {
      setIsSending(false);
    }
  };

  if (isLoading) {
    return (
      <div
        className="min-h-screen bg-gradient-to-br from-cream-50 via-cream-100 to-amber-50 flex items-center justify-center px-6"
        aria-busy="true"
        aria-live="polite"
      >
        <div className="w-full max-w-sm rounded-2xl border border-amber-200/60 bg-white/60 backdrop-blur-xl shadow-lg p-8">
          <div className="flex flex-col items-center">
            {/* Professional icon + ring spinner */}
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-full border-2 border-amber-200" />
              <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-amber-500 animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <MessageCircle className="w-7 h-7 text-amber-600" />
              </div>
            </div>

            {/* Title and helper text */}
            <p className="mt-6 text-lg font-semibold text-gray-800">Preparing contact</p>
            <p className="mt-1 text-sm text-gray-600">Setting things up…</p>

            {/* Progress bar */}
            <div
              className="mt-6 w-full h-3 rounded-full bg-amber-100/80 relative overflow-hidden"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progress}
              aria-label="Loading progress"
            >
              <div
                className="h-full rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
              <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-amber-800">
                {progress}%
              </span>
            </div>

            {/* Activity dots */}
            <div className="mt-4 flex items-center gap-1" aria-hidden="true">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-bounce [animation-delay:150ms]" />
              <span className="w-2 h-2 rounded-full bg-yellow-500 animate-bounce [animation-delay:300ms]" />
            </div>

            <span className="sr-only">Loading contact page…</span>
          </div>
        </div>
      </div>
    );
  }

  if (showThankYou) {
    try {
      // Assuming ThankYou component needs no props or has defined props
      return <ThankYou />;
    } catch (error: unknown) { // Type the error as unknown
      console.error('Error rendering ThankYou component:', error);
      return (
        <div className="min-h-screen bg-gradient-to-br from-cream-50 via-cream-100 to-amber-50 flex items-center justify-center">
          <Card className="bg-white/70 backdrop-blur-sm border border-amber-200 p-8">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-800">Something Went Wrong</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">An error occurred while displaying the thank you message. Please try again.</p>
              <Button
                onClick={() => setShowThankYou(false)}
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white"
              >
                Back to Contact Form
              </Button>
            </CardContent>
          </Card>
        </div>
      );
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-cream-100 to-amber-50 text-foreground">
      {/* Hero Section - Enhanced */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden min-h-[60vh] flex items-center">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-amber-300/20 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-orange-300/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-yellow-300/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
          {/* Additional decorative elements */}
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-amber-400 rounded-full animate-ping"></div>
          <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-orange-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="container mx-auto text-center relative z-10 max-w-5xl">
          <div className="animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2.5 mb-6 rounded-full bg-gradient-to-r from-amber-100 to-orange-100 border border-amber-200 shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-semibold text-gray-700">Available for new opportunities</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-amber-600 via-orange-600 to-red-500 bg-clip-text text-transparent leading-tight px-4">
              Let's Create Something
              <br />
              <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">Extraordinary Together</span>
            </h1>
            
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-10 font-light px-4">
              Whether you need a <span className="font-semibold text-amber-700">full-stack developer</span>, 
              <span className="font-semibold text-orange-700"> technical mentor</span>, or 
              <span className="font-semibold text-red-600"> project consultant</span> — 
              I'm here to help transform your ideas into reality.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 px-4">
              <a href="#contact-form" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 px-8 py-6 text-base sm:text-lg font-semibold"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Start a Conversation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
              
              <a href="mailto:surajkumarraj8888@gmail.com" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-2 border-amber-300 text-gray-700 hover:bg-amber-50 backdrop-blur-sm bg-white/50 hover:border-amber-400 transition-all duration-300 hover:scale-105 px-8 py-6 text-base sm:text-lg font-semibold"
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Quick Email
                </Button>
              </a>
            </div>
            
            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-6 sm:gap-8 pt-8 border-t border-amber-200/50 px-4">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-amber-600 mb-1">24-48h</div>
                <div className="text-xs sm:text-sm text-gray-600">Response Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-orange-600 mb-1">100+</div>
                <div className="text-xs sm:text-sm text-gray-600">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-red-600 mb-1">50+</div>
                <div className="text-xs sm:text-sm text-gray-600">Happy Clients</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-gentle hidden sm:flex">
          <div className="w-6 h-10 border-2 border-amber-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-amber-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Why Choose Me Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 bg-gradient-to-r from-amber-50 to-orange-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">Why Work With Me?</h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              I bring expertise, dedication, and a commitment to excellence in every project
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <Card className="bg-white/80 backdrop-blur-sm border border-amber-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 text-center p-4 sm:p-6">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <Code2 className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">Clean Code</h3>
              <p className="text-sm sm:text-base text-gray-600">Well-structured, maintainable, and scalable solutions</p>
            </Card>
            
            <Card className="bg-white/80 backdrop-blur-sm border border-amber-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 text-center p-4 sm:p-6">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-orange-400 to-red-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">On-Time Delivery</h3>
              <p className="text-sm sm:text-base text-gray-600">Meeting deadlines without compromising quality</p>
            </Card>
            
            <Card className="bg-white/80 backdrop-blur-sm border border-amber-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 text-center p-4 sm:p-6">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-red-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">Clear Communication</h3>
              <p className="text-sm sm:text-base text-gray-600">Regular updates and transparent collaboration</p>
            </Card>
            
            <Card className="bg-white/80 backdrop-blur-sm border border-amber-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 text-center p-4 sm:p-6">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-yellow-400 to-amber-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2">Quality Focus</h3>
              <p className="text-sm sm:text-base text-gray-600">Attention to detail in every aspect of development</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section - Enhanced */}
      <section id="contact-form" className="py-16 sm:py-24 px-4 sm:px-6 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-4 px-4">Get In Touch</h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
              Fill out the form below or use any of the contact methods. I'll respond within 24-48 hours.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-10">
            
            {/* Contact Form Card */}
            <div className="lg:col-span-3">
              <Card className="bg-white/90 backdrop-blur-sm border-2 border-amber-200 hover:shadow-2xl transition-all duration-300 h-full">
                <CardHeader className="pb-4 sm:pb-6 px-4 sm:px-6">
                  <CardTitle className="text-2xl sm:text-3xl font-bold text-gray-800 flex items-center flex-wrap gap-2">
                    <MessageCircle className="h-6 w-6 sm:h-8 sm:w-8 text-amber-600 flex-shrink-0" />
                    <span>Send a Message</span>
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base text-gray-600 mt-2">
                    Share your project details, technical questions, or mentorship needs. I'll provide a personalized response to help you move forward.
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-4 sm:px-6">
                  {/* Alert Message */}
                  {alertMessage.message && (
                    <div className={`mb-6 p-3 sm:p-4 rounded-lg border-l-4 flex items-start ${
                      alertMessage.type === 'error'
                        ? 'border-red-500 bg-red-50 text-red-800'
                        : 'border-green-500 bg-green-50 text-green-800'
                    }`}>
                      {alertMessage.type === 'error' ? (
                        <AlertCircle className="h-5 w-5 mr-2 sm:mr-3 flex-shrink-0 mt-0.5" />
                      ) : (
                        <CheckCircle className="h-5 w-5 mr-2 sm:mr-3 flex-shrink-0 mt-0.5" />
                      )}
                      <span className="text-xs sm:text-sm font-medium">{alertMessage.message}</span>
                    </div>
                  )}

                  <form className="space-y-5 sm:space-y-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      {/* Full Name */}
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-sm sm:text-base text-gray-700 font-semibold flex items-center">
                          Full Name <span className="text-red-500 ml-1">*</span>
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          disabled={isSending}
                          className={`border-2 border-amber-200 focus:ring-2 focus:ring-amber-500 bg-white/70 transition-all duration-200 text-sm sm:text-base ${
                            errors.name ? 'border-red-300 focus:ring-red-500' : ''
                          }`}
                          aria-invalid={!!errors.name}
                          aria-describedby="name-error"
                          maxLength={50}
                        />
                        {errors.name && (
                          <p id="name-error" className="text-red-500 text-xs sm:text-sm flex items-center mt-1">
                            <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                            {errors.name}
                          </p>
                        )}
                      </div>

                      {/* Email */}
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm sm:text-base text-gray-700 font-semibold flex items-center">
                          Email Address <span className="text-red-500 ml-1">*</span>
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          disabled={isSending}
                          className={`border-2 border-amber-200 focus:ring-2 focus:ring-amber-500 bg-white/70 transition-all duration-200 text-sm sm:text-base ${
                            errors.email ? 'border-red-300 focus:ring-red-500' : ''
                          }`}
                          aria-invalid={!!errors.email}
                          aria-describedby="email-error"
                          maxLength={100}
                        />
                        {errors.email && (
                          <p id="email-error" className="text-red-500 text-xs sm:text-sm flex items-center mt-1">
                            <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Subject */}
                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-sm sm:text-base text-gray-700 font-semibold flex items-center">
                        Subject <span className="text-red-500 ml-1">*</span>
                      </Label>
                      <Input
                        id="subject"
                        name="subject"
                        type="text"
                        placeholder="Project Collaboration, Tutoring Inquiry, or Technical Consultation"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        disabled={isSending}
                        className={`border-2 border-amber-200 focus:ring-2 focus:ring-amber-500 bg-white/70 transition-all duration-200 text-sm sm:text-base ${
                          errors.subject ? 'border-red-300 focus:ring-red-500' : ''
                        }`}
                        aria-invalid={!!errors.subject}
                        aria-describedby="subject-error"
                        maxLength={100}
                      />
                      {errors.subject && (
                        <p id="subject-error" className="text-red-500 text-xs sm:text-sm flex items-center mt-1">
                          <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                          {errors.subject}
                        </p>
                      )}
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-sm sm:text-base text-gray-700 font-semibold flex items-center">
                        Your Message <span className="text-red-500 ml-1">*</span>
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        rows={6}
                        placeholder="Tell me about your project requirements, timeline, budget, and any specific technologies you'd like to use..."
                        value={formData.message}
                        onChange={handleChange}
                        required
                        disabled={isSending}
                        className={`border-2 border-amber-200 focus:ring-2 focus:ring-amber-500 bg-white/70 resize-none transition-all duration-200 text-sm sm:text-base ${
                          errors.message ? 'border-red-300 focus:ring-red-500' : ''
                        }`}
                        aria-invalid={!!errors.message}
                        aria-describedby="message-error"
                        maxLength={1000}
                      />
                      <div className="flex justify-between items-center">
                        {errors.message && (
                          <p id="message-error" className="text-red-500 text-xs sm:text-sm flex items-center">
                            <AlertCircle className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                            {errors.message}
                          </p>
                        )}
                        <p className="text-xs sm:text-sm text-gray-500 ml-auto">
                          {formData.message.length}/1000 characters
                        </p>
                      </div>
                    </div>

                    {/* Privacy Notice */}
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 sm:p-4">
                      <div className="flex items-start">
                        <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-amber-600 mr-2 flex-shrink-0 mt-0.5" />
                        <p className="text-xs sm:text-sm text-gray-700">
                          <span className="font-semibold">Your privacy matters.</span> All information is kept confidential and used solely for responding to your inquiry.
                        </p>
                      </div>
                    </div>

                    {/* Enhanced Send Button */}
                    <Button
                      type="submit"
                      disabled={isSending}
                      className="w-full relative overflow-hidden group bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:from-amber-600 hover:via-orange-600 hover:to-red-600 text-white text-base sm:text-lg font-bold shadow-2xl hover:shadow-amber-500/50 transition-all duration-500 disabled:opacity-70 disabled:cursor-not-allowed py-5 sm:py-6 rounded-xl border-2 border-white/20"
                    >
                      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/30 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                      {isSending ? (
                        <span className="relative flex items-center justify-center">
                          <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                          <span className="font-semibold tracking-wide">Sending Your Message...</span>
                        </span>
                      ) : (
                        <span className="relative flex items-center justify-center">
                          <Send className="mr-3 h-5 w-5 group-hover:rotate-45 transition-transform duration-300" />
                          <span className="font-semibold tracking-wide">Send Message</span>
                          <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                        </span>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information Column */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              
              {/* Quick Contact Info */}
              <Card className="bg-gradient-to-br from-amber-500 to-orange-500 text-white border-none hover:shadow-xl transition-all duration-300">
                <CardHeader className="pb-3 sm:pb-4 px-4 sm:px-6">
                  <CardTitle className="text-xl sm:text-2xl font-bold flex items-center">
                    <Zap className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3" />
                    Quick Contact
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4 px-4 sm:px-6">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 flex-shrink-0" />
                    <a href="mailto:surajkumarraj8888@gmail.com" className="hover:underline break-all text-sm sm:text-base">
                      surajkumarraj8888@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center">
                    <PhoneCall className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 flex-shrink-0" />
                    <a href="tel:+919507272341" className="hover:underline text-sm sm:text-base">
                      +91 9507272341
                    </a>
                  </div>
                  <div className="flex items-center">
                    <MapPinHouse className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 flex-shrink-0" />
                    <span className="text-sm sm:text-base">Marwan, Muzaffarpur, Bihar</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 flex-shrink-0" />
                    <span className="text-sm sm:text-base">9 AM - 6 PM IST (Mon-Sat)</span>
                  </div>
                </CardContent>
              </Card>

              {/* Social Connect - Enhanced with official colors */}
              <Card className="bg-white/90 backdrop-blur-sm border-2 border-amber-200 hover:shadow-xl transition-all duration-300">
                <CardHeader className="pb-3 sm:pb-4 px-4 sm:px-6">
                  <CardTitle className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center">
                    <Share2 className="h-5 w-5 sm:h-6 sm:w-6 text-amber-600 mr-2 sm:mr-3" />
                    Connect on Social
                  </CardTitle>
                  <CardDescription className="text-gray-600 text-sm sm:text-base">
                    Follow for updates, coding tips, and tech insights
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-4 sm:px-6">
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-3">
                    {/* GitHub */}
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <a href="https://github.com/Suraj1819" target="_blank" rel="noopener noreferrer" className="group">
                            <div className="p-2.5 sm:p-3 rounded-xl bg-gray-100 hover:bg-[#181717] transition-all duration-300 hover:scale-110 hover:shadow-lg flex items-center justify-center">
                              <Github className="h-6 w-6 sm:h-7 sm:w-7 text-[#181717] group-hover:text-white transition-colors" />
                            </div>
                          </a>
                        </TooltipTrigger>
                        <TooltipContent>GitHub</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    
                    {/* LinkedIn */}
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <a href="https://www.linkedin.com/in/suraj-kumar-72847b30a/" target="_blank" rel="noopener noreferrer" className="group">
                            <div className="p-2.5 sm:p-3 rounded-xl bg-blue-50 hover:bg-[#0A66C2] transition-all duration-300 hover:scale-110 hover:shadow-lg flex items-center justify-center">
                              <Linkedin className="h-6 w-6 sm:h-7 sm:w-7 text-[#0A66C2] group-hover:text-white transition-colors" />
                            </div>
                          </a>
                        </TooltipTrigger>
                        <TooltipContent>LinkedIn</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    
                    {/* X (Twitter) */}
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <a href="https://x.com/SuraJzRt" target="_blank" rel="noopener noreferrer" className="group">
                            <div className="p-2.5 sm:p-3 rounded-xl bg-gray-100 hover:bg-black transition-all duration-300 hover:scale-110 hover:shadow-lg flex items-center justify-center">
                              <X className="h-6 w-6 sm:h-7 sm:w-7 text-black group-hover:text-white transition-colors" />
                            </div>
                          </a>
                        </TooltipTrigger>
                        <TooltipContent>X (Twitter)</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    
                    {/* WhatsApp - NEW */}
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <a href="https://wa.me/919507272341" target="_blank" rel="noopener noreferrer" className="group">
                            <div className="p-2.5 sm:p-3 rounded-xl bg-green-50 hover:bg-[#25D366] transition-all duration-300 hover:scale-110 hover:shadow-lg flex items-center justify-center">
                              <svg className="h-6 w-6 sm:h-7 sm:w-7 text-[#25D366] group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                              </svg>
                            </div>
                          </a>
                        </TooltipTrigger>
                        <TooltipContent>WhatsApp</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    
                    {/* LeetCode */}
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <a href="https://leetcode.com/u/Suraj_1819/" target="_blank" rel="noopener noreferrer" className="group">
                            <div className="p-2.5 sm:p-3 rounded-xl bg-orange-50 hover:bg-[#FFA116] transition-all duration-300 hover:scale-110 hover:shadow-lg flex items-center justify-center">
                              <Code2 className="h-6 w-6 sm:h-7 sm:w-7 text-[#FFA116] group-hover:text-white transition-colors" />
                            </div>
                          </a>
                        </TooltipTrigger>
                        <TooltipContent>LeetCode</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    
                    {/* Instagram */}
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <a href="https://www.instagram.com/risu2948/" target="_blank" rel="noopener noreferrer" className="group">
                            <div className="p-2.5 sm:p-3 rounded-xl bg-pink-50 hover:bg-gradient-to-br hover:from-[#833AB4] hover:via-[#FD1D1D] hover:to-[#F77737] transition-all duration-300 hover:scale-110 hover:shadow-lg flex items-center justify-center">
                              <Instagram className="h-6 w-6 sm:h-7 sm:w-7 text-[#E4405F] group-hover:text-white transition-colors" />
                            </div>
                          </a>
                        </TooltipTrigger>
                        <TooltipContent>Instagram</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    
                    {/* Facebook */}
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="group">
                            <div className="p-2.5 sm:p-3 rounded-xl bg-blue-50 hover:bg-[#1877F2] transition-all duration-300 hover:scale-110 hover:shadow-lg flex items-center justify-center">
                              <Facebook className="h-6 w-6 sm:h-7 sm:w-7 text-[#1877F2] group-hover:text-white transition-colors" />
                            </div>
                          </a>
                        </TooltipTrigger>
                        <TooltipContent>Facebook</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    
                    {/* Discord */}
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <a href="https://discord.com/" target="_blank" rel="noopener noreferrer" className="group">
                            <div className="p-2.5 sm:p-3 rounded-xl bg-indigo-50 hover:bg-[#5865F2] transition-all duration-300 hover:scale-110 hover:shadow-lg flex items-center justify-center">
                              <svg className="h-6 w-6 sm:h-7 sm:w-7 text-[#5865F2] group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                              </svg>
                            </div>
                          </a>
                        </TooltipTrigger>
                        <TooltipContent>Discord</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    
                    {/* Twitch */}
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <a href="https://www.twitch.tv/" target="_blank" rel="noopener noreferrer" className="group">
                            <div className="p-2.5 sm:p-3 rounded-xl bg-purple-50 hover:bg-[#9146FF] transition-all duration-300 hover:scale-110 hover:shadow-lg flex items-center justify-center">
                              <svg className="h-6 w-6 sm:h-7 sm:w-7 text-[#9146FF] group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
                              </svg>
                            </div>
                          </a>
                        </TooltipTrigger>
                        <TooltipContent>Twitch</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </CardContent>
              </Card>

              {/* Location Map */}
              <Card className="bg-white/90 backdrop-blur-sm border-2 border-amber-200 hover:shadow-xl transition-all duration-300">
                <CardHeader className="pb-3 sm:pb-4 px-4 sm:px-6">
                  <CardTitle className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center">
                    <MapPinHouse className="h-5 w-5 sm:h-6 sm:w-6 text-amber-600 mr-2 sm:mr-3" />
                    Location
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base">
                    Based in Bihar, India • Open to remote work worldwide
                  </CardDescription>
                </CardHeader>
                <CardContent className="px-4 sm:px-6">
                  <div className="rounded-xl overflow-hidden shadow-lg border-2 border-amber-100">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14319.18608069766!2d85.32476216329129!3d26.13359819682155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed1e6c2b9b7b3b%3A0x1c7b1e6f1c9d7b3b!2sMarwan%2C%20Bihar%20843122%2C%20India!5e0!3m2!1sen!2sin!4v1698861234567!5m2!1sen!2sin"
                      width="100%"
                      height="200"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      className="sm:h-[250px]"
                    ></iframe>
                  </div>
                  <a 
                    href="https://maps.app.goo.gl/ZL4TBhnhbmTKanEX6" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="mt-3 sm:mt-4 inline-flex items-center text-amber-600 hover:text-amber-800 font-semibold transition-colors text-sm sm:text-base"
                  >
                    Open in Google Maps
                    <ExternalLink className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                  </a>
                </CardContent>
              </Card>

              {/* Availability Status */}
              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 hover:shadow-xl transition-all duration-300">
                <CardContent className="pt-4 sm:pt-6 px-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse mr-2 sm:mr-3"></div>
                      <div>
                        <p className="font-semibold text-gray-800 text-sm sm:text-base">Currently Available</p>
                        <p className="text-xs sm:text-sm text-gray-600">Accepting new projects</p>
                      </div>
                    </div>
                    <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-green-500 flex-shrink-0" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {/* <section className="py-16 sm:py-20 px-4 sm:px-6 bg-gradient-to-r from-amber-50 to-orange-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">What Clients Say</h2>
            <p className="text-base sm:text-lg text-gray-600 px-4">
              Don't just take my word for it — hear from people I've worked with
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <Card className="bg-white/90 backdrop-blur-sm border-2 border-amber-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardContent className="pt-4 sm:pt-6 px-4 sm:px-6">
                <div className="flex mb-3 sm:mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4 italic">
                  "Exceptional developer! Delivered a complex full-stack application on time with clean, maintainable code. Highly recommended!"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-amber-400 to-orange-400 rounded-full flex items-center justify-center text-white font-bold mr-2 sm:mr-3 text-sm sm:text-base">
                    RS
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm sm:text-base">Rahul Sharma</p>
                    <p className="text-xs sm:text-sm text-gray-600">Startup Founder</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/90 backdrop-blur-sm border-2 border-amber-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardContent className="pt-4 sm:pt-6 px-4 sm:px-6">
                <div className="flex mb-3 sm:mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4 italic">
                  "Great mentor! Clear explanations, patient teaching style, and practical examples. My coding skills improved significantly."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-orange-400 to-red-400 rounded-full flex items-center justify-center text-white font-bold mr-2 sm:mr-3 text-sm sm:text-base">
                    PK
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm sm:text-base">Priya Kumar</p>
                    <p className="text-xs sm:text-sm text-gray-600">CS Student</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white/90 backdrop-blur-sm border-2 border-amber-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardContent className="pt-4 sm:pt-6 px-4 sm:px-6">
                <div className="flex mb-3 sm:mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4 italic">
                  "Professional, responsive, and technically sound. Helped us solve critical issues and optimize our application performance."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-red-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold mr-2 sm:mr-3 text-sm sm:text-base">
                    AV
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm sm:text-base">Amit Verma</p>
                    <p className="text-xs sm:text-sm text-gray-600">Tech Lead</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section> */}

      {/* FAQ Section */}
      {/* <section className="py-16 sm:py-20 px-4 sm:px-6 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
            <p className="text-base sm:text-lg text-gray-600 px-4">
              Quick answers to common questions
            </p>
          </div>
          
          <div className="space-y-3 sm:space-y-4">
            <Card className="bg-white/90 backdrop-blur-sm border-2 border-amber-200 hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-2 sm:pb-4 px-4 sm:px-6">
                <CardTitle className="text-lg sm:text-xl font-bold text-gray-800">
                  What is your typical response time?
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 sm:px-6">
                <p className="text-sm sm:text-base text-gray-600">
                  I respond to all inquiries within 24-48 hours. For urgent matters, you can reach me directly via phone during business hours (9 AM - 6 PM IST).
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/90 backdrop-blur-sm border-2 border-amber-200 hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-2 sm:pb-4 px-4 sm:px-6">
                <CardTitle className="text-lg sm:text-xl font-bold text-gray-800">
                  What services do you offer?
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 sm:px-6">
                <p className="text-sm sm:text-base text-gray-600">
                  I offer full-stack development, technical mentorship, code reviews, project consultations, and tutoring in web development technologies including React, Node.js, and modern JavaScript.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/90 backdrop-blur-sm border-2 border-amber-200 hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-2 sm:pb-4 px-4 sm:px-6">
                <CardTitle className="text-lg sm:text-xl font-bold text-gray-800">
                  Do you work remotely?
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 sm:px-6">
                <p className="text-sm sm:text-base text-gray-600">
                  Yes! I work with clients worldwide remotely. I'm comfortable with various communication tools and time zones. I can also meet in person if you're in the Muzaffarpur area.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/90 backdrop-blur-sm border-2 border-amber-200 hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-2 sm:pb-4 px-4 sm:px-6">
                <CardTitle className="text-lg sm:text-xl font-bold text-gray-800">
                  What are your rates?
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 sm:px-6">
                <p className="text-sm sm:text-base text-gray-600">
                  My rates vary depending on the project scope, complexity, and timeline. Contact me with your requirements, and I'll provide a detailed, transparent quote tailored to your needs.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section> */}

      {/* Call to Action Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-gradient-to-br from-amber-500 via-orange-500 to-red-500">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="animate-fade-in">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 px-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-base sm:text-xl text-white/90 mb-8 sm:mb-10 max-w-2xl mx-auto px-4">
              Let's discuss how we can work together to bring your vision to life. Whether it's a new project, consultation, or mentorship — I'm here to help.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4">
              <a href="/projects" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-white text-amber-600 hover:bg-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg font-semibold"
                >
                  View My Work
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </a>
              <a href="/services" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-2 border-white text-white hover:bg-white/10 backdrop-blur-sm bg-transparent transition-all duration-300 hover:scale-105 px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg font-semibold"
                >
                  Explore Services
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Contact;