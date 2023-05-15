
import { stripe } from '$lib/server/stripe'


export const POST = async () => {
    
    return new Response();
};



async function updateSubscription(request, response){
    const subscription = await stripe.subscriptions.retrieve(
        request.body.subscriptionId
      );

      const updatedSubscription = await stripe.subscriptions.update(
        request.body.subscriptionId,
        {
          cancel_at_period_end: false,
          items: [
            {
              id: subscription.items.data[0].id,
              price: "price_H1NlVtpo6ubk0m",
            },
          ],
          expand: ['latest_invoice.payment_intent'],
        }

      );

      updatedSubscription?.latest_invoice?.payment_intent.client_secret
    
}