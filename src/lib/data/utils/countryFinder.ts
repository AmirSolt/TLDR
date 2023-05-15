import { getCountryForTimezone } from "countries-and-timezones";

export async function getUserCountry() {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const countryInfo = getCountryForTimezone(tz);
    if(!countryInfo) return null;
    return countryInfo.id;
}