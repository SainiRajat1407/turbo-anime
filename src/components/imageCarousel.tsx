"use client";

import TrendingAnimeCarousel from "@/components/ui/animated-testimonials";
import { useEffect, useState } from "react";

function ImageCarousel() {
    const [animeList, setAnimeList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        async function fetchAnime() {
            try {
                const response = await fetch("https://api.jikan.moe/v4/top/anime");
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();

                // Transforming fetched data with defensive checks
                const transformedAnimeList = data.data.map((anime: {
                    mal_id: number; synopsis: any;
                    genres: { name: any; }[];
                    score: number; title: any;
                    images: {
                        webp: { large_image_url: any; }; jpg: { large_image_url: any; };

                    };
                }) => ({
                    mal_id: anime.mal_id,
                    title: anime.title,
                    image: anime.images.webp.large_image_url ,
                    synopsis: anime.synopsis || "No synopsis available",
                    genres: anime.genres.map((genre) => genre.name).join(", ") || [],
                    score: anime.score || 0,
                }));

                setAnimeList(transformedAnimeList);
            } catch (e) {
                setError(e);
            } finally {
                setLoading(false);
            }
        }

        fetchAnime();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return <TrendingAnimeCarousel animeList={animeList} autoplay={true} />;
}

export { ImageCarousel };
