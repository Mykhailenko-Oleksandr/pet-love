import Image from "next/image";
import css from "./HeroSection.module.css";

export default function HeroSection() {
  return (
    <section className={css.section}>
      <div className="container">
        <div className={css.contentBox}>
          <h1 className={css.title}>
            Take good <span>care</span> of your small pets
          </h1>
          <p className={css.text}>
            Choosing a pet for your home is a choice that is meant to enrich
            your life with immeasurable joy and tenderness.
          </p>
        </div>
        <Image
          src="/images/hero/hero-mob.webp"
          alt="Women and dog"
          width={332}
          height={432}
          sizes="(max-width: 767px) 100vw"
          className={css.imgMob}
          preload
        />
        <Image
          src="/images/hero/hero-tab.webp"
          alt="Women and dog"
          width={704}
          height={496}
          sizes="(min-width: 768px) and (max-width: 1279) 100vh"
          className={css.imgTab}
        />
        <Image
          src="/images/hero/hero-desk.webp"
          alt="Women and dog"
          width={1216}
          height={384}
          sizes="(min-width: 1280px) 100vw"
          className={css.imgDesc}
        />
      </div>
    </section>
  );
}
