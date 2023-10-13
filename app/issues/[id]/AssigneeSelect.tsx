'use client'

import { Select } from 'antd'

const AssigneeSelect = () => {
    return (
        <Select
            className='w-full'
            placeholder='Select'
            //defaultValue="lucy"
            //style={{ width: 120 }}
            //onChange={handleChange}
            options={[
                { value: 'jack', label: 'Jack' },
                { value: 'lucy', label: 'Lucy' },
                { value: 'Yiminghe', label: 'yiminghe' },
                { value: 'disabled', label: 'Disabled', disabled: true },
            ]}
        />
    )
}

export default AssigneeSelect