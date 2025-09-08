import { useState } from 'react';
import { Search, ChevronDown, ChevronRight, MessageCircle, Mail, Phone } from 'lucide-react';

export default function Help() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSections, setExpandedSections] = useState<string[]>(['getting-started']);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const faqSections = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      questions: [
        {
          q: 'How do I create my candidate profile?',
          a: 'Click "Get Started" and select "I\'m a Candidate". You\'ll be guided through a 5-step process to complete your profile, including recording video answers to showcase your skills.'
        },
        {
          q: 'How do I post a job as an employer?',
          a: 'Select "I\'m an Employer" from the get started page. You\'ll create your company profile and first job posting through our guided onboarding process.'
        },
        {
          q: 'Is Jobzworld really free for candidates?',
          a: 'Yes, absolutely! Creating your profile, recording videos, and connecting with employers is completely free for candidates. There are no hidden fees or premium tiers.'
        }
      ]
    },
    {
      id: 'video-features',
      title: 'Video Features',
      questions: [
        {
          q: 'What equipment do I need to record videos?',
          a: 'Just a computer or mobile device with a camera and microphone. Most modern devices have everything you need for high-quality video recording.'
        },
        {
          q: 'Can I re-record my video answers?',
          a: 'Yes! You can re-record your videos. The number of re-records depends on your plan, but all candidates get at least one re-record opportunity per question.'
        },
        {
          q: 'How long should my video answers be?',
          a: 'Most video questions have a 90-second time limit. This gives you enough time to provide a comprehensive answer while keeping responses engaging.'
        },
        {
          q: 'Who can see my videos?',
          a: 'Only employers who you\'ve mutually connected with can view your videos. Your profile and videos are never public or searchable outside the platform.'
        }
      ]
    },
    {
      id: 'matching',
      title: 'AI Matching & Privacy',
      questions: [
        {
          q: 'How does the AI matching work?',
          a: 'Our AI analyzes your skills, experience, preferences, and video responses to match you with relevant opportunities. It considers both technical qualifications and cultural fit.'
        },
        {
          q: 'Can I control who sees my profile?',
          a: 'Absolutely. Your profile is completely private until you choose to connect with an employer. You have full control over your visibility and data sharing.'
        },
        {
          q: 'What information do employers see before we connect?',
          a: 'Employers only see basic matching indicators (like skill compatibility) until you both express mutual interest. Then they can view your full profile and videos.'
        },
        {
          q: 'How do I withdraw my consent for AI analysis?',
          a: 'You can manage your AI analysis preferences in your privacy settings. You can opt out at any time, though this may affect the quality of job matches.'
        }
      ]
    },
    {
      id: 'employers',
      title: 'For Employers',
      questions: [
        {
          q: 'When do I pay for the service?',
          a: 'You only pay when you successfully hire a candidate through our platform. There are no upfront costs, setup fees, or monthly subscriptions.'
        },
        {
          q: 'How many job postings can I create?',
          a: 'This depends on your plan. Starter plans include 1 active posting, Growth plans include 5, and Enterprise plans offer unlimited postings.'
        },
        {
          q: 'Can I see candidate videos before they see my job posting?',
          a: 'No, our system ensures mutual interest. Candidates and employers can only view detailed information after both parties express interest in connecting.'
        },
        {
          q: 'What if a hire doesn\'t work out?',
          a: 'We offer a 90-day guarantee. If a hire doesn\'t work out within 90 days, we\'ll help you find a replacement at no additional cost.'
        }
      ]
    },
    {
      id: 'technical',
      title: 'Technical Support',
      questions: [
        {
          q: 'My video won\'t upload. What should I do?',
          a: 'Try refreshing the page and recording again. Ensure you have a stable internet connection. If problems persist, contact our support team.'
        },
        {
          q: 'Can I use Jobzworld on mobile devices?',
          a: 'Yes! Our platform is fully responsive and works on smartphones and tablets. You can record videos and manage your profile from any device.'
        },
        {
          q: 'What browsers are supported?',
          a: 'We support all modern browsers including Chrome, Firefox, Safari, and Edge. For the best experience, keep your browser updated to the latest version.'
        },
        {
          q: 'I\'m having trouble with the camera/microphone permissions.',
          a: 'Make sure you\'ve granted camera and microphone permissions to your browser. You can usually find these settings in your browser\'s site permissions or privacy settings.'
        }
      ]
    }
  ];

  const filteredSections = faqSections.map(section => ({
    ...section,
    questions: section.questions.filter(
      qa => searchQuery === '' || 
      qa.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      qa.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(section => section.questions.length > 0);

  return (
    <div className="min-h-screen bg-grey-50">
      {/* Header */}
      <section className="bg-white border-b border-grey-200 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-grey-900 mb-4">Help Centre</h1>
          <p className="text-xl text-grey-600 mb-8">
            Find answers to common questions or get in touch with our support team.
          </p>
          
          {/* Search */}
          <div className="relative max-w-lg mx-auto">
            <Search className="absolute left-3 top-3 h-5 w-5 text-grey-400" />
            <input
              type="text"
              placeholder="Search for help..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-grey-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* FAQ Content */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-grey-900 mb-8">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              {filteredSections.map((section) => (
                <div key={section.id} className="bg-white rounded-lg shadow-sm border border-grey-200">
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-grey-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-inset"
                  >
                    <h3 className="text-lg font-semibold text-grey-900">{section.title}</h3>
                    {expandedSections.includes(section.id) ? (
                      <ChevronDown className="w-5 h-5 text-grey-500" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-grey-500" />
                    )}
                  </button>
                  
                  {expandedSections.includes(section.id) && (
                    <div className="px-6 pb-4">
                      <div className="space-y-4">
                        {section.questions.map((qa, index) => (
                          <div key={index} className="border-l-4 border-primary-200 pl-4">
                            <h4 className="font-medium text-grey-900 mb-2">{qa.q}</h4>
                            <p className="text-grey-600 leading-relaxed">{qa.a}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {filteredSections.length === 0 && searchQuery && (
              <div className="text-center py-12">
                <p className="text-grey-600">No results found for "{searchQuery}". Try a different search term or contact support.</p>
              </div>
            )}
          </div>

          {/* Contact Support Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-grey-200 p-6 sticky top-6">
              <h3 className="text-lg font-semibold text-grey-900 mb-4">Still need help?</h3>
              <p className="text-grey-600 mb-6">
                Can't find what you're looking for? Our support team is here to help.
              </p>
              
              <div className="space-y-4">
                <a
                  href="#"
                  className="w-full bg-primary-500 hover:bg-primary-600 text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  Start Live Chat
                </a>
                
                <a
                  href="mailto:support@jobzworld.com"
                  className="w-full bg-grey-100 hover:bg-grey-200 text-grey-700 px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  Email Support
                </a>
                
                <a
                  href="tel:+1-555-123-4567"
                  className="w-full bg-grey-100 hover:bg-grey-200 text-grey-700 px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4" />
                  Call Support
                </a>
              </div>
              
              <div className="mt-6 pt-6 border-t border-grey-200">
                <h4 className="font-medium text-grey-900 mb-2">Support Hours</h4>
                <p className="text-sm text-grey-600">
                  Monday - Friday: 9:00 AM - 6:00 PM EST<br />
                  Saturday: 10:00 AM - 4:00 PM EST<br />
                  Sunday: Closed
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
