
<script lang="ts">
    import {Search} from 'lucide-svelte'
    import {goto} from '$app/navigation';
    import {userCountry} from '$lib/data/stores'
    
    let searchTerm:string = '';

  
    import {onMount} from 'svelte'
    onMount(() => {
        getSearchTermFromUrl();
    })

    function getSearchTermFromUrl(){
        'URL example: /products/keyword?country='
        const url = window.location.href;
        const urlParts = url.split('/');
        searchTerm = urlParts[urlParts.length-1].split('?')[0];
    }


    async function searchForm(keyword, country) {
        goto(`/products/${keyword}?country=${country}`)
    }

</script>






<div class="my-5" >
    <form class="flex w-full h-14 justify-center"  on:submit|preventDefault={()=>searchForm(searchTerm, $userCountry)}>
        <div class="input-group input-group-divider grid-cols-[1fr_auto] variant-ringed ">
            <input type="text" placeholder="Search..." bind:value={searchTerm} autocomplete="off" />
            <button class="variant-filled-secondary"><Search /></button>
        </div>
    </form>
</div>    

