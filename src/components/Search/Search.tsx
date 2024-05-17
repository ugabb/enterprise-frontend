import { IconButton, Input, InputAdornment } from '@material-ui/core'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { SearchContainer } from './styleSearch'
import { EnterpriseWithAddress } from '../../api/get-enterprises';
import toast from 'react-hot-toast';

interface SearchProps {
    enterprises: EnterpriseWithAddress[];
    setEnterprises: Dispatch<SetStateAction<EnterpriseWithAddress[]>>;
}

const Search = ({ enterprises, setEnterprises }: SearchProps) => {
    const handleSearch = (search: string, enterprises: EnterpriseWithAddress[]) => {
        if (enterprises === undefined) return toast.error("Nenhum empreendimento para pesquisar")
        const enterprisesFiltered = enterprises.filter((enterprise) => enterprise.name.toLowerCase().includes(search.toLowerCase()))
        setEnterprises(enterprisesFiltered)
    }

    return (
        <SearchContainer>
            <Input
                type='search'
                fullWidth
                id="standard-adornment-password"
                onChange={(e) => handleSearch(e.target.value, enterprises)}
                startAdornment={
                    <InputAdornment position="start" >
                        <IconButton type="submit" aria-label="search">
                            <img src="/images/icon-lupa.svg" alt="Icone Lupa" />
                            Buscar
                        </IconButton>
                    </InputAdornment>
                }

            />
        </SearchContainer>
    )
}

export default Search