import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { ORDERS_URL, PAYPAL_URL} from '../constants';
import {apiSlice} from './apiSlice'

export const ordersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        createOrder: builder.mutation({
            query: (order) => ({
                url: ORDERS_URL,
                method: 'POST',
                body: {...order},
            })
        }),
        getOrderDetails: builder.query({
            query: (id) => ({
              url: `${ORDERS_URL}/${id}`,
            }),
            keepUnusedDataFor: 5,
          }),
        payOrder: builder.mutation({
            query: (orderId, details) => ({
                url: `${ORDERS_URL}/${orderId}/pay`,
                method: 'PUT',
                body: {...details},
            })
        }),
        getPayPalClientId : builder.query({
            
        })             
    }),
})

export const {useCreateOrderMutation, useGetOrderDetailsQuery} = ordersApiSlice;
