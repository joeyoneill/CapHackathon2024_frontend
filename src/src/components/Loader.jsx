import React from "react";
import { LineWave, Oval } from "react-loader-spinner";

function Loader() {
  return (
    <>
      <Oval
        visible={true}
        height="80"
        width="80"
        color="#5767f8"
        secondaryColor="#f3f4f6"
        ariaLabel="oval-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </>
  );
}

export default Loader;
