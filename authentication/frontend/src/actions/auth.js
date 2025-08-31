import { setToken } from '../util/auth';

export async function authAction({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get('mode') || 'signup';
  
  const formData = await request.formData();
  const email = formData.get('email');
  const password = formData.get('password');

  // Validation
  if (!email || !password) {
    return {
      error: 'Please provide both email and password.',
      status: 400
    };
  }

  if (!email.includes('@')) {
    return {
      error: 'Please provide a valid email address.',
      status: 400
    };
  }

  if (password.length < 6) {
    return {
      error: 'Password must be at least 6 characters long.',
      status: 400
    };
  }

  // Additional password strength validation for signup
  if (mode === 'signup') {
    if (password.length < 8) {
      return {
        error: 'Password must be at least 8 characters long for registration.',
        status: 400
      };
    }
    
    // Check if password contains at least one number and one letter
    if (!/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
      return {
        error: 'Password must contain at least one letter and one number.',
        status: 400
      };
    }
  }

  let response;
  try {
    response = await fetch(`http://localhost:8080/${mode}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
  } catch (fetchError) {
    // Handle network errors (server unreachable, CORS issues, etc.)
    return {
      error: 'Unable to connect to the server. Please check your internet connection and try again.',
      status: 0
    };
  }

  if (!response.ok) {
    let errorData = {};
    
    try {
      errorData = await response.json();
    } catch (jsonError) {
      // If response is not valid JSON, use status text
      errorData = { message: response.statusText };
    }
    
    // Handle specific HTTP status codes
    switch (response.status) {
      case 400:
        return {
          error: errorData.message || 'Invalid request data. Please check your input.',
          status: 400
        };
      case 401:
        return {
          error: errorData.message || 'Invalid email or password. Please try again.',
          status: 401
        };
      case 422:
        // Handle validation errors from backend
        if (errorData.errors && typeof errorData.errors === 'object') {
          // If backend returns object with field-specific errors (like {email: "Email exists already"})
          const errorMessages = Object.values(errorData.errors).join('. ');
          return {
            error: errorMessages || 'Validation failed. Please check your input.',
            status: 422
          };
        } else if (errorData.errors && Array.isArray(errorData.errors)) {
          // If backend returns array of field-specific errors
          const errorMessages = errorData.errors.map(err => err.message || err.msg).join('. ');
          return {
            error: errorMessages || 'Validation failed. Please check your input.',
            status: 422
          };
        } else if (errorData.message) {
          // If backend returns a single validation message
          return {
            error: errorData.message,
            status: 422
          };
        } else {
          return {
            error: 'Validation failed. Please check your input.',
            status: 422
          };
        }
      case 500:
        return {
          error: errorData.message || 'Server error. Please try again later.',
          status: 500
        };
      default:
        return {
          error: errorData.message || `Authentication failed: ${response.statusText}`,
          status: response.status
        };
    }
  }

  let data;
  try {
    data = await response.json();
  } catch (jsonError) {
    return {
      error: 'Invalid response from server. Please try again.',
      status: 500
    };
  }
  
  // Store the token using utility function
  if (data.token) {
    setToken(data.token, data.userId || data.id);
    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 1);
    localStorage.setItem('tokenExpiration', expiration.toISOString());
  }

  return {
    success: true,
    message: mode === 'login' ? 'Successfully logged in!' : 'Successfully registered!',
    data
  };
}
