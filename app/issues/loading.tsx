import CustomTable from "@/app/issues/CustomTable"
import IssueActions from "./issueActions"

const LoadingIssuePage = () => {
    const data = [{
        key: 1,
        issue: 1,
        status: 1,
        createdAt: 1
    },
    {
        key: 2,
        issue: 1,
        status: 1,
        createdAt: 1
    }]
    return (
        <div>
            <IssueActions />
            <CustomTable data={data} loading={true} />
        </div>
    )
}

export default LoadingIssuePage