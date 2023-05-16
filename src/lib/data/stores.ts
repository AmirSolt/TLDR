import { writable } from "svelte/store";


export const compareList = writable([]);

export const wallet = writable({});


export const userCountry = writable("US");



import {getUserCountry} from "./utils/countryFinder";



export async function loadUserCountry(){
    
        let country = await getUserCountry();
        if(country){
            userCountry.set(country);
        }
}


export async function loadInWallet(user_id, supabaseAuthClient){

    let doesWalletExist = false;

    console.log(user_id);
    if(!user_id) return;


    wallet.subscribe(value => {
        if(Object.keys(value).length > 0){
            doesWalletExist = true;
        }
	});

    if (!doesWalletExist) {
        let results = await supabaseAuthClient.from('wallets').select('plan, credits, stripe_sub_id, stripe_customer_id').eq('id', user_id).single()
        if(results.error){
            console.log("wallets query errors:",results.error);
            return;
        }

        console.log("wallets query results:",results.data);
        wallet.set(
            results.data?? {}
        )
    }
}