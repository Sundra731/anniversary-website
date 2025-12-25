import React, { useEffect, useState } from 'react';
import { getAllMusic } from '../utils/api';
import { Music as MusicIcon, Play } from 'lucide-react';
import '../styles/Music.css';

const Music = () => {
    const [music, setMusic] = useState([]);
    const [loading, setLoading] = useState(true);
    const [playingCard, setPlayingCard] = useState(null);

    useEffect(() => {
        fetchMusic();
    }, []);

    const fetchMusic = async () => {
        try {
            const data = await getAllMusic();
            setMusic(data);
        } catch (error) {
            console.error('Error fetching music:', error);
        } finally {
            setLoading(false);
        }
    };

    // Extract YouTube video ID from URL
    const getYouTubeId = (url) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    if (loading) {
        return (
            <div className="loading">
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div className="music">
            {/* Floating musical notes */}
            <div className="floating-notes">
                {[...Array(12)].map((_, i) => (
                    <div key={i} className="floating-note" style={{
                        left: `${5 + i * 8}%`,
                        animationDelay: `${i * 0.5}s`,
                        animationDuration: `${4 + Math.random() * 3}s`
                    }}>
                        {['♪', '♫', '♬', '♩'][i % 4]}
                    </div>
                ))}
            </div>

            <div className="music-header">
                <div className="header-decoration">🎵</div>
                <h1 className="music-title">Our Music</h1>
                <p className="music-subtitle">Songs that tell our story</p>
                <div className="header-decoration">🎵</div>
            </div>

            {music.length === 0 ? (
                <div className="empty-state">
                    <MusicIcon size={48} className="empty-icon" />
                    <p>Our playlist is being created...</p>
                </div>
            ) : (
                <div className="music-grid">
                    {music.map((song, index) => {
                        const videoId = getYouTubeId(song.youtubeUrl);
                        return (
                            <div 
                                key={song._id} 
                                className={`music-card music-card-${index % 4} ${playingCard === song._id ? 'playing' : ''}`}
                                onMouseEnter={() => setPlayingCard(song._id)}
                                onMouseLeave={() => setPlayingCard(null)}
                            >
                                {/* Sparkles when hovering */}
                                {playingCard === song._id && (
                                    <div className="sparkles">
                                        <span className="sparkle">✨</span>
                                        <span className="sparkle">✨</span>
                                        <span className="sparkle">✨</span>
                                        <span className="sparkle">✨</span>
                                    </div>
                                )}

                                {/* Vinyl record decoration */}
                                <div className="vinyl-record"></div>

                                <div className="video-container">
                                    {videoId ? (
                                        <iframe
                                            src={`https://www.youtube.com/embed/${videoId}`}
                                            title={song.title}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    ) : (
                                        <div className="video-placeholder">
                                            <Play size={48} />
                                            <p>Invalid video URL</p>
                                        </div>
                                    )}
                                </div>
                                <div className="music-info">
                                    <div className="note-icon">♪</div>
                                    <h3 className="song-title">{song.title}</h3>
                                    {song.artist && <p className="song-artist">by {song.artist}</p>}
                                    {song.description && (
                                        <p className="song-description">{song.description}</p>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Music;