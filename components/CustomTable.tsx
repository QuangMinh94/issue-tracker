'use client'

import type { ColumnsType, TableProps } from 'antd/es/table';
import Table from 'antd/es/table';

interface DataType {
    key: React.Key;
    issue: string;
    status: number;
    createdAt: string;
}

interface Props {
    data: any[]
}

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
                <div className='block md:hidden'>{record.status}</div>
            </span>
        },
    },
    {
        title: 'Status',
        dataIndex: 'status',
        //defaultSortOrder: 'descend',
        sorter: (a, b) => a.status - b.status,

        responsive: ['md']
    },
    {
        title: 'Created',
        dataIndex: 'createdAt',

        responsive: ['md']
    },
];



const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
};

const CustomTable = ({ data }: Props) => <Table columns={columns} dataSource={data} onChange={onChange} />

export default CustomTable