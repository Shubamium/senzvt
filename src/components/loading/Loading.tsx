import { useEffect, useState } from "react";
type Props = {};
import "./loading.scss";
import { AnimatePresence, motion, type Variants } from "motion/react";
const loadingList = [
  "/loading/1.gif",
  "/loading/2.gif",
  "/loading/3.gif",
  "/loading/4.gif",
];

// Shared exit transition
const exitTransition: any = { duration: 0.6, ease: [0.4, 0, 1, 1] };

// Corner images fly to opposite corners
const cornerVariants: Variants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  exit: (custom: "l" | "r") => ({
    opacity: 0,
    x: custom === "l" ? -120 : 120,
    y: -120,
    rotate: custom === "l" ? -25 : 25,
    scale: 0.4,
    transition: exitTransition,
  }),
};

// Snowflakes spin out
const snowflakeVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: (custom: "l" | "r") => ({
    opacity: 0,
    x: custom === "l" ? -200 : 200,
    y: 60,
    rotate: custom === "l" ? -180 : 180,
    scale: 0,
    transition: { ...exitTransition, duration: 0.7 },
  }),
};

// Side decoration slides down
const sideVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: {
    opacity: 0,
    y: 80,
    scaleY: 0.5,
    transition: { ...exitTransition, delay: 0.05 },
  },
};

// GIF scales and fades up
const gifVariants: Variants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: {
    opacity: 0,
    scale: 1.15,
    y: -30,
    filter: "blur(8px)",
    transition: { ...exitTransition, duration: 0.5 },
  },
};

// Circle pulses out
const circleVariants: Variants = {
  initial: { opacity: 0, scale: 0 },
  animate: { opacity: 0.03, scale: 1 },
  exit: {
    opacity: 0,
    scale: 2.5,
    transition: { ...exitTransition, duration: 0.55, ease: "easeOut" },
  },
};

// Heading splits apart
const headingVariants: Variants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: {
    opacity: 0,
    letterSpacing: "0.4em",
    y: -20,
    transition: { ...exitTransition, delay: 0.0 },
  },
};

// Lines slide out sideways
const lineVariants: Variants = {
  initial: { scaleX: 0 },
  animate: { scaleX: 1 },
  exit: (custom: "l" | "r") => ({
    opacity: 0,
    x: custom === "l" ? -100 : 100,
    scaleX: 0,
    transition: { ...exitTransition, delay: 0.08 },
  }),
};

// Percentage drops away
const percentageVariants: Variants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: {
    opacity: 0,
    y: 40,
    scale: 0.7,
    transition: { ...exitTransition, delay: 0.1 },
  },
};

// Wrapper: flash-whiteout then fade
const wrapperVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: {
    opacity: 0,
    scale: 1.04,
    filter: "brightness(2) blur(2px)",
    transition: { duration: 0.75, ease: [0.4, 0, 1, 1], delay: 0.15 },
  },
};

export default function Loading({}: Props) {
  const [load, setLoad] = useState(0);
  const [currentGif, setCurrentGif] = useState(-1);

  useEffect(() => {
    const randomLoading = Math.floor(Math.random() * loadingList.length);
    setCurrentGif(randomLoading);

    const addLoad = () => {
      setLoad((prev) => {
        const next = Math.round(prev + Math.random() * 5);
        return next >= 100 ? 100 : next;
      });
      setTimeout(addLoad, Math.random() * 400);
    };
    addLoad();
  }, []);

  return (
    <AnimatePresence>
      {load !== 100 && (
        <motion.div
          variants={wrapperVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          id="loading"
        >
          {/* Corners fly to opposite corners on exit */}
          <motion.img
            alt=""
            src="/loading-corner.png"
            className="corner l"
            variants={cornerVariants}
            custom="l"
            initial="initial"
            animate="animate"
            exit="exit"
          />
          <motion.img
            alt=""
            src="/loading-corner.png"
            className="corner r"
            variants={cornerVariants}
            custom="r"
            initial="initial"
            animate="animate"
            exit="exit"
          />

          {/* Snowflakes spin and fly sideways */}
          <motion.img
            alt=""
            src="/smallflake.png"
            className="snowflake r"
            variants={snowflakeVariants}
            custom="r"
            initial="initial"
            animate="animate"
            exit="exit"
          />
          <motion.img
            alt=""
            src="/bigsnowflake.png"
            className="snowflake l"
            variants={snowflakeVariants}
            custom="l"
            initial="initial"
            animate="animate"
            exit="exit"
          />

          {/* Side decoration slides down */}
          <motion.img
            alt=""
            src="/loadingside.png"
            className="loadingside"
            variants={sideVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          />

          {/* GIF scales up and blurs out */}
          <motion.img
            src={loadingList[currentGif] ?? undefined}
            alt=""
            className="gif"
            variants={gifVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          />

          {/* Circle bursts outward */}
          <motion.div
            className="circle"
            variants={circleVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          />

          {/* Heading tracks apart letter by letter */}
          <motion.div
            className="heading"
            variants={headingVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <motion.img
              src="/loadingline.png"
              alt=""
              className="line l"
              variants={lineVariants}
              custom="l"
              initial="initial"
              animate="animate"
              exit="exit"
            />
            <h2>LOADING</h2>
            <motion.img
              src="/loadingline.png"
              alt=""
              className="line r"
              variants={lineVariants}
              custom="r"
              initial="initial"
              animate="animate"
              exit="exit"
            />
          </motion.div>

          {/* Percentage drops down */}
          <motion.p
            className="percentage"
            variants={percentageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {load}%
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
