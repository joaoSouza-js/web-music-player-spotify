"use client"

import React from 'react';
import * as RadixSlider from '@radix-ui/react-slider';
import { Volume2, VolumeX } from 'lucide-react';

interface SliderProps extends RadixSlider.SliderProps {
    speakerIsMuted: boolean | undefined,
    handleMuteSpeaker: () => void,
}

export function SpeakerSlider({handleMuteSpeaker, speakerIsMuted=false,...props}:SliderProps) {

    return (
        <div className='flex gap-2 items-center pl-1'>
            <button
                onClick={handleMuteSpeaker}
            >
                {
                    speakerIsMuted ? (
                        <VolumeX
                        size={18}
                        className="text-zinc-200"
                        />
                    )
                    : (

                        <Volume2
                            size={18}
                            className="text-zinc-200"
                        />
                    )
                }

            </button>

            <RadixSlider.Root
                className="relative flex items-center select-none touch-none w-20 h-5 group"
                defaultValue={[50]}
                max={100}
                step={1}
                {...props}
            >
                <RadixSlider.Track className="bg-zinc-600 relative grow rounded-full h-[3px] ">
                    <RadixSlider.Range className="absolute bg-white rounded-full h-full group-hover:bg-green-400" />
                </RadixSlider.Track>
                <RadixSlider.Thumb
                    className="block   bg-zinc-200 shadow-blackA4 rounded-[10px] hover:bg-violet3 focus:outline-none focus:shadow-md focus:h-3 focus:w-3 group-hover:h-3 group-hover:w-3"
                    aria-label="Volume"
                />
            </RadixSlider.Root>

        </div>
    )
}