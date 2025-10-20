import { useEffect, useState } from 'react';
import { 
  Code, GraduationCap, Palette, Brain, ArrowRight, Clock, Trophy,Cpu,TrendingUp,Zap, Target, Star, CheckCircle, Award,Users
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import Footer from '../components/Footer';

const Services = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeService, setActiveService] = useState('development');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const services = [
    {
      id: 'development',
      icon: Code,
      iconBg: 'from-red-500 to-pink-600',
      title: 'Full-Stack Web Development',
      tagline: 'Transform ideas into powerful digital solutions',
      description: 'End-to-end web development using cutting-edge technologies',
      longDescription: 'I specialize in building complete web solutions that combine intuitive front-end interfaces with powerful back-end systems. Using modern technologies like React for dynamic UIs, Node.js and Express for RESTful APIs, MongoDB for scalable databases, and cloud platforms for deployment, I ensure your application is fast, secure, and user-friendly.',
      features: [
        'Dynamic React.js & Next.js frontends with modern hooks',
        'Robust Node.js & Express.js APIs with authentication',
        'MongoDB & PostgreSQL database design and optimization',
        'Cloud deployment on AWS, Vercel, or Heroku with CI/CD',
        'Responsive, mobile-first design with Tailwind CSS',
        'Third-party integrations (Stripe, Google APIs, etc.)'
      ],
      deliverables: [
        'Production-ready web application',
        'Admin dashboard for content management',
        'API documentation and testing suite',
        'Deployment and CI/CD setup',
        '30-day post-launch support'
      ],
      price: { min: 1500, max: 5000, unit: 'project' },
      duration: '2-6 weeks',
      complexity: 'Medium to High',
      technologies: ['React', 'Node.js', 'MongoDB', 'AWS', 'Docker'],
      projects: 15,
      rating: 4.9,
      clients: 12
    },
    {
      id: 'tutoring',
      icon: GraduationCap,
      iconBg: 'from-green-500 to-emerald-600',
      title: 'Programming Tutoring & Mentorship',
      tagline: 'Accelerate your learning journey with expert guidance',
      description: 'Personalized tutoring and mentorship for programming excellence',
      longDescription: 'My tutoring services focus on empowering students and professionals to excel in programming. From mastering C++ and Python for competitive programming to building real-world projects with the MERN stack, I create customized learning paths that include hands-on coding, problem-solving strategies, and interview preparation.',
      features: [
        'C++ and Python mastery for competitive programming',
        'Data Structures & Algorithms with real-world applications',
        'LeetCode and HackerRank problem-solving strategies',
        'Technical interview preparation with mock interviews',
        'Guided project development for portfolio building'
      ],
      deliverables: [
        'Personalized learning roadmap',
        'Weekly coding assignments and feedback',
        'Access to exclusive study materials',
        'Mock interview sessions',
        'Portfolio project guidance'
      ],
      price: { min: 25, max: 50, unit: 'hour' },
      duration: 'Flexible sessions',
      complexity: 'Beginner to Advanced',
      technologies: ['C++', 'Python', 'JavaScript', 'DSA', 'System Design'],
      projects: 100,
      rating: 4.8,
      clients: 80
    },
    {
      id: 'design',
      icon: Palette,
      iconBg: 'from-pink-500 to-rose-600',
      title: 'UI/UX Design & Consultation',
      tagline: 'Create experiences that delight and convert users',
      description: 'User-centered design that combines aesthetics with functionality',
      longDescription: 'My UI/UX design services focus on creating intuitive, visually appealing interfaces that prioritize user satisfaction. Using tools like Figma, I craft wireframes, interactive prototypes, and design systems that align with your brand identity while ensuring accessibility and usability.',
      features: [
        'Figma-based design systems for consistent branding',
        'Responsive wireframes and interactive prototypes',
        'User research and persona development',
        'Accessibility (WCAG) compliance for inclusive design',
        'Visual storytelling through modern design trends'
      ],
      deliverables: [
        'Complete design system and style guide',
        'High-fidelity interactive prototypes',
        'User research reports and personas',
        'Usability testing results and recommendations',
        'Design handoff documentation'
      ],
      price: { min: 800, max: 2500, unit: 'project' },
      duration: '1-3 weeks',
      complexity: 'Medium',
      technologies: ['Figma', 'Adobe XD', 'Sketch', 'Principle', 'Zeplin'],
      projects: 20,
      rating: 4.7,
      clients: 15
    },
    {
      id: 'consultation',
      icon: Brain,
      iconBg: 'from-orange-500 to-red-600',
      title: 'Technical Consultation',
      tagline: 'Expert guidance to optimize your technical strategy',
      description: 'Strategic technical advice for project success and scalability',
      longDescription: 'As a technical consultant, I help startups, businesses, and development teams make informed technology decisions. From selecting the right tech stack to optimizing application performance and conducting thorough code reviews, I provide insights that streamline development and enhance scalability.',
      features: [
        'Technology stack evaluation and recommendations',
        'System architecture planning for scalability',
        'Code reviews with actionable improvement suggestions',
        'Performance optimization for faster load times',
        'Guidance on industry best practices and standards'
      ],
      deliverables: [
        'Technical architecture documentation',
        'Code review report with recommendations',
        'Performance optimization roadmap',
        'Technology migration strategy',
        'Best practices implementation guide'
      ],
      price: { min: 100, max: 200, unit: 'hour' },
      duration: 'Per consultation',
      complexity: 'Varies',
      technologies: ['System Design', 'Architecture', 'DevOps', 'Security'],
      projects: 25,
      rating: 4.9,
      clients: 18
    }
  ];

  const processSteps = [
    { step: 1, title: 'Discovery', description: 'Understanding your needs and goals' },
    { step: 2, title: 'Planning', description: 'Creating a detailed project roadmap' },
    { step: 3, title: 'Development', description: 'Building your solution with expertise' },
    { step: 4, title: 'Review', description: 'Quality assurance and feedback integration' },
    { step: 5, title: 'Delivery', description: 'Launching your project with support' }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'CEO, TechStart',
      content: 'Exceptional work on our e-commerce platform. The attention to detail and technical expertise exceeded our expectations.',
      rating: 5,
      service: 'development'
    },
    {
      name: 'Michael Chen',
      role: 'Student',
      content: 'The tutoring sessions transformed my understanding of DSA. I landed my dream job thanks to the interview preparation!',
      rating: 5,
      service: 'tutoring'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Product Manager',
      content: 'Beautiful UI design that perfectly captures our brand. User engagement increased by 40% after the redesign.',
      rating: 5,
      service: 'design'
    }
  ];

  const stats = [
    { label: 'Projects Completed', value: '50+', icon: Trophy, color: 'text-amber-600' },
    { label: 'Happy Clients', value: '100+', icon: Users, color: 'text-green-600' },
    { label: 'Years Experience', value: '3+', icon: Clock, color: 'text-blue-600' },
    { label: 'Technologies', value: '20+', icon: Cpu, color: 'text-purple-600' }
  ];

  if (isLoading) {
  return (
    <div
      className="min-h-screen bg-gradient-to-br from-cream-50 via-cream-100 to-amber-50 flex items-center justify-center"
      aria-busy="true"
      aria-live="polite"
    >
      <div className="relative">
        {/* Soft glow effect */}
        <div className="absolute -inset-10 bg-gradient-to-tr from-amber-500/20 via-orange-400/20 to-yellow-400/20 blur-3xl rounded-full animate-pulse" />

        <div className="relative z-10 flex flex-col items-center">
          {/* Brand orbit loader */}
          <div className="relative w-28 h-28">
            {/* Base ring */}
            <div className="absolute inset-0 rounded-full border-4 border-amber-200/70" />
            {/* Outer spinner */}
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-amber-500 border-r-amber-500 animate-spin" />
            {/* Inner counter-rotating spinner */}
            <div className="absolute inset-2 rounded-full border-4 border-transparent border-b-orange-500 border-l-orange-500 animate-spin [animation-direction:reverse] [animation-duration:2.2s]" />
            {/* Orbiting dots */}
            <div className="absolute inset-0 animate-spin [animation-duration:3s]">
              <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-amber-500 rounded-full shadow-md" />
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-orange-500 rounded-full shadow-md" />
            </div>
          </div>

          {/* Loading text + animated dots */}
          <div className="mt-6 text-center">
            {/* Flex container to center the text and dots together */}
            <div className="flex justify-center items-baseline gap-3">
              <p className="text-2xl font-semibold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                Loading Services Page
              </p>
              {/* 4 Dots with animation delays */}
              <div className="flex items-center gap-1.5" aria-hidden="true">
                <span className="w-2 h-2 rounded-full bg-amber-500 animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-bounce [animation-delay:150ms]" />
                <span className="w-2 h-2 rounded-full bg-yellow-500 animate-bounce [animation-delay:300ms]" />
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce [animation-delay:450ms]" />
              </div>
            </div>
            
            {/* Subtitle remains below */}
            <p className="mt-3 text-sm text-gray-600">
              Preparing our services for you...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

  // const activeServiceData = services.find(s => s.id === activeService);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-cream-100 to-amber-50 text-foreground">
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-6 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-amber-300/20 rounded-full blur-3xl animate-pulse-slow"></div>
          <div
            className="absolute top-40 right-10 w-96 h-96 bg-orange-300/20 rounded-full blur-3xl animate-pulse-slow"
            style={{ animationDelay: '1s' }}
          ></div>
          <div
            className="absolute bottom-20 left-1/3 w-80 h-80 bg-yellow-300/20 rounded-full blur-3xl animate-pulse-slow"
            style={{ animationDelay: '2s' }}
          ></div>
        </div>

        <div className="container mx-auto text-center relative z-10">
          <div className="animate-fade-in space-y-6">
            <Badge className="px-4 py-2 text-sm bg-amber-100 text-amber-800 hover:bg-amber-200 transition-colors">
              <Zap className="w-4 h-4 mr-2" />
              Professional Services
            </Badge>
            <h1 className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-amber-600 via-orange-600 to-red-500 bg-clip-text text-transparent">
              Services & Solutions
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Comprehensive services to transform your ideas into reality, 
              from cutting-edge web development to personalized mentorship and expert consultation.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
              <a href="#contact">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 px-8 py-4 group"
                >
                  Get Started Today
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </a>
              <a href="#process">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-amber-300 text-gray-700 hover:bg-amber-50 backdrop-blur-sm bg-white/50 hover:border-amber-400 transition-all duration-300 hover:scale-105 px-8 py-4"
                >
                  View Process
                  <Target className="ml-2 h-5 w-5" />
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-6 bg-white/30 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-white/70 backdrop-blur-sm border border-amber-200 text-center hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardContent className="pt-6">
                  <stat.icon className={`h-8 w-8 ${stat.color} mx-auto mb-2`} />
                  <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-6 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">What I Offer</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tailored services designed to meet your technical and business needs, 
              backed by expertise and a commitment to excellence.
            </p>
          </div>

          {/* Service Tabs */}
          <Tabs value={activeService} onValueChange={setActiveService} className="mb-12">
            <TabsList className="grid w-full grid-cols-4 bg-white/70 backdrop-blur-sm border border-amber-200">
              {services.map((service) => (
                <TabsTrigger 
                  key={service.id} 
                  value={service.id}
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-500 data-[state=active]:text-white"
                >
                  <service.icon className="w-4 h-4 mr-2" />
                  {service.title.split(' ')[0]}
                </TabsTrigger>
              ))}
            </TabsList>

            {services.map((service) => (
              <TabsContent key={service.id} value={service.id} className="mt-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Main Service Card */}
                  <div className="lg:col-span-2">
                    <Card className="bg-white/70 backdrop-blur-sm border border-amber-200 overflow-hidden">
                      <div className={`h-32 bg-gradient-to-br ${service.iconBg} relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                          <service.icon className="h-16 w-16 text-white" />
                        </div>
                      </div>
                      
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div>
                            <CardTitle className="text-2xl mb-2">{service.title}</CardTitle>
                            <p className="text-amber-600 font-medium">{service.tagline}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold text-amber-700">
                              \${service.price.min} - \${service.price.max}
                            </div>
                            <div className="text-sm text-gray-500">per {service.price.unit}</div>
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="space-y-6">
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">Overview</h4>
                          <p className="text-gray-600 leading-relaxed">{service.longDescription}</p>
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-800 mb-3">Key Features</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {service.features.map((feature, index) => (
                              <div key={index} className="flex items-start space-x-2">
                                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-gray-600">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-800 mb-3">Deliverables</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {service.deliverables.map((deliverable, index) => (
                              <div key={index} className="flex items-start space-x-2">
                                <Award className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-gray-600">{deliverable}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {service.technologies.map((tech, index) => (
                            <Badge key={index} variant="secondary" className="bg-amber-100 text-amber-700">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Service Details Sidebar */}
                  <div className="space-y-6">
                    <Card className="bg-white/70 backdrop-blur-sm border border-amber-200">
                      <CardHeader>
                        <CardTitle className="text-lg">Project Details</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Duration</span>
                          <span className="font-medium">{service.duration}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Complexity</span>
                          <span className="font-medium">{service.complexity}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Projects</span>
                          <span className="font-medium">{service.projects} completed</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Rating</span>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-500 mr-1" />
                            <span className="font-medium">{service.rating}/5.0</span>
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Clients</span>
                          <span className="font-medium">{service.clients} satisfied</span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-amber-100 to-orange-100 border border-amber-300">
                      <CardContent className="p-6 text-center">
                        <h4 className="font-semibold text-gray-800 mb-2">Ready to get started?</h4>
                        <p className="text-sm text-gray-600 mb-4">
                          Let's discuss how I can help bring your vision to life
                        </p>
                        <a href="#contact">
                          <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white">
                            Start Your Project
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </a>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">How I Work</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A streamlined process designed to deliver exceptional results while keeping you involved at every stage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {processSteps.map((step, index) => (
              <div key={index} className="relative">
                <Card className="bg-white/70 backdrop-blur-sm border border-amber-200 hover:shadow-xl transition-all duration-300 hover:scale-105 animate-slide-up text-center h-full">
                  <CardContent className="pt-6">
                    <div className={`w-16 h-16 bg-gradient-to-br ${index === 0 ? 'from-blue-400 to-cyan-600' : index === 1 ? 'from-green-400 to-emerald-600' : index === 2 ? 'from-purple-400 to-pink-600' : index === 3 ? 'from-orange-400 to-red-600' : 'from-amber-400 to-orange-600'} rounded-full flex items-center justify-center mx-auto mb-4`}>
                      <span className="text-2xl font-bold text-white">{step.step}</span>
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </CardContent>
                </Card>
                {index < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <ArrowRight className="h-6 w-6 text-amber-500" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">Client Testimonials</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don't just take my word for it - hear what my clients have to say about working with me.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white/70 backdrop-blur-sm border border-amber-200 hover:shadow-xl transition-all duration-300 hover:scale-105 animate-slide-up">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-gray-800">{testimonial.name}</div>
                      <div className="text-sm text-gray-500">{testimonial.role}</div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {services.find(s => s.id === testimonial.service)?.title.split(' ')[0]}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto text-center">
          <Card className="bg-white/70 backdrop-blur-sm p-8 rounded-2xl border border-amber-200 animate-slide-up">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-gray-800 mb-4">
                Ready to Transform Your Ideas?
              </CardTitle>
              <CardDescription className="text-lg text-gray-600 max-w-2xl mx-auto">
                Whether you need a cutting-edge web application, personalized mentorship, 
                stunning design, or expert consultation, I'm here to help you succeed.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a href="#contact">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 px-8 py-4 group"
                  >
                    Start Your Project
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </a>
                <a href="#projects">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-amber-300 text-gray-700 hover:bg-amber-50 backdrop-blur-sm bg-white/50 hover:border-amber-400 transition-all duration-300 hover:scale-105 px-8 py-4"
                  >
                    View Portfolio
                    <TrendingUp className="ml-2 h-5 w-5" />
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

export default Services;