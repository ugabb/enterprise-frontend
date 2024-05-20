
import { FormContainer, InputContainer, Select, Input, Description, CepAddress, SpanError, Field, FormularioContainer } from './Form.style'

import { Control, Controller, FieldErrors, UseFormRegister } from 'react-hook-form'
import { FormType } from '../../pages/edit-enterprise/[enterpriseId]'
import { FormControl, MenuItem, Skeleton } from '@material-ui/core'
import { EnterpriseWithAddress } from '../../api/get-enterprise-by-id'
import { Address } from '../../pages/register-enterprise'
import { useRouter } from 'next/dist/client/router'

interface FormProps {
    register: UseFormRegister<FormType>;
    address?: Address | null;
    handleGetCEP: (cep: string) => void;
    enterprise?: EnterpriseWithAddress;
    formError: FieldErrors<FormType>;
    control: Control<FormType>
}

const Form = ({ register, handleGetCEP, enterprise, address, formError, control }: FormProps) => {
    const router = useRouter()
    const isRegisterEnterprise = router.pathname === '/register-enterprise'
    return (
        <FormularioContainer>
            <Description>Informações</Description>
            <InputContainer>
                {(enterprise?.status || isRegisterEnterprise) ? (
                    <Controller
                        name="status"
                        control={control}
                        defaultValue={enterprise?.status as "SOON_RELEASE" | "RELEASE" | "iN_PROGRESS" | "READY" || ""}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <Field>
                                <Select {...field} displayEmpty>
                                    <MenuItem value="" disabled>-- Selecione o status do empreendimento</MenuItem>
                                    <MenuItem value={"SOON_RELEASE"}>Breve lançamento</MenuItem>
                                    <MenuItem value={"RELEASE"}>Lançamento</MenuItem>
                                    <MenuItem value={"iN_PROGRESS"}>Em obras</MenuItem>
                                    <MenuItem value={"READY"}>Pronto para morar</MenuItem>
                                </Select>
                                {formError.status && <SpanError>Selecione o status do empreendimento</SpanError>}
                            </Field>
                        )}
                    />
                ) :
                    (<Skeleton variant="rectangular" width={"100%"} height={44} />)
                }
                {(enterprise?.name || isRegisterEnterprise) ? (
                    <Field>
                        <Input placeholder='Nome do Empreendimento' defaultValue={enterprise?.name} {...register("name", { required: "Nome é obrigatório" })} />
                        {formError?.name?.message && <SpanError>O nome do empreendimento é necessário</SpanError>}
                    </Field>
                ) : (<Skeleton variant="rectangular" width={"100%"} height={44} />)}
                {(enterprise?.purpose || isRegisterEnterprise) ? (
                    <Controller
                        name='purpose'
                        control={control}
                        defaultValue={enterprise?.purpose as "residencial" | "commercial" || ""}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <Field>
                                <Select displayEmpty {...field}>
                                    <MenuItem value="" disabled>-- Selecione o objetivo do empreendimento</MenuItem>
                                    <MenuItem value={"residencial"}>Residencial</MenuItem>
                                    <MenuItem value={"commercial"}>Comercial</MenuItem>
                                </Select>
                                {formError.purpose && <SpanError>Selecione o objetivo do empreendimento</SpanError>}
                            </Field>

                        )}

                    />
                ) :
                    (<Skeleton variant="rectangular" width={"100%"} height={44} />)
                }
                {(enterprise?.address.cep || isRegisterEnterprise) ? (
                    <Field>
                        <Input {...register("address.cep", { required: true })} placeholder='CEP' onChange={(e) => handleGetCEP(e.target.value)} defaultValue={enterprise?.address.cep} />
                        {formError?.address?.cep && <SpanError>Digite o número do CEP</SpanError>}
                    </Field>

                ) : (<Skeleton variant="rectangular" width={"100%"} height={44} />)}
                {address &&
                    <CepAddress>{address.street}<br /> {address.city} <br /> {address.district}<br /> {address.state}</CepAddress>
                }
                {(enterprise?.address.number || isRegisterEnterprise) ? (

                    <Field>
                        <Input placeholder='Número' defaultValue={enterprise?.address.number} {...register("address.number", { required: "Digite o número" })} />
                        {formError?.address?.number && <SpanError>Digite o número</SpanError>}
                    </Field>

                ) : (<Skeleton variant="rectangular" width={"100%"} height={44} />)}
            </InputContainer>

        </FormularioContainer>
    )
}

export default Form