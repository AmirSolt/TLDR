
const tag = 'mapyan-20';
const link_code = 'll2';


export function swapUrlWithAFfiliate(url:string){
    const urlObj = new URL(url);
    swapDomain(urlObj);
    addAffiliateCodes(urlObj);
    return urlObj.toString();
}


function addAffiliateCodes(urlObj:URL){
    urlObj.searchParams.set('tag', tag);
    // urlObj.searchParams.set('linkCode', link_code);
    return urlObj;
}

function swapDomain(urlObj:URL){
    urlObj.hostname = 'www.amazon.com';
    return urlObj;
}