import React, {useMemo, useEffect, useState, useRef} from 'react'
import './App.css';

const App = () => {

    const [nodeClientHeight, setNodeClientHeight] = useState(0) //可视区高度
    const [scrollTop, setScrollTop] = useState(0)
    const itemHeight = 70
    const [arr, setArr] = useState([])
    const node = useRef(null)

    useEffect(() => {
        const arr = []
        for (let i = 0; i <= 1000; i++) {
            arr.push(i)
        }
        setArr(arr)
    }, [])

    const visibleContent = useMemo(() => {
        return Math.ceil(nodeClientHeight / itemHeight) + 1
    }, [nodeClientHeight])

    const startIndex = useMemo(() => {
        return Math.floor(scrollTop / itemHeight)
    }, [scrollTop])

    const endIndex = useMemo(() => {
        return startIndex + visibleContent
    }, [startIndex, visibleContent])

    const listHeight = useMemo(() => {
        return arr.length * itemHeight
    }, [arr])

    const DemoMemo = useMemo(() => (props) => {
        return <div className='box'>{props.data}</div>
    }, [arr])

    useEffect(() => {
        if (node.current) {
            setNodeClientHeight(node.current.clientHeight)
        }
    }, [node])

    const rangeList = useMemo(() => {
        return arr.slice(startIndex, endIndex)
    }, [startIndex, endIndex])

    const [startOffset, setStarOffset] = useState(0)

    const onScroll = e => {
        const scrollTop = node.current.scrollTop
        console.log('---');
        console.log(scrollTop);
        console.log(scrollTop % 70);
        console.log(scrollTop - (scrollTop % 70));
        console.log('===');
        setStarOffset(scrollTop - (scrollTop % 70));
        setScrollTop(node.current.scrollTop)
    }

    return (
        <div className="App" id='app'>
            <div className="wrapper" onScroll={onScroll} ref={node} id='wrapper'>
                <div className="pla" style={{height: `${listHeight}px`}}/>
                <div className='content' style={{transform: `translate3d(0,${startOffset}px,0)`}}>
                    {rangeList.map(item => <DemoMemo key={item} data={item}/>)}
                </div>
            </div>
            {/*
            <div className="wrapper2" id='wrapper2'>
                {arr.map(item => <DemoMemo key={item} data={item}/>)}
            </div>
*/}
        </div>
    );
}

export default App;
