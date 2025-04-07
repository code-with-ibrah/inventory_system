import { TlaSuccessTag, TlaInfoTag, TlaErrorTag, TlaGrayTag } from "./tla-tag";
import type { StatusType } from "../types/common.ts";

interface ITlaStatus {
  status: StatusType;
}

export const TlaStatus = ({ status }: ITlaStatus) => {
  switch (status) {
    case "Pending":
      return <TlaErrorTag text={status} />;
    case "Issued":
      return <TlaInfoTag text={status} />;
    case "Cancelled":
      return <TlaErrorTag text={status} />;
    case "In Progress":
      return <TlaInfoTag text={status} />;
    case "Completed":
      return <TlaSuccessTag text={status} />;
    default:
      return <TlaGrayTag text={status} />;
  }
};
