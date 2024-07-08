import React from 'react'
import { useLoaderData } from 'react-router-dom'

type Props = {}

export default function UserProfile({ }: Props) {

    const data = useLoaderData() as User;

    return (
        
    )
}
