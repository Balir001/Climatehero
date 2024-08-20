const express = require("express");
const app = express();
const port = 3001;
const cors = require("cors");
const { sequelize } = require('./models'); 

app.use(express.json());

// Enable CORS for all routes
app.use(cors());

//routes
const user = require("./Routes/User")
app.use("/climatehero/user", user);

async function startServer() {
    try {
        await sequelize.authenticate();
        console.log('Database connection has been established successfully.');
        
        // Sync all defined models to the DB
        await sequelize.sync();
        console.log('All models were synchronized successfully.');

        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

startServer();