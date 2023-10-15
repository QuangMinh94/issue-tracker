'use client'

import CustomLink from '@/components/CustomLink'
import IssueStatusBadge from '@/components/IssueStatusBadge'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Issue, Status } from '@prisma/client'
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

export interface IssueQuery {
    status: Status
    orderBy: keyof Issue
    page: string
}

interface Props {
    data: any[]
    loading?: boolean
    searchParams?: IssueQuery
}

const CustomTable = ({ data, loading, searchParams }: Props) => {
    const columns: ColumnsType<DataType> = [
        {
            title: (
                <HeaderLink searchParams={searchParams} columnName={'title'}>
                    Title
                </HeaderLink>
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
                <HeaderLink searchParams={searchParams} columnName={'status'}>
                    Status
                </HeaderLink>
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
                    searchParams={searchParams}
                    columnName={'createdAt'}
                >
                    Created
                </HeaderLink>
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
            pagination={false}
        />
    )
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

export const columnsTitle = skeletonColumn.map((column) => column.key)

export default CustomTable
