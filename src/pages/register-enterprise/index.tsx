import { useEffect } from 'react'
import Header from '../../components/Header'
import { useRouter } from 'next/dist/client/router'
import Form from '../../components/Form/Form'

import { registerEnterprise } from '../../api/register-enterprise'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { queryClient } from '../../lib/react-query'

const RegisterEnterprise = () => {

  const router = useRouter()

  function handleHome() {
    router.push('/')
  }

  const { mutateAsync: registerEnterpriseFn, isPending, isSuccess, error } = useMutation({
    mutationKey: ["createEnterprise"],
    mutationFn: registerEnterprise,
    onSuccess: () => {
      // invalidar a query de todos os empreendimentos para que a lista seja atualizada
      queryClient.invalidateQueries({ queryKey: ['enterprise'] })
    },
  })

  useEffect(() => {
    if (isSuccess) {
      toast.success("Empreendimento criado com sucesso")
      router.push('/')
    }
  }, [isSuccess])

  useEffect(() => {
    if (isPending) {
      toast.loading("Criando empreendimento...", {
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
        title="Cadastro de empreendimento"
        button={true}
        IconReturn={true}
        PushButtonReturn={handleHome}
      />

      <Form action={registerEnterpriseFn} />
    </>
  )
}

export default RegisterEnterprise