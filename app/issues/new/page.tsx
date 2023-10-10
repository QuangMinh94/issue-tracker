'use client'

import { Button, TextField } from "@mui/material";
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { Controller, useForm } from 'react-hook-form';
import SimpleMDE from "react-simplemde-editor";

interface IssueForm {
    title: string,
    description: string
}

const NewIssuePage = () => {
    const route = useRouter()
    const { register, control, handleSubmit } = useForm<IssueForm>()

    return (
        //add text file component
        <form className="max-w-xl space-y-3"
            onSubmit={handleSubmit(async (data) => {
                axios.post('/api/issues', data)
                route.push('/issues')
            })}>
            <TextField
                fullWidth
                required
                id="outlined-required"
                label="Required"
                placeholder="title"
                {...register('title')}
            />
            <Controller
                name='description'
                control={control}
                render={({ field }) => <SimpleMDE placeholder="Description" {...field} />}
            />

            <Button type="submit" variant="contained"
                className="bg-blue-500">
                Submit new issue</Button>
        </form>
    )
}

export default NewIssuePage