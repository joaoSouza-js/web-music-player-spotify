import { HeaderNavigation } from "@/components/HeaderNavigation"
import { MusicPlayButton } from "@/components/MusicPlayButton"
import { ListPlayMusicButton } from "@/components/MusicPlayerListButton"
import { PlayMusicQueueButtonWrapper } from "@/components/PlayMusicQueueButtonWrapper"
import { fetchArtistSongs } from "@/controller/artists/getArtistSongs"
import { fetchSingleArtist } from "@/controller/artists/getSingleArtist"
import { BadgeCheck, Check, Ellipsis } from "lucide-react"
import Link from "next/link"
import { Metadata,  } from 'next'

type ArtistRouteParams ={
    params: {
        id: string
    }
}


export async function generateMetadata({params:{id}}: ArtistRouteParams): Promise<Metadata>{
    const artist = await fetchSingleArtist({id})

    return {
        title: artist.name,
    }
}

export default async function Artist({params:{id}}:ArtistRouteParams){
    const artist = await fetchSingleArtist({id})
    const musics = await fetchArtistSongs({id,limit:10})

    return (
        <div className={` bg-gradient-to-b min-h-full from-blue-600     rounded-xl m-2 flex flex-col`} >
            <div
                className="bg-no-repeat bg-cover bg-center min-h-64 pt-4  rounded-t-xl px-4 pb-6"
                 style={{backgroundImage: `url(${"https://wallpaperaccess.com/full/2817290.jpg"})`}} 
            >
                <HeaderNavigation/>
                <div className="mt-12 flex items-center gap-2">
                    <BadgeCheck
                        size={24}
                        className="text-white fill-blue-700"
                       
                    />
                    <span> Verificado</span>

                </div>
                <h1 className="font-bold text-7xl mt-4">
                    {artist.name}
                </h1>
                <span className="block mt-4">70,196,934 de ouvintes mensais</span>
                
            </div>
            
            <section className=" bg-black/30 flex-1 px-4 pt-6 pb-4 rounded-b-xl">
                <div className="flex gap-3 items-center  ">
                    <MusicPlayButton hasHidden={false} hasLeftDistance={false}/>
                    <button className="py-1 px-3 border border-zinc-500 font-bold text-sm rounded-full">Seguir</button>
                    <button>
                            <Ellipsis size={20} />
                        </button>

                </div>
                <div className="mt-10">
                    <h2 className="text-xl font-bold">Popular</h2>
                    <ol>
                        {
                            musics.map((music, index) => (
                                <li key={music.id} className="flex justify-between pb-3 pt-4 pl-2  group border-t-slate-700 hover:bg-white/15">

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

                </div>


            </section>
        </div>

    )
}