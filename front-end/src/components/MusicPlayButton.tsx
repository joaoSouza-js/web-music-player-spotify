"use client"

import { useMusicPlayer } from "@/hooks/useMusicPlayer"
import { Play } from "lucide-react"
import { ComponentProps, forwardRef } from "react"

type MusicPlayButtonProps = ComponentProps<"button"> & {
    musicId: string
    playlistId?: string
}

export const MusicPlayButton = forwardRef<HTMLButtonElement, MusicPlayButtonProps>((props, ref) => {
    const {musicId, playlistId} = props
    const {fetchAudioStream} = useMusicPlayer()
    async function handleFetchAudioStream() {
        await fetchAudioStream()
    }
    return (
        <button
            ref={ref}
            onClick={handleFetchAudioStream}
            className="bg-green-500  h-12 w-12 items-center justify-center pl-1  flex rounded-full text-black ml-auto invisible group-hover:visible transition-all"
        >
            <Play fill='bg-black' size={20} />
        </button>
    )
})
