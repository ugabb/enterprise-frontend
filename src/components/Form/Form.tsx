
import { FormContainer, InputContainer, Select, Input, Description, CepAddress, SpanError, Field } from './Form.style'

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
        <FormContainer>
            <Description>Informações</Description>
            <InputContainer>
                {(enterprise?.status || isRegisterEnterprise) ? (
                    <Controller
                        name="status"
                        control={control}
                        defaultValue={enterprise?.status as "SOON_RELEASE" | "RELEASE" | "iN_PROGRESS" | "READY"|| ""}
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
                    <>
                        <Controller
                            name='name'
                            control={control}
                            rules={{
                                required: true
                            }}
                            defaultValue={enterprise?.name ?? undefined}
                            render={({ field, fieldState: { error } }) => (
                                <Field>
                                    <Input placeholder='Nome do Empreendimento' {...field} />
                                    {error?.message && <SpanError>O nome do empreendimento é necessário</SpanError>}
                                </Field>
                            )}

                        />
                    </>
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
                    <Controller
                        name='address.cep'
                        control={control}
                        rules={{ required: true }}
                        defaultValue={enterprise?.address.cep ?? undefined}
                        render={({ field: { onChange } }) => (
                            <Field>
                                <Input {...register("address.cep")} placeholder='CEP' onChange={(e) => handleGetCEP(e.target.value)} />
                                {formError?.address?.cep && <SpanError>Digite o número do CEP</SpanError>}
                            </Field>
                        )}
                    />

                ) : (<Skeleton variant="rectangular" width={"100%"} height={44} />)}
                {address &&
                    <CepAddress>{address.street}<br /> {address.city} <br /> {address.district}<br /> {address.state}</CepAddress>
                }
                {(enterprise?.address.number || isRegisterEnterprise) ? (

                    <Controller
                        name='address.number'
                        control={control}
                        rules={{ required: true }}
                        defaultValue={enterprise?.address.number ?? undefined}
                        render={({ field }) => (
                            <Field>
                                <Input placeholder='Número' {...field} />
                                {formError?.address?.number && <SpanError>Digite o número</SpanError>}
                            </Field>
                        )}

                    />


                ) : (<Skeleton variant="rectangular" width={"100%"} height={44} />)}
            </InputContainer>

        </FormContainer>
    )
}

export default Form