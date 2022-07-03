import React, { useEffect } from "react";
import { getCookie } from "cookies-next";
import Loading from "../../components/Loading";
import Layout from "../../components/Layout";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../hooks/api/auth/authSlice";
import { useGetQuestionsQuery } from "../../hooks/api/question/questionSlice";
import jwtDecode from "jwt-decode";
const Tasks = ({ token, user }) => {
  const { isSuccess, data = [] } = useGetQuestionsQuery(token);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user) {
      dispatch(setCredentials(user));
    }
  }, [dispatch, user]);
  return (
    <Layout>
      <div className="w-full bg-primary rounded-lg p-3 text-white">test</div>
    </Layout>
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
  const user = jwtDecode(isAuth);
  return { props: { token, user } };
};
export default Tasks;
