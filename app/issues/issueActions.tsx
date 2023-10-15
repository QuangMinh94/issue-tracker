import { Button, Flex } from 'antd'
import Link from 'next/link'
import IssueStatusFilter from './IssueStatusFilter'

const IssueActions = () => {
    return (
        <Flex className="mb-5" justify="space-between">
            <IssueStatusFilter />
            <Button type="primary" className="bg-blue-500">
                <Link href="/issues/new">New issue</Link>
            </Button>
        </Flex>
    )
}

export default IssueActions
