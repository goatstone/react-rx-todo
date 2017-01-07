module.exports = {
    "extends": "standard",
    "globals": {
        "it": false,
        "describe": false,
        "beforeEach": false,
        "afterEach": false
    },
    "plugins": [
        "standard",
        "promise",
        "react"
    ],
    "settings": {
        "react": {
            "createClass": "createClass", // Regex for Component Factory to use, default to "createClass"
            "pragma": "React",  // Pragma to use, default to "React"
            "version": "15.0" // React version, default to the latest React stable release
        }
    },
     "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "newIsCap": false,
        "capIsNew": false,         
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "rules": {
 		"indent": ["error", 4],
        "semi": 2,
        "new-cap": 0, 
        "react/jsx-uses-react": "error",
        "react/jsx-uses-vars": "error"
    }
};