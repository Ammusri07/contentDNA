import { Link } from 'react-router-dom';
import { Fingerprint } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-8">
        <Link to="/" className="flex items-center space-x-2">
          <Fingerprint className="h-7 w-7 text-blue-600" />
          <span className="text-xl font-bold tracking-tight">ContentDNA</span>
        </Link>
        <div className="flex items-center space-x-6">
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            <Link to="/onboarding" className="transition-colors hover:text-blue-600 text-gray-600">Onboarding</Link>
            <Link to="/dashboard" className="transition-colors hover:text-blue-600 text-gray-600">Dashboard</Link>
            <Link to="/checker" className="transition-colors hover:text-blue-600 text-gray-600">Content Checker</Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link to="/onboarding" className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
