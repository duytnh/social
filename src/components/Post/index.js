import React, { useEffect, useState } from 'react';
import './style.scss';
import Comment from '../Comment';
import { useSelector } from 'react-redux';
import AlertError from '../../components/Alert/AlertError';
import ImageModal from './ImageModal';
import apiUser from '../../services/UserService';
import apiPost from '../../services/PostService';
import { useNavigate } from 'react-router-dom';

function Post({ user_avatar, user_fullname, created_at, description, images, total_likes, total_comments, comments, post_id, userId_post, deletePost }) {
    const [imageClass, setImageClass] = useState('');
    const [openComment, setOpenComment] = useState(false);
    const [like, setLike] = useState(false);
    const [numLike, setNumLike] = useState(total_likes);
    const [numComment, setNumComment] = useState(total_comments);
    const image_auth = user_avatar.replace('../../', 'https://booksfacefake.000webhostapp.com/mediaBE/');
    const user = useSelector(state => state.auth.user);
    const token = user && user.jwt;
    const userId = user && user.user_id;
    const [comment, setComment] = useState('');
    const [listComments, setListComments] = useState(comments);
    const [avatarComment, setAvatarComment] = useState('');
    const [nameComment, setNameComment] = useState('');
    const [error, setError] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalImageSrc, setModalImageSrc] = useState('');
    const navigate = useNavigate();

    const detailUser = () => {
        localStorage.setItem('selectedPage', `details-user/${userId_post}`);
        navigate(`/details-user/${userId_post}`);
    }

    useEffect(() => {
        const fetchLike = async () => {
            try {
                const response = await apiPost.likePost(post_id, token, 'check');
                if (response.data.status === 200) {
                    response.data.data > 0 && setLike(true);
                }
            } catch (error) {
                setError('Lỗi khi kiểm tra lượt thích');
            }
        };

        fetchLike();
    }, [post_id, token]);

    const handleOpenComment = () => {
        setOpenComment(!openComment);
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setError('');
        }, 3000);

        return () => clearTimeout(timer);
    }, [error]);

    const handleLikeDisLike = async () => {
        if (!like) {
            try {
                const response = await apiPost.likePost(post_id, token, 'like');
                if (response.data.status === 200) {
                    setLike(true);
                    setNumLike(prevNumLike => prevNumLike + 1);
                } else if (response.data.status === 400) {
                    setLike(false);
                    setError(response.data.message);
                }
            } catch (error) {
                setError('Lỗi khi thích bài viết');
            }
        } else {
            try {
                const response = await apiPost.likePost(post_id, token, 'dislike');
                if (response.data.status === 200) {
                    setLike(false);
                    setNumLike(prevNumLike => prevNumLike - 1);
                } else if (response.data.status === 400) {
                    setLike(true);
                    setError(response.data.message);
                }
            } catch (error) {
                setError('Lỗi khi bỏ thích bài viết');
            }
        }
    }

    useEffect(() => {
        switch (images.length) {
            case 1:
                setImageClass('one-image');
                break;
            case 2:
                setImageClass('two-images');
                break;
            case 3:
                setImageClass('three-images');
                break;
            case 4:
                setImageClass('four-images');
                break;
            default:
                setImageClass('');
        }
    }, [images.length]);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await apiUser.getUser(token);
                if (response.data.status === 200) {
                    setAvatarComment(response.data.data.avatar_url.replace('../../', 'https://booksfacefake.000webhostapp.com/mediaBE/'));
                    setNameComment(response.data.data.fullname);
                } else if (response.data.status === 400) {
                    setError(response.data.message);
                }
            } catch (error) {
                setError('Lỗi khi lấy người dùng');
            }
        };

        fetchProfile();
    }, [token]);


    const handleAddComment = async (event) => {
        event.preventDefault();
        try {
            const response = await apiPost.commentPost(post_id, token, 'add', comment);
            if (response.data.status === 200) {
                setNumComment(prevNumComment => prevNumComment + 1);
                setListComments(prevListComments => [{ avatar_url: avatarComment, fullname: nameComment, comment: comment, user_id: user.user_id }, ...prevListComments]);
                setComment('');
            } else if (response.data.status === 400) {
                setError(response.data.message);
            }
        } catch (error) {
            setError('Lỗi khi thêm bình luận');
        }
    }

    const deleteCommentImage = async (comment_id) => {
        try {
            const response = await apiPost.commentPost(post_id, token, 'delete', comment, comment_id);
            if (response.data.status === 200) {
                setNumComment(prevNumComment => prevNumComment - 1);
                setListComments(prevListComments => prevListComments.filter(comment => comment.comment_id !== comment_id));
            } else if (response.data.status === 400) {
                setError(response.data.message);
            }
        } catch (error) {
            setError('Lỗi khi xóa bình luận');
        }
    }

    const handleImageClick = (src) => {
        setModalImageSrc(src);
        setIsModalOpen(true);
    }

    return (
        <div className='post'>
            <div className='post-header'>
                <img src={image_auth} alt="Avatar" />
                <div className='info-post' onClick={detailUser}>
                    <h6>{user_fullname}</h6>
                    <p>{created_at}</p>
                </div>
                {userId_post === userId && (<button onClick={() => deletePost(post_id)}><i className="fa-solid fa-trash-can"></i></button>)}
            </div>
            <p className='description'>{description}</p>
            <div className='post-content'>
                <div className={`post-images ${imageClass}`}>
                    {images.map((src, index) => {
                        const image_content = src.replace('../../', 'https://booksfacefake.000webhostapp.com/mediaBE/');
                        return (
                            <img key={index} src={image_content} alt={`Hình ảnh ${index + 1}`} onClick={() => handleImageClick(image_content)} />
                        );
                    })}

                </div>
            </div>
            <div className='post-footer'>
                <div className='number-post'>
                    <p><i className="fa-solid fa-heart"></i> {numLike}</p>
                    <p>{numComment}</p>
                </div>
                <u></u>
                <div className='button-post'>
                    <button onClick={handleLikeDisLike} className='likeBtn'>
                        {like
                            ? (<i className="fa-solid fa-heart" style={{ color: 'red' }}></i>)
                            : (<i className="fa-regular fa-heart" style={{ color: 'red' }}></i>)} {like ? (<span style={{ color: 'red' }}>Thích</span>) : (<span>Thích</span>)}
                    </button>
                    <button onClick={handleOpenComment}><i className="fa-regular fa-comment"></i> Bình luận</button>
                </div>
            </div>
            {openComment && (
                <div className='post-bottom-comment'>
                    <div className='add-comment'>
                        <form className='add-comment-form' onSubmit={handleAddComment}>
                            <input type='text' placeholder='Hãy nói gì đó!' value={comment} required onChange={(e) => setComment(e.target.value)} />
                            <button type='submit'><i className="fa-regular fa-paper-plane"></i></button>
                        </form>
                    </div>
                    {listComments.map((cmt, index) => (
                        <Comment
                            key={index}
                            avatar_url={cmt.avatar_url}
                            fullname={Number(cmt.user_id) === userId ? 'Bạn' : cmt.fullname}
                            created_at={cmt.created_at}
                            comment={cmt.comment}
                            id_user_comment={Number(cmt.user_id)}
                            idComment={cmt.comment_id}
                            deleteComment={deleteCommentImage}
                        >
                        </Comment>
                    ))}
                </div>
            )}

            <ImageModal isOpen={isModalOpen} imageSrc={modalImageSrc} onClose={() => setIsModalOpen(false)} />
            {error && (<AlertError message={error} />)}
        </div >
    )
}

export default Post;
