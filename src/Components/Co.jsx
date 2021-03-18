import React, { useRef } from "react";

import { useAnimaciones } from "./hooks";

const Co = () => {
  const h1 = useRef(null);
  const h2 = useRef(null);
  const h3 = useRef(null);
  const h4 = useRef(null);
  const h5 = useRef(null);
  const h6 = useRef(null);

  useAnimaciones([h1, h2, h3, h4, h5, h6], 1, "notAppear");

  return (
    <div>
      <h2 className="notAppear notAppear2" ref={h1}>
        H1 2
      </h2>
      <h2 className="notAppear notAppear2" ref={h2}>
        H2 2
      </h2>
      <h3 className="notAppear notAppear2" ref={h3}>
        H3 2
      </h3>
      <h5 className="notAppear notAppear2" ref={h4}>
        H4 2
      </h5>
      <h5 className="notAppear notAppear2" ref={h5}>
        H5 2
      </h5>
      <h6 className="notAppear notAppear2" ref={h6}>
        H6 2
      </h6>
    </div>
  );
};
export default Co;

/*



*/
