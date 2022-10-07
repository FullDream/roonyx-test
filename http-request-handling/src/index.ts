interface Info {
	count: number
	pages: number
	next?: string
	prev?: string
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

interface NameAndUrl {
	name: string
	url: string
}

interface Character {
	id: number
	name: string
	status: string
	species: string
	type: string
	gender: string
	origin: NameAndUrl
	location: NameAndUrl
	image: string
	episode: string[]
	url: string
	created: Date
}

interface Page<T = any> {
	info: Info
	results: T[]
}

const BASE_URL = 'https://rickandmortyapi.com/api'

const api = {
	episode: `${BASE_URL}/episode`,
	character: `${BASE_URL}/character`,
}

const getApi = async <T = unknown>(url: string): Promise<T> => {
	const res = await fetch(url)
	return res.json()
}

const getAllPagesData = async <T>(initialUrl: string) => {
	const fullData: T[] = []

	const getPageRecursive = async (url: string) => {
		const page = await getApi<Page<T>>(url)
		fullData.push(...page.results)

		if (!page?.info?.next) return
		await getPageRecursive(page.info.next)
	}

	await getPageRecursive(initialUrl)

	return fullData
}

const findIdInUrl = (url: string): string => url.split('/').slice(-1).toString()

;(async () => {
	const episodes = await getAllPagesData<Episode>(api.episode)

	const charsIds: string[] = []
	episodes.forEach((episode) => episode.characters.forEach((url) => charsIds.push(findIdInUrl(url))))

	const characters = await getApi<Character[]>(api.character + '/' + [...new Set(charsIds)])

	const transformEpisodes = episodes.map((item) => ({
		...item,
		characters: item.characters.map((char) => characters.find(({ id }) => id === +findIdInUrl(char))),
	}))

	console.log(transformEpisodes)
})()
