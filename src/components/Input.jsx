import React, { useState } from 'react'
import { UilSearch,UilLocationPoint  } from '@iconscout/react-unicons'
import { toast } from 'react-toastify';


function Input({setQuery, units, setUnits}) {
    const [city, setCity] = useState("");

    const handelSearchClick = () => {
        if(city !== "") setQuery({q: city})
    }

    const handleLocationClick = () => {
        if(navigator.geolocation){
            toast.info("Fetching users location.")
            navigator.geolocation.getCurrentPosition((position) => {
                toast.success("Location Fetched")
                let lat = position.coords.latitude;
                let lon = position.coords.longitude;
            })
        }
    }

    const handleUnitsChange = (e) => {
        const selectedUnit = e.currentTarget.name;
        if(units !== selectedUnit) setUnits(selectedUnit);
    }

  return (
    <div className="flex flex-row justify-center my-6">
        <div className="flex flex-row w-3/4 items-center justify-center space-x-4">
        <input
            value={city}
            onChange={(e)=> setCity(e.currentTarget.value)} 
            type="text" 
            placeholder="Search..." 
            className="text-xl font-light p-2 w-full shadow-xl focus:outline-none capitalize placeholder:lowercase" 

        />
        <UilSearch 
            size = {25}
            className="text-white cursor-pointer transition ease-out hover:scale-125"
            onClick={handelSearchClick}
        />
        <UilLocationPoint 
            size = {25}
            className="text-white cursor-pointer transition ease-out hover:scale-125"
            onClick={handleLocationClick}
        />
        </div>

        <div className="flex flex-row w-1/4 items-center justify-center">
            <button name="metric" onClick={handleUnitsChange} className="text-xl text-white font-light transition ease-out hover:scale-125">
                °C
            </button>
            <p className="text-xl text-white mx-1">|</p>
            <button name="imperial" onClick={handleUnitsChange} className="text-xl text-white font-light transition ease-out hover:scale-125">
                °F
            </button>
        </div>

    </div>
  )
}

export default Input