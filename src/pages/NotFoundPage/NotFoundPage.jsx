import { Link } from 'react-router-dom';
import css from './NotFoundPage.module.css';
const NotFoundPage = () => {
  return (
    <>
      <div className={css.msgNotFound}>Not Found page</div>
      <Link to={'/'}>Come back to Home page</Link>
    </>
  );
};

export default NotFoundPage;
