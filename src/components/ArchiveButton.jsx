import React from 'react';

const ArchiveButton = ({ onArchive, isArchived }) => {
  return (
    <button onClick={onArchive} className="archive-button">
      {isArchived ? 'Unarchive All' : 'Archive All'}
    </button>
  );
};

export default ArchiveButton;
