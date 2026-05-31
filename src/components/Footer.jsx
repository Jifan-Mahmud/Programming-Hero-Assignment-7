import instagramIcon from '../assets/instagram.png';
import facebookIcon from '../assets/facebook.png';
import twitterIcon from '../assets/twitter.png';

const Footer = () => {
  return (
    <footer className="w-full bg-[#1b3e34] text-white py-12 px-6 mt-auto">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
        {/* Title */}
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-3">
          KeenKeeper
        </h2>
        
        {/* Subtitle */}
        <p className="max-w-xl text-emerald-100/70 text-sm md:text-base mb-8">
          Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
        </p>
        
        {/* Social Links Heading */}
        <span className="text-xs uppercase tracking-widest text-emerald-200/50 font-bold mb-4">
          Social Links
        </span>
        
        {/* Social Links Icons */}
        <div className="flex gap-4 mb-10">
          <a 
            href="https://instagram.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-emerald-100 hover:scale-105 transition-all"
          >
            <img src={instagramIcon} alt="Instagram" className="w-5 h-5" />
          </a>
          <a 
            href="https://facebook.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-emerald-100 hover:scale-105 transition-all"
          >
            <img src={facebookIcon} alt="Facebook" className="w-5 h-5" />
          </a>
          <a 
            href="https://twitter.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-emerald-100 hover:scale-105 transition-all"
          >
            <img src={twitterIcon} alt="X" className="w-5 h-5" />
          </a>
        </div>
        
        {/* Divider */}
        <div className="w-full border-t border-emerald-800/40 my-6"></div>
        
        {/* Bottom Row */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between text-xs text-emerald-200/50 gap-4">
          <div>
            © 2026 KeenKeeper. All rights reserved.
          </div>
          <div className="flex gap-6">
            <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#cookies" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
