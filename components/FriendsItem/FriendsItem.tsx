import { Friends } from "@/types/friends";
import css from "./FriendsItem.module.css";
import Image from "next/image";
import { WorkDay } from "@/types/workDay";
import Link from "next/link";

interface FriendsItemProps {
  friend: Friends;
}

export default function FriendsItem({ friend }: FriendsItemProps) {
  function getTimeWorkDay(workDays: WorkDay[]) {
    if (workDays) {
      const firstWorkDay = workDays.find((day) => day.from && day.to);

      if (firstWorkDay) {
        const workDay = `${firstWorkDay.from}-${firstWorkDay.to}`;
        return workDay;
      }
    }
    return "Day and night";
  }

  return (
    <li className={css.item}>
      <Link href={friend.url} target="_blank">
        <Image
          src={friend.imageUrl}
          alt="Logo company"
          width={90}
          height={90}
          sizes="(max-width: 767px) 80px, 90px"
          className={css.img}
        />
      </Link>
      <div className={css.contentBox}>
        <Link href={friend.url} className={css.title}>
          {friend.title}
        </Link>
        <ul className={css.contactList}>
          <li className={css.contactItem}>
            Email:&nbsp;
            {friend.email ? (
              <Link href={`mailto:${friend.email}`}>{friend.email}</Link>
            ) : (
              <span>Not specified</span>
            )}
          </li>
          <li className={css.contactItem}>
            Address:&nbsp;
            {friend.addressUrl ? (
              <Link href={friend.addressUrl} target="_blank">
                {friend.address}
              </Link>
            ) : (
              <span>Not specified</span>
            )}
          </li>
          <li className={css.contactItem}>
            Phone:&nbsp;
            {friend.phone ? (
              <Link href={`tel:${friend.phone}`}>{friend.phone}</Link>
            ) : (
              <span>Not specified</span>
            )}
          </li>
        </ul>
      </div>
      <div className={css.timeWorkBadge}>{getTimeWorkDay(friend.workDays)}</div>
    </li>
  );
}
