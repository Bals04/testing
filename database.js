const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
}).promise()


async function getGymInfo() {
    const [rows] = await pool.query(
        `SELECT g.gym_id, g.gym_name, g.latitude, g.longtitude, g.daily_rate, g.monthly_rate, g.img,
         COALESCE(FORMAT(SUM(r.ratings) / COUNT(r.ratings), 2), "no ratings yet") AS Average,
         g.contact_no, g.street_address, g.street_view
         FROM gyms g LEFT JOIN gym_ratings r 
         ON g.gym_id = r.gym_id
         GROUP BY g.gym_id, g.latitude, g.longtitude, g.daily_rate, g.monthly_rate, g.img;`
    )
    return rows
} 

module.exports = {
    getGymInfo,
};