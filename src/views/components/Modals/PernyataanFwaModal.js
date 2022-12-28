import React, { useEffect } from "react";
import moment from "moment";
import Modal from "mainapp/Modals";
import { Dismiss24Filled, Dismiss24Regular } from "@fluentui/react-icons";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../../utils/storage.js";

export default function PernyataanFwaModal({ noHp, tanggal }) {
    const datauser = getUserData();
    const dispatch = useDispatch();
    const { isPernyataanFwaModal } = useSelector((state) => state);
    const { isPernyataanFwaModalYes } = useSelector((state) => state);
    const [check1, setCheck1] = React.useState(false)
    const [check2, setCheck2] = React.useState(false)
    const [check3, setCheck3] = React.useState(false)
    const [check4, setCheck4] = React.useState(false)
    const [check5, setCheck5] = React.useState(false)
    const [check6, setCheck6] = React.useState(false)
    const [check7, setCheck7] = React.useState(false)
    const [check8, setCheck8] = React.useState(false)

    useEffect(() => {
        dispatch({
            type: "set", isPernyataanFwaModal: false,
            isPernyataanFwaModalYes: false
        });
    }, [1]);

    function closeModal() {
        dispatch({
            type: "set", isPernyataanFwaModal: false,
            isPernyataanFwaModalYes: false
        });
    }

    return (
        <>
            {isPernyataanFwaModal ? (
                <Modal>
                    <div className="relative my-6 mx-auto w-[76vw] lg:w-[56vw]">
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            <div className="flex flex-row-reverse pr-10 pt-6">
                                <div className="cursor-pointer" onClick={(() => {
                                    dispatch({ type: "set", isPernyataanFwaModal: false });
                                })}>
                                    <Dismiss24Filled color="#000" />
                                </div>
                            </div>
                            <div className="text-center fw-bold text-2xl">
                                Pernyataan FWA
                            </div>
                            <div className="text-center text-sm pt-5">
                                Saya yang membuat pernyataan di bawah ini :
                            </div>
                            <div className="grid justify-items-center pt-5">
                                <table className="w-1/3 text-sm font-semibold">
                                    <tbody>
                                        <tr>
                                            <td className="w-1/4 min-w-1/13">Nama</td>
                                            <td className="w-3/4 min-w-max">: {datauser.nama}</td>
                                        </tr>
                                        <tr>
                                            <td className="w-1/4 min-w-1/13">NIK</td>
                                            <td className="w-3/4 min-w-max">: {datauser.user}</td>
                                        </tr>
                                        <tr>
                                            <td className="w-1/4 min-w-1/13">Jabatan</td>
                                            <td className="w-3/4 min-w-max">: {datauser.jabatan}</td>
                                        </tr>
                                        <tr>
                                            <td className="w-1/4 min-w-1/13">No. HP</td>
                                            <td className="w-3/4 min-w-max">: {noHp}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="text-left text-sm pt-4 flex-auto flex px-9">
                                Berkaitan dengan permohonan pelaksanaan Flexi Working Arrangement (FWA) yang saya ajukan, dengan ini menyatakan kesanggupan dan kesediaan kami untuk terikat pada hal-hal yang kami nyatakan sebagai berikut :
                            </div>
                            <div className="grid justify-items-start pt-4 pb-9 px-24">
                                <div className="flex flex-row pb-5">
                                    <div className="w-5 h-5 mr-2">
                                        <input
                                            id="pernyataan1"
                                            name="pernyataan1"
                                            type="checkbox"
                                            className="accent-accentSecondary-500 cursor-pointer w-5 h-5"
                                            onChange={() => {
                                                setCheck1(!check1)
                                            }}
                                        />
                                    </div>
                                    <label className="text-sm text-black">
                                        Menaati dan melaksanakan Peraturan Perundang-undangan, Peraturan Perusahaan dan/atau kebijakan Perusahaan yang berlaku;
                                    </label>
                                </div>
                                <div className="flex flex-row pb-5">
                                    <div className="w-5 h-5 mr-2">
                                        <input
                                            id="pernyataan2"
                                            name="pernyataan2"
                                            type="checkbox"
                                            className="accent-accentSecondary-500 cursor-pointer w-5 h-5"
                                            onChange={() => {
                                                setCheck2(!check2)
                                            }}
                                        />
                                    </div>
                                    <label className="text-sm text-black">
                                        Melaksanakan Etika Pelaksanaan Flexible Working Arrangement (Do's & Don’ts) yang terdapat di aplikasi kolaborasi Diarium;
                                    </label>
                                </div>
                                <div className="flex flex-row pb-5">
                                    <div className="w-5 h-5 mr-2">
                                        <input
                                            id="pernyataan3"
                                            name="pernyataan3"
                                            type="checkbox"
                                            className="accent-accentSecondary-500 cursor-pointer w-5 h-5"
                                            onChange={() => {
                                                setCheck3(!check3)
                                            }}
                                        />
                                    </div>
                                    <label className="text-sm text-black">
                                        Melakukan presensi secara online di aplikasi kolaborasi (check-in dan check-out di awal waktu dan di akhir waktu kerja serta lapor posisi pada pukul 10.00 dan 14.00 waktu setempat pada saat WFH);
                                    </label>
                                </div>
                                <div className="flex flex-row pb-5">
                                    <div className="w-5 h-5 mr-2">
                                        <input
                                            id="pernyataan4"
                                            name="pernyataan4"
                                            type="checkbox"
                                            className="accent-accentSecondary-500 cursor-pointer w-5 h-5"
                                            onChange={() => {
                                                setCheck4(!check4)
                                            }}
                                        />
                                    </div>
                                    <label className="text-sm text-black">
                                        Bersedia untuk tetap dapat dihubungi dan menghubungi, baik melalui media Video Conference, Nota Dinas, Email Telkom, Telepon, Pesan Singkat pada aplikasi media sosial maupun media lain yang telah disepakati dengan Atasan selama pelaksanaan FWA;
                                    </label>
                                </div>
                                <div className="flex flex-row pb-5">
                                    <div className="w-5 h-5 mr-2">
                                        <input
                                            id="pernyataan5"
                                            name="pernyataan5"
                                            type="checkbox"
                                            className="accent-accentSecondary-500 cursor-pointer w-5 h-5"
                                            onChange={() => {
                                                setCheck5(!check5)
                                            }}
                                        />
                                    </div>
                                    <label className="text-sm text-black">
                                        Menyelsaikan pekerjaan sesuai dengan target waktu penyelsaian yang telah disepakati dengan atasan;
                                    </label>
                                </div>
                                <div className="flex flex-row pb-5">
                                    <div className="w-5 h-5 mr-2">
                                        <input
                                            id="pernyataan6"
                                            name="pernyataan6"
                                            type="checkbox"
                                            className="accent-accentSecondary-500 cursor-pointer w-5 h-5"
                                            onChange={() => {
                                                setCheck6(!check6)
                                            }}
                                        />
                                    </div>
                                    <label className="text-sm text-black">
                                        Bersedia dan siap ke kantor Telkom sesuai dengan PSA apabila diperlukan atasan;
                                    </label>
                                </div>
                                <div className="flex flex-row pb-5">
                                    <div className="w-5 h-5 mr-2">
                                        <input
                                            id="pernyataan7"
                                            name="pernyataan7"
                                            type="checkbox"
                                            className="accent-accentSecondary-500 cursor-pointer w-5 h-5"
                                            onChange={() => {
                                                setCheck7(!check7)
                                            }}
                                        />
                                    </div>
                                    <label className="text-sm text-black">
                                        Apabila saya melaksanakan FWA diluar PSA yang telah ditetapkan maka saya bersedia dan  siap datang ke kantor Telkom sesuai PSA dalam waktu yang disepakati dengan atasan dengan mempertimbangkan jarak tempuh dan sarana transportasi yang tersedia.
                                    </label>
                                </div>
                                <div className="flex flex-row pb-5">
                                    <div className="w-5 h-5 mr-2">
                                        <input
                                            id="pernyataan8"
                                            name="pernyataan8"
                                            type="checkbox"
                                            className="accent-accentSecondary-500 cursor-pointer w-5 h-5"
                                            onChange={() => {
                                                setCheck8(!check8)
                                            }}
                                        />
                                    </div>
                                    <label className="text-sm text-black">
                                        Bila saya terbukti melanggar pernyataan ini, saya bersedia diberikan sanksi sesuai dengan ketentuan Telkom yang berlaku.
                                    </label>
                                </div>
                            </div>
                            <div className="px-32 pb-16">
                                <div className="text-sm font-semibold">
                                    {moment(tanggal).format("DD MMMM YYYY")}
                                </div>
                                <div className="text-sm font-semibold pt-2">
                                    <div>
                                        {datauser.nama}
                                    </div>
                                    <div>
                                        NIK {datauser.user}
                                    </div>
                                </div>
                            </div>
                            <div className="w-full grid justify-items-center mb-11">
                                <button
                                    type="button"
                                    className={`w-36 h-12 px-2 py-1 rounded-lg ${check1 && check2 && check3 && check4 && check5 && check6 && check7 && check8 ? "bg-green-600 text-white" : "bg-tertiary-300 text-tertiary-500"}`}
                                    disabled={check1 && check2 && check3 && check4 && check5 && check6 && check7 && check8 ? false : true}
                                    onClick={(() => {
                                        dispatch({
                                            type: "set", isPernyataanFwaModal: false,
                                            isPernyataanFwaModalYes: true
                                        });
                                    })}
                                >
                                    <span className="fw-bold text-base">OK</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </Modal>
            ) : null}
        </>
    );
}