'use client'

import { issueSchema } from "@/app/validationSchema";
import ErrorMessage from "@/components/ErrorMessage";
import Spinner from "@/components/Spinner";
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, TextField } from "@mui/material";
import { Issue } from "@prisma/client";
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from 'react-hook-form';
//import SimpleMDE from "react-simplemde-editor";
import { z } from 'zod';

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false })

type IssueFormData = z.infer<typeof issueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
    const route = useRouter()
    const { register, control, handleSubmit, formState: {
        errors
    } } = useForm<IssueFormData>({
        resolver: zodResolver(issueSchema)
    })
    const [error, setError] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    const onSubmit = handleSubmit(async (data) => {
        try {
            setIsSubmitting(true)
            if (issue) {
                await axios.patch('/api/issues' + issue.id, data)
            }
            else {
                await axios.post('/api/issues', data)
            }
            route.push('/issues')
            route.refresh()
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
                    defaultValue={issue?.title}
                />
                <ErrorMessage>{errors.title?.message}</ErrorMessage>
                <Controller
                    name='description'
                    control={control}
                    defaultValue={issue?.description}
                    render={({ field }) =>
                        <SimpleMDE placeholder="Description" {...field}
                        />}
                />
                <ErrorMessage>{errors.description?.message}</ErrorMessage>

                <Button disabled={isSubmitting} type="submit" variant="contained"
                    className="bg-blue-500">
                    {issue ? 'Update issue' : 'Submit new issue'}
                    {isSubmitting && <Spinner />}</Button>
            </form>
        </div>
    )
}

export default IssueForm