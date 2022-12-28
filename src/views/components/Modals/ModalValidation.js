import React from "react";
import Modal from ".";
import { Info24Regular } from "@fluentui/react-icons";
import PropTypes from 'prop-types';

export default function ValidationModal(props) {
    const { text, approveButton, cancelButton } = props;


    return (
        <>
            <Modal>
                <div className="relative my-6 mx-auto max-w-xl">
                    <div className="border-0 rounded-lg shadow-e3 relative px-12 flex flex-col w-full bg-white outline-none focus:outline-none">
                        <div className="text-center mt-8 fw-bold text-2xl">
                            <span className="pr-5">
                                <Info24Regular color="#1A202C" />
                            </span>
                            Apakah Kamu Yakin?
                        </div>
                        <div className="text-center my-20 text-xl fw-bold">
                            {text}
                        </div>
                        <div className="w-full mb-20 grid justify-items-center">
                            <button
                                type="button"
                                className=" bg-green-600 w-72 h-9 px-2 py-1 rounded-lg"
                                onClick={approveButton}
                            >
                                <span className="text-white fw-bold text-base">Iya</span>
                            </button>
                            <div className="pt-3">
                                <button
                                    type="button"
                                    className=" bg-green-100 w-72 h-9 px-2 py-1 rounded-lg"
                                    onClick={cancelButton}
                                >
                                    <span className="text-green-600 fw-bold text-base">Batal</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
}

ValidationModal.defaultProps = {
    text: '',
    cancelButton: () => { },
    approveButton: () => { },
};

ValidationModal.propTypes = {
    text: PropTypes.string,
    cancelButton: PropTypes.func,
    approveButton: PropTypes.func,
};
