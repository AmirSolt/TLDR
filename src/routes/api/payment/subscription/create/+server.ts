import { stripe, priceIds } from '$lib/server/stripe'
import { json } from '@sveltejs/kit';
import {supabaseService} from '$lib/server/supabase'


export const GET = async ({ locals: { getSession } }) => {

    console.log("received request")

    const session = await getSession();

    let { data, error: err } = await supabaseService.from('wallets').select('stripe_sub_id, stripe_customer_id').eq('id', session.user.id).single()

    if (err)
        return json({ error: true, message: err })


    let customer_id = data.stripe_customer_id;
    let subscription_id = data.stripe_sub_id;

    if (customer_id === null) {
        customer_id = await createCustomer(session.user.email);
    }

    if (subscription_id === null) {
        subscription_id = await createSubscription(customer_id);
    }
   

    let { data:data_updated, error: err_updated } = await supabaseService.from('wallets').update({ stripe_customer_id: customer_id, stripe_sub_id: subscription_id }).eq('id', session.user.id);



    if (err_updated)
        return json({ error: true, message: err })


    return json({ error: false, message: "success" });
};




async function createCustomer(user_email:string) {
        const customer = await stripe.customers.create({
            email: user_email,
        });

        return customer.id
    }
    
    
async function createSubscription(customer_id:string) {
 
    const subscription = await stripe.subscriptions.create({
        customer: customer_id,
        items: [{
            price: priceIds.FREE,
        }],
        collection_method: "charge_automatically",
        payment_behavior: 'default_incomplete',
        payment_settings: { save_default_payment_method: 'on_subscription' },
    });

    return subscription.id

  
}




// async function createCustomer() {
//     const customer = await stripe.customers.create({
//         email: '{{CUSTOMER_EMAIL}}',
//         name: '{{CUSTOMER_NAME}}',
//         address: {
//             postal_code: '{{POSTAL_CODE}}',
//         },

//     });
// }
