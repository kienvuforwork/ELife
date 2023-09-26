"use client";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Link from "next/link";
const Notification = () => {
  const notifications = useSelector(
    (state: RootState) => state.userSlice.notifications
  );
  return notifications ? (
    <div className="border-2 border-elife-700  w-full pt-2 flex flex-col gap-2">
      {notifications.map((item: any, index: number) => (
        <Link href={`/user/${item.username}`} key={index}>
          <div
            className={`flex items-center gap-4 p-4 border-b-2 border-elife-700 ${
              item.read && "bg-elife-700"
            } hover:opacity-90 cursor-pointer`}
          >
            <img className="rounded-full w-10 h-10" src={item.avatar}></img>
            <div className="text-lg text-elife-600">
              {item.username} {item.message}
            </div>
          </div>
        </Link>
      ))}
    </div>
  ) : (
    <div className="text-center pt-4 text-lg">
      You dont have any notifications!
    </div>
  );
};

export default Notification;
