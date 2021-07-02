import React, { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import getMovie from '../../../actions/movies/get_movie';
import { PlayerControls } from './PlayerControls';
import screenfull from 'screenfull';
import { formatTime } from '../../../helper/GeneralHelpers';

const Player = (props) => {
    let { id } = props.match.params;

    const [data, setData] = useState({})
    const [playing, setPlaying] = useState(true)
    const [muted, setMuted] = useState(false)
    const [volume, setVolume] = useState(0.5)
    const [rate, setRate] = useState(1.0)
    const [fullscreen, setFullScreen] = useState(false)
    const [played, setPlayed] = useState(0)
    const [seeking, setSeeking] = useState(false)

    const { movie } = useSelector(state => ({
        movie: state.movie
    }), shallowEqual)
    const dispatch = useDispatch()

    const playerRef = useRef();
    const wrapperRef = useRef();

    useEffect(() => {
        dispatch(getMovie(id))
    }, [])

    useEffect(() => {
        let { success, error } = movie;
        if (success && success.data) {
            setData(success.data.data[0])
        }
        else if (error && error.response) {
            console.log("error", error.response.data.message);
        }
    }, [movie])

    const handleRewind = () => {
        playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10)
    }

    const handleFastForward = () => {
        playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10)
    }

    const handlePlayPause = () => {
        setPlaying(!playing)
    }

    const handleMute = () => {
        setMuted(!muted)
    }

    const handleVolumeChange = (e, newValue) => {
        setVolume(parseFloat(newValue / 100))
        if (newValue === 0) setMuted(true)
        else setMuted(false)
    }

    const handleVolumeSeek = (e, newValue) => {
        setVolume(parseFloat(newValue / 100))
        if (newValue === 0) setMuted(true)
        else setMuted(false)
    }

    const handleRateChange = (rate) => {
        setRate(rate)
    }

    const toggleFullScreen = () => {
        screenfull.toggle(wrapperRef.current)
        setFullScreen(!fullscreen)
    }

    const handleProgress = (state) => {
        if (!seeking) {
            setPlayed(parseFloat(state.played).toFixed(2))
        }
    }

    const handleSeek = (e, newValue) => {
        if (!seeking) setPlayed(parseFloat(newValue / 100).toFixed(2))
    }

    const handleSeekMouseDown = (e) => {
        setSeeking(true)
    }

    const handleSeekMouseUp = (e, newValue) => {
        setSeeking(false)
        playerRef.current.seekTo(newValue / 100)
    }

    const currentTime = playerRef.current ? playerRef.current.getCurrentTime() : '00:00';
    const duration = playerRef.current ? playerRef.current.getDuration() : '00:00';
    const elaspsedTime = formatTime(currentTime)
    const totalDuration = formatTime(duration)

    return (
        <div className="playerContainer">
            <div ref={wrapperRef} className="playerWrapper">
                <ReactPlayer ref={playerRef}
                    width={'100%'}
                    height={'100%'}
                    url={data.stream_url}
                    muted={muted}
                    playing={playing}
                    volume={volume}
                    playbackRate={rate}
                    onProgress={handleProgress}
                />
                <PlayerControls
                    onPlayPause={handlePlayPause}
                    onMute={handleMute}
                    playing={playing}
                    muted={muted}
                    onRewind={handleRewind}
                    onForward={handleFastForward}
                    data={data}
                    onVolumeChange={handleVolumeChange}
                    onVolumeSeekUp={handleVolumeSeek}
                    onRateChange={handleRateChange}
                    volume={volume}
                    playbackRate={rate}
                    onToggleFullScreen={toggleFullScreen}
                    fullscreen={fullscreen}
                    playedProgress={played}
                    onSeek={handleSeek}
                    onSeekMouseDown={handleSeekMouseDown}
                    onSeekMouseUp={handleSeekMouseUp}
                />
            </div>
        </div>
    )
}

export default Player;