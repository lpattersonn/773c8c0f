import { useState, useEffect } from 'react';
import { fetchActivities } from '../api/activityApi';


const useActivities = () => {
// Custom hook to manage actiivity fetching and updating
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getActivities = async () => {
      const data = await fetchActivities();
      setActivities(data);
      setLoading(false);
    };

    getActivities();
  }, []);

  const updateActivity = (id) => {
    setActivities(prevActivities =>
      prevActivities.map(activity =>
        activity.id === id ? { ...activity, is_archived: !activity.is_archived } : activity
      )
    );
  };

  return { activities, loading, updateActivity };
};

export default useActivities;
