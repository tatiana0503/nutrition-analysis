function Nutrition ( {label, quantity, unit}) {
    return(
        <div className="container">
            
            <p><b><i>{label}</i></b> - {quantity} {unit}</p>
            <p></p>
            <p></p>

        </div>
    )
}

export default Nutrition;