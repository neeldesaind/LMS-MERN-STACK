import "./paymentsuccess.css";
import { Link, useParams } from "react-router-dom";
import PropTypes from "prop-types";

const PaymentSuccess = ({ user }) => {
  const params = useParams();
  
  return (
    <div className="payment-success-page">
      {user && (
        <div className="success-message">
          <h2>Payment successful</h2>
          <p>Course subscription has been activated</p>
          <p>Reference no - {params.id}</p>
          <Link to={`/${user._id}/dashboard`} className="common-btn">
            Go to Dashboard
          </Link>
        </div>
      )}
    </div>
  );
};

// Add prop-types validation
PaymentSuccess.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired, // Validate that user has _id
  }),
};

export default PaymentSuccess;
