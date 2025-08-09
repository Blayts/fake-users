import { Button, FloatButton, Table } from 'antd';
import type { TableColumnProps, TableProps } from 'antd';
import { useCallback } from 'react';
import { useNavigate, useLoaderData, useSubmit } from 'react-router';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { UserModel } from '../models/user';

const baseColumns: TableColumnProps[] = [
    {
        dataIndex: 'email',
        title: 'Email'
    },
    {
        dataIndex: 'username',
        title: 'Username'
    },
    {
        
        dataIndex: 'name',
        render: (value) => value.fullname,
        title: 'Name'
    },
    {
        
        dataIndex: 'address',
        render: (value) => value.fulladdress,
        title: 'Address'
    },
    {
        dataIndex: 'phone',
        title: 'Phone'
    }    
];

export default function UserList() {    
    const navigate = useNavigate();
    const submit = useSubmit();

    const data = useLoaderData<UserModel[]>();

    const remove = useCallback((id: number) => {
        submit({ id }, { method: 'DELETE' });
    }, []);
    const columns: TableColumnProps[] = [
        ...baseColumns,
        {
            dataIndex: 'delete',
            render(_, record) {
                return (
                    <Button 
                        color="danger"
                        onClick={(e) => (e.stopPropagation(), remove(record.id))}
                        icon={ <DeleteOutlined style={{ fontSize: '16px' }}></DeleteOutlined> }
                        variant="link"
                    ></Button>
                )
            },
            width: 80
        }
    ];
    const onRow: TableProps['onRow'] = (record) => ({
        onClick: () => navigate('/users/' + record.id),
        style: { cursor: 'pointer' }
    });

    function handleClickNew() {
        navigate('/users/add');
    }

    return (
        <>
            <Table 
                columns={columns} 
                dataSource={data} 
                onRow={onRow} 
                rowKey={(record) => record.id}
                sticky 
            ></Table>
            <FloatButton 
                icon={<PlusOutlined />} 
                onClick={handleClickNew}
                style={{ top: '7px' }} 
                tooltip="Add user"
                type="primary"
            ></FloatButton>
        </>
    )
}