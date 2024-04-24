import { playsRecommendForUser } from "@/utils/playsRecommendForUser";
import { Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const coverImage = "https://i.scdn.co/image/ab67fb8200005caf097a46192e6bb67e52cdff60"
export default function Search() {

    return (
        <div>
            <section className="mt-6">
                <div className="flex justify-between">
                    <Link href={"/"} className="font-bold text-xl hover:underline">
                        Pesquisa Recentes
                    </Link>
                    <Link href={"/"} className="font-medium text-sm text-zinc-300 hover:underline">
                        ver tudo
                    </Link>

                </div>
                <div className="flex flex-nowrap  gap-2 mt-1">
                    {playsRecommendForUser.map(recommendedPlaylist => (
                         <Link
                         href={"*"}
                         key={recommendedPlaylist.id}

                         className=" rounded group  w-48   p-2 flex flex-col n gap-3  items-center hover:bg-white/10 transition-colors "
                     >
                         <div className="relative h-[160px]">
                             <Image
                                 alt={`capa do album ${recommendedPlaylist.title}`}
                                 src={recommendedPlaylist.cover}
                                 width={200}

                                 height={140}
                                 className="h-full  "
                             />
                             <button
                                 className="bg-green-500 absolute right-3 bottom-3 h-12 w-12 items-center justify-center pl-1  flex rounded-full text-black ml-auto invisible group-hover:visible transition-all"
                             >
                                 <Play fill='bg-black' size={20} />
                             </button>
                         </div>
 
                         <div className="space-y-1 w-full   ">
                             <strong className="font-semibold text-left ">{recommendedPlaylist.title}</strong>
                             <span className="text-zinc-400 block text-xs text-left">
                                 Artista
                             </span>

                         </div>
                     </Link>
                    ))}
                </div>
            </section>

            <section className="mt-6">
                <h1  className="font-bold text-xl">
                    novos intereses
                </h1>
                <div className="mt-3">
                    <div className="size-36 bg-pink-600 relative overflow-hidden rounded-xl px-4 pt-3">
                        <span className="font-bold text-xl">rock</span>
                        <img
                           
                            className="absolute object-cover size-24 -bottom-2 -right-4 rotate-[28deg]"
                            src={coverImage} 
                            alt="" 
                        />
                    </div>
                </div>
            </section>
        </div>
    )
}