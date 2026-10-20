# ContentDNA – AI-Powered Brand Voice Consistency Platform

ContentDNA is an AI-powered SaaS application prototype designed to ensure brand voice consistency across all generated content.

## Project Structure

This is a monorepo containing both the frontend and backend:
- `frontend/`: React.js + Vite + Tailwind CSS
- `backend/`: FastAPI (Python)

## Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [Python](https://www.python.org/) (v3.9 or higher recommended)
- Git

## Getting Started

Follow these steps to run the application locally on your machine.

### 1. Setup and Run the Backend

Open a terminal and navigate to the root of the project, then run:

```bash
cd backend

# Create a virtual environment
python -m venv venv

# Activate the virtual environment
# On Windows:
.\venv\Scripts\activate
# On macOS/Linux:
# source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start the FastAPI server
uvicorn main:app --reload --port 8000
```
The backend API will run at `http://localhost:8000`.

### 2. Setup and Run the Frontend

Open a **new** terminal window, navigate to the root of the project, and run:

```bash
cd frontend

# Install Node modules
npm install

# Start the Vite development server
npm run dev
```
The frontend will be accessible at `http://localhost:5173`.

## Current Prototype Status
- **UI flow:** Fully functional (Onboarding, Dashboard, Checker).
- **AI functionality:** Currently mocked in `backend/main.py`. The next step is to integrate a real AI API (like OpenAI, Claude, or Gemini) in the FastAPI routes.
- **Database:** Local storage is currently used in the browser. Next step is to configure PostgreSQL and connect it via SQLAlchemy (already included in `requirements.txt`).
