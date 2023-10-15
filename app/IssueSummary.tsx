import { Status } from '@prisma/client'
import { Card, Flex } from 'antd'
import Link from 'next/link'

interface Props {
    open: number
    inProgress: number
    closed: number
}

const IssueSummary = ({ open, inProgress, closed }: Props) => {
    const containers: { label: string; value: number; status: Status }[] = [
        {
            label: 'Open Issues',
            value: open,
            status: 'OPEN',
        },
        {
            label: 'In progress Issues',
            value: inProgress,
            status: 'IN_PROGRESS',
        },
        {
            label: 'Closed Issues',
            value: closed,
            status: 'CLOSED',
        },
    ]
    return (
        <Flex gap={8}>
            {containers.map((container) => (
                <Card key={container.label}>
                    <Flex vertical gap={2}>
                        <Link
                            className="text-black hover:text-black text-sm font-medium"
                            href={`/issues?status=${container.status}`}
                        >
                            {container.label}
                        </Link>
                        <p className="font-bold text-lg">{container.value}</p>
                    </Flex>
                </Card>
            ))}
        </Flex>
    )
}

export default IssueSummary
