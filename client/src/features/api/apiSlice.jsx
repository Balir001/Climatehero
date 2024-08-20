import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/climatehero/user' }),
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (credentials) => ({
        url: '/signup',
        method: 'POST',
        body: credentials,
      }),
    }),

    signIn: builder.mutation({
      query: (credentials) => ({
        url: '/signin',
        method: 'POST',
        body: credentials,
      }),
    }),


    requestPasswordReset: builder.mutation({
      query: (email) => ({
        url: '/requestpasswordreset',
        method: 'POST',
        body: { email },
      }),
    }),

    verifyAuthCode: builder.mutation({
      query: ({ code, service }) => ({
        url: '/verify-auth-code',
        method: 'POST',
        body: { code, service },
      }),
    }),

  

    submitNewPassword: builder.mutation({
      query: (newPassword) => ({
        url: '/reset-password',
        method: 'POST',
        body: { newPassword },
      }),
    }),

  }),
});

export const { 
  useSignUpMutation, 
  useSignInMutation, 
  useRequestPasswordResetMutation,
  useVerifyAuthCodeMutation,
  useSubmitNewPasswordMutation
} = apiSlice;