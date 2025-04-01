import { create } from "zustand"
import { persist } from "zustand/middleware"

//step 1 : create Store
const mapStored = (set) => ({
  driverSelectLatLng: { lat: 13.750,lng: 100.499} ,
  actionSetCurrentLatLong : (latlng)=>{
    set({driverSelectLatLng : latlng                          
     })
  } ,


})
  //step 2 : export Store
  const useMapStored = create(mapStored)
  
  export default useMapStored