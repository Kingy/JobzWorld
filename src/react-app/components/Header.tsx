import { Link } from 'react-router';

export default function Header() {
  return (
    <header className="bg-white border-b border-grey-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-primary-700">
              Jobzworld
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <Link to="/candidates" className="text-grey-600 hover:text-grey-900 px-3 py-2 text-sm font-medium">
              For Candidates
            </Link>
            <Link to="/employers" className="text-grey-600 hover:text-grey-900 px-3 py-2 text-sm font-medium">
              For Employers
            </Link>
            <Link to="/pricing" className="text-grey-600 hover:text-grey-900 px-3 py-2 text-sm font-medium">
              Pricing
            </Link>
            <Link to="/about" className="text-grey-600 hover:text-grey-900 px-3 py-2 text-sm font-medium">
              About
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Link to="/sign-in" className="text-grey-600 hover:text-grey-900 px-3 py-2 text-sm font-medium">
              Sign in
            </Link>
            <Link 
              to="/get-started" 
              className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              Get started
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
