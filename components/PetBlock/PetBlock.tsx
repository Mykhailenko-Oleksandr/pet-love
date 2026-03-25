import Image from "next/image";
import css from "./PetBlock.module.css";
import clsx from "clsx";

interface PetBlockProps {
  page: "login" | "register" | "addPet";
}

export default function PetBlock({ page }: PetBlockProps) {
  return (
    <div className={clsx(css.box, page === "addPet" && css.addPetPage)}>
      <svg
        className={clsx(css.figureIcon, page === "addPet" && css.inAddPetPage)}
        width="312"
        height="375"
        viewBox="0 0 312 375"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0.414927 56.3618C-4.00164 21.762 27.4724 -6.61366 61.4312 1.35215L272.78 50.9288C300.37 57.4008 317.072 85.4864 309.584 112.819L286.6 196.715C281.317 216 278.64 235.905 278.64 255.9V324.776C278.64 360.222 242.778 384.413 209.912 371.136L33.9817 300.066C14.029 292.006 1.47153 272.083 2.80585 250.606L8.54151 158.282C9.60487 141.166 9.04711 123.987 6.87566 106.976L0.71655 58.7248L0.414927 56.3618Z" />
      </svg>

      <svg
        className={clsx(
          css.figureIconDesc,
          page === "addPet" && css.inAddPetPage,
        )}
        width="530"
        height="601"
        viewBox="0 0 530 601"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0.851952 116.075C-8.2259 44.7862 56.6471 -13.6512 126.603 2.79831L450.176 78.8831C506.959 92.2352 541.334 150.034 525.956 206.302L485.092 355.825C479.833 375.069 477.168 394.929 477.168 414.878V530.987C477.168 604.043 403.223 653.877 335.508 626.456L66.8165 517.652C25.7626 501.027 -0.066391 460.018 2.6734 415.811L12.9813 249.49C14.0395 232.415 13.4844 215.278 11.3233 198.306L0.851952 116.075Z" />
      </svg>

      {page === "register" && (
        <Image
          src="/images/cat-register.png"
          alt="Cat"
          width={833}
          height={832}
          sizes="(max-width: 1279px) 506px, 833px"
          loading="eager"
          className={css.img}
        />
      )}

      {page === "login" && (
        <Image
          src="/images/dog-login.png"
          alt="Dog"
          width={787}
          height={786}
          sizes="(max-width: 1279px) 451px, 787px"
          loading="eager"
          className={clsx(css.img, css.imgDog)}
        />
      )}

      {page === "addPet" && (
        <Image
          src="/images/dog-add.png"
          alt="Dog"
          width={648}
          height={648}
          sizes="(max-width: 767px) 291px, (max-width: 1279px) 375px, 648px"
          loading="eager"
          className={clsx(css.img, css.imgDogAdd)}
        />
      )}

      {page !== "addPet" && (
        <div className={css.petInfoBox}>
          <div className={css.iconPetBox}>
            <Image
              src={
                page === "register"
                  ? "/images/cat-icon.png"
                  : "/images/dog-icon.png"
              }
              alt={page === "register" ? "Cat avatar" : "Dog avatar"}
              width={32}
              height={32}
            />
          </div>
          <div className={css.infoBox}>
            <div className={css.topInfoBox}>
              <p className={css.petName}>
                {page === "register" ? "Jack" : "Rich"}
              </p>
              <div className={css.petBirthdayBox}>
                <p className={css.petBirthday}>Birthday:</p>
                <p className={css.petBirthdayData}>
                  {page === "register" ? "18.10.2021" : "21.09.2020"}
                </p>
              </div>
            </div>
            <p className={css.descriptionPet}>
              {page === "register"
                ? "Jack is a gray Persian cat with green eyes. He loves to be pampered and groomed, and enjoys playing with toys."
                : "Rich would be the perfect addition to an active family that loves to play and go on walks. I bet he would love having a doggy playmate too!"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
