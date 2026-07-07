import { useEffect, useState } from "react";

export default function useHistory() {

    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

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

                if (res.status === 401) {
                    localStorage.removeItem("token");
                    window.location.href = "/";
                    return;
                }

                const data = await res.json();

                setHistory(data);

            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }

        };

        fetchHistory();

    }, []);

    return {
        history,
        loading
    };

}