import { useNavigate } from 'react-router';
import { useAnimateText } from '../hooks/useAnimateText';

function welcomeMessage() {
    const hours = new Date().getHours();
    const getMessage = (timeOf: string) => `Good ${timeOf}!`;

    if (hours < 6) {
        return getMessage('night');
    } else if (hours < 12) {
        return getMessage('morning');
    } else if (hours < 18) {
        return getMessage('day');
    }
    return getMessage('evening');
}

export default function WelcomeScreen() {
    const navigate = useNavigate();
    const message = welcomeMessage();
    const text = useAnimateText(message, 150, () => navigate('/users'));

    return (
        <div className="main-box">
            <h2>{text}</h2>
        </div>
    );
}
