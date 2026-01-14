import { useSelector } from 'react-redux';
import PageCard from '../../cards/PageCard';


const Pages = () => {

  const { pagesByBusinessId } = useSelector((state) => state.pageReducer);
  if (!pagesByBusinessId) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      {pagesByBusinessId.length > 0 ? (
        pagesByBusinessId.map((page) => (
          <PageCard key={page._id} page={page}/>
        ))
      ) : (
        <div>No pages found</div>
      )}
    </div>
  )
}

export default Pages;