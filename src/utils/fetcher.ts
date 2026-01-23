type FetcherArgs = [string | URL | Request]

const fetcher = async (...args: FetcherArgs) => {
    const res = await fetch(...args)
    if (!res.ok) {
        const error = new Error('An error occurred while fetching the data.')
        error.cause = await res.json()
        throw error
    }
    return await res.json()
}

export default fetcher