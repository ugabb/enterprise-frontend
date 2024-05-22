import React from 'react'
import { Button } from './styled'
import { motion } from 'framer-motion'

interface DefaultButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    title: string
    Icon?: React.ReactNode
    pushRoute?: () => void
}

const DefaultButton = ({ title, Icon, pushRoute }: DefaultButtonProps) => {
    return (
        <Button
            as={motion.button}
            whileHover={{ scale: 1.05 }}
            onClick={pushRoute}
        >{title} {Icon}</Button>
    )
}

export default DefaultButton