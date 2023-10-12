'use client'

import { Button, Modal } from 'antd';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
    const router = useRouter()
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const showModal = () => {
        setOpen(true);
    };

    const handleDelete = async () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setOpen(false);
        }, 3000);

        await axios.delete('/api/issues/' + issueId)
        router.push('/issues')
        router.refresh()
    };

    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <>
            <Button className='w-full' type='primary' danger onClick={showModal}>Delete issue</Button>
            <Modal title="Warning"
                open={open}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" type='primary' className='bg-gray-500' onClick={handleCancel}>
                        Back
                    </Button>,
                    <Button key="submit"
                        type="primary"
                        className='bg-red-700'
                        loading={loading}
                        onClick={handleDelete}>
                        Delete issue
                    </Button>,
                ]}>
                <p>Are your sure want to delete this issue? This action cannot be undone</p>
            </Modal>
        </>
    )
}

export default DeleteIssueButton