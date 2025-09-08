import { Link } from 'react-router';
import { Check, Star } from 'lucide-react';

export default function Pricing() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-grey-50 to-grey-100 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-grey-900 mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-grey-600 mb-8">
            Always free for candidates. Employers pay only when they find great talent.
          </p>
        </div>
      </section>

      {/* Candidate Pricing */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-grey-900 mb-4">For Candidates</h2>
            <p className="text-xl text-grey-600">Always free. No hidden fees, no premium tiers.</p>
          </div>
          
          <div className="max-w-md mx-auto">
            <div className="bg-primary-50 border-2 border-primary-500 rounded-lg p-8 text-center">
              <h3 className="text-2xl font-bold text-grey-900 mb-2">Free Forever</h3>
              <div className="text-4xl font-bold text-primary-500 mb-4">$0</div>
              <p className="text-grey-600 mb-6">Complete access to all candidate features</p>
              
              <ul className="text-left space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary-500" />
                  <span className="text-grey-700">Unlimited profile creation</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary-500" />
                  <span className="text-grey-700">Video interview recordings</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary-500" />
                  <span className="text-grey-700">AI-powered job matching</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary-500" />
                  <span className="text-grey-700">Direct employer connections</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary-500" />
                  <span className="text-grey-700">Profile privacy controls</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-primary-500" />
                  <span className="text-grey-700">Career guidance resources</span>
                </li>
              </ul>
              
              <Link 
                to="/candidate-onboarding"
                className="w-full bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-block"
              >
                Get Started Free
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Employer Pricing */}
      <section className="py-20 bg-grey-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-grey-900 mb-4">For Employers</h2>
            <p className="text-xl text-grey-600">Pay only when you hire. No upfront costs.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Starter */}
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-grey-900 mb-2">Starter</h3>
              <div className="text-3xl font-bold text-grey-900 mb-1">$2,500</div>
              <p className="text-grey-600 mb-6">per successful hire</p>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-secondary-500" />
                  <span className="text-grey-700">1 active job posting</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-secondary-500" />
                  <span className="text-grey-700">AI candidate matching</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-secondary-500" />
                  <span className="text-grey-700">Video candidate reviews</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-secondary-500" />
                  <span className="text-grey-700">Basic analytics</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-secondary-500" />
                  <span className="text-grey-700">Email support</span>
                </li>
              </ul>
              
              <Link 
                to="/employer-onboarding"
                className="w-full bg-secondary-500 hover:bg-secondary-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-block text-center"
              >
                Get Started
              </Link>
            </div>

            {/* Growth */}
            <div className="bg-white rounded-lg p-8 shadow-sm border-2 border-secondary-500 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-secondary-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                  <Star className="w-4 h-4" />
                  Most Popular
                </span>
              </div>
              
              <h3 className="text-xl font-semibold text-grey-900 mb-2">Growth</h3>
              <div className="text-3xl font-bold text-grey-900 mb-1">$4,500</div>
              <p className="text-grey-600 mb-6">per successful hire</p>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-secondary-500" />
                  <span className="text-grey-700">5 active job postings</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-secondary-500" />
                  <span className="text-grey-700">Advanced AI matching</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-secondary-500" />
                  <span className="text-grey-700">Priority candidate access</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-secondary-500" />
                  <span className="text-grey-700">Detailed analytics</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-secondary-500" />
                  <span className="text-grey-700">Video interviews</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-secondary-500" />
                  <span className="text-grey-700">Priority support</span>
                </li>
              </ul>
              
              <Link 
                to="/employer-onboarding"
                className="w-full bg-secondary-500 hover:bg-secondary-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-block text-center"
              >
                Get Started
              </Link>
            </div>

            {/* Enterprise */}
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-grey-900 mb-2">Enterprise</h3>
              <div className="text-3xl font-bold text-grey-900 mb-1">Custom</div>
              <p className="text-grey-600 mb-6">tailored pricing</p>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-secondary-500" />
                  <span className="text-grey-700">Unlimited job postings</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-secondary-500" />
                  <span className="text-grey-700">Custom AI training</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-secondary-500" />
                  <span className="text-grey-700">API integrations</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-secondary-500" />
                  <span className="text-grey-700">Custom branding</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-secondary-500" />
                  <span className="text-grey-700">Dedicated success manager</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-secondary-500" />
                  <span className="text-grey-700">24/7 priority support</span>
                </li>
              </ul>
              
              <button className="w-full bg-grey-200 hover:bg-grey-300 text-grey-700 px-6 py-3 rounded-lg font-semibold transition-colors">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-grey-900 mb-12">Frequently Asked Questions</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-grey-900 mb-2">When do employers pay?</h3>
              <p className="text-grey-600">Employers only pay when they successfully hire a candidate through Jobzworld. There are no upfront costs or monthly fees.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-grey-900 mb-2">What counts as a successful hire?</h3>
              <p className="text-grey-600">A successful hire is when an employer extends a job offer through our platform and the candidate accepts and starts working.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-grey-900 mb-2">Are there any setup fees?</h3>
              <p className="text-grey-600">No setup fees or hidden costs. Employers can create their company profile and post jobs completely free.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-grey-900 mb-2">Can I upgrade or downgrade my plan?</h3>
              <p className="text-grey-600">Yes, you can change your plan at any time. The new pricing will apply to future hires.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-grey-900 mb-2">What if a hire doesn't work out?</h3>
              <p className="text-grey-600">We offer a 90-day guarantee. If a hire doesn't work out within the first 90 days, we'll help you find a replacement at no additional cost.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
