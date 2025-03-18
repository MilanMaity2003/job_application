// import React from 'react';
// import { Slide } from 'react-slideshow-image';
// import 'react-slideshow-image/dist/styles.css'




// const divStyle = {
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
//   backgroundSize: 'cover',
//   height: '400px'
// }
// const slideImages = [
//   {
//     url: 'https://media.istockphoto.com/id/1473711199/photo/face-portrait-student-and-man-in-university-ready-for-back-to-school-learning-goals-or.webp?b=1&s=612x612&w=0&k=20&c=uwC6gb3bYB2VRoWZXF4ErJ0AMY6iSggQnbmsvYVrIY8='
//   },
//   {
//     url: 'https://thumbs.dreamstime.com/b/girl-college-student-books-portrait-outdoor-education-bag-phone-campus-city-indian-person-smartphone-smile-backpack-325329668.jpg',

//   },
//   {
//     url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmqaVANvMDPlvQcq_WqozspHNggnRpM0UbOw&s',

//   },
// ];

// const Slideshow = () => {
//     return (
//       <div className="slide-container">
//         <Slide>
//          {slideImages.map((slideImage, index)=> (
//             <div key={index}>
//               <div style={{ ...divStyle, 'backgroundImage': `url(${slideImage.url})` }}>
//                 {/* <span style={spanStyle}></span> */}
//               </div>
//             </div>
//           ))} 
//         </Slide>
//       </div>
//     )
// }

// export default Slideshow;





import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@mui/material'

function Slides() {
    var items = [
        {
            url: 'https://media.istockphoto.com/id/1473711199/photo/face-portrait-student-and-man-in-university-ready-for-back-to-school-learning-goals-or.webp?b=1&s=612x612&w=0&k=20&c=uwC6gb3bYB2VRoWZXF4ErJ0AMY6iSggQnbmsvYVrIY8=',
            description: "Probably the most random thing you have ever seen!"
        },
        {
            url: 'https://img.freepik.com/premium-photo/pretty-indian-asian-college-girl-using-holding-laptop-computer-with-bag-standing-isolated-white-background_466689-18286.jpg',
            description: "Hello World!"
        },
        {
            url:'https://media.istockphoto.com/id/1362062797/photo/female-teen-student-with-a-backpack-and-books-smiling-stock-photo.webp?b=1&s=612x612&w=0&k=20&c=HdErgNaNV8VW4VoynjLHXryUlttr2nn66TQgwVXyROc='
        },
    ]

    return (
        <Carousel>
            {
                items.map((item, i) => <Item key={i} item={item} />)
            }
        </Carousel>
    )
}

export default Slides
function Item(props) {
    return (
    <Paper className="flex items-center justify-center border-2 m-5 mr-10 z-40">
  <div className="w-full h-full">
    <img
      src={props.item.url}
      alt={props.item.description}
      className="w-full 
                 h-96 
                 object-cover 
                 object-center 
                 transition 
                 duration-500 
                 ease-in-out 
                 transform 
                 hover:scale-105 
                 hover:border-4 
                 hover:border-gray-400 
                 md:hover:scale-110 
                 md:hover:border-blue-500"
    />
  </div>
</Paper>

    )
}

