import { AlbumCard } from "@/components/AlbumCard";
import { ArtistCard } from "@/components/ArtistCard";
import { Avatar } from "@/components/Avatar";
import { MusicPlayButton } from "@/components/MusicPlayButton";
import { PlayArtistMusicButtonWrapper } from "@/components/PlayArtistMusicsButtonWrapper.";
import { PlayMusicLi } from "@/components/search/PlayMusicLi";
import { fetchAlbums } from "@/controller/albums/getAlbums";
import { fetchArtistSongs } from "@/controller/artists/getArtistSongs";
import { fetchArtists } from "@/controller/artists/getArtists";


type SearchResultProps = {
    params: {
        search: string;
    };
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
                            <section className="p-4 mt-4 min-h-[208px] flex items-end justify-between bg-zinc-900 rounded-md group hover:bg-white/5">
                                <div>
                                    <Avatar
                                        src={topArtist.photo}

                                    />
                                    <div className="space-y-1 w-full mt-2  ">
                                        <strong className="font-semibold text-left text-2xl ">{topArtist.name}</strong>
                                        <span className="text-zinc-400 block text-sm text-left">
                                            Artista
                                        </span>

                                    </div>

                                </div>
                                <PlayArtistMusicButtonWrapper asChild artistId={topArtist.id}>
                                    <MusicPlayButton hasLeftDistance={false} />
                                </PlayArtistMusicButtonWrapper>

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
                        <ArtistCard
                            key={artist.id}
                            artist={artist}
                        />

                    ))}

                </div>
            </section>
            <section className="mt-6">
                <h1 className="text-xl font-bold" >Albums</h1>

                <div className="flex gap-2 mt-1">

                    {albums.map(album => (
                        <AlbumCard
                            avatarSize="large"
                            key={album.id}
                            album={album}
                        />
                    ))}

                </div>
            </section>
        </div>
    );
}
