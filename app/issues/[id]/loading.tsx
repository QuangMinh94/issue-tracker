'use client'

import { Card, Skeleton, Space } from "antd"

const LoadingIssueDetailPage = () => {

    return (
        <Space direction="vertical" className="w-full">
            <Skeleton.Input active={true} className='w-fit' />
            <Space size={5} align='center' className="mb-2">
                <Skeleton.Input active={true} className='w-fit' />
                <Skeleton.Input active={true} className='w-fit' />
            </Space>
            <Card><Skeleton.Input active={true} className='w-fit' /></Card>
        </Space>
    )
}

export default LoadingIssueDetailPage