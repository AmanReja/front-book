import React from "react";
import "./Login.css";

import { Fade, Slide } from "react-awesome-reveal";

function Herobanner() {
  return (
    <>
      <section class="bg-gray-900 text-white relative">
        <div class="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
          <div class=" z-10 mx-auto max-w-3xl text-center">
            <h1 class="z-10 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text- text-left">
              The Place Where Every Page is an Adventure
              <Slide>
                {" "}
                <span class="sm:block">Where Stories Come to Life </span>
              </Slide>
            </h1>

            <Slide>
              {" "}
              {/* <p
                style={{
                  padding: "0 30px",
                  width: "125%",
                  position: "relative",
                  right: "108px"
                }}
                class="sm:text-xl/relaxed"
              >
                It is a sanctuary where the power of words sparks a renewed
                sense of hope and possibility. It’s more than just a collection
                of stories; it’s a place where each page offers comfort,
                inspiration, and the promise of a brighter tomorrow.
              </p> */}
            </Slide>
            {/* <hr
              style={{
                position: "relative",
                top: "300px",
                color: "white"
              }}
            /> */}

            <div class=" mt-8 flex flex-wrap justify-center gap-4">
              <a
                class=" koam block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
                href="#"
              >
                Get Started
              </a>

              <a
                class=" koam block w-full rounded border border-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-lime-500 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
                href="#"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Herobanner;
