# Approval/Rejection Status Notification System

## Overview
Implemented a complete workflow where supervisors can approve or reject customer documents, and the status (including rejection reasons) is automatically sent to customers in real-time.

## Changes Made

### 1. **Supervisor Document Validation** (`DocValidation.jsx`)

#### A. Approval Functionality
**Updated `handleApprove` function:**
- Makes API call to backend to update service request status to 'approved'
- Sends supervisor notes: "Document approved by supervisor"
- Shows success notification to supervisor
- Updates local UI state

```javascript
const handleApprove = async (docId) => {
    // Find document and make API call
    const response = await fetch(`http://localhost:5000/api/service-requests/${doc.requestId}/status`, {
        method: 'PATCH',
        body: JSON.stringify({
            status: 'approved',
            supervisorNotes: 'Document approved by supervisor'
        })
    });
    // Update UI and notify supervisor
    alert('Document approved successfully! Customer has been notified.');
};
```

#### B. Rejection Functionality
**Updated `confirmReject` function:**
- Makes API call to backend to update service request status to 'rejected'
- Sends detailed rejection reason in supervisor notes
- Shows success notification with the rejection reason
- Updates local UI state

```javascript
const confirmReject = async () => {
    // Get selected rejection reason
    const finalReason = selectedRejectionReason === 'Custom reason (specify below)' 
        ? customRejectionReason 
        : selectedRejectionReason;
    
    // Make API call with rejection reason
    const response = await fetch(`http://localhost:5000/api/service-requests/${doc.requestId}/status`, {
        method: 'PATCH',
        body: JSON.stringify({
            status: 'rejected',
            supervisorNotes: `Document rejected. Reason: ${finalReason}`
        })
    });
    
    // Notify supervisor
    alert(`Document rejected successfully!\n\nReason: ${finalReason}\n\nThe customer has been notified.`);
};
```

### 2. **Customer Ticket View** (`Ticket.jsx`)

#### A. Real-Time Status Fetching
**Replaced localStorage with API calls:**
- Fetches service requests from backend every 30 seconds
- Filters requests by logged-in user ID
- Displays real-time status updates

```javascript
const fetchTickets = async () => {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    const userId = user?.id;
    
    const response = await fetch('http://localhost:5000/api/service-requests');
    const data = await response.json();
    
    // Filter user's requests
    const userRequests = data.requests
        .filter(req => req.created_by === userId)
        .map(req => ({
            id: req.ticket_id,
            status: req.status,
            supervisorNotes: req.supervisor_notes,
            // ... other fields
        }));
};
```

#### B. Status Display Enhancements
**Added support for new statuses:**
- ✅ **Approved**: Green badge with checkmark icon
- ❌ **Rejected**: Red badge with X icon
- ⏳ **Pending**: Yellow badge with clock icon
- 🔍 **Under Review**: Yellow badge with clock icon

**Status Icons:**
```javascript
const getStatusIcon = (status) => {
    switch (status) {
        case 'approved': return <CheckCircle className="text-green-500" />;
        case 'rejected': return <XCircle className="text-red-500" />;
        case 'pending': return <Clock className="text-yellow-500" />;
        // ...
    }
};
```

#### C. Rejection Reason Display
**Shows rejection reasons in timeline:**
```javascript
updates: [
    { time: '...',  message: 'Service requested' },
    ...(req.status === 'approved' ? 
        [{ time: '...', message: 'Document approved by supervisor' }] : []),
    ...(req.status === 'rejected' ? 
        [{ time: '...', message: `Document rejected: ${req.supervisor_notes}` }] : [])
]
```

## Complete Workflow

### Supervisor Approves Document:
1. Supervisor navigates to Document Validation page
2. Selects a pending document
3. Clicks "Approve Document" button
4. System:
   - Sends PATCH request to `/api/service-requests/{id}/status`
   - Updates status to 'approved'
   - Adds supervisor note: "Document approved by supervisor"
5. Supervisor sees: "Document approved successfully! Customer has been notified."
6. Customer sees (in their Ticket page):
   - Status badge changes to green "APPROVED"
   - Timeline shows: "Document approved by supervisor"

### Supervisor Rejects Document:
1. Supervisor navigates to Document Validation page
2. Selects a pending document
3. Clicks "Reject Document" button
4. Modal appears with categorized rejection reasons
5. Supervisor selects a reason (e.g., "National ID, Kebele ID, or passport is expired")
6. Clicks "Confirm Rejection"
7. System:
   - Sends PATCH request to `/api/service-requests/{id}/status`
   - Updates status to 'rejected'
   - Adds supervisor note: "Document rejected. Reason: National ID, Kebele ID, or passport is expired"
8. Supervisor sees: "Document rejected successfully!\n\nReason: [reason]\n\nThe customer has been notified."
9. Customer sees (in their Ticket page):
   - Status badge changes to red "REJECTED"
   - Timeline shows: "Document rejected: Document rejected. Reason: National ID, Kebele ID, or passport is expired"

### Customer Views Status:
1. Customer logs in
2. Navigates to "My Tickets" page
3. System automatically fetches their service requests from backend
4. Customer sees:
   - All their submitted requests
   - Current status (Pending, Approved, Rejected, etc.)
   - Timeline with updates
   - **If rejected**: Specific reason why it was rejected
5. Page auto-refreshes every 30 seconds to show latest updates

## API Endpoints Used

### PATCH `/api/service-requests/:id/status`
**Request Body:**
```json
{
  "status": "approved" | "rejected",
  "supervisorNotes": "Document approved by supervisor" | "Document rejected. Reason: [reason]"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Service request status updated successfully",
  "request": { /* updated request object */ }
}
```

### GET `/api/service-requests`
**Response:**
```json
{
  "success": true,
  "requests": [
    {
      "id": 1,
      "ticket_id": "SRV-2024-12345",
      "status": "approved" | "rejected" | "pending",
      "supervisor_notes": "Document approved by supervisor",
      "created_by": 5,
      "created_at": "2026-01-27T10:00:00Z",
      "updated_at": "2026-01-27T10:30:00Z",
      // ... other fields
    }
  ]
}
```

## Benefits

1. **Real-Time Communication**
   - Customers see status updates immediately (within 30 seconds)
   - No need to call or email for status updates

2. **Transparency**
   - Customers know exactly why their document was rejected
   - Clear, specific rejection reasons

3. **Efficiency**
   - Supervisors can quickly approve/reject with predefined reasons
   - Reduces back-and-forth communication

4. **Audit Trail**
   - All approvals/rejections are logged in the database
   - Supervisor notes provide context for decisions

5. **User Experience**
   - Professional modal interface for supervisors
   - Clear visual indicators (colors, icons) for customers
   - Timeline view shows progression of request

## Testing Checklist

### Supervisor Side:
- [ ] Navigate to Document Validation page
- [ ] Select a pending document
- [ ] Click "Approve Document"
- [ ] Verify success message appears
- [ ] Check database: status should be 'approved'

- [ ] Select another pending document
- [ ] Click "Reject Document"
- [ ] Select a rejection reason from modal
- [ ] Click "Confirm Rejection"
- [ ] Verify success message with reason appears
- [ ] Check database: status should be 'rejected' with supervisor notes

### Customer Side:
- [ ] Login as customer who submitted requests
- [ ] Navigate to "My Tickets" page
- [ ] Verify tickets are loaded from backend
- [ ] Check that approved requests show green "APPROVED" badge
- [ ] Check that rejected requests show red "REJECTED" badge
- [ ] Verify timeline shows rejection reason for rejected requests
- [ ] Wait 30 seconds and verify page auto-refreshes
- [ ] Click refresh button manually and verify it works

### Integration:
- [ ] Supervisor approves document → Customer sees approval within 30 seconds
- [ ] Supervisor rejects document → Customer sees rejection reason within 30 seconds
- [ ] Multiple customers can see only their own requests
- [ ] Status updates persist after page refresh

---

**Status:** ✅ **IMPLEMENTED**
**Date:** 2026-01-27
**Impact:** Complete bidirectional communication between supervisors and customers
**Files Modified:**
- `frontend/vite-project/src/RolePages/Supervisor/DocValidation.jsx`
- `frontend/vite-project/src/RolePages/Customer/Ticket.jsx`
