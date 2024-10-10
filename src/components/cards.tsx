import ReactMarkdown from "react-markdown";
import { useRouter } from "next/navigation";
import { FaLongArrowAltRight } from "react-icons/fa";
import { CardData } from "@/types/types";
import Image from "next/image";

function Cards({ imageURL, heading, text, tag, slug }: CardData) {
  const route = useRouter();

  return (
    <div className="max-w-sm h-auto rounded-lg overflow-hidden shadow-md border border-neutral-300 bg-white text-black relative">
      <figure className="relative h-48">
        {imageURL ? (
          <Image
            src={imageURL}
            alt="blog image"
            className="object-cover w-full h-full"
            width={300}
            height={300}
          />
        ) : null}
      </figure>
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2 line-clamp-1 ">{heading}</h2>
        <div className="flex flex-wrap gap-2 mb-3">
          <div className="badge badge-neutral badge-outline">{tag}</div>
        </div>
        <div className="line-clamp-4 mb-4">
          {<ReactMarkdown>{text}</ReactMarkdown>}
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={() => route.push(`/blog/${slug}`)}
            className="btn btn-primary flex items-center"
          >
            Read blog <FaLongArrowAltRight className="ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cards;
