import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import FlipClockCountdown from '@leenguyen/react-flip-clock-countdown';
import '@leenguyen/react-flip-clock-countdown/dist/index.css';
import headsImage from '../assets/heads.jpg';
import tailsImage from '../assets/tails.jpg';
import LinkDisplay from './LinkDisplay';
import { Container } from '@mui/material';

function ViewSession() {
    const { token } = useParams();
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const shareableLink = `${window.location.origin}/session/${token}`;
    const hasTimeElapsed = session?.timestamp * 1000 <= Date.now();

    const fetchSession = async () => {
        try {
            const response = await fetch(process.env.REACT_APP_SERVER_URL + `/session/${token}`);
            if (!response.ok) {
                throw new Error('Session not found');
            }
            const data = await response.json();
            setSession(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSession();
    }, [token]);



    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }



    return (
        <Container maxWidth="md">
            <h2>Session Details</h2>
            {session && (
                <div>
                    <p>Scheduled Time: {new Date(session.timestamp * 1000).toLocaleString()}</p>
                    {hasTimeElapsed ? (
                        <>
                            <p>Time has passed</p>
                            {!session.coin_result && (
                                <button onClick={fetchSession}>
                                    Check Result
                                </button>
                            )}
                        </>
                    ) : (
                        <FlipClockCountdown
                            to={session.timestamp * 1000}
                            labels={['DAYS', 'HOURS', 'MINUTES', 'SECONDS']}
                            labelStyle={{ fontSize: 10 }}
                            onComplete={fetchSession}
                        />
                    )}
                    {session.coin_result && (
                        <>
                            <h3>Coin Result</h3>
                            <h1>{session.coin_result.toUpperCase()}</h1>
                            {session.coin_result === 'heads' ? (
                                <img src={headsImage} alt="Heads" />
                            ) : (
                                <img src={tailsImage} alt="Tails" />
                            )}
                        </>
                    )}
                    <LinkDisplay link={shareableLink} />
                </div>
            )}
        </Container>
    );
}

export default ViewSession; 