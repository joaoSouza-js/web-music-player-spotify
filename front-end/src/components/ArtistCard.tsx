import Image from "next/image"
import { Avatar, avatarSize } from "./Avatar"
import { Play } from "lucide-react"
import Link from "next/link"
import { MusicPlayButton } from "./MusicPlayButton"
import { PlayMusicAlbumButtonWrapper } from "./PlayMusicAlbumButtonWrapper"
import { PlayArtistMusicButtonWrapper } from "./PlayArtistMusicsButtonWrapper."

type ArtistCardProps = {
    artist: ARTIST_DTO,
    avatarSize?: avatarSize
}
export function ArtistCard({ artist, avatarSize = "large" }: ArtistCardProps) {
    return (
        <div
         
            className="group p-2 rounded-md hover:bg-white/10"
            key={artist.id}
        >
            <div className="relative">
                <Link
                    href={`/artist/${artist.id}`}
                >
                    <Avatar
                        alt={`foto do artista ${artist.name}`}
                        src={artist.photo}
                        size={avatarSize}
                    />
                </Link>
                <PlayArtistMusicButtonWrapper asChild artistId={artist.id}>

                    <MusicPlayButton className="absolute bottom-2 right-2 z-10 " size={avatarSize} />
                </PlayArtistMusicButtonWrapper>
            </div>
            <div className="space-y-1 w-full mt-1   ">
                <strong className="font-semibold text-left ">{artist.name}</strong>
                <span className="text-zinc-400 block text-xs text-left">
                    Artista
                </span>

            </div>

        </div>
    )
}

ArtistCard.displayName = "ArtistCard"