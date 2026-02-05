-- Migration: Update historical pending gift cards to specific status
-- This script analyzes existing data to determine the correct status for pending gift cards
-- Run this AFTER deploying the schema changes that add the new enum values

-- First, let's see what we have (for debugging - comment out in production)
-- SELECT id, code, purchase_status, webpay_response_code, webpay_authorization_code, 
--        webpay_token, created_at 
-- FROM gift_cards 
-- WHERE purchase_status = 'pending';

-- ============================================
-- CLASSIFICATION LOGIC:
-- ============================================
-- 1. REJECTED: Has webpay_response_code != 0 (payment was attempted but declined)
-- 2. COMPLETED: Has webpay_authorization_code (should already be completed, but just in case)
-- 3. ABANDONED: No webpay data or pending for more than 30 minutes (user never completed flow)
-- ============================================

-- Step 1: Mark as REJECTED - Gift cards where WebPay returned a non-zero response code
-- (This means the payment was attempted but declined by the bank)
UPDATE gift_cards 
SET purchase_status = 'rejected',
    updated_at = NOW()
WHERE purchase_status = 'pending' 
  AND webpay_response_code IS NOT NULL 
  AND webpay_response_code != 0;

-- Step 2: Fix any that should be COMPLETED - Has authorization code but still pending
-- (This shouldn't happen, but just in case there was a bug)
UPDATE gift_cards 
SET purchase_status = 'completed',
    updated_at = NOW()
WHERE purchase_status = 'pending' 
  AND webpay_authorization_code IS NOT NULL 
  AND webpay_authorization_code != '';

-- Step 3: Mark remaining old pending as ABANDONED
-- Gift cards that are still pending and were created more than 30 minutes ago
-- These are cases where the user started the purchase but never returned from WebPay
UPDATE gift_cards 
SET purchase_status = 'abandoned',
    updated_at = NOW()
WHERE purchase_status = 'pending' 
  AND created_at < DATE_SUB(NOW(), INTERVAL 30 MINUTE);

-- Verification query (run after migration to confirm results)
-- SELECT purchase_status, COUNT(*) as count 
-- FROM gift_cards 
-- GROUP BY purchase_status;
