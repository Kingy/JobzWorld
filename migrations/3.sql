
-- Job postings table
CREATE TABLE job_postings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  company_id INTEGER NOT NULL,
  job_title TEXT NOT NULL,
  department TEXT,
  employment_type TEXT NOT NULL, -- 'full-time', 'part-time', 'contract', 'internship'
  working_model TEXT NOT NULL, -- 'remote', 'hybrid', 'onsite'
  location TEXT,
  salary_min INTEGER,
  salary_max INTEGER,
  salary_currency TEXT DEFAULT 'USD',
  experience_level TEXT,
  requirements TEXT, -- JSON array of requirements
  responsibilities TEXT, -- JSON array of responsibilities
  benefits TEXT, -- JSON array of benefits
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_job_postings_company_id ON job_postings(company_id);
CREATE INDEX idx_job_postings_active ON job_postings(is_active);
CREATE INDEX idx_job_postings_employment_type ON job_postings(employment_type);
