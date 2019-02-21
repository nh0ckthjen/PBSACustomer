import {Component} from "react";
import constants from "../constants/Constants";

let ApiIpAddress = constants.ApiIpAddress;

export function GetApiIpAddress() {
    return `http://${ApiIpAddress}:57944/`;
}

export function SetApiIpAddress(ipAddress)
{
    ApiIpAddress = ipAddress.toString();
}

