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
import { useMutation, useQuery } from '@tanstack/react-query'
import { getEnterpriseById } from '../../api/get-enterprise-by-id'
import { updateEnterprise } from '../../api/update.enterprise'
import toast from 'react-hot-toast'


const formSchema = z.object({
  name: z.string().min(1, { message: "Nome não pode ser vazio" }),
  ri_number: z.string().optional(),
  status: z.enum(["SOON_RELEASE", "RELEASE", "iN_PROGRESS", "READY"]),
  purpose: z.enum(["residencial", "commercial"]),
  address: z.object({
    district: z.string(),
    city: z.string(),
    street: z.string(),
    state: z.string(),
    number: z.string().min(1, { message: "O número é obrigatório" }),
    cep: z.string().min(8).max(9)
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

const EditEnterprise = () => {
  const [enterprise, setEnterprise] = useState({});
  const router = useRouter()

  const { enterpriseId } = router.query


  const { data: enterpriseData } = useQuery({
    queryKey: [enterpriseId],
    queryFn: () => getEnterpriseById(enterpriseId as string),
    enabled: !!enterpriseId, // somente vai fazer a requisição se o enterpriseId existir
  })

  function handleHome() {
    router.push('/')
  }

  const { register, handleSubmit, control, setValue, formState: { errors: formError,isSubmitting } } = useForm<FormType>({
    resolver: zodResolver(formSchema),
  });

  const { mutateAsync: updateEnterpriseFn, isPending, isSuccess, error } = useMutation({
    mutationKey: ["updateEnterprise", enterpriseId],
    mutationFn: updateEnterprise,
  })

  useEffect(() => {
    if (isSuccess) {
      toast.success("Empreendimento atualizado com sucesso")
      router.push('/')
    }
  }, [isSuccess])

  useEffect(() => {
    if (isPending) {
      toast.loading("Atualizando empreendimento...", {
        id: "loading-update-enterprise"
      })
    } else {
      toast.dismiss("loading-update-enterprise")
    }
  }, [isPending])

  if (error) {
    toast.error(error.message)
  }

  if (formError) {
    console.log("formError:", formError);

  }

  const Submit: SubmitHandler<FormType> = async ({
    address,
    name,
    purpose,
    status,
  }: FormType) => {

    try {
      await updateEnterpriseFn({
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
        id: enterpriseId as string
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
      console.log(cep);

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
    }

  }


  return (
    <>
      <Header
        title="Editar Empreendimento"
        button={true}
        IconReturn={true}
        PushButtonReturn={handleHome}
      />
      <FormContainer onSubmit={handleSubmit(Submit)} >
        <Form formError={formError} control={control} register={register} handleGetCEP={handleGetCEP} enterprise={enterpriseData} />
        <DefaultButton type='submit' title={"Editar"} disabled={isSubmitting} />
      </FormContainer>
    </>
  )
}

export default EditEnterprise