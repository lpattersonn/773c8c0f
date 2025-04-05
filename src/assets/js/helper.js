// utils/formatters.js

// Formats seconds into human-readable duration
export function formatDuration(seconds) {
    if (seconds === 0) return '0 seconds';

    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    const parts = [];
    if (hrs > 0) parts.push(`${hrs} ${hrs === 1 ? 'hour' : 'hours'}`);
    if (mins > 0) parts.push(`${mins} ${mins === 1 ? 'minute' : 'minutes'}`);
    if (secs > 0) parts.push(`${secs} ${secs === 1 ? 'second' : 'seconds'}`);

    return parts.join(', ');
}
  
  // Formats a phone number to readable string
export function formatPhoneNumber(phoneNumber) {
    if (!phoneNumber) return 'Unknown';

    const cleaned = String(phoneNumber).replace(/\D/g, '');

    if (cleaned.length === 11 && cleaned.startsWith('1')) {
        const country = cleaned[0];
        const area = cleaned.slice(1, 4);
        const central = cleaned.slice(4, 7);
        const line = cleaned.slice(7);
        return `+${country} (${area}) ${central}-${line}`;
    }

    return cleaned;
}
  