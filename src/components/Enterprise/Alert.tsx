import { Button } from '@material-ui/core'
import React from 'react'
import { Alert } from './styledEnterprise'

interface DeleteAlertProps {
    setOpenModalDelete: (value: boolean) => void
    DeleteEnterprise: () => void

}

const DeleteAlert = ({ DeleteEnterprise, setOpenModalDelete }: DeleteAlertProps) => {
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
                    <Button onClick={() => DeleteEnterprise()} color="inherit" size="small">
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