import Stripe from 'stripe'
import { PRIVATE_SECRET_STRIPE_KEY } from '$env/static/private'

export const stripe = new Stripe(PRIVATE_SECRET_STRIPE_KEY, {
	apiVersion: '2022-11-15',
	
})


export const priceIds = {
	"FREE": "price_1N87kRBtC6nIQ4PvgsJtZrU2",
	"PRO": "price_1N87kjBtC6nIQ4PvNqnIu9tu",
	"PREMIUM": "price_1N87kyBtC6nIQ4PvGJ3ZK9fq",
}