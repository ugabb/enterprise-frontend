import React, { useEffect, useState } from 'react'
import Header from '../../components/Header'
import { useRouter } from 'next/dist/client/router'
import Form from '../../components/Form/Form'
import { FormContainer } from '../styles'
import DefaultButton from '../../components/DefaultButton'

import axios, { AxiosResponse } from 'axios'

// zod para tipagem do formulário
import { infer, z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

// react-hook-form para tratar do formulário
import { useForm, SubmitHandler } from "react-hook-form"
import { isValidCEP } from '@brazilian-utils/brazilian-utils'
import { api } from '../../lib/axios'
import { registerEnterprise } from '../../api/register-enterprise'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'



const formSchema = z.object({
  name: z.string(),
  ri_number: z.string().optional(),
  status: z.enum(["SOON_RELEASE", "RELEASE", "iN_PROGRESS", "READY"]),
  purpose: z.enum(["residencial", "commercial"]),
  address: z.object({
    district: z.string(),
    city: z.string(),
    street: z.string(),
    state: z.string(),
    number: z.string(),
    cep: z.string()
  })
})
export type FormType = z.infer<typeof formSchema>



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

export interface Address {
  district: string;
  city: string;
  street: string;
  state: string;
  cep: string;
}

const RegisterEnterprise = () => {
  const [enterprise, setEnterprise] = useState({});
  const [address, setAddress] = useState<Address | null>(null);
  const router = useRouter()

  function handleHereNewEnterprise() {
    console.log('handleHereNewEnterprise')
  }

  function handleHome() {
    router.push('/')
  }

  const { register, handleSubmit, getValues, setValue } = useForm<FormType>({
    resolver: zodResolver(formSchema)
  })

  const { mutateAsync: registerEnterpriseFn, isPending, isSuccess } = useMutation({
    mutationKey: ["createEnterprise"],
    mutationFn: registerEnterprise,

  })

  useEffect(() => {
    if (isSuccess) {
      toast.success("Empreendimento criado com sucesso")
      router.push('/')
    }
  }, [isSuccess])

  useEffect(() => {
    if (isPending) {
      toast.loading("Criando empreendimento...",{
        id: "loading-update-enterprise"
      })
    }else{
      toast.dismiss("loading-update-enterprise")
    }
  }, [isPending])

  const Submit: SubmitHandler<FormType> = async ({
    address,
    name,
    purpose,
    status,
    ri_number
  }: FormType) => {
    try {
      await registerEnterpriseFn({
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
        ri_number: ri_number ?? ""
      })
    } catch (error) {
      console.log(error)

    }
  }

  const handleGetCEP = async (cep: string) => {
    if (isValidCEP(cep)) {
      if (cep.includes("-")) {
        cep.split("-").join("")
      }

      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
      console.log(response);
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
    }
  }


  return (
    <>
      <Header
        title="Cadastro de empreendimento"
        button={true}
        IconReturn={true}
        PushButton={handleHereNewEnterprise}
        PushButtonReturn={handleHome}
      />
      <FormContainer onSubmit={handleSubmit(Submit)} >
        <Form register={register} handleGetCEP={handleGetCEP} address={address} />
        <DefaultButton type='submit' title={"Cadastrar"} />
      </FormContainer>
    </>
  )
}

export default RegisterEnterprise