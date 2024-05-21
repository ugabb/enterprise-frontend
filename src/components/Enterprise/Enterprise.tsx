import { useState } from 'react';

import { motion } from "framer-motion"

import DeleteAlert from './Alert';
import { ContainerHome, BoxNameEnterprise, ContentStatus, Icon, Action, Modal, EnterpriseName, SectionContainer, EnterpriseItem } from './styledEnterprise';
import { useRouter } from 'next/dist/client/router';

export interface EntrepriseProps {
    enterprise: {
        id: string,
        name: string,
        address: {
            street: string,
            number: number,
            district: string,
            state: string
        },
        status: string,
        purpose: string

    }
}

export type StatusType =
    | 'SOON_RELEASE'
    | 'RELEASE'
    | 'iN_PROGRESS'
    | 'READY'

const StatusMap: Record<StatusType, string> = {
    SOON_RELEASE: 'Breve lançamento',
    RELEASE: 'Lançamento',
    iN_PROGRESS: 'Em obras',
    READY: 'Pronto para morar'
}

export type PurposeType = 'residencial' | 'commercial'
const purposeMap: Record<PurposeType, string> = {
    residencial: 'Residencial',
    commercial: 'Comercial'
}

const Enterprise = ({ enterprise }: EntrepriseProps) => {
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const router = useRouter();
    const status = enterprise.status as "SOON_RELEASE" | "RELEASE" | "iN_PROGRESS" | "READY";
    const purpose = enterprise.purpose as "residencial" | "commercial";

    const enterpriseId = enterprise.id;

    return (
        <ContainerHome key={enterprise.id}>
            <EnterpriseItem>
                {openModalDelete &&
                    <Modal open={openModalDelete} onClose={setOpenModalDelete} >
                        <DeleteAlert enterpriseId={enterpriseId} setOpenModalDelete={setOpenModalDelete} />
                    </Modal>
                }
                <section>
                    <BoxNameEnterprise>
                        <EnterpriseName>{enterprise.name}</EnterpriseName>
                        <p>{enterprise.address.street}, {enterprise.address.number} - {enterprise.address.district}, {enterprise.address.state}</p>
                    </BoxNameEnterprise>
                </section>

                <section>
                    <SectionContainer>
                        <ContentStatus>
                            <span>{StatusMap[status]}</span>
                            <span>{purposeMap[purpose]}</span>
                        </ContentStatus>
                        <Action>
                            <Icon
                                as={motion.img}
                                whileHover={{ scale: 1.1 }}
                                onClick={() => router.push(`/edit-enterprise/${enterprise.id}`)}
                                src="/images/Vector.svg"
                                alt="Icone de Lapis"
                            />
                            <Icon
                                as={motion.img}
                                whileHover={{ scale: 1.1 }}
                                onClick={() => {
                                    setOpenModalDelete(true);
                                }}
                                src="/images/Vector-1.svg"
                                alt="Icone de Lixeira"
                            />
                        </Action>
                    </SectionContainer>
                </section>

            </EnterpriseItem>
        </ContainerHome>
    )
}

export default Enterprise