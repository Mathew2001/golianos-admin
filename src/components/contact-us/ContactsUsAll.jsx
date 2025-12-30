
import ContactUsCard from './ContactUsCard'
import SwiperItems from '../SwiperItems'

const ContactsUsAll = ( { contactUs, title}) => {
  return (
    <div className="container my-5" dir="rtl">
      <h1 className="text-right ">{title}</h1>
      <div className="">
        {contactUs && contactUs.length > 0 ? (
          <SwiperItems items={contactUs} renderItems={(item, index) => (
            <ContactUsCard key={item._id} name={item.name} email={item.email} message={item.message} id={item._id} date={item.date} status={item.status} phone={item.phone} companyName={item.companyName} />
          )} />
        ) : (
          <h3>לא נמצאו פניות</h3>
        )}
      </div>
    </div>
  )
}

export default ContactsUsAll