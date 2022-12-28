import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
    Fragment
} from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Location20Filled } from "@fluentui/react-icons";
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup
} from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import L from 'leaflet';
import axios from 'axios';
import {
    setIsLocationModal,
    setIdWfhLocation,
    setWfhLocationLat,
    setWfhLocationLong,
    setWfhLocationLat1,
    setWfhLocationLong1,
    setWfhLocationLat2,
    setWfhLocationLong2,
    setWfhLocationLat3,
    setWfhLocationLong3,
    setWfhLocationLat4,
    setWfhLocationLong4,
} from "../store";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Row,
    Col,
    Label,
    Input
} from 'reactstrap'
import markerIcon from '@src/assets/icons/location-red.svg'

export default function LocationModal() {
    const dispatch = useDispatch();
    const isLocationModal = useSelector((state) => state.request.isLocationModal.isLocationModal);
    const wfhLocationLat = useSelector((state) => state.request.wfhLocationLat.wfhLocationLat);
    const wfhLocationLong = useSelector((state) => state.request.wfhLocationLong.wfhLocationLong);
    const wfhLocationLat1 = useSelector((state) => state.request.wfhLocationLat1.wfhLocationLat1);
    const wfhLocationLong1 = useSelector((state) => state.request.wfhLocationLong1.wfhLocationLong1);
    const wfhLocationLat2 = useSelector((state) => state.request.wfhLocationLat2.wfhLocationLat2);
    const wfhLocationLong2 = useSelector((state) => state.request.wfhLocationLong2.wfhLocationLong2);
    const wfhLocationLat3 = useSelector((state) => state.request.wfhLocationLat3.wfhLocationLat3);
    const wfhLocationLong3 = useSelector((state) => state.request.wfhLocationLong3.wfhLocationLong3);
    const wfhLocationLat4 = useSelector((state) => state.request.wfhLocationLat4.wfhLocationLat4);
    const wfhLocationLong4 = useSelector((state) => state.request.wfhLocationLong4.wfhLocationLong4);

    const idWfhLocation = useSelector((state) => state.request.idWfhLocation.idWfhLocation);
    const isDragable = useSelector((state) => state.request.isDragable.isDragable);

    const [locationLat, setLocationLat] = useState(0)
    const [locationLong, setLocationLong] = useState(0)
    const [locationLat1, setLocationLat1] = useState(0)
    const [locationLong1, setLocationLong1] = useState(0)
    const [locationLat2, setLocationLat2] = useState(0)
    const [locationLong2, setLocationLong2] = useState(0)
    const [locationLat3, setLocationLat3] = useState(0)
    const [locationLong3, setLocationLong3] = useState(0)
    const [locationLat4, setLocationLat4] = useState(0)
    const [locationLong4, setLocationLong4] = useState(0)
    const [latitude, setLatitude] = React.useState(-6.8986002)
    const [longitude, setLongitude] = React.useState(107.6163885)
    const [address, setAddress] = useState("")
    const [position, setPosition] = useState(["-6.8986002", "107.6163885"])
    const markerRef = useRef(null)
    const eventHandlers = useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current
                if (marker != null) {
                    setPosition(marker.getLatLng())
                }
            },
        }),
        [],
    )

    const LeafIcon = L.Icon.extend({
        options: {
            iconSize: [55, 95],
            shadowSize: [50, 64],
            iconAnchor: [22, 94],
            shadowAnchor: [4, 62],
            popupAnchor: [-3, -76]
        }
    });

    const dragableIcon =
        new LeafIcon({
            iconUrl: markerIcon,
            iconRetinaUrl: markerIcon,
        }
        );

    function postPosition() {
        axios.post(`https://nominatim.openstreetmap.org/reverse?lat=` + position[0] + `&lon=` + position[1] + `&format=json`)
            .then(res => {
                 // console.log(res);
                 // console.log("data react leaflet", res.data);
                setAddress(res.data.display_name)
            })
    }

    function postLatLong() {
        axios.post(`https://nominatim.openstreetmap.org/reverse?lat=` + latitude + `&lon=` + longitude + `&format=json`)
            .then(res => {
                 // console.log(res);
                 // console.log("data react leaflet", res.data);
                setAddress(res.data.display_name)
            })
    }

    useEffect(() => {
        postLatLong()
    }, [latitude])

    useEffect(() => {
        postPosition()
    }, [position])




    useEffect(() => {
         // console.log("latlong saat ini", position)
         // console.log("Id wfhloc", idWfhLocation)
        setLatitude(position.lat)
        setLongitude(position.lng)
        if (idWfhLocation === "0") {
            setLocationLat(position.lat)
            setLocationLong(position.lng)
             // console.log("ini index 0")
        }
        if (idWfhLocation === "1") {
            setLocationLat1(position.lat)
            setLocationLong1(position.lng)
             // console.log("ini index 1")
        }
        if (idWfhLocation === "2") {
            setLocationLat2(position.lat)
            setLocationLong2(position.lng)
             // console.log("ini index 2")
        }
        if (idWfhLocation === "3") {
            setLocationLat3(position.lat)
            setLocationLong3(position.lng)
             // console.log("ini index 3")
        }
        if (idWfhLocation === "4") {
            setLocationLat4(position.lat)
            setLocationLong4(position.lng)
             // console.log("ini index 4")
        }
    }, [position])

    useEffect(() => {
        setLocationLat(0)
        setLocationLong(0)
        setLocationLat1(0)
        setLocationLong1(0)
        setLocationLat2(0)
        setLocationLong2(0)
        setLocationLat3(0)
        setLocationLong3(0)
        setLocationLat4(0)
        setLocationLong4(0)
        postLatLong()
    }, [1]);

    useEffect(() => {
         // console.log("Id wfhloc", idWfhLocation)
        if (idWfhLocation === "0" && wfhLocationLat) {
             // console.log("ini lemparan wfh lokasi", wfhLocationLat)
            setPosition([wfhLocationLat, wfhLocationLong])
             // console.log("latlong saat ini redux", position)
            setLocationLat(position[0])
            setLocationLong(position[1])
        }
        if (idWfhLocation === "1" && wfhLocationLat1) {
             // console.log("ini lemparan wfh 1 lokasi", wfhLocationLat1)
            setPosition([wfhLocationLat1, wfhLocationLong1])
             // console.log("latlong saat ini redux", position)
            setLocationLat1(position[0])
            setLocationLong1(position[1])
        }
        if (idWfhLocation === "2" && wfhLocationLat2) {
             // console.log("ini lemparan wfh 1 lokasi", wfhLocationLat2)
            setPosition([wfhLocationLat2, wfhLocationLong2])
             // console.log("latlong saat ini redux", position)
            setLocationLat2(position[0])
            setLocationLong2(position[1])
        }
        if (idWfhLocation === "3" && wfhLocationLat3) {
             // console.log("ini lemparan wfh 1 lokasi", wfhLocationLat3)
            setPosition([wfhLocationLat3, wfhLocationLong3])
             // console.log("latlong saat ini redux", position)
            setLocationLat3(position[0])
            setLocationLong3(position[1])
        }
        if (idWfhLocation === "4" && wfhLocationLat4) {
             // console.log("ini lemparan wfh 1 lokasi", wfhLocationLat4)
            setPosition([wfhLocationLat4, wfhLocationLong4])
             // console.log("latlong saat ini redux", position)
            setLocationLat4(position[0])
            setLocationLong4(position[1])
        }
    }, [idWfhLocation]);

    // useEffect(() => {
    //      // console.log("Id wfhloc", idWfhLocation)
    //     if (wfhLocationLat1) {
    //          // console.log("ini lemparan wfh 1 lokasi", wfhLocationLat1)
    //         setPosition([wfhLocationLat1, wfhLocationLong1])
    //     }
    // }, [idWfhLocation === "1"]);

    // useEffect(() => {
    //      // console.log("Id wfhloc", idWfhLocation)
    //     if (wfhLocationLat2) {
    //          // console.log("ini lemparan wfh 1 lokasi", wfhLocationLat2)
    //         setPosition([wfhLocationLat2, wfhLocationLong2])
    //     }
    // }, [idWfhLocation === "2"]);

    // useEffect(() => {
    //      // console.log("Id wfhloc", idWfhLocation)
    //     if (wfhLocationLat3) {
    //          // console.log("ini lemparan wfh 1 lokasi", wfhLocationLat3)
    //         setPosition([wfhLocationLat3, wfhLocationLong3])
    //     }
    // }, [idWfhLocation === "3"]);

    // useEffect(() => {
    //      // console.log("Id wfhloc", idWfhLocation)
    //     if (wfhLocationLat4) {
    //          // console.log("ini lemparan wfh 1 lokasi", wfhLocationLat4)
    //         setPosition([wfhLocationLat4, wfhLocationLong4])
    //     }
    // }, [idWfhLocation === "4"]);

    function closeModal() {
        dispatch({ type: "set", isLocationModal: false });
    }
    useEffect(() => {
        // dispatch(setIdWfhLocation({ idWfhLocation: "" }))
        // setPosition(["-6.8986002", "107.6163885"])
    }, [isLocationModal === false])


    return (
        <>
            <Fragment >
                <Modal
                    isOpen={isLocationModal}
                    toggle={() => dispatch(setIsLocationModal({ isLocationModal: false }))}
                    className={`modal-dialog-centered modal-lg`}
                >
                    <ModalHeader toggle={() => dispatch(setIsLocationModal({ isLocationModal: false }))}>
                    </ModalHeader>
                    <ModalBody>
                        <div className="w-100">
                            <div className="w-100 rounded-lg" style={{ height: "31.25rem" }}>
                                <MapContainer center={["-6.8986002", "107.6163885"]} zoom={13} scrollWheelZoom={false} dragging={true} className={`w-100`} style={{ height: "31.25rem" }} >
                                    <TileLayer
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    <Marker
                                        draggable={isDragable}
                                        eventHandlers={eventHandlers}
                                        position={position}
                                        icon={dragableIcon}
                                        ref={markerRef}>
                                        <Popup minWidth={50}>
                                            <div className="d-flex flex-row">
                                                <span className="text-primary-600 fw-bolder fs-3">Kamu disini</span>
                                            </div>
                                        </Popup>
                                    </Marker>
                                </MapContainer>
                            </div>
                            <div className="px-7 py-7 d-flex flex-row w-100 align-middle">
                                <div className="d-flex flex-row w-75" style={{ maxWidth: "75%" }}>
                                    <span className="fs-4 text-black fw-bolder">
                                        Lokasi kamu saat ini : {address}
                                    </span>
                                </div>
                                <div className="d-flex flex-row-reverse align-middle w-25" style={{ maxWidth: "25%", maxHeight: "52px" }}>
                                    <Button className='ms-2' color='primary' type='submit' onClick={() => {
                                        dispatch(setIsLocationModal({ isLocationModal: false }))
                                        dispatch(setWfhLocationLat({
                                            wfhLocationLat: locationLat,
                                        }))
                                        dispatch(setWfhLocationLong({
                                            wfhLocationLong: locationLong,
                                        }))
                                        dispatch(setWfhLocationLat1({
                                            wfhLocationLat1: locationLat1,
                                        }))
                                        dispatch(setWfhLocationLong1({
                                            wfhLocationLong1: locationLong1,
                                        }))
                                        dispatch(setWfhLocationLat2({
                                            wfhLocationLat2: locationLat2,
                                        }))
                                        dispatch(setWfhLocationLong2({
                                            wfhLocationLong2: locationLong2,
                                        }))
                                        dispatch(setWfhLocationLat3({
                                            wfhLocationLat3: locationLat3,
                                        }))
                                        dispatch(setWfhLocationLong3({
                                            wfhLocationLong3: locationLong3,
                                        }))
                                        dispatch(setWfhLocationLat4({
                                            wfhLocationLat4: locationLat4,
                                        }))
                                        dispatch(setWfhLocationLong4({
                                            wfhLocationLong4: locationLong4,
                                        }))
                                    }}>
                                        <span className='text-white fw-bolder'>
                                            Simpan
                                        </span>
                                    </Button>
                                    <Button color='primary-100' type='cancel' onClick={() => {
                                        dispatch(setIsLocationModal({ isLocationModal: false }))
                                    }}>
                                        <span className='text-primary fw-bolder'>
                                            Batal
                                        </span>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                </Modal>
            </Fragment>
        </>
    );
}
