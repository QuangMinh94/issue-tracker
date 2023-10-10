import CustomTable from "@/app/issues/CustomTable";
import prisma from "@/prisma/client";
import delay from 'delay';
import IssueActions from "./issueActions";

const IssuesPage = async () => {
    const issues = await prisma.issue.findMany();
    await delay(2000)
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
            <IssueActions />
            <div>
                {issues &&
                    <CustomTable data={rows}></CustomTable>
                }
            </div>
        </>
    )
}

export default IssuesPage