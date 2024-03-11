import { useState, useRef } from 'react';
import ReactCrop, {
  centerCrop,
  convertToPixelCrop,
  makeAspectCrop,
} from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { setCanvasPreview } from '../utils';
import LoaderBlack from './LoaderBlack';

const MIN_DIMENSION = 150;

const ImageCropper = ({ updateImage, aspectRatio, isImageLoading }) => {
  const [imgSrc, setImgSrc] = useState('');
  const [crop, setCrop] = useState();
  const [error, setError] = useState('');

  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);

  const selectFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.addEventListener('load', () => {
      const imageUrl = reader.result?.toString() || '';
      setImgSrc(imageUrl);
    });
    reader.readAsDataURL(file);
  };

  const onImageLoad = (e) => {
    const { width, height, naturalWidth, naturalHeight } = e.currentTarget;
    const cropWidthInPercent = (MIN_DIMENSION / width) * 100;

    if (naturalWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION) {
      setError('Image must be at least 150 x 150 pixels');
      setImgSrc('');
      return;
    }
    const crop = makeAspectCrop(
      {
        unit: '%',
        width: cropWidthInPercent,
      },
      aspectRatio,
      width,
      height
    );
    const centeredCrop = centerCrop(crop, width, height);
    setCrop(centeredCrop);
  };

  return (
    <>
      <label className='block mb-3 w-fit cursor-pointer'>
        <span className='sr-only cursor-pointer'>Choose image</span>
        <input
          type='file'
          accept='image/*'
          onChange={selectFile}
          className='block w-full font-medium file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:bg-main file:text-black hover:file:bg-mainDark cursor-pointer'
        />
      </label>
      {error && <p className='text-red-400 text-xs'>{error}</p>}
      {imgSrc && (
        <div className='flex flex-col items-center'>
          <ReactCrop
            crop={crop}
            onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
            circularCrop
            keepSelection
            aspect={aspectRatio}
            minWidth={MIN_DIMENSION}
          >
            <img
              ref={imgRef}
              src={imgSrc}
              alt='Upload'
              style={{ maxHeight: '70vh' }}
              onLoad={onImageLoad}
            />
          </ReactCrop>
          <button
            className='text-black text-xs py-2 px-4 rounded-md mt-4 bg-main hover:bg-mainDark'
            onClick={() => {
              setCanvasPreview(
                imgRef.current,
                previewCanvasRef.current,
                convertToPixelCrop(
                  crop,
                  imgRef.current.width,
                  imgRef.current.height
                )
              );
              const dataUrl = previewCanvasRef.current.toDataURL();
              updateImage(dataUrl);
            }}
          >
            {isImageLoading ? <LoaderBlack /> : 'Crop Image'}
          </button>
        </div>
      )}
      {crop && (
        <canvas
          ref={previewCanvasRef}
          className='mt-4'
          style={{
            display: 'none',
            border: '1px solid black',
            objectFit: 'contain',
            width: 150,
            height: 150,
          }}
        />
      )}
    </>
  );
};

export default ImageCropper;
