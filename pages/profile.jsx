import React, { useEffect } from "react";
import Layout from "../components/Layout";
import { getCookie } from "cookies-next";
import { useDispatch } from "react-redux";
import { useGetCurrentQuery } from "../hooks/api/user/userSlice";
import { setCredentials } from "../hooks/api/auth/authSlice";
import Loading from "../components/Loading";
import ProgressBar from "../components/Profile/ProgressBar";
import PlanetImageSwitch from "../components/PlanetImageSwitch";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faSave,
  faXmark,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  username: yup.string(),
  name: yup.string(),
  password: yup.string(),
});

const Profile = ({ token }) => {
  const { data, isSuccess } = useGetCurrentQuery(token);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isSuccess) {
      dispatch(setCredentials(data));
    }
  }, [data, dispatch, isSuccess]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data) => {};
  return isSuccess ? (
    <Layout>
      <div className="max-w-6xl md:flex flex-row mx-auto font-bold">
        <div className="md:w-1/2 p-5 text-center text-white">
          <div className="card w-full bg-base-100 shadow-xl">
            <div className="card-body bg-primary p-4 text-2xl">
              <h2>Profile</h2>
            </div>
            <figure className={`${data.group === 5 ? "md:w-96 my-3" : "w-48"}  mx-auto`}>
              <Image src={PlanetImageSwitch(data.group)} alt="profile" />
            </figure>
            <div className="flex p-5">
              <div className="w-1/2">
                <h2 className="text-xl">Username</h2>
                <br />
                {data.username}
              </div>
              <div className="w-1/2">
                <h2 className="text-xl">NickName</h2>
                <br />
                {data.name}
              </div>
            </div>
            <div className="py-4">
              <label
                htmlFor="my-modal"
                className="btn btn-outline  px-20 modal-button"
              >
                <FontAwesomeIcon icon={faEdit} /> &nbsp; EDIT
              </label>
            </div>
          </div>
        </div>
        <div className="md:w-1/2 p-5 text-center text-white">
          <div className="flex-row md:space-y-16 space-y-10">
            <div className="card w-full bg-base-100 shadow-xl mx-auto">
              <div className="card-body bg-primary p-4 text-2xl">
                <h2>Score</h2>
              </div>
              <div className="flex p-11">
                <div className="w-1/2 space-y-5 text-success">
                  <h2 className="text-2xl">RANK</h2>
                  <h2 className="text-3xl">{data.rank}</h2>
                </div>
                <div className="w-1/2 space-y-5 text-warning">
                  <h2 className="text-2xl">SCORE</h2>
                  <h2 className="text-3xl">{data.score}</h2>
                </div>
              </div>
            </div>

            <div className="card w-full bg-base-100 shadow-xl mx-auto">
              <div className="card-body bg-primary p-4 text-2xl">
                <h2>Progress</h2>
              </div>
              <div className="p-6 space-y-6">
                <h2 className="text-3xl">{data.progress}/100</h2>
                <ProgressBar value={data.progress} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <input type="checkbox" id="my-modal" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-2xl text-center text-white">
              <FontAwesomeIcon icon={faUser} /> &nbsp; Your Profile
            </h3>
            <div className="mt-5 space-y-5">
              <input
                type="text"
                placeholder="Change Username"
                className="input input-bordered w-full border-primary"
              />
              <input
                type="text"
                placeholder="Change Nickname"
                className="input input-bordered w-full border-primary"
              />
              <input
                type="password"
                placeholder="Change Password"
                className="input input-bordered w-full border-primary"
              />
              <div className="w-full flex justify-center space-x-5">
                <button className="btn btn-warning">
                  <FontAwesomeIcon icon={faSave} className="text-xl" /> &nbsp;
                  Save
                </button>
                <label htmlFor="my-modal" className="btn btn-error">
                  <FontAwesomeIcon icon={faXmark} className="text-xl" /> &nbsp;
                  Close
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  ) : (
    <Loading />
  );
};

export const getServerSideProps = ({ req, res }) => {
  const isAuth = getCookie("token", { req, res });
  if (!isAuth) {
    return {
      redirect: {
        permanent: false,
        destination: "/login",
      },
      props: {},
    };
  }
  const token = `Bearer ` + isAuth;
  return { props: { token } };
};

export default Profile;
