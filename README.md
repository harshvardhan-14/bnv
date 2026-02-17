# User Management System - MERN Stack

A full-stack MERN application for managing user information with CRUD operations, search functionality, and CSV export.

## Project Structure

```
bnv/
├── backend/
│   ├── models/
│   │   └── User.js
│   ├── controllers/
│   │   └── userController.js
│   ├── routes/
│   │   └── userRoutes.js
│   ├── .env
│   ├── package.json
│   └── server.js
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── components/
    │   │   ├── Header.js
    │   │   ├── UserTable.js
    │   │   ├── UserForm.js
    │   │   └── UserCard.js
    │   ├── pages/
    │   │   ├── ListPage.js
    │   │   ├── AddPage.js
    │   │   ├── EditPage.js
    │   │   └── ViewPage.js
    │   ├── services/
    │   │   └── api.js
    │   ├── styles/
    │   │   ├── App.css
    │   │   ├── Header.css
    │   │   ├── UserTable.css
    │   │   ├── UserForm.css
    │   │   ├── UserCard.css
    │   │   └── Pages.css
    │   ├── utils/
    │   │   └── validation.js
    │   ├── App.js
    │   └── index.js
    └── package.json
```

## Features

### Backend
- ✅ CRUD API for user information with pagination
- ✅ Search API (search by name, email, phone, city)
- ✅ Export to CSV functionality
- ✅ Input validation and error handling
- ✅ MongoDB integration with Mongoose
- ✅ RESTful API design

### Frontend
- ✅ Responsive design (Mobile/Desktop)
- ✅ Multiple routing (List, Add, Edit, View)
- ✅ Component-based architecture
- ✅ Form validation with real-time error messages
- ✅ Search and pagination
- ✅ Toast notifications for success/error
- ✅ Sort functionality by columns
- ✅ Professional UI with consistent styling

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

## Setup Instructions

### 1. MongoDB Setup

**Option A: Local MongoDB**
```bash
# Install MongoDB on your system
# Start MongoDB service
mongod
```

**Option B: MongoDB Atlas (Cloud)**
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account and cluster
3. Get the connection string
4. Replace `MONGODB_URI` in backend/.env with your connection string

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

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
