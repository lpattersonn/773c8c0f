import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ActivityContext } from '../context/ActivityContext';
import ArchiveButton from '../components/ArchiveButton';
import ActivityCard from '../components/ActivityCard';

const ActivityFeed = () => {
  const { activities, loading, archiveActivity, archiveAllActivities, isAllArchived } = useContext(ActivityContext);

  return (
    <>
    <div className="container">
      {/* <div className="row">
        <div className="col-12"> */}
          {/* <ArchiveButton onArchive={archiveAllActivities} isArchived={isAllArchived} /> */}
        {/* </div>
        <div className="col-12"> */}
          <div className="activity-list">
            {loading ? (
              <p>Loading...</p>
            ) : activities.length === 0 ? (
              <p>No activities available.</p>
            ) : (
              activities
                .filter(activity => !activity.is_archived) // Only show non-archived activities
                .map(activity => (
                  // <div key={activity.id} onClick={() => archiveActivity(activity.id)}>
                  // <Link key={activity.id} to={`/activity/:${activity.id}`}>
                    <ActivityCard activity={activity} />
                  // </Link>
                ))
            )}
          </div>
        {/* </div>
      </div> */}
      </div>
    </>
  );
};

export default ActivityFeed;
