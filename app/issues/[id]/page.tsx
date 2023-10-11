import prisma from "@/prisma/client"
import { Col, Row } from "antd"
import { notFound } from "next/navigation"
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
            <Col xs={24} md={12} lg={12}>
                <IssueDetails issue={issueDetail} />
            </Col>
            <Col xs={24} md={12} lg={12}>
                <EditIssueButton issueId={issueDetail.id} />
            </Col>
        </Row>
    )
}

export default IssueDetailPage