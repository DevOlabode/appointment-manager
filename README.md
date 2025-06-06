# 🗕 Appointment Manager

A simple Node.js and Express application for managing client bookings with MongoDB. Built for small-scale service providers who need a lightweight appointment system.

---

## 🔧 Features

* 📁 Create, read, update, and delete bookings
* ⏰ Status tracking for each appointment (Scheduled, Completed, Canceled)
* 📆 Date and time selection
* 🌐 MongoDB integration using Mongoose
* 🛠 Express-based backend server

---

## 🚀 Getting Started

### 📦 Prerequisites

Ensure you have the following installed:

* [Node.js](https://nodejs.org/) (v14 or higher)
* [MongoDB](https://www.mongodb.com/try/download/community)
* npm (comes with Node.js)

### 🛠 Installation

```bash
git clone https://github.com/DevOlabode/appointment-manager.git
cd appointment-manager
npm install
```

### ⚙️ Configuration

Update MongoDB connection in `index.js` or use environment variables (recommended):

```js
mongoose.connect('mongodb://127.0.0.1:27017/appointmentDB')
```

You can also use a `.env` file:

```
MONGO_URI=mongodb://127.0.0.1:27017/appointmentDB
PORT=3000
```

Update your `index.js` to read from environment:

```js
require('dotenv').config();
mongoose.connect(process.env.MONGO_URI);
```

### ▶️ Running the App

```bash
node index.js
```

The app should now be running on `http://localhost:3000`

---

## 📂 Project Structure

```
appointment-manager/
├── models/
│   └── booking.js        # Mongoose schema for bookings
├── views/
│   └── index.ejs         # Homepage template
└── index.js              # Main server file
    package.json
```

---

## 📌 Booking Schema

```js
{
  clientName: String,
  service: String,
  date: String,
  time: String,
  status: {
    type: String,
    enum: ['Scheduled', 'Completed', 'Canceled'],
    default: 'Scheduled'
  }
}
```

---

## ✨ Future Enhancements

* Add authentication
* Calendar UI for booking
* Admin dashboard
* Email notifications

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to [open an issue](https://github.com/DevOlabode/appointment-manager/issues) or submit a pull request.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👤 Author

**Samuel Olabode**
[GitHub](https://github.com/DevOlabode)
