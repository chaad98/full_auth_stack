"use client";

import React, { PropsWithChildren, useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ProgressSpinner } from "primereact/progressspinner";
import { Progress } from "@/components/ui/progress";

type Props = PropsWithChildren;

const SessionEndedPage = (props: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [showModal, setShowModal] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [sentence, setSentence] = useState<boolean>(false);

  let cache: number | null;

  const cacheRef = useRef<number | null>(0);

  useEffect(() => {
    if (showModal) {
      return;
    }

    cacheRef.current = -1;

    const interval = setInterval(() => {
      setProgress((p) => (p < 90 ? p + 5 : p));
    }, 200);

    setSentence(true);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const initParams = searchParams.get("cache");
    cache = initParams ? Number(initParams) : null;
    console.log("first", cache);

    if (typeof cache === "number" && cache === 1) {
      const postParams = new URLSearchParams(searchParams.toString());
      postParams.delete("cache");

      setShowModal(true);
      cache = null;
      cacheRef.current = cache;
    } else {
      return;
    }

    const cacheTimeOut = setTimeout(() => {
      router.push("/");
      setShowModal(false);
      router.refresh();
    }, 500);

    return () => clearTimeout(cacheTimeOut);
  }, []);

  return (
    <>
      {showModal ? (
        <div className="fixed inset-0 flex justify-center items-center bg-zinc-900/90 backdrop-blur-sm">
          <div className="relative flex flex-col items-center justify-center">
            <ProgressSpinner
              style={{ width: "100px", height: "100px" }}
              strokeWidth="4"
              animationDuration=".5s"
            />
            <div className="absolute text-white text-sm font-semibold">
              Logging out...
            </div>
          </div>
        </div>
      ) : cacheRef.current === -1 ? (
        <div className="fixed inset-0 flex md:flex-col justify-center items-center bg-white text-black">
          <Progress value={progress} className="w-[20%]" />
          {progress < 90 && (
            <div className="text-black font-semibold mt-2">Redirecting</div>
          )}

          {progress >= 90 && sentence && (
            <div className="text-black font-semibold mt-2">
              Who are you? You are not allowed to be here or maybe i want you to
              be here...
            </div>
          )}
        </div>
      ) : null}
    </>
  );
};

export default SessionEndedPage;
