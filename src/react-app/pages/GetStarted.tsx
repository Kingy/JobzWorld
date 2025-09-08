import { Link } from 'react-router';
import { Users, Building, ArrowRight, Video, Shield, Zap } from 'lucide-react';

export default function GetStarted() {
  return (
    <div className="min-h-screen bg-grey-50">
      {/* Hero */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-grey-900 mb-6">
            Choose Your Journey
          </h1>
          <p className="text-xl text-grey-600 mb-12">
            Whether you're looking for your next opportunity or your next hire, Jobzworld has you covered.
          </p>
          
          {/* User Type Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Candidate Card */}
            <div className="bg-white rounded-lg shadow-sm border border-grey-200 p-8 hover:shadow-md transition-all transform hover:scale-105">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-8 h-8 text-primary-500" />
                </div>
                <h2 className="text-2xl font-bold text-grey-900 mb-4">I'm a Candidate</h2>
                <p className="text-grey-600 mb-6">
                  Looking for your next role? Showcase your skills through video and get matched with companies that value what you bring.
                </p>
                
                <div className="space-y-3 mb-8 text-left">
                  <div className="flex items-center gap-3">
                    <Video className="w-5 h-5 text-primary-500" />
                    <span className="text-sm text-grey-700">Create video introductions</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-primary-500" />
                    <span className="text-sm text-grey-700">Private profile control</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Zap className="w-5 h-5 text-primary-500" />
                    <span className="text-sm text-grey-700">AI-powered job matching</span>
                  </div>
                </div>
                
                <Link
                  to="/candidate-onboarding"
                  className="w-full bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center justify-center gap-2"
                >
                  Get Started as Candidate
                  <ArrowRight className="w-4 h-4" />
                </Link>
                
                <p className="text-xs text-grey-500 mt-4">100% Free • No hidden fees</p>
              </div>
            </div>

            {/* Employer Card */}
            <div className="bg-white rounded-lg shadow-sm border border-grey-200 p-8 hover:shadow-md transition-all transform hover:scale-105">
              <div className="text-center">
                <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Building className="w-8 h-8 text-secondary-500" />
                </div>
                <h2 className="text-2xl font-bold text-grey-900 mb-4">I'm an Employer</h2>
                <p className="text-grey-600 mb-6">
                  Ready to hire? Create engaging job posts and connect with pre-screened candidates through our video-first platform.
                </p>
                
                <div className="space-y-3 mb-8 text-left">
                  <div className="flex items-center gap-3">
                    <Video className="w-5 h-5 text-secondary-500" />
                    <span className="text-sm text-grey-700">Video job introductions</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-secondary-500" />
                    <span className="text-sm text-grey-700">Quality candidate screening</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Zap className="w-5 h-5 text-secondary-500" />
                    <span className="text-sm text-grey-700">Smart candidate matching</span>
                  </div>
                </div>
                
                <Link
                  to="/employer-onboarding"
                  className="w-full bg-secondary-500 hover:bg-secondary-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-flex items-center justify-center gap-2"
                >
                  Get Started as Employer
                  <ArrowRight className="w-4 h-4" />
                </Link>
                
                <p className="text-xs text-grey-500 mt-4">Pay only when you hire</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Jobzworld */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-grey-900 mb-12">Why Choose Jobzworld?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Video className="w-6 h-6 text-primary-500" />
              </div>
              <h3 className="text-xl font-semibold text-grey-900 mb-2">Video-First Approach</h3>
              <p className="text-grey-600">Go beyond CVs. Show your personality and get a real sense of company culture through video.</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-primary-500" />
              </div>
              <h3 className="text-xl font-semibold text-grey-900 mb-2">Privacy Protected</h3>
              <p className="text-grey-600">Your information stays private until you choose to connect. No public profiles or spam.</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-primary-500" />
              </div>
              <h3 className="text-xl font-semibold text-grey-900 mb-2">AI-Powered Matching</h3>
              <p className="text-grey-600">Smart algorithms ensure you only see relevant opportunities or qualified candidates.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Already Have Account */}
      <section className="py-20 bg-grey-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-grey-900 mb-4">Already have an account?</h2>
          <p className="text-grey-600 mb-8">Sign in to continue your journey on Jobzworld.</p>
          
          <Link
            to="/sign-in"
            className="bg-white hover:bg-grey-50 text-grey-700 border border-grey-300 px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center gap-2"
          >
            Sign In
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
