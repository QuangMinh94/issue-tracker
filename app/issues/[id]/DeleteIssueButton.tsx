import { Button } from 'antd'

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
    return (
        <Button className='w-full' type='primary' danger>Delete issue</Button>
    )
}

export default DeleteIssueButton