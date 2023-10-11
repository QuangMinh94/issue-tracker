import { Button } from "antd";
import Link from "next/link";

const IssueActions = () => {
    return (
        <div className="mb-5">
            <Button type='primary'
                className="bg-blue-500">
                <Link href='/issues/new'>
                    New issue
                </Link>
            </Button>
        </div>
    )
}

export default IssueActions