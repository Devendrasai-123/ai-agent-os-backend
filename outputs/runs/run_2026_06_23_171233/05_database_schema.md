**Database Design Document**
==========================

**1. Database Choice and Reason**
--------------------------------

* **Database:** SQLite
* **Reason:** SQLite is a self-contained, serverless, and lightweight database that is suitable for local MVP development. It is also easy to set up and integrate with the Node.js backend.

**2. Complete Schema**
---------------------

### Users Table

| Column Name | Data Type | Description |
| --- | --- | --- |
| id | integer | Unique user ID |
| name | text | User name |
| email | text | User email |
| password | text | User password |

### Health Tracking Table

| Column Name | Data Type | Description |
| --- | --- | --- |
| id | integer | Unique health tracking entry ID |
| user_id | integer | Foreign key referencing the Users table |
| weight | real | User weight |
| bmi | real | User BMI |
| body_fat | real | User body fat percentage |
| ... | ... | Other health tracking metrics |

### Workout Tracking Table

| Column Name | Data Type | Description |
| --- | --- | --- |
| id | integer | Unique workout tracking entry ID |
| user_id | integer | Foreign key referencing the Users table |
| exercise | text | Exercise name |
| sets | integer | Number of sets |
| reps | integer | Number of reps |
| weight | real | Weight used |
| ... | ... | Other workout tracking metrics |

### Food and Nutrition Table

| Column Name | Data Type | Description |
| --- | --- | --- |
| id | integer | Unique food and nutrition entry ID |
| user_id | integer | Foreign key referencing the Users table |
| food | text | Food name |
| calories | real | Food calories |
| protein | real | Food protein |
| carbs | real | Food carbs |
| fat | real | Food fat |
| ... | ... | Other food and nutrition metrics |

### Sleep and Recovery Table

| Column Name | Data Type | Description |
| --- | --- | --- |
| id | integer | Unique sleep and recovery entry ID |
| user_id | integer | Foreign key referencing the Users table |
| sleep_duration | real | Sleep duration |
| bedtime | text | Bedtime |
| wake_time | text | Wake time |
| ... | ... | Other sleep and recovery metrics |

### Tasks, Goals, and Roadmap Table

| Column Name | Data Type | Description |
| --- | --- | --- |
| id | integer | Unique task, goal, or roadmap entry ID |
| user_id | integer | Foreign key referencing the Users table |
| task | text | Task name |
| goal | text | Goal name |
| roadmap | text | Roadmap name |
| ... | ... | Other task, goal, and roadmap metrics |

### Books and Knowledge Table

| Column Name | Data Type | Description |
| --- | --- | --- |
| id | integer | Unique book or knowledge entry ID |
| user_id | integer | Foreign key referencing the Users table |
| book | text | Book name |
| author | text | Author name |
| pages | integer | Number of pages |
| ... | ... | Other book and knowledge metrics |

### Finance Table

| Column Name | Data Type | Description |
| --- | --- | --- |
| id | integer | Unique finance entry ID |
| user_id | integer | Foreign key referencing the Users table |
| income | real | Income |
| expenses | real | Expenses |
| savings | real | Savings |
| ... | ... | Other finance metrics |

### Reward/Solo Leveling System Table

| Column Name | Data Type | Description |
| --- | --- | --- |
| id | integer | Unique reward or solo leveling system entry ID |
| user_id | integer | Foreign key referencing the Users table |
| reward | text | Reward name |
| level | integer | Level |
| xp | integer | XP |
| ... | ... | Other reward and solo leveling system metrics |

### AI Assistant Table

| Column Name | Data Type | Description |
| --- | --- | --- |
| id | integer | Unique AI assistant entry ID |
| user_id | integer | Foreign key referencing the Users table |
| query | text | User query |
| response | text | AI response |
| ... | ... | Other AI assistant metrics |

**3. Table Relationships**
-------------------------

* A user can have multiple health tracking entries (one-to-many).
* A user can have multiple workout tracking entries (one-to-many).
* A user can have multiple food and nutrition entries (one-to-many).
* A user can have multiple sleep and recovery entries (one-to-many).
* A user can have multiple task, goal, and roadmap entries (one-to-many).
* A user can have multiple book and knowledge entries (one-to-many).
* A user can have multiple finance entries (one-to-many).
* A user can have multiple reward and solo leveling system entries (one-to-many).
* A user can have multiple AI assistant entries (one-to-many).

**4. Indexes**
--------------

* Create indexes on foreign keys to improve query performance.
* Create indexes on columns used in WHERE and JOIN clauses.

**5. Sample Data**
------------------

### Users Table

| id | name | email | password |
| --- | --- | --- | --- |
| 1 | John Doe | johndoe@example.com | password123 |

### Health Tracking Table

| id | user_id | weight | bmi | body_fat |
| --- | --- | --- | --- | --- |
| 1 | 1 | 70 | 25 | 20 |

### Workout Tracking Table

| id | user_id | exercise | sets | reps | weight |
| --- | --- | --- | --- | --- | --- |
| 1 | 1 | bench press | 3 | 10 | 100 |

### Food and Nutrition Table

| id | user_id | food | calories | protein | carbs | fat |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | 1 | apple | 95 | 0.3 | 25 | 0.5 |

