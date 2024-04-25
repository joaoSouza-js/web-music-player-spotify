"use client"
import { tv, type VariantProps } from "tailwind-variants"
import { ComponentProps, forwardRef } from "react"
import { useMusicPlayer } from "@/hooks/useMusicPlayer"
import { Slot } from '@radix-ui/react-slot';
import { fetchSingleAlbum } from "@/controller/albums/getSingleAlbum";
import { fetchArtistSongs } from "@/controller/artists/getArtistSongs";

const ButtonStyles = tv({
    base: "",
})

type PlayMusicButtonProps = VariantProps<typeof ButtonStyles> & ComponentProps<"button"> & {
    asChild: boolean,
    artistId: string
}

export const PlayArtistMusicButtonWrapper = (props: PlayMusicButtonProps) => {

    const { artistId, children, ref, asChild } = props
    const { fetchQueueSongs } = useMusicPlayer()

    async function handlePlayAlbum() {
        const artistSongs = await fetchArtistSongs({ id: artistId })
        fetchQueueSongs(artistSongs)
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

PlayArtistMusicButtonWrapper.displayName = "PlayArtistMusicButtonWrapper"