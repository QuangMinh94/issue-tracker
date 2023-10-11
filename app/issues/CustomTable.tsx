'use client'

import CustomLink from '@/components/CustomLink';
import IssueStatusBadge from '@/components/IssueStatusBadge';
import { Status } from '@prisma/client';
import { Skeleton } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Table from 'antd/es/table';

interface DataType {
    key: React.Key;
    id: string;
    issue: string;
    status: Status;
    createdAt: Date;
}

interface Props {
    data: any[],
    loading?: boolean
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
            return <Skeleton.Input active={true} className='w-fit' />
        }
    },
    {
        title: 'Status',
        dataIndex: 'status',
        //defaultSortOrder: 'descend',
        sorter: (a, b) => a.status.length - b.status.length,
        responsive: ['md'],
        render() {
            return <Skeleton.Input active={true} className='w-fit' />
        }
    },
    {
        title: 'Created',
        dataIndex: 'createdAt',
        responsive: ['md'],
        render() {
            return <Skeleton.Input active={true} className='w-fit' />
        }
    },
];

const columns: ColumnsType<DataType> = [
    {
        title: 'Issue',
        dataIndex: 'issue',
        // specify the condition of filtering result
        // here is that finding the name started with `value`
        sorter: (a, b) => a.issue.length - b.issue.length,
        //sortDirections: ['descend'],
        render(_value, record, _index) {
            return <span>
                <CustomLink href={`/issues/${record.id}`}>
                    {record.issue}
                </CustomLink>
                <div className='block md:hidden'>
                    <IssueStatusBadge status={record.status} /></div>
            </span>
        },
    },
    {
        title: 'Status',
        dataIndex: 'status',
        //defaultSortOrder: 'descend',
        sorter: (a, b) => a.status.length - b.status.length,
        responsive: ['md'],
        render(_value, record, _index) {
            return <IssueStatusBadge status={record.status} />
        },
    },
    {
        title: 'Created',
        dataIndex: 'createdAt',

        responsive: ['md']
    },
];



const CustomTable = ({ data, loading }: Props) => <Table columns={loading ? skeletonColumn : columns} dataSource={data} />

export default CustomTable