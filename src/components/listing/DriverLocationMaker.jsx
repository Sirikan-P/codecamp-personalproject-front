import React, { useState } from 'react'
import { MapContainer, TileLayer, useMap ,Marker , Popup, useMapEvents } from 'react-leaflet'

import "leaflet/dist/leaflet.css"
import useMapStored from '../../store/map-store'


function DriverLocationMarker() {

  const driverSelectLatLng =  useMapStored(state => state.driverSelectLatLng)
  const actionSetCurrentLatLong = useMapStored(state => state.actionSetCurrentLatLong)

  const mapZoom = 15
  const map = useMapEvents({

    click(e) {
      console.log(e)
     // map.locate()
      actionSetCurrentLatLong(e.latlng)
      map.flyTo(e.latlng, mapZoom   ) 
    },
    // locationfound(e) {
    //   setPosition(e.latlng)
    //   map.flyTo(e.latlng, map.getZoom())
    // },
  })

  return driverSelectLatLng === null ? null : (
    <Marker position={driverSelectLatLng}>
      <Popup>You are here</Popup>
    </Marker>
  )
}

export default DriverLocationMarker