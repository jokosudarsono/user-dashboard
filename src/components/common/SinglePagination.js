import { Button } from 'react-bootstrap';
import { ArrowRight, ArrowLeft } from 'react-bootstrap-icons';

const SinglePagination = ({ total_page, current_page, onChange }) => (
  <>
    <Button
      type='button'
      variant='outline-primary'
      className='mr-2'
      data-testid='prev-page'
      onClick={() => onChange(current_page > 1 ? current_page - 1 : 1)}
      disabled={1 == current_page}
    >
      <ArrowLeft />
    </Button>

    <Button
      type='button'
      variant='outline-primary'
      data-testid='next-page'
      onClick={() => onChange(current_page < total_page ? current_page + 1 : total_page)}
      disabled={total_page == current_page}
    >
      <ArrowRight />
    </Button>
  </>
);

export default SinglePagination;
