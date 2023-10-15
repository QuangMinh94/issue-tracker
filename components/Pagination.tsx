import {
    faAngleDoubleLeft,
    faAngleDoubleRight,
    faAngleLeft,
    faAngleRight,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Flex } from 'antd'

interface Props {
    itemCount: number
    pageSize: number
    currentPage: number
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
    const pageCount = Math.ceil(itemCount / pageSize)
    if (pageCount <= 1) return null
    return (
        <Flex align="center" gap={3}>
            <p>
                Page {currentPage} of {pageCount}
            </p>
            <Button disabled={currentPage === 1}>
                <FontAwesomeIcon icon={faAngleDoubleLeft} />
            </Button>
            <Button disabled={currentPage === 1}>
                <FontAwesomeIcon icon={faAngleLeft} />
            </Button>
            <Button disabled={currentPage === pageCount}>
                <FontAwesomeIcon icon={faAngleRight} />
            </Button>
            <Button disabled={currentPage === pageCount}>
                <FontAwesomeIcon icon={faAngleDoubleRight} />
            </Button>
        </Flex>
    )
}

export default Pagination
