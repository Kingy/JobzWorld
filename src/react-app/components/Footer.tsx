import { Link } from 'react-router';

export default function Footer() {
  return (
    <footer className="bg-grey-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="text-2xl font-bold mb-4">Jobzworld</div>
            <p className="text-grey-300 mb-4 max-w-md">
              A private, video-first job market powered by AI. Connect with opportunities through authentic video interactions.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-grey-300">
              <li><Link to="/privacy" className="hover:text-white">Privacy</Link></li>
              <li><Link to="/terms" className="hover:text-white">Terms</Link></li>
              <li><Link to="/help" className="hover:text-white">Help Centre</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Language</h3>
            <select className="bg-grey-800 border border-grey-700 rounded px-3 py-2 text-sm">
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
            </select>
          </div>
        </div>
        
        <div className="border-t border-grey-800 mt-8 pt-8 text-center text-grey-300 text-sm">
          © 2024 Jobzworld. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
