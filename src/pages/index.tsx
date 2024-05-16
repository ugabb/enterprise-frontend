import { useEffect, useState } from "react";
import axios from "axios";
import Head from "next/head";
import ButtonFooter from "../components/buttonFooter/buttonFooter";
import Header from "../components/Header";
import { IconButton, Input, InputAdornment, Alert, Button, Dialog } from "@material-ui/core";
import {
    ContainertLupa,
    ContentLupa,
} from "./styles";
import Search from "../components/Search/Search";
import Enterprise from "../components/Enterprise/Enterprise";
import { useRouter } from "next/dist/client/router";


export default function Home() {
    const [enterprises, setEnterprises] = useState([]);
    const [isHome, setIsHome] = useState(true);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [enterprisesNumber, setEnterprisesNumber] = useState(0)
    const [search, setSearch] = useState("")

    const router = useRouter()

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

    function handleNewEnterprise() {
        router.push("/register-enterprise")
        // setIsHome(false);
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


    const handleSearch = enterprises.filter((body: any) => {
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
                            PushButton={handleNewEnterprise}
                            PushButtonReturn={handleHome}
                        />
                        <ContainertLupa>
                            <ContentLupa>
                                <Search />
                            </ContentLupa>
                        </ContainertLupa>
                        {handleSearch.slice(0, rowsPerPage).map((data: any) => {
                            return (
                                <Enterprise key={data.id} enterprise={data}/>
                            )
                        })}
                        {(enterprisesNumber >= rowsPerPage) && <ButtonFooter description={"Carregar mais"} pushClick={() => setRowsPerPage(rowsPerPage + 5)} />}
                    </>
                }
            </main>
        </>
    )
}