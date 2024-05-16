import React, { useState } from 'react'
import Header from '../../components/Header'
import { useRouter } from 'next/dist/client/router'
import Form from '../../components/Form/Form'
import { FormContainer } from '../styles'
import DefaultButton from '../../components/DefaultButton'

import axios from 'axios'

// zod para tipagem do formulário
import { infer, z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

// react-hook-form para tratar do formulário
import { useForm, SubmitHandler } from "react-hook-form"
import { isValidCEP } from '@brazilian-utils/brazilian-utils'


const formSchema = z.object({
  status: z.enum(["SOON_RELEASE", "RELEASE", "iN_PROGRESS", "READY"]),
  purpose: z.enum(["residencial", "commercial"]),
  addrees: z.object({
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


// {
//     "_id": "PA01",
//     "name": "Sirius Vila Bastos",
//     "status": "RELEASE",
//     "purpose": "HOME",
//     "ri_number": "123321",
//     "address": {
//       "district": "Vila Bastos",
//       "city": "Santo André",
//       "street": "Rua Doutor Messuti",
//       "state": "SP",
//       "number": "339",
//       "cep": "60000000"
//     }
//   },


const RegisterEnterprise = () => {
  const [enterprise, setEnterprise] = useState({});
  const router = useRouter()

  function handleHereNewEnterprise() {
    console.log('handleHereNewEnterprise')
  }

  function handleHome() {
    router.push('/')
  }

  const { register, handleSubmit, formState: { isValid }, setValue } = useForm<FormType>({
    resolver: zodResolver(formSchema)
  })

  const Submit: SubmitHandler<FormType> = (data: FormType) => {
    console.log(data)
  }

  const handleGetCEP = async (cep: string) => {
    if (isValidCEP(cep)) {
      if (cep.includes("-")) {
        cep.split("-").join("")
      }
      console.log(cep);

      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
      console.log(response);
      const addressResponse: AddressResponse = response.data
      setValue('addrees', {
        cep: addressResponse.cep,
        city: addressResponse.localidade,
        district: addressResponse.bairro,
        state: addressResponse.uf,
        street: addressResponse.logradouro,
        number: ""
      });
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
        <Form register={register} handleGetCEP={handleGetCEP} />
        <DefaultButton type='submit' title={"Cadastrar"} />
      </FormContainer>
    </>
  )
}

export default RegisterEnterprise