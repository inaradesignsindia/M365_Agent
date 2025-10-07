# M365 Agent

## Description

This web application provides organizational login via Microsoft Azure AD, integrates with Microsoft 365 through Microsoft Graph, features a UI similar to M365 admin centers, and includes a drag-and-drop report builder for creating customizable reports with filters and download functionality. All selected components are free or free-tier to minimize costs.

### Tech Stack

- **Frontend**: React 18 with TypeScript, Vite, Fluent UI (@fluentui/react), React Router, Redux Toolkit
- **Backend**: Netlify Functions (Node.js 18+), MSAL Node (@azure/msal-node), Microsoft Graph Client
- **Database**: MongoDB Atlas (free tier)
- **Authentication**: Microsoft Azure AD with MSAL
- **Report Builder**: React Flow for drag-and-drop interface
- **Deployment**: Netlify (frontend and functions), MongoDB Atlas

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

## Environment Variables

### Netlify Functions
- `CLIENT_ID`: Azure AD application client ID
- `CLIENT_SECRET`: Azure AD application client secret
- `TENANT_ID`: Azure AD tenant ID

### Frontend
- `VITE_CLIENT_ID`: Azure AD application client ID (same as functions)
- `VITE_TENANT_ID`: Azure AD tenant ID (same as functions)

## Deployment to Netlify (Free Tier)

1. Create a new site on Netlify.
2. Connect your GitHub repository.
3. Set the following build settings:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
4. Add environment variables in Netlify dashboard:
   - `CLIENT_ID`
   - `CLIENT_SECRET`
   - `TENANT_ID`
   - `VITE_CLIENT_ID`
   - `VITE_TENANT_ID`
5. Deploy.

### Notes
- Netlify automatically detects and deploys functions from `netlify/functions`.
- The `netlify.toml` file configures the build and function settings.
- Netlify free tier includes 100GB bandwidth/month, 100 function invocations/month, and unlimited static sites.

## Deployment Notes

- **Frontend and Functions**: Deploy to Netlify using `npm run build` output. Free tier supports unlimited static sites and 125k function invocations/month.
- **Database**: MongoDB Atlas free tier (512MB storage).
- **CI/CD**: Netlify provides built-in deployment on push to main branch.
- **Security**: Ensure HTTPS, store secrets as environment variables, implement token refresh, and validate permissions.
- **Monitoring**: Use Netlify built-in monitoring and error logging.

For detailed architecture and implementation phases, refer to `architecture_plan.md`.