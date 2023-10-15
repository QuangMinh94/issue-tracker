'use client'

import { Select } from 'antd'
import { useRouter, useSearchParams } from 'next/navigation'

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
    const searchParam = useSearchParams()

    const onSelectStatus = (status: string) => {
        const params = new URLSearchParams()
        if (status) params.append('status', status)
        if (searchParam.get('orderBy'))
            params.append('orderBy', searchParam.get('orderBy')!)
        const query = params.size ? '?' + params.toString() : ''
        router.push('/issues' + query)
    }

    return (
        <Select
            defaultValue={
                searchParam.get('status') ? searchParam.get('status') : ''
            }
            className="w-48"
            placeholder="Filter by status"
            options={statuses}
            onSelect={onSelectStatus}
        ></Select>
    )
}

export default IssueStatusFilter
