# iMart eCommerce Platform

<br />
<p align="center">
  <a href="https://ayakaffee-app.herokuapp.com/">
    <img src="./frontend/public/logo512.png" alt="Logo" width="120" height="120">
  </a>

  <h3 align="center">AyaKaffee | Ecommerce store </h3>

  <p align="center">
eCommerce platform built with the MERN stack & Redux. <br />
    <a href="m90khan@gmail.com"><strong>Contact Me</strong></a>
    <br />
    <br />
    <a href="https://ayakaffee-app.herokuapp.com/">View Demo</a>
    
   </p>
</p>

## Table of Contents

- [About the Project](#about-the-project)
- [Process](#process)
- [Skills](#skills)
- [Code Snipet](#code)
- [Connect with me](#Contact)

---

### About the Project

Live: https://ayakaffee-app.herokuapp.com/

<img src="./uploads/header-1.png">

#### Process

- Setup react environment with react-router.
- Implement the structure, divide it into components.
- Use Bootstrap on the frontend.

Features:

- Full featured shopping cart
- Product reviews and ratings
- Top products carousel
- Product pagination
- Product search feature
- User profile with orders
- Admin product management
- Admin user management
- Admin Order details page
- Mark orders as delivered option
- Checkout process (shipping, payment method, etc)
- PayPal / credit card integration
- Database seeder (products & users)

Case Study: https://www.behance.net/gallery/113528841/AyaKaffee?tracking_source=for_you_feed_user_published

---

### Skills

[<img align="left" alt="Visual Studio Code" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/visual-studio-code/visual-studio-code.png" />][youtube]
[<img align="left" alt="HTML5" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/html/html.png" />][youtube]
[<img align="left" alt="CSS3" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/css/css.png" />][youtube]
[<img align="left" alt="Sass" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/sass/sass.png" />][youtube]
[<img align="left" alt="JavaScript" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/javascript/javascript.png" />][youtube]
[<img align="left" alt="React" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/react/react.png" />][youtube]

[<img align="left" alt="Git" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/git/git.png" />][youtube]
[<img align="left" alt="GitHub" width="26px" src="https://raw.githubusercontent.com/github/explore/78df643247d429f6cc873026c0622819ad797942/topics/github/github.png" />][youtube]
[<img align="left" alt="Terminal" width="26px" src="https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/terminal/terminal.png" />][youtube]
<br />
<br />

---

### Code Snippet

```javascript
import React from 'react';
import PropTypes from 'prop-types';

const Rating = (props) => {
  const { value, text, color } = props;
  return (
    <div className='rating'>
      {[1, 2, 3, 4, 5].map((val) => (
        <span key={val}>
          <i
            style={{ color: color }}
            className={
              value && value >= val
                ? 'fas fa-star'
                : value && value >= val - 0.5
                ? 'fas fa-star-half-alt'
                : 'far fa-star'
            }
          ></i>
        </span>
      ))}

      {text && <span> ({text})</span>}
    </div>
  );
};

Rating.defaultProps = {
  color: '#7a4a25',
};
Rating.propTypes = {
  value: PropTypes.number,
  text: PropTypes.number,
  color: PropTypes.string,
};

export default Rating;
```

---

### Connect with me:

[<img align="left" alt="Khan | YouTube" width="22px" src="https://cdn.jsdelivr.net/npm/simple-icons@v3/icons/youtube.svg" />][youtube]

[<img align="left" alt="twitter | Twitter" width="22px" src="https://cdn.jsdelivr.net/npm/simple-icons@v3/icons/twitter.svg" />][twitter]
[<img align="left" alt="khanmohsinx | LinkedIn" width="22px" src="https://cdn.jsdelivr.net/npm/simple-icons@v3/icons/linkedin.svg" />][linkedin]
[<img align="left" alt="khanuxd | Instagram" width="22px" src="https://cdn.jsdelivr.net/npm/simple-icons@v3/icons/instagram.svg" />][instagram]
[<img align="left" alt="khanuxd | Instagram" width="22px" src="https://cdn.jsdelivr.net/npm/simple-icons@3.13.0/icons/behance.svg" />][behance]
[<img align="left" alt="khanuxd | Instagram" width="22px" src="https://cdn.jsdelivr.net/npm/simple-icons@3.13.0/icons/dribbble.svg" />][dribble]
<br />

---

[youtube]: https://www.youtube.com/channel/UC96rVfdTKsjZpREnH6CaCOw
[twitter]: https://twitter.com/uxdkhan
[linkedin]: https://www.linkedin.com/in/uxdkhan
[instagram]: https://www.instagram.com/uxdkhan/
[behance]: https://www.behance.net/Khan_Mohsin
[dribble]: https://dribbble.com/uxdkhan