### Sleep and Recovery Table

| id | user_id | sleep_duration | bedtime | wake_time |
| --- | --- | --- | --- | --- |
| 1 | 1 | 8 | 22:00 | 06:00 |

### Tasks, Goals, and Roadmap Table

| id | user_id | task | goal | roadmap |
| --- | --- | --- | --- | --- |
| 1 | 1 | complete project | learn new skill | finish course |

### Books and Knowledge Table

| id | user_id | book | author | pages |
| --- | --- | --- | --- | --- |
| 1 | 1 | book title | author name | 200 |

### Finance Table

| id | user_id | income | expenses | savings |
| --- | --- | --- | --- | --- |
| 1 | 1 | 5000 | 2000 | 1000 |

### Reward/Solo Leveling System Table

| id | user_id | reward | level | xp |
| --- | --- | --- | --- | --- |
| 1 | 1 | badge | 5 | 1000 |

### AI Assistant Table

| id | user_id | query | response |
| --- | --- | --- | --- |
| 1 | 1 | what is the weather like today? | the weather is sunny today |

**6. Migration SQL**
---------------------

```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  password TEXT NOT NULL
);

CREATE TABLE health_tracking (
  id INTEGER PRIMARY KEY,
  user_id INTEGER NOT NULL,
  weight REAL NOT NULL,
  bmi REAL NOT NULL,
  body_fat REAL NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE workout_tracking (
  id INTEGER PRIMARY KEY,
  user_id INTEGER NOT NULL,
  exercise TEXT NOT NULL,
  sets INTEGER NOT NULL,
  reps INTEGER NOT NULL,
  weight REAL NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE food_and_nutrition (
  id INTEGER PRIMARY KEY,
  user_id INTEGER NOT NULL,
  food TEXT NOT NULL,
  calories REAL NOT NULL,
  protein REAL NOT NULL,
  carbs REAL NOT NULL,
  fat REAL NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE sleep_and_recovery (
  id INTEGER PRIMARY KEY,
  user_id INTEGER NOT NULL,
  sleep_duration REAL NOT NULL,
  bedtime TEXT NOT NULL,
  wake_time TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE tasks_goals_and_roadmap (
  id INTEGER PRIMARY KEY,
  user_id INTEGER NOT NULL,
  task TEXT NOT NULL,
  goal TEXT NOT NULL,
  roadmap TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE books_and_knowledge (
  id INTEGER PRIMARY KEY,
  user_id INTEGER NOT NULL,
  book TEXT NOT NULL,
  author TEXT NOT NULL,
  pages INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE finance (
  id INTEGER PRIMARY KEY,
  user_id INTEGER NOT NULL,
  income REAL NOT NULL,
  expenses REAL NOT NULL,
  savings REAL NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE reward_solo_leveling_system (
  id INTEGER PRIMARY KEY,
  user_id INTEGER NOT NULL,
  reward TEXT NOT NULL,
  level INTEGER NOT NULL,
  xp INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE ai_assistant (
  id INTEGER PRIMARY KEY,
  user_id INTEGER NOT NULL,
  query TEXT NOT NULL,
  response TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (id)
);
```

**7. 10 Common Queries**
-------------------------

1. Get all users: `SELECT * FROM users;`
2. Get all health tracking entries for a user: `SELECT * FROM health_tracking WHERE user_id = ?;`
3. Get all workout tracking entries for a user: `SELECT * FROM workout_tracking WHERE user_id = ?;`
4. Get all food and nutrition entries for a user: `SELECT * FROM food_and_nutrition WHERE user_id = ?;`
5. Get all sleep and recovery entries for a user: `SELECT * FROM sleep_and_recovery WHERE user_id = ?;`
6. Get all tasks, goals, and roadmap entries for a user: `SELECT * FROM tasks_goals_and_roadmap WHERE user_id = ?;`
7. Get all books and knowledge entries for a user: `SELECT * FROM books_and_knowledge WHERE user_id = ?;`
8. Get all finance entries for a user: `SELECT * FROM finance WHERE user_id = ?;`
9. Get all reward and solo leveling system entries for a user: `SELECT * FROM reward_solo_leveling_system WHERE user_id = ?;`
10. Get all AI assistant entries for a user: `SELECT * FROM ai_assistant WHERE user_id = ?;`

**8. Data Validation Rules**
---------------------------

* Users: name, email, and password are required.
* Health tracking: weight, BMI, and body fat percentage are required.
* Workout tracking: exercise, sets, reps, and weight are required.
* Food and nutrition: food, calories, protein, carbs, and fat are required.
* Sleep and recovery: sleep duration, bedtime, and wake time are required.
* Tasks, goals, and roadmap: task, goal, and roadmap are required.
* Books and knowledge: book, author, and pages are required.
* Finance: income, expenses, and savings are required.
* Reward and solo leveling system: reward, level, and XP are required.
* AI assistant: query and response are required.

**9. Backup and Retention Policy**
---------------------------------

* Back up the database daily.
* Retain backups for 30 days.

**10. Performance Notes**
-------------------------

* Use indexes to improve query performance.
* Optimize database schema for performance.
* Use caching to reduce database queries.
* Monitor database performance and adjust as needed.