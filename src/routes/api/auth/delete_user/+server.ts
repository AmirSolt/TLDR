import { redirect, error } from '@sveltejs/kit';
import { SERVICE_ROLE_KEY_SUPABASE } from '$env/static/private';



export const GET = async ({ locals: { getSession, supabase } }) => {

    const user_id = (await getSession()).user.id

    if(!user_id)
        throw error(400, "Something went wrong.")


    const { data, error:errDelete } = await supabase.auth.admin.deleteUser(
        user_id,
        true
    )

    if(errDelete)
        throw error(400, "Something went wrong.")


    // throw redirect(303, "/")

};