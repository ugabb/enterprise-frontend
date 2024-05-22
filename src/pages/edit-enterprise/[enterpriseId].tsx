import { useEffect } from 'react'
import Header from '../../components/Header'
import { useRouter } from 'next/dist/client/router'
import Form from '../../components/Form/Form'

import { useMutation, useQuery } from '@tanstack/react-query'
import { getEnterpriseById } from '../../api/get-enterprise-by-id'
import { updateEnterprise } from '../../api/update.enterprise'
import toast from 'react-hot-toast'




const EditEnterprise = () => {
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

  return (
    <>
      <Header
        title="Editar Empreendimento"
        button={true}
        IconReturn={true}
        PushButtonReturn={handleHome}
      />
      <Form action={updateEnterpriseFn} enterprise={enterpriseData} address={enterpriseData?.address} />

    </>
  )
}

export default EditEnterprise