import { Play } from "lucide-react";
import Link from "next/link";
import { PlayMusicButtonWrapper } from "../PlayMusicButtonWrapper";

type PlayMusicLiProps = MUSIC_DTO

export function PlayMusicLi({name,photo,url,artists,id}:PlayMusicLiProps){
    return (
        <li
     
        className="hover:bg-white/15 flex group py-2 px-2 gap-2"
    >
        <div className="relative size-8">
            <PlayMusicButtonWrapper asChild music={{name,photo,url,artists,id }}>
                <button className="absolute  w-full h-full  flex justify-center items-center group-hover:bg-white/30">
                    <Play
                        fill="rgb(212 212 216)"
                        className="size-4 invisible text-zinc-300 group-hover:visible"
                    />
                </button>

            </PlayMusicButtonWrapper>
            <img
                className="w-full h-full rounded-md"
                src={photo} alt=""
            />
        </div>
        <div className="flex flex-col">
            <Link
                href={"*"}
                className="text-sm hover:underline"
            >
                {name}
            </Link>
            <div className="flex gap-1">
                {
                    artists?.map((artist) => (
                        <Link
                            key={artist.id}
                            href={"*"}
                            className="text-xs text-zinc-300 hover:underline hover:text-zinc-100"
                        >
                            {artist.name}
                        </Link>
                    ))
                }

            </div>

        </div>


    </li>

    )
}