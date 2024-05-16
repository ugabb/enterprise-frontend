import React from 'react'
import { Button } from './styled'

interface DefaultButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    title: string
}

const DefaultButton = ({ title }: DefaultButtonProps) => {
    return (
        <Button>{title}</Button>
    )
}

export default DefaultButton