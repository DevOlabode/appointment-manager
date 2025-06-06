const express  = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Booking  = require('./modules/bookin');
const methodOverride = require('method-override');

mongoose.connect('mongodb://127.0.0.1:27017/appointmentBookin')
    .then(() => {
        console.log("Mongo Connection Open")   
    }).catch((err) => {
        console.log("Error", err)
    });

const app = express();
app.use(methodOverride('_method'))
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended : true}));

const status = ['Scheduled', 'Completed', 'Canceled']

app.get('/booking', async (req, res)=>{
    const bookings = await Booking.find({})
    res.render('index', { bookings })
});

app.get('/booking/new', (req, res)=>{
    res.render('new', { status })
});

app.post('/booking', async(req, res)=>{
    const madeAppointment = req.body;
    const newAppointment = new Booking(madeAppointment);
    await newAppointment.save();
    res.redirect(`/booking/${newAppointment._id}`);
});

app.get('/booking/:id',async (req, res)=>{
    const { id } = req.params;
    const booking = await Booking.findById(id);
    res.render('details', { booking });
});

app.put('/booking/:id', async(req, res)=>{
    const { id } = req.params;
    const updatedBooking = await Booking.findByIdAndUpdate(id, req.body,  { runValidators: true, new : true });
    res.redirect(`/booking/${updatedBooking._id}`);  
});

app.get('/booking/:id/edit', async(req, res)=>{
    const { id } = req.params;
    const appointment = await Booking.findById(id);
    res.render('edit', {appointment, status })
});

app.delete('/booking/:id', async(req, res)=>{
    const { id } = req.params;
    const deleted = await Booking.findByIdAndDelete(id);
    res.redirect('/booking');
});

app.listen('3000', ()=>{
    console.log('Listening on port 3000')
});