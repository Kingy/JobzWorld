import { Link } from 'react-router';
import { Video, Shield, Zap, Users, Check, Star } from 'lucide-react';

export default function Candidates() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-primary-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-grey-900 mb-6">
              Land Your Dream Job with 
              <span className="text-primary-500"> Video-First Matching</span>
            </h1>
            <p className="text-xl text-grey-600 mb-8 max-w-3xl mx-auto">
              Skip the black hole of job applications. Show your personality, get matched with companies that value your unique skills, and connect directly with hiring managers.
            </p>
            <Link 
              to="/candidate-onboarding"
              className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-lg text-lg font-semibold inline-flex items-center gap-2 transition-all transform hover:scale-105"
            >
              Get Started Free
              <Video className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-grey-900 mb-12">How Jobzworld Works for You</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-lg font-semibold text-grey-900 mb-2">Create Your Profile</h3>
              <p className="text-grey-600">Share your skills, experience, and career goals in just 10 minutes.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-lg font-semibold text-grey-900 mb-2">Record Video Answers</h3>
              <p className="text-grey-600">Answer role-specific questions to showcase your personality and expertise.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-lg font-semibold text-grey-900 mb-2">Get AI Matches</h3>
              <p className="text-grey-600">Our AI connects you with companies looking for your specific skills.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">4</div>
              <h3 className="text-lg font-semibold text-grey-900 mb-2">Connect & Interview</h3>
              <p className="text-grey-600">Review opportunities and connect directly with interested employers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-grey-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-grey-900 mb-12">Why Candidates Love Jobzworld</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Shield className="w-10 h-10 text-primary-500 mb-4" />
              <h3 className="text-xl font-semibold text-grey-900 mb-2">100% Private</h3>
              <p className="text-grey-600">Your profile is never public. Only companies you're interested in can see your information.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Video className="w-10 h-10 text-primary-500 mb-4" />
              <h3 className="text-xl font-semibold text-grey-900 mb-2">Video-First</h3>
              <p className="text-grey-600">Show your personality and communication skills beyond what a CV can capture.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Zap className="w-10 h-10 text-primary-500 mb-4" />
              <h3 className="text-xl font-semibold text-grey-900 mb-2">AI-Powered</h3>
              <p className="text-grey-600">Smart matching ensures you only see relevant opportunities that fit your goals.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Users className="w-10 h-10 text-primary-500 mb-4" />
              <h3 className="text-xl font-semibold text-grey-900 mb-2">Direct Access</h3>
              <p className="text-grey-600">Skip recruiters and connect directly with hiring managers and team leaders.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Check className="w-10 h-10 text-primary-500 mb-4" />
              <h3 className="text-xl font-semibold text-grey-900 mb-2">Quality Over Quantity</h3>
              <p className="text-grey-600">Receive fewer, higher-quality opportunities that match your preferences.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <Star className="w-10 h-10 text-primary-500 mb-4" />
              <h3 className="text-xl font-semibold text-grey-900 mb-2">Free to Use</h3>
              <p className="text-grey-600">Always free for candidates. Companies pay when they find great talent.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-grey-900 mb-12">Success Stories</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-primary-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1494790108755-2616b612b789?w=64&h=64&fit=crop&crop=face" 
                  alt="Sarah Chen" 
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold text-grey-900">Sarah Chen</h4>
                  <p className="text-sm text-grey-600">Customer Success Manager</p>
                </div>
              </div>
              <p className="text-grey-700 italic">
                "Jobzworld helped me find my dream role in just 2 weeks. The video format let me show my personality, and I connected directly with my future manager."
              </p>
            </div>
            
            <div className="bg-primary-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face" 
                  alt="Marcus Johnson" 
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold text-grey-900">Marcus Johnson</h4>
                  <p className="text-sm text-grey-600">Sales Representative</p>
                </div>
              </div>
              <p className="text-grey-700 italic">
                "Finally, a platform that values communication skills! I got 3 interview requests in my first week and landed a role with a 40% salary increase."
              </p>
            </div>
            
            <div className="bg-primary-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <img 
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face" 
                  alt="Emma Rodriguez" 
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold text-grey-900">Emma Rodriguez</h4>
                  <p className="text-sm text-grey-600">Account Manager</p>
                </div>
              </div>
              <p className="text-grey-700 italic">
                "The AI matching is incredibly accurate. Every opportunity I received was relevant, and I didn't waste time on irrelevant applications."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Find Your Next Opportunity?</h2>
          <p className="text-xl text-primary-100 mb-8">
            Join thousands of professionals who've already found their dream jobs through Jobzworld.
          </p>
          <Link 
            to="/candidate-onboarding"
            className="bg-white hover:bg-grey-100 text-primary-500 px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-flex items-center gap-2"
          >
            Create Your Profile
            <Video className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
