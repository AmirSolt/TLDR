<script lang='ts'>
    import { invalidate } from '$app/navigation';


    async function deleteUser(){
        await fetch('/api/auth/delete_user')
        console.log("User deleted");    
        invalidate('supabase:auth');
    }


    function confirmDelete(){
        let r = confirm("Are you sure you want to delete your account?");

        if(r){
            deleteUser();
        }
    }

</script>



<h1>Remove your data from </h1>
<h2>Please Log-out after deleting your account to complete the action.</h2>
<form on:submit|preventDefault={confirmDelete}>
    <button class="btn variant-filled" type="submit"> Delete Your Data</button>
</form>