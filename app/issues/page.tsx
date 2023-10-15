import CustomTable, { IssueQuery, columnsTitle } from '@/app/issues/CustomTable'
import Pagination from '@/components/Pagination'
import prisma from '@/prisma/client'
import { Status } from '@prisma/client'
import { Flex } from 'antd'
import IssueActions from './issueActions'

interface Props {
    searchParams: IssueQuery
}

const IssuesPage = async ({ searchParams }: Props) => {
    console.log('yo page', columnsTitle)
    const statuses = Object.values(Status)
    const status = searchParams.status
        ? statuses.includes(searchParams.status)
            ? searchParams.status
            : undefined
        : undefined

    //const columns: (keyof Issue)[] = ['status', 'title', 'createdAt']

    const orderBy = searchParams.orderBy
        ? columnsTitle.includes(searchParams.orderBy)
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
        <Flex vertical gap={10}>
            <IssueActions />
            <div>
                {issues && (
                    <>
                        <CustomTable data={rows} searchParams={searchParams} />
                    </>
                )}
            </div>
            <Pagination
                itemCount={issueCount}
                pageSize={pageSize}
                currentPage={page}
            />
        </Flex>
    )
}

export const dynamic = 'force-dynamic'

/* export const revalidate = 60 */

export default IssuesPage
