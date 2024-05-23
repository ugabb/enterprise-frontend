import { useEffect, useState } from "react";
import axios from "axios";
import Head from "next/head";
import ButtonFooter from "../components/buttonFooter/buttonFooter";
import Header from "../components/Header";
import {
    ContainertLupa,
    ContentLupa,
} from "../styles/styles";
import Search from "../components/Search/Search";
import Enterprise from "../components/Enterprise/Enterprise";
import { useRouter } from "next/dist/client/router";
import { useQuery } from "@tanstack/react-query";
import { getEnterprises } from "../api/get-enterprises";
import { Skeleton } from "@material-ui/core";
import { SearchContainer } from "../components/Search/styleSearch";
import { EnterpriseWithAddress } from "../api/get-enterprise-by-id";
import DefaultButton from "../components/DefaultButton";
import { ButtonContainer } from "../components/Form/Form.style";


export default function Home() {
    const [enterprises, setEnterprises] = useState<EnterpriseWithAddress[]>([]);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [enterprisesNumber, setEnterprisesNumber] = useState(0)

    const router = useRouter()

    const { data: enterprisesList } = useQuery({
        queryKey: ["enterprises"],
        queryFn: getEnterprises,
    })

    useEffect(() => {
        if (enterprisesList) {
            setEnterprises(enterprisesList)
        }
    }, [enterprisesList])

    function numberEnterprises() {
        setEnterprisesNumber(enterprisesList?.length || 0)
    }

    useEffect(() => {
        numberEnterprises()
    })


    useEffect(() => {

        console.log(enterprisesList);
    }, [enterprisesList])

    function handleNewEnterprise() {
        router.push("/register-enterprise")
    }
    return (
        <>
            <Head>
                <title>ChallengJob</title>
            </Head>

            <main>
                <Header
                    title="Empreendimentos"
                    button={true}
                    IconReturn={false}
                    PushButton={handleNewEnterprise}
                />
                {enterprisesList ?
                    <ContainertLupa>
                        <ContentLupa>
                            <Search setEnterprises={setEnterprises} enterprises={enterprisesList} />
                        </ContentLupa>
                    </ContainertLupa>
                    : (
                        <SearchContainer>
                            <Skeleton variant="rectangular" height={30} />
                        </SearchContainer>


                    )}
                {/* {handleSearch.slice(0, rowsPerPage).map((data: any) => {
                            return (
                                <Enterprise key={data.id} enterprise={data} />
                            )
                        })} */}

                {Array.isArray(enterprises) && enterprises.slice(0, rowsPerPage).map((data: any) => (
                    <Enterprise key={data.id} enterprise={data} />
                ))}
                {(enterprisesNumber >= rowsPerPage) && <ButtonContainer><DefaultButton title={"Carregar mais"} onClick={() => setRowsPerPage(rowsPerPage + 5)} /></ButtonContainer>}
            </main>
        </>
    )
}