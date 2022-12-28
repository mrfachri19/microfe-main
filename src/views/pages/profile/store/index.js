// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'

// ** Icons Imports
import { InfoRegular, RssRegular, DocumentBriefcaseRegular } from "@fluentui/react-icons"

export const pageProfileSlice = createSlice({
  name: 'pageProfileSlice',
  initialState: {
    profileRedux : {
      tabProfile : "info",
      tabProfileIndex : 0,
      subTabProfile : "about",
      listMainTabsProfile : ["info", "userProfile", "company", "social"],
      availableTabsProfile : [{
        tab: "info",
        label: "Tentang",
        icon: InfoRegular,
        listChild : ["about", "team"],
        childs : [
          { label: "Sekilas", tab: "about" },
          { label: "Tim", tab: "team" }
        ],
        status: true,
      },{
        tab: "userProfile",
        label: "Data Karyawan",
        icon: RssRegular,
        listChild : ['userdata', 'family', 'education', 'jobdesk'],
        childs : [
          { label: "Pribadi", tab: "userdata" },
          { label: "Komunikasi", tab: "komunikasi" },
          // { label: "Keluarga", tab: "family" },
          { label: "Pendidikan", tab: "education" },
          { label: "Dokumen Penting", tab: "dokument" }
        ],
        status: true,
      },{
        tab: "company",
        label: "Kedinasan",
        icon: DocumentBriefcaseRegular,
        listChild : ["dinas", "status", "training", "certificate", "achievement"],
        childs : [
          // {label: "Job Desk", tab:"jobdesk"},
          { label: "Riwayat", tab: "dinas" },
          { label: "Pelatihan", tab: "training" },
          { label: "Sertifikasi", tab: "certificate" },
          { label: "Penghargaan", tab: "achievement" },
          { label: "CV", tab: "cv" },
        ],
        status: true,
      },{
        tab: "social",
        label: "Social Connect",
        icon: RssRegular,
        listChild : [],
        childs : [],
        status: true,
      }]
    }
  },
  reducers: {
    updateRedux: (state, action) => {
      state.profileRedux = {...state.profileRedux, ...action.payload};
    },
  }
})

export const { updateRedux } = pageProfileSlice.actions

export default pageProfileSlice.reducer
