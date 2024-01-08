const { SerialPort  } = require('serialport')
const { ReadlineParser } = require('@serialport/parser-readline')

const { Server } = require('socket.io');

const parser = new ReadlineParser()

const port = new SerialPort({ path: '/dev/ttyACM0', baudRate: 9600 }, function (err) {
  if (err) {
    return console.log('Error: ', err.message)
  }
})

const express = require('express')
const app = express()
const path = require('path')

require('dotenv').config()

const server = require('http').createServer(app)

const io = new Server(server) 

const { Sequelize, DataTypes } = require('sequelize');
const { db } = require('./config/_index')

const sequelize = new Sequelize(db.db_name, db.user, db.password, {
  host: db.host,
  dialect: db.dialect,
})

sequelize.sync({ alter: true }).then(() => {
  console.log('Drop and Resync Db');
})

const Temperature = require('./temperature.model')(sequelize, DataTypes)

const sendData = async (data) => {
  // console.log(JSON.parse(data))
  let d = JSON.parse(data)
  console.log({ temperature: d.temperature, humidity: d.humidity})
  Temperature.create({ temperature: parseFloat(d.temperature), humidity: parseFloat(d.humidity) })
  io.emit('send-data', data)
}

io.on("connection", async (socket) => {
  console.log(socket.id)
  const data = await Temperature.findAll({
    order: [['id', 'DESC']], // Assuming there is a 'createdAt' field in your model
    limit: 1, // Limit the result to only one record
  })
  console.log(data)
  sendData(data)
})

port.pipe(parser)
parser.on('data', sendData)

server.listen(8080, () => {
  console.log('server running on port: ' + process.env.port)
})

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
})