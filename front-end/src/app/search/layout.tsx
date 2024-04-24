'use client'

import { HeaderNavigation } from "@/components/HeaderNavigation"
import { Input } from "@/components/Input"
import { Search } from "lucide-react"
import { useRouter } from 'next/navigation'
import { ChangeEvent, ReactElement, useEffect, useState } from "react"

type SearchLayoutProps = {
    children: ReactElement
}

export default function SearchLayout({ children }: SearchLayoutProps) {
    const [search, setSearch] = useState<string | null>(null)
    const navigation = useRouter()

    useEffect(() => {
        if(search === null) return
        if (search?.length === 0) {
            navigation.push("/search")
            return
        }

        navigation.push(`/search/${search}`)
    }, [search,navigation])

    function handleInputTextChange(event: ChangeEvent<HTMLInputElement>) {
        const content = event.target.value
        setSearch(content)

    }

    return (
        <div className={`min-h-full bg-zinc-950 p-4 rounded-xl m-2 `} >
            <header className="flex gap-4">
                <HeaderNavigation variant="secondary" />
                <form>
                    <Input.Input
                        className="min-w-80"
                        value={search || ""}
                        onChange={handleInputTextChange}
                        placeholder="o que você quer tocar?"
                        LeftIcon={<Search className="size-4 text-zinc-300" />}
                    />

                </form>
            </header>

            {children}
        </div>
    )
}