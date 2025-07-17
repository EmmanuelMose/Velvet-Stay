import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
//import type { RootState } from "../../app/store";
import { ApiDomain } from "../../../src/utils/APIDomain";

export type TUser = {
    id: number
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
    isVerified: string;
    image_url?: string;

}

export const usersAPI = createApi({
    reducerPath: "usersAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: ApiDomain,
       
}),

tagTypes: ["User"],
    endpoints: (builder) => ({
        createUsers: builder.mutation<TUser, Partial<TUser>>({
            query: (user) => ({
                url: "/auth/register",
                method: "POST",
                body: user,
            }),
            invalidatesTags: ["User"],
        }),
    }),
    })
