import Image from "next/image"
import { Avatar, avatarSize } from "./Avatar"
import { Play } from "lucide-react"
import Link from "next/link" 
import { MusicPlayButton } from "./MusicPlayButton"
import { PlayMusicAlbumButtonWrapper } from "./PlayMusicAlbumButtonWrapper"
import { shortDescription } from "@/utils/shortDescription"

type AlbumCardProps = {
    album: ALBUM_DTO,
    avatarSize?: avatarSize
}
export function AlbumCard({ album, avatarSize = "large" }: AlbumCardProps) {
    return (
        <div

            key={album.id}
            className="group p-2    rounded-md hover:bg-white/10 flex flex-col "
        >
            <div className="relative  ">
                <Link
                    href={`/album/${album.id}`}
                    prefetch={true}
                >
                    <Avatar
                        isRounded={false}
                        alt={`foto do artista ${album.name}`}
                        src={album.photo}
                        size={avatarSize}
                    />

                </Link>
                <PlayMusicAlbumButtonWrapper asChild albumId={album.id}>

                    <MusicPlayButton className="absolute bottom-2 right-2 z-10 " size={avatarSize} />
                </PlayMusicAlbumButtonWrapper>
            </div>
            <div className="space-y-1  mt-2 text-wrap ">
                <Link
                    href={`/album/${album.id}`}
                >

                    <strong className="font-semibold text-left  ">
                        {
                            avatarSize === "large" && shortDescription({description:album.name,maxChar:12,concat:'..'})

                        }
                        {
                            avatarSize === "extraLarge" && shortDescription({description:album.name,maxChar:18,concat:'..'})
                        }
                        {
                            avatarSize !== "large" && avatarSize !== "extraLarge" && album.name
                        }
                        
                    </strong>
                </Link>
                <Link
                    prefetch={true}
                    href={`/artist/${album.artistsOwner[0]?.id}`}
                >
                    <span className="text-zinc-400 block text-xs text-left text-wrap">
                        {album.artistsOwner[0]?.name}
                    </span>
                </Link>

            </div>

        </div>

    )
}

AlbumCard.displayName = "AlbumCard"