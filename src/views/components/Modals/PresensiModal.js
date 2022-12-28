import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from ".";
import Button from "../Button";

export default function PresensiModal() {
  const dispatch = useDispatch();
  const isPresensiModal = useSelector((state) => state.isPresensiModal);

  useEffect(() => {
    dispatch({ type: "set", isPresensiModal: false });
  }, []);

  function closeModal() {
    dispatch({ type: "set", isPresensiModal: false });
  }
  return (
    <>
      {isPresensiModal ? (
        <>
          <Modal closeModal={closeModal}>
            <div className="relative m-auto min-w-fit rounded-lg bg-white p-10">
              <img
                alt=""
                className="w-96 h-72 object-cover"
                src={process.env.REACT_APP_API_URL_MAINAPP +
                  "/assets/img/Onboarding 4.svg"}
              />
              <div className="text-center fw-bold text-xl text-black w-full my-5">
                Silahkan gunakan <span className="text-green-600">Diarium Mobile</span><br/>
                Untuk Melakukan Presensi
              </div>
              <div className="flex justify-center">
                <Button className="m-auto px-6" onClick={closeModal}>OK</Button>
              </div>
            </div>
          </Modal>
        </>
      ) : null}
    </>
  );
}
