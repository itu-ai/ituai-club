"use client";

import { ApiService } from '@/services/api';
import { useEffect, useState } from 'react';
import LoadingLayer from '@/components/star-wars-editor/loading-layer';
import Image from 'next/image';
import { ImageType } from '@/interfaces/image_type';


type Props = {
  params: {
    type: ImageType
    id: string
  };
};

const PhotoPage = ( {params}: Props) => {
  const id = params.id;
  const type = params.type.toString();
  const [rawImage64, setRawImage64] = useState<string | undefined>(undefined);
  const [editedImage64, setEditedImage64] = useState<string | undefined>(undefined);
  const [isAbleToShare, setIsAbleToShare] = useState(false);

  useEffect(() => {
    setIsAbleToShare(!!navigator.share);
    setTimeout(
      () => {
        document.getElementById('fetchButton')?.click();
      },
      1000
    );
  }, []);

  const fetchPhotosById = async (id: string, imageType: ImageType) => {
    try {
      console.log("Id in Fetch: ", id);
      const pattern = new RegExp("[a-zA-Z0-9]{10}");
      if (!pattern.test(id as string)) {
        console.error('Invalid ID: ', id);
        throw new Error('Invalid ID');
      }
      const requestedEditedImage64 = await ApiService.getImageRequest(id as string, imageType, true, true);
      const requestedRawImage64 = await ApiService.getImageRequest(id as string, imageType, false, true);
      const editedImageWithMetaData = 'data:image/png;base64,' + requestedEditedImage64;
      const rawImageWithMetaData = 'data:image/png;base64,' + requestedRawImage64;
      setEditedImage64(editedImageWithMetaData);
      setRawImage64(rawImageWithMetaData);

    } 
    catch (error) {
      console.error('Error fetching photos:', error);
    }
  };

  const downloadImage = (imageIn64: string) => {
    const link = document.createElement('a');
    link.href = imageIn64;
    link.download = 'image.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const shareImage = async (imageIn64: string) => {
    if (navigator.share) {
      try {
        const image_blob = await fetch(imageIn64)
        .then(res => res.blob());
        await navigator.share({
          files: [
            new File([image_blob], 'image.png', {type: image_blob.type})
          ],
          title: 'Image Share',
        });
      } 
      catch (error) {
        console.error('Error sharing:', error);
      }
    } 
    else {
      console.log('Sharing not supported');
      // We may try something else here...
    }
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 items-center justify-center p-8">
      {(rawImage64 && editedImage64 ) 
      ?
        <>
          <div className="m-6 lg:m-12">
            <Image className="" 
              src={editedImage64} 
              alt="Edited Snapshot"
              width={600}
              height={600}
            />
            <div className="flex flex-col mt-4 lg:flex-row items-center justify-center gap-4 lg:gap-6">
              <button className="sw-button"
                onClick={() => downloadImage(editedImage64)}>
                Download
              </button>
              {isAbleToShare && 
                <button className="sw-button" 
                  onClick={() => shareImage(editedImage64)}>
                  Share
                </button>
              }
            </div>
          </div>
          <div className="m-6 lg:m-12">
            <Image className=""
              src={rawImage64}
              alt="Snapshot"
              width={600}
              height={600}
            />
            <div className="flex flex-col mt-4 lg:flex-row items-center justify-center gap-4 lg:gap-6">
              <button className="sw-button" 
                onClick={() => downloadImage(rawImage64)}>
                Download
              </button>
              {isAbleToShare && 
                <button className="sw-button"
                  onClick={() => shareImage(rawImage64)}>
                  Share
                </button>
              }
            </div>
          </div>
        </>
      :
        <div>
          <LoadingLayer />
        </div>
      }
      <button 
        id='fetchButton' 
        style={{display: 'none'}}
        onClick={() => fetchPhotosById(id, type)}>
        Fetch Photos
      </button>
    </div>
  );
};

export default PhotoPage;
