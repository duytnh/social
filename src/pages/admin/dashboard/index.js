import React, { useEffect, useState } from 'react'
import './style.scss'
import Card from '../../../components/Card'
import apiAnalytics from '../../../services/Analytics';
import { useSelector } from 'react-redux';
import AlertError from '../../../components/Alert/AlertError';
import { Bar, Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend
);

function Dashboard() {
    const user = useSelector(state => state.auth.user);
    const token = user && user.jwt;

    const [countPost, setCountPost] = useState(0);
    const [countUser, setCountUser] = useState(0);
    const [error, setError] = useState('');
    const [postUser, setPostUser] = useState([]);
    const [postLC, setPostLC] = useState([]);
    const [username, setUsername] = useState([]);
    const [number, setNumber] = useState([]);

    const [postUsername, setPostUsername] = useState([]);
    const [postLike, setPostLike] = useState([]);
    const [postComment, setPostComment] = useState([]);

    useEffect(() => {
        const fetchCount = async () => {
            try {
                const response = await apiAnalytics.countPostAndUser(token);
                if (response.data.status === 200) {
                    setCountPost(response.data.numPost);
                    setCountUser(response.data.numUser);
                } else {
                    setError(response.data.message);
                }
            } catch (error) {
                setError('Máy chủ không phản hồi');
            }
        };

        fetchCount();
    }, [token]);

    useEffect(() => {
        const fetchCountPostUser = async () => {
            try {
                const response = await apiAnalytics.countPostByUser(token);
                if (response.data.status === 200) {
                    setPostUser(response.data.data);
                } else {
                    setError(response.data.message);
                }
            } catch (error) {
                setError('Máy chủ không phản hồi');
            }
        };

        fetchCountPostUser();
    }, [token]);

    useEffect(() => {
        const fetchLikeCommentPost = async () => {
            try {
                const response = await apiAnalytics.countLikeCommentPost(token);
                if (response.data.status === 200) {
                    setPostLC(response.data.data);
                } else {
                    setError(response.data.message);
                }
            } catch (error) {
                setError('Máy chủ không phản hồi');
            }
        };

        fetchLikeCommentPost();
    }, [token]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setError('');
        }, 3000);
        return () => clearTimeout(timer);
    }, [error]);

    useEffect(() => {
        const usernames = postUser.map(item => item.username);
        const numbers = postUser.map(item => item.numPosts);

        setUsername(usernames);
        setNumber(numbers);
    }, [postUser]);

    useEffect(() => {
        const postUsername = postLC.map(item => item.username);
        const postLike = postLC.map(item => item.like_count);
        const postComment = postLC.map(item => item.comment_count);

        setPostUsername(postUsername);
        setPostLike(postLike);
        setPostComment(postComment);
    }, [postLC]);

    const data = {
        labels: username,
        datasets: [
            {
                label: "Number posts",
                backgroundColor: ["rgb(185, 70, 25)", "#8e5ea2", "rgb(13, 114, 13)", "#3e9ea2"],
                data: number
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: "top",
            },
            title: {
                display: true,
                text: "Count number post by user"
            }
        }
    };

    const dataLine = {
        labels: postUsername,
        datasets: [
            {
                label: 'Like',
                data: postLike,
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgba(255, 99, 132, 0.2)',
            },
            {
                label: 'Comment',
                data: postComment,
                fill: false,
                backgroundColor: 'rgb(54, 162, 235)',
                borderColor: 'rgba(54, 162, 235, 0.2)',
            },
        ],
    };

    const optionsLine = {
        responsive: true,
        plugins: {
            title: {
                display: true,
                text: 'Count like and comment by post',
            },
        },
    };


    return (
        <div className='dashboard'>
            <div className='card'>
                <Card
                    backgroundItem='rgb(94, 53, 177)'
                    backgroundBall1='rgb(138, 79, 255)'
                    backgroundBall2='rgb(96, 33, 221)'
                    btn1={<i className="fa-regular fa-newspaper"></i>}
                    btn2='Post'
                    number={countPost}
                    title='Total Post'
                />

                <Card
                    backgroundItem='rgb(28, 170, 123)'
                    backgroundBall1='rgb(93, 180, 151, 0.8)'
                    backgroundBall2='rgb(8, 128, 88, 0.9)'
                    btn1={<i className="fa-solid fa-users"></i>}
                    btn2='User'
                    number={countUser}
                    title='Total User'
                />
            </div>
            <div className='chart-container'>
                <Bar data={data} options={options} />
            </div>
            <div className='chart-container'>
                <Line data={dataLine} options={optionsLine} />
            </div>
            {error && (<AlertError message={error} />)}
        </div>
    )
}

export default Dashboard
