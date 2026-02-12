import { Code } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full text-center py-6 mt-8 text-gray-500 text-sm">
      <div className="flex items-center justify-center gap-1 mb-1">
        <span>Created by</span>
        <span className="font-bold text-gray-700">ABDUL HARIS MUHASIBI</span>
      </div>
      <div className="flex items-center justify-center gap-2 text-xs opacity-75">
        <Code size={12} />
        <span>Frontend Engineer Candidate</span>
        <span className="mx-1">•</span>
        <span>DOT Malang 2026</span>
      </div>
    </footer>
  );
};

export default Footer;