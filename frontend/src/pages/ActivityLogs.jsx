import {
  useEffect,
  useState
} from "react";

import axios
from "axios";

export default function
ActivityLogs() {

  const [logs,
    setLogs] =
    useState([]);

  const token =
    localStorage.getItem(
      "token"
    );

  useEffect(() => {

    fetchLogs();

  }, []);

  const fetchLogs =
    async () => {

      try {

        const res =
          await axios.get(
            "https://name-wareflow-backend.onrender.com/api/activity",
            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }
          );

        setLogs(
          res.data
        );

      } catch (error) {

        console.log(error);
      }
    };

  return (
    <div className="p-8 text-white">

      <h1 className="text-3xl font-bold mb-6">

        Activity Logs

      </h1>

      <div className="bg-slate-900 rounded-2xl p-5 overflow-hidden">

        <table className="w-full text-center">

          <thead>

            <tr className="border-b border-slate-700">

              <th className="p-4">
                Role
              </th>

              <th>
                Action
              </th>

              <th>
                Date
              </th>

            </tr>

          </thead>

          <tbody>

            {logs.map(
              (log) => (

                <tr
                  key={
                    log._id
                  }
                  className="border-b border-slate-800"
                >

                  <td className="p-4">

                    {
                      log.performedBy
                    }

                  </td>

                  <td>

                    {
                      log.action
                    }

                  </td>

                  <td>

                    {new Date(
                      log.createdAt
                    ).toLocaleString()}

                  </td>

                </tr>
              )
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}