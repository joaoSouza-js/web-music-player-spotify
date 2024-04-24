import { tv,VariantProps } from "tailwind-variants";
import { ComponentProps, forwardRef } from "react"

const AvatarStyles =  tv({
    base: `rounded-full size-32 object-cover`,
    variants: {
        size: {
            extraSmall: `size-8`,
            small: `size-16`,
            medium: `size-24`,
            large: `size-32`,
            extraLarge: `size-40`,

        },
        isRounded: {
            true: "rounded-full",
            false: "rounded-md",
        }
    },
    defaultVariants: {
        size: "medium",
    }
})

type AvatarProps =  VariantProps<typeof AvatarStyles> & ComponentProps<"img">

export const Avatar = forwardRef<HTMLImageElement, AvatarProps>((props, ref) => {
    const {size="medium",isRounded=true} = props
    return (
        <img
            ref={ref}
            className={AvatarStyles({
                size: size,
                isRounded: isRounded, 
            })}

            {...props}
        />

    )
})

Avatar.displayName = "Avatar"