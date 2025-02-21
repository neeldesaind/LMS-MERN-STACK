import  { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../Utils/Layout";
import axios from "axios";
import { server } from "../../main";
import "./dashboard.css";
import { Bar } from "react-chartjs-2"; // Import Bar chart component
import Chart from "chart.js/auto"; // For automatic registration

const AdminDashbord = ({ user }) => {
  const navigate = useNavigate();

  if (user && user.role !== "admin") return navigate("/");

  const [stats, setStats] = useState([]);

  async function fetchStats() {
    try {
      const { data } = await axios.get(`${server}/api/stats`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      setStats(data.stats);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchStats();
  }, []);

  // Prepare data for the charts
  const chartData = {
    labels: ["Total Courses", "Total Lectures", "Total Users"],
    datasets: [
      {
        label: "Statistics",
        data: [stats.totalCoures, stats.totalLectures, stats.totalUsers],
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)",
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  return (
    <div>
      <Layout>
        <div className="main-content">
          <div className="box">
            <p>Total Courses</p>
            <p>{stats.totalCoures}</p>
          </div>
          <div className="box">
            <p>Total Lectures</p>
            <p>{stats.totalLectures}</p>
          </div>
          <div className="box">
            <p>Total Users</p>
            <p>{stats.totalUsers}</p>
          </div>
          
          <div className="chart-container">
            <Bar data={chartData} options={options} /> {/* Render the Bar chart */}
          </div>
          
        </div>
      </Layout>
    </div>
  );
};

export default AdminDashbord;