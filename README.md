# LinkedIn Profile Scraper Extension

This project is a Chrome Extension built with React and Tailwind CSS that scrapes data from LinkedIn profiles and sends it to a Node.js + Express backend using PostgreSQL via the `pg` library.

## Tech Stack

- Frontend: React, Tailwind CSS, Chrome Extension (Manifest v3)
- Backend: Node.js, Express, pg (node-postgres)
- Database: PostgreSQL

## Folder Structure

```

Linkedin-Scraper/
├── client/
│   ├── public/
│   │   ├── manifest.json
│   │   ├── content.js
│   │   └── icon.png
│   └── src/
│       ├── App.jsx
│       └── ...
├── server/
│   ├── index.js
│   └── .env

````

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Nikhil4002-50-82/LinkedIn-Scraper.git
cd LinkedIn-Scraper
````

### 2. Backend Setup

#### Install Dependencies

```bash
cd server
npm install
```

#### Configure Environment Variables

Create a `.env` file inside the `server` folder with the following:

```
DB_NAME=your_db_name
DB_USER=your_postgres_username
DB_PASSWORD=your_postgres_password
DB_HOST=localhost
DB_PORT=5432
```

#### Run the Server

```bash
nodemon index.js
```

The server will start at `http://localhost:5000` and automatically create the required `Profiles` table if it does not exist.

### 3. Frontend Setup

#### Install Dependencies

```bash
cd client
npm install
```

#### Build the Extension

```bash
npm run build
```

The output will be in the `dist/` folder.

#### Load the Extension in Chrome

1. Open Chrome and navigate to `chrome://extensions`
2. Enable Developer Mode (toggle in the top-right corner)
3. Click "Load Unpacked"
4. Select the `dist` folder inside the `client` directory

### 4. Using the Extension

1. Log in to LinkedIn manually in a Chrome tab
2. Click the extension icon to open the popup
3. Paste one or more LinkedIn profile URLs (one per line)
4. Click "Start Scraping"
5. The extension will open each profile, scrape the required data, and send it to the backend API

### 5. View Stored Data

Use pgAdmin to run the following:

```sql
SELECT * FROM "Profiles";
```

