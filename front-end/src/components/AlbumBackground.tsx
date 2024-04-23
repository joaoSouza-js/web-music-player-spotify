'use client'

import { ReactNode, useEffect, useState } from "react"

type AlbumBackgroundProps = {
    children: ReactNode
}

export function AlbumBackground({children}:AlbumBackgroundProps) {
    const [backgroundColor, setBackgroundColor] = useState("orange")

    function generateColorName() {
        const colorsName = ['red', "orange", "lime","blue"]
        const randomPosition = Math.floor(Math.random() * colorsName.length)
        return colorsName[randomPosition]
    }

    useEffect(() => {

    })
    
    return (
        <div className={`bg-gradient-to-b h-full from-red-600 pt-6   rounded-xl m-2 flex flex-col`}>
            {children}
        </div>
        
    )
}