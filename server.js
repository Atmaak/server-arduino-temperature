const { SerialPort  } = require('serialport')
const { ReadlineParser } = require('@serialport/parser-readline')

const parser = new ReadlineParser()
const port = new SerialPort({ path: 'COM3', baudRate: 9600 }, function (err) {
  if (err) {
    return console.log('Error: ', err.message)
  }
})

port.pipe(parser)
parser.on('data', console.log)

