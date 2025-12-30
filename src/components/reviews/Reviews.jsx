
import ReviewCard from './ReviewCard'
import SwiperItems from '../SwiperItems'

const Reviews = ({ reviews, title }) => {
  return (
    <div className="container my-5" dir="rtl">
      <h1 className="text-right mb-4">{title}</h1>
      <div className="">
        {reviews && reviews.length > 0 ? (
          <SwiperItems items={reviews} renderItems={(item, index) => (
            <ReviewCard key={item._id} userName={item.userName} rating={item.rating} content={item.content} isApproved={item.isApproved} id={item._id} />
          )} />
        ) : (
          <h3>לא נמצאו תגובות</h3>
        )}
      </div>
    </div>
  )
}

export default Reviews