
-- Job applications/connections table
CREATE TABLE job_applications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  job_posting_id INTEGER NOT NULL,
  candidate_profile_id INTEGER NOT NULL,
  status TEXT DEFAULT 'pending', -- 'pending', 'employer_interested', 'candidate_interested', 'mutual_interest', 'interview_scheduled', 'hired', 'rejected'
  employer_notes TEXT,
  candidate_notes TEXT,
  applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_job_applications_job_id ON job_applications(job_posting_id);
CREATE INDEX idx_job_applications_candidate_id ON job_applications(candidate_profile_id);
CREATE INDEX idx_job_applications_status ON job_applications(status);

-- Unique constraint to prevent duplicate applications
CREATE UNIQUE INDEX idx_job_applications_unique ON job_applications(job_posting_id, candidate_profile_id);
