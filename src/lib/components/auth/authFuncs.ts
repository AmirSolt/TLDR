

import { signUpSchema, signInSchema, tokenVerifySchema } from '$lib/schemas/auth'
import {loadInWallet} from '$lib/data/stores'



export const signup = async (supabase, formData ) => {   
    const req = Object.fromEntries(formData) 
    const email = req.email as string
    const password = req.password as string

    if(!signUpSchema.safeParse({email, password}).success){
        return {
            error: true,
            message: "Invalid credentials"
        }
    }


    const { data, error: err } = await supabase.auth.signUp({
        email: email,
        password: password,
    })



    if (err) {
        return {
            error: true,
            message: "Authentification failed"
        }
    }


    return {
        error: false,
        message: "Authentification success"
    }

}




export const login = async (supabase, formData ) => {    
    const req = Object.fromEntries(formData) 
    const email = req.email as string
    const password = req.password as string

    if(!signInSchema.safeParse({email, password}).success){
        return {
            error: true,
            message: "Invalid credentials"
        }
    }

    const { data, error: err } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    })



    loadInWallet(data.user.id, supabase)


    if (err) {
        return {
            error: true,
            message: "Authentification failed"
        }
    }


    return {
        error: false,
        message: "Authentification success"
    }
}






export const verifyToken = async (supabase, formData ) => {
    const req = Object.fromEntries(formData) 
    const email = req.email as string
    const token = req.token as string

    if(!tokenVerifySchema.safeParse({email, token}).success){
        return {
            error: true,
            message: "Invalid credentials"
        }
    }

    const { data, error: err } = await supabase.auth.verifyOtp({
        email: email,
        token: token,
        type:"email",
    })

    loadInWallet(data.user.id, supabase);

    if (err) {
        return {
            error: true,
            message: "Authentification failed"
        }
    }


    return {
        error: false,
        message: "Authentification success"
    }
}






	
