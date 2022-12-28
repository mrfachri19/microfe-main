import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap'

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getTimeManagementV2 } from '@src/api';
import moment from "moment";
import EmptyCard from '@src/views/components/cards/empty';
import TeamContent from '@src/views/components/Content/Team';

const CardMyTeam = () => {
    const limit = 20;
    const [offset, setOffset] = useState(0);
    const [listTeam, setListTeam] = useState([]);
    const [totalTeam, setTotalTeam] = useState(0);
    const { mobileVersion } = useSelector((state) => state.global);
    const { userData } = useSelector((state) => state.auth);

    function getTeamData() {
        const today = moment().format("YYYY-MM-DD");
        getTimeManagementV2(`absensi/team?limit=${limit}&offset=${offset}&action_type=circle&nik=${userData.username}&start_date=${today}&end_date=${today}&appVersion=${mobileVersion}`)
        .then((res) => {
            const data = res.data.data || {};
             // console.log("data team", res);
            if (offset == 0) {
                setListTeam(data.details || []);
            } else {
                setListTeam(listTeam.concat(data.details))
            }
            setTotalTeam(data.member_total || 0);
        });
    }

    useEffect(() => {
        getTeamData();
    }, [1]);

    useEffect(() => {
        getTeamData();
    }, [offset]);

    return (
        <>
        {listTeam.length > 0 ? 
        <Card className='card-employee-task mb-7'>
            <CardHeader>
                <CardTitle tag='h4'>Anggota Tim</CardTitle>
            </CardHeader>
            <CardBody>
                <TeamContent dataTeam={listTeam} dataTeamTotal={totalTeam} triggerModal={true} loadMore={setOffset}/>
            </CardBody>
        </Card>
        :
        <EmptyCard className="mb-7" text="Tidak memiliki team" cardTitle="Anggota Tim"/>
        }
        </>
    )
}

export default CardMyTeam
