import authOptions from "@/app/auth/authOptions"
import prisma from "@/prisma/client"
import { Col, Row, Space } from "antd"
import { getServerSession } from "next-auth"
import { notFound } from "next/navigation"
import DeleteIssueButton from "./DeleteIssueButton"
import EditIssueButton from "./EditIssueButton"
import IssueDetails from "./IssueDetails"

interface Props {
    params: { id: string }
}

const IssueDetailPage = async ({ params }: Props) => {
    const session = await getServerSession(authOptions)
    const issueDetail = await prisma.issue.findUnique(
        { where: { id: parseInt(params.id) } }
    )

    if (!issueDetail) notFound()

    return (
        <Row gutter={5}>
            <Col xs={24} md={18} lg={18}>
                <IssueDetails issue={issueDetail} />
            </Col>
            {session &&
                <Col xs={24} md={6} lg={6}>
                    <Space className="w-full" direction='vertical' size={10}>
                        <EditIssueButton issueId={issueDetail.id} />
                        <DeleteIssueButton issueId={issueDetail.id} />
                    </Space>
                </Col>}
        </Row>
    )
}

export default IssueDetailPage