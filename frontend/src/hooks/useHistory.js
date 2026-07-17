import { useEffect, useState } from "react";
import { replace,useNavigate } from "react-router-dom";

export default function useHistory() {

    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate=useNavigate();

    useEffect(() => {

        const fetchHistory = async () => {

            try {

                const token = localStorage.getItem("token");

                const res = await fetch(
                    "http://localhost:8000/history",
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