import prisma from "@/prisma/client"
import { Col, Row, Space } from "antd"
import { notFound } from "next/navigation"
import DeleteIssueButton from "./DeleteIssueButton"
import EditIssueButton from "./EditIssueButton"
import IssueDetails from "./IssueDetails"

interface Props {
    params: { id: string }
}

const IssueDetailPage = async ({ params }: Props) => {
    const issueDetail = await prisma.issue.findUnique(
        { where: { id: parseInt(params.id) } }
    )

    if (!issueDetail) notFound()

    return (
        <Row gutter={5}>
            <Col xs={24} md={16} lg={16}>
                <IssueDetails issue={issueDetail} />
            </Col>
            <Col xs={24} md={8} lg={8}>
                <Space className="w-full" direction='vertical' size={10}>
                    <EditIssueButton issueId={issueDetail.id} />
                    <DeleteIssueButton issueId={issueDetail.id} />
                </Space>
            </Col>
        </Row>
    )
}

export default IssueDetailPage