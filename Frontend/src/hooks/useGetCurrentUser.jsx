import { setUserData } from "@/features/userSlice";
import api from "@/service/api";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function useGetCurrentUser() {
  const dispatch = useDispatch();
  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const result = await api.get("/v0/user");
        dispatch(setUserData(result.data));
      } catch (err) {
        console.log("ERROR : GetUserHook : ", err);
      }
    };
    getCurrentUser();
  }, []);
}

export default useGetCurrentUser;
