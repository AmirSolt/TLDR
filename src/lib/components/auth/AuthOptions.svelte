


<script lang="ts">


    export let stepIndex;
    let option: string = '';

</script>




<div class="my-2">


    <button class="btn variant-ringed w-full my-1" on:click={()=>0}>
        <span>with Google</span>  
        <span>(icon)</span>
    </button>

    <button class="btn variant-ringed w-full my-1" on:click={()=>1}>
        <span>with Apple</span>  
        <span>(icon)</span>
    </button>


    <button class="btn variant-ringed w-full my-1" on:click={()=>2}>
        <span>with Facebook</span>  
        <span>(icon)</span>
    </button>


    <button class="btn variant-ringed w-full my-1" on:click={()=>stepIndex=1}>
        <span>with Email</span>  
        <span>(icon)</span>
    </button>



</div>

