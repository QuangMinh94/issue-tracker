import { Button } from "@mui/material";
import Link from "next/link";

const IssueActions = () => {
    return (
        <div className="mb-5">
            <Button variant="contained"
                className="bg-blue-500">
                <Link href='/issues/new'>
                    New issue
                </Link>
            </Button>
        </div>
    )
}

export default IssueActions