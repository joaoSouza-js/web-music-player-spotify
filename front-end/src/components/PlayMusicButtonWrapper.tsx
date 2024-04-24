"use client"
import { tv, type VariantProps } from "tailwind-variants"
import { ComponentProps, forwardRef } from "react"
import { useMusicPlayer } from "@/hooks/useMusicPlayer"
import { Slot } from '@radix-ui/react-slot';

const ButtonStyles = tv({
    base: "",
})
 
type PlayMusicButtonProps = VariantProps<typeof ButtonStyles> & ComponentProps<"button"> & {
    music: MUSIC_DTO,
    asChild: boolean
}

export const PlayMusicButtonWrapper = (props: PlayMusicButtonProps) => {

    const { music, children, ref, asChild } = props
    const { fetchSingleSong } = useMusicPlayer()

    async function handleFetchAudioStream() {
        fetchSingleSong(music)
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