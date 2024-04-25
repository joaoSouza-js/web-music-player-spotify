"use client"

import { Play } from "lucide-react"
import { ComponentProps, forwardRef } from "react"
import {tv, type VariantProps} from "tailwind-variants"

const MusicPlayButtonStyles = tv({
    base: "bg-green-500 flex pl-1 items-center justify-center items-center rounded-full text-black  ",
    variants: {
        hasHidden : {
            true: "invisible group-hover:visible transition-all",
            false: "visible"
        },
        hasLeftDistance: {
            true: "ml-auto",
            false: "ml-0"
        },
        size: {
            extraSmall: `size-4`,
            small: "size-6",
            medium: "size-6",
            large: "size-10",
            extraLarge: "size-12"
        }
    },

    defaultVariants: {
        hasHidden: true,
        hasLeftDistance: true
    }

})

type MusicPlayButtonStylesProps = VariantProps<typeof MusicPlayButtonStyles>


type MusicPlayButtonProps = ComponentProps<"button"> & MusicPlayButtonStylesProps

export const MusicPlayButton = forwardRef<HTMLButtonElement, MusicPlayButtonProps>((props, ref) => {
    const { hasHidden = true,hasLeftDistance = true,className,size="large", ...rest } = props
    const selectIconSize = () => {
        switch (size) {
            case "small":
                return 12
            case "medium":
                return 16
            case "large":
                return 20
            case "extraLarge":
                return 24
        }
    }
    const iconSize = selectIconSize()

    return (
        <button
            className={MusicPlayButtonStyles({className, hasHidden, hasLeftDistance,size })}
            {...rest}
        >
            <Play fill='bg-black' size={iconSize} />
        </button>
    )
})

MusicPlayButton.displayName = "MusicPlayButton"
