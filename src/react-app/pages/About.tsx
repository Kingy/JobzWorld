import { Users, Target, Lightbulb, Heart } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-50 to-secondary-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-grey-900 mb-6">
            Redefining How Talent Meets Opportunity
          </h1>
          <p className="text-xl text-grey-600 mb-8">
            We believe every person deserves to be seen for who they truly are, not just what's on their CV.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-grey-900 mb-6">Our Mission</h2>
            <p className="text-xl text-grey-600 leading-relaxed">
              At Jobzworld, we're building the future of recruitment—one where authentic human connections drive hiring decisions, where personality and potential matter as much as experience, and where every interaction is meaningful.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-grey-900 mb-4">The Problem We're Solving</h3>
              <p className="text-grey-600 mb-4">
                Traditional job boards have created a broken system where talented individuals disappear into application black holes, and companies struggle to find candidates who truly fit their culture.
              </p>
              <p className="text-grey-600">
                We're changing that by putting video and AI at the center of the hiring process, creating genuine connections between people and opportunities.
              </p>
            </div>
            <div className="bg-grey-50 p-8 rounded-lg">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-3xl font-bold text-primary-500">85%</div>
                  <div className="text-sm text-grey-600">of jobs are never posted publicly</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary-500">250+</div>
                  <div className="text-sm text-grey-600">applications per job posting</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary-500">2%</div>
                  <div className="text-sm text-grey-600">of applications get responses</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary-500">72%</div>
                  <div className="text-sm text-grey-600">of CVs never seen by humans</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-grey-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-grey-900 mb-12">Our Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <Users className="w-12 h-12 text-primary-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-grey-900 mb-2">Human-First</h3>
              <p className="text-grey-600">Technology serves people, not the other way around. Every feature we build puts human connection at its core.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <Target className="w-12 h-12 text-primary-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-grey-900 mb-2">Quality Focused</h3>
              <p className="text-grey-600">Better matches mean better outcomes. We prioritize quality connections over quantity metrics.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <Lightbulb className="w-12 h-12 text-primary-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-grey-900 mb-2">Innovation Driven</h3>
              <p className="text-grey-600">We constantly push boundaries to create new ways for talent and opportunity to find each other.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <Heart className="w-12 h-12 text-primary-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-grey-900 mb-2">Inclusivity</h3>
              <p className="text-grey-600">Everyone deserves equal access to opportunities, regardless of background or traditional credentials.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-grey-900 mb-12">Meet Our Team</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face" 
                alt="Alex Rivera" 
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-grey-900">Alex Rivera</h3>
              <p className="text-primary-500 mb-2">CEO & Co-Founder</p>
              <p className="text-grey-600 text-sm">Former VP of Talent at unicorn startup. Passionate about fixing broken hiring systems.</p>
            </div>
            
            <div className="text-center">
              <img 
                src="https://images.unsplash.com/photo-1494790108755-2616b612b789?w=200&h=200&fit=crop&crop=face" 
                alt="Sarah Kim" 
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-grey-900">Sarah Kim</h3>
              <p className="text-secondary-500 mb-2">CTO & Co-Founder</p>
              <p className="text-grey-600 text-sm">AI researcher turned product builder. Leading our machine learning and video technology.</p>
            </div>
            
            <div className="text-center">
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face" 
                alt="Marcus Chen" 
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-grey-900">Marcus Chen</h3>
              <p className="text-primary-500 mb-2">Head of Growth</p>
              <p className="text-grey-600 text-sm">Growth expert who's scaled multiple B2B marketplaces. Focused on candidate and employer success.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="py-20 bg-primary-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Our Vision</h2>
          <p className="text-xl text-primary-100 mb-8">
            A world where every person can showcase their authentic self and every company can find talent that truly fits their culture and values.
          </p>
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-8">
            <p className="text-primary-100 text-lg italic">
              "We're not just building a recruitment platform—we're creating a movement towards more human, more equitable, and more effective hiring."
            </p>
            <p className="text-primary-200 mt-4">— Alex Rivera, CEO</p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 bg-grey-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-grey-900 mb-6">Get in Touch</h2>
          <p className="text-xl text-grey-600 mb-8">
            Want to learn more about our mission or join our team? We'd love to hear from you.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-grey-900 mb-2">General Inquiries</h3>
              <p className="text-grey-600">hello@jobzworld.com</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-grey-900 mb-2">Partnership</h3>
              <p className="text-grey-600">partnerships@jobzworld.com</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-semibold text-grey-900 mb-2">Careers</h3>
              <p className="text-grey-600">careers@jobzworld.com</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
