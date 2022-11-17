import React, { useState, useEffect } from "react";
import Image from "next/image";
import { GoVerified } from "react-icons/go";
import axios from "axios";
import VideoCard from "../../components/videoCard";
import NoResults from "../../components/noResults";
import { IUser, Video } from "../../types";
import { BASE_URL } from "../../utils";

interface IProps {
  data: {
    user: IUser;
    userVideos: Video[];
    userLikedVideos: Video[];
  };
}

const Profile = ({ data }: IProps) => {
  const { user, userLikedVideos, userVideos } = data;
  const [showVideos, setShowVideos] = useState(true);
  const [videosList, setVideosList] = useState<Video[]>([]);
  const videos = showVideos ? "border-b-2 border-black" : "text-gray-400 ";
  const liked = !showVideos ? "border-b-2 border-black" : "text-gray-400 ";

  useEffect(() => {
    if (showVideos) {
      setVideosList(userVideos);
    } else {
      setVideosList(userLikedVideos);
    }
  }, [showVideos, userLikedVideos, userVideos]);

  return (
    <>
      <div className="w-full">
        <div className="flex gap-6 md:gap-10 mb-4 bg-white w-full">
          <div className="w-16 h-16 md:w-32 md:h-32">
            <Image
              src={user.image}
              width={34}
              height={34}
              className="rounded-full"
              layout="responsive"
              alt="user profile"
            />
          </div>
          <div className="flex flex-col justify-center">
            <p className="md:text-2xl tracking-wider flex gap-1 items-center justify-center text-md font-bold text-primary lowercase">
              {user.userName.replaceAll(" ", "")}{" "}
              <GoVerified className="text-blue-400" />
            </p>
            <p className="capitalize text-gray-400 text-xs md:text-xl">
              {user.userName}
            </p>
          </div>
        </div>
        <div className="">
          <div className="flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 bg-white w-full">
            <p
              className={`text-xl font-semibold cursor-pointer mt-2 ${videos}`}
              onClick={() => setShowVideos(true)}
            >
              Videos
            </p>
            <p
              className={`text-xl font-semibold cursor-pointer mt-2 ${liked}`}
              onClick={() => setShowVideos(false)}
            >
              Liked
            </p>
          </div>
          <div className="flex gap-6 flex-wrap md:justify-start">
            {videosList.length > 0 ? (
              videosList.map((post: Video, index: number) => (
                <VideoCard post={post} key={index} />
              ))
            ) : (
              <NoResults text={`No ${showVideos ? "" : "Liked"} Videos Yet`} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const { data } = await axios.get(`${BASE_URL}/api/profile/${id}`);
  return {
    props: {
      data,
    },
  };
};

export default Profile;
