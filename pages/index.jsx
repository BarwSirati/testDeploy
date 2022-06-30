import React, { useEffect } from "react";
import { getCookie } from "cookies-next";
import Planet from "../components/Home/Planet";
import Loading from "../components/Loading";
import Layout from "../components/Layout";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { useGetCurrentQuery } from "../hooks/api/user/userSlice";
import Image from "next/image";
import RocketJet from "../public/pictures/Rocket.png";
import Top3Card from "../components/Home/Top3Card";
import { setCredentials } from "../hooks/api/auth/authSlice";
const Home = ({ token }) => {
  const { data, isSuccess } = useGetCurrentQuery(token);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isSuccess) {
      dispatch(setCredentials(data));
    }
  }, [data, dispatch, isSuccess]);
  return isSuccess ? (
    <Layout>
      <div className="text-center relative mt-40 z-10 hero">
        <div className="hero-content">
          <div className="max-w-xl space-y-5">
            <h1 className="text-white md:text-5xl text-2xl font-semibold">
              Practice C Programing
            </h1>
            <h1 className="text-white md:text-4xl text-xl font-semibold">
              In 1 Week
            </h1>
            <Link href="/tasks">
              <button className="cursor-pointer btn btn-outline btn-success my-5">
                GET START
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Planet />
      <div className="rocketJet">
        <Image src={RocketJet} alt="" />
      </div>
      <div className="relative lg:-top-100">
        <div className="text-white font-bold text-center">
          <h1 className="md:text-5xl text-3xl">Top 3 ranking</h1>
        </div>
      </div>
      <div className="relative md:-mt-56 md:mb-56 ">
        <Top3Card token={token} />
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

export default Home;
