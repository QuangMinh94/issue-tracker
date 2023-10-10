'use client'

import { ThemeProvider, useTheme } from "@mui/material/styles";

type Prop = {
    children: any
}

const GlobalTheme = ({ children }: Prop) => {
    const theme = useTheme();

    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    )
}

export default GlobalTheme