import Pagination from '@/components/Pagination'
import '@fortawesome/fontawesome-svg-core/styles.css'
export default function Home() {
    return <Pagination itemCount={100} currentPage={10} pageSize={10} />
}
