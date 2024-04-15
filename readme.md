## Next steps

- Replace Foundation with Tailwind components
- Create Github repo and move to dev machine
- Use zod-db

- Implement UI list to show sessions (title, date)

- Implement Strava client
  - List activities (last 50)

- Implement Strava API
  - api.strava.activities.list

- Implement UI to add session
  - Select strava activity
  - Create session

- API fetch session stream data when created (fire & forget to avoid long response time)

- Implement framework for session analysis
  - Interface SessionAnalyser.analyse(sessionId)
  - DB session_analysis
    - id
    - session_id
    - analysis (string)
    - created_at
    - data

- Implement API to load analysis
  - api.sessions.analysis.list

- Implement UI to show analysis
  - Show "This session has no analysis yet" if empty

- Implement pace / HR ratio analysis