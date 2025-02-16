import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import FlipClockCountdown from '@leenguyen/react-flip-clock-countdown';
import '@leenguyen/react-flip-clock-countdown/dist/index.css';
import headsImage from '../assets/heads.jpg';
import tailsImage from '../assets/tails.jpg';

function ViewSession() {
    const { token } = useParams();
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const shareableLink = `${window.location.origin}/session/${token}`;
    const hasTimeElapsed = session?.timestamp * 1000 <= Date.now();

    const fetchSession = async () => {
        try {
            const response = await fetch(`http://localhost:8080/session/${token}`);
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
        <div className="view-session">
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
                            <p>Coin Result: {session.coin_result}</p>
                            {session.coin_result == 'heads' ? (
                                <img src={headsImage} alt="Heads" />
                            ) : (
                                <img src={tailsImage} alt="Tails" />
                            )}
                        </>
                    )}
                    <p>Share this link: <a href={shareableLink}>{shareableLink}</a></p>
                </div>
            )}
        </div>
    );
}

export default ViewSession; 