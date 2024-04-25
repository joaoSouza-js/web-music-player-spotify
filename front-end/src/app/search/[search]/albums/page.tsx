import { AlbumCard } from "@/components/AlbumCard";
import { Avatar } from "@/components/Avatar";
import { fetchAlbums } from "@/controller/albums/getAlbums";
import { fetchSingleAlbum } from "@/controller/albums/getSingleAlbum";
import { api } from "@/service/axios";
type SearchArtistsProps = {
    params: {
        search: string
    }
}

type ArtistsResponse = {
    artists: ARTIST_DTO[];
};


export default async function SearchArtists({ params: {search} }: SearchArtistsProps) {
   

    const albums = await fetchAlbums({
        search: search,
        limit: 25,
    })

    return (
        <div className="flex gap-3 flex-wrap mt-4">
            {albums.map((artist) => (
                <AlbumCard
                    key={artist.id}
                    album={artist}
                    avatarSize="extraLarge"
                />
            ))}
        </div>
    )
}