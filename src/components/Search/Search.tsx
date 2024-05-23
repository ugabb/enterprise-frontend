import { IconButton, Input, InputAdornment } from '@material-ui/core'

import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { SearchContainer } from './styleSearch'
import { EnterpriseWithAddress } from '../../api/get-enterprises';
import toast from 'react-hot-toast';
import { theme } from '../../styles/theme';

interface SearchProps {
    enterprises: EnterpriseWithAddress[];
    setEnterprises: Dispatch<SetStateAction<EnterpriseWithAddress[]>>;
    setIsSearching: Dispatch<SetStateAction<boolean>>;
}

const Search = ({ enterprises, setEnterprises, setIsSearching }: SearchProps) => {
    const handleSearch = (search: string, enterprises: EnterpriseWithAddress[]) => {
        if (enterprises === undefined) return toast.error("Nenhum empreendimento para pesquisar")
        if (search.length > 0) {
            setIsSearching(true)
        } else {
            setIsSearching(false)
        }
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
                    <InputAdornment position="start" sx={{
                        "& .MuiInputAdornment-root": {
                            border: "none",
                        }
                    }}>
                        <IconButton type="submit" aria-label="search"
                            sx={{
                                "&:hover": {
                                    backgroundColor: "transparent",
                                },
                                "&.Mui-focusVisible": {
                                    backgroundColor: "transparent",
                                },
                                padding: 0,
                                color: `${theme.colors.textColorPrimary}`,
                                fontSize: "1rem",
                            }}>
                            <img src="/images/icon-lupa.svg" alt="Icone Lupa" />
                            Buscar
                        </IconButton>
                    </InputAdornment>
                }

                sx={{
                    "&:before": {
                        borderBottom: "none",
                    },
                    "&:after": {
                        borderBottom: "none",
                    },
                    "&:hover:not(.Mui-disabled):before": {
                        borderBottom: "none",
                    },
                    outline: "none",
                    borderBottom: `2px solid ${theme.colors.outlineGrayDark}`,
                    ":hover": {
                        borderBottom: `2px solid ${theme.colors.brandColorDefault}`,
                    }
                }}
            />
        </SearchContainer>
    )
}

export default Search