import CustomTable from '@/app/issues/CustomTable'
import Pagination from '@/components/Pagination'
import prisma from '@/prisma/client'
import { Issue, Status } from '@prisma/client'
import IssueActions from './issueActions'

interface Props {
    searchParams: {
        status: Status
        orderBy: keyof Issue
        page: string
    }
}

const IssuesPage = async ({ searchParams }: Props) => {
    const statuses = Object.values(Status)
    const status = searchParams.status
        ? statuses.includes(searchParams.status)
            ? searchParams.status
            : undefined
        : undefined

    const columns: (keyof Issue)[] = ['status', 'title', 'createdAt']

    const orderBy = searchParams.orderBy
        ? columns.includes(searchParams.orderBy)
            ? { [searchParams.orderBy]: 'asc' }
            : undefined
        : undefined

    const where = { status }

    const page = parseInt(searchParams.page) || 1
    const pageSize = 10

    const issues = await prisma.issue.findMany({
        where,
        orderBy,
        skip: (page - 1) * pageSize,
        take: pageSize,
    })

    const issueCount = await prisma.issue.count({ where })

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
                    <>
                        <CustomTable data={rows} searchParams={searchParams} />
                        <Pagination
                            itemCount={issueCount}
                            pageSize={pageSize}
                            currentPage={page}
                        />
                    </>
                )}
            </div>
        </>
    )
}

export const dynamic = 'force-dynamic'

/* export const revalidate = 60 */

export default IssuesPage
