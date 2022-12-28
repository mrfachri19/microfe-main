import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Modal from ".";
import { useDispatch, useSelector } from "react-redux";
// import { Location20Filled } from "@fluentui/react-icons";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import L from 'leaflet';
import axios from 'axios';

export default function LocationModal() {
    const dispatch = useDispatch();
    const { isLocationModal } = useSelector((state) => state);
    const { wfhLocationLat } = useSelector((state) => state);
    const { wfhLocationLong } = useSelector((state) => state);
    const { wfhLocationLat1 } = useSelector((state) => state);
    const { wfhLocationLong1 } = useSelector((state) => state);
    const { wfhLocationLat2 } = useSelector((state) => state);
    const { wfhLocationLong2 } = useSelector((state) => state);
    const { wfhLocationLat3 } = useSelector((state) => state);
    const { wfhLocationLong3 } = useSelector((state) => state);
    const { wfhLocationLat4 } = useSelector((state) => state);
    const { wfhLocationLong4 } = useSelector((state) => state);
    const { idWfhLocation } = useSelector((state) => state);

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
    const [latitude, setLatitude] = useState(0)
    const [longitude, setLongitude] = useState(0)
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
            iconUrl: process.env.REACT_APP_API_URL_MAINAPP + "/assets/icons/location-red.svg",
            iconRetinaUrl: process.env.REACT_APP_API_URL_MAINAPP + "/assets/icons/location-red.svg",
        }
        );

    function postLatLong() {
        axios.post(`https://nominatim.openstreetmap.org/reverse?lat=` + latitude + `&lon=` + longitude + `&format=json`)
            .then(res => {
                 // console.log(res);
                 // console.log(res.data);
                setAddress(res.data.display_name)
            })
    }

    useEffect(() => {
        postLatLong()
    }, [latitude])


    // useEffect(() => {
    //      // console.log("latlong saat ini", position)
    //     setLocationLat(position.lat)
    //     setLocationLong(position.lng)
    // }, [position])

    useEffect(() => {
         // console.log("latlong saat ini", position)
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
        dispatch({
            type: "set",
            wfhLocationLat: "",
            wfhLocationLong: ""
        });
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
    }, [1]);

    function closeModal() {
        dispatch({ type: "set", isLocationModal: false });
    }

    return (
        <>
            {isLocationModal ? (
                <Modal>
                    <div className="relative my-6 mx-auto w-full max-w-3xl">
                        <div className="border-0 rounded-lg shadow-e3 relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            <div className="w-full h-97 rounded-lg">
                                <MapContainer center={["-6.8986002", "107.6163885"]} zoom={13} scrollWheelZoom={false} dragging={true} className={`w-full h-97`} >
                                    <TileLayer
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />
                                    <Marker
                                        draggable={true}
                                        eventHandlers={eventHandlers}
                                        position={position}
                                        icon={dragableIcon}
                                        ref={markerRef}>
                                        <Popup minWidth={50}>
                                            <div className="flex flex-row">
                                                <span className="text-green-600 fw-bold text-xs">Kamu disini</span>
                                            </div>
                                        </Popup>
                                    </Marker>
                                </MapContainer>
                            </div>
                            <div className="px-12 py-7 flex flex-row align-middle">
                                <div className="flex flex-row w-2/3 ">
                                    <span className="text-base fw-bold">
                                        Lokasi kamu saat ini : {address}
                                    </span>
                                </div>
                                <div className="flex flex-row-reverse w-1/3 align-middle">
                                    <button className=" bg-green-600 w-16 h-7 px-2 py-1 rounded-lg grid justify-items-center align-middle"
                                        onClick={() => {
                                            dispatch({
                                                type: "set",
                                                // wfhLocationLat: locationLat ? locationLat : locationLat1 ? locationLat1 : locationLat2 ? locationLat2 : locationLat3 ? locationLat3 : locationLat4,
                                                // wfhLocationLong: locationLong ? locationLong : locationLong1 ? locationLong1 : locationLong2 ? locationLong2 : locationLong3 ? locationLong3 : locationLong4,
                                                wfhLocationLat: locationLat,
                                                wfhLocationLong: locationLong,
                                                wfhLocationLat1: locationLat1,
                                                wfhLocationLong1: locationLong1,
                                                wfhLocationLat2: locationLat2,
                                                wfhLocationLong2: locationLong2,
                                                wfhLocationLat3: locationLat3,
                                                wfhLocationLong3: locationLong3,
                                                wfhLocationLat4: locationLat4,
                                                wfhLocationLong4: locationLong4,
                                                isLocationModal: false
                                            });
                                        }}
                                    >
                                        <span className="text-white fw-bold text-sm">Simpan</span>
                                    </button>
                                    <div className="pr-9">
                                        <button className=" bg-green-100 w-16 h-7 px-2 py-1 rounded-lg grid justify-items-center align-middle"
                                            onClick={() => {
                                                dispatch({ type: "set", isLocationModal: false });
                                            }}
                                        >
                                            <span className="text-green-600 fw-bold text-sm">Batal</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            ) : null}
        </>
    );
}
