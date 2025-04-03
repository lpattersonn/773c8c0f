// Get all Activities
export const fetchActivities = async () => {
    const response = await fetch('https://aircall-api.onrender.com/activities');
    const data = await response.json();
    return data;
}

// Get details for a specific activity
export const fetchActivitiesDetails = async (id) => {
    const response = await fetch(`https://aircall-api.onrender.com/activities/${id}`)
    const data = await response.json();
    return data;
}