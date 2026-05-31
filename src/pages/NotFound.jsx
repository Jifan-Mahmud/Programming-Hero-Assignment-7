import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';

const NotFound = () => {
  return (
    <main className="flex-1 py-20 px-4 flex items-center justify-center bg-[#fcfbfa]">
      <div className="max-w-md w-full bg-white border border-[#e5e4e7] p-10 rounded-2xl shadow-sm text-center">
        {/* Animated Compass Icon */}
        <div className="w-20 h-20 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-6 border border-rose-100 shadow-inner">
          <Compass size={40} className="animate-spin-slow" />
        </div>
        
        {/* Heading */}
        <h2 className="text-3xl font-extrabold text-[#08060d] tracking-tight mb-2">
          Page Not Found
        </h2>
        
        {/* Subtitle */}
        <p className="text-[#6b6375] text-sm leading-relaxed mb-8">
          The page you are looking for does not exist, has been removed, or is temporarily unavailable. Let's get you back on track!
        </p>
        
        {/* Action Button */}
        <Link 
          to="/" 
          className="btn bg-[#1e463a] hover:bg-[#153229] text-white border-none font-semibold px-8 py-3 rounded-lg shadow-md hover:scale-102 transition-all w-full"
        >
          Return to Home
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
