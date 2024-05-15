import { useEffect, useState } from "react";
import axios from "axios";
import Head from "next/head";
import ButtonFooter from "../components/buttonFooter/buttonFooter";
import Header from "../components/Header";
import { IconButton, Input, InputAdornment, Alert, Button, Dialog } from "@material-ui/core";
import { 
    BoxNameEnterprise, 
    ContainerHome,  
    ContentHome, 
    ContentStatus,
    ContainertLupa, 
    ContentLupa, 
} from "./styles";


export default function Home() {
    const [enterprises, setEnterprises] = useState([]);
    const [isHome, setIsHome] = useState(true);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [enterprisesNumber, setEnterprisesNumber] = useState(0)
    const [search, setSearch] = useState("")

    const [openModalDelete, setOpenModalDelete] = useState(false);

const Enterprises = async () => {
    await axios.get('http://localhost:3001/enterprises').then((response) => {
        setEnterprises(response.data)
});
}

function numberEnterprises() {
    setEnterprisesNumber(enterprises.length)
}

useEffect(() => {
    numberEnterprises()
})

useEffect(() => {
    Enterprises()
}, [])

function handleHereNewEnterprise() {
    setIsHome(false);
}

function handleHome() {
    setIsHome(true);
}


async function DeleteEnterprise(value) {
    await axios.delete(`http://localhost:3001/enterprises/${value}`)
    .then(() => {
        setOpenModalDelete(false)
        Enterprises()
    }).catch((err) => {
        window.alert(`Erro ao Deletar, ${err}`)
    })
}


const  handleSearch = enterprises.filter((body: any) => {
    return body.name
    .toLowerCase()
    .includes(search.toLocaleLowerCase())  
})

    return (
      <>
        <Head>
          <title>ChallengJob</title>
        </Head>

        <main>
            {isHome &&
            <>
            <Header 
                title="Empreendimentos" 
                button={true} 
                IconReturn={false} 
                PushButton={handleHereNewEnterprise}
                PushButtonReturn={handleHome}
            />
            <ContainertLupa>
                <ContentLupa>
                    <div>
                    <Input
                    fullWidth
                    id="standard-adornment-password"
                    onChange={(e) => {
                        setSearch(e.target.value)
                    }}
                    endAdornment={
                      <InputAdornment onClick={handleSearch} position="start">
                        <IconButton type="submit" aria-label="search">
                        <img src="/images/Vector (1).svg" alt="Icone Lupa" />
                        Buscar
                        </IconButton>
                    </InputAdornment>
                       }
                    />
                    </div>
                </ContentLupa>
            </ContainertLupa>
            {handleSearch.slice(0, rowsPerPage).map((data: any) => {
                return (
                    <ContainerHome key={data.id}>
                        <ContentHome>
                            {openModalDelete && 
                                <Alert
                                    maxWidth="md"
                                    severity="error"
                                    action={
                                        <>
                                        <Button onClick={() => setOpenModalDelete(false)}color="inherit" size="small">
                                        Cancelar
                                        </Button>
                                        <Button onClick={() => DeleteEnterprise()}color="inherit" size="small">
                                        Confirmar
                                        </Button>
                                        </>
                                    }
                                >
                                    Confirma a exclusão do Empreendimento?
                                </Alert>
                            }
                            
                            {!openModalDelete && 
                                <div>
                                    <BoxNameEnterprise>                      
                                        <span>{data.name}</span>
                                        <img 
                                            src="/images/Vector.svg" 
                                            alt="Icone de Lapis" 
                                            />
                                            <img 
                                            onClick={() => {
                                                setOpenModalDelete(true);
                                            }}
                                            src="/images/Vector-1.svg" 
                                            alt="Icone de Lixeira" 
                                        />
                                    </BoxNameEnterprise>
                                    <p>{data.address.street}, {data.address.number} - {data.address.district}, {data.address.state}</p>
                                </div>
                            }
                            <ContentStatus>
                                <div>{data.status === "RELEASE" ? "Lançamento" : data.status}</div>
                                <div>{data.purpose === "HOME" ? "Residencial" : data.purpose}</div>
                            </ContentStatus>
                        </ContentHome>
                    </ContainerHome>
                )
            })}
            {(enterprisesNumber >= rowsPerPage) && <ButtonFooter description={"Carregar mais"} pushClick={() => setRowsPerPage(rowsPerPage + 5)}/>}
            </>
            }
        </main>
      </>
    )
  }