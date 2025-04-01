import React, { useCallback, useState, useEffect } from "react";
import {loadStripe} from '@stripe/stripe-js';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout
} from '@stripe/react-stripe-js';
import { actionCheckOut } from "../../api/checkout";
import { useParams } from "react-router";
import useAuthStore from "../../store/auth-store";
const stripePromise = loadStripe("pk_test_51QzCc807JCuZBtxvMLfzLudGKDsuyFAJCZ4rD8iKNhhf9dYWA7kTznAjNq47Tj0T2PlvKQLEyn3PEGivPJ8azJrt00MmGbILSg");
// console.log("Stripe API Key:", import.meta.env.VITE_STRIPE_PK_KEY);
// console.log(import.meta.env);


function Checkout() {
const {id} = useParams()  
const token = useAuthStore (state => state.token)

const fetchClientSecret  = useCallback(async ()=> {
  const res = await actionCheckOut(token ,id)
  return res.data.clientSecret

})

const options = { fetchClientSecret }
  return (
    <div id="checkout">
    <EmbeddedCheckoutProvider
      stripe={stripePromise}
      options={options}
    >
      <EmbeddedCheckout />
    </EmbeddedCheckoutProvider>
  </div>
  )
}

export default Checkout