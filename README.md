# LinkedIn Profile Scraper Extension

This project is a Chrome Extension built with React and Tailwind CSS that scrapes data from LinkedIn profiles and sends it to a Node.js + Express + PostgreSQL backend.

## Tech Stack

- Frontend: React, Tailwind CSS, Chrome Extension (Manifest v3)
- Backend: Node.js, Express, Sequelize
- Database: PostgreSQL

## Folder Structure

```
linkedin-scraper/
├── chrome-extension-react/  
│   ├── public/
│   │   ├── manifest.json
│   │   ├── content.js
│   │   └── icon.png
│   └── src/
│       ├── App.jsx
│       └── ...
├── linkedin-backend/          # Backend API
│   └── index.js

````

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/linkedin-scraper.git
cd linkedin-scraper
````

### 2. Backend Setup

#### Install Dependencies

```bash
cd server
npm install
```

#### Configure Environment Variables

Create a `.env` file in the `linkedin-backend` folder:

```
DB_NAME=your_db_name
DB_USER=your_postgres_username
DB_PASSWORD=your_postgres_password
```

#### Run the Server

```bash
nodemon index.js
```

The server will start at `http://localhost:5000`.

### 3. Frontend Setup

#### Install Dependencies

```bash
cd extension
npm install
```

#### Build the Extension

```bash
npm run build
```

The output will be in the `dist/` folder.

#### Load in Chrome

1. Open Chrome and go to `chrome://extensions`
2. Enable Developer Mode
3. Click "Load Unpacked"
4. Select the `dist` folder inside `chrome-extension-react`

### 4. Using the Extension

1. Login to LinkedIn manually in Chrome
2. Open the extension popup
3. Paste one or more LinkedIn profile URLs (one per line)
4. Click "Start Scraping"
5. The extension will open each profile, scrape data, and send it to your backend

### 5. View Stored Data

You can view the data in your PostgreSQL database using any client like `psql`, DBeaver, or pgAdmin:

```sql
SELECT * FROM "Profiles";
```

