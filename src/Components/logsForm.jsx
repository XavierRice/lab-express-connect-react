//- A user can update a log using a form
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const LogForm = () => {
    const navigate = useNavigate()

    const [captainName, setCaptainName] = useState("")
    const [title, setTitle] = useState("")
    const [post, setPost] = useState("")
    const [mistakesMade, setMistakesMade] = useState(false)
    const [crisis, setCrisis] = useState(0)

    //   const addLog = () => {

    const API = process.env.REACT_APP_API_URL;

    fetch(`${API}/logs`, {
        method: "POST",
        body: JSON.stringify(log),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(() => {
            navigate(`/logs`);
        })
        .catch((error) => console.error("catch", error));
    //  };

    // const addingLog = async () => {

    //     try {
    //         const res = await fetch(`${API}/logs`, {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify(formData)
    //         });
    //         if (res.ok) {
    //             navigate('/logs');
    //         } else {
    //             console.log("LOG ENTRY FAILED", res.status)
    //         }
    //     } catch (error) {
    //         console.log("Err while creating entry", error)
    //     }

    // }

   async function postLog(data){
    try{
        const res = await fetch(`${API}/logs`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
        if(res.ok){
            navigate('/logs');
        } else {
            console.log("your log couldnt enter", res.status)
        }
    }catch (error){
        console.log("err while entry", error)
    }
   };

    function handleCaptain(event) {
        setCaptainName(event.target.value)
    };
    function handleTitle(event) {
        setTitle(event.target.value)
    };
    function handlePost(event) {
        setPost(event.target.value)
    };
    function handleMistakes(event) {
        setMistakesMade(event.target.value)
    };
    function handleCrisis(event) {
        setCrisis(event.target.value)
    }

    function handleSubmit(event) {
        event.preventDefault();

        const log = {

            captainName: captainName,
            title: title,
            post: post,
            mistakesWereMadeToday: mistakesMade,
            daysSinceLastCrisis: crisis
        };
        postLog(log)
    };




    return (
        <div className="container">
            <h3 className="header">Captain's Log Form</h3>
            <div className="logForm">
                <form onSubmit={handleSubmit}>
                    <input
                        name="captainName"
                        type="text"
                        value={captainName}
                        onChange={handleCaptain}
                        placeholder="Captain's Name"
                    />
                    <hr></hr>
                    <input
                        name="title"
                        type="text"
                        value={title}
                        onChange={handleTitle}
                        placeholder="Title"
                    />
                    <hr></hr>
                    <input
                        name="post"
                        type="text"
                        value={post}
                        onChange={handlePost}
                        placeholder="Log Here"
                    />
                    <hr></hr>
                    <select
                        name="mistakesMade"
                        onChange={handleMistakes}
                        value={mistakesMade}
                    >
                        <option value={true}>true</option>
                        <option value={false}>false</option>
                    </select>
                    <hr></hr>
                    <input
                        name="daysSinceLastCrisis"
                        type="number"
                        value={crisis}
                        onChange={handleCrisis}
                    />
                    <hr></hr>
                </form>
                <button onClick={handleSubmit}>Submit</button>
                <br />
                <Link to={`/logs`}>
                    <button>Nevermind!</button>
                </Link>
            </div>
            <div className="box returnedLog">
                <h1>{captainName}</h1>
                <h2>{title}</h2>
                <p>{post}</p>
                <p>Mistakes were made today: {mistakesMade ? 'Yes' : 'No'}</p>
                <p>Days since last crisis: {crisis}</p>
            </div>
        </div>
    );

};

export default LogForm;




