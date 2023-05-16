
import {PRIVATE_AMAZON_SCRAPER_API_KEY} from '$env/static/private'
import { each } from 'svelte/internal'
import {swapUrlWithAFfiliate} from './amazonAffiliate'
import {z} from 'zod'


const API_URL = 'https://api.asindataapi.com/request'
const AFFILIATE_CODE = "mapyan-20"



const searchResultSchema = z.object({
    asin: z.string(),
    title: z.string(),
    link: z.string(),
    prices: z.array(z.object({
        value: z.number(),
        currency: z.string()
    })),
    image: z.string(),
    brand: z.string(),
    rating: z.number(),
    ratings_total: z.number()
})







export async function getSearchResults(keyword, country){
    let products:any[] = [];
    const url = addQueriesToURL(API_URL, getSearchQueries(keyword, countryToDomain(country),));
    await fetch(url, {
        method: 'GET',
    }).then(
        (response) => response.json()
    ).then((data)=>{

        if(!("search_results" in data)){
            console.log(data)
            throw new Error("No search_results in data")
        }


        products = data["search_results"].filter((product)=> {
            try{
                searchResultSchema.parse(product)
                return true
            }catch(e){
                return false
            }
        })
    }).catch((error)=> {
        console.log(error)
        console.log("Found an error in getSearchResults")
    })
    return products
}


export async function getProductsByAsins(asins:string[], userCountry:string){

    let domain = countryToDomain(userCountry)

    let results=[];
    await Promise.all(asins.map( asin => getProductInformation(asin, domain) )).then(
        (values) => results = values
    ).catch((error)=> console.log("Found an error in getProductsByAsins"))


    // console.log(results)

    return results
}


// async function getProductByAsin(asin:string, domain:string){
//     let results=[];
//     await getProductInformation(asin, domain)
//     .then(
//         (values) =>{
//             results = values
//         } 
//     ).catch((error)=> console.log("Found an error in getProductByAsin"))

        
//     return results
// }


async function getProductInformation(asin, domain){
    let product:any = {};

    // console.log("//////////////////////////////////////")
    // console.log(addQueriesToURL(API_URL, getProductQueries(asin, domain)))

    const url = addQueriesToURL(API_URL, getProductQueries(asin, domain));
    await fetch(url, {
        method: 'GET',
    }).then(
        (response) => response.json()
    ).then((data)=>{
        const tempProduct = data["product"]
        let reviews = [];

        
        if("top_reviews" in tempProduct)
            reviews = tempProduct["top_reviews"].map((review)=> review["body"])
   

        product = {
            "title": tempProduct["title"],
            "brand": tempProduct["brand"],
            "categories": tempProduct["categories_flat"],
            "description": tempProduct["description"],
            "feature_bullets": tempProduct["feature_bullets_flat"],
            "specifications": tempProduct["specifications_flat"],
            "top_reviews": reviews,
        }
        
    }).catch((error)=> {
        console.log(error)
        console.log("Found an error in getProductInformation")
    })
    return product
}

// async function getReviews(asin, domain){
//     let reviews:any[] = [];
//     const url = addQueriesToURL(API_URL, getReviewQueries(asin, domain));
//     await fetch(url, {
//         method: 'GET',
//     }).then(
//         (response) => response.json()
//     ).then((data)=>{
//         reviews =  data["reviews"]
        
//     }).catch((error)=> {
//         console.log(error)
//         console.log("Found an error in getReviews")
//     })
//     return reviews
// }



























function addQueriesToURL(urlRaw, queries){
    let url = new URL(urlRaw)
    Object.keys(queries).forEach(key=>{
            url.searchParams.append(key, queries[key])
        }
    )

    return url.toString()
}


function getSearchQueries(keyword:string, domain:string){
    return {
        api_key: PRIVATE_AMAZON_SCRAPER_API_KEY,
        type: "search",
        amazon_domain: domain,
        search_term: keyword,
        exclude_sponsored: "true",
        output: "json",
        include_html: "false",
        associate_id: AFFILIATE_CODE,
        sort_by: "featured",
        page: "1"
    }
}

function getProductQueries(asin:string, domain:string){
    return {
        api_key: PRIVATE_AMAZON_SCRAPER_API_KEY,
        type: "product",
        amazon_domain: domain,
        asin: asin,
        associate_id: AFFILIATE_CODE,
        output: "json",
        include_html: "false"
    }
}

function getReviewQueries(asin:string, domain:string){

    return{
        api_key: PRIVATE_AMAZON_SCRAPER_API_KEY,
        type: "reviews",
        amazon_domain: domain,
        asin: asin,
        associate_id: AFFILIATE_CODE,
        reviewer_type: "all",
        page: "1",
        output: "json",
        include_html: "false"
    }
}


function countryToDomain(country){
    switch(country){
        case 'US':
            return 'amazon.com'
        case 'UK':
            return 'amazon.co.uk'
        case 'CA':
            return 'amazon.ca'
        case 'AU':
            return 'amazon.com.au'
        case 'IN':
            return 'amazon.in'
        case 'MX':
            return 'amazon.com.mx'
        case 'BR':
            return 'amazon.com.br'
        case 'SG':
            return 'amazon.sg'
        case 'TR':
            return 'amazon.com.tr'
        case 'AE':
            return 'amazon.ae'
        case 'SA':
            return 'amazon.sa'
        case 'NL':
            return 'amazon.nl'
        case 'DE':
            return 'amazon.de'
        case 'FR':
            return 'amazon.fr'
        case 'ES':
            return 'amazon.es'
        case 'IT':
            return 'amazon.it'
        case 'JP':
            return 'amazon.co.jp'
        case 'SE':
            return 'amazon.se'
        default:
            return 'amazon.com'
    }
}



