'use client'

import { IssueStatusBadge } from '@/components'
import { Status } from '@prisma/client'
import { Avatar, Card, Flex } from 'antd'
import Table, { ColumnsType } from 'antd/es/table'
import Link from 'next/link'

interface DataType {
    key: React.Key
    id: string
    issue: string
    status: Status
    assignedToUser: any
}

const LatestIssueTable = ({ data }: { data: any }) => {
    return (
        <Card title={<p className="font-bold text-2xl">Latest issues</p>}>
            <Table
                columns={columns}
                showHeader={false}
                dataSource={data}
                pagination={false}
            />
        </Card>
    )
}

const columns: ColumnsType<DataType> = [
    {
        title: 'Issue',
        dataIndex: 'issue',
        render(_value, record, _index) {
            return (
                <Flex justify="space-between">
                    <Flex vertical gap={3}>
                        <Link
                            className="text-black hover:text-black"
                            href={`/issues/${record.id}`}
                        >
                            {record.issue}
                        </Link>
                        <IssueStatusBadge status={record.status} />
                    </Flex>
                    {record.assignedToUser && (
                        <Avatar src={record.assignedToUser.image} alt="Image" />
                    )}
                </Flex>
            )
        },
    },
]

export default LatestIssueTable
