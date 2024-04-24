import Link from "next/link"
import { ReactElement } from "react"

type SearchLayoutProps = {
    children: ReactElement,
    params: {
        search: string
    }
}



export default function SearchLayout({ children, params }: SearchLayoutProps) {
    const { search } = params
    return (
        <div>
            <nav className="flex gap-3 mt-4">
                <Link
                    href={`/search/${search}`}
                    className="bg-zinc-800 px-3 py-1 rounded-3xl "
                >
                    todos
                </Link>
                <Link
                    href={`/search/${search}/artists`}
                    className="bg-zinc-800 px-3 py-1 rounded-3xl"

                >
                    artistas
                </Link>
                <Link
                    className="bg-zinc-800 px-3 py-1 rounded-3xl "

                    href={`/search/${search}/albums`}
                >
                    albuns
                </Link>
            </nav>
            <div>
                {children}

            </div>
        </div>
    )
}