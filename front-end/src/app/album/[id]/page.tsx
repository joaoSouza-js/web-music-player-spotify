
import { HeaderNavigation } from "@/components/HeaderNavigation"
import { MusicPlayButton } from "@/components/MusicPlayButton"
import { ListPlayMusicButton } from "@/components/MusicPlayerListButton"
import { api } from "@/service/axios"
import { Check,  List, Ellipsis, Clock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Metadata,  } from 'next'
import { PlayMusicQueueButtonWrapper } from "@/components/PlayMusicQueueButtonWrapper"

type AlbumPageProps = {
    params: {
        id: string
    }
}
type AlbumResponse = {
    album: ALBUM_DTO
}

export async function generateMetadata({ params }: AlbumPageProps): Promise<Metadata> {
    const albumResponse = await api.get<AlbumResponse>(`albums/${params.id}`)
    const { album } = albumResponse.data
    const artistOwner = album.artistsOwner[0]
    const titleMetadata = `${artistOwner?.name} - ${album.name}`
    return {
        title: titleMetadata,
        description: `${album.description}`,
        openGraph: {
            title: titleMetadata,
            description: `${album.description}`,
            images: [
                {
                    url: album.photo
                }
            ]
        }
    }
}


export default async function Album({ params }: AlbumPageProps) {

    const albumResponse = await api.get<AlbumResponse>(`albums/${params.id}`)
    const { album } = albumResponse.data
    const { musics } = album
  
    return (
        <div className={` bg-gradient-to-b h-full from-blue-600 py-4   rounded-xl m-2 flex flex-col`} >
            <div className="px-4">
                <HeaderNavigation />
                <section className="mt-6 flex items-end gap-4">
                    <Image
                        alt="capa do album hero and vilans do artista metro bomming"
                        src={album.photo}
                        className="rounded size-48"
                        width={200}
                        height={200}
                    />
                    <div>
                        <h1 className="text-base">Album</h1>
                        <h2 className="text-7xl font-semibold uppercase">{album.name}</h2>

                    </div>


                </section>

            </div>

            <section className="mt-6 bg-black/20 flex-1 px-4 pt-4">
                <div className="flex justify-between gap-5">
                    <div className="flex gap-3 items-center">
                        <PlayMusicQueueButtonWrapper
                            musicId={musics[0].id}
                            asChild
                            musicQueue={musics}
                        >

                            <MusicPlayButton
                                hasHidden={false}
                            />
                        </PlayMusicQueueButtonWrapper>

                        <button className="bg-green-500  size-8 flex items-center justify-center rounded-full">
                            <Check size={16} className="text-black" />
                        </button>

                        <button>
                            <Ellipsis size={20} />
                        </button>

                    </div>
                    <div className="flex items-center gap-2">
                        <span>Lista</span>
                        <List />
                    </div>
                </div>

                <div className="flex  justify-between mt-10">
                    <div className="flex gap-2">
                        <span className="text-zinc-300 text-sm">#</span>
                        <span className="text-zinc-300 text-sm">Título</span>
                    </div>
                    <Clock className="text-ellipsis" />
                </div>

                <ol>
                    {
                        musics.map((music, index) => (
                            <li key={music.id} className="flex justify-between pb-3 pt-4 border-t group border-t-slate-700 hover:bg-white/15">

                                <div className="flex gap-2 items-center">
                                    <PlayMusicQueueButtonWrapper
                                        asChild
                                        musicId={music.id}
                                        musicQueue={musics}
                                    >
                                        <ListPlayMusicButton
                                            index={index + 1}
                                        />

                                    </PlayMusicQueueButtonWrapper>

                                    <div className="flex flex-col">
                                        <Link
                                            href={"*"}
                                            className="text-sm hover:underline"
                                        >
                                            {music.name}
                                        </Link>
                                        <div className="flex gap-1">
                                            {
                                                music.artists?.map((artist) => (
                                                    <Link
                                                        key={music.id}
                                                        href={`/artist/${artist.id}`}
                                                        className="text-xs text-zinc-300 hover:underline hover:text-zinc-100"
                                                    >
                                                        {artist.name}
                                                    </Link>
                                                ))
                                            }

                                        </div>

                                    </div>
                                </div>

                                <div>
                                    <button className="bg-green-500  size-5 flex items-center justify-center rounded-full">
                                        <Check size={12} className="text-black" />
                                    </button>
                                </div>
                            </li>

                        ))
                    }
                   

                </ol>

            </section>
        </div>
    )
}