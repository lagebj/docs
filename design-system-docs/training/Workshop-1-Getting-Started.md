# Workshop 1: Getting Started with the Design System

## Workshop Overview
This hands-on workshop guides participants through setting up and implementing their first components with the design system. It's designed to be completed in 2-3 hours with instructor guidance or 4-6 hours for self-paced learning.

## Learning Objectives
By the end of this workshop, participants will be able to:
- Set up a development environment with the design system
- Implement basic components in a sample application
- Navigate and utilize design system documentation
- Troubleshoot common setup issues
- Understand the project structure and configuration

## Prerequisites
Before starting this workshop, ensure you have:
- Node.js (v16 or higher) installed
- npm or yarn package manager
- A code editor (VS Code recommended)
- Basic understanding of HTML, CSS, and JavaScript
- Git version control system

## Workshop Materials
- Sample project repository
- Design system documentation access
- Component playground environment
- Troubleshooting guide
- Completed example reference

## Workshop Activities

### Activity 1: Environment Setup (30 minutes)

#### Step 1: Project Initialization
1. Create a new project directory:
   ```bash
   mkdir design-system-workshop
   cd design-system-workshop
   ```

2. Initialize a new npm project:
   ```bash
   npm init -y
   ```

3. Install the design system:
   ```bash
   npm install @company/design-system
   ```

#### Step 2: Basic Project Structure
Create the following file structure:
```
design-system-workshop/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── app.js
└── package.json
```

#### Step 3: HTML Template Setup
Create `index.html` with:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Design System Workshop</title>
  <link rel="stylesheet" href="node_modules/@company/design-system/dist/design-system.css">
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>
  <div id="app">
    <!-- Workshop content will go here -->
  </div>
  <script src="js/app.js"></script>
</body>
</html>
```

### Activity 2: First Component Implementation (45 minutes)

#### Step 1: Implement a Button Component
Add the following to your `index.html` inside the app div:
```html
<div class="workshop-section">
  <h1 class="text-h1">My First Component</h1>
  <button class="btn btn--primary" id="clickButton">Click Me!</button>
  <p class="text-body" id="output">Button not clicked yet.</p>
</div>
```

#### Step 2: Add Interactive Behavior
In `js/app.js`, add:
```javascript
document.addEventListener('DOMContentLoaded', function() {
  const button = document.getElementById('clickButton');
  const output = document.getElementById('output');
  let clickCount = 0;

  button.addEventListener('click', function() {
    clickCount++;
    output.textContent = `Button clicked ${clickCount} time${clickCount !== 1 ? 's' : ''}.`;
  });
});
```

#### Step 3: Style Customizations
In `css/styles.css`, add custom styling:
```css
.workshop-section {
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: var(--color-background-alt);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-md);
}

.workshop-section .btn {
  margin: 1rem 0;
}
```

### Activity 3: Component Exploration (45 minutes)

#### Step 1: Implement a Card Component
Add to your HTML:
```html
<div class="card-example">
  <h2 class="text-h2">Component Showcase</h2>
  <div class="card">
    <div class="card__header">
      <h3 class="text-h3">Sample Card</h3>
    </div>
    <div class="card__body">
      <p class="text-body">This card demonstrates our component styling approach.</p>
      <ul class="list">
        <li class="list__item">Consistent spacing</li>
        <li class="list__item">Proper typography</li>
        <li class="list__item">Accessible structure</li>
      </ul>
    </div>
    <div class="card__footer">
      <button class="btn btn--secondary">Action</button>
    </div>
  </div>
</div>
```

#### Step 2: Create a Form Component
Add to your HTML:
```html
<div class="form-example">
  <h2 class="text-h2">Form Example</h2>
  <form class="form">
    <div class="form__group">
      <label class="form__label" for="name">Name</label>
      <input class="form__input" type="text" id="name" name="name" required>
    </div>
    <div class="form__group">
      <label class="form__label" for="email">Email</label>
      <input class="form__input" type="email" id="email" name="email" required>
    </div>
    <div class="form__group">
      <label class="form__label" for="message">Message</label>
      <textarea class="form__textarea" id="message" name="message" rows="4"></textarea>
    </div>
    <button class="btn btn--primary" type="submit">Submit</button>
  </form>
