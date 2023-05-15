import { createSupabaseServerClient } from '@supabase/auth-helpers-sveltekit';
import type { Handle } from "@sveltejs/kit"

import {PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY} from '$env/static/public';
import {PRIVATE_SERVICE_ROLE_KEY_SUPABASE} from '$env/static/private';


export const handle: Handle = async ({ event, resolve }) => {
	// const { session, supabaseClient } = await getSupabase(event)

	// event.locals.sb = supabaseClient
	// event.locals.session = session




    event.locals.supabaseAuthServer = createSupabaseServerClient({
        supabaseUrl: PUBLIC_SUPABASE_URL,
        supabaseKey: PRIVATE_SERVICE_ROLE_KEY_SUPABASE,
        event,
      });
    
      /**
       * a little helper that is written for convenience so that instead
       * of calling `const { data: { session } } = await supabase.auth.getSession()`
       * you just call this `await getSession()`
       */
      event.locals.getSession = async () => {
        const {
          data: { session }
        } = await event.locals.supabaseAuthServer.auth.getSession();
        return session;
      };

      return resolve(event, {
        /**
         * There´s an issue with `filterSerializedResponseHeaders` not working when using `sequence`
         *
         * https://github.com/sveltejs/kit/issues/8061
         */
        filterSerializedResponseHeaders(name) {
          return name === 'content-range';
        }
      });
};