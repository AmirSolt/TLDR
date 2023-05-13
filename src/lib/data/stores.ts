import { writable } from "svelte/store";


export const compareList = writable([]);

export const wallet = writable({});





export async function loadInWallet(user_id, supabase){

    let doesWalletExist = false;

    console.log(user_id);
    if(!user_id) return;


    wallet.subscribe(value => {
        if(value.id === user_id){
            doesWalletExist = true;
        }
	});

    if (!doesWalletExist) {
        let results = await supabase.from('wallets').select('plan, credits').eq('id', user_id).single()
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