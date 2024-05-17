
import axios from 'axios'
import DefaultButton from '../DefaultButton'
import { FormContainer, InputContainer, Select, Input, Description, CepAddress } from './Form.style'

import { UseFormGetValues, UseFormRegister } from 'react-hook-form'
import { AddressResponse, FormType } from '../../pages/edit-enterprise/[enterpriseId]'
import { FormControl, MenuItem, Skeleton } from '@material-ui/core'
import { EnterpriseWithAddress } from '../../api/get-enterprise-by-id'
import { Address } from '../../pages/register-enterprise'
import { useRouter } from 'next/dist/client/router'

interface FormProps {
    register: UseFormRegister<FormType>;
    address?: Address | null;
    handleGetCEP: (cep: string) => void;
    enterprise?: EnterpriseWithAddress;
}

const Form = ({ register, handleGetCEP, enterprise, address }: FormProps) => {
    const router = useRouter()
    const isRegisterEnterprise = router.pathname === '/register-enterprise'
    return (
        <FormContainer>
            <Description>Informações</Description>
            <InputContainer>
                <FormControl>
                    {(enterprise?.status || isRegisterEnterprise) ? (
                        <Select {...register("status")} value={enterprise?.status}>
                            <MenuItem value={"SOON_RELEASE"}>Breve lançamento</MenuItem>
                            <MenuItem value={"RELEASE"}>Lançamento</MenuItem>
                            <MenuItem value={"iN_PROGRESS"}>Em obras</MenuItem>
                            <MenuItem value={"READY"}>Pronto para morar</MenuItem>
                        </Select>
                    ) :
                        (<Skeleton variant="rectangular" width={558} height={44} />)
                    }
                </FormControl>
                {(enterprise?.name || isRegisterEnterprise) ? (<Input placeholder='Nome do Empreendimento' {...register("name")} />) : (<Skeleton variant="rectangular" width={558} height={44} />)}
                {(enterprise?.purpose || isRegisterEnterprise) ? (
                    <Select {...register("purpose")} value={enterprise?.purpose}>
                        <MenuItem value={"residencial"}>Residencial</MenuItem>
                        <MenuItem value={"commercial"}>Comercial</MenuItem>
                    </Select>
                ) :
                    (<Skeleton variant="rectangular" width={558} height={44} />)
                }
                {(enterprise?.address.cep || isRegisterEnterprise) ? (<Input {...register("address.cep")} placeholder='CEP' onChange={(e) => handleGetCEP(e.target.value)} />) : (<Skeleton variant="rectangular" width={558} height={44} />)}
                {address &&
                    <CepAddress>{address.street}<br /> {address.city} <br /> {address.district}<br /> {address.state}</CepAddress>
                }
                {(enterprise?.address.number || isRegisterEnterprise) ? (<Input placeholder='Número' {...register("address.number")} />) : (<Skeleton variant="rectangular" width={558} height={44} />)}
            </InputContainer>

        </FormContainer>
    )
}

export default Form