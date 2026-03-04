import Link from "next/link";
import css from "./NotFoundSection.module.css";
import Image from "next/image";
import clsx from "clsx";

export default function NotFoundSection() {
  return (
    <section className={css.section}>
      <div className={clsx("container", css.containerNotFound)}>
        <div className={css.contentBox}>
          <div className={css.statusBox}>
            <p className={css.statusNumber}>4</p>
            <div className={css.statusZeroBox}>
              <Image
                className={css.imgCat}
                src="/images/cat-404.png"
                alt="Cat"
                width={454}
                height={455}
                sizes="(max-width: 767px) 176px, (max-width: 1279px) 454px, 454px"
                loading="eager"
              />
            </div>
            <p className={css.statusNumber}>4</p>
          </div>
          <p className={css.description}>{"Ooops! This page not found :("}</p>

          <Link className={css.link} href="/">
            To home page
          </Link>
        </div>
      </div>
    </section>
  );
}
