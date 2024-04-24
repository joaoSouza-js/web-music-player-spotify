import { Avatar } from "@/components/Avatar";
import { PlayMusicLi } from "@/components/search/PlayMusicLi";
import { fetchAlbums } from "@/controller/albums/getAlbums";
import { fetchArtistSongs } from "@/controller/artists/getArtistSongs";
import { fetchArtists } from "@/controller/artists/getArtists";
import { api } from "@/service/axios";
import { Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type SearchResultProps = {
    params: {
        search: string;
    };
};

type MusicsResponse = {
    musics: MUSIC_DTO[];
};

type ArtistsResponse = {
    artists: ARTIST_DTO[];
};

type AlbumsResponse = {
    albums: ALBUM_DTO[];
};

export default async function SearchResult({
    params: { search },
}: SearchResultProps) {

    async function fetchArtistsPromise() {
        const artistResponse = await fetchArtists({
            search: search,
            limit: 25,
        })
        return artistResponse
    }

    async function fetchAlbumsPromise() {
        const albumResponse = await fetchAlbums({
            search: search,
            limit: 25,
        })
        return albumResponse
    }

    const [artists, albums] = await Promise.all([

        fetchArtistsPromise(),
        fetchAlbumsPromise(),
    ]);

    const topArtist = artists[0];

    let topArtistsSongs: MUSIC_DTO[] | null = null

    if (topArtist?.id) {
        const artistSongs = await fetchArtistSongs({ id: topArtist.id, limit: 4 })
        topArtistsSongs = artistSongs
    }



    return (
        <div className="mt-4">
            {
                topArtist?.id && (
                    <section className="flex ">
                        <div className="w-[60%] ">
                            <strong className="text-xl">Melhor Resultado</strong>
                            <section className="p-4 mt-4 h-52 bg-zinc-900 rounded-md group hover:bg-white/5">
                                <Avatar
                                    src={topArtist.photo}

                                />
                                <div className="space-y-1 w-full mt-2  ">
                                    <strong className="font-semibold text-left text-2xl ">{topArtist.name}</strong>
                                    <span className="text-zinc-400 block text-sm text-left">
                                        Artista
                                    </span>

                                </div>


                            </section>

                        </div>
                        <div className="flex-1">
                            <strong className="text-xl">Melhores sons</strong>
                            <ul className=" mt-4">

                                {topArtistsSongs?.map(music => (
                                    <PlayMusicLi
                                        id={music.id}
                                        key={music.id}
                                        name={music.name}
                                        photo={music.photo}
                                        url={music.url}
                                        artists={music.artists}
                                    />
                                ))}
                            </ul>
                        </div>

                    </section>

                )
            }
            <section className="mt-6">
                <h1 className="text-xl font-bold" >Artistas</h1>
                <div className="flex gap-2 mt-1">

                    {artists.map(artist => (
                        <div 
                            key={artist.id}
                            className="group p-2 rounded-md hover:bg-white/10"
                            >
                            <div>
                                <Avatar
                                    alt={`foto do artista ${artist.name}`}
                                    src={artist.photo}
                                    size="large"
                                />
                            </div>
                            <div className="space-y-1 w-full mt-1   ">
                                <strong className="font-semibold text-left ">{artist.name}</strong>
                                <span className="text-zinc-400 block text-xs text-left">
                                    Artista
                                </span>

                            </div>

                        </div>

                    ))}

                </div>
            </section>
            <section className="mt-6">
                <h1 className="text-xl font-bold" >Albums</h1>

                <div className="flex gap-2 mt-1">

                    {albums.map(album => (
                        <div 
                            key={album.id}
                            className="group p-2 rounded-md hover:bg-white/10"
                        >
                            <div>
                                <Avatar
                                    isRounded={false}
                                    alt={`foto do artista ${album.name}`}
                                    src={album.photo}
                                    size="large"
                                />
                            </div>
                            <div className="space-y-1 w-32 mt-2   ">
                                <strong className="font-semibold text-left ">{album.name}</strong>
                                <span className="text-zinc-400 block text-xs text-left text-wrap">
                                    {album.artistsOwner[0]?.name}
                                </span>

                            </div>

                        </div>

                    ))}

                </div>
            </section>
        </div>
    );
}
