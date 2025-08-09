import { Button, Col, Form, Input, Row, Space } from 'antd';
import type { FormItemProps } from 'antd';
import isEqual from 'lodash/isEqual';
import { useLoaderData, useNavigate, useSubmit } from 'react-router';
import { UserOutlined } from '@ant-design/icons';
import { UserModel } from '../models/user';

const rules: Record<string, FormItemProps['rules']> = {
    email: [
        {
            message: 'Email must be filled',
            required: true
        },
        {
            validator(_, value: string) {
                const regex = /^\S+@\S+\.\S+$/;
                return regex.test(value) ? Promise.resolve(): Promise.reject('Incorrect format');
            }
        }
    ],
    firstname: [{
        message: 'Firstname must be filled',
        required: true
    }],
    lastname: [{
        message: 'Lastname must be filled',
        required: true
    }],
    username: [{
        message: 'Username must be filled',
        required: true
    }]
}

export default function UserForm() {
    const navigate = useNavigate();
    const submit = useSubmit();
    const user = useLoaderData<UserModel>();

    function back() {
        navigate(-1);
    }

    function handleSubmit(values: UserModel) {
        const target = {
            address: { ...user.address, ...values.address },
            email: values.email,
            name: { ...user.name, ...values.name },
            password: user.password,
            phone: values.phone,
            username: values.username,
        };

        if (!isEqual(UserModel.toJson(user), target)) {
            submit({ value: JSON.stringify(target) }, { method: 'POST' });
        } else {
            navigate('/users');
        }
    }

    return (
        <Form
            onFinish={handleSubmit}
            initialValues={user}
            labelCol={{ span: 4 }}
            style={{ paddingTop: '20px' }}
        >
            <Row>
                <Col offset={5}>
                    <div className="wrapper-user">
                        <UserOutlined></UserOutlined>
                    </div>
                </Col>
                <Col offset={1} flex={1}>
                    <Form.Item label="Email" name="email" rules={rules.email}>
                        <Input></Input>
                    </Form.Item>
                    <Form.Item label="Username" name="username" rules={rules.username}>
                        <Input></Input>
                    </Form.Item>
                    <Form.Item
                        label="Firstname"
                        name={['name', 'firstname']}
                        rules={rules.firstname}
                    >
                        <Input></Input>
                    </Form.Item>
                    <Form.Item
                        label="Lastname"
                        name={['name', 'lastname']}
                        rules={rules.lastname}
                    >
                        <Input></Input>
                    </Form.Item>
                    <Form.Item label="City" name={['address', 'city']}>
                        <Input></Input>
                    </Form.Item>
                    <Form.Item label="Street" name={['address', 'street']}>
                        <Input></Input>
                    </Form.Item>
                    <Form.Item label="Building" name={['address', 'number']}>
                        <Input></Input>
                    </Form.Item>
                    <Form.Item label="Phone" name="phone">
                        <Input></Input>
                    </Form.Item>
                    <Form.Item style={{ textAlign: 'start' }}>
                        <Space>
                            <Button htmlType="submit" type="primary">
                                Save
                            </Button>
                            <Button onClick={back}>Cancel</Button>
                        </Space>
                    </Form.Item>
                </Col>
                <Col span={5}></Col>
            </Row>
        </Form>
    );
}
