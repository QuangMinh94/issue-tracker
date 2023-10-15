'use client'

import {
    faAngleDoubleLeft,
    faAngleDoubleRight,
    faAngleLeft,
    faAngleRight,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Flex } from 'antd'
import { useRouter, useSearchParams } from 'next/navigation'

interface Props {
    itemCount: number
    pageSize: number
    currentPage: number
}

const Pagination = ({ itemCount, pageSize, currentPage }: Props) => {
    const pageCount = Math.ceil(itemCount / pageSize)
    const router = useRouter()
    const searchParams = useSearchParams()

    if (pageCount <= 1) return null

    const changePage = (page: number) => {
        const params = new URLSearchParams(searchParams)
        params.set('page', page.toString())
        router.push('?' + params.toString())
    }

    return (
        <Flex align="center" gap={3}>
            <p>
                Page {currentPage} of {pageCount}
            </p>
            <Button disabled={currentPage === 1} onClick={() => changePage(1)}>
                <FontAwesomeIcon icon={faAngleDoubleLeft} />
            </Button>
            <Button
                disabled={currentPage === 1}
                onClick={() => changePage(currentPage - 1)}
            >
                <FontAwesomeIcon icon={faAngleLeft} />
            </Button>
            <Button
                disabled={currentPage === pageCount}
                onClick={() => changePage(currentPage + 1)}
            >
                <FontAwesomeIcon icon={faAngleRight} />
            </Button>
            <Button
                disabled={currentPage === pageCount}
                onClick={() => changePage(pageCount)}
            >
                <FontAwesomeIcon icon={faAngleDoubleRight} />
            </Button>
        </Flex>
    )
}

export default Pagination
