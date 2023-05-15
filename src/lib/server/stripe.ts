import Stripe from 'stripe'
import { PRIVATE_SECRET_STRIPE_KEY } from '$env/static/private'

export const stripe = new Stripe(PRIVATE_SECRET_STRIPE_KEY, {
	apiVersion: '2022-11-15',
})