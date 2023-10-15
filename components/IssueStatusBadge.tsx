import { Status } from '@prisma/client'
import { Tag } from 'antd'

const statusMap: Record<
    Status,
    { label: string; color: 'red' | 'violet' | 'green' }
> = {
    OPEN: { label: 'Open', color: 'red' },
    IN_PROGRESS: { label: 'In progress', color: 'violet' },
    CLOSED: { label: 'Closed', color: 'green' },
}

const IssueStatusBadge = ({ status }: { status: Status }) => {
    return <Tag color={statusMap[status].color}>{statusMap[status].label}</Tag>
}

export default IssueStatusBadge
