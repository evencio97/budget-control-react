export const checkRemaining = (budget, remaining) => {
    let className;
    if (remaining > (budget*0.75)) className = "alert-success";
    else if (remaining > (budget*0.4)) className = "alert-warning";
    else className = "alert-danger";
    
    return className;
}