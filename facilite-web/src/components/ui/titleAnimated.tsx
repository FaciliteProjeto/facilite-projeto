import React, { useState, useEffect } from "react";

type MessageProps = {
  message: string;
};

const MessageEffect = ({ message, ...rest }: MessageProps) => {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    setShowMessage(true);
  }, []);

  return (
    <div
      className={` text-gray-800 p-2 text-start w-2/4 transition-all duration-1000 
        ${showMessage ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
    >
      <h2 className="text-xl font-abel font-bold text-gray-500">{message}</h2>
    </div>
  );
};

export default MessageEffect;
