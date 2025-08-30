import MainNavigation from "../components/MainNavigation";
import PageContent from "../components/PageContent";
import {useRouteError} from "react-router-dom";

function Error() {

    const error = useRouteError();

    let title = "Error";
    let message = "Something went wrong!";

    if (error.status === 404) {
        title = "Not Found";
        message = "The page you are looking for does not exist.";
    }

    if (error.status === 500) {
        title = "Internal Server Error";
        message = JSON.stringify(error.data).message;
    }

    return (
        <>
            <MainNavigation></MainNavigation>
            <PageContent title={title}>
                <p>{message}</p>
            </PageContent>
        </>
    );
}

export default Error;