import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { m, AnimatePresence } from "framer-motion";
import {
  Play,
  SkipForward,
  Maximize2,
  ArrowLeft,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

interface ReferenceItem {
  id: string;
  title: string;
  description: string;
  category: string;
  scrollAnimationUrl?: string;
  galleryImages?: string[];
}

export function ReferencePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const references = t("references.items", {
    returnObjects: true,
  }) as ReferenceItem[];
  const reference = references.find((r) => r.id === id);

  const [view, setView] = useState<"video" | "gallery">("video");
  const [videoError, setVideoError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  // Reset state when id changes
  useEffect(() => {
    setView("video");
    setVideoError(false);
    setIsPlaying(true);
    setSelectedIndex(-1);
    window.scrollTo(0, 0);
  }, [id]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === -1) return;

      if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "Escape") {
        setSelectedIndex(-1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, reference]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleVideoEnd = () => {
    setView("gallery");
  };

  const skipVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setView("gallery");
  };

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!reference?.galleryImages) return;
    setSelectedIndex((prev) =>
      prev > 0 ? prev - 1 : reference.galleryImages!.length - 1
    );
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!reference?.galleryImages) return;
    setSelectedIndex((prev) =>
      prev < reference.galleryImages!.length - 1 ? prev + 1 : 0
    );
  };

  if (!reference) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Reference Not Found</h1>
        <Button onClick={() => navigate("/#references")}>Back to Home</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b py-3 px-2 md:p-4">
        <div className="container mx-auto flex items-center justify-between px-0 md:px-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/#references")}
            className="flex items-center gap-2 px-0 md:px-4"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("nav.back")}
          </Button>
          {view === "video" && (
            <Button
              variant="outline"
              size="sm"
              onClick={skipVideo}
              className="bg-secondary text-secondary-foreground hover:bg-secondary/80"
            >
              <SkipForward className="w-4 h-4 mr-2" />
              Skip Animation
            </Button>
          )}
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-6xl mx-auto">
          {/* Title & Info */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 md:mb-12 max-w-3xl"
          >
            <span className="text-primary text-sm font-medium tracking-wider uppercase mb-2 block">
              {reference.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {reference.title}
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
              {reference.description}
            </p>
          </m.div>

          {/* Layout Transition Container */}
          <div className="relative w-full">
            {/* Video / Gallery Grid */}
            <div
              className={cn(
                "grid gap-4 transition-all duration-500",
                view === "video"
                  ? "grid-cols-1"
                  : "grid-cols-1 md:grid-cols-3 auto-rows-[250px] grid-flow-dense"
              )}
            >
              {/* Hero Item (Video) */}
              <m.div
                layout
                className={cn(
                  "relative rounded-xl overflow-hidden bg-muted group/video",
                  view === "video"
                    ? "aspect-video w-full shadow-2xl"
                    : "md:col-span-2 md:row-span-2"
                )}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              >
                {reference.scrollAnimationUrl && !videoError ? (
                  <>
                    <video
                      ref={videoRef}
                      src={reference.scrollAnimationUrl}
                      className="w-full h-full object-cover"
                      autoPlay
                      muted
                      playsInline
                      disablePictureInPicture
                      controlsList="nodownload noplaybackrate noremoteplayback"
                      onEnded={handleVideoEnd}
                      onError={() => setVideoError(true)}
                      onClick={togglePlay}
                      loop={view === "video" ? false : true}
                    >
                      Your browser does not support the video tag.
                    </video>

                    {/* Custom Play/Pause Overlay */}
                    {view === "video" && (
                      <div
                        className={cn(
                          "absolute inset-0 flex items-center justify-center transition-opacity duration-300 pointer-events-none",
                          isPlaying
                            ? "opacity-0 group-hover/video:opacity-100"
                            : "opacity-100"
                        )}
                      >
                        <button
                          onClick={togglePlay}
                          className="bg-black/50 hover:bg-black/70 text-white rounded-full p-4 backdrop-blur-sm transition-transform hover:scale-110 pointer-events-auto"
                        >
                          {isPlaying ? (
                            <div className="w-8 h-8 flex gap-1 items-center justify-center">
                              <div className="w-2 h-8 bg-white rounded-full" />
                              <div className="w-2 h-8 bg-white rounded-full" />
                            </div>
                          ) : (
                            <Play
                              className="w-8 h-8 ml-1"
                              fill="currentColor"
                            />
                          )}
                        </button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-muted text-muted-foreground p-6 text-center">
                    <Play className="w-12 h-12 mb-4 opacity-20" />
                    <p className="font-medium">Video not available</p>
                    <p className="text-sm opacity-70 mt-1">
                      Add {reference.id}/scroll.webm to assets
                    </p>
                  </div>
                )}
              </m.div>

              {/* Gallery Images (Only visible in gallery view) */}
              <AnimatePresence mode="popLayout">
                {view === "gallery" &&
                  reference.galleryImages?.map((img, index) => {
                    // Strict 6-item Repeating Pattern
                    // N = index + 1 (since Video is essentially index 0 in the grid flow)
                    // N % 6 == 0 -> Big Item (Left Aligned)
                    // N % 6 == 4 -> Big Item (Right Aligned)
                    // Others -> Small Items

                    const n = index + 1;
                    const isBig = n % 6 === 0 || n % 6 === 4;
                    const spanClass = isBig
                      ? "md:col-span-2 md:row-span-2"
                      : "";

                    return (
                      <m.div
                        key={img}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className={cn(
                          "group relative rounded-xl overflow-hidden bg-muted cursor-pointer h-full w-full",
                          spanClass
                        )}
                        onClick={() => setSelectedIndex(index)}
                      >
                        <img
                          src={img}
                          alt={`${reference.title} gallery ${index + 1}`}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <Maximize2 className="text-white w-8 h-8 drop-shadow-lg" />
                        </div>
                      </m.div>
                    );
                  })}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>

      {/* Lightbox for Images */}
      {selectedIndex >= 0 && reference.galleryImages && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
          onClick={() => setSelectedIndex(-1)}
        >
          {/* Close Button */}
          <button
            onClick={() => setSelectedIndex(-1)}
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors p-2 bg-black/20 rounded-full z-50"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Prev Button */}
          <button
            onClick={handlePrev}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors p-3 bg-black/20 hover:bg-black/40 rounded-full backdrop-blur-sm z-50"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors p-3 bg-black/20 hover:bg-black/40 rounded-full backdrop-blur-sm z-50"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          {/* Image */}
          <img
            src={reference.galleryImages[selectedIndex]}
            alt="Full screen view"
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl select-none"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image
          />

          {/* Image Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm text-sm font-medium">
            {selectedIndex + 1} / {reference.galleryImages.length}
          </div>
        </div>
      )}
    </div>
  );
}
