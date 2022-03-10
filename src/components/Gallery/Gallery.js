import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPhotos } from '../../redux/store';
import { Row, Col, Container } from 'react-bootstrap';
import Photo from '../Photo/Photo';
import { createFilteredArray } from '../../utils/createFilteredArray';
import Button from '../../components/Button/Button';
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

  //let startIndex = 0;
  //let endIndex = 2;
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(2);
  const [filteredPhotos, setFilteredPhotos] = useState([]);

  useEffect(() => {
    if (photos?.length > 0) {
      const filteredArray = createFilteredArray(photos, startIndex, endIndex);
      setFilteredPhotos(filteredArray);
    }
    //console.log('filteredPhotos', filteredPhotos);
  }, [photos, startIndex, endIndex]);

  const handleNext = (e) => {
    e.preventDefault();
    if (endIndex < photos.length - 1) {
      setStartIndex(startIndex + 3);
      setEndIndex(endIndex + 3);
    } else {
      setStartIndex(0);
      setEndIndex(2);
    }
  };

  return (
    <div className={styles.gallery}>
      <h1 className={styles.header}>Gallery</h1>
      {loading && <p>Loading...</p>}
      {!loading && !error && filteredPhotos?.length > 0 && (
        <Container>
          <Row sm={1} md={3}>
            {filteredPhotos.map((photo) => (
              <Col key={shortid()}>
                <Photo photoData={photo} />
              </Col>
            ))}
          </Row>
          <Row>
            <Col className='d-flex justify-content-center'>
              <Button onClick={handleNext}>Next</Button>
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
};

export default Gallery;
