




import {searchSchema} from '$lib/schemas/products';
// import {getSearchResults} from './sampleData'
import {getSearchResults} from './amazonScraper'

export const load = async ({params}) => {

    const {keyword} = params;
 
    return{
        streamed:{
            products: getSearchResults(keyword, "US")
        }
    }

};