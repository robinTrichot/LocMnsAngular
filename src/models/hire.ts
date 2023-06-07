import { Copy } from "./copy";
import { EventHire } from "./eventHire";
import { Usager } from "./usager";

export interface Hire {
    id?: number;
    dateHire?: string;
    dateRealReturn?: string;
    datePlannedReturn?: string;
    status?: string;
    eventHire: EventHire; // à changer
    user: Usager;
    copy: Copy;
}