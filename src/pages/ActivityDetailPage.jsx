import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom'
import { fetchActivitiesDetails } from '../api/activityApi';

const ActivityDetailPage = () => {
    const { id } = useParams();
    const [activity, setActivity] = useState([]);

    useEffect(() => {
        const getActivityDetails = async () => {
            const data = await fetchActivitiesDetails(id);
            setActivity(data);
        };

        getActivityDetails();
    }, [id])

    return (
        <div className="activity-details">
            {activity ? (
                <div>
                    <h2>Actiivty Detail</h2>
                    <p><strong>From:</strong> {activity.from}</p>
                    <p><strong>To:</strong> {activity.to}</p>
                    <p><strong>Duration:</strong> {activity.duration}</p>
                    <p><strong>Call Type:</strong> {activity.call_type}</p>
                    <p><strong>Direction:</strong> {activity.direction}</p>
                </div>
            ) :
            (
                <p>Loading...</p>
            )
            }
        </div>
    );
};

export default ActivityDetailPage;