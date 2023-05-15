




import {searchSchema} from '$lib/schemas/products';
// import {getSearchResults} from './sampleData'
import {getSearchResults} from './amazonScraper'
export const load = async ({params, url }) => {

    const {keyword} = params;
    const country:string = url.searchParams.get('country')?? 'US';
    
    if(!country){
        return{
            status: 400,
            streamed: {products: []}
        }
    }


    if(!searchSchema.safeParse({country, keyword}).success){
        return{
            status: 400,
            streamed: {products: []}
        }
    }


    return{
        streamed:{
            products: getSearchResults(keyword, country)
        }
    }

};