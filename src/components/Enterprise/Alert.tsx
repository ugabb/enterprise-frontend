import { Button } from '@material-ui/core'
import React, { useEffect } from 'react'
import { Alert } from './styledEnterprise'
import { useMutation } from '@tanstack/react-query'
import { deleteEnterpriseById } from '../../api/delete-enterprise'
import toast from 'react-hot-toast'
import { queryClient } from '../../lib/react-query'

interface DeleteAlertProps {
    setOpenModalDelete: (value: boolean) => void
    enterpriseId: string;
}

const DeleteAlert = ({ setOpenModalDelete, enterpriseId }: DeleteAlertProps) => {

    const { mutateAsync: deleteEnterpriseByIdFn, isPending, isSuccess, } = useMutation({
        mutationKey: ["delete-enterprise", enterpriseId],
        mutationFn: deleteEnterpriseById,
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ['enterprises'] })
        },
    })


    useEffect(() => {
        if (isSuccess) {
            toast.success("Empreendimento excluído com sucesso")
        }
    }, [isSuccess])

    useEffect(() => {
        if (isPending) {
            toast.loading("Atualizando empreendimento...", {
                id: "loading-delete-enterprise"
            })
        } else {
            toast.dismiss("loading-delete-enterprise")
        }
    }, [isPending])

    return (
        <Alert
            color='error'
            maxWidth="md"
            severity="error"
            action={
                <div>
                    <Button onClick={() => setOpenModalDelete(false)} color="inherit" size="small">
                        Cancelar
                    </Button>
                    <Button onClick={() => deleteEnterpriseByIdFn(enterpriseId)} color="inherit" size="small">
                        Confirmar
                    </Button>
                </div>
            }
        >
            Confirma a exclusão do Empreendimento?
        </Alert>
    )
}

export default DeleteAlert