import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from 'antd'
import Link from 'next/link'

const EditIssueButton = ({ issueId }: { issueId: number }) => {
    return (
        <Button type='primary'
            icon={<FontAwesomeIcon icon={faEdit} spin={true} />}
            className="bg-blue-500 w-full">
            <Link href={`/issues/${issueId}/edit`}>Edit issue</Link>
        </Button>
    )
}

export default EditIssueButton