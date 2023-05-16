

import { otpSchema, tokenVerifySchema } from '$lib/schemas/auth'
import {loadInWallet} from '$lib/data/stores'
import {walletCreateTest} from '$lib/components/payment/subscriptions'


export const otpInit = async (supabaseAuthClient, formData ) => {
    const req = Object.fromEntries(formData) 


    const email = req.email as string
    const hCaptchaToken = formData.get("h-captcha-response") as string


    // if(!otpSchema.safeParse({email, hCaptchaToken}).success){
    //     return {
    //         error: true,
    //         message: "Invalid credentials"
    //     }
    // }

    const { data, error: err } = await supabaseAuthClient.auth.signInWithOtp({
        email: email,
        // options:{
        //     captchaToken : hCaptchaToken
        // }
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


export const verifyToken = async (supabaseAuthClient, formData ) => {
    const req = Object.fromEntries(formData) 
    const email = req.email as string
    const token = req.token as string

    if(!tokenVerifySchema.safeParse({email, token}).success){
        return {
            error: true,
            message: "Invalid credentials"
        }
    }

    const { data, error: err } = await supabaseAuthClient.auth.verifyOtp({
        email: email,
        token: token,
        type:"email",
    })


    
    if (err) {
        return {
            error: true,
            message: "Authentification failed"
        }
    }
    
    await loadInWallet(data.user.id, supabaseAuthClient);
    await walletCreateTest()

    return {
        error: false,
        message: "Authentification success"
    }
}




