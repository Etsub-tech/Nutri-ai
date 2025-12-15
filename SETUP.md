# Meal Planner Setup Guide

## Prerequisites
- Node.js installed
- MongoDB database (local or MongoDB Atlas)
- OpenAI API key

## Installation Steps

### 1. Install Root Dependencies
```bash
npm install
```

### 2. Install Frontend Dependencies
```bash
cd nutri-ai-frontend
npm install
cd ..
```

### 3. Install Backend Dependencies
```bash
cd meal-ai-backend
npm install
cd ..
```

### 4. Setup Backend Environment Variables

Create a `.env` file in the `meal-ai-backend` directory with the following:

```
MONGO_URL=your_mongodb_connection_string
OPENAI_API_KEY=your_openai_api_key
PORT=5000
```

**Example MongoDB URLs:**
- Local: `mongodb://localhost:27017/meal-planner`
- MongoDB Atlas: `mongodb+srv://username:password@cluster.mongodb.net/meal-planner`

### 5. Run the Application

**Option 1: Run both frontend and backend together (recommended)**
```bash
npm run dev
```

**Option 2: Run separately**

Terminal 1 (Backend):
```bash
npm run backend
```

Terminal 2 (Frontend):
```bash
npm run frontend
```

## Access the Application

- Frontend: http://localhost:5173 (or the port shown in terminal)
- Backend API: http://localhost:5000

## Troubleshooting

1. **Blank Page**: Make sure both frontend and backend are running
2. **API Errors**: Check that the backend is running on port 5000
3. **Database Errors**: Verify your MongoDB connection string in `.env`
4. **OpenAI Errors**: Make sure your OpenAI API key is valid

