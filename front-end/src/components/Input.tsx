import { Eye, EyeOff } from "lucide-react";
import { ComponentProps, ReactElement, forwardRef } from "react";
import { tv, type VariantProps } from 'tailwind-variants';


const inputRootStyles = tv({
    base: "flex flex-col gap-2  ",
})

type inputRootProps = ComponentProps<"div"> & InputStylesProps & {
}

function InputRoot({ className, ...rest }: inputRootProps) {
    return (
        <div
            className={inputRootStyles({ className })}
            {...rest}
        />

    )
}

const InputErrorStyles = tv({
    base: "text-xs text-red-500 inline-block"
})

type InputErrorProps = ComponentProps<"span"> & InputStylesProps

function InputError({ className, children, ...rest }: InputErrorProps) {
    return (
        <span
            className={InputErrorStyles({ className })}
            {...rest}
        >
            {children}
        </span>
    )
}

const inputStyles = tv({
    base: "flex items-center px-3 h-11 border border-zinc-800 bg-zinc-800   rounded-full    focus-within:border-zinc-200  ",
})
type InputStylesProps = VariantProps<typeof inputStyles>;

type InputProps = ComponentProps<"input"> & InputStylesProps & {
    LeftIcon?: ReactElement
    RightIcon?: ReactElement
}
const InputInput = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    const { LeftIcon, RightIcon, className, ...rest } = props
    return (
        <div className={inputStyles({
            className,

        })}  >
            <div>
                {LeftIcon}

            </div>
            <input
                ref={ref}
                className="flex-1 px-2  bg-transparent h-full  border-0 outline-none p-0 border-white/10 text-sm placeholder:text-zinc-400 focus:outline-none focus:shadow-none focus-within:ring-0 "
                {...rest}
            />
            <div>


                {RightIcon}
            </div>
        </div>
    )
})

type InputPasswordProps = ComponentProps<"input"> & InputStylesProps & {
    isVisible: boolean,
    changePasswordVisibility: () => void
}

const InputPassword = forwardRef<HTMLInputElement, InputPasswordProps>((props, ref) => {
    const { isVisible, className, changePasswordVisibility, ref:inputRef, ...rest } = props
    return (
        <InputInput
            
            ref={ref}
            type={isVisible? "text": "password"}
            className="bg-transparent"
            placeholder="sua senha"
            RightIcon={
                isVisible
                    ? (
                        <Eye className="size-4"
                            onClick={changePasswordVisibility} />
                    )
                    : (
                        <EyeOff
                            className="size-4"
                            onClick={changePasswordVisibility}
                        />
                    )

            }
            {...rest}
            
        />

    )

})

InputPassword.displayName = "InputPassword"
InputInput.displayName = "InputInput"
InputRoot.displayName = "InputRoot"
InputError.displayName = "InputError"


export const Input = {
    Root: InputRoot,
    Input: InputInput,
    Password: InputPassword,
    Error: InputError
}