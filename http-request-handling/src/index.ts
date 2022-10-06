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

interface EpisodesPage {
	info: Info
	results: Episode[]
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

const episodesUrl = 'https://rickandmortyapi.com/api/episode'

const getApi = async <T = unknown>(url: string): Promise<T> => {
	const res = await fetch(url)
	return res.json()
}

const getAllEpisodes = async () => {
	const allEpisodes: Episode[] = []

	const getPageRecursive = async (url: string) => {
		const page = await getApi<EpisodesPage>(url)
		allEpisodes.push(...page.results)

		if (!page?.info?.next) return
		await getPageRecursive(page.info.next)
	}

	await getPageRecursive(episodesUrl)

	return allEpisodes
}

const getAllCharactersByUrls = async (urls: string[]) => {
	const uniqueUrls = [...new Set(urls)]
	const cache: { [key: string]: Character } = {}

	for (const item of uniqueUrls) {
		cache[item] = await getApi<Character>(item)
	}

	return cache
}

;(async () => {
	const episodes = await getAllEpisodes()

	const urls: string[] = []
	episodes.forEach((episode) => urls.push(...episode.characters))

	const characters = await getAllCharactersByUrls(urls)

	const transformEpisodes = episodes.map((item) => ({
		...item,
		characters: item.characters.map((char) => characters[char]),
	}))

	console.log(transformEpisodes)
})()
