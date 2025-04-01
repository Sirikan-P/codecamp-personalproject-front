import {z} from "zod"

//backend-middlewares/validator.jsx
export const registerSchema = z.object({
    email: z.string().email("check email format"),
    firstname: z.string().min(3, "firstname more than 3 characters"),
    lastname: z.string().min(3, "Lastname more than 3 characters"),
    password: z.string().min(6, "password at least 6 characters"),
    confirmPassword: z.string().min(6, "confirm password at least 6 characters")
}).refine((data) => data.password === data.confirmPassword, {
    message: "confirm password incorrect",
    path: ['confirmPassword']
})

export const loginSchema = z.object({
    email: z.string().email("check email format"),
    password: z.string().min(6, "password at least 6 characters"),

})

export const profileSchema = z.object({
    firstname: z.string().min(3, "firstname more than 3 characters") ,
    lastname: z.string().min(3, "Lastname more than 3 characters") ,
    idcardNumber: z.string().min(13, "id card number more than 13 characters") ,
    phoneNumber: z.string().min(10, "phone number more than 10 characters") ,
    shopName: z.string().min(3, "shop name more than 3 characters") ,
    address: z.string().min(3, "address number more than 3 characters") ,
    profileImage: z.any()
})

export const addProductSchema = z.object({
    type:z.string().min(1,"please select type") ,
    productName: z.string().min(3, "firstname more than 3 characters") ,
    description: z.any() ,
    category:z.string().min(1,"please select category") ,
    room:z.string().min(1,"please select room") ,
    qty:z.string().nonempty("please add qty") , 
    quality:z.string().min(1,"please add quality") , 
    style: z.any() ,
    Brand: z.any() ,
    years: z.any() ,
    reason: z.any() ,
    price:z.string().nonempty("please add price") , 
    deliveryFee:z.string().nonempty("please add deliveryFee") , 
    pickupAddress:z.string().min("please add pickupAddress") ,
    lat: z.any() ,
    long: z.any() ,
    images: z.any() ,
    
})