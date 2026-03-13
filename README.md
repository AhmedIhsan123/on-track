# on-track

> A full-stack job application tracker to help you stay organized throughout your job search.

on-track is a web application that centralizes your entire job search in one place — track applications, manage interviews, set follow-up reminders, and monitor your progress with built-in analytics.

---

## Features

- **Application Management** — Add, edit, and organize job applications with status tracking (Applied, Interview, Offer, Rejected, etc.)
- **Interview Tracking** — Log interview rounds, dates, and notes for each application
- **Follow-up Reminders** — Set reminders so you never miss a follow-up
- **Resume Uploads** — Attach and manage resumes directly to applications
- **Analytics Dashboard** — Visualize key metrics like response rates, interview rates, and application trends over time
- **Secure Authentication** — User accounts with secure login and session management

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React |
| Backend | Express.js (Node.js) |
| Database | MySQL |
| API | REST |
| Auth | JWT / Secure Authentication |

---

## Getting Started

### Prerequisites

- Node.js (v18+)
- MySQL (v8+)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/on-track.git
   cd on-track
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   cd server
   npm install

   # Install frontend dependencies
   cd ../client
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the `/server` directory:
   ```env
   DB_HOST=localhost
   DB_USER=your_mysql_user
   DB_PASSWORD=your_mysql_password
   DB_NAME=ontrack
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

4. **Set up the database**
   ```bash
   cd server
   npm run db:migrate
   ```

5. **Start the app**
   ```bash
   # Start the backend server
   cd server
   npm run dev

   # In a separate terminal, start the frontend
   cd client
   npm start
   ```

6. Open your browser and navigate to `http://localhost:3000`

---

## Project Structure

```
on-track/
├── client/          # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── ...
├── server/          # Express.js backend
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   └── ...
└── README.md
```

---

## API Overview

The backend exposes a RESTful API. Key endpoint groups:

- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Login and receive a JWT
- `GET /api/applications` — Get all applications for the authenticated user
- `POST /api/applications` — Create a new application
- `PUT /api/applications/:id` — Update an application
- `DELETE /api/applications/:id` — Delete an application
- `GET /api/analytics` — Fetch analytics data

> Full API documentation coming soon.

---

## Roadmap

- [ ] Email/SMS reminder notifications
- [ ] Calendar integration
- [ ] Export applications to CSV
- [ ] Mobile-responsive improvements
- [ ] Dark mode

---

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

> ⚠️ **Note:** This is a temporary README and will be updated as the project evolves.
