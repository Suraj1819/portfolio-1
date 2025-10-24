
import { Toaster } from "./components/ui/toaster";
import { Toaster as Sonner } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import Home from "./pages/Home";
import About from "./pages/About";
import Skills from "./pages/Skills";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import Resume from "./pages/Resume";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Index from "./pages/Index";
import ThankYou from "./pages/Thankyou";
import CPlusPlus from "./pages/c++";
import PythonCourse from "./pages/python";
import DSA_Course from "./pages/DSA";
import WebDev_Course from "./pages/webdev";
import Subscribed from "./pages/subscribe";
import Privacy from "./pages/privacyAndPolicy";
import TermsAndConditions from "./pages/terms";
import CookiePolicy from "./pages/cookie";
// import Blog from "./pages/blog";
import Accessibility from "./pages/accessability";
import ResumeDefault from "./pages/resumeShow";
import PortfolioFeedback from "./pages/feedback";
import Sitemap from "./pages/sitemap";



const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
          <Navigation />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/services" element={<Services />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/home" element={<Home />} />
            <Route path="/Thankyou" element={<ThankYou />} />
             <Route path="/cplusplus" element={<CPlusPlus />} />
             <Route path="/python" element={<PythonCourse />} />
             <Route path="/dsa" element={<DSA_Course />} />
             <Route path="/webdev" element={<WebDev_Course />} />
             <Route path="/subscribe" element={<Subscribed />} />
             <Route path="/privacy" element={<Privacy />} />
             <Route path="/terms" element={<TermsAndConditions />} />
             <Route path="/cookies" element={<CookiePolicy />} />
             {/* <Route path="/blog" element={<Blog />} /> */}
             <Route path="/access" element={<Accessibility />} />
             <Route path="/res" element={<ResumeDefault />} />
             <Route path="/your-feedback" element={<PortfolioFeedback />} />
             <Route path="/sitemap" element={<Sitemap />} />
             <Route path="/porto-feedback" element={<PortfolioFeedback />} />


            
          </Routes>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
