import { Heart } from "lucide-react";
import { useState } from "react";

export default function Like() {
    const [like, setLike] = useState(false);

  return (
    <div className="cursor-pointer">
      <Heart size={30} onClick={() => setLike(!like)} fill={like ? "red" : "white"} />
    </div>
  );
}
