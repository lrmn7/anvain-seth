import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import Modal from '../components/Modal'
import cloudinary from '../utils/cloudinary'
import getBase64ImageUrl from '../utils/generateBlurPlaceholder'
import type { ImageProps } from '../utils/types'
import { useLastViewedPhoto } from '../utils/useLastViewedPhoto'
import About from '../components/About'
import NameCard from '../components/NameCard'
import Filter from "../components/Filter"

const Home: NextPage = ({
  images: initialImages,
}: {
  images: ImageProps[];
}) => {
  const router = useRouter();
  const { photoId } = router.query;
  const [images, setImages] = useState(initialImages);

  const [lastViewedPhoto, setLastViewedPhoto] = useLastViewedPhoto();
  const [filteredImages, setFilteredImages] = useState(images);

  const fetchImagesByCategory = async (category: string) => {
    try {
      const res = await fetch(
        `/api/images?folder=anjar/${encodeURIComponent(category)}`
      );
      const data = await res.json();

      if (data.length > 0) {
        const blurDataUrlPromises = data.map((image) =>
          fetch(
            `/api/getBlurDataUrl?image=${encodeURIComponent(image.public_id)}`
          )
            .then((res) => res.json())
            .then((json) => json.blurDataURL)
        );
        const blurDataUrls = await Promise.all(blurDataUrlPromises);

        const formattedData = data.map((result, i) => ({
          id: i,
          height: result.height,
          width: result.width,
          public_id: result.public_id,
          format: result.format,
          category: category,
          blurDataUrl: blurDataUrls[i],
        }));

        setFilteredImages(formattedData);
      } else {
        setFilteredImages([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleCategorySelect = (category: string) => {
    if (category === "") {
      setFilteredImages(images); // Show all photos
    } else {
      fetchImagesByCategory(category); // Fetch images based on category
    }
  };

  const lastViewedPhotoRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    // This effect keeps track of the last viewed photo in the modal to keep the index page in sync when the user navigates back
    if (lastViewedPhoto && !photoId) {
      lastViewedPhotoRef.current.scrollIntoView({ block: "center" });
      setLastViewedPhoto(null);
    }
  }, [photoId, lastViewedPhoto, setLastViewedPhoto]);

  return (
    <>
      <Head>
        <title>ANVAIN</title>
      </Head>
      <main className="mx-auto max-w-[1960px] p-4">
        {photoId && (
          <Modal
            images={filteredImages}
            onClose={() => {
              setLastViewedPhoto(photoId);
            }}
          />
        )}
        <div className="flex gap-4">
          <NameCard />
          <About className="flex-grow" />
        </div>
        <Filter
          categories={[
            "Dark Photography",
            "Surreal",
            "Dark Art",
            "Pagan",
            "Witchcraft",
          ]}
          onCategorySelect={handleCategorySelect}
        />

        <div className="mt-4 columns-1 gap-4 sm:columns-2 xl:columns-3 2xl:columns-4">
          {filteredImages.map(({ id, public_id, format, blurDataUrl }) => (
            <Link
              key={id}
              href={`/?photoId=${id}`}
              as={`/p/${id}`}
              ref={id === Number(lastViewedPhoto) ? lastViewedPhotoRef : null}
              shallow
              className="after:content group relative mb-5 block w-full cursor-zoom-in after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:shadow-highlight"
            >
              <Image
                alt=""
                className="transform rounded brightness-90 transition will-change-auto group-hover:brightness-110"
                style={{ transform: "translate3d(0, 0, 0)" }}
                placeholder="blur"
                blurDataURL={blurDataUrl}
                src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/c_scale,w_720/${public_id}.${format}`}
                width={720}
                height={480}
                sizes="(max-width: 640px) 100vw,
                  (max-width: 1280px) 50vw,
                  (max-width: 1536px) 33vw,
                  25vw"
              />
            </Link>
          ))}
        </div>
      </main>
    </>
  );
};

export default Home;

export async function getStaticProps() {
  const results = await cloudinary.v2.search
    .expression(`folder:anjar/*`)
    .sort_by("public_id", "desc")
    .max_results(400)
    .execute();
  let reducedResults: ImageProps[] = [];

  let i = 0;
  for (let result of results.resources) {
    reducedResults.push({
      id: i,
      height: result.height,
      width: result.width,
      public_id: result.public_id,
      format: result.format,
    });
    i++;
  }

  const blurImagePromises = results.resources.map((image: ImageProps) => {
    return getBase64ImageUrl(image);
  });
  const imagesWithBlurDataUrls = await Promise.all(blurImagePromises);

  for (let i = 0; i < reducedResults.length; i++) {
    reducedResults[i].blurDataUrl = imagesWithBlurDataUrls[i];
  }

  return {
    props: {
      images: reducedResults,
    },
  };
}
