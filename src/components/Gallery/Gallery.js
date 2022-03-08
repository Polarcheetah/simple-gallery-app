import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPhotos } from '../../redux/store';
import { createUrlSuffixArray } from '../../utils/createUrlSuffixArray';
import shortid from 'shortid';

const Gallery = () => {
  const dispatch = useDispatch();
  const startIndex = 0;
  const endIndex = 2;
  const photos = useSelector((state) => state.photos.data);
  console.log('photos', photos);
  const [urlSuffixArray, setUrlSuffixArray] = useState([]);
  useEffect(() => dispatch(fetchPhotos()), []);
  useEffect(() => {
    if (photos.length !== 0) {
      setUrlSuffixArray(createUrlSuffixArray(photos, startIndex, endIndex));
    }
  }, [photos, startIndex, endIndex]);

  return (
    <div>
      <h1>Gallery</h1>
      <ul>
        {urlSuffixArray.map((url) => (
          <li key={shortid()}>
            <img src={`http://source.unsplash.com/${url}`} alt='firstPhoto' />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Gallery;
