import prisma from "@/prisma/client"
import { notFound } from "next/navigation"

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
            <p>{issueDetail.title}</p>
            <p>{issueDetail.description}</p>
            <p>{issueDetail.status}</p>
            <p>{issueDetail.createdAt.toDateString()}</p>
        </div>
    )
}

export default IssueDetailPage