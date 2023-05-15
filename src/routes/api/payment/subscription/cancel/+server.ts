import { stripe } from '$lib/server/stripe'



export const POST = async () => {
    
    return new Response();
};




async function cancelSubscription(request){
    // Delete the subscription
    const deletedSubscription = await stripe.subscriptions.del(
        request.body.subscriptionId
    );
    request.send(deletedSubscription);
}