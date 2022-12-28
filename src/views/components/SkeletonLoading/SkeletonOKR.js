import React from "react";
import Skeleton from "../Content/Skeleton";

export default function SkeletonOKR() {
  
  function renderSkeleton(){
    return (
      <div className="relative w-full flex flex-row lg:flex-wrap pt-4 bg-white p-2 rounded-lg mb-4 border-2 border-slate-200 cursor-pointer hover:bg-grey-lighter">
        <div className="relative w-7/12 pl-4 flex-grow flex-1">
            <Skeleton className="h-6 w-32 rounded-lg" />
            <Skeleton className="h-4 w-20 rounded-lg mt-3" />
          </div>
          <div className="flex flex-row-reverse w-5/12">
            <div className="relative flex flex-row pr-2 lg:pr-4">
              <Skeleton className="w-14 h-14 mb-auto rounded-full" />
            </div>
            <div className="flex flex-col items-center pr-4 lg:pr-8">
              <Skeleton className="h-6 w-24 rounded-lg" />
              <Skeleton className="h-6 w-12 rounded-lg mt-3" />
            </div>
          </div>
      </div>
    )
  }

  return (
    <div className="mr-2">
      {renderSkeleton()}
      {renderSkeleton()}
      {renderSkeleton()}
      {renderSkeleton()}
    </div>
  );
}
