'use client'

import { ThemeProvider, createTheme } from "@mui/material/styles";

type Prop = {
    children: any
}

const GlobalTheme = ({ children }: Prop) => {
    const theme = createTheme({
        typography: {
            fontFamily: 'inherit'
        }
    })

    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    )
}

export default GlobalTheme