</div>
```

### Activity 4: Responsive Design Implementation (30 minutes)

#### Step 1: Create a Responsive Grid
Add to your HTML:
```html
<div class="grid-example">
  <h2 class="text-h2">Responsive Grid</h2>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <div class="card">
      <h3 class="text-h3">Card 1</h3>
      <p class="text-body">Content for first card.</p>
    </div>
    <div class="card">
      <h3 class="text-h3">Card 2</h3>
      <p class="text-body">Content for second card.</p>
    </div>
    <div class="card">
      <h3 class="text-h3">Card 3</h3>
      <p class="text-body">Content for third card.</p>
    </div>
  </div>
</div>
```

#### Step 2: Add Responsive Behavior
In `css/styles.css`, add:
```css
@media (max-width: 768px) {
  .workshop-section {
    padding: 1rem;
    margin: 1rem;
  }
  
  .card {
    margin-bottom: 1rem;
  }
}

.grid-example {
  margin-top: 2rem;
}
```

## Workshop Challenges

### Beginner Challenge (15 minutes)
Create a navigation bar component using the design system's navigation elements. Include:
- Logo or brand element
- Navigation links
- Mobile-responsive menu toggle
- Proper accessibility attributes

### Intermediate Challenge (30 minutes)
Implement a modal component that:
- Appears when a button is clicked
- Contains header, body, and footer sections
- Includes close functionality
- Follows accessibility guidelines
- Works responsively on mobile devices

### Advanced Challenge (45 minutes)
Build a complete mini-application that:
- Uses at least 5 different design system components
- Implements proper form validation
- Includes responsive layout
- Demonstrates component customization
- Follows accessibility best practices

## Troubleshooting Guide

### Common Issues and Solutions

#### Issue 1: Styles Not Loading
**Symptoms**: Components look unstyled or default browser styles appear.

**Solutions**:
1. Verify CSS import paths in HTML
2. Check that design system package is installed
3. Ensure browser cache is cleared
4. Confirm CSS file permissions

#### Issue 2: JavaScript Not Working
**Symptoms**: Interactive components don't respond to user actions.

**Solutions**:
1. Check browser console for JavaScript errors
2. Verify script loading order
3. Confirm DOM is fully loaded before executing scripts
4. Check component initialization timing

#### Issue 3: Responsive Issues
**Symptoms**: Layout breaks on different screen sizes.

**Solutions**:
1. Verify viewport meta tag is present
2. Check CSS media query syntax
3. Confirm breakpoint values match design system
4. Test on actual mobile devices

## Workshop Evaluation

### Self-Assessment Checklist
Before completing the workshop, ensure you can:
- [ ] Successfully install and configure the design system
- [ ] Implement basic components with proper markup
- [ ] Apply design system classes correctly
- [ ] Navigate design system documentation
- [ ] Troubleshoot common setup issues
- [ ] Understand component customization options
- [ ] Implement responsive layouts
- [ ] Apply accessibility best practices

### Instructor Evaluation Rubric
For instructor-led workshops, evaluate participants on:
1. **Setup Proficiency** (20%)
   - Successful installation and configuration
   - Proper project structure
   - No critical errors in setup

2. **Component Implementation** (30%)
   - Correct HTML structure
   - Appropriate class usage
   - Functional JavaScript interactions

3. **Problem Solving** (25%)
   - Ability to troubleshoot issues independently
   - Effective use of documentation resources
   - Creative solutions to challenges

4. **Code Quality** (15%)
   - Clean, organized code
   - Proper commenting and documentation
   - Adherence to best practices

5. **Completion** (10%)
   - All required activities completed
   - Challenges attempted with good faith effort
   - Professional presentation of work

## Next Steps

After completing this workshop, participants should:
1. Explore advanced component documentation
2. Attempt more complex implementation challenges
3. Join the design system community forums
4. Review upcoming training workshops
5. Begin integrating design system into current projects

### Additional Resources
- Component API documentation
- Advanced implementation patterns
- Accessibility guidelines
- Performance optimization techniques
- Contributing to the design system

This hands-on workshop provides a solid foundation for working with the design system, preparing participants for more advanced implementation challenges.