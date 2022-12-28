import React from "react";
import PropTypes from 'prop-types';
import Skeleton from "../Content/Skeleton";
import ProfileTeam from "../grid/ProfileTeam";

export default function SkeletonMyTeam(props) {
  let { okrPosition } = props;
  
  function renderSkeletonPerson(withTitle = true){
    return (
      <>
      <Skeleton className={"w-20 h-5 my-3 block rounded-lg "+(withTitle?"":"hidden")} />
      <ProfileTeam className="px-2">
        <Skeleton className="w-16 h-16 mb-auto rounded-full" />
        <div className={`ml-8 mr-4 pt-2 ${okrPosition=="side" ? "lg:grid lg:grid-cols-[1fr,_13.5rem]":""}`}>
          <div>
            <Skeleton className="w-36 h-5 rounded-lg block"/>
            <Skeleton className="w-32 h-5 rounded-lg block mt-3"/>
          </div>
          <Skeleton className={`${okrPosition=="hidden" ? okrPosition:"block"} w-16 h-6 block mt-3 rounded-lg ${okrPosition=="bottom" ? "mt-3":""}`}/>
        </div>
        <div className="flex justify-items-center justify-end">
          <div className="relative flex flex-row m-auto">
            <Skeleton className="block w-24 rounded-lg h-6" />
          </div>
          <div className="relative flex m-auto">
            <Skeleton className="w-1 h-6 rounded-md" />
          </div>
        </div>
      </ProfileTeam>
      </>
    )
  }

  return (
    <div>
      {renderSkeletonPerson()}
      {renderSkeletonPerson()}
      {renderSkeletonPerson(false)}
      {renderSkeletonPerson(false)}
      {renderSkeletonPerson(false)}
    </div>
  );
}

SkeletonMyTeam.defaultProps = {
  okrPosition: "hidden", //side or bottom
};

SkeletonMyTeam.propTypes = {
  okrPosition: PropTypes.string,
};
