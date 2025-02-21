import { useEffect, useState } from "react";
import "./coursedescription.css";
import { useNavigate, useParams } from "react-router-dom";
import { CourseData } from "../../context/Coursecontext";
import { server } from "../../main";
import axios from "axios";
import toast from "react-hot-toast";
import { UserData } from "../../context/UserContext";
import Loading from "../../components/loading/Loading";
import PropTypes from "prop-types";

const CourseDescription = ({ user }) => {
  const params = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const { fetchUser } = UserData();

  const { fetchCourse, course, fetchCourses, fetchMyCourse } = CourseData();

  useEffect(() => {
    fetchCourse(params.id);
  }, [fetchCourse, params.id]);

  const checkoutHandler = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);

    const {
      data: { order },
    } = await axios.post(
      `${server}/api/course/checkout/${params.id}`,
      {},
      {
        headers: {
          token,
        },
      }
    );

    const options = {
      key: "rzp_test_vi34RXcAG0Azvt", // Enter the Key ID generated from the Dashboard  rzp_test_yOMeMyaj2wlvTt
      amount: order.id, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "EduVerse", //your business name
      description: "Learn with us",
      image:
        "https://lh3.googleusercontent.com/a/ACg8ocKrEK6Kl2wDnClJ4iubUcyul8crBbQLfe5sJQAnetWnsl9wPnk=s329-c-no",
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1

      handler: async function (response) {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
          response;

        try {
          const { data } = await axios.post(
            `${server}/api/verification/${params.id}`,
            {
              razorpay_order_id,
              razorpay_payment_id,
              razorpay_signature,
            },
            {
              headers: {
                token,
              },
            }
          );

          await fetchUser();
          await fetchCourses();
          await fetchMyCourse();
          toast.success(data.message);
          setLoading(false);
          navigate(`/payment-success/${razorpay_payment_id}`);
        } catch (error) {
          toast.error(error.response.data.message);
          setLoading(false);
        }
      },
      theme: {
        color: "#007bff",
      },
    };

    const razorpay = new window.Razorpay(options);

    razorpay.open();
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {course && (
            <div className="course-description-page">
            <div className="course-card-description">
              <div className="course-description">
                <div className="course-header">
                  <div className="course-image-container">
                    <img
                      src={`${server}/${course.image}`}
                      alt=""
                      className="course-image"
                    />
                  </div>
                  <div className="course-info-container">
                    <div className="course-info">
                      <h2>{course.title}</h2>
                      <p>Instructor: {course.createdBy}</p>
                    </div>
                  </div>
                </div>
                <div className="course-details">
                  <p>Duration: {course.duration} weeks</p>
                  <p>{course.description}</p>
                  <p>Let`s get started with course at ₹{course.price}</p>
                  {user && user.subscription.includes(course._id) ? (
                    <button
                      onClick={() => navigate(`/course/study/${course._id}`)}
                      className="common-btn"
                    >
                      Study
                    </button>
                  ) : (
                    <button onClick={checkoutHandler} className="common-btn">
                      Buy Now
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          )}
        </>
      )}
    </>
  );
};

// Add prop-types validation
CourseDescription.propTypes = {
  user: PropTypes.shape({
    subscription: PropTypes.arrayOf(PropTypes.string).isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
  course: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    createdBy: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
  }),
};

export default CourseDescription;










