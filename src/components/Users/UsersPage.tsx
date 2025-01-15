
import { useSelector } from "react-redux";
import React from "react";
import {Users} from "./Users.tsx";
import Preloader from "../Common/Preloader/Preloader.tsx";
import { getFetching } from "../../redux/users-selectors.ts";


type UsersPagePropsType = {
}

export const UsersPage: React.FC<UsersPagePropsType> = (props) => {

    const isFetching = useSelector(getFetching)

    return <>
    {isFetching ? <Preloader /> : null}
    <Users />
    </>
}

