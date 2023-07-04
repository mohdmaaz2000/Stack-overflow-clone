import React from 'react'
import { useSelector } from 'react-redux';
import Avatar from '../../Avatar/Avatar';
import { Link } from 'react-router-dom';
import moment from 'moment';


const Comment = (props) => {
    const { data } = props;
    const users = useSelector((state) => state.userReducer);
    const commentUser = users.filter((user) => data.userCommented === user._id)[0];
    return (
        <li >
            {
                commentUser?.image ?
                    <Link to={`/users/${data?.userCommented}`}>
                        <img src={`${process.env.REACT_APP_SERVER}/Profilephoto/${commentUser.image}`} alt="User Profile" />
                    </Link>
                    :
                    <div style={{ marginRight: '15px' }}>
                        <Avatar py="13px" px="16px" bgColor='#009dff' radius='48%' color='white' >
                            <Link to={`/users/${data?.userCommented}`} style={{ textDecoration: 'none', color: 'white' }}>
                                {commentUser?.name.charAt(0).toUpperCase()}
                            </Link>
                        </Avatar>
                    </div>
            }

            <div className="comment-details">
                <h4>{commentUser?.name}</h4>
                <p>{data?.comment}</p>
                <span>commented {moment(data?.commentedOn).fromNow()}</span>
            </div>
        </li>
    )
}

export default Comment
