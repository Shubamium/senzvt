import Image from "astro/components/Image.astro";
import { Marqy } from "marqy";
import senzmarquee from "@/assets/d/senzmarquee.png";

type Props = {};

export default function ReactMarquee({}: Props) {
  return (
    <Marqy
      speed={1}
      direction="left"
      className="senztext"
      style={{
        position: "fixed",
        top: "10%",
        zIndex: "-10",
      }}
    >
      <img src={senzmarquee.src} alt={""} className="marquee" />
    </Marqy>
  );
}
