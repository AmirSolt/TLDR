
import { stripe, priceIds } from '$lib/server/stripe'
import { wallet } from '$lib/data/stores'
import { json } from '@sveltejs/kit';


export const POST = async ({ request }) => {

  const { plan_name, stripe_sub_id } = await request.json()

  let clientSecret = await updateSubscription(stripe_sub_id, priceIds[plan_name])


  return json({ error: false, message: "success", clientSecret })
};



async function updateSubscription(subscriptionId, newPriceId) {
  const subscription = await stripe.subscriptions.retrieve(
    subscriptionId
  );

  const updatedSubscription = await stripe.subscriptions.update(
    subscription.id,
    {
      cancel_at_period_end: false,
      items: [
        {
          id: subscription.items.data[0].id,
          price: newPriceId,
        },
      ],

      expand: ['latest_invoice.payment_intent'],
    }

  );

  return updatedSubscription?.latest_invoice?.payment_intent.client_secret

}