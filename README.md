# Event Requirement Posting Flow

A full-stack application for posting event requirements with dynamic multi-step forms, built with Next.js and Express.

## Tech Stack

- **Frontend:** Next.js 14+ (App Router), TypeScript, Tailwind CSS, shadcn/ui, React Hook Form, Zod, Zustand
- **Backend:** Node.js, Express, TypeScript, MongoDB, Mongoose
- **Form Management:** React Hook Form with Zod validation
- **State Management:** Zustand with localStorage persistence

## Features

- Multi-step form with 4 steps
- Dynamic field rendering based on category selection (Event Planner, Performer, Crew)
- Form state persistence using localStorage
- Real-time validation using Zod schemas
- Responsive design
- MongoDB storage with category discrimination

## Project Structure

```
evant/
├── frontend/          # Next.js application
└── backend/           # Express API
```

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (running locally or connection URI)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
The `.env` file is already created with default values:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/evant
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

4. Start MongoDB (if running locally):
```bash
# On Windows
mongod

# On macOS/Linux
sudo systemctl start mongod
```

5. Start the backend server:
```bash
npm run dev
```

The API will be available at `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies (if not already installed):
```bash
npm install
```

3. Configure environment variables:
The `.env.local` file is already created:
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Usage

1. Open `http://localhost:3000` in your browser
2. Click "Post a Requirement"
3. Follow the 4-step form:
   - **Step 1:** Fill in event basics (name, type, date, location, category)
   - **Step 2:** Fill in category-specific fields (changes based on Step 1 selection)
   - **Step 3:** Add additional details (description, contact info)
   - **Step 4:** Review and submit

## API Endpoints

- `POST /api/requirements` - Create new requirement
- `GET /api/requirements` - List all requirements (with filters)
- `GET /api/requirements/:id` - Get specific requirement
- `PATCH /api/requirements/:id` - Update requirement
- `DELETE /api/requirements/:id` - Delete requirement

### Query Parameters for GET /api/requirements

- `category` - Filter by category (event_planner, performer, crew)
- `status` - Filter by status (open, in_progress, fulfilled, cancelled)
- `limit` - Number of results per page (default: 50)
- `page` - Page number (default: 1)

## Form Flow

### Step 1: Event Basics
- Event name
- Event type (Wedding, Corporate, Concert, etc.)
- Event date (start and optional end date)
- Location
- Venue (optional)
- Category selection (Event Planner, Performer, or Crew)

### Step 2: Category-Specific Fields

**Performer:**
- Performance type (Music, Dance, Comedy, etc.)
- Duration needed
- Equipment requirements

**Crew:**
- Crew role/type
- Number of crew members needed
- Shift timing

**Event Planner:**
- Currently shows placeholder field
- Awaiting specific field requirements

### Step 3: Additional Details
- Detailed description
- Contact email
- Contact phone (optional)
- Contact preference
- Response deadline (optional)
- Additional notes (optional)

### Step 4: Review & Submit
- Review all entered information
- Edit any section by clicking "Edit"
- Final submission

## Data Storage

Requirements are stored in MongoDB with the following structure:

```javascript
{
  eventName: String,
  eventType: String,
  eventDate: { startDate: Date, endDate: Date },
  location: String,
  venue: String,
  category: 'event_planner' | 'performer' | 'crew',
  contactInfo: { email, phone, preference },
  description: String,
  responseDeadline: Date,
  additionalNotes: String,
  status: 'open' | 'in_progress' | 'fulfilled' | 'cancelled',
  // Category-specific fields
  plannerDetails: { ... },
  performerDetails: { ... },
  crewDetails: { ... },
  timestamps: { createdAt, updatedAt }
}
```

## Development

### Backend Development
```bash
cd backend
npm run dev  # Uses nodemon for hot-reload
```

### Frontend Development
```bash
cd frontend
npm run dev  # Next.js dev server with hot-reload
```

### Build for Production

**Backend:**
```bash
cd backend
npm run build
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
npm start
```

## Testing the Application

1. Ensure MongoDB is running
2. Start the backend server (`cd backend && npm run dev`)
3. Start the frontend server (`cd frontend && npm run dev`)
4. Navigate to `http://localhost:3000`
5. Test the complete flow for all three categories:
   - Event Planner
   - Performer
   - Crew
6. Verify submissions in MongoDB:
```bash
mongosh
use evant
db.requirements.find().pretty()
```

## Troubleshooting

### Backend Issues

**MongoDB Connection Error:**
- Ensure MongoDB is running
- Check the `MONGODB_URI` in `.env`
- Verify MongoDB is accessible at the specified URI

**Port Already in Use:**
- Change the `PORT` in `.env` to a different value
- Kill the process using port 5000: `lsof -ti:5000 | xargs kill -9` (macOS/Linux)

### Frontend Issues

**API Connection Error:**
- Verify backend is running on port 5000
- Check `NEXT_PUBLIC_API_URL` in `.env.local`
- Check browser console for CORS errors

**Build Errors:**
- Clear `.next` directory: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`

## Notes

- The Event Planner category fields are currently placeholders and need to be specified
- Form data is persisted in localStorage to prevent data loss on page refresh
- All dates are stored in ISO 8601 format
- The application uses discriminated unions for type-safe category handling

## Future Enhancements

- User authentication
- File upload capability
- Email notifications
- Admin dashboard to view all requirements
- Search and filter functionality on frontend
- Real-time updates using WebSockets
