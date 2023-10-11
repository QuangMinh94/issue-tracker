'use client'

import { Card, Skeleton } from "antd"

const LoadingNewIssuePage = () => {
    return (
        <Card className="max-w-xl">
            <Skeleton.Input active={true} />
            <Skeleton />
        </Card>
    )
}

export default LoadingNewIssuePage