"use client";

import avatarPng from "@icons/assets/image-avatar.png";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Avatar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const openDropdown = () => setIsOpen(true);

  const openProfile = () => {
    alert("Mocked opening of profile!");
    setIsOpen(false);
  };
  const logout = async () => {
    try {
      await fetch("/api/user/logout", {
        method: "DELETE",
      });
    } catch (e) {
    } finally {
      router.push("/login");
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.addEventListener("click", (e) => {
        if (e.target.closest("#avatar-button")) {
          return;
        }
        setIsOpen(false);
      });
    }

    return () => {
      document.body.removeEventListener("click", () => setIsOpen(false));
    };
  }, [isOpen]);

  return (
    <div id="avatar-button" className="relative">
      <button onClick={openDropdown}>
        <Image
          className="relative w-6 aspect-square border-[1px] border-white rounded-full xl:w-10"
          src={avatarPng}
          alt="Avatar user icon"
        />
      </button>
      {isOpen && (
        <div
          className={`absolute z-10  bg-darkBlue rounded-lg right-0 top-10 border-white border-2 border-opacity-25 lg:left-10 lg:right-[unset] lg:top-[unset] lg:bottom-[-35px] lg:border-none lg:rounded-[10px]`}
        >
          <ul
            className={`flex flex-col text-right w-[120px] transition-all delay-1000 lg:w-0 lg:overflow-hidden ${isOpen && "lg:w-[120px]"}`}
          >
            <li>
              <button
                className=" p-4 uppercase font-semibold text-white text-opacity-80 text-sm hover:text-blue transition-all"
                onClick={openProfile}
              >
                Profile
              </button>
            </li>
            <li>
              <button
                className=" p-4 uppercase font-semibold text-white text-opacity-80 text-sm hover:text-blue transition-all"
                onClick={logout}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Avatar;
