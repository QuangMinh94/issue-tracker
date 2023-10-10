'use client'

import { Status } from '@prisma/client';
import { Skeleton } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Table from 'antd/es/table';
import IssueStatusBadge from '../../components/IssueStatusBadge';

interface DataType {
    key: React.Key;
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
            return <Skeleton.Input active={true} />
        }
    },
    {
        title: 'Status',
        dataIndex: 'status',
        //defaultSortOrder: 'descend',
        sorter: (a, b) => a.status.length - b.status.length,
        responsive: ['md'],
        render() {
            return <Skeleton.Input active={true} />
        }
    },
    {
        title: 'Created',
        dataIndex: 'createdAt',
        responsive: ['md'],
        render() {
            return <Skeleton.Input active={true} />
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
            return <span>{record.issue}
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