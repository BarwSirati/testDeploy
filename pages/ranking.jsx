import React, { useEffect } from "react";
import Layout from "../components/Layout";
import { getCookie } from "cookies-next";
import { useDispatch } from "react-redux";
import { useGetCurrentQuery } from "../hooks/api/user/userSlice";
import { setCredentials } from "../hooks/api/auth/authSlice";
import Loading from "../components/Loading";
import Table from "../components/Ranking/Table";

const Ranking = ({ token }) => {
  const { data, isSuccess } = useGetCurrentQuery(token);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isSuccess) {
      dispatch(setCredentials(data));
    }
  }, [data, dispatch, isSuccess]);
  return isSuccess ? (
    <Layout>
      <div className="text-center">
        <h1 className="md:text-4xl text-2xl font-bold text-success drop-shadow-lg">Ranking</h1>
      </div>
      <Table token={token} />
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
export default Ranking;
