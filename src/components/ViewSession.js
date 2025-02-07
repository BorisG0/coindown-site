import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

function ViewSession() {
    const { token } = useParams();
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
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

        fetchSession();
    }, [token]);

    const shareableLink = `${window.location.origin}/session/${token}`;

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
                    <p>Scheduled Time: {session.datetime}</p>
                    {session.coin_result && (
                        <p>Coin Result: {session.coin_result}</p>
                    )}
                    <p>Share this link: <a href={shareableLink}>{shareableLink}</a></p>
                </div>
            )}
        </div>
    );
}

export default ViewSession; 