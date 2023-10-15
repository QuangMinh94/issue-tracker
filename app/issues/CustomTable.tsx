'use client'

import CustomLink from '@/components/CustomLink'
import IssueStatusBadge from '@/components/IssueStatusBadge'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Status } from '@prisma/client'
import { Skeleton } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import Table from 'antd/es/table'
import Link from 'next/link'
import { ReactNode } from 'react'

interface DataType {
    key: React.Key
    id: string
    issue: string
    status: Status
    createdAt: Date
}

interface Props {
    data: any[]
    loading?: boolean
    searchParams?: any
}

const HeaderLink = ({
    children,
    searchParams,
    columnName,
}: {
    children: ReactNode
    searchParams: any
    columnName: string
}) => {
    return (
        <>
            <Link
                className="text-black hover:text-black"
                href={{
                    query: { ...searchParams, orderBy: columnName },
                }}
            >
                {children}
            </Link>
            {columnName === searchParams.orderBy && (
                <FontAwesomeIcon
                    className="ml-3 cursor-pointer"
                    icon={faArrowUp}
                />
            )}
        </>
    )
}

const skeletonColumn: ColumnsType<DataType> = [
    {
        title: 'Issue',
        dataIndex: 'issue',
        // specify the condition of filtering result
        // here is that finding the name started with `value`
        //sorter: (a, b) => a.issue.length - b.issue.length,
        //sortDirections: ['descend'],
        render() {
            return <Skeleton.Input active={true} className="w-fit" />
        },
    },
    {
        title: 'Status',
        dataIndex: 'status',
        render() {
            return <Skeleton.Input active={true} className="w-fit" />
        },
    },
    {
        title: 'Created',
        dataIndex: 'createdAt',
        render() {
            return <Skeleton.Input active={true} className="w-fit" />
        },
    },
]

const CustomTable = ({ data, loading, searchParams }: Props) => {
    const columns: ColumnsType<DataType> = [
        {
            title: (
                <HeaderLink
                    children={'Issue'}
                    searchParams={searchParams}
                    columnName={'title'}
                />
            ),
            dataIndex: 'issue',
            width: '10vw',
            render(_value, record, _index) {
                return (
                    <span>
                        <CustomLink href={`/issues/${record.id}`}>
                            {record.issue}
                        </CustomLink>
                        <div className="block md:hidden">
                            <IssueStatusBadge status={record.status} />
                        </div>
                    </span>
                )
            },
        },
        {
            title: (
                <HeaderLink
                    children={'Status'}
                    searchParams={searchParams}
                    columnName={'status'}
                />
            ),
            width: '2vw',
            dataIndex: 'status',
            responsive: ['md'],
            render(_value, record, _index) {
                return <IssueStatusBadge status={record.status} />
            },
        },
        {
            title: (
                <HeaderLink
                    children={'Created'}
                    searchParams={searchParams}
                    columnName={'createdAt'}
                />
            ),
            width: '3vw',
            dataIndex: 'createdAt',
            responsive: ['md'],
        },
    ]

    return (
        <Table
            columns={loading ? skeletonColumn : columns}
            dataSource={data}
            /* pagination={{
                showLessItems: true,
                defaultPageSize: 10,
                showSizeChanger: true,
                pageSizeOptions: ['10', '20', '30'],
            }} */
            pagination={false}
        />
    )
}

export default CustomTable
