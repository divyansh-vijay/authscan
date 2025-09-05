# AuthScan Authentication System

A comprehensive authentication system built for the AuthScan certificate verification platform using Next.js 15, React 19, and modern authentication patterns.

## 🚀 Features

### Core Authentication
- **User Registration & Login** - Complete signup and signin flow
- **Role-Based Access Control** - Admin, Institution, and Verifier roles
- **Password Reset** - Secure password recovery system
- **Session Management** - Token-based authentication with refresh tokens
- **Route Protection** - Protected routes with role-based access

### Security Features
- **Token Management** - JWT-like tokens with expiration
- **Session Persistence** - Secure localStorage with automatic cleanup
- **Permission System** - Granular permissions for different user types
- **Protected Routes** - Middleware and component-level protection

### User Experience
- **Modern UI** - Beautiful, responsive authentication modals
- **Loading States** - Smooth loading indicators
- **Error Handling** - Comprehensive error messages
- **Notifications** - Toast notifications for user feedback

## 🏗️ Architecture

### Components Structure
```
components/
├── Auth/
│   ├── LoginModal.jsx          # Login form with demo credentials
│   ├── RegisterModal.jsx       # Registration form with validation
│   ├── ForgotPasswordModal.jsx # Password reset flow
│   └── ProtectedRoute.jsx      # Route protection wrapper
├── Layout/
│   └── Header.tsx              # Navigation with auth state
└── Homepage/
    └── HomePage.jsx            # Landing page with auth integration
```

### Context & State Management
```
contexts/
└── AuthContext.jsx             # Centralized auth state management
```

### Pages & Routes
```
app/
├── page.js                     # Public homepage
├── verify/page.jsx             # Protected: Admin & Verifier
├── institution/page.jsx        # Protected: Admin & Institution
├── admin/page.jsx              # Protected: Admin only
└── unauthorized/page.jsx       # Access denied page
```

## 🔐 User Roles & Permissions

### Admin
- **Permissions**: Full system access
- **Demo Email**: `admin@authscan.gov.in`
- **Access**: All pages and features

### Institution
- **Permissions**: Manage own certificates, view analytics
- **Demo Email**: `institution@du.ac.in`
- **Access**: Institution portal, certificate management

### Verifier
- **Permissions**: Verify certificates, view history
- **Demo Email**: `verifier@company.com`
- **Access**: Certificate verification portal

## 🛠️ Usage

### Basic Authentication
```jsx
import { useAuth } from '@/contexts/AuthContext';

function MyComponent() {
  const { user, login, logout, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <LoginForm />;
  }
  
  return <Dashboard user={user} />;
}
```

### Protected Routes
```jsx
import ProtectedRoute from '@/components/Auth/ProtectedRoute';

function AdminPage() {
  return (
    <ProtectedRoute allowedRoles={['admin']}>
      <AdminDashboard />
    </ProtectedRoute>
  );
}
```

### Role-Based Components
```jsx
import { withAdminAuth, withInstitutionAuth } from '@/components/Auth/ProtectedRoute';

const AdminComponent = withAdminAuth(AdminPanel);
const InstitutionComponent = withInstitutionAuth(InstitutionPanel);
```

### Permission Checks
```jsx
import { useAuth } from '@/contexts/AuthContext';

function MyComponent() {
  const { hasPermission, hasRole, hasAnyRole } = useAuth();
  
  return (
    <div>
      {hasPermission('manage:users') && <UserManagement />}
      {hasRole('admin') && <AdminPanel />}
      {hasAnyRole(['admin', 'institution']) && <InstitutionTools />}
    </div>
  );
}
```

## 🔧 Configuration

### Environment Variables
```env
# Add these to your .env.local file
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

### Demo Credentials
The system includes demo credentials for testing:

| Role | Email | Password | Access |
|------|-------|----------|--------|
| Admin | `admin@authscan.gov.in` | any text | Full system access |
| Institution | `institution@du.ac.in` | any text | Institution portal |
| Verifier | `verifier@company.com` | any text | Verification portal |

## 🚦 Route Protection

### Middleware Protection
The `middleware.js` file provides server-side route protection:

```javascript
const protectedRoutes = {
  '/verify': ['admin', 'verifier'],
  '/institution': ['admin', 'institution'],
  '/admin': ['admin'],
  '/dashboard': ['admin', 'verifier', 'institution']
};
```

### Component Protection
Use `ProtectedRoute` for component-level protection:

```jsx
<ProtectedRoute allowedRoles={['admin', 'verifier']}>
  <SensitiveComponent />
</ProtectedRoute>
```

## 🔄 Session Management

### Token Lifecycle
- **Access Token**: 24-hour expiration
- **Refresh Token**: Automatic renewal
- **Storage**: Secure localStorage with cleanup
- **Logout**: Complete session termination

### Session Persistence
```javascript
// Automatic session restoration on page load
useEffect(() => {
  const storedToken = localStorage.getItem('auth_token');
  const storedUser = localStorage.getItem('auth_user');
  
  if (storedToken && storedUser) {
    // Restore session
  }
}, []);
```

## 🎨 UI Components

### Authentication Modals
- **LoginModal**: Email/password login with demo credentials
- **RegisterModal**: Multi-step registration with validation
- **ForgotPasswordModal**: Password reset flow

### Navigation
- **Header**: Role-based navigation with auth state
- **Mobile Menu**: Responsive navigation for mobile devices

## 🔒 Security Considerations

### Current Implementation
- Mock authentication for development
- Client-side route protection
- Token-based session management
- Role-based access control

### Production Recommendations
- Implement real JWT authentication
- Add server-side session validation
- Use secure HTTP-only cookies
- Implement rate limiting
- Add two-factor authentication
- Use HTTPS in production

## 🧪 Testing

### Manual Testing
1. **Registration**: Test user signup with different roles
2. **Login**: Test with demo credentials
3. **Route Protection**: Verify role-based access
4. **Session Persistence**: Test page refresh behavior
5. **Logout**: Verify complete session cleanup

### Test Scenarios
```javascript
// Test different user roles
const testUsers = [
  { email: 'admin@authscan.gov.in', expectedRole: 'admin' },
  { email: 'institution@du.ac.in', expectedRole: 'institution' },
  { email: 'verifier@company.com', expectedRole: 'verifier' }
];
```

## 🚀 Deployment

### Build Process
```bash
npm run build
npm start
```

### Environment Setup
1. Configure environment variables
2. Set up production database
3. Configure authentication provider
4. Update API endpoints
5. Enable HTTPS

## 📝 API Integration

### Current Mock Implementation
The system currently uses mock authentication. To integrate with a real backend:

1. **Update AuthContext**: Replace mock functions with real API calls
2. **Configure Endpoints**: Set up authentication endpoints
3. **Handle Errors**: Implement proper error handling
4. **Token Management**: Use real JWT tokens

### Example API Integration
```javascript
const login = async (email, password) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  
  const data = await response.json();
  return data;
};
```

## 🤝 Contributing

### Development Setup
1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Test authentication flows

### Code Style
- Use functional components with hooks
- Follow React best practices
- Maintain consistent naming conventions
- Add proper error handling

## 📄 License

This authentication system is part of the AuthScan project and follows the same licensing terms.

---

**Note**: This is a development implementation with mock authentication. For production use, integrate with a proper authentication service like Auth0, Firebase Auth, or implement a secure backend authentication system.
