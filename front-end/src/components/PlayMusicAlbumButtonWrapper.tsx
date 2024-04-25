"use client"
import { tv, type VariantProps } from "tailwind-variants"
import { ComponentProps, forwardRef } from "react"
import { useMusicPlayer } from "@/hooks/useMusicPlayer"
import { Slot } from '@radix-ui/react-slot';
import { fetchSingleAlbum } from "@/controller/albums/getSingleAlbum";

const ButtonStyles = tv({
    base: "",
})

type PlayMusicButtonProps = VariantProps<typeof ButtonStyles> & ComponentProps<"button"> & {
    asChild: boolean,
    albumId: string
}

export const PlayMusicAlbumButtonWrapper = (props: PlayMusicButtonProps) => {

    const { albumId, children, ref, asChild } = props
    const { fetchQueueSongs } = useMusicPlayer()

    async function handlePlayAlbum() {
        const album = await fetchSingleAlbum({ id: albumId })
        fetchQueueSongs(album.musics)
    }

    const Comp = asChild ? Slot : 'button';

    return (
        <Comp
            onClick={handlePlayAlbum}
        >
            {children}
        </Comp>

    )
}

PlayMusicAlbumButtonWrapper.displayName = "PlayMusicAlbumButtonWrapper"