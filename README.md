# User Management System - Full Stack MERN Application

A production-ready full-stack MERN (MongoDB, Express, React, Node.js) application for managing user information with CRUD operations, search, pagination, and CSV export functionality.

**Status:** ✅ Production Ready | 🎯 Deployed on Render & Vercel | 📦 Optimized

![Deployment](https://img.shields.io/badge/Backend-Render-46E3B7?logo=render) ![Deployment](https://img.shields.io/badge/Frontend-Vercel-000000?logo=vercel)

## Live Demo

- **Frontend:** [https://user-management-app.vercel.app](https://user-management-app.vercel.app)
- **Backend:** [https://user-management-api.onrender.com](https://user-management-api.onrender.com)

## Key Features

### 🎨 Frontend (React + Vite)
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

### 🔧 Backend (Node.js + Express + MongoDB)
- ✅ RESTful API with full CRUD operations
- ✅ MongoDB integration with Mongoose ODM
- ✅ Input validation using express-validator
- ✅ File upload handling with Multer (5MB limit)
- ✅ Pagination with configurable limits
- ✅ Search with regex pattern matching
- ✅ CSV export using json2csv
- ✅ Error handling and logging
- ✅ CORS configuration for production
- ✅ Security headers (Content-Type-Options, XSS-Protection)

### 🔐 Production Ready
- ✅ Environment variable management
- ✅ Security headers & CORS configuration
- ✅ Optimized build process
- ✅ Code splitting & lazy loading
- ✅ Input validation (frontend & backend)
- ✅ Error recovery & user feedback
- ✅ Deploy-ready configuration
- ✅ Deployed on Render (Backend) and Vercel (Frontend)

## Tech Stack

### Frontend
- **Framework:** React 19.2
- **Build Tool:** Vite 7.3
- **Routing:** React Router DOM 6.8
- **HTTP Client:** Axios 1.3
- **Notifications:** React Toastify 9.1
- **Styling:** CSS3 with flexbox & grid

### Backend
- **Runtime:** Node.js (v14+)
- **Framework:** Express.js 4.18
- **Database:** MongoDB 7.0
- **ODM:** Mongoose 7.0
- **Validation:** express-validator 7.0
- **File Upload:** Multer 2.0
- **CSV Export:** json2csv 5.0
- **CORS:** cors 2.8

## Project Directory Structure

```
bnv/
├── backend/
│   ├── config/
│   │   └── multer.js              # File upload configuration
│   ├── controllers/
│   │   └── userController.js      # Business logic for users
│   ├── models/
│   │   └── User.js                # MongoDB user schema
│   ├── routes/
│   │   └── userRoutes.js          # API route definitions
│   ├── public/
│   │   └── uploads/profiles/      # User profile pictures storage
│   ├── server.js                  # Express server entry point
│   ├── package.json
│   ├── .env                       # Production environment (DO NOT commit)
│   ├── .env.example               # Environment template
│   └── .gitignore
│
├── frontend-vite/                 # Optimized Vite frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx         # App header
│   │   │   ├── UserForm.jsx       # User form component
│   │   │   ├── UserTable.jsx      # Users list with pagination
│   │   │   └── UserCard.jsx       # User detail card
│   │   ├── pages/
│   │   │   ├── ListPage.jsx       # Users list page
│   │   │   ├── AddPage.jsx        # Add user page
│   │   │   ├── EditPage.jsx       # Edit user page
│   │   │   └── ViewPage.jsx       # View user details
│   │   ├── services/
│   │   │   └── api.js             # Axios API client
│   │   ├── styles/                # CSS stylesheets
│   │   ├── utils/
│   │   │   └── validation.js      # Form validation functions
│   │   ├── App.jsx                # Root component
│   │   └── main.jsx               # React entry point
│   ├── public/                    # Static assets
│   ├── index.html                 # HTML template
│   ├── vite.config.js             # Vite build configuration
│   ├── package.json
│   ├── .env.local                 # Dev environment (DO NOT commit)
│   ├── .env.production            # Prod environment
│   ├── .env.example               # Environment template
│   └── .gitignore
│
├── DEPLOYMENT_GUIDE.md            # Complete deployment instructions
├── DEVELOPMENT_GUIDE.md           # Development setup guide
└── README.md                      # This file
```

## Quick Start

### Prerequisites
- Node.js v14+ (v16+ recommended)
- npm v6+ or yarn
- MongoDB (local or MongoDB Atlas cloud)

### Installation

1. **Clone and navigate to the project**
   ```bash
   cd bnv
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your MongoDB credentials and server config
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend-vite
   npm install
   cp .env.example .env.local
   # For production: .env.production
   ```

## Development

### Run Backend (Terminal 1)
```bash
cd backend
npm run dev
```
Server: `http://localhost:5000`

### Run Frontend (Terminal 2)
```bash
cd frontend-vite
npm run dev
```
Frontend: `http://localhost:5173`

API calls are proxied to the backend via Vite's dev server proxy configuration.

## Production Build

### Build Frontend for Production
```bash
cd frontend-vite
npm run build
```

Creates optimized production bundle in `dist/`

### Run Production Server
```bash
cd backend
npm start
```

The backend serves:
- Frontend from `../frontend-vite/dist`
- API endpoints at `/api/*`
- Static files (uploads) at `/uploads/*`

Access at: `http://localhost:5000`

## Environment Variables

### Backend (.env)
```properties
# MongoDB Connection (local or Atlas)
MONGODB_URI=mongodb://localhost:27017/user_management

# Server Configuration
PORT=5000
NODE_ENV=production

# CORS Origins (comma-separated)
CORS_ORIGIN=http://localhost:5000,http://localhost:3000,http://localhost:5173
```

### Frontend (.env.local - Development)
```properties
VITE_API_URL=http://localhost:5000/api
```

### Frontend (.env.production - Production)
```properties
VITE_API_URL=/api
```

## API Endpoints

### Users Management
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | List all users (with pagination) |
| GET | `/api/users/:id` | Get user by ID |
| POST | `/api/users` | Create new user |
| PUT | `/api/users/:id` | Update user |
| DELETE | `/api/users/:id` | Delete user |
| PATCH | `/api/users/:id/status` | Toggle user status |
| GET | `/api/users/search?q=query` | Search users |
| GET | `/api/users/export/csv` | Export users as CSV |

### Health Check
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Server health status |

## User Schema

```javascript
{
  _id: ObjectId,
  firstName: String (required, min: 2),
  lastName: String (required, min: 2),
  email: String (required, unique, valid email),
  phoneNumber: String (required, 10 digits),
  address: String (required, min: 5),
  city: String (required, min: 2),
  state: String (required, min: 2),
  zipCode: String (required, format: 12345 or 12345-6789),
  dateOfBirth: Date (required, age >= 18),
  gender: String (enum: ['Male', 'Female', 'Other']),
  profilePicture: String (optional, image path),
  status: String (enum: ['Active', 'Inactive'], default: 'Active'),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

## Validation Rules

### Frontend & Backend
- **First Name / Last Name:** Min 2 characters
- **Email:** Valid email format
- **Phone Number:** Exactly 10 digits
- **Address:** Min 5 characters
- **City / State:** Min 2 characters
- **Zip Code:** Format `12345` or `12345-6789`
- **Date of Birth:** Valid date, age >= 18 years
- **Gender:** One of Male, Female, Other
- **Profile Picture:** JPEG/PNG/GIF, max 5MB

## Deployment

### 🚀 Deploy Backend on Render

#### Prerequisites
- MongoDB Atlas account (free tier available)
- Render account
- GitHub repository

#### Step 1: Setup MongoDB Atlas
1. Create a free MongoDB Atlas account at [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Create a new cluster (M0 free tier)
3. Whitelist all IPs (0.0.0.0/0) in Network Access
4. Create a database user with username and password
5. Get your MongoDB connection string:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/user_management
   ```

#### Step 2: Deploy Backend to Render
1. Push your code to GitHub
2. Go to [render.com](https://render.com) and sign in
3. Click "New +" and select "Web Service"
4. Connect your GitHub repository
5. Configure the deployment:
   - **Name:** `user-management-api`
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** Free (for testing)

#### Step 3: Set Environment Variables on Render
In the Render dashboard, go to Environment Variables and add:
```properties
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/user_management
PORT=5000
NODE_ENV=production
CORS_ORIGIN=https://user-management-app.vercel.app,http://localhost:3000,http://localhost:5173
```

#### Step 4: Deploy
- Click "Deploy"
- Wait for the deployment to complete
- Your backend URL will be: `https://user-management-api.onrender.com`

### 🚀 Deploy Frontend on Vercel

#### Prerequisites
- Vercel account (free)
- GitHub repository
- Deployed backend URL from Render

#### Step 1: Configure Environment Variables
Create `.env.production` file in `frontend-vite/`:
```properties
VITE_API_URL=https://user-management-api.onrender.com/api
```

#### Step 2: Deploy Frontend to Vercel
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New..." and select "Project"
3. Import your GitHub repository
4. Select the `frontend-vite` directory as root directory
5. Configure build settings:
   - **Framework:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

#### Step 3: Set Environment Variables on Vercel
In the Vercel project settings, go to Environment Variables and add:
```properties
VITE_API_URL=https://user-management-api.onrender.com/api
```

#### Step 4: Deploy
- Click "Deploy"
- Wait for the deployment to complete
- Your frontend URL will be: `https://user-management-app.vercel.app`

### Update Frontend API URL
After deployment, update the API service in [frontend-vite/src/services/api.js](frontend-vite/src/services/api.js):
```javascript
const baseURL = import.meta.env.VITE_API_URL || '/api';
```

The app will automatically use the correct API URL based on the environment (development or production).

### Production Server Deployment
See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed instructions:
- Environment configuration
- Docker setup
- MongoDB Atlas integration
- Security checklist
- Performance optimization

### Quick Deploy Steps
```bash
# Prepare
npm install --production
cd frontend-vite && npm run build && cd ..

# Upload backend/ and frontend-vite/dist to server
# Set environment variables in .env

# Run on server
npm start
```

## Security Features

- ✅ Input validation (frontend & backend)
- ✅ CORS protection
- ✅ XSS protection headers
- ✅ Clickjacking protection
- ✅ Content-Type sniffing prevention
- ✅ File upload validation (images only)
- ✅ 5MB file size limit
- ✅ MongoDB injection prevention

## Performance Optimizations

- ✅ Frontend code splitting (React, Router, UI libraries)
- ✅ Asset minification and compression
- ✅ Lazy routing for pages
- ✅ API pagination (default: 10 items)
- ✅ Efficient MongoDB queries
- ✅ CORS headers optimized

## Error Handling

- Network errors: Toast notifications
- Validation errors: Field-level feedback
- Database errors: User-friendly messages
- File upload errors: Size & type validation
- Search: Fallback to empty results

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Android)

## Development Commands

### Backend
```bash
npm start          # Run production server
npm run dev        # Run with auto-reload (nodemon)
```

### Frontend
```bash
npm run dev        # Run dev server with HMR
npm run build      # Build for production
npm run preview    # Preview production build
npm run lint       # Run ESLint
npm run lint:fix   # Fix ESLint errors
```

## Troubleshooting

### MongoDB Connection Failed
- Check `MONGODB_URI` in `.env`
- Ensure MongoDB service is running (local) or Atlas cluster is active
- Verify network access if using Atlas

### Frontend Not Loading
- Ensure `frontend-vite/dist` exists: `npm run build`
- Check backend is serving static files
- Clear browser cache

### API CORS Errors
- Update `CORS_ORIGIN` in backend `.env`
- Include your frontend domain

### Upload Directory Issues
- Backend creates `public/uploads/profiles/` automatically
- Ensure write permissions on the server

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push and create a Pull Request

## License

ISC

## Support

For issues or questions:
1. Check [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
2. Check [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md)
3. Review API error responses
4. Check browser console for frontend errors
5. Check Node.js console for backend errors

## Version History

- **v1.0.0** - Initial production release
  - Migrated from CRA to Vite
  - Production-ready configuration
  - Enhanced security & performance
  - Comprehensive documentation

---

**Built with ❤️ using MERN Stack**
# Configure environment variables
# Edit .env file with your MongoDB URI and port
MONGODB_URI=mongodb://localhost:27017/user_management
PORT=5000
NODE_ENV=development

# Start the server
npm start

# For development with auto-reload
npm run dev
```

The backend server will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm start
```

The frontend will automatically open at `http://localhost:3000`

## API Endpoints

### Users CRUD Operations
- `GET /api/users` - Get all users with pagination
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Search and Export
- `GET /api/users/search?q=query&page=1&limit=10` - Search users
- `GET /api/users/export/csv` - Export all users to CSV

### Health Check
- `GET /api/health` - Check API health status

## Validation Rules

### User Fields
- **First Name**: Minimum 2 characters
- **Last Name**: Minimum 2 characters
- **Email**: Valid email format, unique
- **Phone Number**: Exactly 10 digits
- **Address**: Minimum 5 characters
- **City**: Minimum 2 characters
- **State**: Minimum 2 characters
- **Zip Code**: Valid format (12345 or 12345-6789)
- **Date of Birth**: Valid date, user must be 18+ years old

## Technologies Used

### Backend
- Express.js - Web framework
- Mongoose - MongoDB object modeling
- express-validator - Input validation
- json2csv - CSV export
- CORS - Cross-origin resource sharing
- dotenv - Environment variables

### Frontend
- React 18 - UI library
- React Router v6 - Client-side routing
- Axios - HTTP client
- React Toastify - Notifications
- CSS3 - Styling with responsive design

## Screenshots

### List Page
- Display users in a responsive table
- Search functionality
- Pagination support
- Sort by columns
- Actions: View, Edit, Delete
- Export to CSV button

### Add Page
- Form with validation
- All required fields with error messages
- Cancel and Save buttons
- Success notification after saving

### Edit Page
- Pre-filled form with user data
- Same validation as add page
- Update functionality
- Error handling

### View Page
- Display user card with all details
- Age calculation
- Formatted dates
- Contact links (email, phone)
- Edit and back buttons

## Usage Guide

### Creating a User
1. Click "Add User" button on the list page
2. Fill in all required fields
3. Click "Save" to create the user
4. You'll be redirected to the list page

### Editing a User
1. Click "Edit" button for the user you want to modify
2. Update the fields
3. Click "Save" to update
4. You'll be redirected to the list page

### Viewing User Details
1. Click "View" button to see complete user profile
2. View all personal and address information
3. Calculate age from date of birth
4. Click "Edit User" or "Back to List"

### Searching Users
1. Type in the search box to search by:
   - First/Last name
   - Email
   - Phone number
   - City
2. Results update as you type
3. Pagination available for search results

### Exporting to CSV
1. Click "Export CSV" button
2. Uses json2csv for conversion
3. File downloads automatically as `users.csv`

## Deployment Guide

### Backend Deployment (Heroku)

```bash
# Install Heroku CLI
# Login to Heroku
heroku login

# Create a new Heroku app
heroku create your-app-name

# Add MongoDB Atlas URI to environment variables
heroku config:set MONGODB_URI=your_mongodb_uri

# Deploy
git push heroku main
```

### Frontend Deployment (Netlify)

```bash
# Build the frontend
cd frontend
npm run build

# Deploy using Netlify CLI
npm install -g netlify-cli
netlify deploy --prod --dir=build
```

Or use Netlify UI:
1. Connect your GitHub repository
2. Set build command: `npm run build`
3. Set publish directory: `build`
4. Deploy

## Error Handling

- Validation errors shown with specific field messages
- API errors displayed as toast notifications
- User-friendly error messages
- Automatic redirect on errors
- Network error handling

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## Performance Considerations

- Pagination to limit data loaded
- Debounced search
- Lazy loading of user details
- Optimized CSS with responsive design
- Efficient API calls with caching

## Security Features

- Input validation on both client and server
- Email uniqueness validation
- CORS configuration
- Error message abstraction (no sensitive info leaked)
- Secure password field handling ready for future implementation

## Future Enhancements

- User authentication and authorization
- Role-based access control (Admin, User)
- Advanced filtering options
- Bulk operations (bulk delete, bulk edit)
- User avatar/profile picture
- Activity logs
- Email notifications
- Two-factor authentication
- API rate limiting
- Database indexing for performance

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB server is running
- Check MONGODB_URI in .env file
- Verify network connectivity to MongoDB

### CORS Error
- Check CORS configuration in server.js
- Ensure frontend and backend URLs match
- Clear browser cache

### Port Already in Use
- Change PORT in .env file
- Or kill the process using the port

### Module Not Found
- Run `npm install` in both backend and frontend directories
- Check node_modules folder exists

## License

MIT

## Support

For issues or questions, please create an issue in the repository.
