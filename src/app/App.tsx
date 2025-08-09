import { Spin } from 'antd';
import { Outlet, useNavigation } from 'react-router';
import { LoadingOutlined } from '@ant-design/icons';
import './App.css';

function App() {
    const navigation = useNavigation();
    const isNavigating = !!navigation.location;

    return (
        <Spin
            indicator={<LoadingOutlined spin />}
            size="large"
            spinning={isNavigating}
        >
            <Outlet></Outlet>
        </Spin>
    );
}

export default App;
