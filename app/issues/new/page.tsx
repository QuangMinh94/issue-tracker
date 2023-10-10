'use client'

import { Button, TextField } from "@mui/material";
import "easymde/dist/easymde.min.css";
import SimpleMDE from "react-simplemde-editor";

const NewIssuePage = () => {
    return (
        //add text file component
        <div className="max-w-xl space-y-3">
            <TextField
                fullWidth
                required
                id="outlined-required"
                label="Required"
                placeholder="title"
            />
            <SimpleMDE placeholder="Description" />
            <Button variant="contained"
                className="bg-blue-500">
                Submit new issue</Button>
        </div>
    )
}

export default NewIssuePage