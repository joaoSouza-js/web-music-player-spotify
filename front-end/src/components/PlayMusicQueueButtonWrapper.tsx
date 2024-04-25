"use client"
import { tv, type VariantProps } from "tailwind-variants"
import { ComponentProps, forwardRef } from "react"
import { useMusicPlayer } from "@/hooks/useMusicPlayer"
import { Slot } from '@radix-ui/react-slot';

const ButtonStyles = tv({
    base: "",
})

type PlayMusicButtonProps = VariantProps<typeof ButtonStyles> & ComponentProps<"button"> & {
    musicId: string,
    asChild?: boolean,
    musicQueue: MUSIC_DTO[]
}

export const PlayMusicQueueButtonWrapper = (props: PlayMusicButtonProps) => {
    const { musicId, children, ref, asChild=false, musicQueue } = props
    const { fetchQueueSongs } = useMusicPlayer()

    async function handleFetchAudioStream() {
        console.log("musicQueue", musicQueue)
         fetchQueueSongs(musicQueue, musicId)
    }

    const Comp = asChild ? Slot : 'button';

    return (
        <Comp
            onClick={handleFetchAudioStream}
        >

            {children}
        </Comp>

    )
}

PlayMusicQueueButtonWrapper.displayName = "PlayMusicQueueButtonWrapper"