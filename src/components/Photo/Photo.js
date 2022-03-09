import styles from './Photo.module.scss';
const Photo = ({ photoData }) => {
  const url = photoData.url.replace('https://unsplash.com/photos/', '');
  const author = photoData.author;
  return (
    <div>
      <img
        className={styles.image}
        src={`http://source.unsplash.com/${url}`}
        alt={`author: ${author}`}
      />
    </div>
  );
};
export default Photo;
