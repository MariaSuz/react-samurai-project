import Post1CSS from'./Post.module.css';
import React from 'react';

type PropsType = {
    message: string,
    likeCount: number
}

const Post: React.FC<PropsType> = (props) => {
    return (
        <div className = {Post1CSS.center}>
            <img className = {Post1CSS.imgsize} src="https://avatars.dzeninfra.ru/get-zen_doc/271828/pub_65886ba95c108b68eab3861f_65886e04b0a16502671993b1/scale_1200" alt="car" />
            <h6 className = {Post1CSS.text}>{props.message}</h6>
            <span>{props.likeCount}</span>
        </div>
    )
  }

export default Post;