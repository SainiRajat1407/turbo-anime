import AnimeDetail from "./animeDetails";


const SearchResult = async (params: any) => {
    const { slug } = await params.params;

    const response = await fetch(`https://api.jikan.moe/v4/anime?q=${slug}`)
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();

    return (<div>
        <AnimeDetail anime={data} />
    </div>)
}

export default SearchResult;