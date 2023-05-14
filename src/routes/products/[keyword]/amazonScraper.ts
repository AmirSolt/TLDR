




import amazonScraper from 'amazon-buddy';






export async function getSearchResults(keyword, country){
    const products = await amazonScraper.products({ keyword: keyword, number: 10, country:country });
    return products.result
}


export async function getProductInformation(asin, country){
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

export async function getReviews(asin, country){
    const reviews = await amazonScraper.reviews({ asin: asin, number: 10, country });
    return reviews.result.map((review) => review.review)
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



// const scraper =  async () => {
//     try {
//         console.log("Starting scraping products")

//         console.time('main');

//         let asin = 'B07PKDKC53'
    
//         // const products = await amazonScraper.products({ keyword: 'Bag', number: 50 });
        
        
//         let product_information = await getProductInformation(asin)
//         let reviews = await getReviews(asin)
        
//         console.log(`Found ${reviews.length} reviews`)

//         const data = {
//             "product_information":product_information,
//             "reviews":reviews
//         }

//         fs.writeFile ("product_data.json", JSON.stringify(data), function(err) {
//             if (err) throw err;
//             console.log('complete');
//             }
//         );

//         console.timeEnd('main');

//     } catch (error) {
//         console.log(error);
//     }
// }