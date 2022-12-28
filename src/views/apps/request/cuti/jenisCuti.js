// ** React Imports
import React, {
    Fragment,
    useEffect,
    useState
} from 'react'

// ** Reactstrap Imports
import {
    Card,
    CardHeader,
    CardTitle,
    CardBody,
    Row,
    Col,
    Input,
    Form,
    Button,
    Label
} from 'reactstrap'

// ** Third Party Components
import Select, { components } from "react-select"; //eslint-disable-line
// ** Styles Imports
import "@styles/react/libs/editor/editor.scss";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import "@styles/react/libs/react-select/_react-select.scss";

// ** Utils
import { isObjEmpty, selectThemeColors } from "@utils";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCuti } from '../../../../api';

import {
    selectJenisCuti,
    selectRoleCode,
    selectRoleCodeAdv,
    setCuper,
    setDataCalender,
    setDataQuota,
    setJourneyStatus,
} from "../store";

const JenisCuti = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    // states redux
    const selectedJenisCuti = useSelector((state) => state.request.selectedJenisCuti.selectedJenisCuti);
    const selectedRoleCode = useSelector((state) => state.request.selectedRoleCode.selectedRoleCode);
    const selectedRoleCodeAdv = useSelector((state) => state.request.selectedRoleCodeAdv.selectedRoleCodeAdv);
    const dataQuota = useSelector((state) => state.request.dataQuota.dataQuota);
    const dataCalender = useSelector((state) => state.request.dataCalender.dataCalender);
    const cuper = useSelector((state) => state.request.cuper.cuper);
    const journeyStatus = useSelector((state) => state.request.journeyStatus.journeyStatus);

    // usestate
    const [listJenisCuti, setListJenisCuti] = React.useState([]);
    const [listJenisCutiAdvance, setListJenisCutiAdvance] = React.useState([]);
    const [jenisCuti, setJenisCuti] = React.useState("");
    const [jenisCutiAdvance, setJenisCutiAdvance] = React.useState("");
    const [isCutiAdvance, setIsCutiAdvance] = React.useState(0);
    const [roleCode, setRoleCode] = React.useState(0);

    function getJenisCutiData() {
        getCuti(`jenis-cuti/940311`).then((res) => {
            var tempList = [];
            tempList = res.data.data_jenis_cuti;
            //  // console.log("List Jenis Cuti", res.data);
            const result = tempList.map((v) => v.jenis_cuti.leave_name);
            //  // console.log(result);
            let tempData = [];
            for (let i = 0; i < result.length; i++) {
                tempData.push({
                    label: result[i],
                    value: result[i],
                });
            }
            setListJenisCuti(tempData);
            //  // console.log("list temData jenis cuti", tempData)
            if (jenisCuti.value) {
                var temp = []
                temp = tempList.filter(filterCuti => filterCuti.jenis_cuti.leave_name === jenisCuti.value).map(filteredCuti => (filteredCuti))
                //  // console.log("hasil filter temp data qota", temp[0].data_quota)
                const tempAdvance = temp[0].jenis_cuti.is_role_has_advance
                //  // console.log("hasil tempAdvance", tempAdvance)
                const tempRoleCode = temp[0].jenis_cuti.role_code
                //  // console.log("hasil rolecode", tempRoleCode)
                dispatch(selectRoleCode({ selectedRoleCode: tempRoleCode }));
                dispatch(setDataQuota({ dataQuota: temp[0].data_quota }));
                dispatch(setCuper({ cuper: temp[0].cuper }));
                dispatch(setDataCalender({ dataCalender: temp[0].data_calendar }));
                dispatch(setJourneyStatus({ journeyStatus: temp[0].jenis_cuti.journey_status }));
                setIsCutiAdvance(tempAdvance)
                if (tempAdvance > 0) {
                    var filtered = []
                    filtered = temp[0].advance_role
                    const hasil = filtered.map((s) => s.definition)
                    //  // console.log("hasil filter hasil", hasil)
                    let tempDataAdv = [];
                    for (let i = 0; i < hasil.length; i++) {
                        tempDataAdv.push({
                            label: hasil[i],
                            value: hasil[i],
                        });
                    }
                    setListJenisCutiAdvance(tempDataAdv);
                    if (jenisCutiAdvance.value) {
                        //  // console.log("ada cuti advance", filtered)
                        var tempRoleCodeAdv = []
                        tempRoleCodeAdv = filtered.filter(filterCutiAdv => filterCutiAdv.definition === jenisCutiAdvance.value).map(filteredCutiAdv => (filteredCutiAdv))
                        //  // console.log("nilai tempRoleCodeAdv", tempRoleCodeAdv)
                        const hasilRoleCodeAdv = tempRoleCodeAdv[0].id_adv_role
                        //  // console.log("nilai cuti advance", hasilRoleCodeAdv)
                        dispatch(selectRoleCodeAdv({ selectedRoleCodeAdv: hasilRoleCodeAdv }));
                    }
                }
            }
        });
    }

    useEffect(() => {
        getJenisCutiData()
    }, [1])

    useEffect(() => {
        dispatch(selectJenisCuti({ selectedJenisCuti: jenisCuti }));
        dispatch(selectRoleCode({ selectedRoleCode: "" }));
        setRoleCode("")
        getJenisCutiData()
    }, [jenisCuti, jenisCutiAdvance])

    // ** States

    const CutiComponent = ({ data, ...props }) => {
        return (
            <components.Option {...props}>
                <div className="d-flex align-items-center">
                    <p className="mb-0">{data.label}</p>
                </div>
            </components.Option>
        );
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle tag='h4' className='text-primary'>Jenis Pengajuan Cuti</CardTitle>
            </CardHeader>
            <CardBody>
                <Form>
                    <Row>
                        <Row md='12' sm='12' className="mb-6">
                            <Col md='4' sm='12'>
                                <Label className='form-label' htmlFor='jenisCuti'>
                                    Jenis Cuti
                                </Label>
                                <Select
                                    id="jenisCuti"
                                    className="react-select"
                                    classNamePrefix="select"
                                    isClearable={false}
                                    options={listJenisCuti}
                                    theme={selectThemeColors}
                                    placeholder="Pilih Jenis Cuti"
                                    value={jenisCuti}
                                    onChange={(data) => setJenisCuti(data)}
                                    components={{ Option: CutiComponent }}
                                />
                            </Col>
                            <Col md='4' sm='12' className={`${isCutiAdvance ? "" : "d-none"}`}>
                                <Label className='form-label' htmlFor='subJenisCuti'>
                                    Sub Jenis Cuti
                                </Label>
                                <Select
                                    id="subJenisCuti"
                                    className="react-select"
                                    classNamePrefix="select"
                                    isClearable={false}
                                    options={listJenisCutiAdvance}
                                    theme={selectThemeColors}
                                    placeholder="Pilih Sub Jenis Cuti"
                                    value={jenisCutiAdvance}
                                    onChange={(data) => setJenisCutiAdvance(data)}
                                    components={{ Option: CutiComponent }}
                                />
                            </Col>
                        </Row>
                    </Row>
                </Form>
            </CardBody>
        </Card >
    )
}

export default JenisCuti
