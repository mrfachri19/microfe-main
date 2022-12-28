import React from "react";
import { isURI } from "../../../../utils/validateInput";

//import images
import NotaDinas from "@src/assets/img/new-icon/NotaDinas.png";
import Event from "@src/assets/img/new-icon/Event.png";
import Discover from "@src/assets/img/new-icon/Discover.png";
import Helpdesk from "@src/assets/img/new-icon/Helpdesk.png";
import Koptel from "@src/assets/img/new-icon/Koptel.png";
import Peduli from "@src/assets/img/new-icon/Peduli.png";
import Presensi from "@src/assets/img/new-icon/Presensi.png";
import Request from "@src/assets/img/new-icon/Request.png";
import SalarySlip from "@src/assets/img/new-icon/SalarySlip.png";
import Umail from "@src/assets/img/new-icon/Umail.png";
import WithU from "@src/assets/img/new-icon/Withu.png";
import Yakes from "@src/assets/img/new-icon/Yakes.png";

export default function CardMenuGrid({ listMenu, title }) {

    return (
        <>

            <div className="mb-6">
                <div className="ps-1" style={{ marginLeft: "1rem" }}>
                    <label className="text-tertiary-700 fw-bolder">
                        {title}
                    </label>
                </div>
                <div className="container">
                    <div className="row">
                        {listMenu.map((item, index) => (
                            <div key={index} className="col-4">
                                {item.isExternal ?
                                    <a rel="noopener noreferrer" href={`${item.link}`} target="_blank">
                                        <div className="cursor-pointer" title={item.about} style={{ marginRight: "1.5rem", marginBottom: "1rem" }}>
                                            <div className="" >
                                                <div className="d-grid justify-items-center justify-content-center align-items-center">
                                                    <img
                                                        alt="..."
                                                        src={isURI(item.iconFullPath) ? item.iconFullPath : item.name === "Nota Dinas" ?
                                                            NotaDinas : item.name === "Presence Report" ? Presensi : item.name === "TGC X" ?
                                                                Helpdesk : item.name === "Umail" ? Umail : item.name === "My Event" ?
                                                                    Event : item.name === "Help Center" ? Helpdesk : item.name === "With U" ?
                                                                        WithU : item.name === "Payslip" ? SalarySlip : item.name === "Request" ?
                                                                            Request : item.name === "Peduli Lindungi" ? Peduli : item.name === "Discover" ?
                                                                                Discover : item.name === "Yakes" ? Yakes : item.name === "Koptel" ?
                                                                                    Koptel : Event}
                                                        style={{ width: "3.25rem", height: "3.25rem" }}
                                                    ></img>{" "}
                                                </div>
                                            </div>
                                            <div className="fs-4 text-tertiary-600 text-center fw-bolder pt-5">
                                                {item.name}
                                            </div>
                                        </div>
                                    </a> :
                                    <div className="cursor-pointer" title={item.about} style={{ marginRight: "1.5rem", marginBottom: "1rem" }}>
                                        <div className="" >
                                            <div className="d-grid justify-items-center justify-content-center align-items-center">
                                                <img
                                                    alt="..."
                                                    src={isURI(item.iconFullPath) ? item.iconFullPath : item.name === "Nota Dinas" ?
                                                        NotaDinas : item.name === "Presence Report" ? Presensi : item.name === "TGC X" ?
                                                            Helpdesk : item.name === "Umail" ? Umail : item.name === "My Event" ?
                                                                Event : item.name === "Help Center" ? Helpdesk : item.name === "With U" ?
                                                                    WithU : item.name === "Payslip" ? SalarySlip : item.name === "Request" ?
                                                                        Request : item.name === "Peduli Lindungi" ? Peduli : item.name === "Discover" ?
                                                                            Discover : item.name === "Yakes" ? Yakes : item.name === "Koptel" ?
                                                                                Koptel : Event}
                                                    style={{ width: "3.25rem", height: "3.25rem" }}
                                                ></img>{" "}
                                            </div>
                                        </div>
                                        <div className="fs-4 text-tertiary-600 text-center fw-bolder pt-5">
                                            {item.name}
                                        </div>
                                    </div>}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}