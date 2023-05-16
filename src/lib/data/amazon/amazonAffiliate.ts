
const tag = 'mapyan-20';


export function swapUrlWithAFfiliate(url:string){
    const urlObj = new URL(url);
    swapDomain(urlObj);
    addAffiliateCodes(urlObj);
    return urlObj.toString();
}


function addAffiliateCodes(urlObj:URL){
    urlObj.searchParams.set('tag', tag);
    return urlObj;
}

function swapDomain(urlObj:URL){
    urlObj.hostname = 'www.amazon.com';
    return urlObj;
}