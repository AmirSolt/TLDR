<script lang="ts">
    import {verifyToken} from './authFuncs';
    import {page} from '$app/stores';
    $: ({supabase} = $page.data)

    export let response;
    export let stepIndex;

    async function verifyTokenForm(e) {
        const form = e.target
        const data = new FormData(form)
        response = await verifyToken(supabase, data)

        stepIndex=3;
    }

</script>





<form on:submit|preventDefault={verifyTokenForm}>
    <label for="email">Email</label>
    <input type="email" name="email" id="email" required>

    <label for="token">Token</label>
    <input type="text" name="token" id="token" required>

    <button class="btn variant-filled" type="submit">Verify</button>
</form>