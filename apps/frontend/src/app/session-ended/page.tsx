"use client";

import React, { PropsWithChildren, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ProgressSpinner } from "primereact/progressspinner";
import { Progress } from "@/components/ui/progress";

type Props = PropsWithChildren;

const SessionEndedPage = (props: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [showModal, setShowModal] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(13);
  const [sentence, setSentence] = useState<boolean>(false);

  let cache: number;

  useEffect(() => {
    const initParams = searchParams.get("cache");
    cache = initParams ? Number(initParams!) : 0;

    if (typeof cache === "number" && cache === 1) {
      const postParams = new URLSearchParams(searchParams.toString());
      postParams.delete("cache");

      cache = 0;
      setShowModal(true);
    }

    if (!cache) {
      return;
    }

    const cacheTimeOut = setTimeout(() => {
      setShowModal(false);
      router.push("/");
      router.refresh();
    }, 500);

    return () => clearTimeout(cacheTimeOut);
  }, []);

  useEffect(() => {
    if (showModal) {
      return;
    }

    const interval = setInterval(() => {
      setProgress((p) => (p < 90 ? p + 5 : p));
    }, 500);

    setSentence(true);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {showModal ? (
        <div className="fixed inset-0 flex justify-center items-center bg-zinc-900/90 backdrop-blur-sm">
          <div className="relative flex flex-col items-center justify-center">
            {/* Spinner */}
            <ProgressSpinner
              style={{ width: "100px", height: "100px" }}
              strokeWidth="4"
              animationDuration=".5s"
            />

            {/* Text centered inside spinner */}
            <div className="absolute text-white text-sm font-semibold">
              Logging out...
            </div>
          </div>
        </div>
      ) : (
        <div className="fixed inset-0 flex md:flex-col justify-center items-center bg-white text-black">
          <Progress value={progress} className="w-[20%]" />
          {progress < 90 && (
            <div className="text-black font-semibold">Redirecting</div>
          )}

          {progress >= 90 && sentence && (
            <div className="text-black font-semibold ">
              <p>
                Who are you? You are not allowed to be here or maybe i want you
                to be here...
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default SessionEndedPage;
