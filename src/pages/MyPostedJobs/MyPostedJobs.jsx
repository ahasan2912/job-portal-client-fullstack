import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const MyPostedJobs = () => {
    const [jobs, setJobs] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        fetch(`https://job-application-server-lilac.vercel.app/jobs?email=${user.email}`)
            .then(res => res.json())
            .then(data => setJobs(data));
    }, [user.email]);

    return (
        <div>
            <h2 className='text-4xl font-semibold my-3 text-center'>Recruiter or HR Posted Job List {jobs.length}</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Serial</th>
                            <th>Name</th>
                            <th>Job Title</th>
                            <th>Daedline</th>
                            <th>Job Count</th>
                            <th>View Application</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            jobs.map((job, idx) =>
                                <tr key={idx} className="hover">
                                    <th>{idx + 1}</th>
                                    <td>{job.hr_name}</td>
                                    <td>{job.title}</td>
                                    <td>{job.applicationDeadline}</td>
                                    <td>{job.applicationCount}</td>
                                    <td>
                                        <Link to={`/viewApplications/${job._id}`}>
                                            <button className='btn btn-link'>View Application</button>
                                        </Link>
                                    </td>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyPostedJobs;