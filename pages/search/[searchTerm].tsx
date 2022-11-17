import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { GoVerified } from "react-icons/go";
import { BASE_URL } from "../../utils";
import Link from "next/link";
import useAuthStore from "../../store/authStore";
import { IUser, Video } from "../../types";
import NoResults from "../../components/noResults";
import VideoCard from "../../components/videoCard";
import Image from "next/image";

const Search = ({ data }: { data: Video[] }) => {
  const [isAccounts, setIsAccounts] = useState(true);
  const router = useRouter();
  const { searchTerm }: any = router.query;
  const { allUsers } = useAuthStore();

  const accounts = isAccounts ? "border-b-2 border-black" : "text-gray-400 ";
  const isVideos = !isAccounts ? "border-b-2 border-black" : "text-gray-400 ";
  const {} = useAuthStore();

  const searchedAccounts = allUsers.filter((user: IUser) =>
    user.userName.toLocaleLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="w-full">
        <div className="flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full">
          <p
            className={`text-xl font-semibold cursor-pointer mt-2 ${accounts}`}
            onClick={() => setIsAccounts(true)}
          >
            Accounts
          </p>
          <p
            className={`text-xl font-semibold cursor-pointer mt-2 ${isVideos}`}
            onClick={() => setIsAccounts(false)}
          >
            Videos
          </p>
        </div>
        {isAccounts ? (
          <div className="md:mt-16">
            {searchedAccounts.length > 0 ? (
              searchedAccounts.map((user: IUser, index: number) => (
                <Link href={`/profile/${user._id}`} key={index}>
                  <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded border-b-2 border-gray-200">
                    <div>
                      <Image
                        src={user.image}
                        width={50}
                        height={50}
                        className="rounded-full"
                        alt="user profile"
                      />
                    </div>
                    <div className="hidden lg:block ">
                      <p className="flex gap-1 items-center text-md font-bold text-primary lowercase">
                        {user.userName.replaceAll(" ", "")}{" "}
                        <GoVerified className="text-blue-400" />
                      </p>
                      <p className="capitalize text-gray-400 text-xs">
                        {user.userName}
                      </p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <NoResults text={`No video Results for ${searchTerm}`} />
            )}
          </div>
        ) : (
          <div className="md:mt-16 flex flex-wrap gap-6 md:justify-start">
            {data.length ? (
              data.map((video: Video, index) => (
                <VideoCard post={video} key={index} />
              ))
            ) : (
              <NoResults text={`No video Results for ${searchTerm}`} />
            )}
          </div>
        )}
      </div>
    </>
  );
};

export const getServerSideProps = async ({
  params: { searchTerm },
}: {
  params: { searchTerm: string };
}) => {
  const { data } = await axios.get(`${BASE_URL}/api/search/${searchTerm}`);
  return {
    props: {
      data,
    },
  };
};

export default Search;
