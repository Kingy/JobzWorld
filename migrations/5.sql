
-- Video responses table for candidate Q&A
CREATE TABLE video_responses (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  candidate_profile_id INTEGER NOT NULL,
  question_text TEXT NOT NULL,
  video_url TEXT,
  duration_seconds INTEGER DEFAULT 0,
  status TEXT DEFAULT 'pending', -- 'pending', 'ready', 'processing', 'failed'
  response_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_video_responses_candidate_id ON video_responses(candidate_profile_id);
CREATE INDEX idx_video_responses_status ON video_responses(status);
