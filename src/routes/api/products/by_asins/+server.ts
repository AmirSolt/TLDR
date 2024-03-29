import {getProductsByAsins} from '$lib/server/amazon/amazonScraperApi'
import { json } from '@sveltejs/kit';



export const POST = async ({request}) => {

    let {asins, country} = await request.json();

    let results = await getProductsByAsins(asins, country)

    return json(results);
};