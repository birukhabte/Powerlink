# Debugging Guide - Ticket Not Showing Issue

## Steps to Debug

### 1. Open Browser Console
- Press F12 or right-click → Inspect
- Go to the "Console" tab
- Keep it open while testing

### 2. Submit a Service Request

**Navigate to Request Service:**
1. Login to your customer account
2. Click "Request Service" from the sidebar
3. Fill out the form completely
4. Upload a document
5. Click "Submit Request"

**Check Console Logs:**
Look for these messages:
```
=== SERVICE REQUEST SUBMISSION DEBUG ===
User from localStorage: {id: X, email: "...", ...}
User ID: X
Request data being sent: {...}
Backend response: {...}
✅ Service request submitted successfully!
Ticket ID: SRV-2024-XXXXX
Created by user ID: X
```

**Important:** Note the User ID number (X)

### 3. Click "Track Your Request" Button

**Check Console Logs:**
Look for these messages:
```
=== TICKET FETCH DEBUG ===
User from localStorage: {id: X, email: "...", ...}
User ID: X
Fetching from URL: http://localhost:5000/api/service-requests/user/X
API Response: {...}
Tickets count: Y
```

### 4. Analyze the Results

#### Case 1: User ID is null or undefined
```
User ID: null
```
**Problem:** User not logged in properly
**Solution:** 
- Check if you're logged in
- Try logging out and logging back in
- Check localStorage in browser DevTools → Application → Local Storage

#### Case 2: API returns empty tickets
```
API Response: {success: true, tickets: [], count: 0}
Tickets count: 0
```
**Problem:** No tickets found for this user ID
**Possible causes:**
- User ID in submission doesn't match user ID in fetch
- Ticket was created with a different user ID
- Database issue

**Solution:**
- Check if the User ID in submission matches the User ID in fetch
- Verify the ticket was actually saved to the database

#### Case 3: API returns error
```
API Response: {success: false, error: "..."}
```
**Problem:** Backend error
**Solution:** Check backend console for errors

#### Case 4: Network error
```
❌ Error fetching tickets: TypeError: Failed to fetch
```
**Problem:** Backend not running or wrong URL
**Solution:** Ensure backend is running on port 5000

### 5. Manual Database Check (Optional)

If you have access to the database, run this query:
```sql
SELECT id, ticket_id, service_type, created_by, status, created_at 
FROM service_requests 
ORDER BY created_at DESC 
LIMIT 10;
```

This will show:
- All recent tickets
- The `created_by` user ID for each ticket
- Whether your ticket was actually saved

### 6. Common Issues & Solutions

#### Issue: User ID is null
**Cause:** Not logged in or localStorage cleared
**Fix:** 
```javascript
// Check in browser console:
localStorage.getItem('user')
// Should return: {"id":1,"email":"...","firstName":"..."}
```

#### Issue: User ID mismatch
**Cause:** Submitted with one user ID, fetching with another
**Fix:** Ensure you're logged in as the same user who submitted the request

#### Issue: Backend route not working
**Cause:** Route not registered or backend not running
**Fix:** 
- Check backend console for startup messages
- Verify route exists in `backend/routes/service-requests.js`
- Test API directly: `http://localhost:5000/api/service-requests/user/1`

### 7. Quick Test

Open browser console and run:
```javascript
// Test 1: Check if user is logged in
console.log('User:', JSON.parse(localStorage.getItem('user')));

// Test 2: Manually fetch tickets
fetch('http://localhost:5000/api/service-requests/user/1')
  .then(r => r.json())
  .then(d => console.log('Tickets:', d));

// Test 3: Check all service requests
fetch('http://localhost:5000/api/service-requests')
  .then(r => r.json())
  .then(d => console.log('All requests:', d));
```

## Expected Flow

1. **Submit Request:**
   - User ID: 1 (example)
   - Ticket created with `created_by = 1`
   - Success message shown

2. **Fetch Tickets:**
   - Fetch URL: `/api/service-requests/user/1`
   - Backend queries: `WHERE created_by = 1`
   - Returns tickets created by user 1

3. **Display:**
   - Tickets array has items
   - Formatted and displayed in UI

## Next Steps

After running through these steps, share the console output and we can identify the exact issue!
