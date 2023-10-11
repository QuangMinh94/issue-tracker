import IssueStatusBadge from "@/components/IssueStatusBadge"
import prisma from "@/prisma/client"
import { Card, Space } from "antd"
import { notFound } from "next/navigation"
import ReactMarkDown from 'react-markdown'

interface Props {
    params: { id: string }
}

const IssueDetailPage = async ({ params }: Props) => {
    const issueDetail = await prisma.issue.findUnique(
        { where: { id: parseInt(params.id) } }
    )

    if (!issueDetail) notFound()

    return (
        <div>
            <p className="font-black text-2xl">{issueDetail.title}</p>
            <Space size={5} align='center' className="mb-2">
                <IssueStatusBadge status={issueDetail.status} />
                <p>{issueDetail.createdAt.toDateString()}</p>
            </Space>
            <Card className="prose mt-4">
                <ReactMarkDown>{issueDetail.description}</ReactMarkDown>
            </Card>
        </div>
    )
}

export default IssueDetailPage