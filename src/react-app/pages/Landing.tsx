import { Link } from 'react-router';
import { Shield, Users, Video, ArrowRight } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-secondary-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-grey-900 mb-6">
            A private, video‑first job market—
            <span className="text-primary-500">powered by AI</span>
          </h1>
          <p className="text-xl text-grey-600 mb-8 max-w-3xl mx-auto">
            Connect authentic talent with meaningful opportunities through video interviews and AI-assisted matching. No public job boards, just private, personalised connections.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              to="/candidate-onboarding"
              className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-lg text-lg font-semibold flex items-center gap-2 transition-all transform hover:scale-105"
            >
              I'm a Candidate
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              to="/employer-onboarding"
              className="bg-white hover:bg-grey-50 text-primary-500 border-2 border-primary-500 px-8 py-4 rounded-lg text-lg font-semibold flex items-center gap-2 transition-all transform hover:scale-105"
            >
              I'm an Employer
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-grey-900 mb-12">How Jobzworld Works</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Candidate Track */}
            <div>
              <h3 className="text-2xl font-bold text-primary-500 mb-8">For Candidates</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                  <div>
                    <h4 className="font-semibold text-grey-900">Create Your Profile</h4>
                    <p className="text-grey-600">Share your skills, experience, and career aspirations.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                  <div>
                    <h4 className="font-semibold text-grey-900">Record Video Answers</h4>
                    <p className="text-grey-600">Answer role-specific questions to showcase your personality and expertise.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                  <div>
                    <h4 className="font-semibold text-grey-900">Get Matched Privately</h4>
                    <p className="text-grey-600">Our AI connects you with relevant employers who invite you to interviews.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                  <div>
                    <h4 className="font-semibold text-grey-900">Review & Accept</h4>
                    <p className="text-grey-600">See company details and job information before deciding to connect.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Employer Track */}
            <div>
              <h3 className="text-2xl font-bold text-secondary-500 mb-8">For Employers</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-secondary-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                  <div>
                    <h4 className="font-semibold text-grey-900">Build Your Company Profile</h4>
                    <p className="text-grey-600">Showcase your culture and values with an introduction video.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-secondary-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                  <div>
                    <h4 className="font-semibold text-grey-900">Create Private Job Listings</h4>
                    <p className="text-grey-600">Define your ideal candidate and record a personalised job introduction.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-secondary-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                  <div>
                    <h4 className="font-semibold text-grey-900">Review AI Matches</h4>
                    <p className="text-grey-600">See candidate videos and profiles matched to your specific requirements.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-secondary-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                  <div>
                    <h4 className="font-semibold text-grey-900">Invite & Connect</h4>
                    <p className="text-grey-600">Send interview invitations and connect directly with interested candidates.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-grey-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-grey-900 mb-12">Why Choose Jobzworld?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <Shield className="w-12 h-12 text-primary-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-grey-900 mb-4">Private & Secure</h3>
              <p className="text-grey-600">Your information stays private until you choose to connect. No public profiles or job boards.</p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <Video className="w-12 h-12 text-primary-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-grey-900 mb-4">Video-First Matching</h3>
              <p className="text-grey-600">Showcase your personality and skills through video, going beyond traditional CVs.</p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <Users className="w-12 h-12 text-primary-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-grey-900 mb-4">AI-Powered Matches</h3>
              <p className="text-grey-600">Smart algorithms connect the right talent with the right opportunities efficiently.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Transform Your Hiring?</h2>
          <p className="text-xl text-primary-100 mb-8">
            Join thousands of candidates and employers already using Jobzworld to make meaningful connections.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/candidate-onboarding"
              className="bg-white hover:bg-grey-100 text-primary-500 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
            >
              Start as a Candidate
            </Link>
            <Link 
              to="/employer-onboarding"
              className="bg-secondary-500 hover:bg-secondary-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
            >
              Start as an Employer
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
