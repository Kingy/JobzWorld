import { useState } from 'react';
import { ArrowLeft, ArrowRight, MapPin, DollarSign, Clock, Camera, Play } from 'lucide-react';
import Stepper from '@/react-app/components/Stepper';
import { apiCall } from '@/config/api';

interface CompanyData {
  // Step 1 - Company Info
  companyName: string;
  industry: string;
  companySize: string;
  location: string;
  website: string;
  description: string;
  
  // Step 2 - Job Details
  jobTitle: string;
  department: string;
  employmentType: string;
  workingModel: string;
  salaryRange: { min: number; max: number; currency: string };
  experience: string;
  requirements: string[];
  responsibilities: string[];
  benefits: string[];
  
  // Step 3 - Company Culture
  companyValues: string[];
  workCulture: string;
  videoIntroComplete: boolean;
  
  // Step 4 - Review & Registration
  agreedToTerms: boolean;
  email: string;
  password: string;
  confirmPassword: string;
  fullName: string;
}

const STEPS = ['Company Info', 'Job Details', 'Company Culture', 'Complete & Register'];

// API Configuration

export default function EmployerOnboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const [companyId, setCompanyId] = useState<number | null>(null);
  const [jobId, setJobId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [companyData, setCompanyData] = useState<CompanyData>({
    companyName: '',
    industry: '',
    companySize: '',
    location: '',
    website: '',
    description: '',
    jobTitle: '',
    department: '',
    employmentType: 'full-time',
    workingModel: 'remote',
    salaryRange: { min: 50000, max: 80000, currency: 'USD' },
    experience: '',
    requirements: [],
    responsibilities: [],
    benefits: [],
    companyValues: [],
    workCulture: '',
    videoIntroComplete: false,
    agreedToTerms: false,
    email: '',
    password: '',
    confirmPassword: '',
    fullName: ''
  });

  const handleNext = async () => {
    setError(null);
    setLoading(true);

    try {
      if (currentStep === 1) {
        // Create initial company profile after step 1
        await createInitialCompany();
      } else if (currentStep === 2) {
        // Create job posting after step 2
        await createJobPosting();
      } else if (currentStep === 3) {
        // Update company culture after step 3
        await updateCompanyCulture();
      }
      
      if (currentStep < STEPS.length) {
        setCurrentStep(currentStep + 1);
      }
    } catch (err) {
      console.error('Error in handleNext:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const createInitialCompany = async () => {
    try {
      const companyProfileData = {
        company_name: companyData.companyName,
        industry: companyData.industry,
        company_size: companyData.companySize,
        location: companyData.location,
        website: companyData.website,
        description: companyData.description,
      };

      const response = await apiCall('/employers/profile', {
        method: 'POST',
        body: JSON.stringify(companyProfileData),
      });

      if (response.success) {
        setCompanyId(response.data.id);
        console.log('Company created with ID:', response.data.id);
      }
    } catch (error) {
      console.error('Error creating company:', error);
      throw error;
    }
  };

  const createJobPosting = async () => {
    if (!companyId) {
      throw new Error('Company ID not found');
    }

    try {
      const jobData = {
        job_title: companyData.jobTitle,
        department: companyData.department,
        employment_type: companyData.employmentType,
        working_model: companyData.workingModel,
        location: companyData.location,
        salary_min: companyData.salaryRange.min,
        salary_max: companyData.salaryRange.max,
        salary_currency: companyData.salaryRange.currency,
        experience_level: companyData.experience,
        requirements: companyData.requirements,
        responsibilities: companyData.responsibilities,
        benefits: companyData.benefits,
      };

      const response = await apiCall(`/employers/profile/${companyId}/job`, {
        method: 'POST',
        body: JSON.stringify(jobData),
      });

      if (response.success) {
        setJobId(response.data.id);
        console.log('Job created with ID:', response.data.id);
      }
    } catch (error) {
      console.error('Error creating job:', error);
      throw error;
    }
  };

  const updateCompanyCulture = async () => {
    if (!companyId) {
      throw new Error('Company ID not found');
    }

    try {
      const cultureData = {
        company_values: companyData.companyValues,
        work_culture: companyData.workCulture,
        has_video_intro: companyData.videoIntroComplete,
      };

      await apiCall(`/employers/profile/${companyId}`, {
        method: 'PUT',
        body: JSON.stringify(cultureData),
      });
    } catch (error) {
      console.error('Error updating company culture:', error);
      throw error;
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateData = async (field: keyof CompanyData, value: any) => {
    setCompanyData(prev => ({ ...prev, [field]: value }));
    
    // Auto-save company updates if company exists and we're past step 1
    if (companyId && currentStep > 1 && !['password', 'confirmPassword', 'email', 'fullName'].includes(field)) {
      try {
        await updateCompanyProfile({ [field]: value });
      } catch (error) {
        console.error('Error auto-saving company:', error);
        // Don't throw error for auto-save, just log it
      }
    }
  };

  const updateCompanyProfile = async (updates: any) => {
    if (!companyId) return;

    // Transform frontend field names to backend field names
    const backendUpdates: any = {};
    
    if (updates.companyName) backendUpdates.company_name = updates.companyName;
    if (updates.industry) backendUpdates.industry = updates.industry;
    if (updates.companySize) backendUpdates.company_size = updates.companySize;
    if (updates.location) backendUpdates.location = updates.location;
    if (updates.website) backendUpdates.website = updates.website;
    if (updates.description) backendUpdates.description = updates.description;
    if (updates.companyValues) backendUpdates.company_values = updates.companyValues;
    if (updates.workCulture) backendUpdates.work_culture = updates.workCulture;
    if (updates.videoIntroComplete !== undefined) backendUpdates.has_video_intro = updates.videoIntroComplete;

    await apiCall(`/employers/profile/${companyId}`, {
      method: 'PUT',
      body: JSON.stringify(backendUpdates),
    });
  };

  const handleCompleteOnboarding = async () => {
    setLoading(true);
    setError(null);

    try {
      if (!companyId) {
        throw new Error('Company ID not found. Please try again.');
      }

      // Validate passwords match
      if (companyData.password !== companyData.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      if (companyData.password.length < 8) {
        throw new Error('Password must be at least 8 characters long');
      }

      // Publish company and activate job postings
      await apiCall(`/employers/profile/${companyId}/publish`, {
        method: 'PUT'
      });

      // Claim the company profile and create user account
      const claimResponse = await apiCall(`/employers/profile/${companyId}/claim`, {
        method: 'POST',
        body: JSON.stringify({
          email: companyData.email,
          password: companyData.password,
          full_name: companyData.fullName
        })
      });

      if (claimResponse.success) {
        // Store auth tokens
        localStorage.setItem('authToken', claimResponse.data.tokens.accessToken);
        localStorage.setItem('refreshToken', claimResponse.data.tokens.refreshToken);
        
        alert('Company profile created successfully! Your job posting is now live and will start receiving candidate matches.');
        
        // Redirect to employer dashboard
        window.location.href = '/employer/dashboard';
      }
      
    } catch (error) {
      console.error('Error completing onboarding:', error);
      setError(error instanceof Error ? error.message : 'There was an error completing your company profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <CompanyInfoStep data={companyData} updateData={updateData} />;
      case 2:
        return <JobDetailsStep data={companyData} updateData={updateData} />;
      case 3:
        return <CompanyCultureStep data={companyData} updateData={updateData} />;
      case 4:
        return <CompleteStep data={companyData} updateData={updateData} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-grey-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm border border-grey-200 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-grey-900 mb-2">Create Your Company Profile</h1>
            <p className="text-grey-600">
              Set up your company profile and create your first job posting to start connecting with qualified candidates.
            </p>
          </div>

          <Stepper steps={STEPS} currentStep={currentStep} />

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

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
              onClick={currentStep === STEPS.length ? handleCompleteOnboarding : handleNext}
              disabled={loading || (currentStep === STEPS.length && (!companyData.agreedToTerms || !companyData.email || !companyData.password))}
              className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-medium ${
                loading 
                  ? 'bg-grey-300 text-grey-500 cursor-not-allowed'
                  : currentStep === STEPS.length
                  ? (companyData.agreedToTerms && companyData.email && companyData.password)
                    ? 'bg-green-500 hover:bg-green-600 text-white'
                    : 'bg-grey-300 text-grey-500 cursor-not-allowed'
                  : 'bg-secondary-500 hover:bg-secondary-600 text-white'
              }`}
            >
              {loading ? 'Loading...' : currentStep === STEPS.length ? 'Create Account & Publish Job' : 'Next'}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CompanyInfoStep({ data, updateData }: { data: CompanyData; updateData: Function }) {
  const industries = [
    'Technology', 'Healthcare', 'Finance', 'E-commerce', 'Education', 
    'Manufacturing', 'Retail', 'Telecommunications', 'Media', 'Consulting'
  ];
  
  const companySizes = [
    'Startup (1-10)', 'Small (11-50)', 'Medium (51-200)', 
    'Large (201-1000)', 'Enterprise (1000+)'
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-grey-900">Company Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-grey-700 mb-2">Company Name *</label>
          <input
            type="text"
            value={data.companyName}
            onChange={(e) => updateData('companyName', e.target.value)}
            className="w-full px-3 py-2 border border-grey-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500"
            placeholder="Your company name"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-grey-700 mb-2">Website</label>
          <input
            type="url"
            value={data.website}
            onChange={(e) => updateData('website', e.target.value)}
            className="w-full px-3 py-2 border border-grey-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500"
            placeholder="https://yourcompany.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-grey-700 mb-2">Industry</label>
          <select
            value={data.industry}
            onChange={(e) => updateData('industry', e.target.value)}
            className="w-full px-3 py-2 border border-grey-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500"
          >
            <option value="">Select industry</option>
            {industries.map(industry => (
              <option key={industry} value={industry}>{industry}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-grey-700 mb-2">Company Size</label>
          <select
            value={data.companySize}
            onChange={(e) => updateData('companySize', e.target.value)}
            className="w-full px-3 py-2 border border-grey-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500"
          >
            <option value="">Select size</option>
            {companySizes.map(size => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-grey-700 mb-2">Company Location</label>
        <div className="relative">
          <MapPin className="absolute left-3 top-3 w-4 h-4 text-grey-400" />
          <input
            type="text"
            value={data.location}
            onChange={(e) => updateData('location', e.target.value)}
            className="w-full pl-10 pr-3 py-2 border border-grey-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500"
            placeholder="City, Country"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-grey-700 mb-2">Company Description</label>
        <textarea
          value={data.description}
          onChange={(e) => updateData('description', e.target.value)}
          className="w-full px-3 py-2 border border-grey-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500"
          rows={4}
          placeholder="Describe your company's mission, values, and what makes it unique..."
        />
      </div>
    </div>
  );
}

function JobDetailsStep({ data, updateData }: { data: CompanyData; updateData: Function }) {
  const departments = [
    'Sales', 'Customer Success', 'Marketing', 'Engineering', 'Product', 
    'Design', 'Operations', 'HR', 'Finance', 'Other'
  ];
  
  const employmentTypes = ['full-time', 'part-time', 'contract', 'internship'];
  const workingModels = ['remote', 'hybrid', 'onsite'];
  const experienceLevels = ['Entry Level', 'Mid Level', 'Senior Level', 'Executive'];

  const commonRequirements = [
    'Bachelor\'s degree or equivalent experience',
    'Excellent communication skills',
    'Team collaboration experience',
    'Problem-solving abilities',
    'Attention to detail',
    'Customer service orientation'
  ];

  const commonBenefits = [
    'Health insurance', 'Dental insurance', 'Vision insurance',
    'Flexible working hours', 'Remote work options', 'Professional development',
    'Paid time off', 'Retirement plans', 'Stock options',
    'Gym membership', 'Mental health support'
  ];

  const toggleArrayItem = (array: string[], item: string, field: keyof CompanyData) => {
    const newArray = array.includes(item) 
      ? array.filter(i => i !== item)
      : [...array, item];
    updateData(field, newArray);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-grey-900">Job Details</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-grey-700 mb-2">Job Title *</label>
          <input
            type="text"
            value={data.jobTitle}
            onChange={(e) => updateData('jobTitle', e.target.value)}
            className="w-full px-3 py-2 border border-grey-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500"
            placeholder="e.g. Customer Success Manager"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-grey-700 mb-2">Department</label>
          <select
            value={data.department}
            onChange={(e) => updateData('department', e.target.value)}
            className="w-full px-3 py-2 border border-grey-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500"
          >
            <option value="">Select department</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-grey-700 mb-2">Employment Type</label>
          <select
            value={data.employmentType}
            onChange={(e) => updateData('employmentType', e.target.value)}
            className="w-full px-3 py-2 border border-grey-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500"
          >
            {employmentTypes.map(type => (
              <option key={type} value={type} className="capitalize">{type.replace('-', ' ')}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-grey-700 mb-2">Working Model</label>
          <select
            value={data.workingModel}
            onChange={(e) => updateData('workingModel', e.target.value)}
            className="w-full px-3 py-2 border border-grey-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500"
          >
            {workingModels.map(model => (
              <option key={model} value={model} className="capitalize">{model}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-grey-700 mb-2">Experience Level</label>
          <select
            value={data.experience}
            onChange={(e) => updateData('experience', e.target.value)}
            className="w-full px-3 py-2 border border-grey-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500"
          >
            <option value="">Select level</option>
            {experienceLevels.map(level => (
              <option key={level} value={level}>{level}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-grey-700 mb-2">Salary Range (USD)</label>
        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <DollarSign className="absolute left-3 top-3 w-4 h-4 text-grey-400" />
            <input
              type="number"
              value={data.salaryRange.min}
              onChange={(e) => updateData('salaryRange', { ...data.salaryRange, min: parseInt(e.target.value) })}
              className="w-full pl-10 pr-3 py-2 border border-grey-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500"
              placeholder="Minimum"
            />
          </div>
          <div className="relative">
            <DollarSign className="absolute left-3 top-3 w-4 h-4 text-grey-400" />
            <input
              type="number"
              value={data.salaryRange.max}
              onChange={(e) => updateData('salaryRange', { ...data.salaryRange, max: parseInt(e.target.value) })}
              className="w-full pl-10 pr-3 py-2 border border-grey-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500"
              placeholder="Maximum"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-grey-700 mb-2">Requirements</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
          {commonRequirements.map(req => (
            <label key={req} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={data.requirements.includes(req)}
                onChange={() => toggleArrayItem(data.requirements, req, 'requirements')}
                className="rounded text-secondary-500 focus:ring-secondary-500"
              />
              <span className="text-sm text-grey-700">{req}</span>
            </label>
          ))}
        </div>
        <textarea
          value={data.requirements.filter(r => !commonRequirements.includes(r)).join('\n')}
          onChange={(e) => {
            const customReqs = e.target.value.split('\n').filter(r => r.trim());
            const allReqs = [...data.requirements.filter(r => commonRequirements.includes(r)), ...customReqs];
            updateData('requirements', allReqs);
          }}
          className="w-full px-3 py-2 border border-grey-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500"
          rows={2}
          placeholder="Add custom requirements (one per line)..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-grey-700 mb-2">Benefits</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {commonBenefits.map(benefit => (
            <label key={benefit} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={data.benefits.includes(benefit)}
                onChange={() => toggleArrayItem(data.benefits, benefit, 'benefits')}
                className="rounded text-secondary-500 focus:ring-secondary-500"
              />
              <span className="text-sm text-grey-700">{benefit}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

function CompanyCultureStep({ data, updateData }: { data: CompanyData; updateData: Function }) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);

  const companyValues = [
    'Innovation', 'Collaboration', 'Transparency', 'Diversity & Inclusion',
    'Work-Life Balance', 'Customer Focus', 'Excellence', 'Integrity',
    'Growth Mindset', 'Social Responsibility'
  ];

  const toggleValue = (value: string) => {
    const newValues = data.companyValues.includes(value)
      ? data.companyValues.filter(v => v !== value)
      : [...data.companyValues, value];
    updateData('companyValues', newValues);
  };

  const handleStartRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    
    const timer = setInterval(() => {
      setRecordingTime(prev => {
        if (prev >= 120) { // 2 minute limit
          clearInterval(timer);
          handleStopRecording();
          return 120;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    updateData('videoIntroComplete', true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-grey-900">Company Culture & Values</h2>
      
      <div>
        <label className="block text-sm font-medium text-grey-700 mb-2">Company Values</label>
        <p className="text-sm text-grey-600 mb-4">Select the values that best represent your company culture</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {companyValues.map(value => (
            <label key={value} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={data.companyValues.includes(value)}
                onChange={() => toggleValue(value)}
                className="rounded text-secondary-500 focus:ring-secondary-500"
              />
              <span className="text-sm text-grey-700">{value}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-grey-700 mb-2">Work Culture Description</label>
        <textarea
          value={data.workCulture}
          onChange={(e) => updateData('workCulture', e.target.value)}
          className="w-full px-3 py-2 border border-grey-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500"
          rows={4}
          placeholder="Describe your work environment, team dynamics, and what makes working at your company special..."
        />
      </div>

      <div className="bg-grey-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-grey-900 mb-4">Company Introduction Video (Optional)</h3>
        <p className="text-grey-600 mb-4">
          Record a 2-minute video introducing your company to potential candidates. Share your mission, culture, and what makes your team special.
        </p>
        
        {/* Video Recording Interface */}
        <div className="relative bg-grey-900 rounded-lg overflow-hidden mb-4" style={{ aspectRatio: '16/9' }}>
          <div className="absolute inset-0 flex items-center justify-center">
            {isRecording ? (
              <div className="text-center text-white">
                <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse mx-auto mb-2"></div>
                <div className="text-2xl font-mono">{formatTime(recordingTime)}</div>
                <p className="text-sm opacity-70">Recording company introduction...</p>
              </div>
            ) : data.videoIntroComplete ? (
              <div className="text-center text-white">
                <Play className="w-16 h-16 mx-auto mb-2 opacity-80" />
                <p>Company Introduction Complete</p>
                <p className="text-sm opacity-70">Duration: {formatTime(recordingTime)}</p>
              </div>
            ) : (
              <div className="text-center text-white">
                <Camera className="w-16 h-16 mx-auto mb-2 opacity-50" />
                <p className="opacity-70">Camera preview will appear here</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-sm text-grey-500">
            <Clock className="w-4 h-4 inline mr-1" />
            Time limit: 2:00
          </div>
          
          {!data.videoIntroComplete && !isRecording && (
            <button
              onClick={handleStartRecording}
              className="bg-secondary-500 hover:bg-secondary-600 text-white px-6 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
            >
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              Start Recording
            </button>
          )}
          
          {isRecording && (
            <button
              onClick={handleStopRecording}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg text-sm font-medium"
            >
              Stop Recording
            </button>
          )}
          
          {data.videoIntroComplete && (
            <button
              onClick={() => {
                updateData('videoIntroComplete', false);
                setRecordingTime(0);
              }}
              className="bg-grey-500 hover:bg-grey-600 text-white px-6 py-2 rounded-lg text-sm font-medium"
            >
              Re-record
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function CompleteStep({ data, updateData }: { data: CompanyData; updateData: Function }) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-grey-900">Complete & Register</h2>
      
      <div className="bg-grey-50 rounded-lg p-6">
        <h3 className="font-medium text-grey-900 mb-4">Company Profile Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div className="space-y-2">
            <p><span className="font-medium">Company:</span> {data.companyName}</p>
            <p><span className="font-medium">Industry:</span> {data.industry}</p>
            <p><span className="font-medium">Size:</span> {data.companySize}</p>
            <p><span className="font-medium">Location:</span> {data.location}</p>
            <p><span className="font-medium">Website:</span> {data.website}</p>
          </div>
          <div className="space-y-2">
            <p><span className="font-medium">Job Title:</span> {data.jobTitle}</p>
            <p><span className="font-medium">Department:</span> {data.department}</p>
            <p><span className="font-medium">Type:</span> {data.employmentType}</p>
            <p><span className="font-medium">Working Model:</span> {data.workingModel}</p>
            <p><span className="font-medium">Salary:</span> ${data.salaryRange.min.toLocaleString()} - ${data.salaryRange.max.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Account Creation Section */}
      <div className="bg-blue-50 rounded-lg p-6">
        <h3 className="font-medium text-grey-900 mb-4">Create Your Account</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-grey-700 mb-2">Full Name *</label>
            <input
              type="text"
              value={data.fullName}
              onChange={(e) => updateData('fullName', e.target.value)}
              className="w-full px-3 py-2 border border-grey-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500"
              placeholder="Your full name"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-grey-700 mb-2">Email Address *</label>
            <input
              type="email"
              value={data.email}
              onChange={(e) => updateData('email', e.target.value)}
              className="w-full px-3 py-2 border border-grey-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500"
              placeholder="your.email@company.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-grey-700 mb-2">Password *</label>
            <input
              type="password"
              value={data.password}
              onChange={(e) => updateData('password', e.target.value)}
              className="w-full px-3 py-2 border border-grey-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500"
              placeholder="Create a secure password"
              required
            />
            <p className="text-xs text-grey-500 mt-1">Must be at least 8 characters with uppercase, lowercase, number, and special character</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-grey-700 mb-2">Confirm Password *</label>
            <input
              type="password"
              value={data.confirmPassword}
              onChange={(e) => updateData('confirmPassword', e.target.value)}
              className="w-full px-3 py-2 border border-grey-300 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-secondary-500"
              placeholder="Confirm your password"
              required
            />
            {data.password && data.confirmPassword && data.password !== data.confirmPassword && (
              <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
            )}
          </div>
        </div>
      </div>

      <div className="bg-grey-50 rounded-lg p-6">
        <h3 className="font-medium text-grey-900 mb-4">Job Requirements & Benefits</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div>
            <p className="font-medium mb-2">Requirements:</p>
            <ul className="list-disc list-inside space-y-1 text-grey-600">
              {data.requirements.slice(0, 5).map((req, index) => (
                <li key={index}>{req}</li>
              ))}
              {data.requirements.length > 5 && <li>... and {data.requirements.length - 5} more</li>}
            </ul>
          </div>
          <div>
            <p className="font-medium mb-2">Benefits:</p>
            <ul className="list-disc list-inside space-y-1 text-grey-600">
              {data.benefits.slice(0, 5).map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
              {data.benefits.length > 5 && <li>... and {data.benefits.length - 5} more</li>}
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-grey-50 rounded-lg p-6">
        <h3 className="font-medium text-grey-900 mb-4">Company Culture</h3>
        <div className="text-sm space-y-2">
          <p><span className="font-medium">Values:</span> {data.companyValues.join(', ')}</p>
          <p><span className="font-medium">Video Introduction:</span> {data.videoIntroComplete ? 'Complete' : 'Not recorded'}</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="border border-grey-200 rounded-lg p-4">
          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              checked={data.agreedToTerms}
              onChange={(e) => updateData('agreedToTerms', e.target.checked)}
              className="mt-1 rounded text-secondary-500 focus:ring-secondary-500"
            />
            <div className="text-sm text-grey-700">
              <p className="font-medium mb-1">Terms & Conditions</p>
              <p>I agree to Jobzworld's terms of service and understand that:</p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-grey-600">
                <li>Job postings will be reviewed and published within 24 hours</li>
                <li>Candidate profiles are shared only after mutual interest</li>
                <li>All communications are handled through the Jobzworld platform</li>
                <li>Billing begins after the first successful hire</li>
                <li>I agree to the Terms of Service and Privacy Policy</li>
              </ul>
            </div>
          </label>
        </div>
      </div>

      {data.agreedToTerms && data.email && data.password && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="font-medium text-green-800 mb-2">Ready to Launch!</h4>
          <p className="text-green-700 text-sm">
            Your job posting will be live and start receiving AI-matched candidate profiles immediately after account creation.
          </p>
        </div>
      )}
    </div>
  );
}