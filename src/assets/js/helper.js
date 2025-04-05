// Format phone number to be human readable
export const formatPhoneNumber = (phoneNumber) => {
    if (!phoneNumber) return 'Unknown';
  
    // Convert to string safely
    const cleaned = String(phoneNumber).replace(/\D/g, '');
  
    if (cleaned.length === 11 && cleaned.startsWith('1')) {
      const country = cleaned[0];
      const area = cleaned.slice(1, 4);
      const central = cleaned.slice(4, 7);
      const line = cleaned.slice(7);
      return `+${country} (${area}) ${central}-${line}`;
    }
  
    return cleaned;
  };
  
  
  export default formatPhoneNumber;