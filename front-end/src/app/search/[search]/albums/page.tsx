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
                <div 
                    className="group p-2 rounded-md hover:bg-white/10"
                    key={artist.id}
                >
                    <div>
                        <Avatar
                            alt={`foto do artista ${artist.name}`}
                            src={artist.photo}
                            size="extraLarge"
                        />
                    </div>
                    <div className="space-y-1 w-full   ">
                        <strong className="font-semibold text-left ">{artist.name}</strong>
                        <span className="text-zinc-400 block text-xs text-left">
                            Artista
                        </span>

                    </div>

                </div>
            ))}
        </div>
    )
}