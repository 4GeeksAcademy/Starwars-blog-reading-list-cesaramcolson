import React, { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const CardForVehicles = (props) => {
    const { actions, store } = useContext(Context);
    const [details, setDetails] = useState(null);

    useEffect(() => {
        const fetchDetails = async () => {
            await actions.getVehiclesInfo(props.vehicle.uid);
            setDetails(store.vehiclesInfo[props.vehicle.uid]);
        };

        fetchDetails();
    }, [props.vehicle.uid, store.vehiclesInfo]);

    return (
        <div className="card col-12 col-md m-3" style={{ minWidth: "300px" }}>
            <img src={`https://starwars-visualguide.com/assets/img/vehicles/${props.vehicle.uid}.jpg`} className="card-img-top" alt="Card image" />
            <div className="card-body">
                <h5 className="card-title">{props.vehicle.name}</h5>
                {details ? (
                    <>
                        <p className="card-text">Model: {details.model}</p>
                        <p className="card-text">Length: {details.length}</p>
                    </>
                ) : (
                    <p>Loading...</p>
                )}
                <div className="d-flex justify-content-between align-items-center">
                    <Link to={`/details/${props.vehicle.uid}`} className="btn btn-primary">Learn more!</Link>
                    <button className="btn btn-warning" onClick={() => actions.addFavorite(props.vehicle.name, `/details/${props.vehicle.uid}`)}>
                        <i className="fa-regular fa-heart"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};