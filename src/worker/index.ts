import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

const app = new Hono<{ Bindings: Env }>();

// CORS middleware
app.use('*', async (c, next) => {
  c.header('Access-Control-Allow-Origin', '*');
  c.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  c.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (c.req.method === 'OPTIONS') {
    return c.text('', 200);
  }
  
  await next();
});

// Health check
app.get('/api/health', (c) => {
  return c.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Video upload endpoint
app.post('/api/videos/upload', 
  zValidator('json', z.object({
    candidateProfileId: z.number(),
    questionText: z.string(),
    videoBlob: z.string(), // base64 encoded video
    durationSeconds: z.number(),
    responseOrder: z.number()
  })),
  async (c) => {
    try {
      const { candidateProfileId, questionText, durationSeconds, responseOrder } = c.req.valid('json');
      
      // In a real implementation, you'd upload the video to cloud storage
      // For now, we'll simulate this and store a placeholder URL
      const videoUrl = `https://videos.jobzworld.com/candidate-${candidateProfileId}-question-${responseOrder}.mp4`;
      
      // Insert video response into database
      const result = await c.env.DB.prepare(`
        INSERT INTO video_responses (candidate_profile_id, question_text, video_url, duration_seconds, status, response_order)
        VALUES (?, ?, ?, ?, 'ready', ?)
      `).bind(candidateProfileId, questionText, videoUrl, durationSeconds, responseOrder).run();
      
      return c.json({ 
        id: result.meta.last_row_id,
        videoUrl,
        status: 'ready'
      });
    } catch (error) {
      console.error('Video upload error:', error);
      return c.json({ error: 'Failed to upload video' }, 500);
    }
  }
);

// Get candidate video responses
app.get('/api/videos/candidate/:profileId', async (c) => {
  try {
    const profileId = parseInt(c.req.param('profileId'));
    
    const videos = await c.env.DB.prepare(`
      SELECT * FROM video_responses 
      WHERE candidate_profile_id = ? 
      ORDER BY response_order ASC
    `).bind(profileId).all();
    
    return c.json(videos.results);
  } catch (error) {
    console.error('Error fetching videos:', error);
    return c.json({ error: 'Failed to fetch videos' }, 500);
  }
});

// Create candidate profile
app.post('/api/candidates/profile',
  zValidator('json', z.object({
    userId: z.number(),
    fullName: z.string(),
    location: z.string(),
    hasWorkAuthorization: z.boolean(),
    languages: z.array(z.string()),
    yearsExperience: z.number(),
    targetJobTitles: z.array(z.string()),
    preferredIndustries: z.array(z.string()),
    workingModel: z.string(),
    salaryMin: z.number(),
    salaryMax: z.number(),
    salaryCurrency: z.string(),
    isWillingToRelocate: z.boolean(),
    skills: z.array(z.object({
      name: z.string(),
      proficiency: z.string()
    })),
    achievements: z.string(),
    hasConsentedAiAnalysis: z.boolean()
  })),
  async (c) => {
    try {
      const data = c.req.valid('json');
      
      const result = await c.env.DB.prepare(`
        INSERT INTO candidate_profiles (
          user_id, full_name, location, has_work_authorization, languages, 
          years_experience, target_job_titles, preferred_industries, working_model,
          salary_min, salary_max, salary_currency, is_willing_to_relocate, 
          skills, achievements, has_consented_ai_analysis, is_profile_complete
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, FALSE)
      `).bind(
        data.userId,
        data.fullName,
        data.location,
        data.hasWorkAuthorization,
        JSON.stringify(data.languages),
        data.yearsExperience,
        JSON.stringify(data.targetJobTitles),
        JSON.stringify(data.preferredIndustries),
        data.workingModel,
        data.salaryMin,
        data.salaryMax,
        data.salaryCurrency,
        data.isWillingToRelocate,
        JSON.stringify(data.skills),
        data.achievements,
        data.hasConsentedAiAnalysis
      ).run();
      
      return c.json({ 
        id: result.meta.last_row_id,
        message: 'Profile created successfully'
      });
    } catch (error) {
      console.error('Profile creation error:', error);
      return c.json({ error: 'Failed to create profile' }, 500);
    }
  }
);

// Update candidate profile completion status
app.put('/api/candidates/profile/:id/complete', async (c) => {
  try {
    const profileId = parseInt(c.req.param('id'));
    
    await c.env.DB.prepare(`
      UPDATE candidate_profiles 
      SET is_profile_complete = TRUE, updated_at = CURRENT_TIMESTAMP 
      WHERE id = ?
    `).bind(profileId).run();
    
    return c.json({ message: 'Profile marked as complete' });
  } catch (error) {
    console.error('Error completing profile:', error);
    return c.json({ error: 'Failed to complete profile' }, 500);
  }
});

// Get interview questions based on job titles
app.get('/api/questions/:jobTitles', async (c) => {
  const jobTitles = c.req.param('jobTitles').split(',');
  
  // Define role-specific questions
  const questionSets: Record<string, string[]> = {
    'Customer Success Associate': [
      "Tell us about yourself and why you're passionate about customer success.",
      "Walk us through a time you turned around a difficult customer situation.",
      "How would you handle a customer who is considering cancelling their subscription due to poor results?",
      "Describe a time when you exceeded a customer's expectations."
    ],
    'Sales Representative': [
      "Tell us about yourself and your sales experience.",
      "Describe how you would approach an enterprise client who has objected to your pricing.",
      "Walk us through your process for building rapport with new prospects.",
      "How do you handle rejection and maintain motivation in sales?"
    ],
    'Account Manager': [
      "Tell us about yourself and your account management philosophy.",
      "Describe a time when you successfully grew an existing client relationship.",
      "How would you approach a situation where a key account is at risk?",
      "What strategies do you use to identify upselling opportunities?"
    ],
    'Business Development': [
      "Tell us about yourself and your business development experience.",
      "Describe your approach to identifying and qualifying new business opportunities.",
      "How do you build relationships with potential partners or clients?",
      "Walk us through a successful deal you closed from start to finish."
    ],
    'Customer Support': [
      "Tell us about yourself and why you enjoy helping customers.",
      "Describe a time when you resolved a particularly challenging customer issue.",
      "How do you prioritize multiple customer requests?",
      "What does excellent customer service mean to you?"
    ]
  };
  
  // Get questions based on selected job titles
  let questions = [
    "Tell us about yourself and your professional background.",
    "What motivates you in your career and what are you looking for in your next role?"
  ];
  
  // Add role-specific questions
  for (const jobTitle of jobTitles) {
    const roleQuestions = questionSets[jobTitle];
    if (roleQuestions) {
      questions = [...questions, ...roleQuestions.slice(2)]; // Skip generic intro questions
    }
  }
  
  // Limit to 5 questions maximum
  questions = questions.slice(0, 5);
  
  return c.json({ questions });
});

export default app;
