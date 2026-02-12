import Footer from './Footer';
import FallingEmojis from './FallingEmojis';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans overflow-x-hidden relative">
      
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-20%] w-[500px] h-[500px] bg-blue-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse"></div>
        <div className="absolute bottom-[-20%] right-[-20%] w-[500px] h-[500px] bg-purple-200/40 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse animation-delay-2000"></div>
      </div>

      <FallingEmojis />

      <main className="flex-grow flex flex-col items-center justify-center p-4 relative z-10 w-full my-8">
        <div className="w-full max-w-md md:max-w-2xl relative z-20">
          {children}
        </div>
      </main>

      <div className="relative z-20">
        <Footer />
      </div>
    </div>
  );
};

export default Layout;