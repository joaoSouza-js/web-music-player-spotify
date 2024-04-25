"use client"

import { Play } from "lucide-react"
import { ComponentProps, forwardRef } from "react"

type MusicPlayButtonProps = ComponentProps<"button"> & {
    index?: number,
}

export const ListPlayMusicButton = forwardRef<HTMLButtonElement, MusicPlayButtonProps>((props, ref) => {
    const { index, ...rest} = props
    
    return (
        <button
            ref={ref}
            className="relative w-5 h-full "
            {...rest}
        >
            <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">

                <span className="visible group-hover:invisible   ">{index}</span>
            </div>
            <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
                <Play fill='#eee'  className="invisible size-4  group-hover:visible z-10 absolute" size={20} />

            </div>
        </button>
    )
})

ListPlayMusicButton.displayName = "ListPlayMusicButton"