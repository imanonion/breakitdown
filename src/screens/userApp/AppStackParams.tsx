import { lessonProps } from "../../navigation/AuthenticatedUserProvider";

//type checking for Navigator and Screens
export type AppStackParamList = {
    AuthWelcome: undefined;
    Tabs: undefined;
    Browse: undefined;
    Create: undefined;
    Home: undefined;
    Profile: undefined;
    Video: undefined;
    Genre: {genre: string, description: string};
    Lesson: lessonProps;
    Congrats: lessonProps;
};
  