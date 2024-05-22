import { useRouter } from "next/dist/client/router";
import {
    BoxRetur,
    HeaderContainerAll,
    BoxAdd,
    TitleHeader,
} from "./styleHeader";
import Image from "next/image";
import DefaultButton from "../DefaultButton";
interface HeaderProps {
    title: string,
    button: Boolean,
    IconReturn: Boolean,
    PushButton?: () => void,
    PushButtonReturn?: () => void
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
                    <Image width={9} height={16} onClick={PushButtonReturn} src="/images/Return.svg" alt="Icone Retornar" />
                    <TitleHeader>{title}</TitleHeader>
                </BoxRetur>
            }
            {currentRoute === "/" &&
                <BoxAdd return={false}>
                    <TitleHeader>{title}</TitleHeader>
                    {button && <DefaultButton pushRoute={PushButton} Icon={<Image width={12} height={12} src="/images/plus-icon.svg" />} title="Adicionar">

                    </DefaultButton>}

                </BoxAdd>}
        </HeaderContainerAll>
    )
}