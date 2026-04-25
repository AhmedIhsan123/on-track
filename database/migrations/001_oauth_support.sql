-- Migration: add OAuth support to users table
-- Run this against your on_track database before using Google/GitHub login

USE on_track;

-- Allow password_hash to be NULL for OAuth-only users
ALTER TABLE users
    MODIFY COLUMN password_hash VARCHAR(255) NULL;

-- Track which OAuth provider created the account and their provider user ID
ALTER TABLE users
    ADD COLUMN oauth_provider VARCHAR(50) NULL AFTER password_hash,
    ADD COLUMN oauth_id VARCHAR(255) NULL AFTER oauth_provider;

-- Prevent duplicate OAuth accounts
ALTER TABLE users
    ADD UNIQUE KEY uq_oauth (oauth_provider, oauth_id);
