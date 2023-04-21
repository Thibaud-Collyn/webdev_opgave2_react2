import React from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {deleteResource, useTest} from "../AxiosFunctions";
import {useMutation} from "react-query";

const Reviews = () => {
    const navigate = useNavigate()
    const params = useParams();
    const reviewsURL = decodeURIComponent(params.url);

    const createPostMutation = useMutation({
        mutationFn : deleteResource,
        onSuccess: () => {
            console.log("successfully deleted review");
            refetch().then(r => r.data)
        },
        onError: () => {
            alert('An error has occurred while deleting a review');
        },
    });

    const handleDelete = (reviewUrl) => {
        //e.preventDefault()
        console.log(`attempting to delete review with url: ${reviewUrl}`);
        createPostMutation.mutate({
            URL: reviewUrl,
        });
    }

    const { data: reviewData, isLoading, isError, refetch } = useTest(reviewsURL, "reviews");

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>An error has occurred.</div>;
    }

    const gridStyle = {
        display: 'grid',
        //gridTemplateColumns: `repeat(${this.columns}, minmax(300px, 1fr))`,
        gridGap: '1rem',
        minWidth: '200px',
        maxWidth: '1200px',
        margin: '0 auto'
    };

    return (
        <div>
            <button className='Button' id='return home' onClick={() => navigate('/')}>Home</button>
            <h1>Reviews</h1>
            <div className='company-wrapper' style={gridStyle}>
                {reviewData.map(review => (
                    <div className="company">
                        <h2>Score: {review.score}</h2>
                        <p>Review: {review.text}</p>
                        <p> <Link to={`/detail-company/${encodeURIComponent(review.company)}`}>Employing company</Link> </p>
                        <button className='Button' onClick={() => handleDelete(review.url)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Reviews