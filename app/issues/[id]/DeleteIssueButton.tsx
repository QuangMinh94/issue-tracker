'use client'

import { Button, Modal } from 'antd';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
    const router = useRouter()
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(false)

    const showModal = () => {
        setOpen(true);
    };

    const handleDelete = async () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setOpen(false);
        }, 3000);
        try {
            //throw new Error()
            await axios.delete('/api/issues/' + issueId)
            router.push('/issues')
            router.refresh()
        }
        catch (error) {
            setOpen(false)
            setError(true)
        }
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
            <Modal title="Error"
                open={error}
                onCancel={() => setError(false)}
                footer={[
                    <Button key="back" type='primary'
                        className='bg-gray-500'
                        onClick={() => setError(false)}>
                        Ok
                    </Button>,
                ]}>
                <p>This issue cannot be deleted</p>
            </Modal>
        </>
    )
}

export default DeleteIssueButton