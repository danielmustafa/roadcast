export const getPodcastGenres = async () => {
    let resp = await (await fetch("https://listen-api-test.listennotes.com/api/v2/genres")).json()
    return resp.genres ? resp.genres : []
}
