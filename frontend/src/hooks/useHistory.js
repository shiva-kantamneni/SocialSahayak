import { useEffect, useState } from "react";
import { replace,useNavigate } from "react-router-dom";
const API_URL=import.meta.env.VITE_API_URL;

export default function useHistory() {

    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate=useNavigate();

    useEffect(() => {

        const fetchHistory = async () => {

            try {

                const token = localStorage.getItem("token");

                const res = await fetch(
                    `${API_URL}/history`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                const data = await res.json();

                setHistory(data);

            } catch (err) {
                console.error(err);
                if(res.response?.status===401){
                    localStorage.removeItem("token");
                    navigate("/",{replace:true});
                    return;
                    
                }
            } finally {
                setLoading(false);
            }

        };

        fetchHistory();

    }, [navigate]);

    return {
        history,
        loading
    };

}