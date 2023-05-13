<script lang='ts'>
    import {page} from '$app/stores';
    import {login, signup, verifyToken} from './authFuncs';


    $: ({supabase, session} = $page.data)


    let response:any;

    async function loginForm(e){
        const form = e.target
        const data = new FormData(form)
        response = await login(supabase, data)
        
    }
    async function signupForm(e) {
        const form = e.target
        const data = new FormData(form)
        response = await signup(supabase, data)


    }
    async function verifyTokenForm(e) {
        const form = e.target
        const data = new FormData(form)
        response = await verifyToken(supabase, data)

    }


</script>



{#if response}
    <p class={response.error?'variant-soft-error':'variant-soft-success'}>
    </p>

    <aside class={response.error?'alert variant-ghost-error':'alert variant-ghost-success'}>
        <div>(icon)</div>
        <div class="alert-message">
            <h3 class="h3">{response.message}</h3>
        </div>
    </aside>
{/if}

<form  on:submit|preventDefault={loginForm}>

    <label for="email">Email</label>
    <input type="email" name="email" id="email" required>

    <label for="password">Password</label>
    <input type="password" name="password" id="password" required>

    <button class="btn variant-filled" type="submit">Login</button>
</form>


<br>
<br>
<form  on:submit|preventDefault={signupForm}>

    <label for="email">Email</label>
    <input type="email" name="email" id="email" required>

    <label for="password">Password</label>
    <input type="password" name="password" id="password" required>

    <button class="btn variant-filled" type="submit">Register</button>
</form>

<br>
<br>
<form on:submit|preventDefault={verifyTokenForm}>
    <label for="email">Email</label>
    <input type="email" name="email" id="email" required>

    <label for="token">Token</label>
    <input type="text" name="token" id="token" required>

    <button class="btn variant-filled" type="submit">Verify</button>
</form>

<br>
<br>

