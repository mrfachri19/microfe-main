import React from 'react';
import image from "@src/assets/icons/halaman-kosong.svg";

export default function HalamanKosong({ text }) {

    return (
        <div className="w-100 align-middle my-10">
            <div className="d-grid justify-content-center">
                <span className="w-98 h-98 max-h-98" style={{width:"28.125rem", height:"28.125rem", maxHeight:"28.125rem"}}>
                    <img
                        alt="..."
                        // className="w-98 h-98 align-middle"
                        style={{width:"28.125rem", height:"28.125rem"}}
                        src={image}
                    />
                </span>
                <div className="text-center text-tertiary-500 fw-bolder fs-7 pt-10">
                    {text}
                </div>
            </div>
        </div>
    );
}