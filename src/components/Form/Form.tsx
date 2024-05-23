
import { InputContainer, Select, Input, Description, CepAddress, SpanError, Field, ArrowIcon, FormContainer, ButtonContainer } from './Form.style'

import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { MenuItem, Skeleton } from '@material-ui/core'
import { EnterpriseWithAddress } from '../../api/get-enterprise-by-id'
import { useRouter } from 'next/dist/client/router'
import { formSchema, FormType } from '../../types/formType'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Address, EnterpriseCreateInputWithAddress } from '../../types/enterpriseTypes'
import DefaultButton from '../DefaultButton'
import { isValidCEP } from '@brazilian-utils/brazilian-utils'
import axios from 'axios'
import toast from 'react-hot-toast'

interface FormProps {
    address?: Address | null;
    enterprise?: EnterpriseWithAddress;
    action: (data: EnterpriseCreateInputWithAddress) => Promise<void>
}

export interface AddressResponse {
    cep: string;
    logradouro: string;
    complemento: string;
    bairro: string;
    localidade: string;
    uf: string;
    ibge: string;
    gia: string;
    ddd: string;
    siafi: string;
}

const Form = ({ enterprise, action }: FormProps) => {
    const [address, setAddress] = useState<Address | null>(null);
    const [statusOpen, setStatusOpen] = useState(false);
    const [purposeOpen, setPurposeOpen] = useState(false);

    const router = useRouter()
    const isRegisterEnterprise = router.pathname === '/register-enterprise'

    const { register, handleSubmit, control, setValue, formState: { errors: formError, isSubmitting, defaultValues } } = useForm<FormType>({
        resolver: zodResolver(formSchema),
        values: {
            name: enterprise?.name || '',
            purpose: enterprise?.purpose as "residencial" | "commercial",
            status: enterprise?.status as "SOON_RELEASE" | "RELEASE" | "iN_PROGRESS" | "READY",
            ri_number: enterprise?.ri_number || '',
            address: {
                cep: enterprise?.address?.cep || '',
                city: enterprise?.address?.city || '',
                district: enterprise?.address?.district || '',
                state: enterprise?.address?.state || '',
                street: enterprise?.address?.street || '',
                number: enterprise?.address?.number || '',
            }
        }
    });

    const Submit: SubmitHandler<FormType> = async ({
        address,
        name,
        purpose,
        status,
    }: FormType) => {
        console.log("Form Submitted:", { name, purpose, status, address });


        try {
            await action({
                address: {
                    cep: address.cep,
                    city: address.city,
                    district: address.district,
                    state: address.state,
                    street: address.street,
                    number: address.number
                },
                name: name,
                purpose: purpose,
                status: status,
                id: enterprise?.id,
            })

        } catch (error) {
            console.log(error)
        }
    }

    const handleGetCEP = async (cep: string) => {
        if (cep.length < 9) return;
        console.log(cep);

        if (cep) {
            const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
            console.log(response);

            if (response.data.erro) {
                toast.error("CEP inválido ou não existe!")
            }

            const addressResponse: AddressResponse = response.data
            setValue('address', {
                cep: addressResponse.cep,
                city: addressResponse.localidade,
                district: addressResponse.bairro,
                state: addressResponse.uf,
                street: addressResponse.logradouro,
                number: ""
            });
            setAddress({
                cep: addressResponse.cep,
                city: addressResponse.localidade,
                district: addressResponse.bairro,
                state: addressResponse.uf,
                street: addressResponse.logradouro,
            })
        } else {
            toast.error("CEP inválido")
        }
    }

    const formatCEP = (cep: string) => {
        if (!cep) return ""

        // Remove todos os caracteres que não são dígitos
        cep = cep.replace(/\D/g, '')

        // Insere um hífen após os primeiros cinco dígitos
        cep = cep.replace(/(\d{5})(\d)/, '$1-$2')
        return cep
    };
    const formatNumero = (numero: string) => {
        if (!numero) return ""

        // Remove todos os caracteres que não são dígitos
        numero = numero.replace(/\D/g, '')

        return numero
    };

    return (
        <FormContainer onSubmit={handleSubmit(Submit)}>
            <InputContainer>
                <Description>Informações</Description>
                {(enterprise?.status || isRegisterEnterprise) ? (
                    <Controller
                        name="status"
                        control={control}
                        defaultValue={enterprise?.status || "RELEASE"}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <Field>
                                <Select id='select-status' onOpen={() => {
                                    setStatusOpen(true)
                                }}
                                    onClose={() => {
                                        setStatusOpen(false)
                                    }}
                                    IconComponent={() => {
                                        if (statusOpen) {
                                            return (
                                                <ArrowIcon direction="up" src={"/images/dropdown-arrow.svg"} />
                                            )
                                        } else {
                                            return (
                                                <ArrowIcon direction='down' src={"/images/dropdown-arrow.svg"} />
                                            )

                                        }
                                    }} {...field}>
                                    <MenuItem value="RELEASE">Lançamento</MenuItem>
                                    <MenuItem value={"SOON_RELEASE"}>Breve lançamento</MenuItem>
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
                        defaultValue={enterprise?.purpose || "residencial"}
                        rules={{ required: true }}
                        render={({ field }) => (
                            <Field>
                                <Select
                                    id='select-purpose'
                                    onOpen={() => {
                                        setPurposeOpen(true)
                                    }}
                                    onClose={() => {
                                        setPurposeOpen(false)
                                    }}
                                    IconComponent={() => {
                                        if (purposeOpen) {
                                            return (
                                                <ArrowIcon direction="up" src={"/images/dropdown-arrow.svg"} />
                                            )
                                        } else {
                                            return (
                                                <ArrowIcon direction='down' src={"/images/dropdown-arrow.svg"} />
                                            )

                                        }
                                    }} {...field}>
                                    <MenuItem value="residencial">Residencial</MenuItem>
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
                        <Input
                            inputProps={{
                                maxLength: 9,
                                typeof: "number"
                            }}
                            {...register("address.cep", {
                                required: true,
                            })}
                            placeholder='CEP'
                            onChange={(e) => {
                                let input = e.target
                                input.value = formatCEP(input.value)
                                if (isValidCEP(e.target.value)) {
                                    handleGetCEP(e.target.value)
                                }

                            }}
                            defaultValue={enterprise?.address.cep}
                        />
                        {formError?.address?.cep && <SpanError>Digite o número do CEP</SpanError>}
                    </Field>

                ) : (<Skeleton variant="rectangular" width={"100%"} height={44} />)}

                {address && (

                    <CepAddress>{address.street}<br /> {address.city} <br /> {address.district}<br /> {address.state}</CepAddress>
                )
                }

                {(enterprise?.address.number || isRegisterEnterprise) ? (

                    <Field>
                        <Input placeholder='Número' defaultValue={enterprise?.address.number} {...register("address.number", { required: "Digite o número" })} onChange={(e) => {
                            let input = e.target
                            input.value = formatNumero(input.value)
                        }} />
                        {formError?.address?.number && <SpanError>Digite o número</SpanError>}
                    </Field>

                ) : (<Skeleton variant="rectangular" width={"100%"} height={44} />)}
            </InputContainer>
            <ButtonContainer>
                <DefaultButton type='submit' title={isRegisterEnterprise ? " Cadastrar" : "Editar"} disabled={isSubmitting} />
            </ButtonContainer>
        </FormContainer>
    )
}

export default Form