URL Shortener Microservice
==========================

This is a full-stack application that provides URL shortening functionality, along with analytics for the shortened links. The project is built following a microservice architecture and integrates a custom logging middleware.

Features ✨
----------

### Backend

*   **URL Shortening:** Creates a unique short link for a given long URL.
    
*   **Custom Shortcodes:** Allows users to provide an optional custom shortcode.
    
*   **Redirection:** Redirects users from the short link to the original long URL.
    
*   **Statistics:** Tracks and retrieves analytics, including total clicks and detailed click data.
    
*   **Error Handling:** Provides descriptive error responses for invalid requests or expired links.
    
*   **Mandatory Logging:** Integrates a reusable logging middleware to capture application events.
    

### Frontend

*   **URL Shortener Page:** A user interface to shorten up to 5 URLs concurrently.
    
*   **Statistics Page:** A page to retrieve and display statistics for a shortened URL.
    
*   **Client-Side Validation:** Validates form inputs before making API calls.
    
*   **Professional UI:** Utilizes Material UI for a clean and responsive design.
    

Technology Stack 💻
-------------------

### Backend

*   **Node.js**: JavaScript runtime environment.
    
*   **Express.js**: Web application framework for building the RESTful API.
    
*   **TypeScript**: Adds static typing for improved code quality.
    
*   **Mongoose**: MongoDB object modeling tool.
    
*   **shortid**: Library for generating unique shortcodes.
    
*   **dotenv**: For managing environment variables.
    
*   **axios**: For making HTTP requests to the logging API.
    

### Frontend

*   **React**: A JavaScript library for building user interfaces.
    
*   **TypeScript**: A superset of JavaScript.
    
*   **Material UI (MUI)**: A React UI framework for a professional look and feel.
    
*   **axios**: For making API calls to the backend microservice.
    

Prerequisites 🛠️
-----------------

*   **Node.js**: [Download and Install Node.js](https://nodejs.org/)
    
*   **MongoDB**: [Download and Install MongoDB Community Server](https://www.mongodb.com/try/download/community)
    

Installation & Setup 🚀
-----------------------

1.  Bashgit clone https://github.com//.gitcd
    
2.  Bashcd "Backend Test Submission"npm installCreate a .env file in this directory and add your MongoDB URI and access token.Code snippetMONGODB\_URI=mongodb://localhost:27017/url-shortenerACCESS\_TOKEN=
    
3.  Bashcd ../"Frontend Test Submission"npm installCreate a src/logger.ts file with your access token.TypeScript// In src/logger.tsconst BACKEND\_URL = 'http://localhost:5000';const ACCESS\_TOKEN = '';// ... rest of the code
    
4.  **Run the Application:**
    
    *   Bashcd "Backend Test Submission"npm run dev
        
    *   Bashcd "Frontend Test Submission"npm run dev
        

Usage 💡
--------

Your application will be running on http://localhost:5173.

### URL Shortener Page

*   Fill in the URL fields and click **"SHORTEN"**.
    
*   The application will display the shortened link and its expiry date.
    

### Statistics Page

*   Enter a shortened URL's shortcode (e.g., my-wiki) and click **"GET STATS"**.
    
*   The application will display detailed click data, including the total clicks.
    

Folder Structure 📁
-------------------

The project is organized into the three mandatory folders for the full-stack track.

*   Backend Test Submission: Contains the Node.js/Express.js microservice.
    
*   Frontend Test Submission: Contains the React web application.
    
*   Logging Middleware: Contains the reusable Log() function.
    

Screenshots 📸
--------------
