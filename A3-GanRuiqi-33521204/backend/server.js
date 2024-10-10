const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const Driver = require('./models/driver');
const Package = require('./models/package');
const driverRouter = require('./routes/driver-routes');
const packageRouter = require('./routes/package-routes');
const statRouter = require('./routes/stat-routes')


// Connect to the database
async function connect() {
    await mongoose.connect('mongodb://localhost:27017/asgn3');
}


app.use(express.static('./dist/a3-gan-ruiqi-33521204/browser'));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
// app.use(cors());


connect();
app.listen(8080);

app.use("/33521204/ruiqi/api/v1/drivers",driverRouter)
app.use("/33521204/ruiqi/api/v1/packages",packageRouter)
app.use("/33521204/ruiqi/api/v1/stats",statRouter)

// app.get('/api/drivers', async (req, res) => {
//     const drivers = await Driver.find();
//     res.json(drivers);
// });
// app.post('/api/drivers', async (req, res) => {
//     const driver = new Driver(req.body);
//     await driver.save();
//     res.json(driver);
// });
// app.get('/api/cars/:id', async (req, res) => {
//     const car = await Car.findById(req.params.id);
//     res.json(car);
// });
// app.put('/api/cars/:id', async (req, res) => {
//     const car = await Car.findById(req.params.id);
//     car.set(req.body);
//     await car.save();
//     res.json(car);
// });
// app.delete('/api/cars/:id', async (req, res) => {
//     const car = await Car.findByIdAndDelete(req.params.id);
//     res.json(car);
// });
