
import axios from 'axios'
import DefaultButton from '../DefaultButton'
import { FormContainer, InputContainer, Select, Input, Description, CepAddress } from './Form.style'

import { UseFormGetValues, UseFormRegister } from 'react-hook-form'
import { AddressResponse, FormType } from '../../pages/edit-enterprise/[enterpriseId]'
import { FormControl, MenuItem } from '@material-ui/core'
import { EnterpriseWithAddress } from '../../api/get-enterprise-by-id'
import { Address } from '../../pages/register-enterprise'

interface FormProps {
    register: UseFormRegister<FormType>;
    address?: Address | null;
    handleGetCEP: (cep: string) => void;
    enterprise?: EnterpriseWithAddress;
}

const Form = ({ register, handleGetCEP, enterprise, address }: FormProps) => {

    return (
        <FormContainer>
            <Description>Informações</Description>
            <InputContainer>
                <FormControl>
                    <Select {...register("status")} value={enterprise?.status}>
                        <MenuItem value={"SOON_RELEASE"}>Breve lançamento</MenuItem>
                        <MenuItem value={"RELEASE"}>Lançamento</MenuItem>
                        <MenuItem value={"iN_PROGRESS"}>Em obras</MenuItem>
                        <MenuItem value={"READY"}>Pronto para morar</MenuItem>
                    </Select>
                </FormControl>
                <Input placeholder='Nome do Empreendimento' {...register("name")} />
                <Select {...register("purpose")} value={enterprise?.purpose}>
                    <MenuItem value={"residencial"}>Residencial</MenuItem>
                    <MenuItem value={"commercial"}>Comercial</MenuItem>
                </Select>
                <Input {...register("address.cep")} placeholder='CEP' onChange={(e) => handleGetCEP(e.target.value)} />
                {address && (
                    <CepAddress>{address.street}<br /> {address.city} <br /> {address.district}<br /> {address.state}</CepAddress>
                )}

                <Input placeholder='Número' {...register("address.number")} />
            </InputContainer>

        </FormContainer>
    )
}

export default Form