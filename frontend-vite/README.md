# User Management System - Frontend

A modern, responsive React + Vite frontend for a User Management System with CRUD operations, search, pagination, and profile picture uploads.

**Status:** ✅ Production Ready | 🎯 Deployed on Vercel | 📦 Optimized with Vite

## Live Demo
[https://user-management-app.vercel.app](https://user-management-app.vercel.app)

## Features

- ✅ Modern, responsive UI with professional styling
- ✅ Multi-page routing (List, Add, Edit, View)
- ✅ Real-time form validation with error messages
- ✅ Search functionality (by name, email, phone, city)
- ✅ Pagination support with dynamic page sizes
- ✅ Sortable columns (by name, email, etc.)
- ✅ Profile picture upload with preview
- ✅ Toast notifications (success/error/info)
- ✅ User status toggle (Active/Inactive)
- ✅ CSV export functionality
- ✅ Fast development with HMR (Hot Module Replacement)
- ✅ Optimized production build

## Tech Stack

- **React 19.2** - UI library
- **Vite 7.3** - Build tool & dev server (5-10x faster than Webpack)
- **React Router 6.8** - Client-side routing
- **Axios 1.3** - HTTP client
- **React Toastify 9.1** - Toast notifications
- **CSS3** - Styling with flexbox & grid

## Project Structure

```
frontend-vite/
├── src/
│   ├── components/           # Reusable components
│   │   ├── Header.jsx        # App header with navigation
│   │   ├── UserForm.jsx      # Reusable user form
│   │   ├── UserTable.jsx     # Users list with pagination
│   │   ├── UserCard.jsx      # User detail card
│   │   └── ErrorBoundary.jsx # Error boundary wrapper
│   ├── pages/                # Page components
│   │   ├── ListPage.jsx      # Users list page
│   │   ├── AddPage.jsx       # Add new user page
│   │   ├── EditPage.jsx      # Edit user page
│   │   └── ViewPage.jsx      # View user details
│   ├── services/
│   │   └── api.js            # Axios API client configuration
│   ├── styles/               # CSS stylesheets
│   │   ├── App.css
│   │   ├── Header.css
│   │   ├── Pages.css
│   │   ├── UserForm.css
│   │   ├── UserTable.css
│   │   └── UserCard.css
│   ├── utils/
│   │   └── validation.js     # Form validation functions
│   ├── App.jsx               # Root component with routes
│   ├── main.jsx              # React entry point
│   ├── App.css              # Global styles
│   └── index.css            # Global base styles
├── public/                   # Static assets
├── index.html                # HTML template
├── vite.config.js            # Vite configuration
├── eslint.config.js          # ESLint configuration
├── package.json
├── .env.example              # Environment variables template
├── .env.local                # Development environment (not committed)
├── .env.production           # Production environment
└── .gitignore
```

## Getting Started

### Prerequisites

- Node.js v16+ (v18+ recommended)
- npm v8+ or yarn v3+
- Backend API running (see parent README)

### Installation

1. Navigate to the frontend directory
```bash
cd frontend-vite
```

2. Install dependencies
```bash
npm install
```

3. Create environment file for development
```bash
cp .env.example .env.local
```

4. Update `.env.local` with your backend API URL:
```properties
VITE_API_URL=http://localhost:5000/api
```

### Development

Start the development server with hot module replacement:
```bash
npm run dev
```

The application will open at `http://localhost:5173`

Features:
- **HMR:** Changes are reflected instantly
- **Fast Refresh:** Components update without losing state
- **Optimized Builds:** Production-ready build optimization

### Production Build

Create an optimized production build:
```bash
npm run build
```

Creates a minified bundle in the `dist/` directory.

### Preview Production Build

Test the production build locally:
```bash
npm run preview
```

### Linting

Check code quality with ESLint:
```bash
npm run lint
```

Fix linting errors automatically:
```bash
npm run lint:fix
```

## Environment Variables

### Development (.env.local)
```properties
# Backend API URL
VITE_API_URL=http://localhost:5000/api
```

### Production (.env.production)
```properties
# Backend API URL (Render)
VITE_API_URL=https://user-management-api.onrender.com/api
```

## API Integration

All API calls are handled through [src/services/api.js](src/services/api.js):

```javascript
import api from './services/api';

// Get all users
const response = await api.get('/users');

// Create user
await api.post('/users', userData);

// Update user
await api.put(`/users/${id}`, userData);

// Delete user
await api.delete(`/users/${id}`);

// Search users
const results = await api.get('/users/search', {
  params: { q: 'search term' }
});

// Export to CSV
const csv = await api.get('/users/export/csv');

// Check API health
await api.get('/health');
```

## Components Overview

### Header Component
- Navigation links to all pages
- App title and branding
- Responsive mobile navigation

### UserForm Component
- Reusable form for adding/editing users
- Real-time validation
- Error messages for each field
- Profile picture upload with preview
- Cancel and Save buttons

### UserTable Component
- Displays users in a responsive table
- Pagination with configurable page size
- Column sorting (click header to sort)
- Action buttons (View, Edit, Delete)
- Search functionality
- Export to CSV button

### UserCard Component
- Display user details in card format
- Profile picture with fallback
- Formatted dates
- Contact links (email, phone)
- Age calculation from date of birth

### ErrorBoundary Component
- Catches React component errors
- Prevents entire app from crashing
- Displays fallback error UI

## Form Validation

Validation is performed both client-side and server-side:

- **First Name / Last Name:** Min 2 characters
- **Email:** Valid email format, unique
- **Phone Number:** Exactly 10 digits
- **Address:** Min 5 characters
- **City / State:** Min 2 characters
- **Zip Code:** Format `12345` or `12345-6789`
- **Date of Birth:** Valid date, age >= 18 years
- **Gender:** One of Male, Female, Other
- **Profile Picture:** JPEG/PNG/GIF, max 5MB

## Deployment on Vercel

### Prerequisites
- Vercel account (free at [vercel.com](https://vercel.com))
- GitHub repository with code
- Deployed backend API

### Step-by-Step Deployment

1. **Prepare for Production**
   - Update `.env.production` with your backend URL
   ```properties
   VITE_API_URL=https://user-management-api.onrender.com/api
   ```

2. **Create Vercel Project**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New..." → "Project"
   - Import your GitHub repository

3. **Configure Build Settings**
   - **Framework:** Vite
   - **Root Directory:** `frontend-vite`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm ci`

4. **Add Environment Variables**
   - Go to Project Settings → Environment Variables
   - Add: `VITE_API_URL` = `https://your-backend-url.com/api`

5. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy automatically
   - Access at: `https://your-project.vercel.app`

### Auto Deployment
- Push changes to GitHub
- Vercel automatically builds and deploys
- Preview URLs for pull requests
- Production URL for main branch

## Performance Optimization

### Vite Advantages
- Next-generation build tool
- 10-100x faster development
- Optimized production builds
- Native ES modules in dev
- Instant HMR

### Built-in Optimizations
- Code splitting for better caching
- Lazy loading of pages
- Asset minification
- CSS minification
- Tree shaking of unused code

### Best Practices
- Use pagination for large datasets
- Debounce search input
- Lazy load page components
- Optimize images
- Minimize third-party scripts

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Android)

## Available Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Build optimized production bundle |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Check code quality with ESLint |
| `npm run lint:fix` | Fix linting errors automatically |

## Troubleshooting

### CORS Errors
- Ensure backend `CORS_ORIGIN` includes your frontend URL
- For production: `https://your-project.vercel.app`

### API Connection Failed
- Verify `VITE_API_URL` is correct
- Check backend is running and accessible
- Use browser developer tools to inspect requests

### Build Fails on Vercel
- Check build logs in Vercel dashboard
- Ensure all dependencies are in package.json
- Verify `npm run build` works locally

### Slow Build Times
- Vite should be fast (< 1 minute)
- Check for large dependencies
- Clear node_modules and reinstall: `npm ci`

### Page Not Loading
- Check browser console for errors
- Verify API endpoint is correct
- Check network tab for failed requests
- Ensure backend is running

## Security Features

- Input validation on all forms
- CSRF protection via backend
- XSS prevention with React escaping
- Secure API communication (HTTPS in production)
- No sensitive data in client code

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

ISC

## Support

For issues or questions:
1. Check the main [README.md](../README.md)
2. Review API error responses
3. Check browser console for errors
4. Check backend error logs

## Related Documentation

- [Backend README](../backend/README.md)
- [Main Project README](../README.md)
- [Deployment Guide](../DEPLOYMENT_GUIDE.md)

---

**Built with ❤️ using React + Vite**