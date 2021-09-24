# breakitdown
#### Project 4

[Check it out](https://expo.dev/@imanonion/breakitdown) on the Expo app!
Download Expo on your [Android](https://play.google.com/store/apps/details?id=host.exp.exponent&referrer=www) device. App was not built for [iOS](https://itunes.apple.com/app/apple-store/id982107779), but you can try...
Then, scan the QR code: (https://github.com/imanonion/breakitdown/tree/master/assets/expo-breakitdown.png)

**Introduction**
breakitdown is a micro-learning mobile app that breaks down dance steps into easily digestible, a-step-a-day lessons. 

===

### Tools used
**Planning**
- [Miro](https://miro.com/): Brainstorming of app ideas, Creating User stories, Flow Diagram, Timeline
- [Trello](https://trello.com/en): Kanban board to track progress
- [Figma](https://www.figma.com/): Design

**Development**
- Expo: Framework for React Native app
- React Native: Framework for building native iOS and Android apps using React
- Android Studio: Android device emulator
- Firebase: Firebase Authentication, Firestore, Cloud Storage
- TypeScript: Typed superset of Javascript that compiles to plain Javascript
- UI Kitten: UI Library for React Native apps

===

#### Considerations
Why android?
- Phone is android (easy to use with expo go app)
- Insufficient space on computer to use Xcode

Why Expo?
- Easy to set up project
- Many useful SDKs (expo-av in this project)

Why TypeScript?
- Type checking functionality => catch errors before they occur in production
- Better documentation => easy to understand code written

#### Lessons learned & Future Enhancements

**Solved but struggled:**
- SVG positioning (SVG taken from Figma, but did not know how to position the SVG...now I know I have to use viewbox)
- Countdown circle button took a long time to do as I had struggled to understand how the component works and how to add a button inside of the countdown-circle-timer
- Video format was wrong.. mov cannot be used in exoplayer. Lesson learned to read documentation to check compatibility
- Documentation on linking expo and firebase were not clear (e.g. need to create web app to get the firebaseConfig info)
- Firestore doesn't have "push" or "add" commands to add nested objects to existing objects. hence, I had to restructure the users collection to store each move as a document for each user.

**Future enhancements:**
- Add "Create Video" functionality
- Add scrollview for lesson page
- Add animations between and within screens
- Disallow firebase from automatically logging in user after they sign up