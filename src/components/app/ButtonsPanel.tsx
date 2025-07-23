import { useState, useRef, useEffect } from "react"
import TexturedButton from "@/components/shared/TexturedButton"
import {
  ChevronFirst,
  ChevronLast,
  Play,
  Pause,
  Repeat,
  Volume,
  Volume1,
  Volume2,
  VolumeX,
} from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import useSutraStore from "@/store/sutraStore"
import { useGetAudioQuery } from "@/api/audio.api"
import { Slider } from "../ui/slider"
import useModeStore from "@/store/modeStore"

const ButtonsPanel = () => {
  const { section, valli_no, sutra_no, incrementSutra, decrementSutra } =
    useSutraStore()
  const { mode } = useModeStore()
  const [isPlaying, setIsPlaying] = useState(false)
  const [isRepeating, setIsRepeating] = useState(false)
  const [volume, setVolume] = useState(1) // Default volume set to max (1.0)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const { data } = useGetAudioQuery({
    section: section,
    chapter: valli_no,
    number: sutra_no,
    mode,
  })

  // Play the fetched audio when sutra_no changes
  useEffect(() => {
    const playAudio = async () => {
      if (audioRef.current) {
        audioRef.current.src = data?.file_path
          ? `${import.meta.env.VITE_API_URL}/${data.file_path}`
          : ""
        audioRef.current.play()
        setIsPlaying(true)
      }
    }

    playAudio()
  }, [section, valli_no, sutra_no, data])

  // Update volume when volume state changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  // Handlers for buttons
  const handleNext = () => {
    incrementSutra() // Move to next sutra
  }

  const handlePrevious = () => {
    decrementSutra() // Move to previous sutra
  }

  const handleAudioEnd = () => {
    if (!isRepeating) {
      handleNext()
    }
  }

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleRepeat = () => {
    if (audioRef.current) {
      setIsRepeating(!isRepeating)
      audioRef.current.loop = !audioRef.current.loop
    }
  }

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0])
  }

  // Function to get the appropriate volume icon based on volume level
  const getVolumeIcon = () => {
    if (volume === 0) {
      return <VolumeX />
    } else if (volume > 0 && volume <= 0.33) {
      return <Volume />
    } else if (volume > 0.33 && volume <= 0.66) {
      return <Volume1 />
    } else {
      return <Volume2 />
    }
  }

  return (
    <div className="flex justify-center gap-2 mt-5 mb-4">
      <TexturedButton onClick={handlePrevious} title="Previous">
        <ChevronFirst />
      </TexturedButton>

      <TexturedButton
        onClick={handlePlayPause}
        title={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? <Pause /> : <Play />}
      </TexturedButton>

      <TexturedButton onClick={handleNext} title="Next">
        <ChevronLast />
      </TexturedButton>

      <TexturedButton
        onClick={handleRepeat}
        selected={isRepeating}
        title="Repeat"
      >
        <Repeat />
      </TexturedButton>

      <Popover>
        <PopoverTrigger>
          <TexturedButton title="Volume">{getVolumeIcon()}</TexturedButton>
        </PopoverTrigger>
        <PopoverContent>
          <Slider
            min={0}
            max={1}
            step={0.01}
            value={[volume]}
            onValueChange={handleVolumeChange}
          />
        </PopoverContent>
      </Popover>

      <audio ref={audioRef} onEnded={handleAudioEnd} />
    </div>
  )
}

export default ButtonsPanel
