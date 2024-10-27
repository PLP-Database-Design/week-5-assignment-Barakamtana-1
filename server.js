const express = require("express")
const dotenv = require('dotenv');
const mysql = require('mysql2');

const app = express()

// Load environment variables from .env file
dotenv.config();

// Connect to databese
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});


// Fist lets confirm that our webpage sends response to client
// app.get('/', function(req, res){
//     res.send("HELLO WORLD")
// })


// we'll display our output on client(webpage rather than console)
// Question 1 goes here
app.get('/', function(req, res){
    let sql = `SELECT 
                    patient_id, 
                    first_name,  
                    last_name, 
                    date_of_birth
                FROM patients`;
    connection.query(sql, function(err, results){
        if(err) throw err;
        res.send(results);
    })
})


// Question 2 goes here
app.get('/providers',function(req, res){
    let sql2= `SELECT 
                    first_name,
                    last_name
                    provider_specialty
                FROM providers`
    connection.query(sql2, function(err, results){
        if(err) throw err;
        res.send(results)
    })
                 
})

// Question 3 goes here
app.get('/patients', function(req, res){
    let sql3 = `SELECT
                    first_name
                FROM patients`
    connection.query(sql3, function(err, results){
        if (err) throw err;
        res.send(results)
    })
})

app.get('/providers/speciality', function(err, res){
    let sql4 = `SELECT
                    provider_specialty
                FROM providers`
    connection.query(sql4, function(err, results){
        if (err) throw err;
        res.send(results)
    })
})

const PORT = 3000
app.listen(PORT, () => {
    console.log(`server is runnig on http://localhost:${PORT}`)

    connection.connect(function(err){
        if(err) throw err;
        else{
          console.log('Hurrey!, You\'ve succefully connected to the database');
        }
      })

})