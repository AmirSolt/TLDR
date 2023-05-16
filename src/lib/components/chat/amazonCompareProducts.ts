import {compareList, userCountry} from '$lib/data/stores';



export async function getCompareProducts(){
    let results;
    await fetch('/api/products/by_asins', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            asins: getAsins(),
            country: getCountry()
        })
    }).then(res => res.json()).then(data => {
        results = data;
    }).catch(err => {
        console.log(err);
    })

    return results
}



function getAsins(){
    let asins:string[]=[];
    compareList.subscribe(values => asins = values);
    return asins;
}

function getCountry(){
    let country:string="US";
    userCountry.subscribe(value => country = value);
    return country;
}