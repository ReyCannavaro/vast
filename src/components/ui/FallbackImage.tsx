"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

type FallbackImageProps = Omit<ImageProps, "src"> & {
  src: string;
  fallbackSrc: string;
};

export function FallbackImage({ src, fallbackSrc, alt, onError, ...props }: FallbackImageProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const currentSrc = failedSrc === src ? fallbackSrc : src;

  return (
    <Image
      {...props}
      src={currentSrc}
      alt={alt}
      onError={(event) => {
        if (currentSrc !== fallbackSrc) {
          setFailedSrc(src);
        }

        onError?.(event);
      }}
    />
  );
}
