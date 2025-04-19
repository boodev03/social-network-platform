import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ImagePreviewProps {
  images: string[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onPrevious: (e: React.MouseEvent) => void;
  onNext: (e: React.MouseEvent) => void;
}

export function ImagePreview({
  images,
  currentIndex,
  isOpen,
  onClose,
  onPrevious,
  onNext,
}: ImagePreviewProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl bg-transparent border-none p-0">
        <div className="relative flex items-center justify-center">
          {/* Close button */}
          <Button
            variant="outline"
            size="icon"
            className="absolute top-4 right-4 bg-black/50 text-white border-none hover:bg-black/70 z-10"
            onClick={onClose}
          >
            <X size={20} />
          </Button>

          {/* Image counter */}
          <Badge
            variant="secondary"
            className="absolute top-4 left-4 bg-black/50 border-none text-white"
          >
            {currentIndex + 1} / {images.length}
          </Badge>

          {/* Previous button */}
          {currentIndex > 0 && (
            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white border-none hover:bg-black/70"
              onClick={onPrevious}
            >
              <ChevronLeft size={24} />
            </Button>
          )}

          {/* Next button */}
          {currentIndex < images.length - 1 && (
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white border-none hover:bg-black/70"
              onClick={onNext}
            >
              <ChevronRight size={24} />
            </Button>
          )}

          {/* Image */}
          <img
            src={images[currentIndex]}
            alt={`Preview ${currentIndex + 1} of ${images.length}`}
            className="max-w-full max-h-[85vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
