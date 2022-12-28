// ** Redux Imports
import { createSlice } from '@reduxjs/toolkit'

// ** UseJWT import to get config
import useJwt from '@src/auth/jwt/useJwt'
import { getUserData, clearStorages } from '@src/utils/storage';
import moment from "moment";

const config = useJwt.jwtConfig

const initialUser = () => {
  return getUserData()
}

const generalVersion = `v5.0.1`;
const date = "220822";
const versionbatch = "1";

export const authSlice = createSlice({
  name: 'authentication',
  initialState: {
    userData: initialUser(),
    keyStorage: "Versioning",
    deployVersion: `${generalVersion}-${date}-${versionbatch}`,
  },
  reducers: {
    handleLogin: (state, action) => {
      state.userData = action.payload
    },
    handleLogout: state => {
      state.userData = {}
      clearStorages();
    },
    checkDeployVersion: state => {
      const version = localStorage.getItem(state.keyStorage);
      if (version) {
        if (version != `diarium-${state.deployVersion}`) {
          localStorage.setItem(state.keyStorage, `diarium-${state.deployVersion}`);
          window.location.reload(true);
        }
      } else {
        localStorage.setItem(state.keyStorage, `diarium-${state.deployVersion}`);
        window.location.reload(true);
      }
    },
  }
})

export const { handleLogin, handleLogout, checkDeployVersion } = authSlice.actions

export default authSlice.reducer
