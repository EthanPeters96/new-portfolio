# Modern Interactive Portfolio

A clean, modern, and interactive portfolio website that automatically integrates with your GitHub repositories to showcase your projects and skills.
[![Netlify Status](https://api.netlify.com/api/v1/badges/77cc92ee-64cc-4443-8f20-18fc581b66c5/deploy-status)](https://app.netlify.com/projects/ethanportfolio92/deploys)
## 🌟 Features

-   **Modern Design**: Clean, professional layout with smooth animations
-   **GitHub Integration**: Automatically fetches and displays your repositories
-   **Responsive**: Works perfectly on desktop, tablet, and mobile devices
-   **Interactive**: Smooth scrolling, typing animation, and hover effects
-   **Customizable**: Easy to personalize with your information
-   **Performance Optimized**: Fast loading and smooth animations

## 🚀 Quick Start

1. **Clone or download** this repository
2. **Open** `script.js` and update the `CONFIG` object with your information:

```javascript
const CONFIG =
    {
        github: {
            username:
                "your-actual-github-username", // Replace with your GitHub username
        },
        personal:
            {
                name: "Your Full Name",
                email: "your.email@example.com",
                location:
                    "Your City, Country",
                phone: "+1 (555) 123-4567",
                social: {
                    github: "https://github.com/your-username",
                    linkedin:
                        "https://linkedin.com/in/your-username",
                    twitter:
                        "https://twitter.com/your-username",
                },
            },
        typing: {
            texts: [
                "Full Stack Developer", // Customize these titles
                "Frontend Specialist",
                "Backend Engineer",
                "UI/UX Enthusiast",
                "Problem Solver",
            ],
        },
    };
```

3. **Replace** the placeholder profile image:

    - Add your profile photo as `profile.jpg` in the project folder
    - Update the image source in `index.html` if needed

4. **Open** `index.html` in your browser or deploy to your hosting platform

## 📁 Project Structure

```
portfolio/
├── index.html          # Main HTML file
├── styles.css          # All CSS styles and animations
├── script.js           # JavaScript functionality
└── README.md          # This file
```

## 🎨 Customization

### Colors and Theme

Edit the CSS variables in `styles.css`:

```css
:root {
    --primary-color: #6366f1; /* Main brand color */
    --secondary-color: #8b5cf6; /* Secondary accent */
    --accent-color: #06d6a0; /* Highlight color */
    /* ... other variables ... */
}
```

### Sections

The portfolio includes these main sections:

-   **Hero**: Introduction with typing animation
-   **About**: Personal description and GitHub stats
-   **Skills**: Technology skills showcase
-   **Projects**: GitHub repositories (auto-populated)
-   **Contact**: Contact form and information

### Skills Section

Update your skills in the `initSkills()` function in `script.js`:

```javascript
const skills =
    [
        {
            name: "JavaScript",
            icon: "fab fa-js-square",
            level: "Advanced",
        },
        {
            name: "React",
            icon: "fab fa-react",
            level: "Advanced",
        },
        // Add your skills here
    ];
```

### Projects

Projects are automatically loaded from your GitHub repositories. The script:

-   Fetches your latest repositories
-   Categorizes them as 'web', 'mobile', or 'api'
-   Displays them with filtering options

## 🔧 GitHub Integration

The portfolio automatically fetches:

-   Your public repositories
-   Repository descriptions and languages
-   Star and fork counts
-   Your profile picture

**Note**: If you don't configure a GitHub username, it will show example projects.

## 📱 Responsive Design

The portfolio is fully responsive and tested on:

-   Desktop (1200px+)
-   Tablet (768px - 1199px)
-   Mobile (< 768px)

## 🌐 Deployment

### GitHub Pages

1. Push your code to a GitHub repository
2. Go to repository Settings > Pages
3. Select source branch (usually `main`)
4. Your portfolio will be available at `https://yourusername.github.io/repository-name`

### Netlify

1. Drag and drop your project folder to [Netlify](https://netlify.com)
2. Your site will be deployed instantly

### Vercel

1. Connect your GitHub repository to [Vercel](https://vercel.com)
2. Deploy with one click

## 🎯 Browser Support

-   Chrome (recommended)
-   Firefox
-   Safari
-   Edge

## 📧 Contact Form

The contact form currently shows a success message. To make it functional:

1. **Using Formspree** (recommended):

    ```html
    <form
        action="https://formspree.io/f/your-form-id"
        method="POST"
    ></form>
    ```

2. **Using Netlify Forms**:

    ```html
    <form
        netlify
    ></form>
    ```

3. **Custom backend**: Implement your own form handling

## 🔄 Updates

To update your portfolio:

1. Update your GitHub repositories (they'll automatically appear)
2. Modify the `CONFIG` object for personal information changes
3. Add new skills in the `initSkills()` function
4. Customize colors in the CSS variables

## 🐛 Troubleshooting

**Projects not loading?**

-   Check that your GitHub username is correct in `CONFIG.github.username`
-   Ensure your repositories are public
-   Check browser console for errors

**Animations not working?**

-   Make sure JavaScript is enabled
-   Check for console errors
-   Verify all files are in the same directory

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

---

**Happy coding!** 🚀

If you found this helpful, please consider giving it a ⭐ on GitHub.
# new-portfolio
