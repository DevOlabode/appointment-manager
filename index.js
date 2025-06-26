const express  = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');


const catchAsync = require('./utils/catchAsync');
const Booking  = require('./modules/bookin');
const ExpressError = require('./utils/expressError');
const { appointmentSchema } = require('./joiSchema');

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
app.engine('ejs', ejsMate);

const validateAppointment = (req, res, next)=>{
    const { error } = appointmentSchema.validate(req.body);
    if(error){
        const message = error.details.map(el => el.message).join(',');
        throw new ExpressError(message, 400)
    }else{
        next()
    }
}

const status = ['Scheduled', 'Completed', 'Canceled']


app.get('/', (req, res)=>{
    res.render('appointment/home')
});

app.get('/booking', catchAsync(async (req, res)=>{
    const bookings = await Booking.find({});
    res.render('appointment/index', { bookings })
}));

app.get('/booking/new', (req, res)=>{
    res.render('appointment/new', { status })
});

app.post('/booking', validateAppointment, catchAsync(async(req, res)=>{
    const madeAppointment = req.body;
    if(!madeAppointment){
        throw new ExpressError('New Appointment Was Unable TO Be Made', 400)
    }
    const newAppointment = new Booking(madeAppointment);
    await newAppointment.save();
    res.redirect(`/booking/${newAppointment._id}`);
}));

app.get('/booking/:id',catchAsync(async (req, res)=>{
    const { id } = req.params;
    const booking = await Booking.findById(id);
    if(!booking){
        throw new ExpressError('Campground Not Found', 404)
    }
    res.render('appointment/details', { booking });
}));

app.put('/booking/:id', validateAppointment, catchAsync(async(req, res)=>{
    const { id } = req.params;
    const updatedBooking = await Booking.findByIdAndUpdate(id, req.body,  { runValidators: true, new : true });
    res.redirect(`/booking/${updatedBooking._id}`);  
}));

app.get('/booking/:id/edit', catchAsync(async(req, res)=>{
    const { id } = req.params;
    const appointment = await Booking.findById(id);
    res.render('appointment/edit', {appointment, status })
}));

app.delete('/booking/:id', catchAsync(async(req, res)=>{
    const { id } = req.params;
    const deleted = await Booking.findByIdAndDelete(id);
    res.redirect('/booking');
}));

app.all(/(.*)/, (req, res, next) => {
    next(new ExpressError('Page not found', 404))
});


app.use((err, req, res, next)=>{

    const {statusCode = 500} = err;
    if(!err.message){
        err.message = 'Something Went Wrong!'
    }
    res.status(statusCode).render('appointment/error', { err })
});

app.listen('3000', ()=>{
    console.log('Listening on port 3000')
});
