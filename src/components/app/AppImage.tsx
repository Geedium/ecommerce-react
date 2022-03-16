/**
 * Next.js
 * {@link nextjs.org}
 *
 * Next.js is an open-source web
 * development framework built on top of
 * Node.js enabling React based web
 * applications functionalities such as
 * server-side rendering and generating
 * static websites.
 */
import type { ImageProps } from "next/image";
import Image from "next/image";

/**
 * React
 * {@link https://reactjs.org}
 *
 * React is a JavaScript library for
 * creating user interfaces.
 */
import { useState } from "react";

/**
 * MUI
 * {@link https://mui.com}
 *
 * MUI provides a robust, customizable,
 * and accessible library of foundational
 * and advanced components, enabling you
 * to build your design system and develop
 * React applications faster.
 */
import { Box, CircularProgress } from "@mui/material";

import styled from "@emotion/styled";

interface AppImageProps extends ImageProps {}

const s3Loader = ({ src }) => {
  return `https://s3.${process.env.S3_UPLOAD_REGION}.amazonaws.com/${process.env.S3_UPLOAD_BUCKET}/${src}`;
};

/**
 * Image component designed specifically for application
 *
 * @returns extended version of MUI image component
 */
export default function AppImage(props: AppImageProps) {
  const [imageIsLoaded, setImageIsLoaded] = useState(false);

  return (
    <>
      <Image
        alt=""
        layout="fill"
        objectFit="cover"
        loader={s3Loader}
        placeholder="empty"
        className={imageIsLoaded ? "lazy-image" : "image"}
        {...props}
        onLoad={(event) => {
          const target = event.target;

          // next/image use an 1x1 px git as placeholder. We only want the onLoad event on the actual image
          if (
            // @ts-ignore
            target.src.indexOf("data:image/gif;base64") < 0
          ) {
            setImageIsLoaded(true);
          }
        }}
      />
      {!imageIsLoaded && (
        <Box
          sx={{
            background: "rgba(0, 0, 0, .4)",
            width: "100%",
            height: "100%",
            position: "absolute",
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            display: "grid",
            placeItems: "center",
          }}
        >
          <CircularProgress color="secondary" size={100} />
        </Box>
      )}
    </>
  );
}
