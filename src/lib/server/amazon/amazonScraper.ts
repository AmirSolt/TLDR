




import amazonScraper from 'amazon-buddy';

import {swapUrlWithAFfiliate} from './amazonAffiliate'




interface amazonSearch{

}

interface amazonProduct{

}

interface amazonReview{


}





export async function getSearchResults(keyword, country){
    const products = await amazonScraper.products({ keyword: keyword, number: 10, country:country });
    products.result.forEach((product) => {
        product.url = swapUrlWithAFfiliate(product.url)
    })
    return products.result
}






export async function getProductsByAsins(asins:string[], userCountry:string){
    let results=[];
    await Promise.all(asins.map( asin => getProductByAsin(asin, userCountry) )).then(
        (values) => results = values
    ).catch((error)=> console.log("Found an error in getProductsByAsins"))

    return results
}



async function getProductByAsin(asin:string, userCountry:string){
    let results=[];
    await Promise.all([getProductInformation(asin, userCountry), getReviews(asin, userCountry)])
    .then(
        (values) =>{
            results = values
        } 
    ).catch((error)=> console.log("Found an error in getProductByAsin"))

        
    return {"product_information":results[0], "reviews":results[1]}
}


async function getProductInformation(asin, country){
    const product_by_asin = await amazonScraper.asin({ asin: 'B07PKDKC53', country });
    let result = product_by_asin.result[0];
    return {
        "title":result.title,
        "description":result.description,
        "feature_bullets":result.feature_bullets,
        "price":getPrice(result),
        "categories":getCategories(result),
        "product_specifications":getProductSpecifications(result)
    }
}

async function getReviews(asin, country){
    try{
        const reviews = await amazonScraper.reviews({ asin: asin, number: 10, country });
        return reviews.result.map((review) => review.review)

    }catch(error){
        console.log("Found an error in getReviews")
        return []
    }
}







function getPrice(result){
    return `${result.price.current_price} ${result.price.currency}`
}

function getCategories(result){
    return result.categories.map((category) => category.category)
}

function getProductSpecifications(result){
    let product_information = result.product_information
    Object.keys(product_information).forEach(
        (key, index) => {
            if(!product_information[key]){
                delete product_information[key]
            }
        });
    return product_information
}

