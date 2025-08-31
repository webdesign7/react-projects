# Authentication System

This project implements a complete authentication system using React Router actions and a Node.js backend.

## Features

- **User Registration**: Create new user accounts with email and password
- **User Login**: Authenticate existing users
- **Form Validation**: Client-side and server-side validation
- **Token Management**: JWT tokens stored in localStorage
- **Navigation Integration**: Dynamic navigation based on authentication state
- **Error Handling**: Comprehensive error messages and validation feedback

## Backend Requirements

The backend should provide the following endpoints:

- `POST /signup` - User registration
- `POST /login` - User authentication

Both endpoints expect:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

And should return:
```json
{
  "token": "jwt_token_here",
  "userId": "user_id_here"
}
```

### Backend Error Responses

The frontend handles these specific HTTP status codes:

- **400 Bad Request**: Invalid input data
- **401 Unauthorized**: Invalid credentials (for login)
- **422 Unprocessable Entity**: Validation errors
- **409 Conflict**: User already exists (for signup)
- **500 Internal Server Error**: Server errors

#### Validation Error Format (422)

The backend can return validation errors in two formats:

**Option 1: Object with field errors**
```json
{
  "errors": {
    "email": "Email exists already.",
    "password": "Password is too weak"
  }
}
```

**Option 2: Array of field errors**
```json
{
  "errors": [
    { "field": "email", "message": "Email is already taken" },
    { "field": "password", "message": "Password is too weak" }
  ]
}
```

**Option 3: Single error message**
```json
{
  "message": "Validation failed: Email is already taken"
}
```

## Frontend Implementation

### Authentication Action (`src/actions/auth.js`)

The `authAction` function handles both login and signup modes:

- **Mode Detection**: Automatically detects mode from URL search parameters
- **Input Validation**: 
  - Email must contain '@'
  - Login password: minimum 6 characters
  - Signup password: minimum 8 characters with letters and numbers
- **API Integration**: POSTs to `http://localhost:8080/{mode}`
- **Token Storage**: Automatically stores JWT tokens and user IDs
- **Enhanced Error Handling**: 
  - **400**: Invalid request data
- **401**: Invalid credentials (login)
- **422**: Validation errors from backend (with field-specific error support)
- **500**: Server errors
  - **Custom error messages**: Displays backend error messages when available
- **Network error handling**: Handles server unreachable and CORS issues
- **JSON parsing safety**: Gracefully handles invalid JSON responses

### Authentication Form (`src/components/AuthForm.js`)

- **Dynamic Mode**: Switches between login and signup based on URL
- **Form Validation**: HTML5 validation with custom requirements
- **Loading States**: Shows loading indicators during submission
- **Success/Error Messages**: Displays feedback to users
- **Auto-redirect**: Redirects to home page after successful authentication

### Navigation (`src/components/MainNavigation.js`)

- **Dynamic Links**: Shows login/signup when not authenticated
- **Logout Button**: Appears when user is authenticated
- **Real-time Updates**: Responds to authentication state changes

### Utility Functions (`src/util/auth.js`)

- `getToken()` - Retrieve stored JWT token
- `getUserId()` - Get current user ID
- `setToken(token, userId)` - Store authentication data
- `removeToken()` - Clear authentication data
- `isAuthenticated()` - Check if user is logged in
- `logout()` - Logout and redirect to login

## Usage

### Registration
1. Navigate to `/auth?mode=signup`
2. Enter email and password (minimum 8 characters with letters and numbers)
3. Submit form
4. User will be redirected to home page on success

### Login
1. Navigate to `/auth?mode=login`
2. Enter email and password (minimum 6 characters)
3. Submit form
4. User will be redirected to home page on success

### Logout
1. Click the logout button in the navigation
2. User will be redirected to login page

## Security Considerations

- **Token Storage**: Currently uses localStorage (consider httpOnly cookies for production)
- **Password Requirements**: Enforces strong passwords for registration
- **Input Validation**: Both client and server-side validation
- **Error Messages**: Generic error messages to prevent information leakage
- **Error Handling**: Comprehensive error handling without exposing sensitive information

## Error Handling Best Practices

The authentication system implements several error handling best practices:

### 1. **Specific Status Code Handling**
- **400**: Client-side validation errors
- **401**: Authentication failures (login)
- **422**: Backend validation errors (including duplicate users)
- **500**: Server errors

### 2. **Graceful Degradation**
- Network errors are caught and displayed as user-friendly messages
- Invalid JSON responses are handled without crashing
- Fallback error messages when backend doesn't provide specific details

### 3. **User Experience**
- Clear, actionable error messages
- No technical details exposed to end users
- Consistent error display across all authentication flows

## Customization

### Password Requirements
Modify the validation logic in `src/actions/auth.js`:

```javascript
// Additional password strength validation for signup
if (mode === 'signup') {
  if (password.length < 8) {
    return {
      error: 'Password must be at least 8 characters long for registration.',
      status: 400
    };
  }
  
  // Add custom validation rules here
}
```

### Backend URL
Change the API endpoint in `src/actions/auth.js`:

```javascript
const response = await fetch(`http://localhost:8080/${mode}`, {
  // ... configuration
});
```

### Redirect After Authentication
Modify the redirect logic in `src/components/AuthForm.js`:

```javascript
useEffect(() => {
  if (actionData?.success) {
    // Change redirect destination here
    window.location.href = '/dashboard';
  }
}, [actionData]);
```
