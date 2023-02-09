import React from 'react'
import { useDataContext } from "./DataContext"
import Thermometer from 'react-thermometer-component'

const Temperature = () => {
  const { tempHum } = useDataContext()

  return (
    <div className='circle'>
        <Thermometer
          theme="dark"
          value={tempHum?.temperature}
          max="40"
          steps="4"
          format="°C"
          size="large"
          height={document.querySelector('.circle')?.clientHeight*.75}
        />
    </div>
  )
}

export default Temperature