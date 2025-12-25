# Anniversary Website

A beautiful, interactive anniversary website built with React (frontend) and Node.js/Express (backend) with MongoDB.

## Features

- **Landing Page**: Welcome page with anniversary theme
- **Our Story**: Share your love story
- **Reasons Why**: List reasons why you love each other
- **Love Letters**: Write and store love letters
- **Music**: Dedicated music section
- **Quiz**: Fun anniversary quiz
- **Dashboard**: Overview of all sections
- **Dark Mode**: Toggle between light and dark themes

## Tech Stack

### Frontend
- React 18
- Vite
- CSS Modules
- Axios for API calls

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Sundra731/anniversary-website.git
cd anniversary-website
```

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

4. Set up environment variables:
   - Copy `backend/.env.example` to `backend/.env`
   - Fill in your MongoDB connection string and JWT secret

5. Start the backend:
```bash
cd backend
npm start
```

6. Start the frontend (in a new terminal):
```bash
cd frontend
npm run dev
```

7. Open [http://localhost:5173](http://localhost:5173) in your browser

## Project Structure

```
anniversary-website/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── styles/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   └── package.json
├── .gitignore
└── README.md
```

## API Endpoints

- `GET /api/stories` - Get all stories
- `POST /api/stories` - Create a new story
- `GET /api/reasons` - Get all reasons
- `POST /api/reasons` - Create a new reason
- `GET /api/love-letters` - Get all love letters
- `POST /api/love-letters` - Create a new love letter
- `GET /api/music` - Get music data
- `POST /api/quiz` - Submit quiz answers

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.