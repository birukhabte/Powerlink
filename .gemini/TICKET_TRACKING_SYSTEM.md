# Ticket Generation and Tracking System

## Overview
This document describes the implementation of the ticket generation and tracking system for PowerLink Ethiopia. When a customer submits a service request, a unique ticket is automatically generated and can be tracked through the customer dashboard.

## Features Implemented

### 1. Automatic Ticket Generation
- When a customer submits a service request, a unique ticket ID is generated in the format: `SRV-2024-XXXXX`
- The ticket is automatically saved to the database with status "pending"
- The ticket is immediately sent to the supervisor dashboard for review

### 2. Customer Ticket Tracking
- Customers can view all their submitted tickets in the "Track Ticket" page
- Each ticket displays:
  - Ticket ID
  - Service type (New Connection, Relocation, Name Change, etc.)
  - Current status (pending, under_review, approved, rejected, assigned, in_progress, completed)
  - Priority level
  - Location/Address
  - Assigned technician (if any)
  - Supervisor notes (if any)
  - Timeline of status updates

### 3. Real-time Status Updates
- The ticket page automatically refreshes every 30 seconds to show the latest status
- Customers can manually refresh using the "Refresh" button
- Status updates include:
  - Service request submitted
  - Under review by supervisor
  - Approved/Rejected with supervisor notes
  - Assigned to technician
  - Work in progress
  - Completed

## Technical Implementation

### Backend Changes

#### 1. New Route: Get User-Specific Tickets
**File:** `backend/routes/service-requests.js`

```javascript
GET /api/service-requests/user/:userId
```
- Fetches all tickets created by a specific user
- Returns ticket details including status, priority, supervisor notes, and assigned technician

#### 2. Updated Route: Create Service Request
**File:** `backend/routes/service-requests.js`

```javascript
POST /api/service-requests
```
- Now accepts both camelCase and snake_case field names for compatibility
- Stores document metadata in JSONB format
- Automatically sets status to "pending" upon creation

### Frontend Changes

#### 1. Request Service Component
**File:** `frontend/vite-project/src/RolePages/Customer/Request_Service.jsx`

- Generates unique ticket ID when form is submitted
- Uploads documents to server
- Creates service request with ticket ID
- Shows success message with ticket number
- Redirects to Track Ticket page

#### 2. Track Ticket Component
**File:** `frontend/vite-project/src/RolePages/Customer/Ticket.jsx`

**Key Features:**
- Fetches user-specific tickets using the new API endpoint
- Displays tickets in a list view with status badges
- Shows detailed ticket information when selected
- Displays supervisor notes with color-coded styling:
  - Red background for rejected requests
  - Blue background for approved/in-progress requests
- Timeline view showing all status updates
- Auto-refresh every 30 seconds

## Database Schema

The `service_requests` table includes:
- `ticket_id` - Unique ticket identifier
- `service_type` - Type of service requested
- `status` - Current status (pending, under_review, approved, rejected, assigned, in_progress, completed)
- `priority` - Priority level (low, medium, high)
- `documents` - JSONB field storing document metadata
- `supervisor_notes` - Notes from supervisor
- `assigned_to` - ID of assigned technician
- `created_by` - ID of customer who created the request
- `created_at` - Timestamp of creation
- `updated_at` - Timestamp of last update

## User Flow

1. **Customer submits service request:**
   - Fills out service request form
   - Uploads required documents
   - Receives unique ticket ID
   - Request is saved with status "pending"

2. **Supervisor reviews request:**
   - Views request in supervisor dashboard
   - Can approve, reject, or request changes
   - Can add notes for the customer
   - Can assign to a technician

3. **Customer tracks ticket:**
   - Opens "Track Ticket" page
   - Views all submitted tickets
   - Sees current status and updates
   - Reads supervisor notes if any
   - Knows which technician is assigned

4. **Status progression:**
   - Pending → Under Review → Approved → Assigned → In Progress → Completed
   - Or: Pending → Under Review → Rejected (with notes)

## Benefits

1. **Transparency:** Customers can track their requests in real-time
2. **Accountability:** Every request has a unique ticket ID
3. **Communication:** Supervisor notes provide feedback to customers
4. **Organization:** All requests are centrally tracked and managed
5. **Efficiency:** Automatic status updates reduce manual communication

## Next Steps (Optional Enhancements)

1. Email notifications when status changes
2. SMS notifications for important updates
3. Ability to upload additional documents after submission
4. Chat feature between customer and supervisor
5. Estimated completion time display
6. Service request history and analytics
