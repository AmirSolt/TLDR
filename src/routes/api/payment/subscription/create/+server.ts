import { stripe, priceIds } from '$lib/server/stripe'
import { json } from '@sveltejs/kit';
import {supabaseService} from '$lib/server/supabase'
import {wallet} from '$lib/data/stores'

export const GET = async ({ locals: { getSession } }) => {

    console.log("received request")

    const session = await getSession();

    let walletData:any;

    wallet.subscribe((data) => {
      walletData = data;
    })

    if(!walletData)
        return json({ error: true, message: "no wallet data" })

    if (walletData.stripe_customer_id === null) {
        walletData.stripe_customer_id = await createCustomer(session.user.email);
    }

    if (walletData.stripe_sub_id === null) {
        walletData.stripe_sub_id = await createSubscription(walletData.stripe_customer_id);
    }
   

    let { data:data_updated, error: err_updated } = await supabaseService
    .from('wallets')
    .update({ stripe_customer_id: walletData.stripe_customer_id, stripe_sub_id: walletData.stripe_sub_id })
    .eq('id', session.user.id);

    if (err_updated)
        return json({ error: true, message: err_updated })

    wallet.set(walletData);


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
