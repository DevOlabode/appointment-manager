# Appointment Manager App

A simple Node.js and Express application for managing client bookings with MongoDB. Built for small-scale service providers who need a lightweight, browser-based appointment tracker.

## Features

- Create, read, update, and delete (CRUD) client appointments
- Appointment validation using Joi
- Status management (Scheduled, Completed, Canceled)
- Clean UI rendered with EJS and styled using Bootstrap (optional)
- Custom error handling with graceful fallbacks
- Organized with MVC structure and async error handling

## Demo

Homepage:  
`http://localhost:3000/`

Appointments List:  
`http://localhost:3000/booking`

## Technologies Used

- **Node.js** + **Express**
- **MongoDB** with **Mongoose**
- **EJS** with **ejs-mate**
- **Joi** for validation
- **Method-Override** for PUT/DELETE support in forms

## Installation

```bash
git clone https://github.com/DevOlabode/appointment-manager.git
cd appointment-manager
npm install
```

## ScreenShots
![Homepage]('images/home.png')
## Usage

1. Ensure MongoDB is running locally on port 27017.
2. Start the application:

```bash
node index.js
```

3. Visit `http://localhost:3000` in your browser.

## Project Structure

```
.
├── modules/
│   └── bookin.js          # Mongoose model
├── utils/
│   ├── catchAsync.js      # Async error wrapper
│   └── expressError.js    # Custom error class
├── joiSchema.js           # Joi validation schema
├── views/
│   └── appointment/
│       ├── home.ejs
│       ├── index.ejs
│       ├── new.ejs
│       ├── edit.ejs
│       ├── details.ejs
│       └── error.ejs
├── public/                # Static assets (optional)
├── index.js               # Main server logic
└── package.json
```

## Routes Overview

| Method | Route              | Description                  |
|--------|-------------------|------------------------------|
| GET    | `/`               | Home page                    |
| GET    | `/booking`        | View all appointments        |
| GET    | `/booking/new`    | New appointment form         |
| POST   | `/booking`        | Create new appointment       |
| GET    | `/booking/:id`    | View appointment details     |
| GET    | `/booking/:id/edit` | Edit appointment form       |
| PUT    | `/booking/:id`    | Update appointment           |
| DELETE | `/booking/:id`    | Delete appointment           |

## Error Handling

- Custom `ExpressError` for cleaner error responses
- All routes are wrapped in `catchAsync` to avoid repetitive `try/catch` blocks
- 404 fallback for undefined routes

## Future Improvements

- Add user authentication
- Add date/time pickers and availability slots
- Integrate email reminders or notifications
- Responsive mobile UI improvements

---

Feel free to fork this repo, raise issues, or contribute to its improvement!

## License

MIT
