<script lang='ts'>
    import {Drawer} from '@skeletonlabs/skeleton';
    import { ProgressRadial } from '@skeletonlabs/skeleton';
    let logoutLoading = false;

</script>



<Drawer  >
    <div class="h-full flex flex-col pt-8 md:pt-20">
        <a href="/account" class="btn variant-ghost-secondary h-20 mx-2 my-4 drop-shadow-md"  >
            <h2 class="font-bold"> Account</h2>
        </a>
        <a href="/payment" class="btn variant-ghost-secondary h-20 mx-2 my-4 drop-shadow-md"  >
            <h2 class="font-bold"> Payment</h2>
        </a>
        <a href="/payment" class="btn variant-ghost-secondary h-20 mx-2 my-4 drop-shadow-md"  >
            <h2 class="font-bold"> Chat History</h2>
        </a>
        <a on:click={()=>logoutLoading=true} href="/logout" class="btn variant-ghost-secondary h-20 mx-2 my-4 drop-shadow-md"  >
            {#if !logoutLoading}
                <h2 class="font-bold"> Logout</h2>
            {:else}
                <ProgressRadial  width="w-12" stroke={100} />
            {/if}
        </a>
    </div>
</Drawer>