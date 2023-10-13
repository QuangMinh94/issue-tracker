'use client'

import { Issue } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import { Select, Skeleton, message } from 'antd'
import axios from 'axios'
import { User } from 'next-auth'

type OptionProps = {
    label: string | null | undefined
    value: string | null | undefined
}

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
    const [messageApi, contextHolder] = message.useMessage()

    const {
        data: option,
        error,
        isLoading,
    } = useQuery<OptionProps[]>({
        queryKey: ['option'],
        queryFn: async () => {
            const res = await axios.get('/api/users')
            const res_1 = res.data as User[]
            const _option: OptionProps[] = [
                { label: 'Unassigned', value: null },
            ]
            res_1.forEach((resChild) => {
                _option.push({ label: resChild.name, value: resChild.id })
            })
            return _option
        },
        staleTime: 60 * 1000, //60sec
        retry: 3,
    })

    if (isLoading) return <Skeleton.Input className="w-fit" active={true} />

    if (error) return null

    return (
        <>
            {contextHolder}
            <Select
                className="w-full"
                placeholder="Select"
                defaultValue={issue.assignedToUserId || null}
                //style={{ width: 120 }}
                //onChange={handleChange}
                onSelect={async (e) => {
                    try {
                        await axios.patch('/api/issues/' + issue.id, {
                            assignedToUserId: e || null,
                        })
                    } catch {
                        messageApi.error('Changes could not be saved')
                    }
                }}
                options={option}
            />
        </>
    )
}

export default AssigneeSelect
