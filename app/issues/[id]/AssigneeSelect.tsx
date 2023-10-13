'use client'

import { useQuery } from '@tanstack/react-query'
import { Select, Skeleton } from 'antd'
import axios from 'axios'
import { User } from 'next-auth'

type OptionProps = {
    label: string | null | undefined,
    value: string | null | undefined
}

const AssigneeSelect = () => {
    const { data: option, error, isLoading } = useQuery<OptionProps[]>({
        queryKey: ['option'],
        queryFn: async () => {
            const res = await axios.get('/api/users')
            const res_1 = res.data as User[]
            const _option: OptionProps[] = []
            res_1.forEach((resChild) => {
                _option.push({ label: resChild.name, value: resChild.id })
            })
            return _option
        },
        staleTime: 60 * 1000, //60sec
        retry: 3
    })

    if (isLoading) return <Skeleton.Input className='w-fit' active={true} />

    if (error) return null

    return (
        <Select
            className='w-full'
            placeholder='Select'
            //defaultValue="lucy"
            //style={{ width: 120 }}
            //onChange={handleChange}
            options={option}
        />
    )
}

export default AssigneeSelect