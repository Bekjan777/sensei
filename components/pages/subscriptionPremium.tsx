import React from 'react';
import {Button} from "@/components/ui/button";

const SubscriptionBasic = ({color }) => {
  return (
    <div className="relative w-full h-[300px] border-[2px] border-black rounded-xl flex flex-col overflow-hidden">
      <div className="flex flex-col items-center h-full w-full">
        <div className="flex bg-black flex-col items-center justify-center w-full">
          <div className="flex text-white flex-col items-center justify-center my-1 w-full">
            <h1 className="text-2xl font-bold">Basic</h1>
            <p>plan</p>
          </div>
          <div className="w-full h-[1px] bg-black opacity-25"></div>
        </div>
        <div className="w-full flex flex-col justify-between h-full px-5 pb-5">
          <div className="h-full flex flex-col justify-center">
            <p>• Lorem ipsum dolor sit ame</p>
            <p>• Lorem ipsum dolor sit ame</p>
            <p>• Lorem ipsum dolor sit ame</p>
          </div>
          <Button className="w-full">To Purchase</Button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionBasic;