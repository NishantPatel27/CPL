// server.js
const dotenv = require('dotenv');
const app = require('./app');
const mongoose = require('mongoose');

process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
});

dotenv.config({ path: './config.env' });

const DB = 'mongodb+srv://tilakp1912:jlOLnyfCfaxo0uPI@tilak.3bx3a4n.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(DB, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("The DB is Connected"))
    .catch((error) => console.log("Connection Failed", error.message));

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});