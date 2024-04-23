
import { HeaderNavigation } from "@/components/HeaderNavigation"
import { MusicPlayButton } from "@/components/MusicPlayButton"
import { ListPlayMusicButton } from "@/components/MusicPlayerListButton"
import { api } from "@/service/axios"
import { generateRandomColor } from "@/utils/generateRandomColor"
import { Check, ChevronLeft, ChevronRight, List, Ellipsis, Clock } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
const testCoverImage = "data:image/jpeg;base64,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"

type AlbumPageProps = {
    params: {
        id: string
    }
}
type AlbumResponse = {
    album: ALBUM_DTO
}

export default async function Album({ params }: AlbumPageProps) {

    const albumResponse = await api.get<AlbumResponse>(`albums/${params.id}`)
    const { album } = albumResponse.data
    const { musics } = album

    return (
        <div className={` bg-gradient-to-b h-full from-blue-600 pt-6   rounded-xl m-2 flex flex-col`} >
            <div className="px-6">
               <HeaderNavigation/>
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

            <section className="mt-6 bg-black/20 flex-1 px-6 pt-4">
                <div className="flex justify-between gap-5">
                    <div className="flex gap-3 items-center">
                        <MusicPlayButton
                            hasHidden={false}
                            music={musics[0]}
                            musicQueue={musics}
                        />

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
                                    <ListPlayMusicButton
                                        hasHidden={false}
                                        music={music}
                                        index={index + 1}
                                        musicQueue={musics}
                                    />
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
                                                        id={music.id}
                                                        href={"*"}
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
                    <li></li>

                </ol>

            </section>
        </div>
    )
}