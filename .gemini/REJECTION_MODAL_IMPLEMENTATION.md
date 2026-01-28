# Document Rejection Modal Implementation

## Summary
Added a professional rejection modal to the Document Validation page that allows supervisors to select from predefined rejection reasons when rejecting customer-submitted documents.

## Changes Made

### File Modified
- `frontend/vite-project/src/RolePages/Supervisor/DocValidation.jsx`

### New Features

#### 1. **Rejection Modal State Management**
Added new state variables to manage the rejection modal:
```javascript
const [showRejectModal, setShowRejectModal] = useState(false);
const [selectedRejectionReason, setSelectedRejectionReason] = useState('');
const [customRejectionReason, setCustomRejectionReason] = useState('');
const [docToReject, setDocToReject] = useState(null);
```

#### 2. **Predefined Rejection Reasons**
Organized rejection reasons into 5 categories:

**a) Incomplete Documentation**
- Missing required forms or attachments
- Application form not fully filled
- Required signatures not provided

**b) Invalid or Expired Identification**
- National ID, Kebele ID, or passport is expired
- ID does not belong to the applicant
- Name on ID does not match the application

**c) Property Documentation Issues**
- Proof of property ownership is missing or invalid
- Lease agreement is expired or incomplete
- Property documents do not match the application address

**d) Document Quality Issues**
- Document is blurred or unreadable
- Document appears to be altered or tampered
- Poor scan/photo quality - please resubmit

**e) Other**
- Custom reason (specify below)

#### 3. **Updated Functions**

**handleReject(docId)**
- Opens the rejection modal instead of using a simple prompt
- Sets the document to be rejected

**confirmReject()**
- Validates that a reason is selected
- Uses custom reason if "Custom reason" is selected
- Updates document status to 'rejected' with the selected reason
- Resets modal state after confirmation

**cancelReject()**
- Closes the modal without rejecting
- Resets all modal-related state

#### 4. **Rejection Modal UI**
A full-screen modal overlay with:
- **Header**: Clear title and description
- **Body**: 
  - Radio button groups organized by category
  - Visual feedback (red border/background) for selected reason
  - Custom textarea that appears when "Custom reason" is selected
- **Footer**: Cancel and Confirm buttons

### UI/UX Improvements

1. **Professional Design**
   - Modern modal with shadow and rounded corners
   - Sticky header and footer for better usability
   - Scrollable content area for long lists
   - Maximum height with overflow handling

2. **Visual Feedback**
   - Selected reason highlighted with red border and background
   - Hover effects on unselected options
   - Clear button states and transitions

3. **User Guidance**
   - Clear category headers
   - Descriptive rejection reasons
   - Placeholder text for custom reason input
   - Validation alert if no reason is selected

4. **Accessibility**
   - Proper label associations
   - Keyboard-accessible radio buttons
   - Clear focus states
   - Semantic HTML structure

### How It Works

1. **Supervisor clicks "Reject Document"**
   - Modal opens with all rejection reasons displayed

2. **Supervisor selects a reason**
   - Clicks on any predefined reason (radio button selection)
   - OR selects "Custom reason" and types in the textarea

3. **Supervisor confirms rejection**
   - Clicks "Confirm Rejection" button
   - System validates that a reason is provided
   - Document status updates to 'rejected' with the reason
   - Modal closes automatically

4. **Supervisor can cancel**
   - Clicks "Cancel" button
   - Modal closes without making changes

### Example Usage Flow

```
Customer submits document
    ↓
Supervisor reviews in Document Validation page
    ↓
Supervisor clicks "Reject Document"
    ↓
Modal appears with categorized rejection reasons
    ↓
Supervisor selects: "National ID, Kebele ID, or passport is expired"
    ↓
Supervisor clicks "Confirm Rejection"
    ↓
Document marked as rejected with reason
    ↓
Customer can see rejection reason in their dashboard
```

### Benefits

1. **Consistency**: Standardized rejection reasons across all supervisors
2. **Clarity**: Customers receive clear, specific feedback
3. **Efficiency**: Faster than typing custom reasons each time
4. **Professionalism**: Well-organized, categorized reasons
5. **Flexibility**: Still allows custom reasons when needed
6. **Audit Trail**: Clear record of why documents were rejected

### Testing Steps

1. Login as a supervisor
2. Navigate to Document Validation page
3. Select a pending document
4. Click "Reject Document" button
5. Verify modal appears with all categories and reasons
6. Select different reasons and verify visual feedback
7. Select "Custom reason" and verify textarea appears
8. Try to confirm without selecting a reason (should show alert)
9. Select a reason and confirm
10. Verify document status updates to 'rejected' with the reason

---

**Status:** ✅ **IMPLEMENTED**
**Date:** 2026-01-27
**Impact:** Improved supervisor workflow and customer communication
