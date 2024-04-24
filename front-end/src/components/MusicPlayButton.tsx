"use client"

import { useMusicPlayer } from "@/hooks/useMusicPlayer"
import { Play } from "lucide-react"
import { ComponentProps, forwardRef } from "react"

type MusicPlayButtonProps = ComponentProps<"button"> & {
    music: MUSIC_DTO,
    playlistId?: string
    hasHidden?: boolean,
    musicQueue?: MUSIC_DTO[]
}

export const MusicPlayButton = forwardRef<HTMLButtonElement, MusicPlayButtonProps>((props, ref) => {
    const {music, playlistId,musicQueue, hasHidden=true} = props
    const {fetchSingleSong,fetchQueueSongs} = useMusicPlayer()
    
    async function handleFetchAudioStream() {
        if(!musicQueue){
            await fetchSingleSong(music)
            return
        }
        await fetchQueueSongs(musicQueue,music.id)
    }
    return (
        <button
            ref={ref}
            onClick={handleFetchAudioStream}
            className={`bg-green-500  h-12 w-12 items-center justify-center pl-1  flex rounded-full text-black ml-auto  ${hasHidden && 'invisible'}  group-hover:visible transition-all`}
        >
            <Play fill='bg-black' size={20} />
        </button>
    )
})

MusicPlayButton.displayName = "MusicPlayButton"
