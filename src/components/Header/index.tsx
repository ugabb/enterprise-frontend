import { useRouter } from "next/dist/client/router";
import {
    BoxRetur,
    HeaderContainerAll,
    BoxAdd,
    TitleHeader,
} from "./styleHeader";
import { Icon } from "../Enterprise/styledEnterprise";

interface HeaderProps {
    title: string,
    button: Boolean,
    IconReturn: Boolean,
    PushButton: () => void,
    PushButtonReturn: () => void
}


export default function Header({
    title,
    button,
    IconReturn,
    PushButton,
    PushButtonReturn
}: HeaderProps) {
    const router = useRouter()
    const currentRoute = router.pathname
    return (
        <HeaderContainerAll return={true}>
            {IconReturn &&
                <BoxRetur>
                    <img onClick={PushButtonReturn} src="/images/Return.svg" alt="Icone Retornar" />
                    <TitleHeader>{title}</TitleHeader>
                </BoxRetur>
            }
            {currentRoute === "/" &&
                <BoxAdd return={false}>
                    <TitleHeader>{title}</TitleHeader>
                    {button && <button onClick={PushButton}>Adicionar +</button>}
                </BoxAdd>}
        </HeaderContainerAll>
    )
}