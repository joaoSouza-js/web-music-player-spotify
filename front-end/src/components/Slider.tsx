"use client"

import React from 'react';
import * as RadixSlider from '@radix-ui/react-slider';

interface SliderProps extends RadixSlider.SliderProps {}

export function Slider({...props}:SliderProps) {
    return (
        <RadixSlider.Root
            className="relative flex items-center select-none touch-none w-[31.25rem] h-5 group"
            {...props}
        >
            <RadixSlider.Track className="bg-zinc-600 relative grow rounded-full h-[3px] ">
                <RadixSlider.Range className="absolute bg-white rounded-full h-full group-hover:bg-green-400" />
            </RadixSlider.Track>
            <RadixSlider.Thumb
                className="block w-3 h-3 bg-zinc-200 shadow-blackA4 rounded-[10px] hover:bg-violet3 focus:outline-none focus:shadow-md focus:h-4 focus:w-4"
                aria-label="Volume"
            />
        </RadixSlider.Root>
    )
}