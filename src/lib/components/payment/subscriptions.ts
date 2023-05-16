import {wallet} from '$lib/data/stores'


export async function walletCreateTest(){

    let walletData:any;
    wallet.subscribe(value => walletData = value)

    console.log("walletCreateTest, walletData:",walletData)

    await fetch('/api/payment/subscription/create',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                stripe_customer_id: walletData.stripe_customer_id,
                stripe_sub_id: walletData.stripe_sub_id,
            })
        }	

    ).then(res => res.json())
    .then(data => {
        console.log(data)
        walletData.stripe_customer_id = data.stripe_customer_id
        walletData.stripe_sub_id = data.stripe_sub_id

        wallet.set(walletData)

    }).catch(err => {
        console.log(err)
    })
}
	

export async function walletModifyTest(plan_name:string="PRO"){
    
    let walletData:any;
    wallet.subscribe(value => walletData = value)

    console.log("walletCreateTest, walletData:",walletData)

    await fetch('/api/payment/subscription/modify',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                plan_name: plan_name,
                stripe_sub_id: walletData.stripe_sub_id,
            })
        }

    ).then(res => res.json())
    .then(data => {
        console.log("walletModifyTest client secret", data.clientSecret)
        return data.clientSecret;
    }).catch(err => {
        console.log(err)
    })

    
}