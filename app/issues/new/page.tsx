'use client'

import { createIssueSchema } from "@/app/validationSchema";
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, TextField } from "@mui/material";
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from 'react-hook-form';
import SimpleMDE from "react-simplemde-editor";
import { z } from 'zod';

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
    const route = useRouter()
    const { register, control, handleSubmit, formState: {
        errors
    } } = useForm<IssueForm>({
        resolver: zodResolver(createIssueSchema)
    })
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
                    id="outlined-required"
                    label="title"
                    placeholder="title"
                    {...register('title')}
                />
                {errors.title && <p className="text-red-600">{errors.title.message}</p>}
                <Controller
                    name='description'
                    control={control}
                    render={({ field }) => <SimpleMDE placeholder="Description" {...field} />}
                />
                {errors.description && <p className="text-red-600">{errors.description.message}</p>}

                <Button type="submit" variant="contained"
                    className="bg-blue-500">
                    Submit new issue</Button>
            </form>
        </div>
    )
}

export default NewIssuePage