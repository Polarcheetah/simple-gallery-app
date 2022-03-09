import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPhotos } from '../../redux/store';
import { Row, Col, Container } from 'react-bootstrap';
import Photo from '../Photo/Photo';
import { createFilteredArray } from '../../utils/createFilteredArray';
import shortid from 'shortid';
import styles from './Gallery.module.scss';

const Gallery = () => {
  //fetch photos data from JSON file
  const dispatch = useDispatch();
  useEffect(() => dispatch(fetchPhotos()), []);

  //define const for checking if no errors and loading finished
  const { error, loading } = useSelector(({ photos }) => photos.status);

  //define table of objects with photos data
  const photos = useSelector((state) => state.photos.data);

  //create array with filtered photos

  let startIndex = 0;
  let endIndex = 2;
  const [filteredPhotos, setFilteredPhotos] = useState([]);

  useEffect(() => {
    if (photos?.length > 0) {
      const filteredArray = createFilteredArray(photos, startIndex, endIndex);
      setFilteredPhotos(filteredArray);
    }
  }, [photos, startIndex, endIndex]);

  return (
    <div className={styles.gallery}>
      <h1 className={styles.header}>Gallery</h1>
      {loading && <p>Loading...</p>}
      {!loading && !error && filteredPhotos?.length > 0 && (
        <Container>
          <Row>
            {filteredPhotos.map((photo) => (
              <Col key={shortid()}>
                <Photo photoData={photo} />
              </Col>
            ))}
          </Row>
        </Container>
      )}
    </div>
  );
};

export default Gallery;
