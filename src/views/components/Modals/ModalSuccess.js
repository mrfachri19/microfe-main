import React, { useEffect } from "react";
import Modal from ".";
import { useDispatch, useSelector } from "react-redux";
import { Info24Regular } from "@fluentui/react-icons";

export default function SuccessModal({text}) {
    const dispatch = useDispatch();
    const { isValidationModal } = useSelector((state) => state);
    const { isValidationModalYes } = useSelector((state) => state);

    useEffect(() => {
        dispatch({ type: "set", isValidationModalYes: false });
    }, [1]);

    function closeModal() {
        dispatch({ type: "set", isValidationModalYes: false });
    }

    return (
        <>
            {isValidationModalYes ? (
                <Modal>
                    <div className="relative my-6 mx-auto max-w-3xl">
                        <div className="border-0 rounded-lg shadow-e3 relative px-12 flex flex-col w-full bg-white outline-none focus:outline-none">
                            <div className="text-center mt-8 fw-bold text-green-500 text-2xl">
                                <span className="pr-5">
                                    <Info24Regular color="#38B2AC" />
                                </span>
                                {text}
                            </div>
                            <div className="text-center mt-5 mb-14 grid justify-items-center">
                                <img
                                    alt="..."
                                    src={
                                        process.env.REACT_APP_API_URL_MAINAPP +
                                        "/assets/icons/success-fwa.svg"
                                    }
                                    className={"w-72"}
                                ></img>{" "}
                            </div>
                            <div className="w-full mb-8 grid justify-items-center">
                                <button
                                    type="button"
                                    className=" bg-green-600 w-32 h-9 px-2 py-1 rounded-lg"
                                    onClick={(() => {
                                        dispatch({ type: "set", isValidationModalYes: false });
                                    })}
                                >
                                    <span className="text-white fw-bold text-base">OK</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </Modal>
            ) : null}
        </>
    );
}