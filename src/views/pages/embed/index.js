import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Iframe from "@src/views/components/Iframe";
import { getJWTPass } from "@src/api";

export default function Embed() {
  const { module } = useParams();
  const [uriEmbed, setUriEmbed] = useState("https://diarium.telkom.co.id/app/okrv2?view=lite&token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2NTM5NzM0NzYsIm5payI6Ijk0MDMxMSJ9.dE7uKhfrzlLJAocW1GXS4-oeW2SjhrR2x6INBiutKWE");

  function generateURI() {
    getJWTPass().then((res) => {
      let appModule = module || "okr";
      appModule = (appModule == "okr") ? "okrv2":appModule;
      const uri = "https://diarium.telkom.co.id/app/"+appModule+"?view=lite&token="+res.data.data.token;
      
      //  // console.log(res, uri);
      setUriEmbed(uri);
    });
  }

  useEffect(() => {
    generateURI();
  }, [1]);

  return (
    <div className="">
      <div className="relative w-100 d-flex bg-white overflow-hidden">
        <Iframe className="iframe-diarium-embed flex-fill" url={uriEmbed} />
      </div>
    </div>
  );
}
