<script lang="ts">

    import {PUBLIC_HCAPTCHA_SITE_KEY} from '$env/static/public'

</script>

<svelte:head>
    <script src="https://js.hcaptcha.com/1/api.js" async defer></script>
</svelte:head>


<div class="h-captcha" data-sitekey="{PUBLIC_HCAPTCHA_SITE_KEY}"></div>
