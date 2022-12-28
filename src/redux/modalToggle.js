// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isImageModal: false,
    isPresenceModal : false,
    isForYouModal : false,
    isModalKomunitas : false,
    isFeedbackModal : false,
    isRatingModal : false,
    isModalPrivacyCentra : false,

    //data Modal
    modalImageContent : "",
    modalCaptionContent : "",
    modalUrlContent : ""
  },
  reducers: {
    storeDataModal: (state, action) => {
      state.modalImageContent = action.payload.image;
      state.modalCaptionContent = action.payload.caption;
      state.modalUrlContent = action.payload.url;
    },
    storeModalKomunitas: (state, action) => {
      state.idKomunitas = action.payload.id;
      state.objKomunitas = action.payload.obj;
      state.memberKomunitas = action.payload.member;
      state.postKomunitas = action.payload.post;
      state.likeKomunitas = action.payload.like;
      state.avatarKomunitas = action.payload.avatar;
      state.userIdKomunitas = action.payload.userId;
    },
    storeModalPrivacyCentra: (state, action) => {
      state.nik = action.payload.nik;
      state.privacy = action.payload.privacy;
      state.kode_data = action.payload.kode_data;
    },
    toggleImageModal: (state, action) => {
      state.isImageModal = action.payload
    },
    togglePresenceModal: (state, action) => {
      state.isPresenceModal = action.payload
    },
    toggleSaranPintarModal: (state, action) => {
      state.isForYouModal = action.payload
    },
    toggleModalKomunitas: (state, action) => {
      state.isModalKomunitas = action.payload
    },
    toggleModalSppd: (state, action) => {
      state.isModalSppd = action.payload
    },
    toggleFeedbackModal: (state, action) => {
      state.isFeedbackModal = action.payload
    },
    toggelRatingModal: (state, action) => {
      state.isRatingModal = action.payload
    },
    toggleModalPrivacyCentra: (state, action) => {
      state.isModalPrivacyCentra = action.payload
    },
  }
})

export const { storeDataModal,storeModalPrivacyCentra, toggleImageModal, toggleSaranPintarModal, togglePresenceModal, toggleModalKomunitas, toggleModalSppd, storeModalKomunitas, toggleFeedbackModal, toggleModalPrivacyCentra,toggelRatingModal } = modalSlice.actions


export default modalSlice.reducer
