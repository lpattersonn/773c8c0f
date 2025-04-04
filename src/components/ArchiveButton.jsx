import React from 'react';

const ArchiveButton = ({ onArchive, isArchived }) => {
  return (
    <button onClick={onArchive} className="archive-button">
      {isArchived ? (
        <> 
          <i class="bi bi-file-earmark-zip-fill"></i> Unarchive Selected
        </>
      ) : (
        <>
          <i className="bi bi-archive-fill"></i> Archive Selected
        </>
      )}
    </button>
  );
};

export default ArchiveButton;
