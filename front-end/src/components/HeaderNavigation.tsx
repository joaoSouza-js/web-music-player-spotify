'use client'
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from 'next/navigation'


import { tv, type VariantProps } from 'tailwind-variants';

const ButtonStyles = tv({
    base: " size-8 flex  rounded-full justify-center items-center  disabled:opacity-50 disabled:cursor-not-allowed ",
    variants: {
        variant: {
            primary: "bg-black/40",
            secondary: "bg-zinc-800",
        },

    },
    defaultVariants: {
        variant: "primary",
    }
})

type ButtonVariants = VariantProps<typeof ButtonStyles>;

export function HeaderNavigation({variant="primary"}:ButtonVariants) {
    const router = useRouter()
    function handleNavigateToPreviousPage(){
        router.back()
    }
    function handleNavigateToForwardPage(){
        router.forward()
    }

    return (
        <nav className="flex items-center gap-3 size ">
            <button
                title="pagina anterior" 
                className={ButtonStyles({variant})} 
                onClick={handleNavigateToPreviousPage}
            >
                <ChevronLeft />
            </button>
            <button 
                title="proxima página"
                className={ButtonStyles({variant})} 
                onClick={handleNavigateToForwardPage}
            >
                <ChevronRight />
            </button>
        </nav>
    )
}