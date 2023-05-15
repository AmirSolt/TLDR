import { stripe } from '$lib/server/stripe'


export const POST = async () => {
    
    return new Response();
};









async function createSubscription(request, response) {
    const customerId = request.cookies['customer'];
    const priceId = request.body.priceId;
  
    try {
      // Create the subscription. Note we're expanding the Subscription's
      // latest invoice and that invoice's payment_intent
      // so we can pass it to the front end to confirm the payment
      const subscription = await stripe.subscriptions.create({
        customer: customerId,
        items: [{
          price: priceId,
        }],
        collection_method: "charge_automatically",
        payment_behavior: 'default_incomplete',
        payment_settings: { save_default_payment_method: 'on_subscription' },
        expand: ['latest_invoice.payment_intent'],
      });
  
      response.send({
        subscriptionId: subscription.id,
        clientSecret: subscription.latest_invoice.payment_intent.client_secret,
      });
    } catch (error) {
      return response.status(400).send({ error: { message: error.message } });
    }
}

async function getCustomer(){
    // lookup in wallet for customer id
    // if not found, create customer
}

async function createCustomer() {
    const customer = await stripe.customers.create({
        email: '{{CUSTOMER_EMAIL}}',
        name: '{{CUSTOMER_NAME}}',
        address: {
            postal_code: '{{POSTAL_CODE}}',
        },

    });
}




