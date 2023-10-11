// creating api calls for the backend using redux/toolkit
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// createApi helps us to define a set of endpoints that describe how to retrieve data from the backend apis.
// fetchBaseQuery fetches request queries to the api
// import dotenv from 'dotenv';
export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl : process.env.REACT_APP_BASE_URL }),
    reducerPath: "adminApi", // name of the reducer slice that will be created for the api, must be an unique value (provide a unique value each time it is called)
    tagTypes: ["User", "Products", "Customers", "Transactions", "Geography", "Sales", "Admins", "Performance", "Dashboard"], // define a tag type, used to invalidate data in store.
    endpoints: (build) => ({
        // in this we identify the api calls we are gonna make
        getUser: build.query({
            query: (id) => `general/user/${id}`, // we have route of /general defined and /user/:id of the general route takes us to the getUser controller
            providesTags: ["User"],
        }),
        getProducts: build.query({
            query:() => "client/products",
            providesTags:["Products"],
        }),
        getCustomers: build.query({
            query:() => "client/customers",
            providesTags: ["Customers"],
        }),
        getTransactions: build.query({
            query:({ page, pageSize, sort, search }) => ({
                url: "client/transactions",
                method: "GET",
                params: { page, pageSize, sort, search },
            }),
            providesTags: ["Transactions"] // query to invalidate cache entries when data is updated.
        }),
        getGeography: build.query({
            query: () => "client/geography",
            providesTags: ["Geography"]
        }),
        getSales: build.query({
            query: () => "sales/sales",
            providesTags: ["Sales"]
        }),
        getAdmins: build.query({
            query: () => "management/admins",
            providesTags: ["Admins"]
        }),
        getUserPerformance: build.query({
            query: (id) => `management/performance/${id}`,
            providesTags: ["Performance"]
        }),
        getDashboard: build.query({
            query: () => "general/dashboard",
            providesTags: ["Dashboard"]
        })
    })
})


export const { useGetUserQuery, useGetProductsQuery, useGetCustomersQuery, useGetTransactionsQuery, useGetGeographyQuery, useGetSalesQuery, useGetAdminsQuery, useGetUserPerformanceQuery, useGetDashboardQuery } = api; //this comes from the api func. above with getUser i.e. use being the prefix and Query being the suffix