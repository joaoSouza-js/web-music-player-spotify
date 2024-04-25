import Link from "next/link";
import { Play } from "lucide-react"
import Image from "next/image";
import { handleGreetingMessage } from "@/utils/greetingMessage";
import { shortDescription } from "@/utils/shortDescription";
import { HeaderNavigation } from "@/components/HeaderNavigation";
import { playsRecommendForUser } from "@/utils/playsRecommendForUser";
import { fetchAlbums } from "@/controller/albums/getAlbums";
import { MusicPlayButton } from "@/components/MusicPlayButton";
import { PlayMusicAlbumButtonWrapper } from "@/components/PlayMusicAlbumButtonWrapper";

export default async function Home() {
  const albums = await fetchAlbums({
    page: 1,
    limit: 6
  })

  const greetingMessage = handleGreetingMessage()
  return (
    <div>

      <main className=" p-6 ">
        <HeaderNavigation />
        <section>


          <h1 className="font-semibold mt-7 text-3xl">
            {greetingMessage}
          </h1>
          <div className="grid grid-cols-3 gap-6 mt-4">
            {
              albums.map(album => (
                <div key={album.id} className="flex items-center justify-center bg-white/5 rounded group overflow-hidden hover:bg-white/15 transition-colors pr-3">
                  <Link
                    href={`/album/${album.id}`}
                    key={album.id}
                    prefetch={true}

                    className="h-full rounded group relative  flex overflow-hidden gap-3  items-center "
                  >
                    <Image
                      alt="capa do album hero and vilans do artista metro bomming"
                      src={album.photo}

                      className="h-full object-cover"
                      width={80}
                      height={80}
                    />

                    <strong className="font-semibold ">{album.name}</strong>



                  </Link>
                  <PlayMusicAlbumButtonWrapper
                    asChild
                    albumId={album.id}
                  >

                    <MusicPlayButton />
                  </PlayMusicAlbumButtonWrapper>

                </div>
              ))
            }
          </div>
        </section>
        <section>
          <h1 className="font-semibold mt-7 text-2xl">
            Feito para João Souza
          </h1>
          <div className="flex  flex-wrap mt-4 gap-4">
            {
              playsRecommendForUser.map(recommendedPlaylist => (
                <Link
                  href={"*"}
                  key={recommendedPlaylist.id}

                  className="bg-white/5 rounded group  w-48  p-3 flex flex-col overflow-hidden gap-3  items-center hover:bg-white/15 transition-colors pr-3"
                >
                  <div className="relative h-[160px]">
                    <Image
                      alt={`capa do album ${recommendedPlaylist.title}`}
                      src={recommendedPlaylist.cover}
                      width={200}

                      height={140}
                      className="h-full  "
                    />
                    <button
                      className="bg-green-500 absolute right-3 bottom-3 h-12 w-12 items-center justify-center pl-1  flex rounded-full text-black ml-auto invisible group-hover:visible transition-all"
                    >
                      <Play fill='bg-black' size={20} />
                    </button>
                  </div>

                  <div className="space-y-1">
                    <strong className="font-semibold  ">{recommendedPlaylist.title}</strong>
                    <span className="text-zinc-400 inline-block text-xs">
                      {
                        shortDescription({ description: recommendedPlaylist.description })
                      }
                    </span>

                  </div>
                </Link>
              ))
            }
          </div>
        </section>
      </main>
    </div>





  )
}
