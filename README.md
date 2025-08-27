# 🚖 Ride Management System - Frontend

A production-grade, fully responsive, and role-based ride booking platform frontend built with React, Redux Toolkit, and TypeScript. This application provides distinct user experiences for Riders, Drivers, and Admins with a modern, intuitive interface.

## 🌐 Live Demo

**Frontend:** [https://ride-booking-frontend-xi.vercel.app](https://ride-booking-frontend-xi.vercel.app)
**Backend API:** [https://book-riding-system.vercel.app](https://book-riding-system.vercel.app)

## 📖 Project Overview

This frontend application is part of a full-stack ride booking platform similar to Uber or Pathao. It features a complete user management system with role-based access control, real-time ride tracking, comprehensive dashboards, and emergency safety features.

### Key Highlights
- 🎯 **Role-based Authentication** - Separate interfaces for Riders, Drivers, and Admins
- 📱 **Fully Responsive** - Optimized for mobile, tablet, and desktop devices
- 🗺️ **Real-time Tracking** - Live ride updates with interactive maps
- 📊 **Analytics Dashboard** - Comprehensive data visualization for insights
- 🆘 **Emergency SOS System** - Enhanced safety features for users
- 🎨 **Modern UI/UX** - Clean, intuitive interface with smooth animations

## ✨ Features

### 🏠 Public Pages
- **Landing Page** - Hero section, features overview, testimonials, and call-to-action
- **About Us** - Company background and mission
- **Features** - Detailed breakdown of platform capabilities
- **Contact** - Validated inquiry form
- **FAQ** - Searchable frequently asked questions

### 👤 Authentication & User Management
- JWT-based secure authentication
- Role-based registration (Rider/Driver/Admin)
- Account status handling (Active/Blocked/Suspended)
- Persistent login sessions
- Profile management with password updates

### 🚗 Rider Features
- **Ride Booking** - Easy-to-use booking form with fare estimation
- **Live Tracking** - Real-time ride progress with driver details
- **Ride History** - Paginated history with search and filters
- **Ride Details** - Complete ride information with status timeline
- **Profile Management** - Update personal information and preferences

### 🚙 Driver Features
- **Availability Toggle** - Online/Offline status control
- **Ride Management** - Accept/reject incoming ride requests
- **Active Ride Updates** - Status management throughout ride lifecycle
- **Earnings Dashboard** - Visual breakdown with charts and analytics
- **Ride History** - Complete ride records with filtering options
- **Vehicle Profile** - Manage vehicle details and documentation

### 👨‍💼 Admin Features
- **User Management** - Search, filter, and manage all users
- **Ride Oversight** - Monitor all rides with advanced filtering
- **Analytics Dashboard** - Comprehensive platform statistics and trends
- **Content Management** - Platform settings and configurations
- **Reporting Tools** - Generate detailed reports and insights

### 🆘 Safety Features
- **Emergency SOS Button** - Quick access to emergency services
- **Live Location Sharing** - Share real-time location with emergency contacts
- **Emergency Contacts** - Pre-configured trusted contacts for quick notifications
- **Safety Settings** - Customizable safety preferences and alerts

## 🛠️ Technology Stack

### Frontend Core
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development
- **Redux Toolkit** - State management with RTK Query for API calls
- **React Router** - Client-side routing and navigation

### Styling & UI
- **Tailwind CSS** - Utility-first CSS framework
- **Headless UI** - Unstyled, accessible UI components
- **React Icons** - Comprehensive icon library
- **Framer Motion** - Smooth animations and transitions

### Data & APIs
- **RTK Query** - Powerful data fetching and caching
- **Axios** - HTTP client for API requests
- **React Hook Form** - Form handling with validation
- **Yup/Zod** - Schema validation

### Visualization & Maps
- **Recharts** - Data visualization and charts
- **Leaflet/Mapbox** - Interactive maps (optional)
- **React Hot Toast** - Elegant notifications

### Development Tools
- **Vite** - Fast build tool and development server
- **ESLint** - Code linting and formatting
- **Prettier** - Code formatting
- **Husky** - Git hooks for code quality

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ride-management-frontend.git
   cd ride-management-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   VITE_FIREBASE_CONFIG=your_firebase_config
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Build for Production**
   ```bash
   npm run build
   # or
   yarn build
   ```

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── common/          # Shared components
│   ├── forms/           # Form components
│   ├── layout/          # Layout components
│   └── ui/              # UI primitives
├── pages/               # Page components
│   ├── auth/            # Authentication pages
│   ├── rider/           # Rider dashboard pages
│   ├── driver/          # Driver dashboard pages
│   ├── admin/           # Admin dashboard pages
│   └── public/          # Public pages
├── store/               # Redux store configuration
│   ├── api/             # RTK Query API slices
│   ├── slices/          # Redux slices
│   └── index.ts         # Store configuration
├── hooks/               # Custom React hooks
├── utils/               # Utility functions
├── types/               # TypeScript type definitions
├── constants/           # Application constants
└── assets/              # Static assets
```

## 🎯 Key Features Implementation

### State Management
- **Redux Toolkit** for global state management
- **RTK Query** for efficient API data fetching and caching
- **Persistent state** for authentication and user preferences

### Responsive Design
- **Mobile-first approach** with Tailwind CSS
- **Flexible grid layouts** adapting to different screen sizes
- **Touch-friendly interactions** for mobile devices

### Performance Optimization
- **Lazy loading** for route-based code splitting
- **Skeleton loaders** for better perceived performance
- **Optimized images** with proper sizing and formats
- **Memoization** for expensive calculations

### Error Handling
- **Comprehensive form validation** with clear error messages
- **API error handling** with user-friendly notifications
- **Network error recovery** with retry mechanisms
- **Global error boundaries** for graceful error handling

## 🧪 Testing

### Test Credentials
```
Admin User:
Email: admin@rideapp.com
Password: Admin123!

Driver User:
Email: driver@rideapp.com
Password: Driver123!

Rider User:
Email: rider@rideapp.com
Password: Rider123!
```

### Running Tests
```bash
npm run test
# or
yarn test
```

## 📱 API Integration

The frontend communicates with a RESTful backend API built with Node.js and Express. Key API endpoints include:

- **Authentication**: `/auth/login`, `/auth/register`, `/auth/logout`
- **Rides**: `/rides`, `/rides/:id`, `/rides/book`, `/rides/track`
- **Users**: `/users/profile`, `/users/update`
- **Admin**: `/admin/users`, `/admin/rides`, `/admin/analytics`

API documentation is available at: [Backend API Docs](https://your-backend-url.com/api-docs)

## 🚀 Deployment

### Frontend Deployment (Vercel/Netlify)
1. Connect your GitHub repository
2. Set environment variables
3. Deploy with automatic builds on push

### Environment Variables for Production
```env
VITE_API_BASE_URL=https://your-production-api.com/api
VITE_GOOGLE_MAPS_API_KEY=your_production_maps_key
VITE_ENVIRONMENT=production
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Submit a pull request

### Code Style Guidelines
- Follow TypeScript best practices
- Use meaningful component and variable names
- Add JSDoc comments for complex functions
- Maintain consistent formatting with Prettier
- Write unit tests for new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **[Your Name]** - Full Stack Developer
- **[Team Member 2]** - UI/UX Designer
- **[Team Member 3]** - Backend Developer

## 📞 Support

For support, email support@rideapp.com or join our Slack channel.

## 🙏 Acknowledgments

- React and Redux teams for excellent documentation
- Tailwind CSS for the utility-first approach
- The open-source community for valuable libraries and tools

---

**Made with ❤️ by [Your Team Name]**