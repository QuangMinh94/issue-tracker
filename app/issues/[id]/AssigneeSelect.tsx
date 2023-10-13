'use client'

import { User } from '@prisma/client'
import { Select } from 'antd'
import axios from 'axios'
import { useEffect, useState } from 'react'

const AssigneeSelect = () => {
    //const [users, setUsers] = useState<User[]>([])
    const [option, setOptions] = useState<any[]>([])

    useEffect(() => {
        const fetchUser = async () => {
            const { data } = await axios.get<User[]>('/api/users')
            const _option: any[] = []
            data.forEach((user) => {
                _option.push({ label: user.name, value: user.id })
            })
            setOptions(_option)
        }
        fetchUser()
    }, [])

    return (
        <Select
            className='w-full'
            placeholder='Select'
            //defaultValue="lucy"
            //style={{ width: 120 }}
            //onChange={handleChange}
            options={option}
        />
    )
}

export default AssigneeSelect