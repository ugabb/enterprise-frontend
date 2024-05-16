
import axios from 'axios'
import DefaultButton from '../DefaultButton'
import { FormContainer, InputContainer, Select, Input, Description } from './Form.style'

import { UseFormRegister } from 'react-hook-form'
import { AddressResponse, FormType } from '../../pages/edit-enterprise/[enterpriseId]'
import { FormControl, MenuItem } from '@material-ui/core'

interface FormProps {
    register: UseFormRegister<FormType>;
    handleGetCEP: (cep: string) => void
}

const Form = ({ register, handleGetCEP }: FormProps) => {

    return (
        <FormContainer>
            <Description>Informações</Description>
            <InputContainer>
                <FormControl>
                    <Select {...register("status")}>
                        <MenuItem value={"SOON_RELEASE"}>Breve lançamento</MenuItem>
                        <MenuItem value={"RELEASE"}>Lançamento</MenuItem>
                        <MenuItem value={"iN_PROGRESS"}>Em obras</MenuItem>
                        <MenuItem value={"READY"}>Pronto para morar</MenuItem>
                    </Select>
                </FormControl>
                <Input placeholder='Nome do Empreendimento' />
                <Select {...register("purpose")}>
                    <MenuItem value={"residencial"}>Residencial</MenuItem>
                    <MenuItem value={"commercial"}>Comercial</MenuItem>
                </Select>
                <Input {...register("addrees.cep")} placeholder='CEP' onChange={(e) => handleGetCEP(e.target.value)} />
                <p>Rua Doutor Messuti,
                    Vila Bastos
                    Santo André
                    SP</p>
                <Input placeholder='Número' {...register("addrees.number")} />
            </InputContainer>

        </FormContainer>
    )
}

export default Form