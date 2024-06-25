const express = require("express");
const mysql = require('mysql');
const cors = require('cors');
// const bcrypt = require('bcrypt');
// const saltRounds = 10;
const multer = require('multer');

const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');

const app = express();
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ["POST", "GET", "PUT", "DELETE", "PATCH"],
    credentials: true
}));

app.use(express.json());
app.use(express.static('public'));
app.use(cookieParser())
app.use(bodyParser.json());

app.use(session({
    secret: 'secrete',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24
    }
}))


// const redis = require('redis');
// const RedisStore = require('connect-redis').default;

//  const redisClient = redis.createClient({
//     url: "redis://redis:6379",
// });;

// // Handle Redis client errors
// redisClient.on('error', (err) => {
//     console.error('Redis error:', err);
// });

// // Initialize connect-redis with express-session
// let redisStore = new RedisStore({
//     client: redisClient,
// });

// // Initialize express-session with RedisStore
// app.use(session({
//     store: redisStore,
//     secret: 'secrete',
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         secure: false,
//         maxAge: 1000 * 60 * 60 * 24
//     },
// }));




const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "nthome_db"
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to database: ', err);
        return;
    }
    console.log('Connected to the database');
});

//validate session users
app.get('/user', (req, res) => {
    if (req.session.userId && req.session.role && req.session.username) {
        return res.json({ valid: true, userId: req.session.userId, role: req.session.role, username: req.session.username });
    } else {
        return res.json({ valid: false });
    }
});

//signup for all users
app.post('/signup', (req, res) => {
    const checkEmailQuery = "SELECT * FROM users WHERE email = ?";
    const insertUserQuery = "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.password,
        req.body.role
    ];

    // Check if the email already exists
    db.query(checkEmailQuery, [req.body.email], (err, result) => {
        if (err) {
            console.error("Error occurred during signup:", err);
            return res.status(500).json({ error: "An error occurred during signup" });
        }

        if (result.length > 0) {
            // Email already exists, return a message to the user
            return res.status(400).json({ error: "Email already exists. Please use a different email address." });
        }

        // If the email doesn't exist, proceed with signup
        db.query(insertUserQuery, values, (err, result) => {
            if (err) {
                console.error("Error occurred during signup:", err);
                return res.status(500).json({ error: "An error occurred during signup" });
            }
            return res.status(200).json({ message: "Signup successful", result });
        });
    });
});

// Set up Multer middleware to handle file uploads:
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
       return cb(null, './public/images') // Specify the directory where uploaded files will be stored
    },
    filename: function (req, file, cb) {
       return cb(null, `${file.originalname}`) // Specify the name of the uploaded file
    }
});

const upload = multer({ storage });
//inserting driver details
app.post('/driver_details', upload.fields([
    { name: 'photo', maxCount: 1 },
    { name: 'id_copy', maxCount: 1 },
    { name: 'police_clearance', maxCount: 1 },
    { name: 'pdp', maxCount: 1 }
]), (req, res) => {
    // Log the request body to inspect what's being sent from the client side
    console.log("Request Body:", req.body);

    // Extract the necessary fields from the request body
    const { gender, userId } = req.body;

    // Extract the uploaded files from req.files
    const { photo, id_copy, police_clearance, pdp } = req.files;

    // Log the userId to ensure it's being received correctly
    console.log("User ID:", userId);

    // Proceed with your database operation
    const sql = "INSERT INTO driver (photo, id_copy, gender, users_id, police_clearance, pdp) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [
        photo[0].filename,
        id_copy[0].filename,
        gender,
        userId,
        police_clearance[0].filename,
        pdp[0].filename
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error occurred during driver registration:", err);
            return res.status(500).json({ error: "An error occurred during driver registration" });
        }
        return res.status(200).json({ message: "Driver registration successful", result });
    });
});

// getting driver details
// Endpoint to fetch driver details by user ID
app.get('/more_details/user', (req, res) => {
    const userId = req.query.userId;

    if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
    }
    // Construct SQL SELECT query
    const sql = "SELECT * FROM driver WHERE users_id = ?";
    
    // Execute the SQL query
    db.query(sql, [userId], (err, results) => {
        if (err) {
            console.error("Error fetching driver details by user ID:", err);
            return res.status(500).json({ error: "An error occurred while fetching driver details" });
        }

        // Check if driver details for the user exist
        if (results.length === 0) {
            return res.status(404).json({ message: "Driver details not found for the user" });
        }

        // Driver details found, return the data
        return res.status(200).json({ driver: results }); // <-- Changed key to 'driver'
    });
});


// Endpoint to insert car listing
app.post('/car_listing', upload.single('carImage'), (req, res) => {
    // Extract car details from the request body
    const { carMake, carModel, carYear, carSeats, carColor, licensePlate, userId } = req.body;

    // Get the file path of the uploaded image
    const carImagePath = req.file ? req.file.path : null;

    // Validate the incoming data
    if (!carMake || !carModel || !carYear || !carSeats || !carColor || !licensePlate) {
        return res.status(400).json({ error: "All car details are required" });
    }

    // Construct SQL INSERT query
    const sql = "INSERT INTO car_listing (car_make, car_model, car_year, number_of_seats, car_colour, car_image, license_plate, userId) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [carMake, carModel, carYear, carSeats, carColor, carImagePath, licensePlate, userId];

    // Execute the SQL query
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error inserting car details:", err);
            return res.status(500).json({ error: "An error occurred while saving car details" });
        }
        return res.status(200).json({ message: "Car details saved successfully" });
    });
});


