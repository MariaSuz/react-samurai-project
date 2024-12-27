import ItemsCSS from './Item.module.css';
import { NavLink} from 'react-router-dom';
import React from 'react';

export type PropsType = {
  id: number
  names: string
}

const Itemsmany: React.FC<PropsType> = (props) => {
    let path = '/dialogs/' + props.id;
    return (
    <div className={ItemsCSS.names}>
      <NavLink className={({isActive}) => isActive ? ItemsCSS.activename : ''} to={path}>{props.names}</NavLink>
    </div>
    )
  }

export default Itemsmany;