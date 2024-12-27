import  React , { useState } from 'react';
import styles from './paginator.module.css';

type PropsType = {
    totalUsersCount: number,
    pageSize: number,
    currentPage: number,
    onPageChanged: (pageNumber: number) => void,
}


let Paginator: React.FC<PropsType> = ({totalUsersCount, pageSize, currentPage, onPageChanged}) => {
    let pageCount = Math.ceil(totalUsersCount / pageSize);
    let pages = Array(); // [] имправила, чтобы убрать ошибку TS "ages.push(i); аргумент типа number нельзя назначить never"
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i);
    }

    //Local pagination
    // let countOfItemsInPage = 5;
    // let countOfItems = Math.ceil(pageCount / countOfItemsInPage);

    let [start, setStart] = useState<number>(0);
    let [end, setEnd] = useState<number>(10);

    function prevItems() {
        if (start <= 0) {
            start = 0;
            end = 10;
        } else {
        start -= 10;
        end -= 10;
        }
        setStart(start);
        setEnd(end);
    }
    function nextItems() {
        if (end === pageCount) {
            start = pageCount-10;
            end = pageCount;
        } else {
        start+=10;
        end+=10;
        }
        setStart(start);
        setEnd(end);
    }
    function firtsItems() {
        start = 0;
        end = 10;
        setStart(start);
        setEnd(end);
    }
    function lastItems() {
        start = pageCount-10;
        end = pageCount;
        setStart(start);
        setEnd(end);
    }

    function updateItems(start: number, end: number) {
        let node = pages.slice(start, end);
        return node.map(p => {
            return <span key={p.id} className={currentPage === p && styles.selectedPage}
            onClick = { (e) => {onPageChanged(p) }}> {p} </span>
        })
    }

    return(
        <div className={styles.numbersdiv}>
            <button className={styles.btnnumber} onClick={firtsItems}>&lt; &lt;</button>
            <button className={styles.btnnumber} onClick={prevItems}>&lt;</button>
            {updateItems(start, end)}
             <button className={styles.btnnumber} onClick={nextItems}>&gt;</button>
             <button className={styles.btnnumber} onClick={lastItems}>&gt; &gt;</button>
        </div>
    )
}

export default Paginator;