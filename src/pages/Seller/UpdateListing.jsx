import React, { useState } from 'react'

import { createAlert } from "../../utils/createAlert"
import { Controller, useForm } from "react-hook-form"

//form component
import FormInput from '../../components/form/FormInput'
import Buttons from '../../components/form/Buttons'

//validator
import { addProductSchema } from "../../utils/validators"
import { zodResolver } from "@hookform/resolvers/zod"
import SelectInput from '../../components/form/SelectInput'

//zustand
import useAuthStore from '../../store/auth-store'
import useListingStored from '../../store/listing-store'
import FileInput from '../../components/form/FileInput'


//map
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import DriverLocationMarker from '../../components/listing/DriverLocationMaker'
import useMapStored from '../../store/map-store'

//navigate
import { useNavigate } from 'react-router'

function UpdateListing() {
  //JS

  //zustand : global state
  const user = useAuthStore(state => state.user)
  const token = useAuthStore(state => state.token)

  //zustand : get product + update product + delete product
  const currentListing = useListingStored(state => state.currentListing)
  console.log("update", currentListing)

  const navigate = useNavigate()

  const updateListingWithZustand = useListingStored((state => state.updateListingWithZustand))
  //react hook form
  const { register, handleSubmit, formState, reset, control, setValue } = useForm({
    //use zod validate
    resolver: zodResolver(addProductSchema)
  })
  const { isSubmitting, errors } = formState // boolean , error object

  
  //----------------------------------------
  const arrayType = ["BED", "SOFA", "CHAIR", "TABLE"]
  const arrayCategory = ["HOMEUSE", "OFFICE", "GARDEN", "KIDS"]
  const arrayQuality = ["A", "B", "C"]
  const arrayStyle = ["MODERN", "VINTAGE", "THAI"]
  const arrayRoom = ["LIVINGROOM", "BEDROOM", "DININGROOM", "OUTDOOR"]

  const currentImages = currentListing?.ProductImage?.map(item => item.imageUrl);
  const [isImageUpdated,setIsImageUpdate] = useState(false)
  // preview image state
  const [previewImages, setPreviewImages] = useState(currentImages)
  const handleImageUpload = (e) => {
    const files = e.target.files;
    if (!files) return;
    // แสดงตัวอย่างรูปภาพ
    const previewArray = Array.from(files).map((file) => URL.createObjectURL(file));

    setPreviewImages(previewArray);
    setIsImageUpdate(true)
    // ตั้งค่ารูปภาพใน React Hook Form 
    // setValue("images",  Array.from(files));
    //console.log("files",files)
    setValue("images", files);

  };

  //map data 
  const driverSelectLatLng =  useMapStored(state => state.driverSelectLatLng)

  //----------------------------------------
  const hdlUpdate = async (value) => {
    console.log("check",isImageUpdated)

    let newData; 
    if (isImageUpdated) {
      newData = value;
    } else {
      const { images, ...updateLisingData } = value;
      newData = updateLisingData;
    }
    
    newData = {
      ...newData,
      sellerId: Number(user.id),
      approveBy: 1,
      orderqty: 0
    };

    console.log("newData" ,newData)

    //file upload  form Data
    const listformData = new FormData()

    Object.keys(newData).forEach((key) => {
        //images upload
        if ("images" == key)  {
          for (const element of newData[key]) {
            listformData.append("images", element)
          }         
        }      
      else {
        listformData.append(key, newData[key])
      }
      //console.log(key, newData[key])
      }
    )
    //console.log(listformData.get("images"))
    //console.log("from..data..",Object.entries(listformData))

    const res = await updateListingWithZustand(listformData, token, currentListing.id)
    if (res.success) {
      reset()
      setPreviewImages([])
      createAlert("success", "update product success")
      navigate(`/user/listing`)
    } else {
      createAlert("info", "something wrong")
    }
  }
  //-------------------------------------------
  return (
    <div>
      <div className="flex justify-center
         w-full 
        gap-20
        p-24 py-4">
        <div className="
            w-[800px] border 
            p-4
            rounded-md  bg-white opacity-90">
          <h1 className="
                text-xl 
                font-bold 
                text-center">Update Product Info. </h1>
          <form onSubmit={handleSubmit(hdlUpdate)} >
            <div className="
                    flex flex-col 
                    gap-2
                    py-4" >


              <SelectInput register={register} name={"type"} errors={errors} defaultValue={currentListing.type } label={"What are you selling?"} ar={arrayType} />
              <FormInput register={register} name={"productName"} errors={errors} defaultValue={currentListing.productName || ""} label="Product name" />
              <FormInput register={register} name={"description"} errors={errors} defaultValue={currentListing.description || ""} label="Description" />
              <SelectInput register={register} name={"category"} errors={errors} defaultValue={currentListing.category }label={"Category"} ar={arrayCategory} />
              <SelectInput register={register} name={"room"} errors={errors} defaultValue={currentListing.room } label={"Room"} ar={arrayRoom} />
              <FormInput register={register} name={"qty"} errors={errors} defaultValue={currentListing.qty || "1"} />

              <div className="divider"></div>
              <SelectInput register={register} name={"quality"} errors={errors} defaultValue={currentListing.quality} label={"quality"} ar={arrayQuality} />
              <SelectInput register={register} name={"style"} errors={errors} defaultValue={currentListing.style} label={"style"} ar={arrayStyle} />
              <FormInput register={register} name={"Brand"} errors={errors} defaultValue={currentListing.Brand} label={"Brand"} />
              <FormInput register={register} name={"years"} errors={errors} defaultValue={currentListing.years || "0"} label={"years"}/>
              <FormInput register={register} name={"reason"} errors={errors}  defaultValue={currentListing.reason || "-"} label={"reason"}/>

              <div className="divider"></div>
              <FormInput register={register} name={"price"} errors={errors} defaultValue={currentListing.price || "100"} label={"price"} />
              <FormInput register={register} name={"deliveryFee"} errors={errors} defaultValue={currentListing.deliveryFee || "0"} label={"deliveryFee"} />

              <FormInput register={register} name={"pickupAddress"} errors={errors} defaultValue={currentListing.pickupAddress || "0"} label={"pickupAddress"} />
          {/* แผนที่ */}
          <div className='flex justify-center h-[40vh] '> 
          <p className='w-[140px] text-left text-sm'> map </p>
          <div className='w-[520px]'>
          
            <MapContainer className=' h-[40vh]'
            center={[+currentListing.lat||13, +currentListing.long||100]}
            zoom={15} >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            < DriverLocationMarker />
            <Marker position={[+currentListing.lat||13 , +currentListing.long||100]}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </MapContainer>
          </div>
          </div>
 {/*จบ แผนที่ */}
              <FormInput register={register} name={"lat"} errors={errors} defaultValue={currentListing.lat || "13"} label={"lat"} value={driverSelectLatLng.lat} />
              <FormInput register={register} name={"long"} errors={errors} defaultValue={currentListing.long || "100"} label={"long"} value={driverSelectLatLng.lng} />
            </div>
            <div>

              <label>Upload Images:</label>
              {/* <FileInput   register={register} name={"images"}  errors={errors} label="profile image" />               */}
              <Controller
                name="images"
                control={control}
                defaultValue={[]}
                render={({ field }) => (
                  <input type="file" multiple accept="image/*" onChange={handleImageUpload} />
                )}
              />

              {/* แสดงรูปตัวอย่าง */}
              <div >
                {previewImages?.map((img, index) => (
                  <img key={index} src={img} alt={`preview-${index}`} width="100px" />
                ))}
              </div>
            </div>
            <div className="flex justify-center">
              <Buttons isSubmitting={isSubmitting} label={"Save"} />


            </div>
          </form>
        </div>
      </div>

    </div>
  )
}

export default UpdateListing