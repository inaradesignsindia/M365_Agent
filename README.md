# M365 Agent

## Description

This web application provides organizational login via Microsoft Azure AD, integrates with Microsoft 365 through Microsoft Graph, features a UI similar to M365 admin centers, and includes a drag-and-drop report builder for creating customizable reports with filters and download functionality. All selected components are free or free-tier to minimize costs.

### Tech Stack

- **Frontend**: React 18 with TypeScript, Vite, Fluent UI (@fluentui/react), React Router, Redux Toolkit
- **Backend**: Node.js 18+, Express.js, MSAL Node (@azure/msal-node), Microsoft Graph Client
- **Database**: MongoDB Atlas (free tier)
- **Authentication**: Microsoft Azure AD with MSAL
- **Report Builder**: React Flow for drag-and-drop interface
- **Deployment**: Vercel (frontend), Heroku/Vercel (backend), MongoDB Atlas

## Setup Instructions

### Prerequisites

- Node.js 18+
- MongoDB Atlas account (for database storage)
- Microsoft Azure AD app registration with appropriate permissions (User.Read, Directory.Read.All, Reports.Read.All)

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd M365_Agent
   ```

2. Install backend dependencies:
   ```
   cd backend
   npm install
   ```

3. Install frontend dependencies:
   ```
   cd ../frontend
   npm install
   ```

### Configuration

1. Set up Azure AD application registration in the Azure portal.
2. Configure environment variables:
   - Backend: Create `.env` file with Azure client ID, client secret, MongoDB connection string, etc.
   - Frontend: Update `authConfig.ts` with Azure client ID and authority.

### Running the Application

1. Start the backend server:
   ```
   cd backend
   npm start
   ```

2. Start the frontend development server:
   ```
   cd frontend
   npm run dev
   ```

The application will be available at `http://localhost:5173` (frontend) and backend API at configured port (default 3000).

## Deployment Notes

- **Frontend**: Deploy to Vercel using `npm run build` output. Free tier supports unlimited static sites and serverless functions.
- **Backend**: Deploy to Heroku (free tier: 512MB RAM, 1 web dyno) or Vercel serverless functions. Use `npm start` for production.
- **Database**: MongoDB Atlas free tier (512MB storage).
- **CI/CD**: Use GitHub Actions for automated deployment on push to main branch, or leverage Vercel/Heroku built-in deployment.
- **Security**: Ensure HTTPS, store secrets as environment variables, implement token refresh, and validate permissions.
- **Monitoring**: Use Vercel/Heroku built-in monitoring and error logging.

For detailed architecture and implementation phases, refer to `architecture_plan.md`.