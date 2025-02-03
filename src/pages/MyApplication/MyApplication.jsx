import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../context/AuthContex/useAxiosSecure';
import useAuth from '../../hooks/useAuth';

const MyApplication = () => {
    const { user } = useAuth();
    const [jobs, setJobs] = useState([]);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        /*  fetch(`https://job-application-server-lilac.vercel.app/job-application?email=${user.email}`)
             .then(res => res.json())
             .then(data => {
                 setJobs(data);
             }) */
        /*  axios.get(`https://job-application-server-lilac.vercel.app/job-application?email=${user.email}`, { withCredentials: true })
             .then(res => setJobs(res.data)) */

        axiosSecure.get(`/job-application?email=${user.email}`)
            .then(res => setJobs(res.data));

    }, [])
    return (
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th>Seiral</th>
                        <th>Company Logo</th>
                        <th>Name</th>
                        <th>Job</th>
                    </tr>
                </thead>
                <tbody>
                    {/* row 1 */}
                    {
                        jobs.map((job, idx) => <tr key={idx}>
                            <th>{idx + 1}</th>
                            <th>
                                <img className='w-12 h-12 rounded-full' src={job.company_logo} alt="" />
                            </th>
                            <td>{job.title}</td>
                            <td>{job.company}</td>
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default MyApplication;
