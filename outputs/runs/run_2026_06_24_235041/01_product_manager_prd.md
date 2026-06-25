**Product Requirements Document (PRD)**
=====================================

**1. App Name and Tagline**
-------------------------

* App Name: **LifeSphere**
* Tagline: **"Track, Analyze, Optimize: Your Personal AI Health and Life Tracker"**

**2. Problem Statement**
----------------------

As an individual, I want to track and manage my health, fitness, sleep, food, tasks, finance, and knowledge in a single, private, and secure app. I need a personalized AI assistant to analyze my data, provide insights, and offer recommendations to improve my overall well-being and productivity.

**3. Target Users**
-----------------

* **Primary User:** Devendra (the app owner)
* **User Characteristics:**
	+ Tech-savvy individual
	+ Interested in tracking and managing personal health and life data
	+ Values privacy and security
	+ Looking for a personalized AI assistant to provide insights and recommendations

**4. Core Feature List with Priority**
--------------------------------------

### P0 (High Priority)

1. **Dashboard**: Daily score, health score, sleep score, recovery score, workout score, food score, task score, finance summary, knowledge progress, XP, streaks, charts, progress cards, and AI recommendations.
2. **Health Tracking**: Weight, BMI, body fat, waist, chest, arms, legs, shoulders, heart rate, HRV, steps, calories, water, mood, energy, stress, blood pressure, glucose, cholesterol, vitamins, liver markers, kidney markers, symptoms, and health notes.
3. **Workout Tracking**: Daily workout plan, exercise library, sets, reps, weight, rest time, calories, strength progress, muscle group tracking, weekly split, recovery-based workout suggestions, fat-loss roadmap, six-pack roadmap, and monthly comparison.
4. **Food and Nutrition**: Calories, protein, carbs, fats, fiber, water, vegetarian foods, eggs, milk, soya chunks, peanuts, almonds, rice, chapati, dal, curd, limited chicken if needed, food score, protein warning, calorie warning, and weekly nutrition report.
5. **Sleep and Recovery**: Sleep duration, bedtime, wake time, REM, deep sleep, sleep quality, sleep efficiency, recovery score, and relationship with workout, mood, focus, and productivity.

### P1 (Medium Priority)

1. **Tasks, Goals, and Roadmap**: Daily todo, weekly goals, monthly goals, yearly goals, habit tracker, streak system, AI timetable, college, coding, gym, startup work, reading, and personal tasks.
2. **Books and Knowledge**: Books to read, currently reading, completed books, pages, chapters, notes, key ideas, skill tracking, radar chart, and daily learning plan.
3. **Finance**: Income, expenses, savings, investments, business income, stock/crypto manual tracking now, APIs later, profit/loss, monthly spending analysis, and saving goals.
4. **Reward / Solo Leveling System**: XP, levels, badges, achievements, streaks, daily quests, weekly quests, wishlist rewards, missed habit penalty, and motivation system.

### P2 (Low Priority)

1. **Organ Health Pages**: Heart, brain, liver, kidney, lungs, stomach/gut, bones, skin, muscles, blood, hormones. Each organ page should show status, metrics, risks, habits affecting it, foods, report insights, and improvement plan.
2. **AI Assistant**: Personalized AI assistant to provide insights, recommendations, and guidance.

**5. MVP Scope**
----------------

* **Personal-only app**: No public SaaS features
* **Next.js frontend**: Build the frontend using Next.js
* **Supabase normal data**: Use Supabase for normal daily structured data
* **Local private report storage plan**: Store private medical reports, lab reports, body photos, private health notes, sensitive AI analysis, and local LLM memory locally
* **Python analysis engine**: Build a Python analysis engine to analyze health, sleep, recovery, workouts, food, tasks, habits, books, skills, finance, rewards, organ health, lab reports, wearable data, daily briefing, weekly report, monthly report, and yearly report
* **Dashboard**: Implement the dashboard with daily score, health score, sleep score, recovery score, workout score, food score, task score, finance summary, knowledge progress, XP, streaks, charts, progress cards, and AI recommendations
* **Basic charts and progress cards**: Implement basic charts and progress cards for health, workout, food, sleep, tasks, books, finance, and rewards
* **Privacy settings**: Implement privacy settings to allow the user to choose what data to sync and what to keep local

**6. User Stories**
------------------

### As a user, I want to:

* Track my health metrics, such as weight, BMI, body fat, and heart rate.
* Log my workouts, including exercises, sets, reps, and weight.
* Track my food intake, including calories, protein, carbs, and fats.
* Monitor my sleep patterns, including sleep duration, bedtime, and wake time.
* Set and track my tasks, goals, and habits.
* Read and track my books, including pages, chapters, and notes.
* Manage my finances, including income, expenses, savings, and investments.
* Earn rewards and level up based on my progress.

### As a user, I need:

* A dashboard to view my daily score, health score, sleep score, recovery score, workout score, food score, task score, finance summary, knowledge progress, XP, streaks, charts, progress cards, and AI recommendations.
* A way to store my private medical reports, lab reports, body photos, private health notes, sensitive AI analysis, and local LLM memory locally.
* A Python analysis engine to analyze my data and provide insights and recommendations.

**7. Acceptance Criteria**
-------------------------

### The app should:

* Allow the user to track their health metrics, workouts, food intake, sleep patterns, tasks, goals, habits, books, and finances.
* Provide a dashboard to view the user's daily score, health score, sleep score, recovery score, workout score, food score, task score, finance summary, knowledge progress, XP, streaks, charts, progress cards, and AI recommendations.
* Store private medical reports, lab reports, body photos, private health notes, sensitive AI analysis, and local LLM memory locally.
* Analyze the user's data using a Python analysis engine and provide insights and recommendations.

### The app should not:

* Share the user's data with anyone without their consent.
* Store the user's private data in the cloud without their consent.
* Allow multiple users to access the app.

**8. Success Metrics**
----------------------

* **User engagement**: Measure the user's engagement with the app, including the frequency of use and the number of features used.
* **Data accuracy**: Measure the accuracy of the user's data, including the accuracy of their health metrics, workouts, food intake, sleep patterns, tasks, goals, habits, books, and finances.
* **User satisfaction**: Measure the user's satisfaction with the app, including their satisfaction with the dashboard, analysis engine, and recommendations.

**9. Out of Scope**
------------------

* **Public SaaS features**: The app will not have public SaaS features, such as user registration, login, and social sharing.
* **Multi-user system**: The app will not have a multi-user system, and will only be accessible by the user who owns the app.
* **Cloud storage**: The app will not store the user's private data in the cloud without their consent.

**10. Risks and Assumptions**
---------------------------

* **Data security**: There is a risk that the user's data may not be secure, especially if it is stored locally.
* **Analysis engine accuracy**: There is a risk that the analysis engine may not be accurate, especially if the user's data is incomplete or inaccurate.
* **User adoption**: There is a risk that the user may not adopt the app, especially if it is not user-friendly or if it does not provide valuable insights and recommendations.

Assumptions:

* **User technical expertise**: The user is assumed to have basic technical expertise, including the ability to use a smartphone and access the internet.
* **User motivation**: The user is assumed to be motivated to track their health and life data, and to use the app to improve their well-being and productivity.