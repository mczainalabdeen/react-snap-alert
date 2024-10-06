Sure! Here’s how the content can be structured in a Markdown file format without referring to it as a plugin:

# SnapAlert for React

**SnapAlert** is a lightweight and customizable React library designed for adding stylish alert notifications to your app. This library allows you to easily display alerts, confirmations, prompts, and even custom HTML notifications in a user-friendly way.

## Installation

You can install the library via npm:

```bash
npm install react-snap-alert
```

## Usage

Here's how to use SnapAlert in your React project:

### Step 1: Import and Use the Library

Add SnapAlert to your main React entry file (usually `index.js` or `app.js`).

```javascript
import SnapAlert from 'react-snap-alert';
import 'react-snap-alert/dist/snapAlert.css'; // Import the CSS
```

### Step 2: Display Alerts

You can now use SnapAlert to display different types of alerts. Here are some examples:

#### Basic Alert

```javascript
SnapAlert.alert('Alert Title', 'This is a basic alert.');
```

#### Success Alert

```javascript
SnapAlert.success('Success', 'Your operation was successful!');
```

#### Info Alert

```javascript
SnapAlert.info('info', 'Something went Attension.');
```

#### Error Alert

```javascript
SnapAlert.error('Error', 'Something went wrong.');
```

#### Confirmation Alert with Actions

```javascript
SnapAlert.warning('Are you sure?', 'This action cannot be undone.', {
  enableConfirm: true,
  enableCancel: true,
  onConfirm: () => {
    console.log('Confirmed!');
  },
  onCancel: () => {
    console.log('Cancelled!');
  }
});
```

### Step 3: Customizing Alerts

You can customize the options for each alert. For example:

```javascript
SnapAlert.info('Information', 'This is an info alert.', {
  position: 'top right',
  duration: 5000,
  icon: 'custom-icon-class', // Replace with a Boxicons class name (https://boxicons.com)
  isDark: true
});
```

### Step 4: Displaying HTML Alerts

You can display various types of alerts using the provided methods. Below is an example of how to show a custom HTML alert:

```javascript
SnapAlert.html(`<img src="https://placehold.co/600x400" />`, {
  position: 'top right',
  duration: 5000,
});
```

### Step 5: Set Global Options with SnapOptions

You can use the SnapOptions method to set global default options for all alerts. This is particularly useful if you want to maintain consistency across multiple alerts.

```javascript
SnapAlert.Options({
  duration: 5000,
  isDark: true,
  position: 'bottom right'
});
```

#### Example of Using Global Options

After setting global options, all subsequent alerts will use the specified default settings unless overridden by individual alert options:

```javascript
// Set global options
SnapAlert.Options({
  duration: 4000,
  isDark: false,
});

// Now all alerts will have these default settings
SnapAlert.success('Global Success', 'This alert will use global options.');
SnapAlert.error('Global Error', 'This alert will also use global options.');
```

### Available Options

- **rtl**: `false` (Enable/disable right-to-left support)
- **type**: `'info'`, `'success'`, `'error'`, `'warning'`
- **title**: The title of the alert
- **message**: The message of the alert
- **position**: `'top left'`, `'top right'`, `'bottom left'`, `'bottom right'`, `'top center'`, `'bottom center'`.
- **duration**: Time before auto-close (in milliseconds, default is 3000)
- **autoClose**: Automatically close the alert (default is `true`)
- **enableConfirm**: Show confirm button (default is `false`)
- **onConfirm**: Function to execute when confirmed
- **enableCancel**: Show cancel button (default is `false`)
- **onCancel**: Function to execute when cancelled
- **isDark**: Dark mode for the alert (default is `false`)
- **icon**: Custom icon (default icons are provided)

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

**Zainalabdeen Radwan**  
[Website](https://picker.sd) | [Email](mailto:zain@picker.sd)