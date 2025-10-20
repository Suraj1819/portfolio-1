import React, { useState, useEffect } from 'react';
import axios, { AxiosError} from 'axios'; // Import Axios types
import Footer from '../components/Footer';
import type { AxiosResponse,AxiosInstance} from 'axios'; // Import AxiosResponse type
import {
  Mail, PhoneCall, MapPinHouse, Github, Linkedin, X, Code2, Instagram, Facebook, Disc2, Twitch, ArrowRight, MessageCircle, ExternalLink, AlertCircle, CheckCircle
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
              className="mt-6 w-full h-3 rounded-full bg-amber-100/80 overflow-hidden relative"
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
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-6 overflow-hidden min-h-[50vh] flex items-center">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-amber-300/20 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-orange-300/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-yellow-300/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
        </div>
        <div className="container mx-auto text-center relative z-10">
          <div className="animate-fade-in">
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-amber-600 via-orange-600 to-red-500 bg-clip-text text-transparent">
              Connect With Me
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              Ready to bring your project to life, seek expert technical guidance, or explore mentorship opportunities? Fill out the form below or reach out directly via email, phone, or social media. I'm committed to responding within 24-48 hours with tailored insights to fuel your success.
            </p>
            <a href="#contact-form">
              <Button
                size="lg"
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 px-8 py-4"
              >
                Start a Conversation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </a>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-gentle">
          <div className="w-6 h-10 border-2 border-amber-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-amber-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact-form" className="py-20 px-6 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="bg-white/70 backdrop-blur-sm border border-amber-200 hover:shadow-xl transition-all duration-300 animate-slide-up">
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-gray-800 flex items-center">
                  <MessageCircle className="h-8 w-8 text-amber-600 mr-3" />
                  Send a Message
                </CardTitle>
                <CardDescription className="text-lg text-gray-600">
                  Share your project details, technical questions, or mentorship needs. I'll provide a personalized response to help you move forward.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Alert Message */}
                {alertMessage.message && (
                  <div className={`mb-6 p-4 rounded-lg border flex items-center ${
                    alertMessage.type === 'error'
                      ? 'border-red-200 bg-red-50 text-red-800'
                      : 'border-green-200 bg-green-50 text-green-800'
                  }`}>
                    {alertMessage.type === 'error' ? (
                      <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                    ) : (
                      <CheckCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                    )}
                    <span className="text-sm">{alertMessage.message}</span>
                  </div>
                )}

                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-700 font-semibold">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      disabled={isSending}
                      className={`border-amber-200 focus:ring-amber-500 bg-white/50 ${
                        errors.name ? 'border-red-300 focus:ring-red-500' : ''
                      }`}
                      aria-invalid={!!errors.name}
                      aria-describedby="name-error"
                      maxLength={50}
                    />
                    {errors.name && (
                      <p id="name-error" className="text-red-500 text-sm flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-700 font-semibold">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled={isSending}
                      className={`border-amber-200 focus:ring-amber-500 bg-white/50 ${
                        errors.email ? 'border-red-300 focus:ring-red-500' : ''
                      }`}
                      aria-invalid={!!errors.email}
                      aria-describedby="email-error"
                      maxLength={100}
                    />
                    {errors.email && (
                      <p id="email-error" className="text-red-500 text-sm flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-gray-700 font-semibold">Subject *</Label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      placeholder="e.g., Project Collaboration or Tutoring Inquiry"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      disabled={isSending}
                      className={`border-amber-200 focus:ring-amber-500 bg-white/50 ${
                        errors.subject ? 'border-red-300 focus:ring-red-500' : ''
                      }`}
                      aria-invalid={!!errors.subject}
                      aria-describedby="subject-error"
                      maxLength={100}
                    />
                    {errors.subject && (
                      <p id="subject-error" className="text-red-500 text-sm flex items-center">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-gray-700 font-semibold">Your Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={6}
                      placeholder="Describe your project, requirements, or questions in detail..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                      disabled={isSending}
                      className={`border-amber-200 focus:ring-amber-500 bg-white/50 resize-none ${
                        errors.message ? 'border-red-300 focus:ring-red-500' : ''
                      }`}
                      aria-invalid={!!errors.message}
                      aria-describedby="message-error"
                      maxLength={1000}
                    />
                    <div className="flex justify-between items-center">
                      {errors.message && (
                        <p id="message-error" className="text-red-500 text-sm flex items-center">
                          <AlertCircle className="h-4 w-4 mr-1" />
                          {errors.message}
                        </p>
                      )}
                      <p className="text-sm text-gray-500 ml-auto">{formData.message.length}/1000</p>
                    </div>
                  </div>

                  <p className="text-sm text-gray-500">* Required fields. Your information is kept confidential and used only for responding to your inquiry.</p>

                  <Button
                    type="submit"
                    disabled={isSending}
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSending ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information - (rest of your existing code remains the same) */}
            <div className="space-y-8">
              <Card className="bg-white/70 backdrop-blur-sm border border-amber-200 hover:shadow-xl transition-all duration-300 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-800 flex items-center">
                    <Mail className="h-6 w-6 text-amber-600 mr-3" />
                    Email
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Reach out for project inquiries, technical consultations, or mentorship discussions.</p>
                  <a href="mailto:surajkumarraj8888@gmail.com" className="text-amber-600 hover:text-amber-800 font-semibold flex items-center">
                    surajkumarraj8888@gmail.com
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border border-amber-200 hover:shadow-xl transition-all duration-300 animate-slide-up" style={{ animationDelay: '0.4s' }}>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-800 flex items-center">
                    <PhoneCall className="h-6 w-6 text-amber-600 mr-3" />
                    Phone
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Available for calls during business hours (9 AM - 6 PM IST). Schedule a call for detailed discussions.</p>
                  <a href="tel:+919507272341" className="text-amber-600 hover:text-amber-800 font-semibold flex items-center">
                    +91 9507272341
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border border-amber-200 hover:shadow-xl transition-all duration-300 animate-slide-up" style={{ animationDelay: '0.6s' }}>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-800 flex items-center">
                    <MapPinHouse className="h-6 w-6 text-amber-600 mr-3" />
                    Location
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Based in Marwan, Muzaffarpur, Bihar, India. Open to remote collaborations worldwide.</p>
                  <a href="https://maps.app.goo.gl/ZL4TBhnhbmTKanEX6" target="_blank" rel="noopener noreferrer" className="text-amber-600 hover:text-amber-800 font-semibold flex items-center mb-4">
                    Marwan, Muzaffarpur, Bihar, India
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                  <div className="rounded-xl overflow-hidden shadow-lg">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14319.18608069766!2d85.32476216329129!3d26.13359819682155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed1e6c2b9b7b3b%3A0x1c7b1e6f1c9d7b3b!2sMarwan%2C%20Bihar%20843122%2C%20India!5e0!3m2!1sen!2sin!4v1698861234567!5m2!1sen!2sin"
                      width="100%"
                      height="300"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border border-amber-200 hover:shadow-xl transition-all duration-300 animate-slide-up" style={{ animationDelay: '0.8s' }}>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-800 flex items-center">
                    <Github className="h-6 w-6 text-amber-600 mr-3" />
                    Connect on Social
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">Follow me for updates on projects, coding tips, and tech insights. Let's connect and grow together!</p>
                  <TooltipProvider>
                    <div className="grid grid-cols-4 gap-4">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" className="p-0 hover:bg-amber-100 transition-all duration-300 hover:scale-110">
                            <a href="https://github.com/Suraj1819" target="_blank" rel="noopener noreferrer">
                                                            <Github className="h-8 w-8 text-amber-700" />
                            </a>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>GitHub</TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" className="p-0 hover:bg-amber-100 transition-all duration-300 hover:scale-110">
                            <a href="https://www.linkedin.com/in/suraj-kumar-72847b30a/" target="_blank" rel="noopener noreferrer">
                              <Linkedin className="h-8 w-8 text-amber-700" />
                            </a>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>LinkedIn</TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" className="p-0 hover:bg-amber-100 transition-all duration-300 hover:scale-110">
                            <a href="https://x.com/SuraJzRt" target="_blank" rel="noopener noreferrer">
                              <X className="h-8 w-8 text-amber-700" />
                            </a>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>X</TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" className="p-0 hover:bg-amber-100 transition-all duration-300 hover:scale-110">
                            <a href="https://leetcode.com/u/Suraj_1819/" target="_blank" rel="noopener noreferrer">
                              <Code2 className="h-8 w-8 text-amber-700" />
                            </a>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>LeetCode</TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" className="p-0 hover:bg-amber-100 transition-all duration-300 hover:scale-110">
                            <a href="https://www.instagram.com/risu2948/" target="_blank" rel="noopener noreferrer">
                              <Instagram className="h-8 w-8 text-amber-700" />
                            </a>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Instagram</TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" className="p-0 hover:bg-amber-100 transition-all duration-300 hover:scale-110">
                            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
                              <Facebook className="h-8 w-8 text-amber-700" />
                            </a>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Facebook</TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" className="p-0 hover:bg-amber-100 transition-all duration-300 hover:scale-110">
                            <a href="https://discord.com/" target="_blank" rel="noopener noreferrer">
                              <Disc2 className="h-8 w-8 text-amber-700" />
                            </a>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Discord</TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" className="p-0 hover:bg-amber-100 transition-all duration-300 hover:scale-110">
                            <a href="https://www.twitch.tv/" target="_blank" rel="noopener noreferrer">
                              <Twitch className="h-8 w-8 text-amber-700" />
                            </a>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Twitch</TooltipContent>
                      </Tooltip>
                    </div>
                  </TooltipProvider>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center">
          <Card className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl border border-amber-200 animate-slide-up">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-gray-800">Explore More</CardTitle>
              <CardDescription className="text-lg text-gray-600 max-w-2xl mx-auto">
                Curious about my work? Check out my projects or learn more about my services to see how we can collaborate.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a href="/projects">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 px-8 py-4"
                  >
                    View My Projects
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </a>
                <a href="/services">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto border-amber-300 text-gray-700 hover:bg-amber-50 backdrop-blur-sm bg-white/50 hover:border-amber-400 transition-all duration-300 hover:scale-105 px-8 py-4"
                  >
                    Explore Services
                    <ArrowRight className="ml-2 h-5 w-5" />
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

export default Contact;