import { Flex, Progress, Typography } from 'antd';
import { useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { WarningOutlined } from '@ant-design/icons';

const DURATION = 2;
const STEP_DURATION = DURATION / 10;
const TOUT = DURATION * 100;
const { Text, Title } = Typography;

export default function PageError() {
    const navigate = useNavigate();
    const [seconds, setSeconds] = useState(0);
    const percent = seconds / DURATION * 100;

    if(seconds >= DURATION) {
        setTimeout(() => navigate('/'), TOUT);
    }

    useLayoutEffect(() => {
        const id = setInterval(() => setSeconds((prev) => {
            const time = prev + STEP_DURATION;

            if(time >= DURATION) {
                clearInterval(id);
            }

            return time;
        }), TOUT);
        return () => clearInterval(id);
    }, []);

    return (
        <Flex className="full-h" gap={10} justify="center" vertical wrap>
            <Title type="danger">
                <WarningOutlined style={{ marginRight: '10px' }} /><span>An error has occurred!</span>
            </Title>
            <Text strong>You will be redirected to the main page in a few seconds...</Text>
            <Progress 
                percent={percent} 
                showInfo={false}
                size="small"
                strokeWidth={10} 
                type="circle"
            ></Progress>
        </Flex>
    );
}