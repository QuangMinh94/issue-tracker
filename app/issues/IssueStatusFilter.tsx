'use client'

import { Select } from 'antd'

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
    return <Select placeholder="Filter by status" options={statuses}></Select>
}

export default IssueStatusFilter
