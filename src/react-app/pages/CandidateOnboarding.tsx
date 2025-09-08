import { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Stepper from '@/react-app/components/Stepper';
import VideoRecorder from '@/react-app/components/VideoRecorder';

interface CandidateData {
  // Step 1 - Basics
  name: string;
  email: string;
  location: string;
  workAuthorisation: boolean;
  languages: string[];
  yearsExperience: number;
  
  // Step 2 - Ideal Role
  targetJobTitles: string[];
  preferredIndustries: string[];
  workingModel: string;
  salaryRange: { min: number; max: number; currency: string };
  willingToRelocate: boolean;
  
  // Step 3 - Skills
  skills: Array<{ name: string; proficiency: string }>;
  achievements: string;
  
  // Step 4 - Video
  videoAnswers: Array<{ question: string; duration: number; status: string }>;
  
  // Step 5 - Review
  consentGiven: boolean;
}

const STEPS = ['Basics', 'Ideal Role', 'Skills & Tools', 'Video Q&A', 'Review & Consent'];

const PLAN_LIMITS = {
  Basic: { reRecords: 1 },
  Plus: { reRecords: 3 },
  Pro: { reRecords: -1 } // unlimited
};

export default function CandidateOnboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const [planType] = useState<keyof typeof PLAN_LIMITS>('Basic');
  const [profileId, setProfileId] = useState<number | null>(null);
  const [interviewQuestions, setInterviewQuestions] = useState<string[]>([]);
  const [candidateData, setCandidateData] = useState<CandidateData>({
    name: '',
    email: '',
    location: '',
    workAuthorisation: false,
    languages: [],
    yearsExperience: 0,
    targetJobTitles: [],
    preferredIndustries: [],
    workingModel: 'remote',
    salaryRange: { min: 30000, max: 60000, currency: 'USD' },
    willingToRelocate: false,
    skills: [],
    achievements: '',
    videoAnswers: [],
    consentGiven: false
  });

  const handleNext = async () => {
    if (currentStep === 2 && candidateData.targetJobTitles.length > 0) {
      // Fetch interview questions based on selected job titles
      try {
        const response = await fetch(`/api/questions/${candidateData.targetJobTitles.join(',')}`);
        const data = await response.json();
        setInterviewQuestions(data.questions || []);
      } catch (error) {
        console.error('Error fetching questions:', error);
        // Fallback questions
        setInterviewQuestions([
          "Tell us about yourself and your professional background.",
          "What motivates you in your career and what are you looking for in your next role?",
          "Describe a challenging situation you faced at work and how you handled it.",
          "Where do you see yourself in 5 years?"
        ]);
      }
    }
    
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateData = (field: keyof CandidateData, value: any) => {
    setCandidateData(prev => ({ ...prev, [field]: value }));
  };

  const handleCompleteProfile = async () => {
    try {
      // Create candidate profile
      const response = await fetch('/api/candidates/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 1, // In real app, get from auth context
          fullName: candidateData.name,
          location: candidateData.location,
          hasWorkAuthorization: candidateData.workAuthorisation,
          languages: candidateData.languages,
          yearsExperience: candidateData.yearsExperience,
          targetJobTitles: candidateData.targetJobTitles,
          preferredIndustries: candidateData.preferredIndustries,
          workingModel: candidateData.workingModel,
          salaryMin: candidateData.salaryRange.min,
          salaryMax: candidateData.salaryRange.max,
          salaryCurrency: candidateData.salaryRange.currency,
          isWillingToRelocate: candidateData.willingToRelocate,
          skills: candidateData.skills,
          achievements: candidateData.achievements,
          hasConsentedAiAnalysis: candidateData.consentGiven
        })
      });

      if (response.ok) {
        const result = await response.json();
        setProfileId(result.id);
        
        // Mark profile as complete
        await fetch(`/api/candidates/profile/${result.id}/complete`, {
          method: 'PUT'
        });
        
        alert('Profile completed successfully! You can now start receiving job matches.');
      } else {
        throw new Error('Failed to create profile');
      }
    } catch (error) {
      console.error('Error completing profile:', error);
      alert('There was an error completing your profile. Please try again.');
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <BasicsStep data={candidateData} updateData={updateData} />;
      case 2:
        return <IdealRoleStep data={candidateData} updateData={updateData} />;
      case 3:
        return <SkillsStep data={candidateData} updateData={updateData} />;
      case 4:
        return <VideoStep data={candidateData} updateData={updateData} planType={planType} questions={interviewQuestions} profileId={profileId} />;
      case 5:
        return <ReviewStep data={candidateData} updateData={updateData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-grey-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm border border-grey-200 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-grey-900 mb-2">Create Your Candidate Profile</h1>
            <p className="text-grey-600">
              Complete your profile to start receiving personalised job matches through our AI-powered platform.
            </p>
          </div>

          <Stepper steps={STEPS} currentStep={currentStep} />

          <div className="mt-8">
            {renderStepContent()}
          </div>

          <div className="flex justify-between mt-8 pt-6 border-t border-grey-200">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-medium ${
                currentStep === 1
                  ? 'text-grey-400 cursor-not-allowed'
                  : 'text-grey-600 hover:text-grey-900 hover:bg-grey-100'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </button>

            <button
              onClick={currentStep === STEPS.length ? handleCompleteProfile : handleNext}
              disabled={currentStep === STEPS.length && !candidateData.consentGiven}
              className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-medium ${
                currentStep === STEPS.length
                  ? candidateData.consentGiven 
                    ? 'bg-green-500 hover:bg-green-600 text-white'
                    : 'bg-grey-300 text-grey-500 cursor-not-allowed'
                  : 'bg-primary-500 hover:bg-primary-600 text-white'
              }`}
            >
              {currentStep === STEPS.length ? 'Complete Profile' : 'Next'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Step Components
function BasicsStep({ data, updateData }: { data: CandidateData; updateData: Function }) {
  const availableLanguages = ['English', 'Spanish', 'French', 'German', 'Mandarin', 'Arabic', 'Portuguese', 'Japanese'];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-grey-900">Basic Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-grey-700 mb-2">Full Name</label>
          <input
            type="text"
            value={data.name}
            onChange={(e) => updateData('name', e.target.value)}
            className="w-full px-3 py-2 border border-grey-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="Your full name"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-grey-700 mb-2">Email Address</label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => updateData('email', e.target.value)}
            className="w-full px-3 py-2 border border-grey-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="your.email@example.com"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-grey-700 mb-2">Location</label>
        <input
          type="text"
          value={data.location}
          onChange={(e) => updateData('location', e.target.value)}
          className="w-full px-3 py-2 border border-grey-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          placeholder="City, Country"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-grey-700 mb-2">Years of Experience</label>
        <select
          value={data.yearsExperience}
          onChange={(e) => updateData('yearsExperience', parseInt(e.target.value))}
          className="w-full px-3 py-2 border border-grey-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        >
          <option value={0}>Less than 1 year</option>
          <option value={1}>1-2 years</option>
          <option value={3}>3-5 years</option>
          <option value={6}>6-10 years</option>
          <option value={11}>10+ years</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-grey-700 mb-2">Languages</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {availableLanguages.map((language) => (
            <label key={language} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={data.languages.includes(language)}
                onChange={(e) => {
                  if (e.target.checked) {
                    updateData('languages', [...data.languages, language]);
                  } else {
                    updateData('languages', data.languages.filter(l => l !== language));
                  }
                }}
                className="rounded text-primary-500 focus:ring-primary-500"
              />
              <span className="text-sm text-grey-700">{language}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={data.workAuthorisation}
            onChange={(e) => updateData('workAuthorisation', e.target.checked)}
            className="rounded text-primary-500 focus:ring-primary-500"
          />
          <span className="text-sm text-grey-700">I have authorisation to work in this location</span>
        </label>
      </div>
    </div>
  );
}

function IdealRoleStep({ data, updateData }: { data: CandidateData; updateData: Function }) {
  const jobTitles = ['Customer Success Associate', 'Sales Representative', 'Account Manager', 'Business Development', 'Customer Support'];
  const industries = ['Technology', 'E-commerce', 'Healthcare', 'Finance', 'Education', 'Retail', 'Telecommunications'];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-grey-900">Your Ideal Role</h2>
      
      <div>
        <label className="block text-sm font-medium text-grey-700 mb-2">Target Job Titles</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {jobTitles.map((title) => (
            <label key={title} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={data.targetJobTitles.includes(title)}
                onChange={(e) => {
                  if (e.target.checked) {
                    updateData('targetJobTitles', [...data.targetJobTitles, title]);
                  } else {
                    updateData('targetJobTitles', data.targetJobTitles.filter(t => t !== title));
                  }
                }}
                className="rounded text-primary-500 focus:ring-primary-500"
              />
              <span className="text-sm text-grey-700">{title}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-grey-700 mb-2">Preferred Industries</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {industries.map((industry) => (
            <label key={industry} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={data.preferredIndustries.includes(industry)}
                onChange={(e) => {
                  if (e.target.checked) {
                    updateData('preferredIndustries', [...data.preferredIndustries, industry]);
                  } else {
                    updateData('preferredIndustries', data.preferredIndustries.filter(i => i !== industry));
                  }
                }}
                className="rounded text-primary-500 focus:ring-primary-500"
              />
              <span className="text-sm text-grey-700">{industry}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-grey-700 mb-2">Preferred Working Model</label>
        <div className="grid grid-cols-3 gap-4">
          {['remote', 'hybrid', 'onsite'].map((model) => (
            <label key={model} className="flex items-center gap-2">
              <input
                type="radio"
                name="workingModel"
                value={model}
                checked={data.workingModel === model}
                onChange={(e) => updateData('workingModel', e.target.value)}
                className="text-primary-500 focus:ring-primary-500"
              />
              <span className="text-sm text-grey-700 capitalize">{model}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-grey-700 mb-2">Target Salary Range (USD)</label>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <input
              type="number"
              value={data.salaryRange.min}
              onChange={(e) => updateData('salaryRange', { ...data.salaryRange, min: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-grey-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Minimum"
            />
          </div>
          <div>
            <input
              type="number"
              value={data.salaryRange.max}
              onChange={(e) => updateData('salaryRange', { ...data.salaryRange, max: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-grey-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Maximum"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={data.willingToRelocate}
            onChange={(e) => updateData('willingToRelocate', e.target.checked)}
            className="rounded text-primary-500 focus:ring-primary-500"
          />
          <span className="text-sm text-grey-700">I'm willing to relocate for the right opportunity</span>
        </label>
      </div>
    </div>
  );
}

function SkillsStep({ data, updateData }: { data: CandidateData; updateData: Function }) {
  const availableSkills = ['Customer Service', 'CRM', 'Sales', 'Communication', 'Problem Solving', 'Negotiation', 'HubSpot', 'Salesforce', 'Zendesk', 'Microsoft Office'];

  const addSkill = (skillName: string, proficiency: string) => {
    const newSkills = [...data.skills.filter(s => s.name !== skillName), { name: skillName, proficiency }];
    updateData('skills', newSkills);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-grey-900">Skills & Tools</h2>
      
      <div>
        <label className="block text-sm font-medium text-grey-700 mb-4">Select your skills and proficiency level</label>
        <div className="space-y-4">
          {availableSkills.map((skill) => {
            const currentSkill = data.skills.find(s => s.name === skill);
            return (
              <div key={skill} className="flex items-center justify-between p-3 border border-grey-200 rounded-lg">
                <span className="text-sm font-medium text-grey-700">{skill}</span>
                <select
                  value={currentSkill?.proficiency || 'none'}
                  onChange={(e) => {
                    if (e.target.value === 'none') {
                      updateData('skills', data.skills.filter(s => s.name !== skill));
                    } else {
                      addSkill(skill, e.target.value);
                    }
                  }}
                  className="text-sm border border-grey-300 rounded px-2 py-1 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="none">Not selected</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                  <option value="expert">Expert</option>
                </select>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-grey-700 mb-2">Notable Achievements</label>
        <textarea
          value={data.achievements}
          onChange={(e) => updateData('achievements', e.target.value)}
          className="w-full px-3 py-2 border border-grey-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          rows={4}
          placeholder="Describe your key accomplishments, awards, or significant projects..."
        />
      </div>
    </div>
  );
}

function VideoStep({ data, updateData, planType, questions, profileId }: { 
  data: CandidateData; 
  updateData: Function; 
  planType: keyof typeof PLAN_LIMITS;
  questions: string[];
  profileId: number | null;
}) {
  const reRecordsLeft = PLAN_LIMITS[planType].reRecords === -1 ? 999 : PLAN_LIMITS[planType].reRecords;
  const currentQuestionIndex = data.videoAnswers.length;

  const handleRecordingComplete = async (recording: { duration: number; status: string; videoBlob?: Blob }) => {
    const newAnswers = [...data.videoAnswers];
    newAnswers[currentQuestionIndex] = {
      question: questions[currentQuestionIndex],
      duration: recording.duration,
      status: recording.status
    };
    updateData('videoAnswers', newAnswers);

    // Upload video to server if blob is available
    if (recording.videoBlob && profileId) {
      try {
        // Convert blob to base64 for API
        const reader = new FileReader();
        reader.onloadend = async () => {
          const base64 = reader.result as string;
          
          await fetch('/api/videos/upload', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              candidateProfileId: profileId,
              questionText: questions[currentQuestionIndex],
              videoBlob: base64.split(',')[1], // Remove data:video/webm;base64, prefix
              durationSeconds: recording.duration,
              responseOrder: currentQuestionIndex + 1
            })
          });
        };
        reader.readAsDataURL(recording.videoBlob);
      } catch (error) {
        console.error('Error uploading video:', error);
      }
    }
  };

  if (currentQuestionIndex >= questions.length) {
    return (
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-grey-900">Video Q&A Complete</h2>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <p className="text-green-700">
            Great work! You've completed all video questions. Our AI will analyse your responses to help match you with relevant opportunities.
          </p>
        </div>
        
        <div className="space-y-3">
          <h3 className="font-medium text-grey-900">Your Video Answers:</h3>
          {data.videoAnswers.map((answer, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-grey-50 rounded-lg">
              <span className="text-sm text-grey-700">Question {index + 1}</span>
              <span className="text-sm text-grey-500">{Math.floor(answer.duration / 60)}:{(answer.duration % 60).toString().padStart(2, '0')}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-grey-900">Video Q&A</h2>
        <div className="text-sm text-grey-500">
          Question {currentQuestionIndex + 1} of {questions.length}
        </div>
      </div>
      
      <VideoRecorder
        question={questions[currentQuestionIndex]}
        timeLimit={90}
        onRecordingComplete={handleRecordingComplete}
        reRecordsLeft={reRecordsLeft}
        planName={planType}
        questionNumber={currentQuestionIndex + 1}
        totalQuestions={questions.length}
      />
    </div>
  );
}

function ReviewStep({ data, updateData }: { data: CandidateData; updateData: Function }) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-grey-900">Review & Consent</h2>
      
      <div className="bg-grey-50 rounded-lg p-6">
        <h3 className="font-medium text-grey-900 mb-4">Profile Summary</h3>
        <div className="space-y-2 text-sm">
          <p><span className="font-medium">Name:</span> {data.name}</p>
          <p><span className="font-medium">Location:</span> {data.location}</p>
          <p><span className="font-medium">Experience:</span> {data.yearsExperience} years</p>
          <p><span className="font-medium">Target Roles:</span> {data.targetJobTitles.join(', ')}</p>
          <p><span className="font-medium">Languages:</span> {data.languages.join(', ')}</p>
          <p><span className="font-medium">Skills:</span> {data.skills.map(s => s.name).join(', ')}</p>
          <p><span className="font-medium">Video Answers:</span> {data.videoAnswers.length} completed</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="border border-grey-200 rounded-lg p-4">
          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={data.consentGiven}
              onChange={(e) => updateData('consentGiven', e.target.checked)}
              className="mt-1 rounded text-primary-500 focus:ring-primary-500"
            />
            <div className="text-sm text-grey-700">
              <p className="font-medium mb-1">AI Analysis Consent</p>
              <p>I consent to Jobzworld using AI to analyse my profile information and video responses to match me with relevant job opportunities. I understand that:</p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-grey-600">
                <li>My profile will only be shared with employers who express interest</li>
                <li>I can update or delete my information at any time</li>
                <li>AI scoring is assistive and based on skills, experience, and communication style</li>
                <li>All data processing complies with applicable privacy regulations</li>
              </ul>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}
