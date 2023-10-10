'use client'

import { createIssueSchema } from "@/app/validationSchema";
import ErrorMessage from "@/components/ErrorMessage";
import Spinner from "@/components/Spinner";
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
    const [isSubmitting, setIsSubmitting] = useState(false)

    const onSubmit = handleSubmit(async (data) => {
        try {
            setIsSubmitting(true)
            await axios.post('/api/issues', data)
            route.push('/issues')
        } catch (error) {
            setIsSubmitting(false)
            setError('An unexpected error occured')
        }
    })

    return (
        //add text file component
        <div className="max-w-xl">
            {error && <p className="bg-red-700 mb-5">{error}</p>}
            <form className="space-y-3"
                onSubmit={onSubmit}>
                <TextField
                    fullWidth
                    id="outlined-required"
                    label="title"
                    placeholder="title"
                    {...register('title')}
                />
                <ErrorMessage>{errors.title?.message}</ErrorMessage>
                <Controller
                    name='description'
                    control={control}
                    render={({ field }) => <SimpleMDE placeholder="Description" {...field} />}
                />
                <ErrorMessage>{errors.description?.message}</ErrorMessage>

                <Button disabled={isSubmitting} type="submit" variant="contained"
                    className="bg-blue-500">
                    Submit new issue {isSubmitting && <Spinner />}</Button>
            </form>
        </div>
    )
}

export default NewIssuePage