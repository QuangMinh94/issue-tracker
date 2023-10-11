import CustomTable from "@/app/issues/CustomTable";
import prisma from "@/prisma/client";
import IssueActions from "./issueActions";

const IssuesPage = async () => {
    const issues = await prisma.issue.findMany();
    const rows: any[] = []
    issues.forEach((issue) => {
        rows.push({
            key: issue.id,
            id: issue.id,
            issue: issue.title,
            status: issue.status,
            createdAt: issue.createdAt.toDateString()
        })
    })
    return (
        <>
            <IssueActions />
            <div>
                {issues &&
                    <CustomTable data={rows}></CustomTable>
                }
            </div>
        </>
    )
}

export const dynamic = 'force-dynamic'

/* export const revalidate = 60 */

export default IssuesPage