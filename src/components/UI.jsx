import { useAtom } from "jotai";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { floatPausedAtom, pageAtom, pages } from "./bookState";
import Music from "./Music";

export const UI = () => {
  const [page, setPage] = useAtom(pageAtom);
  const [floatPaused, setFloatPaused] = useAtom(floatPausedAtom);
  const [autoFlip, setAutoFlip] = useState(false);

  const pageLabel = useMemo(() => {
    if (page === 0) {
      return "Cover";
    }
    if (page === pages.length) {
      return "Back Cover";
    }
    return `Page ${page}`;
  }, [page]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "ArrowRight") {
        setPage((value) => Math.min(pages.length, value + 1));
      }
      if (event.key === "ArrowLeft") {
        setPage((value) => Math.max(0, value - 1));
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [setPage]);

  useEffect(() => {
    if (!autoFlip) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setPage((value) => {
        if (value >= pages.length) {
          return 0;
        }
        return value + 1;
      });
    }, 2200);

    return () => window.clearInterval(timer);
  }, [autoFlip, setPage]);

  const btnBase = "transition-all duration-300 px-4 py-3 rounded-full text-sm md:text-base uppercase tracking-wide border bg-black/30 text-white border-transparent hover:border-white";

  return (
    <>
      <main className=" pointer-events-none select-none z-10 fixed inset-0 flex justify-between flex-col">
        <div className="w-full pointer-events-auto flex items-center justify-between p-6 md:p-8 bg-transparent">
          <Link
            to="/"
            className={`${btnBase} hover:border-[#ffa94d] hover:text-[#ffa94d]`}
          >
            Back To Home
          </Link>
          <div className="flex items-center gap-3">
            <Music />
            <button
              className={`${btnBase} ${
                floatPaused
                  ? "bg-white/90 text-black border-transparent"
                  : "bg-black/30 text-white border-transparent hover:border-[#69db7c]"
              }`}
              onClick={() => setFloatPaused((value) => !value)}
            >
              {floatPaused ? "Resume Floating" : "Pause Floating"}
            </button>
          </div>
        </div>
        <div className="w-full overflow-auto pointer-events-auto flex justify-center">
          <div className="overflow-auto flex items-center gap-4 max-w-full p-6 md:p-10">
            <button
              className={`${btnBase} disabled:opacity-40 disabled:cursor-not-allowed hover:border-[#ff6b6b] hover:text-[#ff6b6b]`}
              onClick={() => setPage((value) => Math.max(0, value - 1))}
              disabled={page === 0}
            >
              Previous
            </button>
            <button
              className={`${btnBase} hover:border-[#ffd43b] hover:text-[#ffd43b]`}
              onClick={() => setAutoFlip((value) => !value)}
            >
              {autoFlip ? "Stop Auto Flip" : "Auto Flip"}
            </button>
            <button
              className={`${btnBase} hover:border-[#a5d8ff] hover:text-[#a5d8ff]`}
              onClick={() => setPage(0)}
            >
              {pageLabel}
            </button>
            <button
              className={`${btnBase} disabled:opacity-40 disabled:cursor-not-allowed hover:border-[#69db7c] hover:text-[#69db7c]`}
              onClick={() => setPage((value) => Math.min(pages.length, value + 1))}
              disabled={page === pages.length}
            >
              Next
            </button>
          </div>
        </div>
      </main>
    </>
  );
};
