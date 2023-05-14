
<div class="grid gap-4 sm:grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 grid-rows-3 w-full">
    
    {#each Array(12) as _, i}
        <div class="card w-full h-96">
            <div class="p-4 space-y-4 w-full flex flex-col justify-center items-center">
                <div class="placeholder animate-pulse w-60 h-60" />
                <div class="flex flex-row space-x-4 ">
                    <div class="placeholder animate-pulse w-16" />
                    <div class="placeholder animate-pulse w-16" />
                </div>
                <div class="placeholder animate-pulse w-3/4" />
                <div class="placeholder animate-pulse w-3/4" />
            </div>
            
        </div>
    {/each}
</div>