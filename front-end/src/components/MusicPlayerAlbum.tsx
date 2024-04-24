"use client"

import { useMusicPlayer } from "@/hooks/useMusicPlayer"
import { api } from "@/service/axios"
import { Play } from "lucide-react"
import { ComponentProps, forwardRef } from "react"


type AlbumResponse = {
    album: ALBUM_DTO
}

type MusicPlayButtonProps = ComponentProps<"button"> & {
    albumId: string
    hasHidden?: boolean,
}

export const MusicPlayerAlbum = forwardRef<HTMLButtonElement, MusicPlayButtonProps>((props, ref) => {
    const {albumId, hasHidden=true} = props
    const {fetchQueueSongs} = useMusicPlayer()
    
    async function handleFetchAudioStream() {
        const albumResponse = await api.get<AlbumResponse>(`albums/${albumId}`)
        const { album } = albumResponse.data
        const { musics } = album

        await fetchQueueSongs(musics)
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

MusicPlayerAlbum.displayName = "MusicPlayerAlbum"
