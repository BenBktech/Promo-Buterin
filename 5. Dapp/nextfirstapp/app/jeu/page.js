"use client"
import { useState, useEffect } from "react"
import Link from "next/link"

const jeu = () => {

    const [number, setNumber] = useState(0)

    // useEffect(() => {
    //     console.log('number a changé')
    // }, [number])

    // useEffect(() => {
    //     console.log('la page est chargée')
    // }, [])

    useEffect(() => {
        return () => {
            alert('le composant est démonté')
        }
    }, [])

    const increment = () => {
        setNumber(number + 1)
    }

    const decrement = () => {
        setNumber(number - 1)
    }

    return (
        <>
            <button onClick={() => increment()}>Increment</button>
            <button onClick={() => decrement()}>Decrement</button>
            <div>{number}</div>
            <Link href="/">Accueil</Link>
        </>
    )
}

export default jeu