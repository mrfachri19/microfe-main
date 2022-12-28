import React, { useEffect } from "react";
import Modal from ".";
import { useDispatch, useSelector } from "react-redux";
import { Info24Regular } from "@fluentui/react-icons";
import { deleteTask } from "@src/api";
import { getToken, getTokenAPIM, getUserData } from "@src/utils/storage";
import SuccessModal from "./ModalSuccess";
import toastAlert from "@src/utils/alert";


export default function ValidationModalTask({ text }) {
  const dispatch = useDispatch();
  const datauser = getUserData();
  const { isValidationModalYes } = useSelector((state) => state);
  const { isDetailTaskId } = useSelector((state) => state);
  const { isValidationModal } = useSelector((state) => state);
  const { isPostApproved } = useSelector((state) => state);

  const deleteTaskTugas = () => {
    const TokenAPIM = getTokenAPIM();
    const TokenAuth = getToken();
    const datapost = {
      task_id: isDetailTaskId,
      create_by: datauser.user
    }
    deleteTask(datapost).then(() => {
      //  // console.log("removed");
      SuccesDelete();
    })
    .catch((err) => {
      toastAlert("error", err.message);
      console.error(err);
    });
  };

  useEffect(() => {
    dispatch({ type: "set", isValidationModal: false });
  }, [1]);

  function SuccesDelete() {
    toastAlert("success", "Tugas berhasil dihapus");
    dispatch({ type: "set", isValidationModalYes: true });
  }

  return (
    <>
      {isValidationModal ? (
        <Modal>
          <div className="relative my-6 mx-auto max-w-xl">
            <div className="border-0 rounded-lg shadow-e3 relative px-12 flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className="text-center mt-8 fw-bold text-2xl">
                <span className="pr-5">
                  <Info24Regular color="#1A202C" />
                </span>
                Apakah Kamu Yakin?
              </div>
              <div className="text-center my-20 text-xl fw-bold">{text}</div>
              <div className="w-full mb-20 grid justify-items-center">
                <button
                  type="button"
                  className=" bg-green-600 w-72 h-9 px-2 py-1 rounded-lg"
                  onClick={() => {
                    dispatch({
                      type: "set",
                      isPostApproved: true,
                      isValidationModal: false
                    });
                    deleteTaskTugas();
                  }}
                >
                  <span className="text-white fw-bold text-base">Iya</span>
                </button>
                <div className="pt-3">
                  <button
                    type="button"
                    className=" bg-green-100 w-72 h-9 px-2 py-1 rounded-lg"
                    onClick={() => {
                      dispatch({ type: "set", isValidationModal: false });
                    }}
                  >
                    <span className="text-green-600 fw-bold text-base">
                      Batal
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      ) : null}
    </>
  );
}
