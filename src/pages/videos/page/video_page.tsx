import { useEffect } from "react"

const VideoPage = () => {

    const videoEmbeddedUrl = 'https://www.youtube.com/embed/YhFXRWolBT0?si=VdAguPITOCDJsbKw'
    const videoUrl = 'https://youtu.be/YhFXRWolBT0?si=VdAguPITOCDJsbKw'
    
    useEffect(() => {
        window.location.href = videoUrl;
    }, [])

    return (
        <div className="gr-pg flex flex-col items-center justify-center">

            <p className="text-4xl font-bold font-fira-sans my-4 text-white ">
                Welcome to capital tech
            </p>

            <iframe width="560" height="315" src={videoEmbeddedUrl} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </div>
    )
}

export default VideoPage