import React, { useEffect, useState } from "react";
import Modal from ".";
import Ballontags from "../Ballon/Ballontags";
import Ballonwrapper from "../Ballon/Ballonwrapper";
import { useDispatch, useSelector } from "react-redux";
import { toTitleCase } from "../../utils/text";
import { noValue } from "../../utils/validateInput";

export default function DJMModal() {
  const dispatch = useDispatch();
  const { isJobdeskModal, 
    djmModalKey,
    djmModalTitle,
    djmModalSubtitle,
    djmModalSuggestion,
    djmModalDesc,
    djmModalDetails
  } = useSelector((state) => state);

  function chageContent(index, arr) {
    const v = arr[index];
    dispatch({ 
      type: "set", 
      djmModalKey: v.TEXT,
      djmModalTitle: toTitleCase(v.TEXT.replace(/_/g," ")),
      djmModalSubtitle: v.SUB,
      djmModalDesc: v.DETAILS,
    });
  }

  function renderList(val) {
    if (!noValue(val)) {
      return (
        <ul className={`text-tertiary-600 ${val.length<2?"list-none list-outside":"list-disc ml-6"}`}>
          {val.map((v, index) => {
            return (<li  key={`list-djm-modal-${index}`}  className="">{v}</li>)  
          })}
        </ul>
      )
    } else {
      return (<p className="text-black">-</p>);
    }
  }

  function renderTags(arr) {
    if (!noValue(arr)) {
      return (
        <Ballonwrapper className="mb-4">
          {arr.map((a, index) => {
            return (
            <Ballontags 
              key={`ballontags-suggestion-${index}`} 
              className={`cursor-${a.TEXT == djmModalKey?"context-menu":"pointer"}`} 
              selected={a.TEXT == djmModalKey} 
              onClick={()=>{chageContent(index, arr)}}
            >
              <div className="flex flex-row align-middle">
                <span className={`fw-bold text-base ${a.IS_CORE?"pr-2":""}`} >{toTitleCase(a.TEXT.replace(/_/g," "))}</span>
                <img
                  alt=""
                  src={process.env.REACT_APP_API_URL_MAINAPP + "/assets/icons/star-"+((a.TEXT == djmModalKey)?"white":"green")+".svg"}
                  className={`w-5 ${a.IS_CORE?"":"hidden"}`}
                  title="CORE"
                ></img>
              </div>
            </Ballontags>)  
          })}
        </Ballonwrapper>
      )
    } else {
      return (<p className="text-tertiary-600">-</p>);
    }
  }

  useEffect(() => {
    dispatch({ type: "set", isJobdeskModal: false });
  }, [1]);

  return (
    <>
      {isJobdeskModal ? (
        <Modal>
          <div className="relative my-6 mx-auto w-[80vw] lg:w-[60vw]">
            {/*content*/}
            <div className="border-0 rounded-lg shadow-e3 relative flex flex-col w-full bg-white outline-none focus:outline-none">
              {/*header*/}
              <div className="flex flex-wrap items-center bg-white border-b-2 border-tertiary-400 pl-7 py-5 rounded-t-lg">
                <div className="relative w-full pr-3 max-w-full flex-grow flex-1">
                  <span className="text-green-600 fw-bold text-2xl">
                    {djmModalTitle}
                  </span>
                  <span className="text-green-600 fw-bold text-base pl-3">
                    {toTitleCase(djmModalSubtitle)}
                  </span>
                </div>
                <div className="relative flex-row-reverse pr-7 cursor-pointer"
                  onClick={() => {
                    dispatch({ type: "set", isJobdeskModal: false });
                  }}>
                  <img
                    alt="..."
                    src={process.env.REACT_APP_API_URL_MAINAPP + "/assets/icons/dismiss-green.svg"}
                    className={"w-5"}
                  ></img>{" "}
                </div>
              </div>
              {/*body*/}
              <div className="px-7 py-5 grid">
                {renderTags(djmModalDetails)}
                {djmModalSuggestion ? (<div className="fw-bold text-lg pb-6">{djmModalSuggestion}</div>):null}
                {renderList(djmModalDesc)}
              </div>
            </div>
          </div>
        </Modal>
      ) : null}
    </>
  );
}