
-- Candidate profiles table
CREATE TABLE candidate_profiles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  full_name TEXT NOT NULL,
  location TEXT,
  has_work_authorization BOOLEAN DEFAULT FALSE,
  languages TEXT, -- JSON array of languages
  years_experience INTEGER DEFAULT 0,
  target_job_titles TEXT, -- JSON array of job titles
  preferred_industries TEXT, -- JSON array of industries
  working_model TEXT, -- 'remote', 'hybrid', 'onsite'
  salary_min INTEGER,
  salary_max INTEGER,
  salary_currency TEXT DEFAULT 'USD',
  is_willing_to_relocate BOOLEAN DEFAULT FALSE,
  skills TEXT, -- JSON array of skills with proficiency
  achievements TEXT,
  has_consented_ai_analysis BOOLEAN DEFAULT FALSE,
  is_profile_complete BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_candidate_profiles_user_id ON candidate_profiles(user_id);
CREATE INDEX idx_candidate_profiles_complete ON candidate_profiles(is_profile_complete);
CREATE INDEX idx_candidate_profiles_working_model ON candidate_profiles(working_model);
