// import LoadingModal from "../components/LoadingModal";

// const Loading = () => {
//   return ( 
//     <LoadingModal />
//    );
// }
 
// export default Loading;
import React from 'react';

const LoadingModal: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded shadow-lg">
        <p>Loading...</p>
      </div>
    </div>
  );
};

export default LoadingModal;
