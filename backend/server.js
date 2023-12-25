const { SerialPort  } = require('serialport')
const { ReadlineParser } = require('@serialport/parser-readline')
const { instrument } = require('@socket.io/admin-ui')

const parser = new ReadlineParser()
const port = new SerialPort({ path: 'COM3', baudRate: 9600 }, function (err) {
  if (err) {
    return console.log('Error: ', err.message)
  }
})

const io = require('socket.io')(8080, {
  cors: {
    origin: ["https://admin.socket.io", "http://localhost:3000" ],
    credentials: true
  }
})

const sendData = (data) => {
  console.log(data)
  io.emit('send-data', data)
}

io.on('connection', socket => {
  console.log(socket.id)
})

instrument(io, {
  auth: false
});

port.pipe(parser)
parser.on('data', sendData)

const express = require('express')
const app = express()
const path = require('path')

require('dotenv').config()

app.listen(process.env.port, () => {
  console.log('server running on port: ' + process.env.port)
})

app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
})