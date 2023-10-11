'use client'

import { Card, Skeleton } from 'antd'

const IssueFormSkeleton = () => {
    return (
        <Card className="max-w-xl">
            <Skeleton.Input active={true} />
            <Skeleton />
        </Card>
    )
}

export default IssueFormSkeleton