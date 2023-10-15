'use client'

import { Select } from 'antd'
import { useRouter } from 'next/navigation'

const statuses = [
    {
        label: 'All',
        value: '',
    },
    {
        label: 'Open',
        value: 'OPEN',
    },
    {
        label: 'In progress',
        value: 'IN_PROGRESS',
    },
    {
        label: 'Closed',
        value: 'CLOSED',
    },
]

const IssueStatusFilter = () => {
    const router = useRouter()
    return (
        <Select
            className="w-48"
            placeholder="Filter by status"
            options={statuses}
            onSelect={(status) => {
                const query = status ? `?status=${status}` : ''
                router.push('/issues' + query)
            }}
        ></Select>
    )
}

export default IssueStatusFilter
