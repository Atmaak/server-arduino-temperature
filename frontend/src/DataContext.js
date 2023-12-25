import React, { useContext, useState, useEffect } from 'react'
import { io } from 'socket.io-client'
const DataContext = React.createContext()

const socket = io('http://192.168.8.199:8080')

socket.on('connect', () => {
    console.log('connected')
})

export function useDataContext(){
    return useContext(DataContext)
}

export function DataProvider({ children }){
    const [tempHum, setTempHum] = useState()

    socket.on('send-data', (data) => {
        let json = JSON.parse(data)
        setTempHum(json)
    })

    const value = {
        tempHum
    }
    
    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    )
}