import { AuthApiError } from "@supabase/supabase-js"
import { fail, redirect } from "@sveltejs/kit"

export const actions = {
	otp_init: async ({ request, locals }) => {
		const body = Object.fromEntries(await request.formData())
		const email = body.email as string

		if(!emailSignInSchema.safeParse({email}).success){
			return fail(400, {
				error: "Invalid credentials",
			})
		}

		const { data, error: err } = await locals.supabase.auth.signInWithOtp({
			email: email,
		})

		if (err) {
			if (err instanceof AuthApiError && err.status === 400) {
				return fail(400, {
					error: "Invalid credentials",
				})
			}
			return fail(500, {
				error: "Wait a few minutes before trying again.",
			})
		}

		return {
			sent: true,
			email: email,
		}
	},


	otp_verif: async ({ request, locals }) => {
		const body = Object.fromEntries(await request.formData())
		const email = body.email as string
		const token = body.token as string
		
		if(!emailOTPSchema.safeParse({email, token}).success){
			return fail(400, {
				error: "Invalid credentials",
				sent: true
			})
		}


		const { data, error: err } = await locals.supabase.auth.verifyOtp({
            email: email,
			token: token,
            type: 'email',
		})

		if (err) {
			if (err instanceof AuthApiError && err.status === 400) {
				return fail(400, {
					error: "Invalid credentials",
					sent: true
				})
			}
			return fail(500, {
				error: "Wait a few minutes before trying again.",
				sent: true
			})
		}

		throw redirect(303, "/dashboard")
	},
}




// ====================================================================================================



import { error, redirect } from "@sveltejs/kit"
import type { RequestHandler } from "./$types"

export const GET: RequestHandler = async ({ locals }) => {
	const { error: err } = await locals.supabase.auth.signOut()

	if (err) {
		throw error(500, "Something went wrong logging you out.")
	}

	throw redirect(303, "/")
}