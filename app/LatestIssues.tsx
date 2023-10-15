import prisma from '../prisma/client'
import LatestIssueTable from './LatestIssueTable'

const LatestIssues = async () => {
    const issues = await prisma.issue.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5,
        include: {
            assignedToUser: true,
        },
    })

    const rows: any[] = []
    issues.forEach((issue) => {
        rows.push({
            key: issue.id,
            id: issue.id,
            issue: issue.title,
            status: issue.status,
            assignedToUser: issue.assignedToUser,
        })
    })

    return <LatestIssueTable data={rows} />
}

export default LatestIssues
