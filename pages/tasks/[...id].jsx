import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import CodeMirror from "@uiw/react-codemirror";
import { cpp } from "@codemirror/lang-cpp";
import Loading from "../../components/Loading";
import { useSelector } from "react-redux";
import { setCredentials, userSelector } from "../../hooks/api/auth/authSlice";
import { useDispatch } from "react-redux";
import { getCookie } from "cookies-next";
import { useGetCurrentQuery } from "../../hooks/api/user/userSlice";
import { useGetQuestionQuery } from "../../hooks/api/question/questionSlice";
import { useRouter } from "next/dist/client/router";
import Image from "next/image";

const Submit = ({ token }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector(userSelector);
  const getCurrentQuery = useGetCurrentQuery(token);
  const {
    isSuccess,
    data = {},
    isError,
  } = useGetQuestionQuery({
    token: token,
    id: router.query.id[0],
  });

  if (isError) {
    router.push("/404");
  }

  useEffect(() => {
    if (getCurrentQuery.isSuccess) {
      dispatch(setCredentials(getCurrentQuery.data));
    }
  }, [dispatch, getCurrentQuery.data, getCurrentQuery.isSuccess]);
  let example = [];
  for (const key in data.ex_input) {
    if (data.ex_output[key]) {
      example.push(
        <div key={key}>
          <h1 className="text-secondary">TestCase {Number(key) + 1} : </h1>
          <br />
          <code className="code-block">
            <div className="flex consolas">
              <h1>Input &nbsp;&nbsp;&nbsp;:</h1>
              <p className="ml-2 consolas">{data.ex_input[key]}</p>
            </div>
            <div className="flex consolas">
              <h1>Output :</h1>
              <p className="ml-2 consolas">{data.ex_output[key]}</p>
            </div>
          </code>
          <br />
        </div>
      );
    }
  }
  return isSuccess ? (
    <Layout>
      <div className="app-body  text-white">
        <div className="md:flex flex-row w-full md:space-x-7 md:space-y-0 space-y-5">
          <div className="card md:w-[53%] bg-base-100 shadow-xl rounded-lg">
            <div className="problem-contents overflow-y-scroll max-h-[520px]">
              <h1 className="text-right prompt font-bold text-warning">
                {data.issuer}
              </h1>
              <a href={data.pdfLink} target="_blank" rel="noreferrer">
                <h1 className="text-center my-2 text-2xl font-bold prompt text-success">
                  {data.title}
                </h1>
              </a>
              <hr />
              <p className="my-5 indent-10 prompt md:whitespace-pre-wrap">
                {data.detail}
              </p>
              <div>
                <h1 className="text-secondary">Example : </h1>
                <br />
                <div className="relative overflow-x-auto">
                  <table className="tableDetail">
                    <thead>
                      <tr>
                        <th className="prompt">Input</th>
                        <th className="prompt">Output</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <p className="md:whitespace-pre-line prompt">
                            {data.detail_input}
                          </p>
                        </td>
                        <td>
                          <p className="md:whitespace-pre-line prompt">
                            {data.detail_output}
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <br />
              </div>
              {example}
              {data.image && (
                <>
                  <h1 className="text-success">Image : </h1>
                  <br />
                  <div className="text-center">
                    <Image
                      src={data.image}
                      width={200}
                      height={200}
                      alt="image"
                    />
                  </div>
                  <br />
                </>
              )}
              {data.note && (
                <>
                  <h1 className="text-success">Hint : </h1>
                  <p className="indent-10">{data.note ? data.note : "-"}</p>
                </>
              )}
            </div>
          </div>
          <div className="card md:w-[47%] bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Card title!</h2>
            </div>
          </div>
          {/* <div className="editor">
            <CodeMirror
              value={""}
              extensions={[cpp()]}
              theme="dark"
              placeholder="เขียนโปรแกรมของคุณ..."
              onChange={(value) => {
                console.log(value);
              }}
              autoFocus="true"
            />
            <div className="submit">
              <button>[ส่งคำตอบ]</button>
            </div>
          </div> */}
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
export default Submit;
