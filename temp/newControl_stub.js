import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import { VolumeOff } from '@material-ui/icons';
import { Slider, Popover, Tooltip } from '@material-ui/core'
import React, { useState } from 'react';
import { withStyles } from '@material-ui/core';

export const PlayerControls = (props) => {

    let { playing, muted, data, onPlayPause, onMute, onRewind, onForward, onVolumeChange, onVolumeSeekUp, volume, onRateChange,
        playbackRate, onToggleFullScreen, fullscreen, playedProgress, onSeek, onSeekMouseDown, onSeekMouseUp } = props;

    const [anchorEl, setAnchorEl] = useState(null);

    const PrettoSlider = withStyles({
        root: {
            color: '#5cb85b',
            height: 8,
        },
        thumb: {
            height: 24,
            width: 24,
            backgroundColor: '#fff',
            border: '2px solid currentColor',
            marginTop: -10,
            marginLeft: -12,
            '&:focus, &:hover, &$active': {
                boxShadow: 'inherit',
            },
        },
        active: {},
        valueLabel: {
            left: 'calc(-50% + 4px)',
        },
        track: {
            height: 4,
            borderRadius: 4,
        },
        rail: {
            height: 4,
            borderRadius: 4,
        },
    })(Slider);


    const ValueLabelComponent = (props, val) => {
        const { children, open, value } = props;
        // let min = val.toFixed(2).split('.')[0]
        // let sec = val.toFixed(2).split('.')[1]
        // let time = min + ':' + sec
        // console.log("value", time);
        return (
            <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
                {children}
            </Tooltip>
        );
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const ids = open ? 'playbackrate-popover' : undefined;

    return <div className="controlsWrapper">
        {/* Top Controls */}
        <div className="container py-4" style={{ alignItems: 'center', justifyContent: 'space-between' }}>
            <div className="row">
                {/* <div className="col-sm-9 col-9"><h3 className="card-title">{data.title}</h3></div> */}
                <div className="col-sm-3 col-3 text-right">
                    <i className="fa fa-star btn-lg p-0 text-warning"></i>
                </div>
            </div>
        </div>
        {/* Middle Controls */}
        <div className="container d-flex" style={{ justifyContent: 'center', alignItems: 'center' }}>
            <div className="row">
                <div title="Rewind" className="col-sm-4 control-item" onClick={onRewind}>
                    <i className="ri-rewind-line"></i>
                </div>
                <div className="col-sm-4 control-item" onClick={onPlayPause}>
                    {!playing ? <i className="ri-play-line"></i> : <i aria-label="Play/Pause" className="ri-pause-line"></i>}
                </div>
                <div className="col-sm-4 control-item" onClick={onForward}>
                    <i aria-label="Fast-Forward" className="ri-speed-line"></i>
                </div>
            </div>
        </div>
        {/* Bottom Controls */}
        <div className="container" style={{ alignItems: 'center', justifyContent: 'space-between', padding: 16 }}>
            <div className="row">
                <div className="col-12 control-bar">
                    <PrettoSlider min={0} max={100}
                        value={playedProgress * 100}
                        ValueLabelComponent={ValueLabelComponent}
                        onChange={onSeek}
                        onMouseDown={onSeekMouseDown}
                        onChangeCommitted={onSeekMouseUp}
                    />
                </div>
                <div className="col-6">
                    <div className="container" style={{ alignItems: 'center' }}>
                        <div className="row">
                            <div className="col-1 bottom-icon" style={{ top: 2 }} onClick={onPlayPause}>
                                {!playing ? <i className="ri-play-line"></i> : <i aria-label="Play/Pause" className="ri-pause-line"></i>}
                            </div>
                            <div className="col-1 bottom-icon" onClick={onMute}>
                                {muted ? <VolumeOff /> : <VolumeUpIcon />}
                            </div>
                            <div className="col bottom-icon" style={{ top: 7 }}>
                                <Slider className="volumeSlider"
                                    min={0}
                                    max={100}
                                    value={muted ? 0 : volume * 100}
                                    onChange={onVolumeChange}
                                    onChangeCommitted={onVolumeSeekUp}
                                />
                            </div>
                            <div className="col bottom-icon">
                                <button className="btn text-white" style={{ fontSize: 14 }}>05:05</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-6 text-right">
                    <div className="container" style={{ alignItems: 'center' }}>
                        <div className="row">
                            <div className="col bottom-icon">
                                <button onClick={handleClick} className="btn btn-sm text-white">{playbackRate}X</button>
                                <Popover
                                    id={ids}
                                    open={open}
                                    anchorEl={anchorEl}
                                    onClose={handleClose}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'center',
                                    }}
                                    transformOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'center',
                                    }}
                                >
                                    {[0.5, 1, 1.5, 2].map((rate, idx) => {
                                        return <button onClick={() => onRateChange(rate)} key={idx}
                                            className={`btn ${rate === playbackRate ? 'text-success' : 'text-secondary'}`}>{rate}</button>
                                    })}
                                </Popover>
                            </div>
                            <div className="col-1 bottom-icon" onClick={onToggleFullScreen}>
                                {!fullscreen ? <i className="ri-fullscreen-line"></i> : <i className="ri-fullscreen-exit-line"></i>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}