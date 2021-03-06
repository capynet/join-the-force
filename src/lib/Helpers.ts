/**
 * Fetches data from any external API for a single item.
 */
export async function hydrateOne<T>(url: string): Promise<T> {
    return await (await fetch(url)).json();
}

/**
 * Fetches data from any external API for multiple items.
 */
export async function hydrateMany<T>(urls: string[]): Promise<T[]> {
    const hydrated: T[] = [];

    // Wait all promises gets resolved before continuing (forEach() would fail)
    await Promise.all(urls.map(async (url: string) => {
        const obj = await (await fetch(url)).json()
        hydrated.push(obj)
    }));

    return hydrated;
}