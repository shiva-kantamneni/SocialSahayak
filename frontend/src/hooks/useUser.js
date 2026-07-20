import { useEffect, useState } from "react";
import axios from "axios";
import { replace, useNavigate } from "react-router-dom";
const API_URL=import.meta.env.VITE_API_URL;

export default function useUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate=useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          `${API_URL}/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(res.data);
      } catch (err) {
        console.error(err);
        if(err.response?.status===401){
          localStorage.removeItem("token");
          navigate("/",{replace:true});
          return;
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  return { user, loading };
}