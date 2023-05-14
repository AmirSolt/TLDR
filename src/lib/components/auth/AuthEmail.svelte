<script lang="ts">
    import {login, signup} from './authFuncs';
    import {page} from '$app/stores';
    import { TabGroup, Tab } from '@skeletonlabs/skeleton';
    $: ({supabase} = $page.data)

    export let response;
    export let stepIndex;

    let tabSet:string = "Login";

    async function loginForm(e){
        const form = e.target
        const data = new FormData(form)
        response = await login(supabase, data)
    }
    async function signupForm(e) {
        const form = e.target
        const data = new FormData(form)
        response = await signup(supabase, data)

        stepIndex = 2
    }

    async function authForm(e){
        if(tabSet==="Login"){
            await loginForm(e)
        }else if(tabSet==="Sign-up"){
            await signupForm(e)
        }
    }


</script>



<TabGroup  
    justify="justify-start"
    active="variant-filled-primary"
    hover="hover:variant-soft-primary"
    flex="flex-1 lg:flex-none"
    class="w-full"
    >
	<Tab bind:group={tabSet} name="tab1" value="Login">Login</Tab>
	<Tab bind:group={tabSet} name="tab2" value="Sign-up">Sign-up</Tab>
	<!-- Tab Panels --->
	<svelte:fragment slot="panel">
		
    <form  on:submit|preventDefault={authForm}>

        <label for="email">Email</label>
        <input type="email" name="email" id="email" required>
    
        <label for="password">Password</label>
        <input type="password" name="password" id="password" required>
    
        <button class="btn variant-filled" type="submit">{tabSet}</button>
    </form>


	</svelte:fragment>
</TabGroup>
			

