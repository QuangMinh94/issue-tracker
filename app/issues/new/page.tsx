'use client'

import { Button, TextField } from "@mui/material";
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from 'react-hook-form';
import SimpleMDE from "react-simplemde-editor";

interface IssueForm {
    title: string,
    description: string
}

const NewIssuePage = () => {
    const route = useRouter()
    const { register, control, handleSubmit } = useForm<IssueForm>()
    const [error, setError] = useState('')

    return (
        //add text file component
        <div className="max-w-xl">
            {error && <p className="bg-red-700 mb-5">{error}</p>}
            <form className="space-y-3"
                onSubmit={handleSubmit(async (data) => {
                    try {
                        await axios.post('/api/issues', data)
                        route.push('/issues')
                    } catch (error) {
                        console.log('Error')
                        setError('An unexpected error occured')
                    }
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
        </div>
    )
}

export default NewIssuePage