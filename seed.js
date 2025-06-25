const mongoose = require('mongoose');
const Booking  = require('./modules/bookin')

mongoose.connect('mongodb://127.0.0.1:27017/appointmentBookin')
    .then(() => {
        console.log("Mongo Connection Open")   
    }).catch((err) => {
        console.log("Error", err)
    });


const bookings = [
  {
    clientName: 'Sarah Johnson',
    service: 'Haircut',
    date: '2025-06-05',
    time: '10:30',
    status: 'Scheduled'
  },
  {
    clientName: 'James Smith',
    service: 'Dental Checkup',
    date: '2025-06-06',
    time: '14:00',
    status: 'Scheduled'
  },
  {
    clientName: 'Maria Gomez',
    service: 'Massage Therapy',
    date: '2025-06-07',
    time: '21:00',
    status: 'Completed'
  },
  {
    clientName: 'Ali Khan',
    service: 'Eye Examination',
    date: '2025-06-08',
    time: '11:15',
    status: 'Canceled'
  },
  {
    clientName: 'Emily Davis',
    service: 'Therapy Session',
    date: '2025-06-09',
    time: '13:30',
    status: 'Scheduled'
  }
];

Booking.insertMany(bookings)
// const seedDB = async ()=>{
//     Booking.deleteMany({});
//     Booking.insertMany(bookings);
//     console.log('Database seeded with appointment')
// };

// seedDB().then(()=>{
//     mongoose.connection.close();
// })
