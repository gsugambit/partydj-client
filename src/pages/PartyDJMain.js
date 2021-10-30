import ReactPlayer from 'react-player/youtube'
import React, { useState } from 'react';
import './PartyDJMain.css';

const PartyDJMain = (props) => {

    const [queue, setQueue] = useState([]);
    const [url, setUrl] = useState('');
    const [playing, setPlaying] = useState(false);

    const textChange = (e) => {
        setUrl(e.target.value);
    }

    const onClick = (e) => {
        setQueue(prevState => {
            const unplayedUrl = prevState.filter(item => item.url === url && !item.played);

           
            if(unplayedUrl.length === 0) {
               return [...prevState, { url, played: false} ]
            }

            return prevState;
        });

        setUrl('');
    }

    const getNextVideo =() => {
        if(queue.length === 0) {
            return;
        }

        const unplayedQueueItems = queue.filter(queueItem => !queueItem.played);
        return unplayedQueueItems.length > 0 ? unplayedQueueItems[0].url : null;

    }

    const onEnded = (videoName, e) => {
        console.log(videoName, ' has ended');
       
        setQueue(prevState => {
            const playedQueueItem = prevState.filter(queueItem => queueItem.url === currentVideo && !queueItem.played);

            if(playedQueueItem.length >0) {
                playedQueueItem[0].played = true;
            }
            return prevState;
        })

        setPlaying(false);
    }

    const onReady = () => {
        setPlaying(true);
    }

    const onPlayClick = () => {
        if(playing) {
            setPlaying(false); 
         }

        if(!playing && getNextVideo()) {
            setPlaying(true);
        }
    }

    const onSkipClick = (currentVideo, e) => {
        console.log(`onSkipClick called with video: ${ currentVideo }`);
        setQueue(prevState => {
            const unPlayedVideos = prevState.filter(item => !item.played && item.url == currentVideo);

            if(unPlayedVideos.length > 0) {
                unPlayedVideos[0].played = true;
            }

            console.log(`${ JSON.stringify(prevState) } is being returned from skip click.`);
            return prevState;
        });

        setPlaying(false);
    }

    const onDuration = (e) => {
        console.log('onDuration below');
        console.log(e);
    }

    const onError = (e) => {
        console.log('onError below');
        console.log(e);
    }

    const onPlayerChange = (e) => {
        console.log('onPlayerChange below');
        console.log(e);
    }

    const currentVideo = getNextVideo();
    console.log(`the queue is: ${ JSON.stringify(queue) }`);
    console.log(`${currentVideo} is playing: ${ playing }`);

    return(<div className='party-dj-main'>
        <p>Home | Search</p>
        <p>Enter youtube video:<input onChange={textChange} value={url} /></p>
        <button type="submit" onClick={onClick}>Submit</button>
        {currentVideo && 
        <ReactPlayer url={currentVideo} volume={1} onReady={onReady} onChange={onPlayerChange}
        playing={playing} onEnded={(e) =>onEnded(currentVideo, e)} onDuration={onDuration}
        onError={onError}/>}
        {currentVideo && <button onClick={onPlayClick}>{playing ? 'Pause' : 'Play'}</button>}
        {currentVideo && <button onClick={(e) => onSkipClick(currentVideo, e)}>Skip</button>}
    </div>)
}



export default PartyDJMain;