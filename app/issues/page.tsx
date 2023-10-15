import CustomTable from '@/app/issues/CustomTable'
import prisma from '@/prisma/client'
import { Issue, Status } from '@prisma/client'
import IssueActions from './issueActions'

interface Props {
    searchParams: { status: Status; orderBy: keyof Issue }
}

const IssuesPage = async ({ searchParams }: Props) => {
    const statuses = Object.values(Status)
    const status = statuses.includes(searchParams.status)
        ? searchParams.status
        : undefined

    const issues = await prisma.issue.findMany({
        where: {
            status,
        },
    })
    const rows: any[] = []
    issues.forEach((issue) => {
        rows.push({
            key: issue.id,
            id: issue.id,
            issue: issue.title,
            status: issue.status,
            createdAt: issue.createdAt.toDateString(),
        })
    })
    return (
        <>
            <IssueActions />
            <div>
                {issues && (
                    <CustomTable data={rows} searchParams={searchParams} />
                )}
            </div>
        </>
    )
}

export const dynamic = 'force-dynamic'

/* export const revalidate = 60 */

export default IssuesPage
