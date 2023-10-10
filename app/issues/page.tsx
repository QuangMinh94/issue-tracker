import CustomTable from "@/components/CustomTable";
import prisma from "@/prisma/client";
import { Button } from "@mui/material";
import Link from "next/link";

const IssuesPage = async () => {
    const issues = await prisma.issue.findMany();
    const rows: any[] = []
    issues.forEach((issue) => {
        rows.push({
            key: issue.id,
            issue: issue.title,
            status: issue.status,
            createdAt: issue.createdAt.toDateString()
        })
    })
    return (
        <>
            <div className="mb-5">
                <Button variant="contained"
                    className="bg-blue-500">
                    <Link href='/issues/new'>
                        New issue
                    </Link>
                </Button>
            </div>
            <div>
                <CustomTable data={rows}></CustomTable>
            </div>
        </>
    )
}

export default IssuesPage