import React, { useState } from 'react';
import useJobs from '../../hooks/useJobs';
import HotJobCard from '../Home/HotJobCard';

const AllJob = () => {
    const [minSalary,setMinSalary] = useState('');
    const [maxSalary,setMaxSalary] = useState('');
    const [sort, setSort] = useState(false);
    const [search, setSearch] = useState("");
    const { jobs, loading } = useJobs(sort, search, minSalary, maxSalary);
    if (loading) {
        return <>
            <span className="loading loading-bars loading-xs"></span>
            <span className="loading loading-bars loading-sm"></span>
            <span className="loading loading-bars loading-md"></span>
            <span className="loading loading-bars loading-lg"></span>
        </>
    }
    return (
        <div>
            <h1 className='py-5 text-4xl font-bold text-center'>All Jobs</h1>
            <div className='max-w-7xl mx-auto bg-base-200 py-5 p-3 flex items-center gap-4'>
                <button onClick={() => setSort(!sort)} className={`btn btn-neutral ${sort && 'btn-success'}`}>
                    {sort === true ? "Sorted by Salary" : "Sorted by Salary"}
                </button>
                <input onChange={(e) => setSearch(e.target.value)} className='input w-full max-w-2xl' type="text" placeholder='Search Jobs Location' />
                <div className='flex items-center gap-3'>
                    <input onChange={(e) => setMinSalary(e.target.value)} className='input w-full max-w-2xl' type="text" placeholder='Min Salary' />
                    <input onChange={(e) => setMaxSalary(e.target.value)} className='input w-full max-w-2xl' type="text" placeholder='Max Salary' />
                </div>
            </div>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10'>
                {
                    jobs.map(job => <HotJobCard key={job._id} job={job}></HotJobCard>)
                }
            </div>
        </div>
    );
};

export default AllJob;