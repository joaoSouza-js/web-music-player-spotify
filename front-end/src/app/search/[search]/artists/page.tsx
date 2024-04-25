import { ArtistCard } from "@/components/ArtistCard";
import { Avatar } from "@/components/Avatar";
import { fetchArtists } from "@/controller/artists/getArtists";
import { api } from "@/service/axios";
type SearchArtistsProps = {
    params: {
        search: string
    }
}

type ArtistsResponse = {
    artists: ARTIST_DTO[];
};


export default async function SearchArtists({ params }: SearchArtistsProps) {
   const {search} = params

    const artists = await fetchArtists({
        search: search,
        limit: 25
    });

    return (
        <div className="flex gap-3 flex-wrap mt-4">
            {artists.map((artist) => (
                <ArtistCard
                    key={artist.id}
                    artist={artist}
                    avatarSize="extraLarge"
                />
            ))}
        </div>
    )
}