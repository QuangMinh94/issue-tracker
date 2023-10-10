import { Button } from "@mui/material"
import Link from "next/link"

const IssuesPage = () => {
    return (
        <div>

            <Button variant="contained"
                className="bg-blue-500">
                <Link href='/issues/new'>
                    New issue
                </Link>
            </Button>
        </div>
    )
}

export default IssuesPage