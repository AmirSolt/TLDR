import { error, json } from '@sveltejs/kit'
import { PRIVATE_SECRET_STRIPE_KEY } from '$env/static/private'
import { stripe } from '$lib/server/stripe'

export const POST = async ({ request }) => {
	let eventType: string | null = null

	if (PRIVATE_SECRET_STRIPE_KEY) {
		const payload = await request.text()
		const signature = request.headers.get('stripe-signature') ?? ''

		try {
			const event = stripe.webhooks.constructEvent(
				payload,
				signature,
				PRIVATE_SECRET_STRIPE_KEY
			)
			eventType = event.type
		} catch (e) {
			throw error(500, { message: 'Something went wrong' })
		}
	}

	switch (eventType) {
		case 'checkout.session.completed':
			// if payment is successful give user access to product
			console.log('Checkout completed')
			break
		case 'invoice.paid':
			// check if user is continuing payments
			console.log('Another payment')
			break
		case 'invoice.payment_failed':
			// payment failed or the customer does not have a valid payment method
			console.log('Checkout failed')
			break
		default:
			throw Error('Something went wrong')
	}

	return json({ message: 'success' }, { status: 200 })
}