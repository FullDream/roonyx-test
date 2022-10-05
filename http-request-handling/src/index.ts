enum RickAndMortyUrls {
	episodes = 'https://rickandmortyapi.com/api/episode',
}

interface Info {
	count: number
	pages: number
	next: string
	prev?: any
}

interface Episode {
	id: number
	name: string
	air_date: string
	episode: string
	characters: string[]
	url: string
	created: Date
}

interface Episodes {
	info: Info
	results: Episode[]
}

const getApi = async <T = unknown>(url: string): Promise<T> => {
	const res = await fetch(url, { mode: 'cors' })
	return res.json()
}

let newEpisodes: any

getApi<Episodes>(RickAndMortyUrls.episodes).then((data) => {
	console.log(data.results)
	document.querySelector('code')?.insertAdjacentText('afterend', JSON.stringify(data.results))
})
