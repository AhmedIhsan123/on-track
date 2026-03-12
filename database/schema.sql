CREATE DATABASE IF NOT EXISTS on_track;
USE on_track;

-- =========================
-- USERS
-- =========================
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- APPLICATIONS
-- =========================
CREATE TABLE applications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    company_name VARCHAR(255) NOT NULL,
    job_title VARCHAR(255) NOT NULL,
    job_link TEXT,
    status ENUM(
        'saved',
        'applied',
        'interview',
        'offer',
        'rejected'
    ) DEFAULT 'saved',
    location VARCHAR(255),
    salary_range VARCHAR(255),
    notes TEXT,
    applied_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- =========================
-- RESUMES
-- =========================
CREATE TABLE resumes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    filename VARCHAR(255),
    filepath TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- =========================
-- APPLICATION RESUME LINK
-- =========================
CREATE TABLE application_resumes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    application_id INT NOT NULL,
    resume_id INT NOT NULL,

    FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE CASCADE,
    FOREIGN KEY (resume_id) REFERENCES resumes(id) ON DELETE CASCADE
);

-- =========================
-- INTERVIEWS
-- =========================
CREATE TABLE interviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    application_id INT NOT NULL,
    interview_date DATETIME,
    interview_type ENUM(
        'phone',
        'technical',
        'behavioral',
        'onsite',
        'other'
    ) DEFAULT 'other',
    notes TEXT,

    FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE CASCADE
);

-- =========================
-- REMINDERS
-- =========================
CREATE TABLE reminders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    application_id INT,
    reminder_date DATETIME NOT NULL,
    message TEXT,
    completed BOOLEAN DEFAULT FALSE,

    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE CASCADE
);

-- =========================
-- APPLICATION NOTES
-- =========================
CREATE TABLE application_notes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    application_id INT NOT NULL,
    note TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (application_id) REFERENCES applications(id) ON DELETE CASCADE
);