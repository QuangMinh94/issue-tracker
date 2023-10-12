'use client'

import { Button, Modal } from 'antd';
import { useState } from 'react';

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const showModal = () => {
        setOpen(true);
    };

    const handleOk = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setOpen(false);
        }, 3000);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <>
            <Button className='w-full' type='primary' danger onClick={showModal}>Delete issue</Button>
            <Modal title="Warning"
                open={open}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" type='primary' className='bg-gray-500' onClick={handleCancel}>
                        Back
                    </Button>,
                    <Button key="submit"
                        type="primary"
                        className='bg-red-700'
                        loading={loading}
                        onClick={handleOk}>
                        Delete issue
                    </Button>,
                ]}>
                <p>Are your sure want to delete this issue? This action cannot be undone</p>
            </Modal>
        </>
    )
}

export default DeleteIssueButton