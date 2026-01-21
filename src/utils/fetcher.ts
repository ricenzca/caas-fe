type FetcherArgs = [string | URL | Request]

const fetcher = (...args: FetcherArgs) => fetch(...args).then(res => res.json())

export default fetcher