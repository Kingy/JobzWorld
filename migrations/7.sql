
-- AI matching scores table for tracking algorithm performance
CREATE TABLE ai_match_scores (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  job_posting_id INTEGER NOT NULL,
  candidate_profile_id INTEGER NOT NULL,
  overall_score REAL DEFAULT 0.0,
  skills_score REAL DEFAULT 0.0,
  experience_score REAL DEFAULT 0.0,
  culture_score REAL DEFAULT 0.0,
  video_score REAL DEFAULT 0.0,
  is_recommended BOOLEAN DEFAULT FALSE,
  calculated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_ai_match_scores_job_id ON ai_match_scores(job_posting_id);
CREATE INDEX idx_ai_match_scores_candidate_id ON ai_match_scores(candidate_profile_id);
CREATE INDEX idx_ai_match_scores_overall ON ai_match_scores(overall_score);
CREATE INDEX idx_ai_match_scores_recommended ON ai_match_scores(is_recommended);

-- Unique constraint for one score per job-candidate pair
CREATE UNIQUE INDEX idx_ai_match_scores_unique ON ai_match_scores(job_posting_id, candidate_profile_id);
