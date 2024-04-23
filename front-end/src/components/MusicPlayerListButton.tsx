"use client"

import { useMusicPlayer } from "@/hooks/useMusicPlayer"
import { Play } from "lucide-react"
import { ComponentProps, forwardRef } from "react"

type MusicPlayButtonProps = ComponentProps<"button"> & {
    music: MUSIC_DTO,
    hasHidden?: boolean,
    index?: number,
    musicQueue?: MUSIC_DTO[]
}

export const ListPlayMusicButton = forwardRef<HTMLButtonElement, MusicPlayButtonProps>((props, ref) => {
    const { music, index, musicQueue, hasHidden = true } = props
    const { fetchSingleSong, fetchQueueSongs } = useMusicPlayer()

    async function handleFetchAudioStream() {
        if (!musicQueue) {
            await fetchSingleSong(music)
            return
        }
        await fetchQueueSongs(musicQueue, music.id)

    }
    return (
        <button
            ref={ref}
            className="relative w-5 h-full "
            onClick={handleFetchAudioStream}
        >
            <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">

                <span className="visible group-hover:invisible   ">{index}</span>
            </div>
            <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
                <Play fill='#eee'  className="invisible size-4  group-hover:visible z-10 absolute" size={20} />

            </div>



        </button>
    )
})
