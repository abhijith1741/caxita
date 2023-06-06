import React, { useState } from "react";
import hotelResults from "../hotel results.json";

function Home() {
	const [sortedResults, setSortedResults] = useState(hotelResults);
	const [selectedRating, setSelectedRating] = useState(null);
	console.log("sort", sortedResults);

	const sortResults = (sortOrder) => {
		const sorted = [...hotelResults].sort((a, b) => {
			if (sortOrder === "asc") {
				return (
					a.RoomDetails[0].FareDetails.Price -
					b.RoomDetails[0].FareDetails.Price
				);
			} else {
				return (
					b.RoomDetails[0].FareDetails.Price -
					a.RoomDetails[0].FareDetails.Price
				);
			}
		});
		setSortedResults(sorted);
	};
	const filterByRating = (rating) => {
		console.log("rate", rating);
		setSelectedRating(rating);
		if (rating === null) {
			setSortedResults(hotelResults);
		} else {
			const filtered = hotelResults.filter((hotel) => {
				console.log("hotel rating:", hotel.Rating);
				console.log("rating comparison:", hotel.Rating === rating);
				return hotel.Rating === rating;
			});
			setSortedResults(filtered);
			console.log("fil", filtered);
		}
	};
	return (
		<div className="hotel-results">
			<div className="sort-buttons">
				<button onClick={() => sortResults("asc")}>Sort by Price ASC</button>
				<button onClick={() => sortResults("desc")}>Sort by Price DESC</button>
			</div>
			<div className="star-rating-filter">
				<button onClick={() => filterByRating(null)}>All</button>
				{["One", "Two", "Three", "Four", "Five"].map((rating) => (
					<button key={rating} onClick={() => filterByRating(rating)}>
						{rating} Stars
					</button>
				))}
			</div>
			{sortedResults.map((hotel, index) => (
				<div className="hotel-result" key={index} style={{marginTop: "40px"}}>
					<img src={hotel.Images.Image[0].url} alt="Hotel" style={{width: "200px", height: "150px"}} />
					<h2>{hotel.HotelName}</h2>
					<p>{hotel.Description}</p>
					<p>Rating: {hotel.Rating} Stars</p>
					<p>
						{hotel.RoomDetails[0].FareDetails.Currency}{" "}
						{hotel.RoomDetails[0].FareDetails.Price}
					</p>
				</div>
			))}
		</div>
	);
}

export default Home;
