import axios from "axios";
import { useState, useEffect } from "react";
import { PiTrashLight } from "react-icons/pi";

const Fields = () => {
    const [loading, setLoading] = useState(true);
    const [schoolInput, setSchoolInput] = useState("");
    const [courseInput, setCourseInput] = useState("");
    const [schools, setSchools] = useState([]);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchLists = async () => {
            await axios
                .get("http://localhost:5000/fields/schools")
                .then((res) => {
                    const schools = res.data.schools;
                    setSchools(schools);
                });
            await axios
                .get("http://localhost:5000/fields/courses")
                .then((res) => {
                    const courses = res.data.courses;
                    setCourses(courses);
                });
            setLoading(false);
        };
        fetchLists();
    }, [schoolInput, courseInput]);

    const handleAddSchool = async (event) => {
        event.preventDefault();
        setLoading(true);
        await axios
            .post("http://localhost:5000/fields/addschool", { schoolInput })
            .then((res) => {
                if (res.data.message === "success")
                    setSchools((prev) => [...prev, schoolInput]);
                setSchoolInput("");
            });
        setLoading(false);
    };

    const handleAddCourse = async (event) => {
        event.preventDefault();
        setLoading(true);
        await axios
            .post("http://localhost:5000/fields/addcourse", { courseInput })
            .then((res) => {
                if (res.data.message === "success")
                    setCourses((prev) => [...prev, courseInput]);
                setCourseInput("");
            });
        setLoading(false);
    };

    const handleDelSchool = async (event, value) => {
        event.preventDefault();
        setLoading(true);
        await axios
            .post("http://localhost:5000/fields/removeschool", {
                schoolToDel: value,
            })
            .then((res) => {
                if (res.data.message === "success")
                    setSchools((prev) =>
                        prev.filter((school) => school !== value)
                    );
            });
        setLoading(false);
    };

    const handleDelCourse = async (event, value) => {
        event.preventDefault();
        setLoading(true);
        await axios
            .post("http://localhost:5000/fields/removecourse", {
                courseToDel: value,
            })
            .then((res) => {
                if (res.data.message === "success")
                    setCourses((prev) =>
                        prev.filter((course) => course !== value)
                    );
            });
        setLoading(false);
    };

    return (
        <>
            <header className="ml-16 mt-10 flex flex-col">
                <h1 className="text-5xl font-bold text-primary">Fields</h1>
                <p className="font-light text-gray-400">
                    Add or Delete schools and courses
                </p>
            </header>
            {loading ? (
                <div className="flex h-[calc(100vh-6rem)] items-center justify-center">
                    <span className="loading loading-spinner loading-xl"></span>
                </div>
            ) : (
                <main className="flex flex-row w-full h-[calc(100vh-6rem)] p-16 pt-9">
                    <section className="flex flex-col w-[50%] pr-10 border-r border-gray-200">
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">
                                Add a school
                            </legend>
                            <div className="join join-horizontal">
                                <input
                                    type="text"
                                    className="input join-item w-full"
                                    placeholder="Ex. SAMCIS, SABM, etc."
                                    value={schoolInput}
                                    onChange={(e) => {
                                        setSchoolInput(e.target.value);
                                    }}
                                />
                                <button
                                    className="btn btn-primary btn-outline"
                                    onClick={(e) => handleAddSchool(e)}
                                >
                                    Add
                                </button>
                            </div>
                            <p className="fieldset-label">
                                Please enter the acronym of the school
                            </p>
                        </fieldset>
                        <div className="h-100% overflow-y-auto rounded-box border border-base-content/5 bg-base-100">
                            <table className="table table-md table-pin-rows">
                                <thead>
                                    <tr>
                                        <th>Schools</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {!schools ? (
                                        <tr>
                                            <th>No schools yet</th>
                                        </tr>
                                    ) : (
                                        schools.map((school) => (
                                            <tr
                                                key={school}
                                                className="transition-all hover:bg-base-200"
                                            >
                                                
                                                <td className="flex justify-between flex-row">
                                                    <span>{school}</span>
                                                    <span>
                                                        <PiTrashLight
                                                            size={25}
                                                            className="rounded-full text-primary transition-all hover:bg-base-300 mr-5 p-1"
                                                            onClick={(e) =>
                                                                handleDelSchool(
                                                                    e,
                                                                    school
                                                                )
                                                            }
                                                        />
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </section>
                    <section className="flex flex-col w-[50%] pl-10">
                        <fieldset className="fieldset">
                            <legend className="fieldset-legend">
                                Add a course
                            </legend>
                            <div className="join join-horizontal">
                                <input
                                    type="text"
                                    className="input join-item w-full"
                                    placeholder="Ex. A.A. - ASSOCIATE IN ARTS, MD - DOCTOR OF MEDICINE, etc."
                                    value={courseInput}
                                    onChange={(e) => {
                                        setCourseInput(e.target.value);
                                    }}
                                />
                                <button
                                    className="btn btn-primary btn-outline"
                                    onClick={(e) => handleAddCourse(e)}
                                >
                                    Add
                                </button>
                            </div>
                            <p className="fieldset-label">
                                Please enter the acronym followed by the
                                descriptive name
                            </p>
                        </fieldset>
                        <div className="h-100% overflow-y-auto rounded-box border border-base-content/5 bg-base-100">
                            <table className="table table-md table-pin-rows">
                                <thead>
                                    <tr>
                                        <th>Courses</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {!courses ? (
                                        <tr>
                                            <th>No courses yet</th>
                                        </tr>
                                    ) : (
                                        courses.map((course) => (
                                            <tr
                                                key={course}
                                                className="transition-all hover:bg-base-200"
                                            >
                                                <td className="flex justify-between flex-row">
                                                    <span>{course}</span>
                                                    <span>
                                                        <PiTrashLight
                                                            size={25}
                                                            className="rounded-full text-primary transition-all hover:bg-base-300 mr-5 p-1"
                                                            onClick={(e) =>
                                                                handleDelCourse(
                                                                    e,
                                                                    course
                                                                )
                                                            }
                                                        />
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </main>
            )}
        </>
    );
};

export default Fields;
