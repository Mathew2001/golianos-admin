import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllReviews, getReviewsByIsApproved } from '../../redux/actions/reviewActions'
import { useEffect } from 'react'
import Reviews from './Reviews'
import LinkButton from '../buttons/LinkButton'
//import Search from '../Search'
import ReviewCard from './ReviewCard'
import { ROUTE_PATHS } from '../../const'
import DeleteDialog from '../dialogs/DeleteDialog'
import { deleteAllReviews } from '../../redux/actions/reviewActions'

const ReviewsButton = () => {
  const dispatch = useDispatch()
  const { reviews, reviewsByIsApproved } = useSelector((state) => state.reviewReducer)
  const [openApprovedModal, setOpenApprovedModal] = useState(false)
  const [openUnapprovedModal, setOpenUnapprovedModal] = useState(false)
  const [currentStatus, setCurrentStatus] = useState('all')
  useEffect(() => {
    dispatch(getAllReviews())
    dispatch(getReviewsByIsApproved())
  }, [dispatch])

  const reviewsByIsNotApproved = reviews.filter((review) => !review.isApproved) || []
  
  const HandleButtons = (action) => {
    switch(action) {
      case 'approved':
        setCurrentStatus('approved')
        setOpenApprovedModal(!openApprovedModal)
        break
      case 'unapproved':
        setCurrentStatus('unapproved')
        setOpenUnapprovedModal(!openUnapprovedModal)
        break
      default:
        setCurrentStatus('all')
        break
    }
  }

  if(!reviews || !reviewsByIsApproved) {
    return <div>טוען ביקורות...</div>
  }

  return (
    <div className="container mt-5" dir="rtl">
      <button className="btn btn-primary m-2" onClick={() => HandleButtons('approved')}>ביקורות מאושרות</button>
      <button className="btn btn-primary m-2" onClick={() => HandleButtons('unapproved')}>ביקורות ממתינות לאישור</button>
      <LinkButton text="חזרה" to={ROUTE_PATHS.DASHBOARD} className="btn btn-primary m-2" />
      <br />
      {reviews.length > 0 && (
        <DeleteDialog text="האם אתה בטוח שברצונך למחוק את כל הביקורות?" id="all" action={deleteAllReviews} all={true} />
      )}
      {/* <Search data={reviews} searchBy="userName" cardComponent="ReviewCard" /> */}
      <Reviews reviews={reviews} title="כל הביקורות:" />
      {currentStatus === 'approved' && openApprovedModal && (
        <Reviews reviews={reviewsByIsApproved} title="ביקורות מאושרות:" />
      )}
      {currentStatus === 'unapproved' && openUnapprovedModal && (
        <Reviews reviews={reviewsByIsNotApproved} title="ביקורות ממתינות לאישור:" />
      )}
    </div>
  )
}

export default ReviewsButton