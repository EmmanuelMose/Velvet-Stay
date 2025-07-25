import React from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  onClose?: () => void; 
}

const LogoutModal: React.FC<Props> = ({ }) => {
  const navigate = useNavigate();

  const handleYes = () => {
    localStorage.removeItem("token");
    navigate("/"); 
  };

  const handleNo = () => {
   
    navigate("/admin/dashboard"); 
  };

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      <div className="absolute top-6 right-6 bg-white text-black p-4 rounded-md shadow-xl w-64 text-center border pointer-events-auto">
        <h2 className="text-base font-medium mb-3">Are you sure you want to logout?</h2>
        <div className="flex justify-center gap-3">
          <button
            onClick={handleYes}
            className="bg-blue-600 hover:bg-blue-800 text-white px-3 py-1 rounded text-sm"
          >
            Yes
          </button>
          <button
            onClick={handleNo}
            className="bg-blue-600 hover:bg-blue-800 text-white px-3 py-1 rounded text-sm"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
