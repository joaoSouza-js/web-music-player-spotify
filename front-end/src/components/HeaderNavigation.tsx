'use client'
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from 'next/navigation'

export function HeaderNavigation() {
    const router = useRouter()
    function handleNavigateToPreviousPage(){
        router.back()
    }
    function handleNavigateToForwardPage(){
        router.forward()
    }

    return (
        <nav className="flex items-center gap-3 ">
            <button
                title="pagina anterior" 
                className="p-1 rounded-full bg-black/40" 
                onClick={handleNavigateToPreviousPage}
            >
                <ChevronLeft />
            </button>
            <button 
                title="proxima pagina"
                className="p-1 rounded-full bg-black/40"
                onClick={handleNavigateToForwardPage}
            >
                <ChevronRight />
            </button>
        </nav>
    )
}