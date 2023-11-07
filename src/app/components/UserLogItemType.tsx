import { numberToIDRFormat } from "@/lib/utils";

const UserLogItemType = ({ inout }: { inout: string }) => {
  let textColor: string;

  if (inout == "out") {
    textColor = "text-red-500";
  } else if (inout == "in") {
    textColor = "text-green-500";
  } else {
    textColor = "text-blue-500";
  }

  return <p className={`font-medium ${textColor}`}>{inout}</p>;
};

export default UserLogItemType;
