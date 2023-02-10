import React from 'react'
import { useDataContext } from "./DataContext"

import Thermometer from 'react-thermometer-component'

const Humidity = () => {
    const { tempHum } = useDataContext()
  
    return (
        <div className='circle'>
            <Thermometer
                theme="dark"
                value={tempHum?.humidity}
                max="100"
                steps="20"
                format="%"
                size="large"
                height={document.querySelector('.circle')?.clientHeight*.75}
                />
        </div>
  )
}

export default Humidity