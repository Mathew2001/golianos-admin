import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllContactUs } from '../../redux/actions/contactUsActions'
import ContactsUsAll from './ContactsUsAll'
import LinkButton from '../buttons/LinkButton'
//import Search from '../Search'
import { ROUTE_PATHS } from '../../const'
import DeleteDialog from '../dialogs/DeleteDialog'
import { deleteAllContactUs } from '../../redux/actions/contactUsActions'

const ContactUsButton = () => {
  const dispatch = useDispatch()
  const { contactUs } = useSelector((state) => state.contactUsReducer)
  const [openCompletedModal, setOpenCompletedModal] = useState(false)
  const [openInProgressModal, setOpenInProgressModal] = useState(false)
  const [openPendingModal, setOpenPendingModal] = useState(false)
  const [currentStatus, setCurrentStatus] = useState('all')

  const HandleButtons = (action) => {
    switch (action) {
      case 'completed':
        setCurrentStatus('completed')
        setOpenCompletedModal(!openCompletedModal)
        setOpenInProgressModal(false)
        setOpenPendingModal(false)
        break
      case 'in progress':
        setCurrentStatus('in progress')
        setOpenInProgressModal(!openInProgressModal)
        setOpenCompletedModal(false)
        setOpenPendingModal(false)
        break
      case 'pending':
        setCurrentStatus('pending')
        setOpenPendingModal(!openPendingModal)
        setOpenCompletedModal(false)
        setOpenInProgressModal(false)
        break
      default:
        setCurrentStatus('all')
        setOpenCompletedModal(false)
        setOpenInProgressModal(false)
        setOpenPendingModal(false)
        break
    }
  }
  useEffect(() => {
    dispatch(getAllContactUs())
  }, [dispatch])

  const completedContactUs = contactUs.filter((contactUs) => contactUs.status === 'completed') || []
  const inProgressContactUs = contactUs.filter((contactUs) => contactUs.status === 'in progress') || []
  const pendingContactUs = contactUs.filter((contactUs) => contactUs.status === 'pending') || []

  if(!contactUs) {
    return <div>טוען פניות...</div>
  }

  return (
    <div className="container mt-4" dir="rtl">
      <button className="btn btn-primary m-2" onClick={() => HandleButtons('completed')}>פניות משתמשים שהסתימו בהצלחה</button>
      <button className="btn btn-primary m-2" onClick={() => HandleButtons('in progress')}>פניות משתמשים בביצוע</button>
      <button className="btn btn-primary m-2" onClick={() => HandleButtons('pending')}>פניות משתמשים שממתינות לביצוע</button>
      <br />
      {contactUs.length > 0 && (
        <DeleteDialog text="האם אתה בטוח שברצונך למחוק את כל הפניות?" id="all" action={deleteAllContactUs} all={true} />
      )}
      <ContactsUsAll contactUs={contactUs} title="כל הפניות:" />
      {currentStatus === 'completed' && openCompletedModal && (
        <ContactsUsAll contactUs={completedContactUs} title="פניות משתמשים שהסתימו בהצלחה:" />
      )}
      {currentStatus === 'in progress' && openInProgressModal && (
        <ContactsUsAll contactUs={inProgressContactUs} title="פניות משתמשים בביצוע:" />
      )}
      {currentStatus === 'pending' && openPendingModal && (
        <ContactsUsAll contactUs={pendingContactUs} title="פניות משתמשים שממתינות לביצוע:" />
      )}
    </div>
  )
}

export default ContactUsButton