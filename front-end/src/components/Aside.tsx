import { HomeIcon, Library, Search } from "lucide-react";
import Link from "next/link";

const userPlaylist = [
    { id: "1", title: "Energetic Vibes" },
    { id: "2", title: "Soothing Melodies" },
    { id: "3", title: "Chill Harmony" },
    { id: "4", title: "Fun Beats" },
    { id: "5", title: "Lively Vibes" },
    { id: "6", title: "Soothing Melodies" },
    { id: "7", title: "Chill Harmony" },
    { id: "8", title: "Energetic Beats" },
  
  ];

export function Aside(){
    return (
        <aside className="w-72 bg-zinc-950 p-6 overflow-auto h-[85vh]">
        <nav className="space-y-5">
          <Link
            className="flex gap-3 items-center text-sm font-semibold text-zinc-200"
            href={"/"}
          >
            <HomeIcon />Inicio
          </Link>
          <Link
            className="flex gap-2 items-center text-sm font-semibold text-zinc-200"
            href={"/search"}
          >
            <Search />
            Pesquisa
          </Link>
          <Link
            className="flex gap-2 items-center text-sm font-semibold text-zinc-200"
            href={"*"}
          >
            <Library />
            Biblioteca
          </Link>

        </nav>
        <nav className="mt-6 pt-6 border-t-zinc-800 border-t flex flex-col gap-3">
          {
            userPlaylist.map(playList => (
              <Link
                key={playList.id}
                className="text-sm text-zinc-400 hover:text-blue-50"
                href={"*"}
              >
                {
                  playList.title
                }
              </Link>

            ))
          }


        </nav>
      </aside>
    )
}