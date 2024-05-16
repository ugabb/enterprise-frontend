import { Alert, Button } from '@material-ui/core';
import React, { useState } from 'react'

import DeleteAlert from './Alert';
import { ContainerHome, ContentHome, BoxNameEnterprise, ContentStatus, Icon, Action, Modal } from './styledEnterprise';
import { useRouter } from 'next/dist/client/router';

interface EntrepriseProps {
    enterprise: {
        id: number,
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

const Enterprise = ({ enterprise }: EntrepriseProps) => {
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const router = useRouter();
    return (
        <ContainerHome key={enterprise.id}>
            <ContentHome>
                {openModalDelete &&
                    <Modal open={openModalDelete} onClose={setOpenModalDelete} >
                        <DeleteAlert DeleteEnterprise={() => { }} setOpenModalDelete={setOpenModalDelete} />
                    </Modal>
                }
                <section>
                    <BoxNameEnterprise>
                        <span>{enterprise.name}</span>
                    </BoxNameEnterprise>

                    <ContentStatus>
                        <span>{enterprise.status === "RELEASE" ? "Lançamento" : enterprise.status}</span>
                        <span>{enterprise.purpose === "HOME" ? "Residencial" : enterprise.purpose}</span>
                    </ContentStatus>
                </section>

                <section>
                    <p>{enterprise.address.street}, {enterprise.address.number} - {enterprise.address.district}, {enterprise.address.state}</p>
                    <Action>
                        <Icon
                            onClick={() => router.push(`/edit-enterprise/${enterprise.id}`)}
                            src="/images/Vector.svg"
                            alt="Icone de Lapis"
                        />
                        <Icon
                            onClick={() => {
                                setOpenModalDelete(true);
                            }}
                            src="/images/Vector-1.svg"
                            alt="Icone de Lixeira"
                        />
                    </Action>
                </section>

            </ContentHome>
        </ContainerHome>
    )
}

export default Enterprise