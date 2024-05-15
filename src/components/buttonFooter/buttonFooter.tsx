import { ContainerButton } from "./style";

interface ButtonFooterProps {
    description: string,
    pushClick: () => void,
}

export default function ButtonFooter({description, pushClick}: ButtonFooterProps) {
    return (
        <ContainerButton>
            <button onClick={pushClick}>{description}</button>
        </ContainerButton>
    )
}
