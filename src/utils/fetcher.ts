type FetcherArgs = [string | URL | Request]

const fetcher = async (...args: FetcherArgs) => {
    try {
        const res = await fetch(...args)
        if (!res.ok) {
            const error = new Error('An error occurred while fetching the data.')
            error.cause = await res.json()
            throw error
        }
        return await res.json()
    } catch (error) {
        const errMsg = 'Error encountered while getting flight plan details'
        console.error(errMsg, error);
        return new Error(errMsg);
    }
}

export default fetcher