// Endpoint to get car listing by userId
app.get('/car_listing/user', (req, res) => {
    const userId = req.query.userId; // Retrieve userId from query parameters

    if (!userId) {
        return res.status(400).json({ error: "User ID is required" });
    }

    // Construct SQL SELECT query
    const sql = "SELECT * FROM car_listing WHERE userId = ?";
    
    // Execute the SQL query
    db.query(sql, [userId], (err, results) => {
        if (err) {
            console.error("Error fetching car details by user ID:", err);
            return res.status(500).json({ error: "An error occurred while fetching car details" });
        }

        // Check if car listings for the user exist
        if (results.length === 0) {
            return res.status(404).json({ message: "Car listings not found for the user" });
        }

        // Car listings found, return the data
        return res.status(200).json({ carListings: results });
    });
});


//user_id selection
app.post('/driver_log', (req, res) => {
    const sql = "SELECT id FROM users WHERE email = ?";
    db.query(sql, [req.body.email], (err, result) => {
        if(err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({ message: "Internal server error" });
        }
        if(result.length > 0){
            return res.json({ driver_log: true, userId: result[0].id });
        } else {
            return res.json({ driver_log: false, message: "Invalid email" });
        }
    });
});



// login for all users
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Validate inputs
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    const sql = "SELECT id, role, name FROM users WHERE email = ? AND password = ?";
    db.query(sql, [email, password], (err, result) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({ message: "Internal server error" });
        }

        if (result.length > 0) {
            req.session.username = result[0].name; // Store the username in session
            req.session.userId = result[0].id; // Store the user ID in session
            req.session.role = result[0].role; // Store the user role in session
            return res.json({ login: true, message: "Login successful" });
        } else {
            return res.status(401).json({ login: false, message: "Invalid email or password" });
        }
    });
});
//get user info
app.get('/userInfo/:id', (req, res) => {
    const sql = "SELECT * FROM users WHERE id = ?";
    const id = req.params.id; // Corrected from req.params.userId
    // console.log(id)
    db.query(sql, [id], (err, results) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({ message: "Internal server error" });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: "User not found" }); // Changed "user" to "User" for consistency
        }
        return res.json(results);
    });
});

app.get('/logout', (req, res) => {
    // Clear session data
    req.session.destroy(err => {
        if (err) {
            console.error("Error destroying session:", err);
            return res.status(500).json({ error: "Failed to logout" });
        }

        // Remove cookies
        res.clearCookie('connect.sid'); // Assuming 'connect.sid' is the default session cookie name

        // Respond with success message
        return res.status(200).json({ message: "Logout successful" });
    });
});


// API endpoint for updating customer information
app.put('/edit_customer/:id', (req, res) => {
    const { name, lastName, email, phoneNumber, address } = req.body;
    const userId = req.params.id;

    const sql = "UPDATE users SET `name` = ?, `lastName` = ?, `email` = ?, `phoneNumber` = ?, `address` = ?  WHERE `Id` = ?";
    const values = [name, lastName, email, phoneNumber, address, userId];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({ message: "Internal server error" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "User not found or not updated" });
        }
        return res.json({ message: "Updated successfully" });
    });
});



app.delete('/delete/:Id', (req, res) => {
    const sql = "DELETE FROM users WHERE Id = ?";
    const Id = req.params.id;

    db.query(sql, [Id], (err, result) => {
        if (err) {
            console.error("Error executing SQL query:", err);
            return res.status(500).json({ message: "Internal server error" });
        }
        if (result.affectedRows === 0) { // Check if any rows were affected by the deletion
            return res.status(404).json({ message: "not found or not deleted" });
        }
        return res.json({ message: "deleted successfully" });
    });
});

// Update driver details
app.put('/driver_details', upload.fields([
    { name: 'photo', maxCount: 1 },
    { name: 'id_copy', maxCount: 1 },
    { name: 'police_clearance', maxCount: 1 },
    { name: 'pdp', maxCount: 1 }
]), (req, res) => {
    // Log the request body to inspect what's being sent from the client side
    console.log("Request Body:", req.body);

    // Extract the necessary fields from the request body
    const { gender } = req.body;
    const userId = req.query.userId; // Extract user ID from URL params

    // Extract the uploaded files from req.files
    const { photo, id_copy, police_clearance, pdp } = req.files;

    // Log the userId to ensure it's being received correctly
    console.log("User ID:", userId);

    // Proceed with your database update operation
    const sql = `
        UPDATE driver 
        SET photo = ?, 
            id_copy = ?, 
            gender = ?, 
            police_clearance = ?, 
            pdp = ? 
        WHERE users_id = ?
    `;
    const values = [
        photo ? photo[0].filename : null, // Check if photo is uploaded
        id_copy ? id_copy[0].filename : null, // Check if id_copy is uploaded
        gender,
        police_clearance ? police_clearance[0].filename : null, // Check if police_clearance is uploaded
        pdp ? pdp[0].filename : null, // Check if pdp is uploaded
        userId
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error occurred during driver details update:", err);
            return res.status(500).json({ error: "An error occurred during driver details update" });
        }
        return res.status(200).json({ message: "Driver details updated successfully", result });
    });
});



app.listen(8085, () => {
    console.log("Server is running ");
});
