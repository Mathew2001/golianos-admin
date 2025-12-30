import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

const SwiperItems = ({ items, renderItems }) => {
  // const { i18n } = useTranslation()
  // const dir = i18n.dir()
  // const prevRef = React.useRef(null);
  // const nextRef = React.useRef(null);
  // return (
  //   <div className="container mt-5 mb-5" dir={dir}>
  //     {items && items.length > 0 ? (
  //       <div className="position-relative">
  //         <Swiper
  //           className='reviews-swiper'
  //           modules={[Navigation]}
  //           onBeforeInit={(sw) => {
  //             sw.params.navigation.prevEl = prevRef.current;
  //             sw.params.navigation.nextEl = nextRef.current;
  //           }}
  //           spaceBetween={16}
  //           slidesPerView={1}
  //           breakpoints={{
  //             768: {
  //               slidesPerView: 2,
  //             },
  //             1024: {
  //               slidesPerView: 3,
  //             },
  //             1200: {
  //               slidesPerView: 4,
  //             },
  //           }}
  //           navigation={{
  //             prevEl: prevRef.current,
  //             nextEl: nextRef.current
  //           }}
  //         >
  //           {items.map((item, index) => (
  //             <SwiperSlide key={item._id} >
  //               {renderItems(item, index)}
  //             </SwiperSlide>
  //           ))}
  //         </Swiper>
  //         <div className="swiper-button-prev" ref={prevRef} ></div>
  //         <div className="swiper-button-next" ref={nextRef} ></div>
  //       </div>
  //     ) : (
  //       <h1>לא נמצאו תגובות</h1>
  //     )}
  //   </div>
  // )

  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerPage, setItemsPerPage] = useState(1)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 992) { // lg breakpoint
        setItemsPerPage(3)
      } else if (window.innerWidth >= 768) { // md breakpoint
        setItemsPerPage(2)
      } else {
        setItemsPerPage(1)
      }
      // if(currentIndex + itemsPerPage >= items.length) {
      //   if(items.length - itemsPerPage >= 0) {
      //     setCurrentIndex(items.length - itemsPerPage)
      //   } else {
      //     setCurrentIndex(0)
      //   }
      // }
    }

    handleResize() // Set initial value
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const nextItems = () => {
    if (currentIndex + 1 < items.length - (itemsPerPage - 1)) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const previousItems = () => {
    if (currentIndex - 1 >= 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  return (
    <>
      {items && items.length > 0 && items.length > itemsPerPage && (
        <div className="d-flex justify-content-between">
          <div className="pr-5">
            {currentIndex > 0 && (
              <button
                className="btn position-relative top-50 end-0 translate-middle-y"
                onClick={previousItems}
              >
                <i className="bi bi-arrow-right-square-fill" style={{ fontSize: '3rem' }}></i>
              </button>
            )}
          </div>
          <div className="pl-5">
            {currentIndex < items.length - itemsPerPage && (
              <button
                className="btn position-relative top-50 start-0 translate-middle-y"
                onClick={nextItems}
              >
                <i className="bi bi-arrow-left-square-fill" style={{ fontSize: '3rem' }}></i>
              </button>
            )}
          </div>
        </div>
      )}
        <div className="row row-cols-md-2 row-cols-lg-3 g-4 p-4"  >
          {items && items.length > 0 ? (
            <>
              {items.slice(currentIndex, currentIndex + itemsPerPage).map((item, index) => (
                renderItems(item, index)
              ))}
            </>
          ) : null}
        </div>
    </>
  )
}

export default SwiperItems