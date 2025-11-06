"use client";
import { useEffect, useRef } from 'react'

interface Iprops {

    action: () => void

}

const useOutclickElement = ({action}:Iprops) => {

    const refElement = useRef<HTMLElement>(null)

    useEffect(() => {

        if(!refElement.current) return

        const mouseDown = (e:MouseEvent ) => {

            if (refElement.current && 
                refElement.current.contains(e.target as Node)) {

                  action()

                }

        }

        document.addEventListener('mousedown', mouseDown, true)


        return () => document
        .removeEventListener('mousedown', mouseDown, true)
    })

    return {refElement}

}

export default useOutclickElement