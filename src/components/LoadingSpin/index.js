import React from "react";
import Image from "next/image";
import LoadingSVG from "../../../public/loading.svg";

export default function LoadingSpin() {
  return (
    <div style={{ margin: "auto", width: 200 }}>
      <Image src={LoadingSVG} />
    </div>
  );
}
