import prisma from '@/prisma/client'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { Col, Flex, Row } from 'antd'
import { Metadata } from 'next'
import IssueChart from './IssueChart'
import IssueSummary from './IssueSummary'
import LatestIssues from './LatestIssues'
export default async function Home() {
    const open = await prisma.issue.count({
        where: { status: 'OPEN' },
    })
    const inProgress = await prisma.issue.count({
        where: { status: 'IN_PROGRESS' },
    })
    const closed = await prisma.issue.count({
        where: { status: 'CLOSED' },
    })

    return (
        <Row gutter={15}>
            <Col xs={24} md={12} lg={12}>
                <Flex vertical gap={6}>
                    <IssueSummary
                        open={open}
                        inProgress={inProgress}
                        closed={closed}
                    />
                    <IssueChart
                        open={open}
                        inProgress={inProgress}
                        closed={closed}
                    />
                </Flex>
            </Col>
            <Col xs={24} md={12} lg={12}>
                <LatestIssues />
            </Col>
        </Row>
    )
}

export const metadata: Metadata = {
    title: 'Issue Tracker - Dashboard',
    description: 'View a summary of project issues',
}
