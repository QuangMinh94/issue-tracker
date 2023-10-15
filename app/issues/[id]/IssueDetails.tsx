import { IssueStatusBadge } from '@/components'
import { Issue } from '@prisma/client'
import { Card, Space } from 'antd'
import ReactMarkDown from 'react-markdown'

const IssueDetails = ({ issue }: { issue: Issue }) => {
    return (
        <div className="mb-3">
            <p className="font-black text-2xl">{issue.title}</p>
            <Space size={5} align="center" className="mb-2">
                <IssueStatusBadge status={issue.status} />
                <p>{issue.createdAt.toDateString()}</p>
            </Space>
            <Card className="prose max-w-full mt-4">
                <ReactMarkDown>{issue.description}</ReactMarkDown>
            </Card>
        </div>
    )
}

export default IssueDetails
