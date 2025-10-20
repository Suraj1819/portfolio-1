import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen items-center justify-center bg-gradient-to-br from-cream-50 via-cream-100 to-amber-50 p-4 flex">
      {/* Add animations via CSS */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes textShine {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
          @keyframes float1 {
            0%, 100% { transform: translateY(0px) translateX(0px); }
            33% { transform: translateY(-20px) translateX(10px); }
            66% { transform: translateY(10px) translateX(-10px); }
          }
          @keyframes float2 {
            0%, 100% { transform: translateY(0px) translateX(0px); }
            33% { transform: translateY(15px) translateX(-15px); }
            66% { transform: translateY(-10px) translateX(15px); }
          }
          @keyframes float3 {
            0%, 100% { transform: translateY(0px) translateX(0px); }
            50% { transform: translateY(-15px) translateX(5px); }
          }
          @keyframes float4 {
            0%, 100% { transform: translateY(0px) translateX(0px); }
            33% { transform: translateY(10px) translateX(-10px); }
            66% { transform: translateY(-5px) translateX(10px); }
          }
          @keyframes fadeInUp {
            0% { opacity: 0; transform: translateY(30px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          @keyframes searchSweep {
            0%, 100% { transform: rotate(0deg); }
            25% { transform: rotate(15deg); }
            75% { transform: rotate(-15deg); }
          }
          @keyframes searchHandle {
            0%, 100% { transform: rotate(45deg) scale(1); }
            50% { transform: rotate(45deg) scale(1.1); }
          }
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-15px); }
          }
          @keyframes ping {
            0% { transform: scale(1); opacity: 1; }
            75%, 100% { transform: scale(3); opacity: 0; }
          }
          .text-shine {
            animation: textShine 3s ease-in-out infinite;
          }
          .float-1 {
            animation: float1 6s ease-in-out infinite;
          }
          .float-2 {
            animation: float2 7s ease-in-out infinite;
          }
          .float-3 {
            animation: float3 5s ease-in-out infinite;
          }
          .float-4 {
            animation: float4 8s ease-in-out infinite;
          }
          .fade-in-up {
            animation: fadeInUp 0.8s ease-out forwards;
          }
          .fade-in-up-delay-1 {
            animation: fadeInUp 0.8s ease-out 0.1s forwards;
          }
          .fade-in-up-delay-2 {
            animation: fadeInUp 0.8s ease-out 0.2s forwards;
          }
          .fade-in-up-delay-4 {
            animation: fadeInUp 0.8s ease-out 0.4s forwards;
          }
          .search-sweep {
            animation: searchSweep 4s ease-in-out infinite;
          }
          .search-handle {
            animation: searchHandle 4s ease-in-out infinite;
          }
          .bounce-1 {
            animation: bounce 3s ease-in-out infinite;
          }
          .bounce-2 {
            animation: bounce 3s ease-in-out 0.3s infinite;
          }
          .bounce-3 {
            animation: bounce 3s ease-in-out 0.6s infinite;
          }
          .ping-1 {
            animation: ping 3s ease-in-out infinite;
          }
          .ping-2 {
            animation: ping 3s ease-in-out 1s infinite;
          }
          .ping-3 {
            animation: ping 3s ease-in-out 2s infinite;
          }
        `
      }} />

      <div className="text-center max-w-2xl w-full">
        {/* Animated 404 Number */}
        <div className="relative mb-8">
          <div className="text-9xl md:text-[12rem] font-black bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 bg-[length:200%_auto] bg-clip-text text-transparent text-shine">
            404
          </div>
          <div className="absolute inset-0 text-9xl md:text-[12rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500 opacity-70 mix-blend-overlay animate-pulse">
            404
          </div>
        </div>

        {/* Floating Elements */}
        <div className="relative mb-12">
          {/* Floating Icons */}
          <div className="absolute -top-4 -left-4 w-8 h-8 bg-amber-300 rounded-full opacity-80 float-1"></div>
          <div className="absolute -top-2 -right-4 w-6 h-6 bg-orange-300 rounded-full opacity-80 float-2"></div>
          <div className="absolute -bottom-4 left-1/4 w-4 h-4 bg-amber-200 rounded-full opacity-80 float-3"></div>
          <div className="absolute -bottom-6 right-1/4 w-5 h-5 bg-orange-200 rounded-full opacity-80 float-4"></div>

          {/* Main Content */}
          <h2 className="text-2xl md:text-4xl font-bold text-amber-900 mb-4 fade-in-up">
            Lost in the Digital Space
          </h2>
          <p className="text-lg md:text-xl text-amber-700 mb-2 fade-in-up-delay-1">
            The page you're looking for seems to have wandered off.
          </p>
          <p className="text-amber-600 mb-8 fade-in-up-delay-2">
            <code className="bg-amber-100 px-2 py-1 rounded text-sm border border-amber-200">{location.pathname}</code>
          </p>
        </div>

        {/* Animated Search Illustration */}
        <div className="relative w-48 h-48 mx-auto mb-8">
          {/* Magnifying Glass */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 border-4 border-amber-300 rounded-full search-sweep"></div>
            <div className="absolute w-8 h-4 bg-amber-400 transform rotate-45 origin-top-left search-handle"></div>
          </div>
          
          {/* Floating Question Marks */}
          <div className="absolute top-4 left-6 text-2xl font-bold text-amber-400 bounce-1">
            ?
          </div>
          <div className="absolute top-8 right-8 text-xl font-bold text-amber-400 bounce-2">
            ?
          </div>
          <div className="absolute bottom-10 left-10 text-lg font-bold text-amber-400 bounce-3">
            ?
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center fade-in-up-delay-4">
          <Link
            to="/home"
            className="group relative px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative flex items-center">
              Return to Home
              <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="px-6 py-4 border-2 border-amber-300 text-amber-700 font-semibold rounded-xl hover:border-amber-400 hover:bg-amber-50 transform hover:scale-105 transition-all duration-300"
          >
            Go Back
          </button>
        </div>

        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-amber-300 rounded-full ping-1"></div>
          <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-orange-300 rounded-full ping-2"></div>
          <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-amber-200 rounded-full ping-3"></div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;