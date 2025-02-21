import { useState } from "react";
import "./courses.css";
import { CourseData } from "../../context/Coursecontext";
import CourseCard from "../../components/coursecard/CourseCard";

const Courses = () => {
  const { courses } = CourseData();
  const [searchTerm, setSearchTerm] = useState("");

  // Handle the search logic
  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="courses">
      <h2>Available Courses</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search courses..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />

      <div className="course-container">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((e) => <CourseCard key={e._id} course={e} />)
        ) : (
          <p>No Courses Found!</p>
        )}
      </div>
    </div>
  );
};

export default Courses;
